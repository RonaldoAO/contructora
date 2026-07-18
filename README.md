# Constructora CRM

Frontend React + TypeScript para una plataforma de control y seguimiento de obra. El proyecto incluye dashboards comerciales, pipeline de deals y una vista operativa de avance de obra con timeline, evidencias y presupuesto.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Recharts
- Lucide React

## Instalacion

```bash
npm install
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

Servidor local recomendado:

```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

## Estructura principal

```text
src/
  components/
    layout/        Shell, sidebar, topbar y selector de proyecto
    ui/            Componentes genericos reutilizables
    work/          Componentes reutilizables del dominio de obra
    leads/         Avance de obra, timeline y presupuesto
    pipeline/      Deals pipeline y cards
    properties/    Dashboard de propiedades
  data/            Datos mock tipados
  styles/          Tailwind y CSS legacy/global
  types/           Tipos compartidos
```

## Vistas disponibles

- `Properties`: dashboard de propiedades con KPIs, graficas y anuncios activos.
- `Deals`: pipeline kanban con tarjetas reutilizables.
- `Leads`: control de avance de obra con timeline tipo Jira, agrupacion por ubicacion, avance planeado/real/aprobado/reportado, evidencias y presupuesto.

La navegacion actual es interna con estado de React. El sidebar cambia entre vistas sin router.

## Proyecto activo

El selector de proyecto vive en el header superior, como selector global de contexto. Actualmente incluye:

- Proyecto Torre Ambar
- Proyecto Plaza Norte
- Proyecto Costa Azul

La vista `Leads` filtra actividades por el proyecto seleccionado. La jerarquia del eje Y no muestra el proyecto porque ya esta seleccionado globalmente.

## Componentes reutilizables importantes

- `Button`
- `IconButton`
- `AvatarStack`
- `Badge`
- `EmptyState`
- `EvidenceUploader`
- `ProgressComparison`
- `ActivityStatusBadge`
- `ReviewStatusBadge`

Para nuevas funcionalidades, preferir crear componentes pequenos y reutilizables antes de agregar logica visual directamente en una pantalla.

## Convenciones de UI

- Mantener consistencia con el sistema visual actual: bordes sutiles, radios pequenos, alta densidad de informacion y colores funcionales.
- Priorizar experiencia movil para captura de avance y evidencia.
- Nuevos componentes deben usar Tailwind para evitar seguir creciendo `global.css`.
- `global.css` conserva estilos legacy de las primeras pantallas; migrarlo gradualmente cuando se toque cada modulo.

## Notas funcionales

La fuente oficial de datos debe ser el backend. El frontend solo previsualiza calculos como variaciones, porcentajes y estados.

El avance no debe sobrescribirse directamente. En una integracion real, cada reporte de avance debe generar un registro auditable con estado de revision.

La evidencia debe modelarse con estados de procesamiento:

- pendiente
- subiendo
- procesando
- disponible
- error

El flujo real esperado es solicitar URL firmada, subir al almacenamiento, confirmar al backend y actualizar el estado de procesamiento.

## Validacion

Antes de entregar cambios ejecutar:

```bash
npm run build
```

Puede aparecer un warning de bundle grande por `recharts`. No impide compilar, pero cuando el proyecto crezca conviene aplicar code splitting por vista.