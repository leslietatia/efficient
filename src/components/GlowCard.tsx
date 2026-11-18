import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../utils/theme';

type Props = { children?: React.ReactNode; radius?: number; style?: ViewStyle };

/** Tarjeta translúcida con borde y resplandor violeta. */
export function GlowCard({ children, radius = 24, style }: Props) {
  return <View style={[styles.card, { borderRadius: radius }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.violet,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
  },
});
