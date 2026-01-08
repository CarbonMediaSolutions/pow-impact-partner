import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Lock, Users, FileText, Mail, Eye } from 'lucide-react';
import { format } from 'date-fns';

const ADMIN_PASSWORD = 'plexa2025';

interface ConsultationLead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  organisation: string | null;
  role: string | null;
  problem_statement: string;
  desired_outcome: string | null;
}

interface PerspectiveSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  organisation: string | null;
  topic: string;
  perspective_text: string;
}

interface EmailCapture {
  id: string;
  created_at: string;
  name: string | null;
  email: string;
  source: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [consultationLeads, setConsultationLeads] = useState<ConsultationLead[]>([]);
  const [perspectives, setPerspectives] = useState<PerspectiveSubmission[]>([]);
  const [emailCaptures, setEmailCaptures] = useState<EmailCapture[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPerspective, setSelectedPerspective] = useState<PerspectiveSubmission | null>(null);
  const [selectedLead, setSelectedLead] = useState<ConsultationLead | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      fetchData();
    } else {
      setError('Incorrect password');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    
    // Note: These queries will fail without SELECT RLS policies
    // For now, we'll show empty states until RLS is configured
    try {
      const [leadsRes, perspectivesRes, emailsRes] = await Promise.all([
        supabase.from('consultation_leads').select('*').order('created_at', { ascending: false }),
        supabase.from('perspective_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('email_captures').select('*').order('created_at', { ascending: false })
      ]);

      if (leadsRes.data) setConsultationLeads(leadsRes.data);
      if (perspectivesRes.data) setPerspectives(perspectivesRes.data);
      if (emailsRes.data) setEmailCaptures(emailsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
    
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-32 pb-20">
          <div className="container max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <CardTitle className="font-serif text-2xl">Admin Access</CardTitle>
                  <CardDescription>Enter the admin password to continue</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-center"
                    />
                    {error && (
                      <p className="text-sm text-destructive text-center">{error}</p>
                    )}
                    <Button type="submit" className="w-full">
                      Access Dashboard
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="font-body text-muted-foreground mb-8">
              View and manage leads, perspectives, and email captures
            </p>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Consultation Leads</CardTitle>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{consultationLeads.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Perspectives</CardTitle>
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{perspectives.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Email Captures</CardTitle>
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{emailCaptures.length}</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="leads" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="leads">Consultation Leads</TabsTrigger>
                <TabsTrigger value="perspectives">Perspectives</TabsTrigger>
                <TabsTrigger value="emails">Email Captures</TabsTrigger>
              </TabsList>

              <TabsContent value="leads">
                <Card>
                  <CardHeader>
                    <CardTitle>Consultation Leads</CardTitle>
                    <CardDescription>
                      People who have requested a consultation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <p className="text-muted-foreground">Loading...</p>
                    ) : consultationLeads.length === 0 ? (
                      <p className="text-muted-foreground">No consultation leads yet</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Organisation</TableHead>
                              <TableHead>Role</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {consultationLeads.map((lead) => (
                              <TableRow key={lead.id}>
                                <TableCell className="text-sm">
                                  {format(new Date(lead.created_at), 'dd MMM yyyy')}
                                </TableCell>
                                <TableCell className="font-medium">{lead.name}</TableCell>
                                <TableCell>{lead.email}</TableCell>
                                <TableCell>{lead.organisation || '-'}</TableCell>
                                <TableCell>{lead.role || '-'}</TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedLead(lead)}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Lead Detail Modal */}
                {selectedLead && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{selectedLead.name}</CardTitle>
                            <CardDescription>{selectedLead.email}</CardDescription>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedLead(null)}>
                            ✕
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Organisation</p>
                          <p>{selectedLead.organisation || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Role</p>
                          <p>{selectedLead.role || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Problem Statement</p>
                          <p className="whitespace-pre-wrap">{selectedLead.problem_statement}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Desired Outcome</p>
                          <p className="whitespace-pre-wrap">{selectedLead.desired_outcome || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                          <p>{format(new Date(selectedLead.created_at), 'dd MMMM yyyy, HH:mm')}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="perspectives">
                <Card>
                  <CardHeader>
                    <CardTitle>Perspective Submissions</CardTitle>
                    <CardDescription>
                      User-submitted perspectives and insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <p className="text-muted-foreground">Loading...</p>
                    ) : perspectives.length === 0 ? (
                      <p className="text-muted-foreground">No perspective submissions yet</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Topic</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {perspectives.map((perspective) => (
                              <TableRow key={perspective.id}>
                                <TableCell className="text-sm">
                                  {format(new Date(perspective.created_at), 'dd MMM yyyy')}
                                </TableCell>
                                <TableCell className="font-medium">{perspective.name}</TableCell>
                                <TableCell>{perspective.email}</TableCell>
                                <TableCell>{perspective.topic}</TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedPerspective(perspective)}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Perspective Detail Modal */}
                {selectedPerspective && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{selectedPerspective.topic}</CardTitle>
                            <CardDescription>By {selectedPerspective.name}</CardDescription>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedPerspective(null)}>
                            ✕
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Email</p>
                          <p>{selectedPerspective.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Organisation</p>
                          <p>{selectedPerspective.organisation || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Perspective</p>
                          <p className="whitespace-pre-wrap">{selectedPerspective.perspective_text}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                          <p>{format(new Date(selectedPerspective.created_at), 'dd MMMM yyyy, HH:mm')}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="emails">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Captures</CardTitle>
                    <CardDescription>
                      Emails collected from various sources
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <p className="text-muted-foreground">Loading...</p>
                    ) : emailCaptures.length === 0 ? (
                      <p className="text-muted-foreground">No email captures yet</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Source</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {emailCaptures.map((capture) => (
                              <TableRow key={capture.id}>
                                <TableCell className="text-sm">
                                  {format(new Date(capture.created_at), 'dd MMM yyyy')}
                                </TableCell>
                                <TableCell className="font-medium">{capture.name || '-'}</TableCell>
                                <TableCell>{capture.email}</TableCell>
                                <TableCell>{capture.source}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
