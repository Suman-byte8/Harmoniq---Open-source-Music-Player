import { useMemo, useState } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const recentSearches = [
  'Cyberpunk Ambient',
  'Chillhop Beats',
  'Symphonic Metal AI',
];

const trendingTags = [
  { id: 'lofi', label: 'Lo-fi Neural', active: true },
  { id: 'synth', label: 'Synthwave Bloom' },
  { id: 'deep', label: 'Deep Tech' },
  { id: 'acoustic', label: 'Acoustic Logic' },
];

const categories = [
  {
    id: 'focus',
    title: 'Focus',
    icon: '🌿',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC-L-wsifuHZJ_D5tOTHkYQYK15tQq16mUe1aicYlLPaMxRtVwG-GRjVBPliPJyvQPfrb1vv2TfuoMQghn8bkOgzJNsDKa0bHMfRyP4RCMDkju2Odret0PZfdCp52ft2f2w0u-2LkbR2ogTCp7eEWPmfqsAAAV7NeyBL7vD74SSW5yZTC3AeX4zGjTllM_rImh8VORJ11MfWIXHv5Om46sAt2XyTPRHUaj5A-R31gH02DYaODGVIvzijkyYnfcgrIe6iOYagjrA',
    accent: '#b80035',
  },
  {
    id: 'chill',
    title: 'Chill',
    icon: '🌊',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCXDUuWh-TNsiitHeARJS5qLaqdgb9vNfz0rEBdQwsXIxhl4-mebp6Ht50LRhaI1iPLNZV_NXdz2yutvrkq_yAXeR78nv4OplCKRjTQAVjRDLN9rcFdqlmY87PbELdinDsOeRp2f3Q_HvPGlBQl1-sIbxa97m2xSxJ1ohgdcHRbaWgtqaZ3YNqXycywWHPPqBnMPokfnfBfouitxDMeb9qT1AUI5ymxWk28Ma_b01XXDtbmmjfPmGCBJi-eh0nNuOqnGNpz-dBZ',
    accent: '#8b0028',
  },
  {
    id: 'energetic',
    title: 'Energetic',
    icon: '⚡',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBjpoeOkWWqnBZptvI1FsB-ercf-FyaVbD5i0Bdp8ySQwdPvuY7w6ygKjwNYpbU0LrPS4OftbRSOV4jw0SF6qaduwJQ8UxzxctCemwA-wXbAW0PEJ7Q0dXvf1nBBUeSUIs7m99O1S570VTmEPc-4KvXR_fwEwY8446BMDzlsW9-LSpdAAsr29fptSWy7IJYb8d_zM09fKth2et_IMOtcIDsJGr8AbXN1JAc5I7yF0_IyoQPbMk4d8c5flqi6kwzdlnXBj0_mPj6',
    accent: '#006855',
  },
  {
    id: 'piano',
    title: 'Piano AI',
    icon: '🎹',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGSfNQNmm4M0nOYSefzERdQpwUfK4y-SugMsmp27hQBZWubYu40eHGPcigDkc05SfHYVZtVStX5b07HN07dDwNNyNRWqgawIrituuKvKjpaDYI4D2rqpRCHbGBnOp6Rb6ycuwA5vGKHHxBV-VA7rUMOQGo4cqqsXvUCaLI8pSSC8-hdcFFx4P6zNVLiT6NoxkKjoMBUE5dbSDap_DeGDcPLYfR_w-_Dcl4VmpxgvcjRV1rkf71d1XHt29IJXX9OXGk6Umc4lh4',
    accent: '#5c3f40',
  },
];

