import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function DeveloperScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.iconText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Developer</Text>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.85}>
            <Text style={styles.iconText}>⤴</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroRow}>
          <View style={styles.avatarRing}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4PbFmHjV_vZ2-fPDMEOXC9Qk9X1ky9U8BoBTAkuOz189vPRUjIhaLCfye51OzMhOXm8DcYjrhsyAAQYRws1nG3qv05WfD-OenpCT6x05iRVhdJH5A2fbFtn4_cDSoxBQhSwTxKr7C-mP_dRG45iI8xW8GtkdK4B33LqZVT_HkbqtogZvumG10dvUCxfscr9R7aKkY3VVk_HZGqqHzCpaXOnZkX__0FlCjCsczirL8LScg7YHtyJn2mqUjlub_4A2dHX8QU-x7',
              }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.heroText}>
            <Text style={styles.subtitle}>Founder & Lead Architect</Text>
            <Text style={styles.title}>Alex River</Text>
            <Text style={styles.description}>
              Crafting the future of generative audio, blending neural networks
              with orchestral precision.
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBlock}>
            <Text style={styles.statValue}>10+</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={[styles.statBlock, styles.statDivider]}>
            <Text style={styles.statValue}>5.2k</Text>
            <Text style={styles.statLabel}>Stars</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statValue}>8y</Text>
            <Text style={styles.statLabel}>Exp</Text>
          </View>
        </View>

        <View style={styles.cardsGrid}>
          {[
            {
              icon: '💻',
              title: 'GitHub',
              subtitle: 'Code & open source repos',
            },
            {
              icon: '🔗',
              title: 'LinkedIn',
              subtitle: 'Professional network',
            },
            {
              icon: '🌐',
              title: 'Portfolio',
              subtitle: 'Curated work showcase',
            },
            {
              icon: '📷',
              title: 'Instagram',
              subtitle: '@soundforge.ai',
            },
          ].map(item => (
            <TouchableOpacity
              key={item.title}
              style={styles.linkCard}
              activeOpacity={0.85}
            >
              <Text style={styles.linkIcon}>{item.icon}</Text>
              <View style={styles.linkText}>
                <Text style={styles.linkTitle}>{item.title}</Text>
                <Text style={styles.linkSubtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The Vision</Text>
          <Text style={styles.sectionBody}>
            My journey in technology began with a fascination for acoustics and
            the mathematical purity of music. Over the last eight years, I’ve
            worked at the intersection of DSP and machine learning, aiming to
            create tools that amplify human creativity rather than replace it.
          </Text>
          <Text style={styles.sectionBody}>
            With SoundForge AI, we are building a “Sonic Bloom”—an environment
            where composers and developers can sculpt audio with the same
            fluidity as light. Our architecture is designed for resonance,
            stability, and emotional depth.
          </Text>
        </View>

        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Fuel the Forge</Text>
          <Text style={styles.ctaText}>
            If you find SoundForge AI useful, consider supporting the work to
            keep the development cycle independent and focused on quality.
          </Text>
          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.85}>
            <Text style={styles.ctaButtonText}>Buy Me a Coffee</Text>
          </TouchableOpacity>
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
    paddingBottom: 36,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  iconText: {
    fontSize: 18,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#b80035',
  },
  heroRow: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarRing: {
    width: 128,
    height: 128,
    borderRadius: 999,
    padding: 4,
    backgroundColor: '#fff8f7',
    borderWidth: 3,
    borderColor: '#ffdada',
    shadowColor: '#b80035',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  heroText: {
    flex: 1,
  },
  subtitle: {
    color: '#b80035',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#211a1b',
    marginBottom: 10,
  },
  description: {
    color: '#5c3f40',
    fontSize: 14,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff1f2',
    borderRadius: 28,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 3,
  },
  statBlock: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e5bdbe',
    paddingHorizontal: 18,
  },
  statValue: {
    fontSize: 30,
    fontWeight: '900',
    color: '#b80035',
    marginBottom: 6,
  },
  statLabel: {
    color: '#5c3f40',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 24,
  },
  linkCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 2,
  },
  linkIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  linkText: {
    gap: 6,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#211a1b',
    marginBottom: 4,
  },
  linkSubtitle: {
    fontSize: 12,
    color: '#5c3f40',
    lineHeight: 18,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#211a1b',
    marginBottom: 14,
  },
  sectionBody: {
    color: '#5c3f40',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  ctaCard: {
    backgroundColor: '#b80035',
    borderRadius: 32,
    padding: 24,
    shadowColor: '#b80035',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.18,
    shadowRadius: 30,
    elevation: 5,
  },
  ctaTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 14,
  },
  ctaText: {
    fontSize: 14,
    color: '#ffebee',
    lineHeight: 22,
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#fff8f7',
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  ctaButtonText: {
    fontWeight: '900',
    color: '#b80035',
    fontSize: 15,
  },
});
