/*
  # Initial Schema Setup

  1. New Tables
    - `memes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
    
    - `templates`
      - `id` (uuid, primary key)
      - `name` (text)
      - `image_url` (text)
      - `category` (text)
      - `tags` (text[])
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create memes table
CREATE TABLE IF NOT EXISTS memes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE memes ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Policies for memes
CREATE POLICY "Users can view their own memes"
  ON memes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own memes"
  ON memes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own memes"
  ON memes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own memes"
  ON memes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for templates
CREATE POLICY "Anyone can view templates"
  ON templates
  FOR SELECT
  TO anon, authenticated
  USING (true);