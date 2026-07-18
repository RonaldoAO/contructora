# Plataforma de Control y Seguimiento de Obra

## README funcional para Frontend

## 1. Objetivo de la plataforma

La plataforma permite administrar el avance operativo de proyectos de construcción, conectando:

* El cronograma planeado.
* El avance reportado desde campo.
* La evidencia fotográfica y documental.
* Los responsables de cada actividad.
* Los bloqueos e incidencias.
* La aprobación del avance.
* La generación de reportes ejecutivos.

El producto no debe comportarse únicamente como un diagrama de Gantt ni como una galería de fotografías.

La unidad central de información es la **actividad de obra**, la cual debe poder responder:

* ¿Qué trabajo debe realizarse?
* ¿Dónde debe realizarse?
* ¿Quién es responsable?
* ¿Cuándo estaba planeado?
* ¿Cuánto avance tiene?
* ¿Quién reportó ese avance?
* ¿Quién lo aprobó?
* ¿Qué evidencia lo respalda?
* ¿Qué problema podría retrasarlo?

---

# 2. Alcance del MVP

El MVP debe cubrir los siguientes módulos principales:

1. Autenticación y organización.
2. Gestión de proyectos.
3. Participantes y permisos.
4. Ubicaciones del proyecto.
5. Estructura de trabajo o WBS.
6. Cronograma de obra.
7. Lookahead o planeación de corto plazo.
8. Registro de avance.
9. Evidencia multimedia.
10. Incidencias y bloqueos.
11. Aprobaciones.
12. Dashboard y reportes.
13. Funciones asistidas por inteligencia artificial.
14. Historial y trazabilidad.

No forman parte del MVP:

* Contabilidad completa.
* Nómina.
* Facturación fiscal.
* Inventario avanzado.
* BIM 3D.
* Nivelación automática de recursos.
* Sustitución completa de Primavera P6 o Microsoft Project.
* Cálculo autónomo del avance mediante fotografías.
* ERP administrativo completo.

---

# 3. Principios funcionales

## 3.1 El backend es la fuente oficial

El frontend puede realizar cálculos para previsualización, pero los valores oficiales deben provenir del backend.

Esto aplica especialmente para:

* Avance total del proyecto.
* Avance oficial de una actividad.
* Porcentajes ponderados.
* Actividades atrasadas.
* Estado del cronograma.
* Curva planeada contra curva real.
* Permisos.
* Transiciones de estado.
* Reportes aprobados.

El frontend no debe asumir que una operación fue exitosa hasta recibir confirmación del backend.

---

## 3.2 El avance no se sobrescribe directamente

No debe existir una edición simple de un campo como:

```ts
activity.progress = 75;
```

Cada actualización de avance debe generar un registro independiente y auditable.

Ejemplo:

```text
Actividad: Instalación eléctrica nivel 2
Avance anterior aprobado: 40 %
Avance reportado: 55 %
Cantidad ejecutada en el periodo: 150 m
Reportado por: Residente de obra
Estado: Pendiente de aprobación
```

La actividad mostrará el último avance aprobado, pero conservará el historial completo.

---

## 3.3 El avance reportado no es igual al avance aprobado

Deben diferenciarse claramente:

* **Avance reportado:** valor enviado por el responsable de campo.
* **Avance aprobado:** valor validado por un supervisor o administrador.
* **Avance rechazado:** reporte que requiere corrección.
* **Avance observado:** reporte que necesita aclaraciones.

Solo el avance aprobado debe afectar los indicadores oficiales del proyecto.

---

## 3.4 La línea base no se modifica

Cuando una versión del cronograma se aprueba como línea base, debe quedar congelada.

Los cambios posteriores deben generar:

* Una revisión.
* Un pronóstico.
* Un escenario.
* Una nueva versión aprobada.

El frontend no debe permitir editar directamente una línea base aprobada.

---

# 4. Roles principales

Los permisos finales deberán recibirse desde backend. El frontend no debe depender únicamente del nombre del rol.

## 4.1 Administrador de organización

Puede:

* Administrar usuarios.
* Crear proyectos.
* Configurar catálogos.
* Asignar participantes.
* Consultar todos los proyectos de la organización.
* Configurar permisos generales.

## 4.2 Director o dueño

Puede:

* Consultar la cartera de proyectos.
* Ver avance, riesgos y retrasos.
* Consultar reportes ejecutivos.
* Aprobar cambios cuando tenga el permiso correspondiente.
* Consultar indicadores generales.

Su experiencia debe priorizar información resumida y orientada a decisiones.

## 4.3 Project Manager o administrador de obra

Puede:

