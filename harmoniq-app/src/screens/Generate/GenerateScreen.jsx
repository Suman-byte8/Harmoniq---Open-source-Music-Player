import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function GenerateScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.85}>
              <Text style={styles.iconText}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.title}>SoundForge AI</Text>
          </View>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.85}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <ImageBackground
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTU-DoyXKqiWloxCTm4ccJi0KAqv_1m6_-woaatnV408w3eBaDPJ3eCWgQZwNDZAAQAVSAZC-qzBArGuHc-UmYfuFFheT7H2uPrnYyqC3rLxn40lSuzzJxv_Sz95RKMhnhsiFLChZLxefGI-iJ9e-Bb1GzxutMjAQSlRwQHDLNNRqA6Y64Xgnz-jdZneI8lbiguDa98g_55pk4A1IsPk7FNFHv2KamXPZ_LF-8v2y7ekfxpNg80DRwrybd8vPUKfrQuJsSqZYG',
            }}
            style={styles.heroImage}
            imageStyle={styles.heroImageStyle}
          >
            <View style={styles.heroOverlay} />
            <View style={styles.heroContent}>
              <Text style={styles.heroBadge}>Generate Music</Text>
              <Text style={styles.heroHeading}>
                Forge your next track from a single prompt.
              </Text>
              <Text style={styles.heroSubheading}>
                Tap into AI-driven sound design, rich stems, and instant mood
                shaping.
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coming Soon</Text>
          <Text style={styles.sectionText}>
            This music generation feature is under active development. Our
            developer is working on it now, and we’ll bring it to life with the
            next update.
          </Text>
          <View style={styles.comingSoonCard}>
            <Text style={styles.comingSoonTitle}>Developer in progress</Text>
            <Text style={styles.comingSoonText}>
              Thanks for your patience — the AI music studio is being built with
              focus, polish, and a sound-first experience.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff8f7',
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  iconText: {
    fontSize: 18,
  },
  title: {
    marginLeft: 14,
    fontSize: 22,
    fontWeight: '900',
    color: '#211a1b',
  },
  heroCard: {
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: '#000',
  },
  heroImage: {
    width: '100%',
    height: 240,
    justifyContent: 'flex-end',
  },
  heroImageStyle: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  heroContent: {
    padding: 24,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(184,0,53,0.92)',
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 12,
  },
  heroHeading: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: '900',
    marginBottom: 10,
  },
  heroSubheading: {
    fontSize: 14,
    color: '#f8f1f0',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#211a1b',
    marginBottom: 14,
  },
  promptInput: {
    minHeight: 120,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 16,
    color: '#211a1b',
    fontSize: 16,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 3,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginRight: 10,
    marginBottom: 10,
  },
  chipActive: {
    backgroundColor: '#b80035',
  },
  chipInactive: {
    backgroundColor: '#fff8f7',
    borderWidth: 1,
    borderColor: '#f4d7d9',
  },
  chipText: {
    color: '#5c3f40',
    fontWeight: '700',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#211a1b',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 13,
    color: '#6b5563',
    lineHeight: 18,
  },
  sectionText: {
    color: '#6b5563',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },
  comingSoonCard: {
    backgroundColor: '#fff0f2',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 3,
  },
  comingSoonTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#211a1b',
    marginBottom: 8,
  },
  comingSoonText: {
    color: '#5c3f40',
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: '#b80035',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#b80035',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#e5bdbe',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#b80035',
    fontSize: 16,
    fontWeight: '900',
  },
});
