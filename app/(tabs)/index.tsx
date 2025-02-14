import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const tweets = [
  { id: '1', name: 'John Doe', handle: '@johndoe', content: 'Hello Twitter!', avatar: 'https://placehold.co/50' },
  { id: '2', name: 'Jane Smith', handle: '@janesmith', content: 'Just posted my first tweet!', avatar: 'https://placehold.co/50' },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('For you');

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Image source={{ uri: 'https://placehold.co/40' }} style={styles.profileIcon} />
          <Text style={styles.headerText}>Home</Text>
        </View>
        <Image source={{ uri: 'https://placehold.co/30' }} style={styles.logo} />
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
        renderItem={({ item }) => (
          <View style={styles.tweetContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.tweetContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.handle}>{item.handle}</Text>
              <Text style={styles.tweetText}>{item.content}</Text>
              <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionButton}>
                  <MaterialCommunityIcons name="message-reply-outline" size={20} color="gray" />
                  <Text style={styles.actionText}>2.1K</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <MaterialCommunityIcons name="repeat" size={20} color="gray" />
                  <Text style={styles.actionText}>666</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <MaterialCommunityIcons name="heart-outline" size={20} color="gray" />
                  <Text style={styles.actionText}>7.1K</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <MaterialCommunityIcons name="chart-bar" size={20} color="gray" />
                  <Text style={styles.actionText}>270K</Text>
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
        )}
      />
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
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 30,
    height: 30,
  },
  upgradeButton: {
    backgroundColor: 'yellow',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  upgradeText: {
    color: 'black',
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
    height: '125%'
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
});
