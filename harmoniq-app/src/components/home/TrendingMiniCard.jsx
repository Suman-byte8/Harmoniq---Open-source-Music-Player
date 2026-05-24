import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TrendingMiniCard({ item }) {
  return (
    <TouchableOpacity style={styles.root} activeOpacity={0.88}>
      <Image source={{ uri: item.image }} style={styles.cover} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles.icon}>📊</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
    marginBottom: 12,
  },
  cover: {
    width: 56,
    height: 56,
    borderRadius: 16,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#211a1b',
  },
  subtitle: {
    fontSize: 11,
    color: '#6b5563',
    marginTop: 4,
  },
  icon: {
    fontSize: 20,
    color: '#b80035',
  },
});
