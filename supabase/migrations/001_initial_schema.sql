-- Initial SQL Schema Migration for Dom the OT

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. INQUIRIES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    preferred_contact TEXT,
    service TEXT NOT NULL,
    stage TEXT,
    due_date DATE,
    location TEXT,
    source TEXT,
    message TEXT NOT NULL,
    preferred_date TEXT,
    consent BOOLEAN DEFAULT FALSE NOT NULL,
    status TEXT DEFAULT 'new' NOT NULL,
    consultation_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Index for sorting and filtering inquiries
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);

-- ==========================================
-- 2. INQUIRY NOTES TABLE (Internal Admin Notes)
-- ==========================================
CREATE TABLE IF NOT EXISTS inquiry_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id UUID NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notes_inquiry_id ON inquiry_notes(inquiry_id);

-- ==========================================
-- 3. RESOURCES TABLE (Educational Hub Content)
-- ==========================================
CREATE TABLE IF NOT EXISTS resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    link_url TEXT,
    reference_links JSONB DEFAULT '[]'::jsonb NOT NULL,
    featured_link BOOLEAN DEFAULT FALSE NOT NULL,
    published BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_resources_slug ON resources(slug);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_featured_link ON resources(featured_link) WHERE featured_link = TRUE;

-- ==========================================
-- 4. TESTIMONIALS TABLE (Client Stories)
-- ==========================================
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    service TEXT NOT NULL,
    category TEXT NOT NULL,
    quote TEXT NOT NULL,
    photo_url TEXT,
    video_url TEXT,
    featured BOOLEAN DEFAULT FALSE NOT NULL,
    published BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured) WHERE featured = TRUE;

-- ==========================================
-- 5. FAQS TABLE (Frequently Asked Questions)
-- ==========================================
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    published BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);

-- ==========================================
-- AUTOMATIC UPDATED_AT TIMESTAMP TRIGGER
-- ==========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to tables
CREATE TRIGGER update_inquiries_updated_at
    BEFORE UPDATE ON inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
    BEFORE UPDATE ON resources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at
    BEFORE UPDATE ON faqs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiry_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- 1. Resources Policies
-- Public can read published resources
CREATE POLICY "Allow public read of published resources" 
    ON resources FOR SELECT 
    USING (published = TRUE);

-- Admin has full access
CREATE POLICY "Allow full admin access to resources" 
    ON resources FOR ALL 
    TO authenticated
    USING (TRUE)
    WITH CHECK (TRUE);

-- 2. Testimonials Policies
-- Public can read published testimonials
CREATE POLICY "Allow public read of published testimonials" 
    ON testimonials FOR SELECT 
    USING (published = TRUE);

-- Admin has full access
CREATE POLICY "Allow full admin access to testimonials" 
    ON testimonials FOR ALL 
    TO authenticated
    USING (TRUE)
    WITH CHECK (TRUE);

-- 3. FAQs Policies
-- Public can read published faqs
CREATE POLICY "Allow public read of published faqs" 
    ON faqs FOR SELECT 
    USING (published = TRUE);

-- Admin has full access
CREATE POLICY "Allow full admin access to faqs" 
    ON faqs FOR ALL 
    TO authenticated
    USING (TRUE)
    WITH CHECK (TRUE);

-- 4. Inquiries Policies
-- Public can create inquiries (insert-only)
CREATE POLICY "Allow public insert of inquiries" 
    ON inquiries FOR INSERT 
    WITH CHECK (TRUE);

-- Admin can read/write inquiries
CREATE POLICY "Allow full admin access to inquiries" 
    ON inquiries FOR ALL 
    TO authenticated
    USING (TRUE)
    WITH CHECK (TRUE);

-- 5. Inquiry Notes Policies
-- Admin can read/write notes (private)
CREATE POLICY "Allow full admin access to inquiry notes" 
    ON inquiry_notes FOR ALL 
    TO authenticated
    USING (TRUE)
    WITH CHECK (TRUE);
