import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Task } from '../types/task';

const supported = Platform.OS !== 'web';

if (supported) {
  try {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  } catch (e) {
    console.warn('No se pudo configurar el manejador de notificaciones:', e);
  }
}

export async function setupNotifications(): Promise<boolean> {
  if (!supported) return false;
  try {
    if (Platform.OS === 'android') {
      try {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Recordatorios de estudio',
          importance: Notifications.AndroidImportance.HIGH,
        });
      } catch (e) {
        // El canal es opcional: Android usa uno por defecto.
        console.warn('No se pudo crear el canal de notificaciones:', e);
      }
    }
    const current = await Notifications.getPermissionsAsync();
    if (current.granted) return true;
    const asked = await Notifications.requestPermissionsAsync();
    return asked.granted;
  } catch (e) {
    console.warn('No se pudieron obtener permisos de notificaciones:', e);
    return false;
  }
}

function startDate(task: Task): Date {
  const [y, m, d] = task.executionDay.split('-').map(Number);
  const [hh, mm] = task.startTime.split(':').map(Number);
  return new Date(y, m - 1, d, hh, mm, 0, 0);
}

/** Programa una alerta local a la hora de inicio. Devuelve el id o null si no se pudo. */
export async function scheduleTaskNotification(task: Task): Promise<string | null> {
  if (!supported) return null;
  try {
    const date = startDate(task);
    if (date.getTime() <= Date.now()) return null; // hora ya pasada
    const granted = await setupNotifications();
    if (!granted) return null;
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: `Es hora de: ${task.title}`,
        body: `${task.durationMin} min · ${task.description}`,
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date },
    });
  } catch (e) {
    console.warn('No se pudo programar la notificación:', e);
    return null;
  }
}

export async function cancelTaskNotification(id?: string | null): Promise<void> {
  if (!supported || !id) return;
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch (e) {
    console.warn('No se pudo cancelar la notificación:', e);
  }
}