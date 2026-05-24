import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ActionChip from '../../components/home/ActionChip';
import ArtistAvatar from '../../components/home/ArtistAvatar';
import ContinueCard from '../../components/home/ContinueCard';
import GenreTile from '../../components/home/GenreTile';
import TrendingMiniCard from '../../components/home/TrendingMiniCard';

const quickActions = [
  { id: 'ai', icon: '✨', label: 'AI Generate', active: true },
  { id: 'trending', icon: '📈', label: 'Trending' },
  { id: 'radio', icon: '📻', label: 'Radio' },
  { id: 'new', icon: '🌟', label: 'New Hits' },
];

const continueListening = [
  {
    id: 'track1',
    title: 'Neon Pulse (AI Remix)',
    artist: 'Lumina Drift',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBsU_3XN8QGL9CRPdYaHBfx0Nj2hbFyUTsgsA35xtqSXNVlqhahpjzLM1vvSiOE-QZx1VC-R2JFhoKm01zE79_k7dfP5QxckS3XyGsN-sBtwafY-Q50uND6GjDRd3Xw0FSFfkAUBM7UDQJwig52-nyd9h3WzXrkBTPxvuI9taQrdYCk_xvuJXAuoibpW7lfgysE1pALhXG8m6apRPZJjokemfxCGAfvWmUvYTfLHGDPyTQ8fVM1jYViy3I3AbdaMErlWEbKIDVi',
    progress: 0.65,
  },
  {
    id: 'track2',
    title: 'Acoustic Dreamscapes',
    artist: 'String Theory',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMoCFKwEEj2gXLd01ptWUKXQE2cQBebKzlAlJK9nRPuCOtHfsc28DiDr60qj8cAEFfNfJVlVL7adkfzWebENUkJjF-RiL42sDs-awaGh-tzzyCcpBQhTpw8VDNzvq-3cZn48eWasn3sgjSghLul2vl8BYwG2qesHh_5B4TIFpQUKW3tmmbqthtbVuNqiwZyQddr9MW9CMN9lyzZ9yIQwKh4VU7CgiBcTM6lINLs-1uG54NIbAPw3u2yo-2Pej-0fW2uQYQawcp',
    progress: 0.2,
  },
  {
    id: 'track3',
    title: 'Midnight Sessions',
    artist: 'The Night Owls',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuByxiKcTUlhvDF8txHnwTn09GoJpc8EbIc5Pb90igWQ8Vhoig2NtSWwUEINwKceJouLkrIpwIXEkYr-dd-urnsYTyceR7Vmu6fPgmd2AyzpO2pF8A9FikGdbIM3wP2hDRoYy2q6BJvo39InLCVdZqV6WMMTjghNXb5amtIhQ9dOna_BUYXeLf43DMSrWy6V-ti857tkJf3zYs8I0vDe4rSHkyvPYtnLu0Y6VdULHc-yvlM0R1a0LiTexM2ayFR_ryvxV8VYwFZ0',
    progress: 0.85,
  },
];

const trendingItems = [
  {
    id: 'mini1',
    title: 'Retro Futurism',
    subtitle: 'Synthwave AI',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDqa62MY9Dn1N_MRSZbxd_2mc8G7RpKVVdg-bjmGrsmwcMfiJ51yh_EiPG1sF_NaT517dsVj8OQT11aV3gpuNKQk5R3gRDSsDuo4HH7VQt1mKrnfWgvzwEccjCW0yULfmTg_6ZphMIhtOytp-v4uLypYJ5iEiDepbRLzQKwDwl1q4sIXstlOA7wwTRrVnKYTbdiQCARYXJByU6siZkY-fr8v2a19bMEnRCOT9B8RHDA6lPYeDlCCVXwCBGuuFSUisChfqRBJKfP',
  },
  {
    id: 'mini2',
    title: 'Ocean Floor',
    subtitle: 'Ambient Pro',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNuJ4ei4UR21DoxnzOYOjY_I5ls6e15-8wMgX_8E-HPt7fMjhf7cZgfoGUjLq1Cx8N8ykTkBJqXrnFWekCOT5EppP3Agn-JUYd6Yr6uL5Gopk4l4m4Gd1D60Z5zz9rj5lcTRKuywU-FiaUUSR5clO_83c72l43fuyilFzLRLv3R1JsZNGrNS-pSNJ1QwJFQeUAvQCa6-oqsDFlLTLnrbqsbuTqMfE7VTDmn9dihEH9sjYUm7VXWpnqZYB8P4SabMDX3nDC0MFD',
  },
  {
    id: 'mini3',
    title: 'Sunsets',
    subtitle: 'Melodic Waves',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAaGlqDMJ3Xe53EIJ9iWJwKxPBek4hFjUQq8fPeZU9jwmdUhujvuxlj0uIBIvpC5Q5E_6VRq5b-j1xQ9BRyA-0CEEEI7JOLRTQBZO7wVPOJAORfqMzOtHUHLrvGY6ox6gpzgRrVg5ZXlyHYWj-CQArGOSiSlViey74uYzPEcLuj66AH_LZWAqLAAPv-R16LJPaFzbspY0NiKYDusYWQjs0kPAKXXXWyPOlTKYhE_FdyMrAqG0UMzrW',
  },
];

