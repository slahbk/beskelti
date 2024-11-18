import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  let [loaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerStyle: { backgroundColor: isDark.backgroundSecondary },
              headerShown: true,
              headerTitle: "",
              headerRight: () => (
                <Ionicons
                  name="search-sharp"
                  size={25}
                  color={isDark.text}
                  onPress={() => router.navigate("/product/Search")}
                />
              ),
              headerLeft: () => (
                <Ionicons
                  name="person-circle-outline"
                  size={30}
                  color={isDark.text}
                  onPress={() => router.navigate("/auth/SignUp")}
                />
              ),
            }}
          />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="product/[data]"
            options={{ headerTitle: "", headerTransparent: true }}
          />
          <Stack.Screen
            name="product/Search"
            options={{ headerTitle: "Search", headerShown: false }}
          />
          <Stack.Screen
            name="auth/SignUp"
            options={{ headerTitle: "Sign Up", headerShown: false }}
          />
          <Stack.Screen
            name="auth/Login"
            options={{ headerTitle: "Login", headerShown: false }}
          />
        </Stack>
      </Provider>
    </ThemeProvider>
  );
}
