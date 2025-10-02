-- AI Gallery Tables Schema

-- Tabel utama untuk AI Gallery items
CREATE TABLE ai_gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    prompt TEXT,
    tags TEXT[], -- Array of tags
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk menyimpan multiple images per AI Gallery item
CREATE TABLE ai_gallery_images (
    id SERIAL PRIMARY KEY,
    ai_gallery_id INTEGER NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    public_id VARCHAR(255), -- Cloudinary public_id untuk delete
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ai_gallery_id) REFERENCES ai_gallery(id) ON DELETE CASCADE
);

-- Index untuk performa yang lebih baik
CREATE INDEX idx_ai_gallery_created_at ON ai_gallery(created_at DESC);
CREATE INDEX idx_ai_gallery_tags ON ai_gallery USING GIN(tags);
CREATE INDEX idx_ai_gallery_images_gallery_id ON ai_gallery_images(ai_gallery_id);

-- Trigger untuk update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ai_gallery_updated_at 
    BEFORE UPDATE ON ai_gallery 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Sample data (optional)
INSERT INTO ai_gallery (title, prompt, tags) VALUES 
('Futuristic City', 'A cyberpunk cityscape with neon lights and flying cars', ARRAY['cyberpunk', 'futuristic', 'city', 'neon']),
('Abstract Art', 'Colorful abstract painting with geometric shapes', ARRAY['abstract', 'colorful', 'geometric', 'art']);
