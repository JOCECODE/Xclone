import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/supabaseClient';

// Convert URI to Blob (Required for Supabase Storage)
const uriToBlob = async (uri: string) => {
  const response = await fetch(uri);
  return await response.blob();
};

const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  const uploadAvatarMutation = useMutation({
    mutationFn: async (userId: string) => {
      // Pick an image
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled) return null;

      const file = result.assets[0]; // Get selected file
      const fileName = `avatars/${userId}.jpg`;

      // Convert URI to Blob
      const blob = await uriToBlob(file.uri);

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, blob, { upsert: true });

      if (uploadError) throw uploadError;

      // Update user profile in Supabase DB
      const { error: dbError } = await supabase
        .from('users')
        .update({ avatar_path: fileName })
        .eq('id', userId);

      if (dbError) throw dbError;

      return fileName; // Return new file path
    },
    onSuccess: () => {
      // Invalidate and refetch user profile to update UI
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });

  return uploadAvatarMutation;
};

export default useUploadAvatar;
