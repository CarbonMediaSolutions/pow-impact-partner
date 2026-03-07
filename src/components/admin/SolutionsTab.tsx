import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Pencil, Trash2, Upload, X, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';

interface SolutionRow {
  id: string;
  sort_order: number;
  title: string;
  perspective: string;
  description: string;
  services: string[];
  detail_content: string;
  price: string;
  price_note: string;
  image_url: string | null;
  pdf_url: string | null;
  payment_link: string | null;
  title_zh_hant: string;
  title_zh_hans: string;
  description_zh_hant: string;
  description_zh_hans: string;
  detail_content_zh_hant: string;
  detail_content_zh_hans: string;
  services_zh_hant: string[];
  services_zh_hans: string[];
  perspective_zh_hant: string;
  perspective_zh_hans: string;
  price_zh_hant: string;
  price_zh_hans: string;
  price_note_zh_hant: string;
  price_note_zh_hans: string;
}

const emptyForm = {
  id: '',
  sort_order: 0,
  title: '',
  perspective: '',
  description: '',
  services: '',
  detail_content: '',
  price: '',
  price_note: '',
  image_url: '',
  pdf_url: '',
  payment_link: '',
  title_zh_hant: '',
  title_zh_hans: '',
  description_zh_hant: '',
  description_zh_hans: '',
  detail_content_zh_hant: '',
  detail_content_zh_hans: '',
  services_zh_hant: '',
  services_zh_hans: '',
  perspective_zh_hant: '',
  perspective_zh_hans: '',
  price_zh_hant: '',
  price_zh_hans: '',
  price_note_zh_hant: '',
  price_note_zh_hans: '',
};

