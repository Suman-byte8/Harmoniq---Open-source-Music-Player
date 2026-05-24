import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// --- CUSTOM PURE CSS ICONS (No Emojis) ---
const BackIcon = () => <View style={styles.chevronLeft} />;
const ShareIcon = () => (
  <View style={styles.shareIconWrap}>
    <View style={styles.shareDot} />
    <View style={[styles.shareDot, { top: -6, right: -8 }]} />
    <View style={[styles.shareDot, { bottom: -6, right: -8 }]} />
    <View
      style={[
        styles.shareLine,
        { transform: [{ rotate: '-30deg' }], top: 3, right: -4 },
      ]}
    />
    <View
      style={[
        styles.shareLine,
        { transform: [{ rotate: '30deg' }], bottom: 3, right: -4 },
      ]}
    />
  </View>
);

const GithubIcon = () => <Text style={styles.codeIcon}>{'</>'}</Text>;
const LinkedinIcon = () => <Text style={styles.linkedinText}>in</Text>;
const PortfolioIcon = () => (
  <View style={styles.gridIcon}>
    <View style={styles.gridDot} />
    <View style={styles.gridDot} />
    <View style={styles.gridDot} />
    <View style={styles.gridDot} />
  </View>
);
const InstaIcon = () => (
  <View style={styles.instaBox}>
    <View style={styles.instaCircle} />
    <View style={styles.instaDot} />
  </View>
);

