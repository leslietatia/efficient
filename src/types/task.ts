export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // AAAA-MM-DD
  executionDay: string; // AAAA-MM-DD
  startTime: string; // HH:MM (24 h)
  durationMin: number;
  completed: boolean;
  notificationId?: string | null;
}

export type TaskFormValues = {
  title: string;
  description: string;
  dueDate: string;
  executionDay: string;
  startTime: string;
  duration: string; // minutos, como texto del input
};

export type TaskFormErrors = Partial<Record<keyof TaskFormValues, string>>;
