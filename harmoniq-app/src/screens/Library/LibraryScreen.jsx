import { useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import FilterButton from './FilterButton';
import MiniPlayer from './MiniPlayer';
import PlaylistCard from './PlaylistCard';
import TrackItem from './TrackItem';

const LibraryScreen = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isPlaying, setIsPlaying] = useState(false);

  const mockTracks = [
    {
      id: 1,
      title: 'Midnight Pulse',
      artist: 'Lofi Dimensions • 3:45',
      thumbnail: 'https://via.placeholder.com/60',
      isAI: false,
    },
    {
      id: 2,
      title: 'Neural Echoes',
      artist: 'SoundForge AI • 2:12',
      thumbnail: 'https://via.placeholder.com/60',
      isAI: true,
    },
    {
      id: 3,
      title: 'Electric Dreams',
      artist: 'The Synthwave • 4:20',
      thumbnail: 'https://via.placeholder.com/60',
      isAI: false,
    },
    {
      id: 4,
      title: 'Sublime Synthesis',
      artist: 'SoundForge AI • 3:01',
      thumbnail: 'https://via.placeholder.com/60',
      isAI: true,
    },
  ];

  const mockPlaylists = [
    {
      id: 1,
      title: 'Summer AI Mix',
      cover: 'https://via.placeholder.com/140',
    },
    {
      id: 2,
      title: 'Studio Sessions',
      cover: 'https://via.placeholder.com/140',
    },
  ];

  const mockCurrentTrack = {
    id: 2,
    title: 'Neural Echoes',
    thumbnail: 'https://via.placeholder.com/48',
  };

  const filters = ['All', 'Songs', 'AI Generated', 'Playlists', 'Downloads'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={styles.avatar}
            />
            <Text style={styles.appName}>Harmoniq</Text>
            <TouchableOpacity>
              <Text style={styles.notificationIcon}>🔔</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Your Library</Text>
          <Text style={styles.subtitle}>
            Curated sounds and AI experiments.
          </Text>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View>
            <Text style={styles.statsLabel}>Collections Overview</Text>
            <Text style={styles.statsValue}>
              24 Songs • 4 AI Tracks • 3 Playlists
            </Text>
          </View>
          <View style={styles.avatarGroup}>
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={styles.groupAvatar}
            />
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={[styles.groupAvatar, styles.groupAvatarOverlap]}
            />
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={[styles.groupAvatar, styles.groupAvatarOverlap]}
            />
          </View>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContainer}
        >
          {filters.map(filter => (
            <FilterButton
              key={filter}
              label={filter}
              active={activeFilter === filter.toLowerCase()}
              onPress={() => setActiveFilter(filter.toLowerCase())}
            />
          ))}
        </ScrollView>

        {/* Main Content */}
        <View style={styles.contentWrapper}>
          {/* Track List */}
          <FlatList
            data={mockTracks}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TrackItem
                track={item}
                isAI={item.isAI}
                onPress={() => console.log('Track pressed:', item.title)}
              />
            )}
            scrollEnabled={false}
            style={styles.trackList}
          />

          {/* Recent Playlists Sidebar */}
          <View style={styles.playlistsSection}>
            <Text style={styles.playlistsTitle}>Recent Playlists</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.playlistScroll}
            >
              {mockPlaylists.map(playlist => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  onPress={() =>
                    console.log('Playlist pressed:', playlist.title)
                  }
                />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Mini Player */}
      <View style={styles.playerContainer}>
        <MiniPlayer
          track={mockCurrentTrack}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onSkipNext={() => console.log('Skip next')}
          onSkipPrev={() => console.log('Skip prev')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff8f7',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff8f7',
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e11d48',
  },
  appName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#b80035',
    letterSpacing: -0.5,
  },
  notificationIcon: {
    fontSize: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#211a1b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#5c3f40',
    fontWeight: '500',
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 2,
  },
  statsLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#b80035',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#211a1b',
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  groupAvatarOverlap: {
    marginLeft: -12,
  },
  filterScroll: {
    marginBottom: 16,
  },
  filterContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  contentWrapper: {
    flex: 1,
    paddingBottom: 16,
  },
  trackList: {
    flex: 1,
  },
  playlistsSection: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  playlistsTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#211a1b',
    marginBottom: 12,
  },
  playlistScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#b80035',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabIcon: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: '600',
  },
  playerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 8,
    backgroundColor: 'rgba(255, 248, 247, 0.8)',
  },
});

export default LibraryScreen;
