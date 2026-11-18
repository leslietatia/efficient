import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];
type Props = { label: string; icon: IconName; onPress: () => void; disabled?: boolean };

export function GradientButton({ label, icon, onPress, disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.wrap,
        pressed && { opacity: 0.88, transform: [{ scale: 0.98 }] },
        disabled && { opacity: 0.6 },
      ]}
    >
      <LinearGradient
        colors={[colors.violet, colors.violetDeep]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.btn}
      >
        <Ionicons name={icon} size={24} color="#fff" />
        <Text style={styles.label}>{label}</Text>
        <View style={styles.chev}>
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 999,
    backgroundColor: colors.violetDeep,
    shadowColor: colors.violet,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  label: { flex: 1, color: colors.text, fontSize: 17, fontWeight: '700' },
  chev: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
