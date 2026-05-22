import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import OnboardingScreen from './src/screens/Onboarding';
import SignUpScreen from './src/screens/SignUp';

function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [searchFocused, setSearchFocused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const waveformBars = [
    12, 24, 18, 36, 42, 28, 20, 32, 48, 56, 38, 22, 16, 28, 44, 32, 20, 14, 28,
    36, 18, 12,
  ];
  const playedCutoff = 9;

  if (currentScreen === 'onboarding') {
    return (
      <OnboardingScreen
        onContinue={() => setCurrentScreen('signup')}
        onSkip={() => setCurrentScreen('signup')}
      />
    );
  }

  if (currentScreen === 'signup') {
    return <SignUpScreen onNavigateToLogin={() => setCurrentScreen('home')} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff8f7" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentArea}>
          <View style={styles.accentBar} />
          <Text style={styles.title}>The Sonic{`\n`}Bloom</Text>
          <Text style={styles.subtitle}>
            An immersive gallery of resonant sounds, curated like rare vinyl.
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardHeading}>Now Curating</Text>

            <TouchableOpacity activeOpacity={0.98} style={styles.trackRow}>
              <View>
                <Text style={styles.trackLabel}>Track 01</Text>
                <Text style={styles.trackTitle}>Organic Resonance</Text>
                <Text style={styles.trackMeta}>Warm Ambient • 4:20</Text>
              </View>
              <View style={styles.trackBadge}>
                <Text style={styles.trackBadgeText}>▶</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.98}
              style={[styles.trackRow, styles.trackRowAlt]}
            >
              <View>
                <Text style={styles.trackLabel}>Track 02</Text>
                <Text style={styles.trackTitle}>Asymmetric Frequencies</Text>
                <Text style={styles.trackMeta}>Lo-Fi Organic • 3:45</Text>
              </View>
              <View style={styles.trackBadge}>
                <Text style={styles.trackBadgeText}>▶</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.searchSection}>
            <Text style={styles.sectionLabel}>Add Custom Bloom</Text>
            <TextInput
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search or add rare tracks..."
              placeholderTextColor="rgba(33, 26, 27, 0.4)"
              style={[
                styles.searchInput,
                searchFocused
                  ? styles.searchInputFocused
                  : styles.searchInputBlurred,
              ]}
            />
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.primaryButton, styles.buttonShadow]}
              activeOpacity={0.95}
            >
              <Text style={styles.primaryButtonText}>Bloom Station</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              activeOpacity={0.95}
              onPress={() => setCurrentScreen('signup')}
            >
              <Text style={styles.secondaryButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.playerBar}>
        <View style={styles.trackInfo}>
          <Text style={styles.playerTitle}>Organic Resonance</Text>
          <Text style={styles.playerSubtitle}>The Sonic Bloom</Text>
        </View>

        <View style={styles.waveformRow}>
          {waveformBars.map((height, i) => (
            <View
              key={i}
              style={[
                styles.waveBar,
                i <= playedCutoff ? styles.waveActive : styles.waveInactive,
                i < waveformBars.length - 1 && styles.waveBarSpacing,
                { height: height * 0.45 },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => setIsPlaying(!isPlaying)}
          activeOpacity={0.9}
        >
          <Text style={styles.playButtonText}>{isPlaying ? '⏸' : '▶'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f7',
  },
  onboardingHeader: {
    width: '100%',
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 24,
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
  onboardingMain: {
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
  onboardingText: {
    alignItems: 'center',
    marginBottom: 24,
  },
  onboardingTitle: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '800',
    color: '#211a1b',
    textAlign: 'center',
  },
  highlight: {
    color: '#b80035',
  },
  onboardingDescription: {
    marginTop: 16,
    fontSize: 14,
    color: '#7f5d65',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  featureGrid: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#fff2f4',
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  featureIcon: {
    fontSize: 22,
    color: '#b80035',
    marginBottom: 10,
  },
  featureLabel: {
    fontSize: 11,
    color: '#7f5d65',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  indicatorRow: {
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
  onboardingFooter: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  nextButton: {
    width: '100%',
    backgroundColor: '#b80035',
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#b80035',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 6,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  footerLoginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerLoginText: {
    fontSize: 13,
    color: '#7f5d65',
  },
  footerLoginLink: {
    fontSize: 13,
    color: '#b80035',
    fontWeight: '700',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 130,
  },
  contentArea: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  accentBar: {
    width: 48,
    height: 4,
    backgroundColor: '#b80035',
    marginBottom: 24,
    borderRadius: 999,
  },
  title: {
    fontSize: 42,
    lineHeight: 48,
    color: '#211a1b',
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#211a1b',
    opacity: 0.6,
    maxWidth: 280,
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 48,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#e11d48',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 4,
  },
  cardHeading: {
    fontSize: 12,
    letterSpacing: 1,
    color: '#b80035',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  trackRow: {
    backgroundColor: '#fef0f1',
    padding: 16,
    borderRadius: 24,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackRowAlt: {
    backgroundColor: 'transparent',
  },
  trackLabel: {
    fontSize: 10,
    letterSpacing: 1,
    color: '#7f5d65',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#211a1b',
    marginTop: 4,
  },
  trackMeta: {
    fontSize: 12,
    color: '#211a1b',
    opacity: 0.6,
    marginTop: 4,
  },
  trackBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(184,0,53,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackBadgeText: {
    color: '#b80035',
    fontSize: 12,
    fontWeight: '700',
  },
  searchSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#211a1b',
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: '#211a1b',
    fontSize: 14,
    backgroundColor: '#fef0f1',
  },
  searchInputFocused: {
    borderColor: 'rgba(184,0,53,0.3)',
    backgroundColor: '#ffffff',
  },
  searchInputBlurred: {
    borderColor: 'transparent',
  },
  actionRow: {
    flexDirection: 'row',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#e11d48',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    flex: 1,
    marginLeft: 12,
    borderWidth: 1,
    borderColor: 'rgba(225,29,72,0.15)',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonShadow: {
    shadowColor: '#b80035',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.75,
  },
  secondaryButtonText: {
    color: '#b80035',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.75,
  },
  playerBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#e11d48',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 40,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(225,29,72,0.05)',
  },
  trackInfo: {
    flex: 1,
    marginRight: 16,
  },
  playerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#211a1b',
  },
  playerSubtitle: {
    fontSize: 12,
    color: '#211a1b',
    opacity: 0.5,
    marginTop: 4,
  },
  waveformRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 8,
    height: 32,
  },
  waveBar: {
    width: 3,
    borderRadius: 999,
  },
  waveBarSpacing: {
    marginRight: 3,
  },
  waveActive: {
    backgroundColor: '#b80035',
  },
  waveInactive: {
    backgroundColor: '#f3e5e6',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#b80035',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#b80035',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  playButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 12,
  },
});

export default App;
