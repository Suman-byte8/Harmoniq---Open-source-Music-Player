import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ArtistAvatar({ artist }) {
  return (
    <TouchableOpacity style={styles.root} activeOpacity={0.86}>
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: artist.image }} style={styles.avatar} />
      </View>
      <View style={styles.nameRow}>
        <Text style={styles.name}>{artist.name}</Text>
        {artist.verified && <Text style={styles.badge}>✔</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    width: 92,
    marginRight: 14,
  },
  avatarWrapper: {
    width: 92,
    height: 92,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: 'transparent',
    overflow: 'hidden',
    backgroundColor: '#f8f1f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  nameRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 13,
    fontWeight: '800',
    color: '#211a1b',
  },
  badge: {
    marginLeft: 4,
    color: '#b80035',
    fontSize: 12,
  },
});
