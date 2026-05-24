import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SearchResultCard({ track }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <Image source={{ uri: track.thumbnail }} style={styles.cover} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {track.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {track.artist}
        </Text>
        {track.album ? <Text style={styles.details}>{track.album}</Text> : null}
      </View>
      <Text style={styles.duration}>
        {track.duration ? track.duration : ''}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  cover: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#211a1b',
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    color: '#6b5563',
  },
  details: {
    marginTop: 6,
    fontSize: 11,
    color: '#8c6d74',
  },
  duration: {
    fontSize: 12,
    color: '#b80035',
    fontWeight: '700',
  },
});
