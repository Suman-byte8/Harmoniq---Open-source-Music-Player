import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Button from '../../components/ui/Button';
import FeatureCard from '../../components/ui/FeatureCard';

export function OnboardingScreen({ onContinue, onSkip = () => {} }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff8f7" />

      <View style={styles.header}>
        <Text style={styles.brand}>SoundForge</Text>
        <TouchableOpacity onPress={onSkip} activeOpacity={0.7}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.heroGraphic}>
          <View style={styles.heroAccent} />
          <View style={styles.heroCircle}>
            <Text style={styles.heroIcon}>♪</Text>
          </View>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeIcon}>✦</Text>
          </View>
        </View>

        <View style={styles.textGroup}>
          <Text style={styles.title}>
            Discover <Text style={styles.titleAccent}>Music</Text>
          </Text>
          <Text style={styles.description}>
            Explore millions of tracks synthesized by the world's most advanced
            sonic intelligence.
          </Text>
        </View>

        <View style={styles.featuresRow}>
          <FeatureCard icon="★" label="Daily Mix" />
          <FeatureCard icon="🎚" label="Hi-Res AI" />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.indicators}>
          <View style={styles.indicatorActive} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>

        <Button title="Next" variant="primary" onPress={onContinue} />

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={onContinue} activeOpacity={0.7}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f7',
  },
  header: {
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    fontSize: 24,
    fontWeight: '800',
    color: '#b80035',
  },
  skipText: {
    color: '#7f5d65',
    fontSize: 14,
    fontWeight: '700',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  heroGraphic: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  heroAccent: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 999,
    backgroundColor: 'rgba(184,0,53,0.16)',
    top: -18,
    left: -18,
  },
  heroCircle: {
    width: 170,
    height: 170,
    borderRadius: 999,
    backgroundColor: '#ffe5e8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#b80035',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.14,
    shadowRadius: 40,
    elevation: 8,
  },
  heroIcon: {
    fontSize: 60,
    color: '#b80035',
  },
  heroBadge: {
    position: 'absolute',
    right: 0,
    bottom: 10,
    width: 56,
    height: 56,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#e11d48',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 4,
  },
  heroBadgeIcon: {
    fontSize: 22,
    color: '#b80035',
  },
  textGroup: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '800',
    color: '#211a1b',
    textAlign: 'center',
  },
  titleAccent: {
    color: '#b80035',
  },
  description: {
    marginTop: 16,
    fontSize: 14,
    color: '#7f5d65',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  featuresRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  indicatorActive: {
    width: 32,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#b80035',
    marginHorizontal: 4,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#f3e5e6',
    marginHorizontal: 4,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 13,
    color: '#7f5d65',
  },
  loginLink: {
    fontSize: 13,
    color: '#b80035',
    fontWeight: '700',
  },
});

export default OnboardingScreen;
