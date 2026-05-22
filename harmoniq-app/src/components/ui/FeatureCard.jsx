import { StyleSheet, Text, View } from 'react-native';

export function FeatureCard({ icon, label }) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff2f4',
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  icon: {
    fontSize: 22,
    color: '#b80035',
    marginBottom: 10,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7f5d65',
  },
});

export default FeatureCard;