* Configurar el proyecto.
* Administrar el cronograma.
* Asignar responsables.
* Revisar el avance.
* Aprobar o rechazar reportes.
* Administrar incidencias.
* Generar reportes.
* Crear planes lookahead.

## 4.4 Residente o superintendente

Puede:

* Consultar las actividades asignadas.
* Reportar avance.
* Subir fotografías, videos, documentos y notas de voz.
* Registrar bloqueos.
* Consultar observaciones.
* Corregir reportes rechazados.

La experiencia de este usuario debe ser principalmente móvil.

## 4.5 Supervisor o aprobador

Puede:

* Revisar reportes de avance.
* Comparar avance anterior contra avance reportado.
* Consultar evidencia.
* Aprobar, observar o rechazar.
* Registrar comentarios de revisión.

## 4.6 Contratista o subcontratista

Puede:

* Consultar únicamente las actividades que le correspondan.
* Reportar avance cuando tenga autorización.
* Subir evidencia.
* Responder observaciones.
* Consultar incidencias relacionadas con su alcance.

## 4.7 Cliente o propietario

Puede:

* Consultar dashboards autorizados.
* Ver reportes ejecutivos.
* Consultar evidencia publicada.
* Revisar hitos, riesgos y cambios.
* Aprobar solicitudes específicas cuando tenga ese permiso.

Normalmente debe ser un perfil de lectura limitada.

---

# 5. Entidades que debe comprender el frontend

## 5.1 Proyecto

Representa una obra o contrato.

Información principal:

```ts
interface Project {
  id: string;
  code: string;
  name: string;
  description?: string;
  type?: string;
  status: ProjectStatus;

  clientName?: string;
  contractAmount?: number;
  currency: string;

  plannedStartDate?: string;
  plannedFinishDate?: string;
  actualStartDate?: string;
  actualFinishDate?: string;

  address?: string;
  latitude?: number;
  longitude?: number;
  timezone: string;

  officialProgress: number;
  plannedProgress: number;
  variance: number;

  projectManager?: UserSummary;
}
```

Estados sugeridos:

```ts
type ProjectStatus =
  | "draft"
  | "planning"
  | "active"
  | "paused"
  | "completed"
  | "cancelled"
  | "archived";
```

---

## 5.2 Ubicación

Representa dónde se realiza el trabajo.

Debe manejarse como una estructura jerárquica.

Ejemplo:

```text
Proyecto
└── Torre A
    ├── Nivel 1
    │   ├── Departamento 101
    │   └── Departamento 102
    └── Nivel 2
        ├── Departamento 201
        └── Departamento 202
```

Tipos posibles:

* Sitio.
* Edificio.
* Torre.
* Nivel.
* Unidad.
* Departamento.
* Habitación.
* Zona.
* Frente de trabajo.

El frontend debe soportar:

* Vista de árbol.
* Crear nodos.
* Editar nodos.
* Mover nodos.
* Activar o desactivar nodos.
* Seleccionar una ubicación en formularios.
* Filtrar actividades y evidencia por ubicación.

---

## 5.3 WBS o estructura de trabajo

Representa qué se va a construir.

Ejemplo:

```text
Proyecto
├── Preliminares
├── Cimentación
├── Estructura
├── Instalaciones
│   ├── Eléctrica
│   ├── Hidráulica
│   └── Sanitaria
└── Acabados
    ├── Pisos
    ├── Pintura
    └── Carpintería
```

La WBS no debe confundirse con las ubicaciones.

Ejemplo:

* “Nivel 2” es una ubicación.
* “Instalación eléctrica” es un elemento de la WBS.
* “Instalación eléctrica del nivel 2” es un paquete o actividad de trabajo.

---

## 5.4 Actividad

Es el elemento principal del cronograma.

```ts
interface Activity {
  id: string;
  projectId: string;
  code: string;
  name: string;
  description?: string;

  parentActivityId?: string;
  workPackageId?: string;
  locationIds: string[];

  responsible?: UserSummary;
  contractor?: CompanySummary;

  progressMethod: ProgressMethod;
  plannedQuantity?: number;
  executedQuantity?: number;
  unit?: string;

  approvedProgress: number;
  reportedProgress?: number;

  plannedStartDate?: string;
  plannedFinishDate?: string;
  forecastStartDate?: string;
  forecastFinishDate?: string;
  actualStartDate?: string;
  actualFinishDate?: string;

  status: ActivityStatus;
  isMilestone: boolean;
  isCritical?: boolean;
  totalFloatDays?: number;

  hasOpenIssues: boolean;
  evidenceCount: number;
}
```

Métodos de avance:

```ts
type ProgressMethod =
  | "manual_percent"
  | "quantity"
  | "milestone"
  | "weighted_children"
  | "duration";
```

