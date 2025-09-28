import { safeArea } from 'nativewind/dist/tailwind/safe-area';
import nativewind from 'nativewind/preset';

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [nativewind],
  plugins: [safeArea],
  theme: {
    extend: {
      fontFamily: {
        normal: ['NunitoSans_400Regular'],
        medium: ['NunitoSans_500Medium'],
        bold: ['NunitoSans_700Bold'],
      },
      colors: {
        gray: {
          dark: '#BFBFC0'
        }
      },
      boxShadow: {
        'drop': '0px 10px 16px 0px #BFBFC08D',
      }
    }
  }
};
