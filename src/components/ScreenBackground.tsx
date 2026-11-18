import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../utils/theme';

/** Fondo morado con degradado y dos manchas de luz difusas. */
export function ScreenBackground({ children }: { children: React.ReactNode }) {
  return (
    <LinearGradient colors={[colors.bgTop, colors.bgMid, colors.bgBottom]} style={styles.fill}>
      <View pointerEvents="none" style={[styles.blob, styles.blobTop]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobBottom]} />
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  blob: { position: 'absolute', borderRadius: 999 },
  blobTop: {
    width: 280,
    height: 280,
    top: -90,
    right: -110,
    backgroundColor: 'rgba(139,92,246,0.28)',
  },
  blobBottom: {
    width: 320,
    height: 320,
    bottom: -140,
    left: -140,
    backgroundColor: 'rgba(217,70,239,0.16)',
  },
});
