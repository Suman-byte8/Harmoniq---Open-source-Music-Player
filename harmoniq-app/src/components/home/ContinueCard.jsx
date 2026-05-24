import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ContinueCard({ track }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.88}>
      <Image source={{ uri: track.image }} style={styles.cover} />
      <View style={styles.info}>
        <View style={styles.playButton}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
        <Text style={styles.trackTitle} numberOfLines={1}>
          {track.title}
        </Text>
        <Text style={styles.trackArtist}>{track.artist}</Text>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${track.progress * 100}%` }]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 260,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
    marginRight: 16,
  },
  cover: {
    width: '100%',
    height: 170,
  },
  info: {
    padding: 16,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 18,
    backgroundColor: '#b80035',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  playIcon: {
    color: '#ffffff',
    fontSize: 18,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#211a1b',
    marginBottom: 4,
  },
  trackArtist: {
    fontSize: 12,
    color: '#6b5563',
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#fde6e9',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#b80035',
    borderRadius: 12,
  },
});
