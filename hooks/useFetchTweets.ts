import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/supabaseClient';

export const useFetchTweets = () => {
  return useQuery({
    queryKey: ['tweets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tweets')
        .select(`
           id,
           user_id, 
          content,
          media_url,
          likes, 
          retweets, 
          replies, 
          views, 
          shares
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching tweets:", error.message);
        throw new Error(error.message);
      }
      
      return data || []; // Ensure it returns an empty array if no data
    },
  });
};
