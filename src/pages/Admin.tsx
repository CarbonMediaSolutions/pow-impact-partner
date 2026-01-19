import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Lock, Users, FileText, Mail, Eye, Plus, Pencil, Trash2, BookOpen, BarChart3, Copy, Calendar, ExternalLink, LogOut, Download } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import type { User } from '@supabase/supabase-js';

const CALENDAR_LINK = 'https://calendar.app.google/WMyDAedTAtZgvFEf7';

interface ConsultationLead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  organisation: string | null;
  role: string | null;
  website_linkedin: string | null;
  problem_statement: string;
  desired_outcome: string | null;
  status: string;
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

interface Perspective {
  id: string;
  title: string;
  summary: string;
  topic: string;
  featured: boolean | null;
  image: string | null;
  content: string[];
  created_at: string;
  updated_at: string;
}

interface Analysis {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string | null;
  featured: boolean | null;
  content: {
    introduction?: string;
    sections?: { heading: string; paragraphs: string[] }[];
    methodology?: string;
    keyFindings?: string[];
    implications?: string[];
  };
  created_at: string;
  updated_at: string;
}

const perspectiveTopics = ['Governance', 'Impact', 'Growth', 'Strategy', 'Risk'];
const analysisCategories = ['Capital Allocation', 'Governance', 'Performance', 'Operations', 'Impact'];
const leadStatuses = ['Reviewing', 'Approved', 'Declined'];

