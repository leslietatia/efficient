import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlowCard } from '../components/GlowCard';
import { GradientButton } from '../components/GradientButton';
import { ScreenBackground } from '../components/ScreenBackground';
import { TaskCard } from '../components/TaskCard';
import { TaskCounter } from '../components/TaskCounter';
import { useTasks } from '../hooks/useTasks';
import { colors } from '../utils/theme';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { tasks, counts, loading, toggleTask, removeTask } = useTasks();

  return (
    <ScreenBackground>
      <View style={[styles.header, { paddingTop: insets.top + 14 }]}>
        <LinearGradient
          colors={[colors.violet, colors.violetDeep]}
          style={styles.logo}
        >
          <Ionicons name="checkmark" size={30} color="#fff" />
        </LinearGradient>
        <View>
          <Text style={styles.brand}>Efficient</Text>
          <Text style={styles.tagline}>Organiza · Planifica · Cumple 💜</Text>
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(t) => t.id}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 120 }]}
        ListHeaderComponent={<TaskCounter pending={counts.pending} done={counts.done} />}
        renderItem={({ item }) => (
          <TaskCard task={item} onToggle={toggleTask} onDelete={removeTask} />
        )}
        ListEmptyComponent={
          loading ? null : (
            <View style={styles.emptyWrap}>
              <View style={styles.emptyIcon}>
                <Ionicons name="clipboard" size={72} color={colors.violet} />
              </View>
              <GlowCard style={styles.emptyCard}>
                <Ionicons name="star" size={22} color={colors.amber} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.emptyTitle}>Aún no tienes tareas.</Text>
                  <Text style={styles.emptyText}>
                    Toca “Nueva tarea” y reserva tu primer bloque de estudio.
                  </Text>
                </View>
              </GlowCard>
            </View>
          )
        }
      />

      <View style={[styles.fabWrap, { bottom: insets.bottom + 20 }]}>
        <GradientButton
          label="Nueva tarea"
          icon="add-circle"
          onPress={() => router.push('/new-task')}
        />
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 20, paddingBottom: 18 },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  brand: { fontSize: 30, fontWeight: '800', color: colors.text },
  tagline: { fontSize: 13, color: colors.muted, marginTop: 2 },
  list: { paddingHorizontal: 20 },
  emptyWrap: { alignItems: 'center', marginTop: 8 },
  emptyIcon: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(139,92,246,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.violet,
    shadowOpacity: 0.7,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
    marginBottom: 24,
  },
  emptyCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 18, alignSelf: 'stretch' },
  emptyTitle: { color: colors.text, fontWeight: '800', fontSize: 16 },
  emptyText: { color: colors.muted, fontSize: 14, marginTop: 4, lineHeight: 20 },
  fabWrap: { position: 'absolute', left: 20, right: 20 },
});
