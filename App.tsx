import { ThemeProvider } from 'styled-components/native';
import theme from '@theme/index';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { Loading } from '@components/loading';
import { StatusBar } from 'react-native';
import { Players } from '@screens/Players';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ThemeProvider theme={theme}>
        {fontsLoaded ? <Players /> : <Loading />}
      </ThemeProvider>
    </>
  );
}
