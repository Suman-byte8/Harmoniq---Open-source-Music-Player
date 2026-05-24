import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const trackCards = [
  {
    title: 'Ethereal Currents',
    detail: 'Ambient • 4:20',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCbnTjnc0UJtMzpU1PXoc_ipF3cPpVnpoaOG8UW_ThaSeHOPkMuRcO0Y1lZiBfkIoWLdrz-i9UK34Sptvp8A2MUcqQ_LJ--A6iXe9JucJ59XyhXR6y-Dz3T7_4N-cVTjXxthI_bral3ZK3VkiVhZ-hoxjWY5soxpDL6Dqmv6o57Y1QNTa9nERGTST5p76UO478vLOVElPwnlx25jEXQggc8izv6FawXBLQsTWguYoYsHLzsjxNu-cnqdO0yP-EkVE_cWh4917Ih',
  },
  {
    title: 'Neon Pulse',
    detail: 'Synthwave • 3:45',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGb9cylqee05p6Ny-TGkcpWRWHuEBKUdStUAZeR-tkxxnGRr39xDevoLyQ_TuXHCu1rOYTtiirGq0wzrX4x7S5JDtBCdb7p-MK3vZv4h436WsCgoReLiSAh6dDKoIflK45z91DsyGbhy4gykwL08rz6IvFnvJ1-Dp7CQJCyKmtXvjRkZzJvZkdMlfU6JHymhplBNT4lCIp4JQsBqASDzTxA8gWhZIE0yDzbKZeBUr83No5g1ebG2_bWAFZ36XWlrfy8C1FT3bc',
  },
];

const favoriteArtists = [
  {
    name: 'Synthetix',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD_QjCWCPad5srdQa40TlEoXtEGawkqWBO4TjVPpbXG5qx5R7oh0-B4r_MAaq6wsWRtReBltCgGlH7bI1hs2mxvl8YQ4e4QaOZVc8QPqQ7l78j_8fTTwn7r_ry7vcBenTjvPUU6t9LuyVidTPpbSbbNhPId0BW2Plxy4UVjTLKMLu0gKIXmuirGow8pAHZL7IkXDxk0Xai0T1rX8ki50n6YUymedfr-CWqHNFlAkG32ie8z_exr98FVp8LXpSm75XlgSZ2pCa',
  },
  {
    name: 'Lunar Beats',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcfikPdIfMianF4MR2jb4YvZpDeqn4nAjIEh_8L0f4oH9fuaKfkT7pbJqaGawCmOvZZ9pDjRvrz_8MyrVCx4Buq8K-Iz191gxLhjtCSDQir8lv_WqcSt5BlA7WxtgATfFx0BCjjEElD2fQACbUvqj9Sxe4OwOzBrQo3WYAVxkZVYo_JoSckSj-DiGmjyh88Voiv0w1RK0nNans5jd4lwjo8BlIYZMPlyIh22vmCl8UwPW68__STT8cTn70NPA9CpHhD2W6lQB7',
  },
  {
    name: 'Rose Bloom',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDxi2bq5E5d2XZHer4GfHmh5aOW5ruq8k2VpgAgN-Fk42UmTMSwHwR0KKdFQYp5Jyj6VZ7FKPyykKJTEy1SUpue67W1T3rP-wdoueOrc_qZv3Kzr2nEKiyqYCzea8BiFCPMQEWgS0kA0FUKeaWaCgufVo3kC2zu82UhDcbp9d2cuFm3OWalvkrFcHxiwTqUtGhl74M6OOg--_7_pAsPjXCPevRPTOYYNcGd3lEHiKD2ehj0rFJo0LHT6SiALIP2lgvlfrd1s4R0',
  },
];

