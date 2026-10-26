import { createGlobalTheme, globalStyle } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    gray: {
      50: '#FAFAFA',
      100: '#E8EBED',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    brand: {
      dark: '#262626',
      gold: '#FFC117',
      light: '#F1F2F5',
      white: '#FFFFFF',
    },
    error: '#EB3E3E',
  },
});

globalStyle('html', {
  scrollbarGutter: 'stable',
});

globalStyle('body', {
  fontFamily:
    '"Pretendard Variable", Pretendard, -apple-system, system-ui, sans-serif',
});
