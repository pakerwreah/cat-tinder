import './global.css';

import { Image } from 'expo-image';

import { cssInterop } from 'nativewind';
import { Svg } from 'react-native-svg';

cssInterop(Svg, { className: 'style' });
cssInterop(Image, { className: 'style' });
