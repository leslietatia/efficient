import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, radius } from '../utils/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];
type Props = TextInputProps & { label: string; icon: IconName; error?: string; hint?: string };

export function SoftInput({ label, icon, error, hint, style, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.labelRow}>
        <View style={styles.badge}>
          <Ionicons name={icon} size={16} color="#fff" />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor="rgba(185,169,230,0.6)"
        selectionColor={colors.violet}
        keyboardAppearance="dark"
        style={[styles.input, error ? styles.inputError : null, style]}
        {...rest}
      />
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 16 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: colors.violet,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { color: colors.text, fontSize: 14, fontWeight: '700' },
  input: {
    backgroundColor: colors.field,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radius.input,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
  },
  inputError: { borderColor: colors.error },
  error: { color: colors.error, fontSize: 13, marginTop: 6, marginLeft: 4 },
  hint: { color: colors.muted, fontSize: 12, marginTop: 6, marginLeft: 4 },
});
