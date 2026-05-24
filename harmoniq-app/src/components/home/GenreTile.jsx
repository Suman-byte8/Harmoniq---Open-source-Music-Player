import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function GenreTile({ genre }) {
  return (
    <TouchableOpacity
      style={[
        styles.root,
        { backgroundColor: genre.colors[0], borderColor: genre.colors[1] },
      ]}
      activeOpacity={0.85}
    >
      <Text style={styles.icon}>{genre.icon}</Text>
      <Text style={styles.title}>{genre.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '48%',
    minHeight: 104,
    borderRadius: 24,
    padding: 18,
    justifyContent: 'space-between',
    borderWidth: 1,
    marginBottom: 12,
  },
  icon: {
    fontSize: 34,
    marginBottom: 10,
    color: '#ffffff',
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
});