const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'Approved':
      return 'default';
    case 'Declined':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [consultationLeads, setConsultationLeads] = useState<ConsultationLead[]>([]);
  const [perspectiveSubmissions, setPerspectiveSubmissions] = useState<PerspectiveSubmission[]>([]);
  const [emailCaptures, setEmailCaptures] = useState<EmailCapture[]>([]);
  const [perspectives, setPerspectives] = useState<Perspective[]>([]);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPerspectiveSubmission, setSelectedPerspectiveSubmission] = useState<PerspectiveSubmission | null>(null);
  const [selectedLead, setSelectedLead] = useState<ConsultationLead | null>(null);
  
  // Form states
  const [perspectiveDialogOpen, setPerspectiveDialogOpen] = useState(false);
  const [analysisDialogOpen, setAnalysisDialogOpen] = useState(false);
  const [editingPerspective, setEditingPerspective] = useState<Perspective | null>(null);
  const [editingAnalysis, setEditingAnalysis] = useState<Analysis | null>(null);
  
  // Perspective form
  const [perspectiveForm, setPerspectiveForm] = useState({
    title: '',
    summary: '',
    topic: 'Governance',
    featured: false,
    content: ''
  });
  
  // Analysis form
  const [analysisForm, setAnalysisForm] = useState({
    title: '',
    summary: '',
    category: 'Capital Allocation',
    date: new Date().getFullYear().toString(),
    featured: false,
    introduction: '',
    methodology: '',
    keyFindings: '',
    implications: ''
  });

  // Check auth state on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        await checkAdminRole(session.user.id);
      }
      setAuthLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await checkAdminRole(session.user.id);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    checkAuth();
    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase.rpc('has_role', {
      _user_id: userId,
      _role: 'admin'
    });
    
    if (!error && data) {
      setIsAdmin(true);
      fetchData();
    } else {
      setIsAdmin(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (data.user) {
      await checkAdminRole(data.user.id);
      if (!isAdmin) {
        // Re-check after login
        const { data: roleData } = await supabase.rpc('has_role', {
          _user_id: data.user.id,
          _role: 'admin'
        });
        if (!roleData) {
          setError('You do not have admin access. Contact the system administrator.');
          await supabase.auth.signOut();
        }
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/admin'
      }
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (data.user) {
      setSignUpSuccess(true);
      toast.success('Account created! Contact the administrator to grant admin access.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    toast.success('Logged out successfully');
  };

  const fetchData = async () => {
    setLoading(true);
    
    try {
      const [leadsRes, submissionsRes, emailsRes, perspectivesRes, analysesRes] = await Promise.all([
        supabase.from('consultation_leads').select('*').order('created_at', { ascending: false }),
        supabase.from('perspective_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('email_captures').select('*').order('created_at', { ascending: false }),
        supabase.from('perspectives').select('*').order('created_at', { ascending: false }),
        supabase.from('analyses').select('*').order('created_at', { ascending: false })
      ]);

      if (leadsRes.data) setConsultationLeads(leadsRes.data as ConsultationLead[]);
      if (submissionsRes.data) setPerspectiveSubmissions(submissionsRes.data);
      if (emailsRes.data) setEmailCaptures(emailsRes.data);
      if (perspectivesRes.data) setPerspectives(perspectivesRes.data as Perspective[]);
      if (analysesRes.data) setAnalyses(analysesRes.data as Analysis[]);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
    
    setLoading(false);
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('consultation_leads')
        .update({ status: newStatus })
        .eq('id', leadId);
      
      if (error) throw error;
      
      // Update local state
      setConsultationLeads(prev => 
        prev.map(lead => lead.id === leadId ? { ...lead, status: newStatus } : lead)
      );
      
      if (selectedLead?.id === leadId) {
        setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
      }
      
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error('Failed to update status');
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const exportLeadsToCSV = () => {
    const headers = ['Date', 'Status', 'Name', 'Email', 'Organisation', 'Role', 'Website/LinkedIn', 'Challenge', 'Desired Outcome'];
    const rows = consultationLeads.map(lead => [
      format(new Date(lead.created_at), 'yyyy-MM-dd'),
      lead.status,
      lead.name,
      lead.email,
      lead.organisation || '',
      lead.role || '',
      lead.website_linkedin || '',
      `"${(lead.problem_statement || '').replace(/"/g, '""')}"`,
      `"${(lead.desired_outcome || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `consultation-leads-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    toast.success('Leads exported to CSV');
  };

  const resetPerspectiveForm = () => {
    setPerspectiveForm({
      title: '',
      summary: '',
      topic: 'Governance',
      featured: false,
      content: ''
    });
    setEditingPerspective(null);
  };

  const resetAnalysisForm = () => {
    setAnalysisForm({
      title: '',
      summary: '',
      category: 'Capital Allocation',
      date: new Date().getFullYear().toString(),
      featured: false,
      introduction: '',
      methodology: '',
      keyFindings: '',
      implications: ''
    });
    setEditingAnalysis(null);
  };

  const openEditPerspective = (perspective: Perspective) => {
    setEditingPerspective(perspective);
    setPerspectiveForm({
      title: perspective.title,
      summary: perspective.summary,
      topic: perspective.topic,
      featured: perspective.featured || false,
      content: perspective.content.join('\n\n')
    });
    setPerspectiveDialogOpen(true);
  };

  const openEditAnalysis = (analysis: Analysis) => {
    setEditingAnalysis(analysis);
    setAnalysisForm({
      title: analysis.title,
      summary: analysis.summary,
      category: analysis.category,
      date: analysis.date || new Date().getFullYear().toString(),
      featured: analysis.featured || false,
      introduction: analysis.content?.introduction || '',
      methodology: analysis.content?.methodology || '',
      keyFindings: analysis.content?.keyFindings?.join('\n') || '',
      implications: analysis.content?.implications?.join('\n') || ''
    });
    setAnalysisDialogOpen(true);
  };

  const savePerspective = async () => {
    const contentArray = perspectiveForm.content.split('\n\n').filter(p => p.trim());
    
    const data = {
      title: perspectiveForm.title,
      summary: perspectiveForm.summary,
      topic: perspectiveForm.topic,
      featured: perspectiveForm.featured,
      content: contentArray
    };

    try {
      if (editingPerspective) {
        const { error } = await supabase
          .from('perspectives')
          .update(data)
          .eq('id', editingPerspective.id);
        
        if (error) throw error;
        toast.success('Perspective updated successfully');
      } else {
        const { error } = await supabase
          .from('perspectives')
          .insert(data);
        
        if (error) throw error;
        toast.success('Perspective created successfully');
      }
      
      setPerspectiveDialogOpen(false);
      resetPerspectiveForm();
      fetchData();
    } catch (err) {
      console.error('Error saving perspective:', err);
      toast.error('Failed to save perspective');
    }
  };

  const saveAnalysis = async () => {
    const content = {
      introduction: analysisForm.introduction,
      sections: [],
      methodology: analysisForm.methodology,
      keyFindings: analysisForm.keyFindings.split('\n').filter(f => f.trim()),
      implications: analysisForm.implications.split('\n').filter(i => i.trim())
    };

    const data = {
      title: analysisForm.title,
      summary: analysisForm.summary,
      category: analysisForm.category,
      date: analysisForm.date,
      featured: analysisForm.featured,
      content
    };

    try {
      if (editingAnalysis) {
        const { error } = await supabase
          .from('analyses')
          .update(data)
          .eq('id', editingAnalysis.id);
        
        if (error) throw error;
        toast.success('Analysis updated successfully');
      } else {
        const { error } = await supabase
          .from('analyses')
          .insert(data);
        
        if (error) throw error;
        toast.success('Analysis created successfully');
      }
      
      setAnalysisDialogOpen(false);
      resetAnalysisForm();
      fetchData();
    } catch (err) {
      console.error('Error saving analysis:', err);
      toast.error('Failed to save analysis');
    }
  };

  const deletePerspective = async (id: string) => {
    if (!confirm('Are you sure you want to delete this perspective?')) return;
    
    try {
      const { error } = await supabase.from('perspectives').delete().eq('id', id);
      if (error) throw error;
      toast.success('Perspective deleted');
      fetchData();
    } catch (err) {
      console.error('Error deleting perspective:', err);
      toast.error('Failed to delete perspective');
    }
  };

  const deleteAnalysis = async (id: string) => {
    if (!confirm('Are you sure you want to delete this analysis?')) return;
    
    try {
      const { error } = await supabase.from('analyses').delete().eq('id', id);
      if (error) throw error;
      toast.success('Analysis deleted');
      fetchData();
    } catch (err) {
      console.error('Error deleting analysis:', err);
      toast.error('Failed to delete analysis');
    }
  };

  // Count leads by status
  const reviewingCount = consultationLeads.filter(l => l.status === 'Reviewing').length;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
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
                  <CardDescription>Sign in with your admin credentials</CardDescription>
                </CardHeader>
                <CardContent>
                  {signUpSuccess ? (
                    <div className="text-center space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Account created successfully! Please contact the administrator to grant you admin access, then sign in.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => { setSignUpSuccess(false); setIsSignUp(false); }}
                        className="w-full"
                      >
                        Back to Sign In
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="admin@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={6}
                        />
                      </div>
                      {error && (
                        <p className="text-sm text-destructive text-center">{error}</p>
                      )}
                      <Button type="submit" className="w-full">
                        {isSignUp ? 'Create Account' : 'Sign In'}
                      </Button>
                      <p className="text-sm text-center text-muted-foreground">
                        {isSignUp ? (
                          <>Already have an account?{' '}
                            <button type="button" onClick={() => setIsSignUp(false)} className="text-primary hover:underline">
                              Sign in
                            </button>
                          </>
                        ) : (
                          <>First time?{' '}
                            <button type="button" onClick={() => setIsSignUp(true)} className="text-primary hover:underline">
                              Create account
                            </button>
                          </>
                        )}
                      </p>
                    </form>
                  )}
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
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-2">
                  Admin Dashboard
                </h1>
                <p className="font-body text-muted-foreground">
                  Signed in as {user.email}
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-6 gap-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Perspectives</CardTitle>
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{perspectives.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Analyses</CardTitle>
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyses.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{consultationLeads.length}</div>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20 bg-amber-50/5">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Reviewing</CardTitle>
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">{reviewingCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Submissions</CardTitle>
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{perspectiveSubmissions.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Emails</CardTitle>
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{emailCaptures.length}</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="leads" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="leads" className="relative">
                  Consultation Leads
                  {reviewingCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-amber-500 text-white rounded-full">
                      {reviewingCount}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="perspectives">Perspectives</TabsTrigger>
                <TabsTrigger value="analyses">Analyses</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
                <TabsTrigger value="emails">Email Captures</TabsTrigger>
              </TabsList>

              {/* Consultation Leads Tab */}
              <TabsContent value="leads">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Consultation Leads</CardTitle>
                      <CardDescription>
                        Review and manage consultation requests. Update status to approve or decline.
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={exportLeadsToCSV} disabled={consultationLeads.length === 0}>
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
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
                              <TableHead>Status</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Organisation</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {consultationLeads.map((lead) => (
                              <TableRow key={lead.id}>
                                <TableCell>
                                  <Select
                                    value={lead.status}
                                    onValueChange={(value) => updateLeadStatus(lead.id, value)}
                                  >
                                    <SelectTrigger className="w-[120px]">
                                      <Badge variant={getStatusBadgeVariant(lead.status)}>
                                        {lead.status}
                                      </Badge>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {leadStatuses.map((status) => (
                                        <SelectItem key={status} value={status}>
                                          {status}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell className="text-sm">
                                  {format(new Date(lead.created_at), 'dd MMM yyyy')}
                                </TableCell>
                                <TableCell className="font-medium">{lead.name}</TableCell>
                                <TableCell>{lead.email}</TableCell>
                                <TableCell>{lead.organisation || '-'}</TableCell>
                                <TableCell>
                                  <div className="flex gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setSelectedLead(lead)}
                                      title="View details"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyToClipboard(lead.email, 'Email')}
                                      title="Copy email"
                                    >
                                      <Copy className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyToClipboard(CALENDAR_LINK, 'Calendar link')}
                                      title="Copy calendar link"
                                    >
                                      <Calendar className="w-4 h-4" />
                                    </Button>
                                  </div>
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
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle>{selectedLead.name}</CardTitle>
                              <Badge variant={getStatusBadgeVariant(selectedLead.status)}>
                                {selectedLead.status}
                              </Badge>
                            </div>
                            <CardDescription>{selectedLead.email}</CardDescription>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedLead(null)}>
                            ✕
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex gap-2 pb-4 border-b">
                          <Select
                            value={selectedLead.status}
                            onValueChange={(value) => updateLeadStatus(selectedLead.id, value)}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {leadStatuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(selectedLead.email, 'Email')}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Email
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(CALENDAR_LINK, 'Calendar link')}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Copy Calendar Link
                          </Button>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Organisation</p>
                          <p>{selectedLead.organisation || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Role</p>
                          <p>{selectedLead.role || 'Not provided'}</p>
                        </div>
                        {selectedLead.website_linkedin && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Website / LinkedIn</p>
                            <a 
                              href={selectedLead.website_linkedin.startsWith('http') ? selectedLead.website_linkedin : `https://${selectedLead.website_linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1"
                            >
                              {selectedLead.website_linkedin}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Challenge</p>
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

              {/* Perspectives Tab */}
              <TabsContent value="perspectives">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Perspectives</CardTitle>
                      <CardDescription>
                        Manage published perspectives
                      </CardDescription>
                    </div>
                    <Dialog open={perspectiveDialogOpen} onOpenChange={(open) => {
                      setPerspectiveDialogOpen(open);
                      if (!open) resetPerspectiveForm();
                    }}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Perspective
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{editingPerspective ? 'Edit Perspective' : 'New Perspective'}</DialogTitle>
                          <DialogDescription>
                            {editingPerspective ? 'Update this perspective' : 'Create a new perspective'}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                              id="title"
                              value={perspectiveForm.title}
                              onChange={(e) => setPerspectiveForm(prev => ({ ...prev, title: e.target.value }))}
                              placeholder="Perspective title"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="summary">Summary</Label>
                            <Textarea
                              id="summary"
                              value={perspectiveForm.summary}
                              onChange={(e) => setPerspectiveForm(prev => ({ ...prev, summary: e.target.value }))}
                              placeholder="Brief summary"
                              rows={2}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="topic">Topic</Label>
                            <Select
                              value={perspectiveForm.topic}
                              onValueChange={(value) => setPerspectiveForm(prev => ({ ...prev, topic: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {perspectiveTopics.map((topic) => (
                                  <SelectItem key={topic} value={topic}>
                                    {topic}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="featured"
                              checked={perspectiveForm.featured}
                              onCheckedChange={(checked) => setPerspectiveForm(prev => ({ ...prev, featured: !!checked }))}
                            />
                            <Label htmlFor="featured">Featured</Label>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="content">Content (separate paragraphs with blank lines)</Label>
                            <Textarea
                              id="content"
                              value={perspectiveForm.content}
                              onChange={(e) => setPerspectiveForm(prev => ({ ...prev, content: e.target.value }))}
                              placeholder="Write your perspective content here..."
                              rows={10}
                            />
                          </div>
                          <Button onClick={savePerspective} className="w-full">
                            {editingPerspective ? 'Update Perspective' : 'Create Perspective'}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <p className="text-muted-foreground">Loading...</p>
                    ) : perspectives.length === 0 ? (
                      <p className="text-muted-foreground">No perspectives yet</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Topic</TableHead>
                              <TableHead>Featured</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {perspectives.map((perspective) => (
                              <TableRow key={perspective.id}>
                                <TableCell className="font-medium">{perspective.title}</TableCell>
                                <TableCell>{perspective.topic}</TableCell>
                                <TableCell>{perspective.featured ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => openEditPerspective(perspective)}>
                                      <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => deletePerspective(perspective.id)}>
                                      <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analyses Tab */}
              <TabsContent value="analyses">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Analyses</CardTitle>
                      <CardDescription>
                        Manage published analyses
                      </CardDescription>
                    </div>
                    <Dialog open={analysisDialogOpen} onOpenChange={(open) => {
                      setAnalysisDialogOpen(open);
                      if (!open) resetAnalysisForm();
                    }}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Analysis
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{editingAnalysis ? 'Edit Analysis' : 'New Analysis'}</DialogTitle>
                          <DialogDescription>
                            {editingAnalysis ? 'Update this analysis' : 'Create a new analysis'}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="analysisTitle">Title</Label>
                            <Input
                              id="analysisTitle"
                              value={analysisForm.title}
                              onChange={(e) => setAnalysisForm(prev => ({ ...prev, title: e.target.value }))}
                              placeholder="Analysis title"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="analysisSummary">Summary</Label>
                            <Textarea
                              id="analysisSummary"
                              value={analysisForm.summary}
                              onChange={(e) => setAnalysisForm(prev => ({ ...prev, summary: e.target.value }))}
                              placeholder="Brief summary"
                              rows={2}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="category">Category</Label>
                              <Select
                                value={analysisForm.category}
                                onValueChange={(value) => setAnalysisForm(prev => ({ ...prev, category: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {analysisCategories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                      {cat}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="date">Year</Label>
                              <Input
                                id="date"
                                value={analysisForm.date}
                                onChange={(e) => setAnalysisForm(prev => ({ ...prev, date: e.target.value }))}
                                placeholder="2025"
                              />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="analysisFeatured"
                              checked={analysisForm.featured}
                              onCheckedChange={(checked) => setAnalysisForm(prev => ({ ...prev, featured: !!checked }))}
                            />
                            <Label htmlFor="analysisFeatured">Featured</Label>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="introduction">Introduction</Label>
                            <Textarea
                              id="introduction"
                              value={analysisForm.introduction}
                              onChange={(e) => setAnalysisForm(prev => ({ ...prev, introduction: e.target.value }))}
                              placeholder="Introduction paragraph"
                              rows={3}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="methodology">Methodology</Label>
                            <Textarea
                              id="methodology"
                              value={analysisForm.methodology}
                              onChange={(e) => setAnalysisForm(prev => ({ ...prev, methodology: e.target.value }))}
                              placeholder="Methodology description"
                              rows={3}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="keyFindings">Key Findings (one per line)</Label>
                            <Textarea
                              id="keyFindings"
                              value={analysisForm.keyFindings}
                              onChange={(e) => setAnalysisForm(prev => ({ ...prev, keyFindings: e.target.value }))}
                              placeholder="Finding 1&#10;Finding 2&#10;Finding 3"
                              rows={4}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="implications">Implications (one per line)</Label>
                            <Textarea
                              id="implications"
                              value={analysisForm.implications}
                              onChange={(e) => setAnalysisForm(prev => ({ ...prev, implications: e.target.value }))}
                              placeholder="Implication 1&#10;Implication 2&#10;Implication 3"
                              rows={4}
                            />
                          </div>
                          <Button onClick={saveAnalysis} className="w-full">
                            {editingAnalysis ? 'Update Analysis' : 'Create Analysis'}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <p className="text-muted-foreground">Loading...</p>
                    ) : analyses.length === 0 ? (
                      <p className="text-muted-foreground">No analyses yet</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Year</TableHead>
                              <TableHead>Featured</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {analyses.map((analysis) => (
                              <TableRow key={analysis.id}>
                                <TableCell className="font-medium">{analysis.title}</TableCell>
                                <TableCell>{analysis.category}</TableCell>
                                <TableCell>{analysis.date || '-'}</TableCell>
                                <TableCell>{analysis.featured ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => openEditAnalysis(analysis)}>
                                      <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => deleteAnalysis(analysis.id)}>
                                      <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Perspective Submissions Tab */}
              <TabsContent value="submissions">
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
                    ) : perspectiveSubmissions.length === 0 ? (
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
                            {perspectiveSubmissions.map((submission) => (
                              <TableRow key={submission.id}>
                                <TableCell className="text-sm">
                                  {format(new Date(submission.created_at), 'dd MMM yyyy')}
                                </TableCell>
                                <TableCell className="font-medium">{submission.name}</TableCell>
                                <TableCell>{submission.email}</TableCell>
                                <TableCell>{submission.topic}</TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedPerspectiveSubmission(submission)}
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

                {/* Submission Detail Modal */}
                {selectedPerspectiveSubmission && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{selectedPerspectiveSubmission.topic}</CardTitle>
                            <CardDescription>By {selectedPerspectiveSubmission.name}</CardDescription>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedPerspectiveSubmission(null)}>
                            ✕
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Email</p>
                          <p>{selectedPerspectiveSubmission.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Organisation</p>
                          <p>{selectedPerspectiveSubmission.organisation || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Perspective</p>
                          <p className="whitespace-pre-wrap">{selectedPerspectiveSubmission.perspective_text}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                          <p>{format(new Date(selectedPerspectiveSubmission.created_at), 'dd MMMM yyyy, HH:mm')}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>

              {/* Email Captures Tab */}
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