const placeholderRows = [
  { label: 'Artists', icon: '👤' },
  { label: 'Tracks', icon: '🎵' },
  { label: 'Albums', icon: '💿' },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  const filteredRecent = useMemo(
    () =>
      recentSearches.filter(item =>
        item.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.circleButton} activeOpacity={0.8}>
              <Text style={styles.icon}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.title}>SoundForge AI</Text>
          </View>
          <TouchableOpacity style={styles.circleButton} activeOpacity={0.8}>
            <Text style={styles.icon}>🔔</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchCard}>
          <View style={styles.searchInputRow}>
            <Text style={styles.searchIcon}>🔎</Text>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search for sounds, artists, or AI styles..."
              placeholderTextColor="#7b5a66"
              style={styles.searchInput}
            />
            <TouchableOpacity
              onPress={() => setQuery('')}
              style={styles.iconButton}
              activeOpacity={0.8}
            >
              <Text style={styles.iconButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchActions}>
            <TouchableOpacity style={styles.micButton} activeOpacity={0.85}>
              <Text style={styles.micIcon}>🎤</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Recent</Text>
            <TouchableOpacity>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recentList}>
            {filteredRecent.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.recentItem}
                activeOpacity={0.8}
              >
                <Text style={styles.recentIcon}>🕘</Text>
                <Text style={styles.recentText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Trending Now</Text>
          <View style={styles.tagRow}>
            {trendingTags.map(tag => (
              <TouchableOpacity
                key={tag.id}
                style={[styles.tagPill, tag.active && styles.tagActive]}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.tagText, tag.active && styles.tagActiveText]}
                >
                  {tag.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Browse Categories</Text>
          </View>
          <View style={styles.cardGrid}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                activeOpacity={0.9}
              >
                <ImageBackground
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                  imageStyle={styles.categoryImageStyle}
                >
                  <View style={styles.categoryOverlay} />
                  <View style={styles.categoryInner}>
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Live Insights</Text>
          </View>
          <View style={styles.placeholderGrid}>
            {placeholderRows.map(row => (
              <View key={row.label} style={styles.placeholderCard}>
                <View style={styles.placeholderHeading}>
                  <Text style={styles.placeholderIcon}>{row.icon}</Text>
                  <Text style={styles.placeholderTitle}>{row.label}</Text>
                </View>
                <View style={styles.placeholderContent}>
                  <View style={styles.placeholderBar} />
                  <View style={styles.placeholderBarLong} />
                  {row.label === 'Albums' ? (
                    <View style={styles.albumGrid}>
                      <View style={styles.albumTile} />
                      <View style={styles.albumTile} />
                      <View style={styles.albumTile} />
                    </View>
                  ) : null}
                </View>
              </View>
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
  content: {
    padding: 20,
    paddingBottom: 36,
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
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  icon: {
    fontSize: 18,
  },
  title: {
    marginLeft: 14,
    fontSize: 22,
    fontWeight: '900',
    color: '#211a1b',
  },
  searchCard: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 18,
    shadowColor: '#b80035',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08,
    shadowRadius: 35,
    elevation: 5,
    marginBottom: 24,
  },
  searchInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8f7',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 18,
    color: '#b80035',
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#211a1b',
    paddingVertical: 0,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  iconButtonText: {
    color: '#b80035',
    fontSize: 16,
  },
  searchActions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  micButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#b80035',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#b80035',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 6,
  },
  micIcon: {
    fontSize: 22,
    color: '#ffffff',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.12,
    color: '#211a1b',
  },
  clearText: {
    fontSize: 12,
    color: '#b80035',
    fontWeight: '700',
  },
  recentList: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 2,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: '#fff8f7',
    marginBottom: 10,
  },
  recentIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#5c3f40',
  },
  recentText: {
    fontSize: 14,
    color: '#5c3f40',
    fontWeight: '600',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagPill: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#fff8f7',
    borderWidth: 1,
    borderColor: '#f4d7d9',
    marginRight: 10,
    marginBottom: 10,
  },
  tagActive: {
    backgroundColor: '#b80035',
    borderColor: '#b80035',
  },
  tagText: {
    color: '#5c3f40',
    fontWeight: '700',
  },
  tagActiveText: {
    color: '#ffffff',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 0.85,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#f8ebec',
  },
  categoryImage: {
    flex: 1,
    justifyContent: 'space-between',
  },
  categoryImageStyle: {
    resizeMode: 'cover',
  },
  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(40, 20, 20, 0.28)',
  },
  categoryInner: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 18,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
  },
  placeholderGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  placeholderCard: {
    width: '48%',
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 2,
  },
  placeholderHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  placeholderIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  placeholderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#211a1b',
  },
  placeholderContent: {},
  placeholderBar: {
    height: 10,
    width: '80%',
    borderRadius: 99,
    backgroundColor: '#f3e5e6',
    marginBottom: 10,
  },
  placeholderBarLong: {
    height: 10,
    width: '100%',
    borderRadius: 99,
    backgroundColor: '#f3e5e6',
    marginBottom: 10,
  },
  albumGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  albumTile: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#f3e5e6',
  },
});