const recommended = [
  {
    id: 'rec1',
    rank: '01',
    title: 'Cyber Dreams',
    subtitle: 'Generated for your morning flow',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBhLoPN1C_LRPFxiyplxZK-f7eP5Cue-l-DyEPkIJrfjn8W9vA6nMImLfF6LUKedcymlapQo44ZO37F-ChlKOIiJ6SkNJbhTk5QxKU-RN2mn1NdPgQrOcFG5KKbuUzFW4L3HA5SxCZ8xBAwD4pLPTOTIAnY2s6dUP8P2vBUfQcyJ8Ku-rcdlK1I5aaQCHzVRN_UcbPgj_o9DX9zWGSvNp37h8ylXIhSqFSBjSLuwMmk1Ih41qIDt8MQEvg5lUEt6BtMv95Qq_Wh',
    duration: '3:42',
  },
  {
    id: 'rec2',
    rank: '02',
    title: 'Ethereal Forest',
    subtitle: 'Based on your recent Lo-fi interest',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ7weRv5wmvehvpg6h8rxBnJGFWGZP2bS15CgeK5WMf_kS2nrr_sVX5Qhr_CnRHRgMQ7e23SvctOHAjlDr7eFKR-yHDBPcbcmLW6U6-q5bHGTqB8LWyOPdbr9PhK7s4wuV1O9S3Ms0dDaD3O65T0F9Dw6M72L9lfZAcD3trdnOvbCkBlJ4QqtvAgRMJ_lu0oNb1uUhmaseOkYhoWp9v4ilLies5GDqpAEmnRJsfrVC7GvtFkl3R8Rk0l-QYhmBm8LKOm46a2lW',
    duration: '4:15',
  },
  {
    id: 'rec3',
    rank: '03',
    title: 'Urban Pulse',
    subtitle: 'AI Curated: High Energy',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRLUqkpgjzfl-Nky1P8SStCLOC_23Yjhwfrz6D46gQneyFSmxgZ65diWsF6bcsQ3pwhTQ_GzUhcANTMMta40fPyc16jLwnzayNL8tXwKMDBfxleNLl9ShNCpxvebojWl4DsOH3pMPKc0x0HqsNjpLa1t7cWPcuqjUBKIwKnEoj-iPRdTppksS22ckSiwVVjUW2n2K1uqPVm1hQKNreNPfLweaLvgrUx-HL6x7h7JYjL0uoXB4tksSaa8_ZVX8w9KCjh1kd28V-',
    duration: '2:58',
  },
];

