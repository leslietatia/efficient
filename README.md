# Efficient

## Problema
Efficient resuelve el problema de la procrastinación estudiantil y la falta de planificación realista del tiempo.

## Solución
Efficient ayudará a los estudiantes a mejorar su organización diaria y vencer la procrastinación mediante un sistema estructurado de gestión de tiempo. En lugar de acumular tareas en una lista genérica, la aplicación guía al usuario para convertir cada obligación en un plan concreto: definir cuándo se entrega, elegir el día y la hora exacta en que se va a realizar y calcular cuánto tiempo tomará completarla.

## Objetivos
- Permitir el registro de tareas académicas validando sus campos obligatorios en menos de 30 segundos mediante pruebas unitarias automatizadas con Jest y React Native Testing Library.
- Asegurar la persistencia local del 100 por ciento de los registros en AsyncStorage comprobando su integridad con inspección de datos JSON tras 3 reinicios forzados en Expo Go.
- Actualizar el estado visual de las tareas completadas en menos de 200 ms medido con React DevTools Profiler y emitir recordatorios locales en menos de 5 segundos verificados con marcas de tiempo en dispositivo físico.

## Habilidades
- Crear componentes reutilizables
- Colocar navegación con Expo Router
- Crear Custom Hooks para la lógica de tareas
- Guardar datos localmente con AsyncStorage
- Manejar estados con useState y useEffect
- Diseñar pantallas limpias con StyleSheet

## Alcance inicial
Formulario sencillo de registro: Un espacio limpio para anotar el nombre de la tarea, una breve descripción, la fecha límite, el día en que se va a realizar, la hora y el tiempo estimado.
Lista visual de tareas: Tarjetas ordenadas con los datos clave de cada pendiente para revisar de un vistazo qué toca hacer en el día.
Control de avance: Opción para marcar tareas como completadas (tachándolas) y eliminar las que ya no se necesiten, junto con un contador simple de tareas pendientes y hechas.
Almacenamiento local: Guardado automático en el dispositivo con AsyncStorage para que los deberes no se pierdan al cerrar o recargar la aplicación.
Diseño limpio y adaptable: Interfaz minimalista con tonos pastel suaves y navegación básica entre pantallas que funcione bien tanto en el navegador como en el celular.

## Restricciones
- No tendrá integración con inteligencia artificial ni sugerencias automáticas.
- No contará con sistema de registro, inicio de sesión ni perfiles de usuario en la nube.
- No enviará notificaciones remotas desde servidores externos (solo recordatorios locales en el dispositivo).
- No tendrá modo colaborativo ni opción para compartir tareas con otras personas.
- No incluirá calendario mensual interactivo ni sincronización con Google Calendar.
- No permitirá adjuntar archivos, imágenes ni notas de voz dentro de las tareas.
- No requerirá conexión a internet para funcionar, ya que todo se guardará de forma local.
