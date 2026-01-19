-- 1. consultation_leads: Admin-only read access
DROP POLICY "Allow select for consultation_leads" ON consultation_leads;
CREATE POLICY "Admins can read leads" ON consultation_leads FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. perspective_submissions: Admin-only read access  
DROP POLICY "Allow select for perspective_submissions" ON perspective_submissions;
CREATE POLICY "Admins can read submissions" ON perspective_submissions FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. analyses: Admin-only modifications
DROP POLICY "Allow insert for analyses" ON analyses;
DROP POLICY "Allow update for analyses" ON analyses;
DROP POLICY "Allow delete for analyses" ON analyses;
CREATE POLICY "Admins can insert analyses" ON analyses FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update analyses" ON analyses FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete analyses" ON analyses FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. perspectives: Admin-only modifications
DROP POLICY "Allow insert for perspectives" ON perspectives;
DROP POLICY "Allow update for perspectives" ON perspectives;
DROP POLICY "Allow delete for perspectives" ON perspectives;
CREATE POLICY "Admins can insert perspectives" ON perspectives FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update perspectives" ON perspectives FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete perspectives" ON perspectives FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));