const artists = [
  {
    id: 'artist1',
    name: 'Aria Nova',
    verified: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5V7y-IIUeG_Rkujf5YyIWQynsHZ95t9RIeZ-Uz5h-rbcRKJA6TT_ZORi2KZJrWiOG_pqtpoS8rn0mSpHyjtn2LyzoGtFq1IzgzAWDA8Uv8IO7lMtg_ZUuTj8BguMKpGdLlId9BEUetQ-gvJnMXUoAe8Mz1tV2ld1GBpuSS9eS60T7-_RlAQBQtFhfcI8x0S-PHnYnLABOhMXl5bJJ2nPMFY4Rj_Jk0bLaIgH3x3V1SRfjLqwvDbtGTBCVyFPAyBCZYg_TmQOH',
  },
  {
    id: 'artist2',
    name: 'Jaxson',
    verified: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCD7MxeXeeUEZuKFIT7z4s_b36-TlGcDFpUHzL0DK6C8_76sLvF_HZo8SuTf07OvjScsHUt-78ZkffnumRYfdKWkjfu7fNsP4CfSQOzDCPf4_aWXwX_8s4xsZVBMhUiAzUun1SiNRBDaThObvOZzTA09MisKDZWwatu3cxxraPLQ5OxB3kaGh3-9Gk13OaSpslsCvkrbzWzIUZu1F24Uqnqryts6NrlEZ4b0sc1gsb1OKpiApx4Oj-ow0rHXOQosTCUXzKnoQWj',
  },
  {
    id: 'artist3',
    name: 'Mila V',
    verified: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDk8mhZ9JTCfdfe3PqojPpJoYrMW2nTTBu2_fxNMN6ooeWiCt3SZZXjiwnhsKLZ6oFCwXK2u0IgZ4MDQ_KsjzVMf3DIE3wINCGlOhfQQVAX7-TMI4iNAO3IfNcrre0g2QsGQroxcCfhggd8WtPJ_UDgxVVRnCPzj30fF5AXs8IZ6lZ6c3sfqcC41WjNbH0lQK_U7gtUVETQANutY7y8CCYubVCcjBwFEJtAy-rrqTMnKj-efZZ4SJTsmpQkjQm8D_Wr85SS18yc',
  },
  {
    id: 'artist4',
    name: 'The Vision',
    verified: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDIYFvdoQaQXkvfOeXbXH80n17oW-i0JnOsx3G5Oo91q_VXhJFT75Ps0tpM0vgQN_FxXpWggxmksO0nvNfXg3auvU8at03bPmBK4_cuxBf6g1CaQiMGWOTWXG4sE1WaLBQCfH-m1984Q7MgUBa2KZLgVtv0f_u3a4Dx8F7w_K8E6rNCWwc7zxcuf_lYxEAOp2Vek0jTtmgWsnFXLJrcadZRP9u1I0LJd6FG3xJjnXs493nkrOuJlXXC4I8R8h4XouSXPxP5r3Ca',
  },
  {
    id: 'artist5',
    name: 'Luna Sky',
    verified: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUFTrXoFpTgR6uHDFy_1mCplqlWQj4_rK4PGaI_rngSMhOhj9JgKi9ODr8vYepr1nBwebJZw-Dh7zkHcZE7Qh4e-B6KtYDP0SHLnFbp6bLoa7w8HwluYf0tphEciAIDVDwglQVhFJTDXEf-LxOAF2JcT8h3Jgv3cu8O8b4jrafF1MfRGlWg0ypz-dSD7l8c-2XExQMm1QTg1Wc5oqnn9dnZFVwMBE5fbuVBr6JpbfgkKFBKwCsGRzyT0QAXIIwZllebZJ4_2yQ',
  },
];

