import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  email: string;
  created_at: string;
};

export type Meme = {
  id: string;
  user_id: string;
  title: string;
  image_url: string;
  created_at: string;
};

export type Template = {
  id: string;
  name: string;
  image_url: string;
  category: string;
  tags: string[];
};

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

export async function getUserMemes(userId: string) {
  const { data, error } = await supabase
    .from('memes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function saveMeme(memeData: Partial<Meme>) {
  const { data, error } = await supabase
    .from('memes')
    .insert([memeData])
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function deleteMeme(memeId: string) {
  const { error } = await supabase
    .from('memes')
    .delete()
    .eq('id', memeId);
  
  if (error) throw error;
}

export async function getTemplates(category?: string, searchQuery?: string) {
  let query = supabase
    .from('templates')
    .select('*');
  
  if (category && category !== 'all') {
    query = query.eq('category', category);
  }
  
  if (searchQuery) {
    query = query.ilike('name', `%${searchQuery}%`);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}