Estados sugeridos:

```ts
type ActivityStatus =
  | "not_started"
  | "ready"
  | "in_progress"
  | "blocked"
  | "completed"
  | "cancelled";
```

---

## 5.5 Versión de cronograma

Una actividad puede tener distintas fechas dependiendo de la versión consultada.

Tipos:

```ts
type ScheduleVersionType =
  | "baseline"
  | "revision"
  | "forecast"
  | "scenario";
```

Estados:

```ts
type ScheduleVersionStatus =
  | "draft"
  | "pending_approval"
  | "approved"
  | "rejected"
  | "superseded";
```

El frontend debe permitir seleccionar la versión que se está visualizando.

Como mínimo, la vista del cronograma debe poder comparar:

* Línea base.
* Pronóstico actual.
* Fechas reales.

---

## 5.6 Reporte de avance

Agrupa los avances registrados en un periodo o una jornada.

```ts
interface ProgressReport {
  id: string;
  projectId: string;
  reportDate: string;
  periodStart?: string;
  periodEnd?: string;

  status: ProgressReportStatus;
  submittedBy: UserSummary;
  reviewedBy?: UserSummary;

  generalComments?: string;
  weather?: string;

  entriesCount: number;
  evidenceCount: number;
}
```

Estados:

```ts
type ProgressReportStatus =
  | "draft"
  | "submitted"
  | "observed"
  | "approved"
  | "rejected";
```

---

## 5.7 Entrada de avance

Representa el avance de una actividad específica.

```ts
interface ProgressEntry {
  id: string;
  reportId: string;
  activityId: string;
  locationId?: string;

  previousApprovedProgress: number;
  reportedProgress: number;
  approvedProgress?: number;

  previousExecutedQuantity?: number;
  reportedQuantity?: number;
  cumulativeQuantity?: number;

  actualStartDate?: string;
  actualFinishDate?: string;

  crewSize?: number;
  workedHours?: number;

  comments?: string;
  blockerDescription?: string;

  reviewStatus: ProgressEntryStatus;
  reviewComments?: string;

  evidence: MediaAsset[];
}
```

---

## 5.8 Evidencia multimedia

```ts
interface MediaAsset {
  id: string;
  type: "image" | "video" | "audio" | "document";

  originalName: string;
  mimeType: string;
  size: number;

  thumbnailUrl?: string;
  previewUrl?: string;
  downloadUrl?: string;

  capturedAt?: string;
  uploadedAt: string;
  uploadedBy: UserSummary;

  locationId?: string;
  activityId?: string;
  progressEntryId?: string;
  issueId?: string;

  processingStatus:
    | "pending_upload"
    | "uploading"
    | "processing"
    | "ready"
    | "failed";

  evidenceType?:
    | "before"
    | "during"
    | "after"
    | "inspection"
    | "delivery"
    | "defect"
    | "general";
}
```

---

## 5.9 Incidencia o bloqueo

```ts
interface Issue {
  id: string;
  projectId: string;

  activityId?: string;
  locationId?: string;

  type: IssueType;
  title: string;
  description: string;

  severity: "low" | "medium" | "high" | "critical";
  status: IssueStatus;

  responsible?: UserSummary;
  dueDate?: string;
  resolvedAt?: string;

  estimatedScheduleImpactDays?: number;
  estimatedCostImpact?: number;

  evidenceCount: number;
  commentsCount: number;
}
```

Tipos sugeridos:

```ts
type IssueType =
  | "material_shortage"
  | "design_question"
  | "quality_defect"
  | "safety"
  | "client_decision"
  | "supplier_delay"
  | "weather"
  | "access"
  | "labor_shortage"
  | "change_request"
  | "other";
```

Estados:

```ts
type IssueStatus =
  | "open"
  | "in_review"
  | "in_progress"
  | "resolved"
  | "closed"
  | "cancelled";
```

---

# 6. Navegación principal

Estructura sugerida:

```text
/dashboard
/projects
/projects/:projectId
/projects/:projectId/overview
/projects/:projectId/schedule
/projects/:projectId/lookahead
/projects/:projectId/progress
/projects/:projectId/evidence
/projects/:projectId/issues
/projects/:projectId/reports
/projects/:projectId/team
/projects/:projectId/settings
/notifications
/organization/users
/organization/settings
```

La navegación disponible debe depender de los permisos recibidos.

---

# 7. Funcionalidades principales

## 7.1 Inicio de sesión y selección de organización

El usuario debe poder:

* Iniciar sesión.
* Cerrar sesión.
* Recuperar contraseña.
* Seleccionar organización cuando pertenezca a más de una.
* Seleccionar proyecto activo.
* Consultar su perfil.
* Cambiar preferencias básicas.

