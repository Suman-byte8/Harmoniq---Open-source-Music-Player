import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// --- PLACEHOLDER SCREENS ---
const HomeScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.screenText}>Home</Text>
  </View>
);
const SearchScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.screenText}>Search</Text>
  </View>
);
const GenerateScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.screenText}>Generate</Text>
  </View>
);
const LibraryScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.screenText}>Library</Text>
  </View>
);
const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.screenText}>Profile</Text>
  </View>
);

// --- CUSTOM TAB BAR COMPONENT ---
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Render simple typographic icons for now (You can replace with SVG later)
        const getIcon = routeName => {
          switch (route.name) {
            case 'Home':
              return '🏠';
            case 'Search':
              return '🔍';
            case 'Generate':
              return '⊕';
            case 'Library':
              return '🎵';
            case 'Profile':
              return '👤';
            default:
              return '•';
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.tabItemWrapper}
          >
            <View style={[styles.tabItem, isFocused && styles.tabItemFocused]}>
              <Text style={[styles.tabIcon, isFocused && styles.textFocused]}>
                {getIcon(route.name)}
              </Text>
              <Text style={[styles.tabLabel, isFocused && styles.textFocused]}>
                {label.toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// --- INITIALIZE NAVIGATOR ---
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF1F2' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF1F2" />

      <NavigationContainer>
        <Tab.Navigator
          tabBar={props => <CustomTabBar {...props} />}
          screenOptions={{
            headerShown: false, // Hides the default top header
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Generate" component={GenerateScreen} />
          <Tab.Screen name="Library" component={LibraryScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

// --- STYLES (Matching your Rosewood Palette) ---
const styles = StyleSheet.create({
  /* Screen Styles */
  screen: {
    flex: 1,
    backgroundColor: '#FFF1F2', // Rosewood Background
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },

  /* Custom Tab Bar Styles */
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 90, // Taller for a premium feel
    paddingHorizontal: 10,
    paddingBottom: 20, // Padding for iPhone home indicator / Android bottom
    paddingTop: 10,
    borderTopLeftRadius: 30, // Exact rounded corners from your image
    borderTopRightRadius: 30,

    // Soft shadow pointing upwards
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 10, // For Android shadow
  },
  tabItemWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999, // Pill shape
  },
  tabItemFocused: {
    backgroundColor: '#FFF1F2', // Soft pink background for active tab
  },
  tabIcon: {
    fontSize: 20,
    color: '#A1A1AA', // Gray for inactive
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#A1A1AA', // Gray for inactive
    letterSpacing: 0.5,
  },
  textFocused: {
    color: '#E11D48', // Primary Rosewood color for active icon/text
  },
});
