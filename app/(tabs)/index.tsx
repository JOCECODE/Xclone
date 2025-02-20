import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/supabaseClient';
import AuthComponent from '@/components/authComponent';
import HomeScreen from '@/components/HomeScreen';

// Custom hook to check the current user session
const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
    staleTime: Infinity, // Cache session to avoid unnecessary refetching
  });
};

export default function IndexScreen() {
  const { data: session, isLoading } = useSession();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return session ? <HomeScreen /> : <AuthComponent />;
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' },
});
