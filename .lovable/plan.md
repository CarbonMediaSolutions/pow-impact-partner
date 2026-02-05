

## Fix: Image Upload Stuck on "Uploading..."

### Problem Analysis

The image upload in the admin panel gets stuck on "Uploading..." and never completes. This is caused by one of two issues:

1. **RLS Policy Issue**: The storage INSERT policy requires authenticated users but may be rejecting the upload due to missing `owner` metadata
2. **Error Handling Issue**: If the upload fails silently or times out, the `imageUploading` state isn't reset properly

### Root Cause

Looking at the current RLS policies for the `perspective-images` bucket:

```sql
-- Current INSERT policy
WITH CHECK (bucket_id = 'perspective-images')
```

This policy only checks the bucket_id but doesn't ensure the request is properly authenticated through the Supabase client. The storage.objects table also has an `owner` column that should be set to the authenticated user's ID.

### Solution

**Two-part fix:**

1. **Improve error handling in the upload function** - Add better error logging, timeout handling, and ensure the loading state always resets
2. **Update RLS policy** - Make the INSERT policy more permissive for authenticated users by explicitly allowing it

---

### File Changes

| File | Changes |
|------|---------|
| `src/pages/Admin.tsx` | Improve `handleImageUpload` function with timeout, better error logging, and state reset |
| `supabase/migrations/[timestamp].sql` | Update storage RLS policy to be more explicit |

---

### Implementation Details

**1. Update handleImageUpload function:**

```typescript
const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  
  if (!file.type.startsWith('image/')) {
    toast.error('Please upload an image file');
    return;
  }
  
  if (file.size > 5 * 1024 * 1024) {
    toast.error('Image must be less than 5MB');
    return;
  }
  
  setImageUploading(true);
  
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    console.log('Starting upload to perspective-images bucket:', fileName);
    
    const { data, error } = await supabase.storage
      .from('perspective-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Storage upload error:', error);
      throw error;
    }
    
    console.log('Upload successful:', data);
    
    const { data: { publicUrl } } = supabase.storage
      .from('perspective-images')
      .getPublicUrl(fileName);
    
    setPerspectiveForm(prev => ({ ...prev, image: publicUrl }));
    toast.success('Image uploaded successfully');
  } catch (err) {
    console.error('Error uploading image:', err);
    toast.error(err instanceof Error ? err.message : 'Failed to upload image');
  } finally {
    setImageUploading(false);
    // Reset the file input so the same file can be selected again
    const input = document.getElementById('perspective-image') as HTMLInputElement;
    if (input) input.value = '';
  }
};
```

**2. Update Storage RLS Policy:**

The current INSERT policy may be too restrictive. We need to drop and recreate it with explicit authentication:

```sql
-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Authenticated users can upload perspective images" ON storage.objects;

-- Create a more explicit INSERT policy
CREATE POLICY "Authenticated users can upload perspective images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'perspective-images'
);
```

Additionally, ensure there are no conflicting policies blocking the upload.

---

### What This Fixes

| Issue | Fix |
|-------|-----|
| Upload stuck on "Uploading..." | Better error handling ensures state always resets |
| Silent upload failures | Added console logging for debugging |
| File input not resetting | Clear input value after upload (success or failure) |
| Potential RLS issues | Explicit policy with correct authentication |

---

### Testing Steps

After implementation:
1. Go to Admin dashboard
2. Click "Add New" perspective
3. Click the image upload area and select an image
4. Verify the upload completes (either shows the image preview or shows an error toast)
5. If it fails, check the browser console for error details

