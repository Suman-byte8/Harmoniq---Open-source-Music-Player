import './global.css';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function App() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#FFF1F2" />

      <View className="flex-1 justify-center px-6">
        <Text className="text-primary text-4xl mb-2 font-bold">Harmoniq</Text>

        <View className="bg-primary/10 border border-primary rounded-3xl p-4 mb-6">
          <Text className="text-primary font-semibold text-base mb-2">
            Tailwind is working!
          </Text>
          <Text className="text-textDark text-sm">
            This block is styled with Nativewind className utilities.
          </Text>
        </View>

        <Text className="text-textDark text-lg mb-8">
          Discover your perfect echo.
        </Text>

        <View className="bg-surface p-6 rounded-3xl shadow-sm elevation-3">
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#A1A1AA"
            className="bg-background px-4 py-3 rounded-full text-textDark border border-secondary/20 mb-4"
          />

          <TouchableOpacity className="bg-primary py-3 rounded-full items-center mb-3">
            <Text className="text-textLight font-bold text-base">
              Primary Action
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-tertiary py-3 rounded-full items-center">
            <Text className="text-textLight font-bold text-base">
              Secondary Action
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
