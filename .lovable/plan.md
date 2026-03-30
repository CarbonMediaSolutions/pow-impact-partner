

## Connect Contact Form to Database + Email Notification

### 1. Create `contact_submissions` table

New database migration:

```sql
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  organisation text,
  email text NOT NULL,
  message text
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Admins can read contact submissions" ON public.contact_submissions
  FOR SELECT TO public USING (has_role(auth.uid(), 'admin'::app_role));
```

### 2. Update `src/pages/Contact.tsx`

Replace the simulated `setTimeout` in `handleSubmit` with:
- Insert into `contact_submissions` table via Supabase client
- Invoke `send-consultation-notification` edge function (reuse the existing one) with the contact form data, mapping `message` to `problem_statement` since that's the field the notification template expects
- Wrap email send in try/catch so submission succeeds even if email fails
- Add `import { supabase }` from the integrations client

### 3. No new edge function needed

The existing `send-consultation-notification` edge function already sends a formatted email to `paddi@plexapartners.com`. The contact form data maps cleanly to its interface (`name`, `email`, `organisation`, `problem_statement`). The email subject will say "New Consultation Request" which is close enough, or we can note in the problem_statement that it's from the contact form.

### Technical details

- The `problem_statement` field sent to the edge function will be prefixed with `[Contact Form]` so the admin can distinguish contact inquiries from consultation requests
- Error handling follows the same pattern as `BookConsultation.tsx`
- No authentication required (public INSERT policy)

