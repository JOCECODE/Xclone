import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useUploadAvatar from '@/hooks/useUploadAvatar';
import { supabase } from '@/supabaseClient';

export default function Profile() {
  const uploadAvatarMutation = useUploadAvatar();
  const [imageLoading, setImageLoading] = useState(false);
  const [inhere, setInhere] = useState({});

  // ✅ Fetch authenticated user
  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      setInhere(data?.user);
      return data?.user;
    },
  });
  console.log(inhere);
  console.log();
  console.log("is you pop pop pop")
  // ✅ Fetch user profile & avatar
  const { data: userProfile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['email', user?.email],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('avatar_path')
        .eq('email', user?.email)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id, // Run only if user exists
  });
  console.log("here");
  console.log(userProfile);

  // const avatarUrl = userProfile?.avatar_path
  //   ? supabase.storage.from('avatars').getPublicUrl(userProfile.avatar_path).data.publicUrl
  //   : 'https://placehold.co/100'; // Default avatar

  // const handleUpload = async () => {
    
  //   setImageLoading(true);
    
  //   await uploadAvatarMutation.mutateAsync(user?.id  undefined);
    
  //   setImageLoading(false);
  // };

  // if (userLoading || profileLoading) return <ActivityIndicator size="large" color="white" />;
  // if (userError || profileError) return <Text style={styles.errorText}>Error loading profile.</Text>;

       {/* Avatar Image
      <TouchableOpacity style={styles.avatarContainer} onPress={handleUpload}>
        {imageLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        )}
      </TouchableOpacity> */}

      {/* Upload Button
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <MaterialCommunityIcons name="camera" size={24} color="white" />
        <Text style={styles.uploadText}>Change Profile Picture</Text>
      </TouchableOpacity>
    </View> */}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  uploadText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
