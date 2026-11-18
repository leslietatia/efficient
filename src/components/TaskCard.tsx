import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Task } from '../types/task';
import { colors } from '../utils/theme';
import { todayISO } from '../utils/validation';
import { GlowCard } from './GlowCard';

type Props = { task: Task; onToggle: (id: string) => void; onDelete: (id: string) => void };

export function TaskCard({ task, onToggle, onDelete }: Props) {
  const isToday = task.executionDay === todayISO();
  return (
    <GlowCard style={styles.card}>
      <View style={styles.row}>
        <Pressable
          onPress={() => onToggle(task.id)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: task.completed }}
          accessibilityLabel={`Marcar ${task.title} como completada`}
          hitSlop={10}
        >
          <View style={[styles.check, task.completed && styles.checkDone]}>
            {task.completed && <Ionicons name="checkmark" size={18} color="#0A0520" />}
          </View>
        </Pressable>

        <View style={styles.body}>
          <Text style={[styles.title, task.completed && styles.struck]} numberOfLines={2}>
            {task.title}
          </Text>
          <Text style={[styles.desc, task.completed && styles.struck]} numberOfLines={2}>
            {task.description}
          </Text>
          <View style={styles.chips}>
            <View style={[styles.chip, styles.chipTime]}>
              <Ionicons name="time-outline" size={13} color="#DDD0FF" />
              <Text style={[styles.chipText, { color: '#DDD0FF' }]}>
                {isToday ? 'Hoy' : task.executionDay} · {task.startTime} · {task.durationMin} min
              </Text>
            </View>
            <View style={[styles.chip, styles.chipDue]}>
              <Ionicons name="flag-outline" size={13} color="#FBCFE8" />
              <Text style={[styles.chipText, { color: '#FBCFE8' }]}>Entrega {task.dueDate}</Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => onDelete(task.id)}
          accessibilityRole="button"
          accessibilityLabel={`Eliminar ${task.title}`}
          hitSlop={10}
        >
          <Ionicons name="trash-outline" size={20} color={colors.pink} />
        </Pressable>
      </View>
    </GlowCard>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'flex-start', padding: 16, gap: 14 },
  body: { flex: 1 },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.violet,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkDone: { backgroundColor: colors.mint, borderColor: colors.mint },
  title: { fontSize: 17, fontWeight: '700', color: colors.text },
  desc: { fontSize: 14, color: colors.muted, marginTop: 4 },
  struck: { textDecorationLine: 'line-through', opacity: 0.5 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  chipTime: { backgroundColor: 'rgba(139,92,246,0.28)' },
  chipDue: { backgroundColor: 'rgba(244,114,182,0.20)' },
  chipText: { fontSize: 12, fontWeight: '600' },
});
