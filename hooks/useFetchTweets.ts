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
          content,
          media_url,
          likes, 
          retweets, 
          replies, 
          views, 
          shares, 
          created_at,
          users: user_id (
            id, 
            username, 
            email,
            handle, 
            bio, 
            avatar_url, 
            created_at
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50); // Ensure we fetch more than 10 tweets

      if (error) {
        console.error("Error fetching tweets:", error.message);
        throw new Error(error.message);
      }

      console.log("Fetched Tweets Count:", data.length); // Debugging
      return data || [];
    },
  });
};


