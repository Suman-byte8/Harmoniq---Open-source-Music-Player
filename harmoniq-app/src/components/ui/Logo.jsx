import { StyleSheet, Text, View } from 'react-native';

export function Logo() {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>SoundForge</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#b80035',
  },
});

export default Logo;
