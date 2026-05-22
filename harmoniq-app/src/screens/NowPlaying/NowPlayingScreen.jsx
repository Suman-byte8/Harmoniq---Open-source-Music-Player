import { useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');
const ARTWORK_SIZE = width * 0.85;

// --- PURE UI ICONS (No Emojis, 100% Professional Vector Shapes) ---
const PlayIcon = () => <View style={styles.playIcon} />;

const PauseIcon = () => (
  <View style={styles.pauseIconContainer}>
    <View style={styles.pauseBar} />
    <View style={styles.pauseBar} />
  </View>
);

const NextIcon = () => (
  <View style={styles.skipIconContainer}>
    <View style={styles.skipTriangleRight} />
    <View style={styles.skipBar} />
  </View>
);

const PrevIcon = () => (
  <View style={styles.skipIconContainer}>
    <View style={styles.skipBar} />
    <View style={styles.skipTriangleLeft} />
  </View>
);

export default function NowPlayingScreen({ onClose = () => {} }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('QUEUE');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF1F2" />

      {/* TOP HEADER */}
      <View style={styles.headerArea}>
        <View style={styles.dragHandle} />
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onClose} style={styles.iconButton}>
            <View style={styles.chevronDown} />
          </TouchableOpacity>
          <Text style={styles.headerLabel}>NOW PLAYING</Text>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.menuDots}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* ALBUM ARTWORK */}
      <View style={styles.albumArea}>
        <View style={styles.imageShadowWrap}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxWjB1R42xOmzgu6Uww7PVxBQ0dkX3MyzWL5SZEB-zSEbcOW1kMFOfyYqfP0zP7O-itJEYKUHSPYZ-En7gNf15h_HMP31ikFnDZ_AsKBD70LCsvETW7lumzKx25Is5pnweG_cJi4CP5wz9sTqartGDLp-DUAoZZmK6MCxiyrj-wurS1c3ktYthFs50NACaOGQupYdAxI2mfX6c0FBCxDVCRLRAyqFKkyf3RQdlmx3VdO9Qr85I97q7qRmhIRlBcagdxFSj1-Gz',
            }}
            style={styles.cover}
          />
        </View>
      </View>

      {/* TRACK META DATA */}
      <View style={styles.metaArea}>
        <View style={styles.metaTextWrap}>
          <Text style={styles.trackTitle} numberOfLines={1}>
            Etheric Rhythm
          </Text>
          <Text style={styles.trackArtist} numberOfLines={1}>
            Aether Bloom AI
          </Text>
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsLiked(!isLiked)}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.favoriteIcon, isLiked && styles.favoriteIconActive]}
          >
            {isLiked ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTROLS AREA */}
      <View style={styles.controlsArea}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
            <View style={styles.progressThumb} />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>1:24</Text>
            <Text style={styles.timeText}>-2:38</Text>
          </View>
        </View>

        {/* Main Playback Controls */}
        <View style={styles.playControls}>
          <TouchableOpacity style={styles.secondaryControlBtn}>
            <Text style={styles.controlText}>SHUFFLE</Text>
          </TouchableOpacity>

          <View style={styles.centerControls}>
            <TouchableOpacity style={styles.skipButton} activeOpacity={0.7}>
              <PrevIcon />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.playButton}
              activeOpacity={0.9}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipButton} activeOpacity={0.7}>
              <NextIcon />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.secondaryControlBtn}>
            <Text style={styles.controlText}>REPEAT</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Utility Actions (Premium Pill UI) */}
        <View style={styles.bottomCard}>
          {['LYRICS', 'QUEUE', 'SHARE'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.actionPill,
                activeTab === tab && styles.actionPillActive,
              ]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.actionText,
                  activeTab === tab && styles.actionTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1F2', // Rosewood Background
  },

  /* HEADER */
  headerArea: {
    paddingTop: 12,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E5D5D6',
    borderRadius: 999,
    alignSelf: 'center',
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 8,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  chevronDown: {
    width: 14,
    height: 14,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#111827',
    transform: [{ rotate: '45deg' }],
    marginTop: -6,
  },
  menuDots: {
    flexDirection: 'row',
    gap: 3,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#111827',
  },
  headerLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E11D48',
    letterSpacing: 2,
  },

  /* ALBUM ARTWORK */
  albumArea: {
    alignItems: 'center',
    marginBottom: 32,
  },
  imageShadowWrap: {
    width: ARTWORK_SIZE,
    height: ARTWORK_SIZE,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 10,
  },
  cover: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },

  /* TRACK META */
  metaArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  metaTextWrap: {
    flex: 1,
    paddingRight: 16,
  },
  trackTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  trackArtist: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E11D48',
    opacity: 0.9,
  },
  favoriteButton: {
    padding: 8,
  },
  favoriteIcon: {
    color: '#A1A1AA',
    fontSize: 30,
  },
  favoriteIconActive: {
    color: '#E11D48',
  },

  /* CONTROLS */
  controlsArea: {
    paddingHorizontal: 32,
    flex: 1,
  },

  /* Progress Bar */
  progressContainer: {
    marginBottom: 32,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5D5D6',
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressFill: {
    width: '33%',
    height: '100%',
    backgroundColor: '#E11D48',
    borderRadius: 999,
  },
  progressThumb: {
    width: 14,
    height: 14,
    backgroundColor: '#E11D48',
    borderRadius: 7,
    marginLeft: -7,
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#71717A',
  },

  /* Playback Buttons */
  playControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 36,
  },
  secondaryControlBtn: {
    paddingVertical: 10,
  },
  controlText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#71717A',
    letterSpacing: 1,
  },
  centerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  skipButton: {
    padding: 10,
  },

  /* Custom Shape Icons */
  playIcon: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 18,
    borderRightWidth: 0,
    borderBottomWidth: 12,
    borderTopWidth: 12,
    borderLeftColor: '#FFFFFF',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: 6,
  },
  pauseIconContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  pauseBar: {
    width: 6,
    height: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  skipIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  skipBar: {
    width: 4,
    height: 16,
    backgroundColor: '#111827',
    borderRadius: 2,
  },
  skipTriangleRight: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 14,
    borderRightWidth: 0,
    borderBottomWidth: 9,
    borderTopWidth: 9,
    borderLeftColor: '#111827',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  skipTriangleLeft: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderRightWidth: 14,
    borderLeftWidth: 0,
    borderBottomWidth: 9,
    borderTopWidth: 9,
    borderRightColor: '#111827',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },

  playButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#E11D48',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },

  /* Bottom Actions - Premium Pill Design */
  bottomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  actionPill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
  },
  actionPillActive: {
    backgroundColor: '#FFF1F2', // Soft background for active tab
  },
  actionText: {
    fontSize: 11,
    color: '#71717A',
    fontWeight: '700',
    letterSpacing: 1,
  },
  actionTextActive: {
    color: '#E11D48',
  },
});
