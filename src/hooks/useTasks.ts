import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Task } from '../types/task';
import { cancelTaskNotification, scheduleTaskNotification } from '../utils/notifications';

const STORAGE_KEY = '@efficient/tasks';

async function readAll(): Promise<Task[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

async function writeAll(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export const sortChronologically = (tasks: Task[]) =>
  [...tasks].sort((a, b) =>
    `${a.executionDay} ${a.startTime}`.localeCompare(`${b.executionDay} ${b.startTime}`)
  );

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Recarga cada vez que la pantalla gana foco (también al volver del formulario).
  useFocusEffect(
    useCallback(() => {
      let active = true;
      readAll().then((stored) => {
        if (active) {
          setTasks(sortChronologically(stored));
          setLoading(false);
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const addTask = useCallback(async (data: Omit<Task, 'id' | 'completed' | 'notificationId'>) => {
    const task: Task = {
      ...data,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      completed: false,
      notificationId: null,
    };
    task.notificationId = await scheduleTaskNotification(task);
    const next = sortChronologically([...(await readAll()), task]);
    await writeAll(next);
    setTasks(next);
    return task;
  }, []);

  const toggleTask = useCallback(async (id: string) => {
    // Actualización optimista: el estado visual cambia al instante (< 200 ms).
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    const stored = await readAll();
    const target = stored.find((t) => t.id === id);
    if (target && !target.completed) await cancelTaskNotification(target.notificationId);
    await writeAll(stored.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, []);

  const removeTask = useCallback(async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    const stored = await readAll();
    const target = stored.find((t) => t.id === id);
    await cancelTaskNotification(target?.notificationId);
    await writeAll(stored.filter((t) => t.id !== id));
  }, []);

  const counts = useMemo(() => {
    const done = tasks.filter((t) => t.completed).length;
    return { done, pending: tasks.length - done, total: tasks.length };
  }, [tasks]);

  return { tasks, loading, counts, addTask, toggleTask, removeTask };
}
