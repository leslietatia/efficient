import { TaskFormValues } from '../types/task';
import { validateTaskForm } from '../utils/validation';

const valid: TaskFormValues = {
  title: 'Repasar cálculo',
  description: 'Capítulo 4',
  dueDate: '2026-11-25',
  executionDay: '2026-11-20',
  startTime: '16:30',
  duration: '45',
};

describe('validateTaskForm', () => {
  it('acepta un formulario completo y válido', () => {
    expect(validateTaskForm(valid)).toEqual({});
  });

  it.each(['title', 'description', 'dueDate', 'executionDay', 'startTime', 'duration'] as const)(
    'bloquea el guardado si falta %s',
    (field) => {
      const errors = validateTaskForm({ ...valid, [field]: '' });
      expect(errors[field]).toBeDefined();
    }
  );

  it('rechaza fechas, horas y duraciones inválidas', () => {
    expect(validateTaskForm({ ...valid, dueDate: '2026-02-30' }).dueDate).toBeDefined();
    expect(validateTaskForm({ ...valid, startTime: '25:00' }).startTime).toBeDefined();
    expect(validateTaskForm({ ...valid, duration: '0' }).duration).toBeDefined();
    expect(validateTaskForm({ ...valid, duration: '12.5' }).duration).toBeDefined();
  });

  it('rechaza un día de ejecución posterior a la fecha límite', () => {
    expect(validateTaskForm({ ...valid, executionDay: '2026-12-01' }).executionDay).toBeDefined();
  });

  it('valida en menos de 30 segundos (objetivo del MVP)', () => {
    const t0 = Date.now();
    validateTaskForm(valid);
    expect(Date.now() - t0).toBeLessThan(30000);
  });
});
