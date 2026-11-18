import { StyleSheet } from 'react-native';

export const colors = {
  bgTop: '#2B1065', // fondo (degradado vertical)
  bgMid: '#170A3D',
  bgBottom: '#0A0520',
  card: 'rgba(255,255,255,0.07)',
  cardBorder: 'rgba(167,139,250,0.40)',
  field: 'rgba(10,5,32,0.60)',
  text: '#FFFFFF',
  muted: '#B9A9E6',
  violet: '#8B5CF6',
  violetDeep: '#6D28D9',
  magenta: '#D946EF',
  mint: '#34D399',
  amber: '#FBBF24',
  pink: '#F472B6',
  error: '#FB7185',
};

export const radius = { card: 24, input: 16, pill: 999 };

export const common = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgBottom },
});
