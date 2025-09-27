import './global.css';
import { cssInterop } from 'nativewind';
import { Svg } from 'react-native-svg';
import { Image } from 'expo-image';

cssInterop(Svg, { className: 'style' });
cssInterop(Image, { className: 'style' });