const accountMenu = [
  { icon: '👤', label: 'Profile Settings' },
  { icon: '🔔', label: 'Notifications' },
  { icon: '🔒', label: 'Privacy & Security' },
];

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatarRing}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACHKr80bTtpJ6GHubyjAZdNJxU8TcNC7BNcwic0F8yfZd4LjhEZKrMQI7_MvWgcgNk_DFnBNezV1-nuu2qGjijQ4Z0wTnQEh9iRM8lYjinjTbsAK4fkg7g0vv0ZKH104wdUkc5WffQv11i_dlW2YQzrpddAmgfZt2EYkXWrh2Sf5_xttV-j__s9gvgWI9APoCK-vXuZobOrMznWFhGYkLaKnkCbATwZNxF3SXLf1MpeTMRlLcnImw6Xv0pDdDsJsf_OCArptSp',
              }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>Sarah Mitchell</Text>
            <Text style={styles.profileRole}>
              AI Composer & Sound Architect
            </Text>
            <Text style={styles.profileBio}>
              Exploring the intersection of neural networks and neo-classical
              melodies.
            </Text>
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryButtonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                activeOpacity={0.85}
              >
                <Text style={styles.secondaryButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBlock}>
            <Text style={styles.statValue}>124</Text>
            <Text style={styles.statLabel}>Created</Text>
          </View>
          <View style={[styles.statBlock, styles.statDivider]}>
            <Text style={styles.statValue}>2.8k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statValue}>492</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Know the Developer</Text>
          <Text style={styles.sectionBody}>
            Learn more about the creator behind Harmoniq AI and the vision that
            drives every feature.
          </Text>
          <TouchableOpacity
            style={styles.developerCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Developer')}
          >
            <Text style={styles.developerCardTitle}>Alex River</Text>
            <Text style={styles.developerCardSubtitle}>
              Founder, lead architect, and the voice behind Harmoniq AI.
            </Text>
            <Text style={styles.developerCardLink}>View developer profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionTitle}>Your Public Tracks</Text>
            <TouchableOpacity activeOpacity={0.75}>
              <Text style={styles.sectionAction}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.trackGrid}>
            {trackCards.map(track => (
              <View key={track.title} style={styles.trackCard}>
                <Image
                  source={{ uri: track.image }}
                  style={styles.trackImage}
                />
                <View style={styles.trackInfo}>
                  <Text style={styles.trackTitle}>{track.title}</Text>
                  <Text style={styles.trackMeta}>{track.detail}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favorite Artists</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.artistScroll}
          >
            {favoriteArtists.map(artist => (
              <View key={artist.name} style={styles.artistItem}>
                <View style={styles.artistAvatarRing}>
                  <Image
                    source={{ uri: artist.image }}
                    style={styles.artistAvatar}
                  />
                </View>
                <Text style={styles.artistName}>{artist.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.card}>
            <Text style={styles.menuHeader}>Account Settings</Text>
            {accountMenu.map(item => (
              <TouchableOpacity
                key={item.label}
                activeOpacity={0.75}
                style={styles.menuItem}
              >
                <View style={styles.menuItemLeft}>
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>
                <Text style={styles.menuChevron}>›</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.divider} />
            <TouchableOpacity
              activeOpacity={0.75}
              style={[styles.menuItem, styles.logoutButton]}
            >
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>🚪</Text>
                <Text style={[styles.menuLabel, styles.logoutLabel]}>
                  Log Out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.proCard}>
            <Text style={styles.proIcon}>⭐</Text>
            <Text style={styles.proTitle}>Open Source</Text>
            <Text style={styles.proText}>
              Harmoniq AI is free and open source. If you find value in our
              tools, consider supporting the mission.
            </Text>
            <TouchableOpacity style={styles.linkButton} activeOpacity={0.85}>
              <Text style={styles.linkButtonText}>View on GitHub • 2.4k ★</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.supportButton} activeOpacity={0.85}>
              <Text style={styles.supportButtonText}>Donate to Developer</Text>
            </TouchableOpacity>
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
    gap: 18,
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarRing: {
    width: 120,
    height: 120,
    borderRadius: 32,
    padding: 6,
    backgroundColor: '#fff8f7',
    borderWidth: 4,
    borderColor: '#ffdada',
    shadowColor: '#b80035',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 34,
    fontWeight: '900',
    color: '#211a1b',
    marginBottom: 6,
  },
  profileRole: {
    fontSize: 16,
    fontWeight: '700',
    color: '#b80035',
    marginBottom: 10,
  },
  profileBio: {
    fontSize: 14,
    color: '#5c3f40',
    lineHeight: 22,
    marginBottom: 18,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#b80035',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: '#fff8f7',
    borderWidth: 1,
    borderColor: '#e5bdbe',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  secondaryButtonText: {
    color: '#b80035',
    fontWeight: '800',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff1f2',
    borderRadius: 28,
    padding: 22,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  statBlock: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e5bdbe',
    paddingHorizontal: 16,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#b80035',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#5c3f40',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#211a1b',
  },
  sectionBody: {
    fontSize: 14,
    color: '#5c3f40',
    lineHeight: 22,
    marginBottom: 14,
  },
  developerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f4d7d9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 3,
    marginBottom: 14,
  },
  developerCardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#211a1b',
    marginBottom: 6,
  },
  developerCardSubtitle: {
    fontSize: 14,
    color: '#5c3f40',
    marginBottom: 12,
  },
  developerCardLink: {
    fontSize: 14,
    fontWeight: '900',
    color: '#b80035',
  },
  sectionAction: {
    color: '#b80035',
    fontWeight: '800',
    fontSize: 14,
  },
  trackGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  trackCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 3,
  },
  trackImage: {
    width: '100%',
    height: 160,
  },
  trackInfo: {
    padding: 14,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#211a1b',
    marginBottom: 4,
  },
  trackMeta: {
    fontSize: 12,
    color: '#5c3f40',
  },
  artistScroll: {
    paddingVertical: 6,
  },
  artistItem: {
    width: 88,
    marginRight: 16,
    alignItems: 'center',
  },
  artistAvatarRing: {
    width: 88,
    height: 88,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f3e5e6',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  artistAvatar: {
    width: 78,
    height: 78,
    borderRadius: 999,
  },
  artistName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#211a1b',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  menuHeader: {
    fontSize: 11,
    fontWeight: '900',
    color: '#5c3f40',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 18,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuIcon: {
    fontSize: 18,
  },
  menuLabel: {
    fontWeight: '800',
    color: '#211a1b',
  },
  menuChevron: {
    fontSize: 18,
    color: '#906f70',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5bdbe',
    opacity: 0.35,
    marginVertical: 12,
  },
  logoutButton: {
    paddingTop: 8,
  },
  logoutLabel: {
    color: '#ba1a1a',
  },
  proCard: {
    backgroundColor: '#fff8f7',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: '#e5bdbe',
  },
  proIcon: {
    fontSize: 32,
    color: '#b80035',
    marginBottom: 14,
    textAlign: 'center',
  },
  proTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#211a1b',
    marginBottom: 10,
    textAlign: 'center',
  },
  proText: {
    color: '#5c3f40',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 18,
  },
  linkButton: {
    borderWidth: 1,
    borderColor: '#b80035',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  linkButtonText: {
    color: '#b80035',
    fontWeight: '800',
  },
  supportButton: {
    backgroundColor: '#b80035',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
});
