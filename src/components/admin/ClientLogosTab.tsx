import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Pencil, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface ClientLogo {
  id: string;
  name: string;
  image_url: string;
  sort_order: number;
  created_at: string;
}

const emptyForm = { name: '', image_url: '', sort_order: 0 };

export function ClientLogosTab() {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ClientLogo | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchLogos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('client_logos' as any)
      .select('*')
      .order('sort_order', { ascending: true });
    if (!error && data) setLogos(data as any);
    setLoading(false);
  };

  useEffect(() => { fetchLogos(); }, []);

  const resetForm = () => { setForm(emptyForm); setEditing(null); };

  const openAdd = () => {
    resetForm();
    setForm(prev => ({ ...prev, sort_order: logos.length }));
    setDialogOpen(true);
  };

  const openEdit = (logo: ClientLogo) => {
    setEditing(logo);
    setForm({ name: logo.name, image_url: logo.image_url, sort_order: logo.sort_order });
    setDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Please upload an image file'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be less than 5MB'); return; }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error } = await supabase.storage
        .from('client-logos')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });
      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('client-logos')
        .getPublicUrl(fileName);

      setForm(prev => ({ ...prev, image_url: publicUrl }));
      toast.success('Logo uploaded');
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!form.name.trim()) { toast.error('Company name is required'); return; }
    if (!form.image_url.trim()) { toast.error('Please upload a logo image'); return; }

    setSaving(true);
    try {
      const payload = { name: form.name, image_url: form.image_url, sort_order: form.sort_order };

      if (editing) {
        const { error } = await (supabase.from('client_logos' as any) as any).update(payload).eq('id', editing.id);
        if (error) throw error;
        toast.success('Logo updated');
      } else {
        const { error } = await (supabase.from('client_logos' as any) as any).insert(payload);
        if (error) throw error;
        toast.success('Logo added');
      }
      setDialogOpen(false);
      resetForm();
      fetchLogos();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save logo');
    } finally {
      setSaving(false);
    }
  };

  const deleteLogo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client logo?')) return;
    try {
      const { error } = await (supabase.from('client_logos' as any) as any).delete().eq('id', id);
      if (error) throw error;
      toast.success('Logo deleted');
      fetchLogos();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete logo');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Client Logos</CardTitle>
          <CardDescription>Manage logos displayed in the client carousel on the homepage.</CardDescription>
        </div>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Logo
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : logos.length === 0 ? (
          <p className="text-muted-foreground">No client logos yet. Click "Add Logo" to get started.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Order</TableHead>
                <TableHead className="w-20">Logo</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logos.map(logo => (
                <TableRow key={logo.id}>
                  <TableCell className="font-mono text-sm">{logo.sort_order}</TableCell>
                  <TableCell>
                    <img src={logo.image_url} alt={logo.name} className="h-10 w-auto max-w-[80px] object-contain" />
                  </TableCell>
                  <TableCell className="font-medium">{logo.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(logo)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteLogo(logo.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) { setDialogOpen(false); resetForm(); } else setDialogOpen(true); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Client Logo' : 'Add Client Logo'}</DialogTitle>
            <DialogDescription>Upload a company logo and enter the company name.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Logo Image *</Label>
              <div className="flex items-center gap-4">
                {form.image_url && (
                  <img src={form.image_url} alt="Preview" className="h-16 w-auto max-w-[120px] object-contain border rounded p-1" />
                )}
                <div>
                  <input type="file" accept="image/*" id="client-logo-upload" className="hidden" onChange={handleImageUpload} />
                  <Button
                    variant="outline" size="sm"
                    onClick={() => document.getElementById('client-logo-upload')?.click()}
                    disabled={uploading}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Uploading...' : form.image_url ? 'Replace' : 'Upload'}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Company Name *</Label>
              <Input value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g. Acme Corp" />
            </div>

            <div className="space-y-2 max-w-[120px]">
              <Label>Sort Order</Label>
              <Input type="number" value={form.sort_order} onChange={e => setForm(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))} />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => { setDialogOpen(false); resetForm(); }}>Cancel</Button>
              <Button onClick={save} disabled={saving}>
                {saving ? 'Saving...' : editing ? 'Update Logo' : 'Add Logo'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
