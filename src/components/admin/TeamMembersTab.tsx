import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Pencil, Trash2, Upload, ArrowUp, ArrowDown, ZoomIn } from 'lucide-react';
import { toast } from 'sonner';

interface TeamMember {
  id: string;
  name: string;
  name_zh_hant: string;
  name_zh_hans: string;
  role: string;
  role_zh_hant: string;
  role_zh_hans: string;
  focus: string;
  focus_zh_hant: string;
  focus_zh_hans: string;
  bio: string;
  bio_zh_hant: string;
  bio_zh_hans: string;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

const emptyForm = {
  name: '', name_zh_hant: '', name_zh_hans: '',
  role: '', role_zh_hant: '', role_zh_hans: '',
  focus: '', focus_zh_hant: '', focus_zh_hans: '',
  bio: '', bio_zh_hant: '', bio_zh_hans: '',
  image_url: '',
  sort_order: 0,
};

export function TeamMembersTab() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('team_members' as any)
      .select('*')
      .order('sort_order', { ascending: true });
    if (!error && data) setMembers(data as any);
    setLoading(false);
  };

  useEffect(() => { fetchMembers(); }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
  };

  const openAdd = () => {
    resetForm();
    setForm(prev => ({ ...prev, sort_order: members.length }));
    setDialogOpen(true);
  };

  const openEdit = (m: TeamMember) => {
    setEditing(m);
    setForm({
      name: m.name, name_zh_hant: m.name_zh_hant, name_zh_hans: m.name_zh_hans,
      role: m.role, role_zh_hant: m.role_zh_hant, role_zh_hans: m.role_zh_hans,
      focus: m.focus, focus_zh_hant: m.focus_zh_hant, focus_zh_hans: m.focus_zh_hans,
      bio: m.bio, bio_zh_hant: m.bio_zh_hant, bio_zh_hans: m.bio_zh_hans,
      image_url: m.image_url || '',
      sort_order: m.sort_order,
    });
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
        .from('team-portraits')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });
      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('team-portraits')
        .getPublicUrl(fileName);

      setForm(prev => ({ ...prev, image_url: publicUrl }));
      toast.success('Portrait uploaded');
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!form.name.trim() || !form.role.trim()) {
      toast.error('Name and role are required');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name, name_zh_hant: form.name_zh_hant, name_zh_hans: form.name_zh_hans,
        role: form.role, role_zh_hant: form.role_zh_hant, role_zh_hans: form.role_zh_hans,
        focus: form.focus, focus_zh_hant: form.focus_zh_hant, focus_zh_hans: form.focus_zh_hans,
        bio: form.bio, bio_zh_hant: form.bio_zh_hant, bio_zh_hans: form.bio_zh_hans,
        image_url: form.image_url || null,
        sort_order: form.sort_order,
      };

      if (editing) {
        const { error } = await (supabase.from('team_members' as any) as any).update(payload).eq('id', editing.id);
        if (error) throw error;
        toast.success('Team member updated');
      } else {
        const { error } = await (supabase.from('team_members' as any) as any).insert(payload);
        if (error) throw error;
        toast.success('Team member added');
      }
      setDialogOpen(false);
      resetForm();
      fetchMembers();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save team member');
    } finally {
      setSaving(false);
    }
  };

  const moveMember = async (index: number, direction: 'up' | 'down') => {
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    const current = members[index];
    const swap = members[swapIndex];
    try {
      const { error: e1 } = await (supabase.from('team_members' as any) as any).update({ sort_order: swap.sort_order }).eq('id', current.id);
      const { error: e2 } = await (supabase.from('team_members' as any) as any).update({ sort_order: current.sort_order }).eq('id', swap.id);
      if (e1 || e2) throw e1 || e2;
      fetchMembers();
    } catch (err) {
      console.error(err);
      toast.error('Failed to reorder');
    }
  };

  const deleteMember = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      const { error } = await (supabase.from('team_members' as any) as any).delete().eq('id', id);
      if (error) throw error;
      toast.success('Team member deleted');
      fetchMembers();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete team member');
    }
  };

  const updateField = (field: string, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage team members displayed on the About page.</CardDescription>
        </div>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : members.length === 0 ? (
          <p className="text-muted-foreground">No team members yet. Click "Add Member" to get started.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Order</TableHead>
                <TableHead className="w-16">Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map(m => (
                <TableRow key={m.id}>
                  <TableCell className="font-mono text-sm">{m.sort_order}</TableCell>
                  <TableCell>
                    {m.image_url ? (
                      <button onClick={() => setPreviewImage(m.image_url)} className="group relative cursor-pointer">
                        <img src={m.image_url} alt={m.name} className="w-12 h-12 rounded-full object-cover" />
                        <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ZoomIn className="w-4 h-4 text-white" />
                        </div>
                      </button>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-muted" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{m.role}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => moveMember(members.indexOf(m), 'up')} disabled={members.indexOf(m) === 0}>
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => moveMember(members.indexOf(m), 'down')} disabled={members.indexOf(m) === members.length - 1}>
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openEdit(m)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMember(m.id)}>
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
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
            <DialogDescription>Fill in the details below. Fields marked with * are required.</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Portrait */}
            <div className="space-y-2">
              <Label>Portrait Image</Label>
              <div className="flex items-center gap-4">
                {form.image_url && (
                  <img src={form.image_url} alt="Preview" className="w-20 h-20 rounded-lg object-cover" />
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    id="team-portrait-upload"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('team-portrait-upload')?.click()}
                    disabled={uploading}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Uploading...' : form.image_url ? 'Replace Image' : 'Upload Image'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Sort Order */}
            <div className="space-y-2 max-w-[120px]">
              <Label>Sort Order</Label>
              <Input
                type="number"
                value={form.sort_order}
                onChange={e => updateField('sort_order', parseInt(e.target.value) || 0)}
              />
            </div>

            {/* 3-column fields: Name */}
            <div>
              <Label className="mb-2 block font-semibold">Name *</Label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">English</Label>
                  <Input value={form.name} onChange={e => updateField('name', e.target.value)} placeholder="Full name" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">繁體中文</Label>
                  <Input value={form.name_zh_hant} onChange={e => updateField('name_zh_hant', e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">简体中文</Label>
                  <Input value={form.name_zh_hans} onChange={e => updateField('name_zh_hans', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Role */}
            <div>
              <Label className="mb-2 block font-semibold">Role *</Label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">English</Label>
                  <Input value={form.role} onChange={e => updateField('role', e.target.value)} placeholder="e.g. Vice President · Technology" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">繁體中文</Label>
                  <Input value={form.role_zh_hant} onChange={e => updateField('role_zh_hant', e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">简体中文</Label>
                  <Input value={form.role_zh_hans} onChange={e => updateField('role_zh_hans', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Focus / Specialities */}
            <div>
              <Label className="mb-2 block font-semibold">Focus / Specialities</Label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">English</Label>
                  <Input value={form.focus} onChange={e => updateField('focus', e.target.value)} placeholder="e.g. Strategy · Governance" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">繁體中文</Label>
                  <Input value={form.focus_zh_hant} onChange={e => updateField('focus_zh_hant', e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">简体中文</Label>
                  <Input value={form.focus_zh_hans} onChange={e => updateField('focus_zh_hans', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <Label className="mb-2 block font-semibold">Bio (for hover popup)</Label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">English</Label>
                  <Textarea value={form.bio} onChange={e => updateField('bio', e.target.value)} placeholder="2-3 sentences about this team member..." rows={4} />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">繁體中文</Label>
                  <Textarea value={form.bio_zh_hant} onChange={e => updateField('bio_zh_hant', e.target.value)} rows={4} />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">简体中文</Label>
                  <Textarea value={form.bio_zh_hans} onChange={e => updateField('bio_zh_hans', e.target.value)} rows={4} />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => { setDialogOpen(false); resetForm(); }}>Cancel</Button>
              <Button onClick={save} disabled={saving}>
                {saving ? 'Saving...' : editing ? 'Update Member' : 'Add Member'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