Al iniciar sesión, el frontend debe obtener:

```ts
interface SessionContext {
  user: User;
  organizations: OrganizationSummary[];
  activeOrganization: OrganizationSummary;
  permissions: string[];
}
```

Los permisos deben validarse mediante utilidades como:

```ts
can("project.create");
can("schedule.edit");
can("progress.submit");
can("progress.approve");
can("issue.resolve");
```

Ocultar un botón no sustituye la validación de backend.

---

## 7.2 Dashboard de cartera

El dashboard general debe mostrar los proyectos accesibles para el usuario.

Indicadores sugeridos:

* Proyectos activos.
* Proyectos atrasados.
* Avance planeado promedio.
* Avance real promedio.
* Variación general.
* Incidencias críticas.
* Reportes pendientes de aprobación.
* Actividades que vencen próximamente.

Cada tarjeta de proyecto puede mostrar:

* Nombre.
* Cliente.
* Responsable.
* Fecha de término planeada.
* Avance planeado.
* Avance aprobado.
* Variación.
* Semáforo de estado.
* Cantidad de bloqueos.

Semáforo sugerido:

* Verde: dentro del rango permitido.
* Amarillo: desviación moderada.
* Rojo: desviación importante o incidencia crítica.
* Gris: no existe suficiente información.

Los umbrales deben recibirse del backend o de la configuración del proyecto.

---

## 7.3 Creación y configuración de proyecto

La creación de proyecto puede manejarse mediante un asistente.

### Paso 1. Información general

* Nombre.
* Código.
* Cliente.
* Tipo de obra.
* Moneda.
* Monto de contrato.
* Fechas.
* Ubicación.
* Zona horaria.

### Paso 2. Participantes

* Usuarios internos.
* Cliente.
* Contratistas.
* Proveedores.
* Roles y permisos.

### Paso 3. Estructura física

* Torres.
* Niveles.
* Áreas.
* Frentes.

### Paso 4. WBS

* Capítulos.
* Partidas.
* Subpartidas.

### Paso 5. Cronograma

* Crear manualmente.
* Importar desde archivo.
* Copiar una plantilla.
* Dejar pendiente para después.

El proyecto debe poder guardarse como borrador.

---

## 7.4 Cronograma de obra

La pantalla de cronograma debe tener como mínimo:

* Vista de tabla.
* Vista Gantt.
* Selector de versión.
* Filtros.
* Agrupación.
* Búsqueda.
* Panel lateral de detalle.
* Comparación entre línea base y pronóstico.

Columnas principales:

* Código.
* Actividad.
* Responsable.
* Ubicación.
* Inicio planeado.
* Fin planeado.
* Inicio pronosticado.
* Fin pronosticado.
* Avance planeado.
* Avance aprobado.
* Variación.
* Estado.
* Bloqueos.
* Evidencia.

Acciones:

* Crear actividad.
* Crear subactividad.
* Editar actividad.
* Asignar responsable.
* Relacionar ubicación.
* Establecer cantidad y unidad.
* Crear dependencia.
* Marcar hito.
* Duplicar actividad.
* Cancelar actividad.
* Consultar historial.

Dependencias soportadas inicialmente:

* Fin a inicio.
* Inicio a inicio.

La interfaz puede mostrar otros tipos de dependencia cuando el backend los soporte, pero no es necesario construir un editor avanzado equivalente a Primavera.

---

## 7.5 Comparación de línea base contra pronóstico

El usuario debe poder visualizar:

* Barra de línea base.
* Barra de pronóstico actual.
* Fecha real.
* Desviación en días.
* Actividades críticas.
* Actividades vencidas.
* Actividades bloqueadas.

Una actividad puede considerarse atrasada cuando:

```text
La fecha actual es posterior a su fecha planeada de término
y su avance aprobado es menor a 100 %.
```

También puede existir retraso cuando:

```text
La fecha pronosticada de término es posterior
a la fecha de término de la línea base.
```

El estado definitivo debe ser calculado por backend.

---

## 7.6 Lookahead

El lookahead representa la planeación operativa de las siguientes semanas.

Periodo sugerido:

* 3 semanas.
* 4 semanas.
* 6 semanas.

La pantalla debe mostrar:

* Actividades programadas.
* Responsable.
* Ubicación.
* Semana planeada.
* Estado de preparación.
* Restricciones.
* Compromiso del responsable.
* Resultado al cierre de la semana.

Restricciones posibles:

* Plano aprobado.
* Material disponible.
* Frente liberado.
* Personal disponible.
* Equipo disponible.
* Permiso obtenido.
* Actividad predecesora terminada.
* Decisión del cliente.
* Información técnica disponible.

