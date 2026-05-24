import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const PlaylistCard = ({ playlist, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: playlist.cover }} style={styles.cover} />
      <Text style={styles.title} numberOfLines={2}>
        {playlist.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 8,
  },
  cover: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#211a1b',
  },
});

export default PlaylistCard;
