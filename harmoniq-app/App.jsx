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
import { Provider } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DeveloperScreen from './src/screens/Developer';
import GenerateScreen from './src/screens/Generate';
import HomeScreen from './src/screens/Home';
import LibraryScreen from './src/screens/Library';
import ProfileScreen from './src/screens/Profile';
import SearchScreen from './src/screens/Search';
import { store } from './src/store/store';

// --- CUSTOM TAB BAR COMPONENT ---
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        if (route.name === 'Developer') {
          return null;
        }

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

        const getIcon = routeName => {
          const color = isFocused ? '#b80035' : '#5c3f40';
          const size = 24;
          switch (route.name) {
            case 'Home':
              return (
                <Foundation
                  name="home"
                  color={color}
                  size={size}
                  style={styles.tabIcon}
                />
              );
            case 'Search':
              return (
                <MaterialIcons
                  name="search"
                  color={color}
                  size={size}
                  style={styles.tabIcon}
                />
              );
            case 'Generate':
              return (
                <MaterialCommunityIcons
                  name="star-four-points"
                  color={color}
                  size={size}
                  style={styles.tabIcon}
                />
              );
            case 'Library':
              return (
                <Ionicons
                  name="musical-note"
                  color={color}
                  size={size}
                  style={styles.tabIcon}
                />
              );
            case 'Profile':
              return (
                <FontAwesome
                  name="user-circle-o"
                  color={color}
                  size={size}
                  style={styles.tabIcon}
                />
              );
            default:
              return <Text style={[styles.tabIcon, { color }]}>{'•'}</Text>;
          }
        };
        const displayLabel = label === 'Generate' ? 'Create' : label;

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.tabItemWrapper}
          >
            <View style={[styles.tabItem, isFocused && styles.tabItemFocused]}>
              {getIcon(route.name)}
              <Text
                style={[styles.tabLabel, isFocused && styles.textFocused]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {displayLabel.toUpperCase()}
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
const renderTabBar = props => <CustomTabBar {...props} />;

export default function App() {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF1F2" />

      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
            tabBar={renderTabBar}
            screenOptions={{
              headerShown: false, // Hides the default top header
            }}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Generate" component={GenerateScreen} />
            <Tab.Screen name="Library" component={LibraryScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen
              name="Developer"
              component={DeveloperScreen}
              options={{ tabBarButton: () => null }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}

// --- STYLES (Matching your Rosewood Palette) ---
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFF1F2',
  },

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
    flexWrap: 'nowrap',
    maxWidth: 72,
  },
  textFocused: {
    color: '#E11D48', // Primary Rosewood color for active icon/text
  },
});
