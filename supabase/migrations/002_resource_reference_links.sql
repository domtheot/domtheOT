ALTER TABLE resources
  ADD COLUMN IF NOT EXISTS link_url TEXT,
  ADD COLUMN IF NOT EXISTS featured_link BOOLEAN DEFAULT FALSE NOT NULL;

CREATE INDEX IF NOT EXISTS idx_resources_featured_link
  ON resources(featured_link)
  WHERE featured_link = TRUE;

DROP POLICY IF EXISTS "Allow full admin access to resources" ON resources;
CREATE POLICY "Allow authenticated admin access to resources"
  ON resources FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);
