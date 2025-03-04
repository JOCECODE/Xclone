import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Layout() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: 'black', padding: 5, },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarActiveTintColor: "white", // Active tab color
          tabBarInactiveTintColor: "gray",
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-outline" color={color} size={32} />,
        }}
      />
       <Tabs.Screen
        name="magnify"
        options={{
          tabBarActiveTintColor: "white", // Active tab color
          tabBarInactiveTintColor: "gray",
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="magnify" color={color} size={32} />,
        }}
      />
        <Tabs.Screen
        name="analytics"
        options={{
          tabBarActiveTintColor: "white", // Active tab color
          tabBarInactiveTintColor: "gray",
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="google-analytics" color={color} size={32} />,
        }}
      />

<Tabs.Screen
        name="notifications"
        options={{
          tabBarActiveTintColor: "white", // Active tab color
          tabBarInactiveTintColor: "gray",
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bell-ring-outline" color={color} size={32} />,
        }}
      />
             <Tabs.Screen
        name="messages"
        options={{
          tabBarActiveTintColor: "white", // Active tab color
          tabBarInactiveTintColor: "gray",
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="email-outline" color={color} size={32} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarActiveTintColor: "white", // Active tab color
          tabBarInactiveTintColor: "gray",
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-multiple" color={color} size={24} />,
        }}
      />
    </Tabs>
    </SafeAreaView>
  </QueryClientProvider>
  
  );

}
