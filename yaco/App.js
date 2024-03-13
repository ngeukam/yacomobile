import 'react-native-gesture-handler';
import * as React from 'react';
import { useFonts } from 'expo-font';
import { AuthProvider } from './scr/context/AuthContext';
import AppNav from './scr/navigation/AppNav';
const App = () => {
  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
    'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

export default App;