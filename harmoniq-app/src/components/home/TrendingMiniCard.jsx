import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TrendingMiniCard({ item }) {
  return (
    <TouchableOpacity style={styles.root} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.cover} />

      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {item.subtitle}
        </Text>
      </View>

      {/* Professional UI Play Button instead of Emoji */}
      <View style={styles.playAction}>
        <View style={styles.playTriangle} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    width: '100%',
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 12, // Spacing between cards
  },
  cover: {
    width: 60,
    height: 60,
    borderRadius: 14,
    marginRight: 16,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#71717A',
    fontWeight: '500',
  },
  playAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF1F2', // Rosewood light background
    alignItems: 'center',
    justifyContent: 'center',
  },
  playTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 0,
    borderBottomWidth: 7,
    borderTopWidth: 7,
    borderLeftColor: '#E11D48', // Primary color
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: 3, // Optical alignment
  },
});