export function SolutionsTab() {
  const [solutions, setSolutions] = useState<SolutionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SolutionRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [pdfUploading, setPdfUploading] = useState(false);

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('solutions' as any)
      .select('*')
      .order('sort_order', { ascending: true });
    if (data) setSolutions(data as any);
    if (error) toast.error('Failed to load solutions');
    setLoading(false);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
  };

  const openEdit = (s: SolutionRow) => {
    setEditing(s);
    setForm({
      id: s.id,
      sort_order: s.sort_order,
      title: s.title,
      perspective: s.perspective,
      description: s.description,
      services: s.services.join('\n'),
      detail_content: s.detail_content,
      price: s.price,
      price_note: s.price_note,
      image_url: s.image_url || '',
      pdf_url: s.pdf_url || '',
      payment_link: s.payment_link || '',
      title_zh_hant: s.title_zh_hant,
      title_zh_hans: s.title_zh_hans,
      description_zh_hant: s.description_zh_hant,
      description_zh_hans: s.description_zh_hans,
      detail_content_zh_hant: s.detail_content_zh_hant,
      detail_content_zh_hans: s.detail_content_zh_hans,
      services_zh_hant: s.services_zh_hant.join('\n'),
      services_zh_hans: s.services_zh_hans.join('\n'),
      perspective_zh_hant: s.perspective_zh_hant,
      perspective_zh_hans: s.perspective_zh_hans,
      price_zh_hant: s.price_zh_hant,
      price_zh_hans: s.price_zh_hans,
      price_note_zh_hant: s.price_note_zh_hant,
      price_note_zh_hans: s.price_note_zh_hans,
    });
    setDialogOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'pdf') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const setUploading = type === 'image' ? setImageUploading : setPdfUploading;
    setUploading(true);

    const ext = file.name.split('.').pop();
    const path = `${type}s/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('solution-assets').upload(path, file);

    if (error) {
      toast.error(`Failed to upload ${type}`);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('solution-assets').getPublicUrl(path);
    const field = type === 'image' ? 'image_url' : 'pdf_url';
    setForm(prev => ({ ...prev, [field]: urlData.publicUrl }));
    setUploading(false);
    toast.success(`${type === 'image' ? 'Image' : 'PDF'} uploaded`);
  };

  const save = async () => {
    if (!form.id.trim() || !form.title.trim()) {
      toast.error('ID and Title are required');
      return;
    }
    setSaving(true);

    const toArr = (s: string) => s.split('\n').map(l => l.trim()).filter(Boolean);

    const payload = {
      id: form.id.trim(),
      sort_order: form.sort_order,
      title: form.title,
      perspective: form.perspective,
      description: form.description,
      services: toArr(form.services),
      detail_content: form.detail_content,
      price: form.price,
      price_note: form.price_note,
      image_url: form.image_url || null,
      pdf_url: form.pdf_url || null,
      payment_link: form.payment_link || null,
      title_zh_hant: form.title_zh_hant,
      title_zh_hans: form.title_zh_hans,
      description_zh_hant: form.description_zh_hant,
      description_zh_hans: form.description_zh_hans,
      detail_content_zh_hant: form.detail_content_zh_hant,
      detail_content_zh_hans: form.detail_content_zh_hans,
      services_zh_hant: toArr(form.services_zh_hant),
      services_zh_hans: toArr(form.services_zh_hans),
      perspective_zh_hant: form.perspective_zh_hant,
      perspective_zh_hans: form.perspective_zh_hans,
      price_zh_hant: form.price_zh_hant,
      price_zh_hans: form.price_zh_hans,
      price_note_zh_hant: form.price_note_zh_hant,
      price_note_zh_hans: form.price_note_zh_hans,
    };

    let error;
    if (editing) {
      const { id, ...rest } = payload;
      ({ error } = await supabase.from('solutions' as any).update(rest).eq('id', editing.id));
    } else {
      ({ error } = await supabase.from('solutions' as any).insert(payload));
    }

    if (error) {
      toast.error('Failed to save solution');
      console.error(error);
    } else {
      toast.success(editing ? 'Solution updated' : 'Solution created');
      setDialogOpen(false);
      resetForm();
      fetchSolutions();
    }
    setSaving(false);
  };

  const deleteSolution = async (id: string) => {
    if (!confirm('Delete this solution?')) return;
    const { error } = await supabase.from('solutions' as any).delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete');
    } else {
      toast.success('Solution deleted');
      fetchSolutions();
    }
  };

  const moveSolution = async (index: number, direction: 'up' | 'down') => {
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= solutions.length) return;

    const current = solutions[index];
    const swap = solutions[swapIndex];

    const { error: e1 } = await supabase.from('solutions' as any).update({ sort_order: swap.sort_order }).eq('id', current.id);
    const { error: e2 } = await supabase.from('solutions' as any).update({ sort_order: current.sort_order }).eq('id', swap.id);

    if (e1 || e2) {
      toast.error('Failed to reorder');
    } else {
      fetchSolutions();
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Solutions</CardTitle>
          <CardDescription>Manage solution cards, pricing, and payment links</CardDescription>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="w-4 h-4 mr-2" />Add Solution</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit Solution' : 'New Solution'}</DialogTitle>
              <DialogDescription>{editing ? 'Update this solution card' : 'Create a new solution card'}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Basic fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ID (slug)</Label>
                  <Input value={form.id} onChange={e => setForm(p => ({ ...p, id: e.target.value }))} placeholder="e.g. governance" disabled={!!editing} />
                </div>
                <div className="space-y-2">
                  <Label>Sort Order</Label>
                  <Input type="number" value={form.sort_order} onChange={e => setForm(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} />
                </div>
              </div>

              {/* English */}
              <h3 className="font-medium text-sm text-muted-foreground border-b pb-1">English</h3>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Perspective (tagline)</Label>
                <Input value={form.perspective} onChange={e => setForm(p => ({ ...p, perspective: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Services (one per line)</Label>
                <Textarea value={form.services} onChange={e => setForm(p => ({ ...p, services: e.target.value }))} rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Detail Content (shown when expanded)</Label>
                <Textarea value={form.detail_content} onChange={e => setForm(p => ({ ...p, detail_content: e.target.value }))} rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Price Note</Label>
                  <Input value={form.price_note} onChange={e => setForm(p => ({ ...p, price_note: e.target.value }))} />
                </div>
              </div>

              {/* Traditional Chinese */}
              <h3 className="font-medium text-sm text-muted-foreground border-b pb-1">繁體中文 (Traditional Chinese)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={form.title_zh_hant} onChange={e => setForm(p => ({ ...p, title_zh_hant: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Perspective</Label>
                  <Input value={form.perspective_zh_hant} onChange={e => setForm(p => ({ ...p, perspective_zh_hant: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={form.description_zh_hant} onChange={e => setForm(p => ({ ...p, description_zh_hant: e.target.value }))} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Services (one per line)</Label>
                <Textarea value={form.services_zh_hant} onChange={e => setForm(p => ({ ...p, services_zh_hant: e.target.value }))} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Detail Content</Label>
                <Textarea value={form.detail_content_zh_hant} onChange={e => setForm(p => ({ ...p, detail_content_zh_hant: e.target.value }))} rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input value={form.price_zh_hant} onChange={e => setForm(p => ({ ...p, price_zh_hant: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Price Note</Label>
                  <Input value={form.price_note_zh_hant} onChange={e => setForm(p => ({ ...p, price_note_zh_hant: e.target.value }))} />
                </div>
              </div>

              {/* Simplified Chinese */}
              <h3 className="font-medium text-sm text-muted-foreground border-b pb-1">简体中文 (Simplified Chinese)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={form.title_zh_hans} onChange={e => setForm(p => ({ ...p, title_zh_hans: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Perspective</Label>
                  <Input value={form.perspective_zh_hans} onChange={e => setForm(p => ({ ...p, perspective_zh_hans: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={form.description_zh_hans} onChange={e => setForm(p => ({ ...p, description_zh_hans: e.target.value }))} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Services (one per line)</Label>
                <Textarea value={form.services_zh_hans} onChange={e => setForm(p => ({ ...p, services_zh_hans: e.target.value }))} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Detail Content</Label>
                <Textarea value={form.detail_content_zh_hans} onChange={e => setForm(p => ({ ...p, detail_content_zh_hans: e.target.value }))} rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input value={form.price_zh_hans} onChange={e => setForm(p => ({ ...p, price_zh_hans: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Price Note</Label>
                  <Input value={form.price_note_zh_hans} onChange={e => setForm(p => ({ ...p, price_note_zh_hans: e.target.value }))} />
                </div>
              </div>

              {/* Media & Payment */}
              <h3 className="font-medium text-sm text-muted-foreground border-b pb-1">Media & Payment</h3>
              <div className="space-y-2">
                <Label>Image</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                  {form.image_url ? (
                    <div className="flex items-center justify-between">
                      <img src={form.image_url} alt="" className="h-16 rounded object-cover" />
                      <Button variant="ghost" size="sm" onClick={() => setForm(p => ({ ...p, image_url: '' }))}><X className="w-4 h-4" /></Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">{imageUploading ? 'Uploading...' : 'Click to upload image'}</span>
                      <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'image')} className="hidden" disabled={imageUploading} />
                    </label>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>PDF Document</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                  {form.pdf_url ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground truncate flex-1">PDF uploaded</span>
                      <Button variant="ghost" size="sm" onClick={() => setForm(p => ({ ...p, pdf_url: '' }))}><X className="w-4 h-4" /></Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">{pdfUploading ? 'Uploading...' : 'Click to upload PDF'}</span>
                      <input type="file" accept=".pdf" onChange={e => handleFileUpload(e, 'pdf')} className="hidden" disabled={pdfUploading} />
                    </label>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Payment / Checkout Link (e.g. Stripe URL)</Label>
                <Input value={form.payment_link} onChange={e => setForm(p => ({ ...p, payment_link: e.target.value }))} placeholder="https://buy.stripe.com/..." />
              </div>

              <Button onClick={save} className="w-full" disabled={saving}>
                {saving ? 'Saving...' : (editing ? 'Update Solution' : 'Create Solution')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : solutions.length === 0 ? (
          <p className="text-muted-foreground">No solutions yet</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Payment Link</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {solutions.map(s => (
                  <TableRow key={s.id}>
                    <TableCell>{s.sort_order}</TableCell>
                    <TableCell className="font-medium">{s.title}</TableCell>
                    <TableCell className="text-sm text-muted-foreground truncate max-w-[200px]">{s.payment_link || '—'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(s)}><Pencil className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteSolution(s.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
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
  );
}