Cada restricción debe tener:

* Estado.
* Responsable.
* Fecha compromiso.
* Comentario.
* Evidencia opcional.

Una actividad no debe mostrarse como lista para ejecutar mientras tenga restricciones obligatorias pendientes.

---

## 7.7 Registro de avance

El flujo principal del residente debe ser rápido y móvil.

### Flujo recomendado

1. Seleccionar proyecto.
2. Consultar “Mis actividades”.
3. Seleccionar actividad.
4. Registrar avance.
5. Agregar cantidad ejecutada o porcentaje.
6. Subir evidencia.
7. Registrar comentarios.
8. Registrar bloqueo cuando exista.
9. Guardar borrador o enviar.

Formulario sugerido:

```text
Actividad
Ubicación
Avance anterior aprobado
Cantidad planeada
Cantidad ejecutada acumulada
Cantidad ejecutada hoy
Porcentaje resultante
Fecha
Número de trabajadores
Horas trabajadas
Comentarios
Bloqueos
Fotografías
Video
Nota de voz
```

El frontend debe prellenar la información conocida.

---

## 7.8 Métodos de cálculo del avance

### Porcentaje manual

El usuario captura un porcentaje entre 0 y 100.

Validaciones:

* No puede ser menor que cero.
* No puede ser mayor que 100.
* No debe ser menor al último avance aprobado, salvo que se registre una corrección autorizada.
* Debe solicitarse comentario cuando la variación sea significativa.

### Por cantidad

Ejemplo:

```text
Cantidad planeada: 1,000 m²
Cantidad ejecutada aprobada: 400 m²
Cantidad reportada nueva: 150 m²
Cantidad acumulada: 550 m²
Avance resultante: 55 %
```

El porcentaje mostrado debe ser calculado usando:

```text
cantidad ejecutada acumulada / cantidad planeada
```

El backend debe validar y devolver el porcentaje oficial.

### Por hito

Una actividad de tipo hito normalmente tendrá:

* 0 % mientras no se complete.
* 100 % al confirmarse.

### Por actividades hijas

El progreso depende de las actividades descendientes y sus pesos.

Este valor no debe editarse manualmente.

### Por duración

Puede calcularse con base en tiempo consumido, aunque no debe asumirse que el tiempo transcurrido equivale necesariamente a avance físico.

---

## 7.9 Evidencia

La evidencia debe poder cargarse desde:

* Cámara.
* Galería.
* Explorador de archivos.
* Grabación de audio.
* Grabación de video.

Cada evidencia debe relacionarse al menos con:

* Proyecto.
* Usuario.
* Fecha.
* Actividad o incidencia.

Opcionalmente:

* Ubicación.
* Reporte de avance.
* Tipo de evidencia.
* Coordenadas geográficas.

Flujo de carga recomendado:

1. Solicitar URL firmada al backend.
2. Subir archivo directamente al almacenamiento.
3. Confirmar carga.
4. Mostrar estado de procesamiento.
5. Actualizar miniatura o preview.

Estados visuales:

* Pendiente.
* Subiendo.
* Procesando.
* Disponible.
* Error.
* Reintentar.

No debe bloquearse todo el formulario mientras un archivo está subiendo.

Debe advertirse al usuario antes de abandonar una pantalla con archivos pendientes.

---

## 7.10 Revisión y aprobación del avance

La bandeja de aprobaciones debe mostrar:

* Reportes pendientes.
* Responsable que reportó.
* Fecha.
* Actividades incluidas.
* Cambio de avance solicitado.
* Cantidad de evidencia.
* Incidencias relacionadas.

El aprobador debe poder:

* Aprobar todo el reporte.
* Revisar entrada por entrada.
* Aprobar una entrada.
* Observar una entrada.
* Rechazar una entrada.
* Agregar comentarios.
* Consultar evidencia en pantalla completa.

Transiciones válidas:

```text
draft -> submitted
submitted -> approved
submitted -> observed
submitted -> rejected
observed -> submitted
rejected -> draft
```

No debe permitirse editar un reporte aprobado.

Una corrección posterior debe generar un nuevo registro.

---

## 7.11 Incidencias y bloqueos

Las incidencias deben presentarse mediante:

* Vista de lista.
* Vista por columnas o Kanban.
* Vista por ubicación.
* Vista por actividad.
* Indicadores de severidad.

Formulario:

* Tipo.
* Título.
* Descripción.
* Severidad.
* Actividad.
* Ubicación.
* Responsable.
* Fecha compromiso.
* Impacto estimado.
* Evidencia.
* Comentarios.

Una incidencia puede bloquear una actividad.

