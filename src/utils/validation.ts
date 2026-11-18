import { TaskFormErrors, TaskFormValues } from '../types/task';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

export function isValidDate(value: string): boolean {
  if (!DATE_RE.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

export function isValidTime(value: string): boolean {
  return TIME_RE.test(value);
}

/** Devuelve un objeto vacío si el formulario es válido. Los 6 campos son obligatorios. */
export function validateTaskForm(v: TaskFormValues): TaskFormErrors {
  const e: TaskFormErrors = {};
  if (!v.title.trim()) e.title = 'Escribe el título de la tarea.';
  if (!v.description.trim()) e.description = 'Agrega una descripción breve.';

  if (!v.dueDate.trim()) e.dueDate = 'Indica la fecha límite.';
  else if (!isValidDate(v.dueDate.trim())) e.dueDate = 'Usa el formato AAAA-MM-DD.';

  if (!v.executionDay.trim()) e.executionDay = 'Indica el día de ejecución.';
  else if (!isValidDate(v.executionDay.trim())) e.executionDay = 'Usa el formato AAAA-MM-DD.';

  if (!v.startTime.trim()) e.startTime = 'Indica la hora de inicio.';
  else if (!isValidTime(v.startTime.trim())) e.startTime = 'Usa el formato HH:MM (24 h).';

  const minutes = Number(v.duration);
  if (!v.duration.trim()) e.duration = 'Indica la duración en minutos.';
  else if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440)
    e.duration = 'Escribe minutos entre 1 y 1440.';

  if (!e.dueDate && !e.executionDay && v.executionDay.trim() > v.dueDate.trim()) {
    e.executionDay = 'El día de ejecución no puede ser posterior a la fecha límite.';
  }
  return e;
}

export function todayISO(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}
