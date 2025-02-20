import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/supabaseClient';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Session } from '@supabase/supabase-js';
import { useFetchTweets } from '../hooks/useFetchTweets';
import AuthComponent from '@/components/authComponent';

export default function HomeScreen() {
  const queryClient = useQueryClient();
  const { data: tweets, isLoading } = useFetchTweets();
//   console.log(tweets[0].users.bio);
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("For You");
  // Check session immediately (no useEffect)
  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
  };
  checkSession(); // Runs once when component is rendered

  // Sign out function
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null); // Ensures AuthComponent is shown after logout
  };

  // Show loading while checking session
  if (session === undefined) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
  
  // If user is not authenticated, show AuthComponent
  if (!session) {
    return <AuthComponent />;
  }
      return (
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <Image source={{ uri: 'https://wallpapers.com/images/high/man-face-british-actor-henry-cavill-cn0szkq9wu85sq96.webp' }} style={styles.profileIcon} />
          </View>
          <Image source={{ uri: 'https://cdn.prod.website-files.com/5d66bdc65e51a0d114d15891/64cebe1d31f50e161e4c825a_X-logo-transparent-white-twitter.png' }} style={styles.logo} />
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeText}>Upgrade</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'For you' && styles.activeTab]}
            onPress={() => setActiveTab('For you')}
          >
            <Text style={styles.tabText}>For you</Text>
            {activeTab === 'For you' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'Following' && styles.activeTab]}
            onPress={() => setActiveTab('Following')}
          >
            <Text style={styles.tabText}>Following</Text>
            {activeTab === 'Following' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={tweets}
          keyExtractor={(item) => item.id}
          initialNumToRender={20}  // Ensure at least 20 tweets render initially
          maxToRenderPerBatch={20} // Allow all tweets to be rendered per batch
          windowSize={10}          // Prevent React Native from skipping items
          removeClippedSubviews={false} // Ensure tweets are not hidden
          renderItem={({ item }) => {
            const user = item.users || {};
            return (
            <View style={styles.tweetContainer}>
              <Image source={{ uri: `${user.avatar_url}` }} style={styles.avatar} />
              <View style={styles.tweetContent}>
                <Text style={styles.name}>{user.username}</Text>
                <Text style={styles.handle}>{user.handle}</Text>
                <Text style={styles.tweetText}>{item.content}</Text>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity style={styles.actionButton}>
                    <MaterialCommunityIcons name="message-reply-outline" size={20} color="gray" />
                    <Text style={styles.actionText}>{item.replies}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <MaterialCommunityIcons name="repeat" size={20} color="gray" />
                    <Text style={styles.actionText}>{item.retweets}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <MaterialCommunityIcons name="heart-outline" size={20} color="gray" />
                    <Text style={styles.actionText}>{item.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <MaterialCommunityIcons name="chart-bar" size={20} color="gray" />
                    <Text style={styles.actionText}>{item.views}</Text>
                  </TouchableOpacity>
                  <View style={styles.rightActions}>
                    <TouchableOpacity style={styles.actionButton}>
                      <MaterialCommunityIcons name="bookmark-outline" size={20} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <MaterialCommunityIcons name="share-variant" size={20} color="gray" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            )
          }}
        />
        <TouchableOpacity style={styles.floatingButton} onPress={handleSignOut}>
          <MaterialCommunityIcons name="plus" color={'white'} size={36} />
        </TouchableOpacity>
      </ThemedView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      padding: 0,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
    },
    leftHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    logo: {
      width: 30,
      height: 30,
      marginLeft: 30,
    },
    upgradeButton: {
      backgroundColor: 'transparent',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderColor: 'white',
      borderWidth: 1,
    },
    upgradeText: {
      color: 'white',
      fontWeight: 'bold',
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 10,
      borderBottomColor: '#80808033',
      borderBottomWidth: 2,
      paddingBottom: 10,
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
    },
    activeTab: {
      backgroundColor: '#80808033',
      height: '125%',
    },
    tabText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    activeIndicator: {
      position: 'absolute',
      bottom: -2,
      width: '50%',
      alignSelf: 'center',
      height: 4,
      backgroundColor: 'blue',
    },
    tweetContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderBottomColor: '#80808033',
      borderBottomWidth: 2,
      padding: 15,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    tweetContent: {
      flex: 1,
    },
    name: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    handle: {
      color: 'gray',
      fontSize: 14,
    },
    tweetText: {
      color: 'white',
      marginTop: 4,
      fontSize: 14,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    rightActions: {
      flexDirection: 'row',
      gap: 0,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionText: {
      color: 'gray',
      marginLeft: 4,
      fontSize: 12,
    },
    floatingButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: 'blue',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
  
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
  });