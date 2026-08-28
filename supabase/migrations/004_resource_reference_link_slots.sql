ALTER TABLE resources
  ADD COLUMN IF NOT EXISTS reference_links JSONB DEFAULT '[]'::jsonb NOT NULL;

UPDATE resources
SET reference_links = jsonb_build_array(link_url)
WHERE link_url IS NOT NULL
  AND link_url <> ''
  AND reference_links = '[]'::jsonb;

ALTER TABLE resources
  DROP CONSTRAINT IF EXISTS resources_reference_links_max_five;

ALTER TABLE resources
  ADD CONSTRAINT resources_reference_links_max_five
  CHECK (jsonb_typeof(reference_links) = 'array' AND jsonb_array_length(reference_links) <= 5);
