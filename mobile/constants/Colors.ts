/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    backgroundSecondary: '#F5F5F5',
    tint: tintColorLight,
    icon: '#11181C',
    shadow: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: '#b5b5b5',
  },
  dark: {
    text: '#ECEDEE',
    background: '#0f0f0f',
    backgroundSecondary: '#313131',
    tint: tintColorDark,
    icon: '#9BA1A6',
    shadow: '#ECEDEE',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: '#F5F5F5',
  },
};
