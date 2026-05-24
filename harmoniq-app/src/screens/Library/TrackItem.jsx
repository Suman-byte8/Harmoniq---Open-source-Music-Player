import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TrackItem = ({ track, isAI = false, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, isAI && styles.aiTrack]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: track.thumbnail }} style={styles.thumbnail} />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {track.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {track.artist}
        </Text>
      </View>

      <View style={styles.badge}>
        <Text style={[styles.badgeText, isAI && styles.aiBadgeText]}>
          {isAI ? 'AI' : 'YT'}
        </Text>
      </View>

      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreIcon}>⋮</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 1,
  },
  aiTrack: {
    borderLeftWidth: 4,
    borderLeftColor: '#b80035',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#211a1b',
    marginBottom: 4,
  },
  artist: {
    fontSize: 13,
    color: '#5c3f40',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f3e5e6',
    borderRadius: 6,
    marginRight: 12,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#5c3f40',
    textTransform: 'uppercase',
  },
  aiBadgeText: {
    backgroundColor: '#ffdada',
    color: '#920028',
  },
  moreButton: {
    padding: 8,
  },
  moreIcon: {
    fontSize: 20,
    color: '#5c3f40',
  },
});

export default TrackItem;