Cuando esto ocurra:

* La actividad debe mostrar estado bloqueado.
* Debe mostrarse el motivo.
* Debe mostrarse el responsable de resolverlo.
* Debe mostrarse la fecha compromiso.
* Debe aparecer en el dashboard de riesgos.

Resolver una incidencia no significa cerrarla automáticamente.

Flujo recomendado:

```text
open -> in_review -> in_progress -> resolved -> closed
```

---

## 7.12 Dashboard del proyecto

Debe mostrar:

### Información general

* Avance planeado.
* Avance aprobado.
* Variación.
* Fecha de término base.
* Fecha de término pronosticada.
* Días estimados de retraso.

### Operación

* Actividades en curso.
* Actividades atrasadas.
* Actividades bloqueadas.
* Actividades sin responsable.
* Actividades sin avance reciente.

### Incidencias

* Abiertas.
* Críticas.
* Vencidas.
* Próximas a vencer.

### Aprobaciones

* Reportes pendientes.
* Reportes observados.
* Tiempo promedio de aprobación.

### Evidencia

* Evidencia reciente.
* Actividades sin evidencia.
* Últimas fotografías.

Los widgets deben respetar permisos y filtros.

---

## 7.13 Cálculo del avance total

El avance total no debe calcularse mediante un promedio simple.

Ejemplo incorrecto:

```text
Actividad A: 100 %
Actividad B: 0 %

Avance del proyecto = 50 %
```

Ese cálculo sería incorrecto cuando las actividades tienen diferente importancia.

Debe utilizarse una ponderación, normalmente basada en:

* Presupuesto.
* Valor contractual.
* Cantidad de trabajo.
* Peso manual congelado.

Conceptualmente:

```text
Avance del proyecto =
suma del avance aprobado de cada actividad multiplicado por su peso
```

El frontend puede mostrar una previsualización, pero siempre debe usar como oficial el valor entregado por backend.

Los pesos de la línea base no deben cambiarse después de su aprobación sin una nueva versión autorizada.

---

## 7.14 Curva planeada contra curva real

La pantalla de reportes debe poder visualizar:

* Avance planeado acumulado.
* Avance real aprobado acumulado.
* Variación por periodo.
* Tendencia.
* Fecha estimada de término.

Filtros:

* Proyecto.
* Rango de fechas.
* Ubicación.
* WBS.
* Responsable.
* Contratista.
* Versión del cronograma.

Cuando no exista información suficiente, debe mostrarse un estado vacío explicativo y no una gráfica en cero.

---

## 7.15 Reportes

Reportes iniciales:

* Reporte diario.
* Reporte semanal.
* Reporte ejecutivo.
* Reporte de actividades atrasadas.
* Reporte de incidencias.
* Reporte de evidencia.
* Reporte por contratista.
* Reporte por ubicación.

Acciones:

* Visualizar.
* Filtrar.
* Generar.
* Descargar.
* Compartir.
* Consultar historial.
* Regenerar cuando cambien los datos.

Un reporte debe indicar:

* Fecha de generación.
* Periodo.
* Proyecto.
* Versión de datos utilizada.
* Usuario que lo generó.
* Estado: borrador, publicado o sustituido.

---

# 8. Funcionalidades con inteligencia artificial

La IA debe asistir al usuario, no reemplazar la aprobación humana.

## 8.1 Nota de voz a reporte

El usuario graba una nota de voz.

La plataforma puede:

* Transcribirla.
* Extraer actividades mencionadas.
* Detectar posibles bloqueos.
* Generar un borrador de comentario.
* Proponer una bitácora.

El contenido generado debe presentarse como borrador editable.

El usuario debe confirmar antes de enviarlo.

---

## 8.2 Generación de bitácora

A partir de:

* Avances.
* Fotografías.
* Audios.
* Incidencias.
* Clima.
* Actividades ejecutadas.

La IA puede generar:

* Resumen del día.
* Actividades realizadas.
* Personal y frentes activos.
* Bloqueos.
* Pendientes.
* Riesgos.

Debe mostrarse claramente que el contenido fue generado automáticamente y requiere revisión.

---

## 8.3 Reporte ejecutivo

La IA puede convertir la información operativa en un resumen para dirección:

* Qué avanzó.
* Qué se atrasó.
* Qué está bloqueado.
* Qué requiere aprobación.
* Qué riesgo puede afectar fecha o costo.
* Qué decisiones se necesitan.

No debe inventar fechas, porcentajes, costos ni responsables.

Cada afirmación debe provenir de información almacenada en el proyecto.

---

## 8.4 Clasificación de evidencia

La IA puede sugerir:

