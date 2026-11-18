import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GradientButton } from '../components/GradientButton';
import { ScreenBackground } from '../components/ScreenBackground';
import { SoftInput } from '../components/SoftInput';
import { useTasks } from '../hooks/useTasks';
import { TaskFormErrors, TaskFormValues } from '../types/task';
import { colors } from '../utils/theme';
import { todayISO, validateTaskForm } from '../utils/validation';

export default function NewTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks();
  const [values, setValues] = useState<TaskFormValues>({
    title: '',
    description: '',
    dueDate: '',
    executionDay: todayISO(),
    startTime: '',
    duration: '',
  });
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [saving, setSaving] = useState(false);

  const set = (key: keyof TaskFormValues) => (text: string) => {
    setValues((v) => ({ ...v, [key]: text }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSave = async () => {
    const found = validateTaskForm(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return; // guardado bloqueado
    setSaving(true);
    await addTask({
      title: values.title.trim(),
      description: values.description.trim(),
      dueDate: values.dueDate.trim(),
      executionDay: values.executionDay.trim(),
      startTime: values.startTime.trim(),
      durationMin: Number(values.duration),
    });
    setSaving(false);
    router.back();
  };

  return (
    <ScreenBackground>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
          <Text style={styles.subtitle}>Planifica tu tiempo 💜</Text>

          <SoftInput icon="text" label="Título" value={values.title} onChangeText={set('title')} error={errors.title} placeholder="Ej. Repasar cálculo" />
          <SoftInput icon="list" label="Descripción breve" value={values.description} onChangeText={set('description')} error={errors.description} placeholder="Capítulo 4, ejercicios 1 al 10" />
          <SoftInput icon="calendar" label="Fecha límite" value={values.dueDate} onChangeText={set('dueDate')} error={errors.dueDate} hint="AAAA-MM-DD" placeholder="2026-11-25" keyboardType="numbers-and-punctuation" />
          <SoftInput icon="today" label="Día de ejecución" value={values.executionDay} onChangeText={set('executionDay')} error={errors.executionDay} hint="AAAA-MM-DD" keyboardType="numbers-and-punctuation" />
          <SoftInput icon="time" label="Hora de inicio" value={values.startTime} onChangeText={set('startTime')} error={errors.startTime} hint="HH:MM, formato 24 h" placeholder="16:30" keyboardType="numbers-and-punctuation" />
          <SoftInput icon="hourglass" label="Duración estimada (minutos)" value={values.duration} onChangeText={set('duration')} error={errors.duration} placeholder="45" keyboardType="number-pad" />

          <View style={styles.btnWrap}>
            <GradientButton
              label={saving ? 'Guardando…' : 'Guardar tarea'}
              icon="save"
              onPress={onSave}
              disabled={saving}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  form: { padding: 22, paddingBottom: 60 },
  subtitle: { color: colors.muted, fontSize: 15, marginBottom: 20 },
  btnWrap: { marginTop: 10 },
});