const genres = [
  { id: 'g1', title: 'Synthwave', icon: '🎹', colors: ['#b80035', '#e11d48'] },
  {
    id: 'g2',
    title: 'Lo-Fi Beats',
    icon: '🎧',
    colors: ['#d8b4fe', '#8b0028'],
  },
  { id: 'g3', title: 'Chill AI', icon: '🧘‍♂️', colors: ['#006855', '#00836c'] },
  { id: 'g4', title: 'Deep Bass', icon: '🔊', colors: ['#5c3f40', '#211a1b'] },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.hello}>Good Morning</Text>
            <Text style={styles.subheading}>
              Ready to forge your next masterpiece?
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
              <Text style={styles.iconText}>🔔</Text>
            </TouchableOpacity>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxGcqgSVfeeWT1x0Qt3A4zVb8i_OIvGwStv5Bov-tyKfm3765hr7-3cR_YO5-vGDdXcGAGXj3EK6-v8FA98cJKm2fC8xDaLnu-YNZVt9INoi5OpPCsfiS87daw-F1yBYLDtxT92SSiYunuiYV9V3scVHghkkeyiXHYCzKhcnMC1FEmkLdtSR9bathmS-4uyBITLv4sXVNuVVkQ4xEJnwrXgWFbqKoDvIuvvsyTAwphUXgNNikdTvfQE9s_JuJxEBghTY3TqkeX',
              }}
              style={styles.avatar}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.searchBar} activeOpacity={0.8}>
          <Text style={styles.searchIcon}>🔎</Text>
          <Text style={styles.searchText}>
            Search for songs, artists, or AI prompts...
          </Text>
          <View style={styles.shortcutPill}>
            <Text style={styles.shortcutText}>⌘ K</Text>
          </View>
        </TouchableOpacity>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipScroll}
          contentContainerStyle={styles.chipContainer}
        >
          {quickActions.map(action => (
            <ActionChip
              key={action.id}
              icon={action.icon}
              label={action.label}
              active={action.active}
            />
          ))}
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Listening</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardRow}
          >
            {continueListening.map(track => (
              <ContinueCard key={track.id} track={track} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <View style={styles.trendingRow}>
            <View style={styles.featuredCard}>
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVH9bLeJfzeK3i4EQPUJdXb23zTYa6BjW3C51KsfDBgKmIIJSH6hArPD0_Q_Np1U4qOifcpNdne8kxKi-F6khND8i9M0dljPq_eLlm1NWjHBtbm14uJ7Cf8HsGT09_reV4cR1n8e9Vtj-1Qu0zSZPFbYUXzPjiy9-vP0-dGKiGzbLkwg33foHU2oJgGRt2PKCJMkWcQTTNJ1e_x0fkz7b4kbuzIByj9qt0-pWkE2A7e1VRjrlANofVN53ANnWX7jpCIXq9f3LX',
                }}
                style={styles.featuredImage}
              />
              <View style={styles.featuredOverlay} />
              <View style={styles.featuredContent}>
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredBadgeText}>#1 Globally</Text>
                </View>
                <Text style={styles.featuredTitle}>Digital Alchemy</Text>
                <Text style={styles.featuredSubtitle}>
                  The Synthetix feat. Echo-7
                </Text>
              </View>
              <TouchableOpacity
                style={styles.featuredPlayButton}
                activeOpacity={0.8}
              >
                <Text style={styles.featuredPlayIcon}>▶</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.miniList}>
              {trendingItems.map(item => (
                <TrendingMiniCard key={item.id} item={item} />
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Made For You</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recommendationCard}>
            {recommended.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.recommendationRow}
                activeOpacity={0.85}
              >
                <Text style={styles.rank}>{item.rank}</Text>
                <Image
                  source={{ uri: item.image }}
                  style={styles.recommendationImage}
                />
                <View style={styles.recommendationText}>
                  <Text style={styles.recommendationTitle}>{item.title}</Text>
                  <Text style={styles.recommendationSubtitle}>
                    {item.subtitle}
                  </Text>
                </View>
                <View style={styles.recommendationMeta}>
                  <Text style={styles.recommendationDuration}>
                    {item.duration}
                  </Text>
                  <Text style={styles.recommendationIcon}>♡</Text>
                  <Text style={styles.recommendationIcon}>⋮</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Artists</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.artistRow}
          >
            {artists.map(artist => (
              <ArtistAvatar key={artist.id} artist={artist} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse Genres</Text>
          <View style={styles.genreGrid}>
            {genres.map(genre => (
              <GenreTile key={genre.id} genre={genre} />
            ))}
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  hello: {
    fontSize: 34,
    fontWeight: '800',
    color: '#211a1b',
  },
  subheading: {
    marginTop: 6,
    fontSize: 15,
    color: '#5c3f40',
    fontWeight: '500',
  },
  headerRight: {
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
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  iconText: {
    fontSize: 20,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ffdada',
    marginLeft: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3f4',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  searchIcon: {
    fontSize: 22,
    color: '#b80035',
    marginRight: 12,
  },
  searchText: {
    flex: 1,
    color: '#5c3f40',
    fontSize: 15,
  },
  shortcutPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#ffffff',
  },
  shortcutText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#b80035',
  },
  chipScroll: {
    marginTop: 18,
    marginBottom: 10,
  },
  chipContainer: {
    paddingRight: 4,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#211a1b',
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: 'row',
    paddingBottom: 4,
  },
  // --- Replace these styles in your HomeScreen ---

  trendingRow: {
    flexDirection: 'column', // Changed from 'row' to stack them beautifully
  },
  featuredCard: {
    width: '100%',
    height: 220, // Much better height (was 340)
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: 20, // Space between banner and mini cards
    // Added premium shadow
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  featuredImage: {
    ...StyleSheet.absoluteFillObject,
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', // Slightly lighter for a premium look
  },
  featuredContent: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    right: 80, // Prevent text from hitting the play button
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E11D48', // Using our exact primary color
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 10,
  },
  featuredBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  featuredTitle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 4,
  },
  featuredSubtitle: {
    color: '#FFF1F2',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.9,
  },
  featuredPlayButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E11D48',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  featuredPlayIcon: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 4, // Optical alignment for the triangle
  },
  miniList: {
    width: '100%', // Take up full width now!
    flexDirection: 'column',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  viewAll: {
    color: '#b80035',
    fontWeight: '700',
    fontSize: 13,
  },
  recommendationCard: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  recommendationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  rank: {
    width: 28,
    fontSize: 14,
    fontWeight: '800',
    color: '#b80035',
    marginRight: 14,
  },
  recommendationImage: {
    width: 52,
    height: 52,
    borderRadius: 16,
    marginRight: 14,
  },
  recommendationText: {
    flex: 1,
    justifyContent: 'center',
  },
  recommendationTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#211a1b',
  },
  recommendationSubtitle: {
    fontSize: 12,
    color: '#6b5563',
    marginTop: 2,
  },
  recommendationMeta: {
    alignItems: 'flex-end',
  },
  recommendationDuration: {
    fontSize: 12,
    color: '#6b5563',
    fontWeight: '700',
  },
  recommendationIcon: {
    fontSize: 16,
    color: '#b80035',
  },
  artistRow: {
    paddingBottom: 6,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