* Actividad relacionada.
* Ubicación.
* Tipo de evidencia.
* Descripción.
* Posible incidencia.

La clasificación debe ser editable antes de guardarse como definitiva.

---

## 8.5 Estados de procesamiento de IA

```ts
type AIProcessingStatus =
  | "idle"
  | "queued"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";
```

La interfaz debe mostrar:

* Estado de procesamiento.
* Posibilidad de reintentar.
* Resultado editable.
* Mensaje de error.
* Fuente de los datos utilizados.

---

# 9. Notificaciones

Eventos sugeridos:

* Actividad asignada.
* Actividad próxima a iniciar.
* Actividad vencida.
* Avance enviado.
* Avance aprobado.
* Avance observado.
* Avance rechazado.
* Incidencia asignada.
* Incidencia crítica.
* Restricción próxima a vencer.
* Reporte disponible.
* Mención en comentario.

Cada notificación debe contener:

```ts
interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
  readAt?: string;
  actionUrl?: string;
  projectId?: string;
}
```

La acción debe dirigir al recurso exacto, no solamente al inicio del proyecto.

---

# 10. Búsqueda y filtros

Las principales listas deben permitir:

* Búsqueda por texto.
* Filtrado por estado.
* Filtrado por responsable.
* Filtrado por ubicación.
* Filtrado por WBS.
* Filtrado por contratista.
* Filtrado por fechas.
* Ordenamiento.
* Paginación.

Los filtros aplicados deben reflejarse en la URL cuando sea posible.

Ejemplo:

```text
/projects/123/issues?status=open&severity=critical&responsible=user-10
```

Esto permite compartir vistas y conservar el estado al recargar.

---

# 11. Estados de interfaz obligatorios

Todas las pantallas deben contemplar:

## Cargando

* Skeletons para listas y tarjetas.
* Indicador de carga para acciones puntuales.
* Evitar bloquear toda la página por una operación secundaria.

## Vacío

Ejemplos:

* No existen proyectos.
* No existen actividades.
* No existen reportes.
* No hay evidencia.
* No hay incidencias abiertas.

El estado vacío debe indicar qué puede hacer el usuario.

## Error

Debe mostrar:

* Mensaje entendible.
* Posibilidad de reintentar.
* Código o identificador de soporte cuando exista.
* Conservación de los datos capturados cuando sea posible.

## Sin permisos

Debe diferenciarse entre:

* Recurso inexistente.
* Recurso no disponible.
* Usuario sin permisos.

## Sin conexión

En formularios móviles debe conservarse temporalmente la información capturada.

No debe prometerse que una operación fue guardada mientras no se haya sincronizado.

---

# 12. Reglas de formularios

Todos los formularios deben:

* Validar campos requeridos.
* Mostrar errores junto al campo.
* Evitar doble envío.
* Advertir cambios sin guardar.
* Conservar datos ante errores del servidor.
* Deshabilitar acciones según permisos y estado.
* Confirmar operaciones destructivas.

Las fechas deben manejarse usando la zona horaria del proyecto.

No deben transformarse automáticamente a la zona horaria local del dispositivo sin indicar el contexto.

---

# 13. Reglas de integración con API

## 13.1 Identificadores

Todos los identificadores deben tratarse como cadenas.

```ts
id: string;
```

No asumir IDs consecutivos ni numéricos.

## 13.2 Fechas

Las fechas y horas deben recibirse en ISO 8601.

```text
2026-07-18T14:30:00-06:00
```

Las fechas sin hora deben mantenerse como:

```text
2026-07-18
```

## 13.3 Cantidades y moneda

No usar números de punto flotante del frontend como fuente contable oficial.

El backend puede enviar:

```ts
{
  amount: "1250000.50",
  currency: "MXN"
}
```

El frontend debe formatear según moneda y configuración regional.

## 13.4 Paginación

Formato conceptual:

```ts
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
```

## 13.5 Errores

Formato esperado:

```ts
interface ApiError {
  code: string;
  message: string;
  fieldErrors?: Record<string, string[]>;
  traceId?: string;
}
```

El frontend debe utilizar `code` para comportamientos específicos y `message` para información al usuario.

## 13.6 Concurrencia

Puede ocurrir que dos usuarios editen un recurso al mismo tiempo.

El backend puede devolver un error de conflicto.

En ese caso debe mostrarse:

* Que el recurso fue actualizado por otra persona.
* La opción de recargar.
* La opción de conservar una copia del contenido capturado.
* La comparación de cambios cuando sea posible.

---

# 14. Auditoría e historial

Los recursos importantes deben contar con historial:

* Proyecto.
* Cronograma.
* Actividad.
* Avance.
* Incidencia.
* Aprobación.
* Reporte.
* Participantes.

