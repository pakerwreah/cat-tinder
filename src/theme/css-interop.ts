import './global.css';
import { cssInterop } from 'nativewind';
import { Svg } from 'react-native-svg';

cssInterop(Svg, { className: 'style' });
