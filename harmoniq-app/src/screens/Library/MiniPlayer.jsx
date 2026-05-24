import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MiniPlayer = ({
  track,
  isPlaying,
  onPlayPause,
  onSkipNext,
  onSkipPrev,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: track.thumbnail }} style={styles.thumbnail} />

      <View style={styles.content}>
        <Text style={styles.label}>Now Playing</Text>
        <Text style={styles.title} numberOfLines={1}>
          {track.title}
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={onSkipPrev} style={styles.button}>
          <Text style={styles.icon}>⏮</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPlayPause} style={styles.playButton}>
          <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onSkipNext} style={styles.button}>
          <Text style={styles.icon}>⏭</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    elevation: 3,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#b80035',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#211a1b',
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    padding: 8,
  },
  playButton: {
    padding: 8,
  },
  icon: {
    fontSize: 16,
    color: '#211a1b',
  },
  playIcon: {
    fontSize: 20,
    color: '#b80035',
  },
});

export default MiniPlayer;
