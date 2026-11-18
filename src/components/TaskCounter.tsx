import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/theme';
import { GlowCard } from './GlowCard';

type Props = { pending: number; done: number };

export function TaskCounter({ pending, done }: Props) {
  const total = pending + done;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <GlowCard style={styles.wrap}>
      <View style={styles.inner}>
        <View style={styles.stat}>
          <Ionicons name="calendar" size={26} color={colors.violet} />
          <Text style={styles.num} testID="pending-count">{pending}</Text>
          <Text style={styles.label}>pendientes</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Ionicons name="checkmark-circle" size={26} color={colors.mint} />
          <Text style={styles.num} testID="done-count">{done}</Text>
          <Text style={styles.label}>finalizadas</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Ionicons name="rocket" size={26} color={colors.magenta} />
          <Text style={styles.num}>{pct}%</Text>
          <Text style={styles.label}>avance</Text>
        </View>
      </View>
      <View style={styles.track}>
        <LinearGradient
          colors={[colors.violet, colors.magenta]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${pct}%` }]}
        />
      </View>
    </GlowCard>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 22 },
  inner: { flexDirection: 'row', alignItems: 'center', paddingTop: 18, paddingBottom: 14 },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  divider: { width: 1, height: 56, backgroundColor: colors.cardBorder },
  num: { fontSize: 28, fontWeight: '800', color: colors.text },
  label: { fontSize: 12, color: colors.muted },
  track: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginHorizontal: 18,
    marginBottom: 18,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: { height: 8, borderRadius: 4 },
});