export default function DeveloperScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF1F2" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            activeOpacity={0.8}
            onPress={() => navigation?.goBack()}
          >
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>CREATOR</Text>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
            <ShareIcon />
          </TouchableOpacity>
        </View>

        {/* HERO SECTION (Centered & Premium) */}
        <View style={styles.heroSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarHalo} />
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4PbFmHjV_vZ2-fPDMEOXC9Qk9X1ky9U8BoBTAkuOz189vPRUjIhaLCfye51OzMhOXm8DcYjrhsyAAQYRws1nG3qv05WfD-OenpCT6x05iRVhdJH5A2fbFtn4_cDSoxBQhSwTxKr7C-mP_dRG45iI8xW8GtkdK4B33LqZVT_HkbqtogZvumG10dvUCxfscr9R7aKkY3VVk_HZGqqHzCpaXOnZkX__0FlCjCsczirL8LScg7YHtyJn2mqUjlub_4A2dHX8QU-x7',
              }}
              style={styles.avatar}
            />
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedCheck}>✓</Text>
            </View>
          </View>

          <Text style={styles.title}>Alex River</Text>
          <Text style={styles.subtitle}>Lead Architect & Founder</Text>
          <Text style={styles.description}>
            Crafting the future of generative audio, blending neural networks
            with orchestral precision to build the Sonic Bloom.
          </Text>
        </View>

        {/* STATS ROW (Floating Pill) */}
        <View style={styles.statsWrapper}>
          <View style={styles.statsCard}>
            <View style={styles.statBlock}>
              <Text style={styles.statValue}>10+</Text>
              <Text style={styles.statLabel}>PROJECTS</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBlock}>
              <Text style={styles.statValue}>5.2k</Text>
              <Text style={styles.statLabel}>STARS</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBlock}>
              <Text style={styles.statValue}>8y</Text>
              <Text style={styles.statLabel}>EXPERIENCE</Text>
            </View>
          </View>
        </View>

        {/* LINKS GRID */}
        <Text style={styles.sectionHeading}>Connect</Text>
        <View style={styles.cardsGrid}>
          {[
            { icon: <GithubIcon />, title: 'GitHub', sub: 'Open Source' },
            { icon: <LinkedinIcon />, title: 'LinkedIn', sub: 'Network' },
            {
              icon: <PortfolioIcon />,
              title: 'Portfolio',
              sub: 'Case Studies',
            },
            { icon: <InstaIcon />, title: 'Instagram', sub: '@harmoniq' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.linkCard}
              activeOpacity={0.8}
            >
              <View style={styles.cardIconWrap}>{item.icon}</View>
              <View>
                <Text style={styles.linkTitle}>{item.title}</Text>
                <Text style={styles.linkSubtitle}>{item.sub}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* STORY / VISION SECTION */}
        <Text style={styles.sectionHeading}>The Vision</Text>
        <View style={styles.visionCard}>
          <View style={styles.quoteAccent} />
          <Text style={styles.visionText}>
            "My journey began with a fascination for acoustics and the
            mathematical purity of music. We are building an environment where
            developers can sculpt audio with the same fluidity as light."
          </Text>
        </View>

        {/* CREATIVE CTA CARD */}
        <View style={styles.ctaCard}>
          {/* Abstract Background Shapes for Creativity */}
          <View style={styles.ctaShape1} />
          <View style={styles.ctaShape2} />

          <View style={{ position: 'relative', zIndex: 10 }}>
            <Text style={styles.ctaTitle}>Fuel the Forge</Text>
            <Text style={styles.ctaText}>
              Support independent development and help keep the Harmoniq servers
              running ad-free.
            </Text>
            <TouchableOpacity style={styles.ctaButton} activeOpacity={0.9}>
              <Text style={styles.ctaButtonText}>Buy Me a Coffee</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF1F2' },
  content: { padding: 24, paddingBottom: 40 },

  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  chevronLeft: {
    width: 12,
    height: 12,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#111827',
    transform: [{ rotate: '45deg' }],
    marginLeft: 4,
  },
  screenTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#E11D48',
    letterSpacing: 2,
  },

  /* SHARE ICON */
  shareIconWrap: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  shareDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#111827',
    position: 'absolute',
  },
  shareLine: {
    width: 10,
    height: 1.5,
    backgroundColor: '#111827',
    position: 'absolute',
    borderRadius: 1,
  },

  /* HERO SECTION */
  heroSection: { alignItems: 'center', marginBottom: 32 },
  avatarContainer: { position: 'relative', marginBottom: 20 },
  avatarHalo: {
    position: 'absolute',
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#E11D48',
    opacity: 0.2,
  },
  avatar: { width: 110, height: 110, borderRadius: 55 },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E11D48',
    borderWidth: 3,
    borderColor: '#FFF1F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedCheck: { color: '#FFF', fontSize: 12, fontWeight: '900' },
  title: { fontSize: 32, fontWeight: '900', color: '#111827', marginBottom: 4 },
  subtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E11D48',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  description: {
    textAlign: 'center',
    color: '#71717A',
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: 20,
  },

  /* STATS PILL */
  statsWrapper: { alignItems: 'center', marginBottom: 40 },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  statBlock: { alignItems: 'center', width: 70 },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#FCE7EA',
    marginHorizontal: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#71717A',
    letterSpacing: 0.5,
  },

  /* SECTION HEADINGS */
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 16,
    marginLeft: 4,
  },

  /* LINKS GRID */
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  linkCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
  },
  cardIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF1F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  linkTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 2,
  },
  linkSubtitle: { fontSize: 12, color: '#71717A', fontWeight: '500' },

  /* CUSTOM VECTOR ICONS */
  codeIcon: {
    color: '#E11D48',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: -1,
  },
  linkedinText: { color: '#E11D48', fontWeight: '900', fontSize: 18 },
  gridIcon: {
    width: 18,
    height: 18,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  gridDot: { width: 7, height: 7, backgroundColor: '#E11D48', borderRadius: 2 },
  instaBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E11D48',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instaCircle: {
    width: 8,
    height: 8,
    borderWidth: 2,
    borderColor: '#E11D48',
    borderRadius: 4,
  },
  instaDot: {
    width: 2,
    height: 2,
    backgroundColor: '#E11D48',
    position: 'absolute',
    top: 2,
    right: 2,
    borderRadius: 1,
  },

  /* VISION QUOTE */
  visionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    paddingLeft: 32,
    marginBottom: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  quoteAccent: {
    position: 'absolute',
    left: 0,
    top: 24,
    bottom: 24,
    width: 4,
    backgroundColor: '#E11D48',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  visionText: {
    fontSize: 15,
    color: '#111827',
    lineHeight: 26,
    fontStyle: 'italic',
    fontWeight: '500',
  },

  /* CREATIVE CTA CARD */
  ctaCard: {
    backgroundColor: '#E11D48',
    borderRadius: 32,
    padding: 28,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 8,
  },
  ctaShape1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    opacity: 0.05,
    top: -80,
    right: -50,
  },
  ctaShape2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    opacity: 0.1,
    bottom: -60,
    left: -40,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 13,
    color: '#FFF1F2',
    lineHeight: 20,
    opacity: 0.9,
    marginBottom: 24,
    paddingRight: 20,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  ctaButtonText: {
    color: '#E11D48',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