Cada evento puede mostrar:

```ts
interface AuditEvent {
  id: string;
  action: string;
  actor: UserSummary;
  createdAt: string;
  description: string;
  changes?: {
    field: string;
    previousValue: unknown;
    newValue: unknown;
  }[];
}
```

Ejemplos:

```text
Juan Pérez cambió el responsable de la actividad.
María López envió un avance de 45 %.
Carlos Ruiz aprobó el avance.
Se creó la versión 2 del cronograma.
La incidencia fue marcada como resuelta.
```

---

# 15. Prioridad móvil

Las siguientes funciones deben diseñarse primero para móvil:

* Mis actividades.
* Registro de avance.
* Captura de fotografías.
* Grabación de audio.
* Registro de incidencias.
* Consulta de observaciones.
* Aprobaciones rápidas.
* Lookahead semanal.

Consideraciones:

* Botones grandes.
* Navegación sencilla.
* Formularios cortos.
* Acciones principales accesibles con una mano.
* Compresión de imágenes.
* Reintento de cargas.
* Guardado temporal.
* Indicadores claros de sincronización.

El residente no debería necesitar recorrer cinco pantallas para reportar una actividad.

---

# 16. Componentes reutilizables sugeridos

* `ProjectSelector`
* `ProjectStatusBadge`
* `ProgressBar`
* `ProgressComparison`
* `VarianceBadge`
* `LocationTree`
* `WBSTree`
* `ActivitySelector`
* `ActivityStatusBadge`
* `ScheduleVersionSelector`
* `GanttView`
* `EvidenceUploader`
* `EvidenceGallery`
* `AudioRecorder`
* `IssueCard`
* `IssueSeverityBadge`
* `ApprovalPanel`
* `AuditTimeline`
* `UserAvatarGroup`
* `PermissionGate`
* `EmptyState`
* `ErrorState`
* `SyncStatus`
* `AIProcessingIndicator`

Ejemplo de control por permisos:

```tsx
<PermissionGate permission="progress.approve">
  <ApproveProgressButton />
</PermissionGate>
```

---

# 17. Criterios de aceptación del MVP

El MVP se considera funcional cuando permite completar el siguiente flujo:

1. Un administrador crea un proyecto.
2. Configura participantes, ubicaciones y WBS.
3. Crea o importa actividades.
4. Aprueba una línea base.
5. Asigna actividades a responsables.
6. Un residente consulta sus actividades desde móvil.
7. El residente reporta avance con fotografías y comentarios.
8. El reporte queda pendiente de aprobación.
9. Un supervisor revisa la evidencia.
10. El supervisor aprueba, observa o rechaza.
11. El avance aprobado actualiza los indicadores oficiales.
12. Una actividad bloqueada genera una incidencia.
13. La incidencia aparece en el dashboard.
14. El sistema compara avance planeado contra avance real.
15. Se genera un reporte semanal.
16. La IA puede generar un borrador narrativo del reporte.
17. El usuario revisa y publica el reporte.
18. Todo el proceso queda registrado en el historial.

---

# 18. Orden de implementación recomendado

## Fase 1. Fundamentos

* Autenticación.
* Organizaciones.
* Proyectos.
* Participantes.
* Permisos.
* Ubicaciones.
* WBS.

## Fase 2. Cronograma

* Actividades.
* Fechas.
* Responsables.
* Dependencias básicas.
* Versiones.
* Línea base.
* Tabla y Gantt.

## Fase 3. Ejecución

* Mis actividades.
* Registro de avance.
* Evidencia.
* Reportes de avance.
* Aprobaciones.

## Fase 4. Control

* Incidencias.
* Lookahead.
* Dashboard.
* Curva planeada contra real.
* Alertas.

## Fase 5. Inteligencia artificial

* Transcripción de audio.
* Borrador de bitácora.
* Resumen semanal.
* Clasificación asistida de evidencia.
* Alertas de riesgo basadas en datos estructurados.

---

# 19. Decisión de producto principal

La plataforma no debe venderse ni diseñarse como un sistema que “tiene un Gantt”.

El valor central debe reflejarse en cada actividad:

```text
Actividad planeada
+ responsable
+ ubicación
+ avance aprobado
+ evidencia
+ bloqueo
+ impacto en fecha
```

El objetivo de la interfaz es convertir información dispersa de campo en información confiable para tomar decisiones.

La experiencia debe reducir el uso de:

* Fotografías sueltas.
* Mensajes perdidos en WhatsApp.
* Reportes armados manualmente.
* Hojas de cálculo desconectadas.
* Aprobaciones informales.
* Cronogramas que nadie actualiza.
