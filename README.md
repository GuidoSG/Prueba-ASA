# Solutions Engineer Challenge

¡Hola! 👋

Gracias por tomarte el tiempo de realizar este desafío.

La idea de este ejercicio es que puedas enfrentarte a una situación similar a la que podrías encontrar trabajando en proyectos reales: evaluar la situación, crear un lineamiento de trabajo, corregir problemas y dejar una solución andando.

No buscamos una solución perfecta. Nos interesa ver cómo resuelves este tipo de desafíos, cómo ordenas los problemas y cómo tomas decisiones técnicas.

Sin más introducción, el desafío.

---

## Contexto

Este proyecto corresponde a una landing page de una empresa ficticia llamada **Callenge Insight**.

Callenge Insight es una consultora enfocada en datos, automatización e inteligencia artificial aplicada. Su propuesta es ayudar a empresas a tomar mejores decisiones, automatizar procesos manuales y construir soluciones digitales basadas en información.

---

## Objetivo del desafío

Tu objetivo es tomar este proyecto y dejarlo funcionando de forma correcta, consistente y profesional.

En términos simples, esperamos que puedas:

- Levantar el proyecto localmente,
- Identificar y resolver problemas técnicos,
- Mejoras que creas pertinente,
- Y explicar brevemente las decisiones que tomaste.

---

## Stack del proyecto

El proyecto está construido con:

- React + Vite.
- TypeScript.
- Lectura y procesamiento de datos desde un archivo Excel local.
- Ejecución local mediante npm.

---

## Estructura del proyecto

```
candidate_challenge/
├── public/
│   └── data/
│       └── clientes_andes_insight.xlsx
├── src/
│   ├── assets/
│   │   ├── logo_challenge.PNG
│   │   └── santiago.JPG
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Metrics.tsx
│   │   ├── Pitch.tsx
│   │   └── Footer.tsx
│   ├── utils/
│   │   └── excelReader.ts
│   ├── App.tsx
│   ├── config.ts
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

| Archivo / Carpeta | Descripción |
|---|---|
| `public/data/clientes_andes_insight.xlsx` | Base de datos de clientes en formato Excel. Contiene campos de id, nombre, edad e ingreso. |
| `src/assets/` | Recursos estáticos importados directamente en componentes (logo e imagen principal). |
| `src/components/Navbar.tsx` | Barra de navegación superior con logo y links de sección. |
| `src/components/Hero.tsx` | Sección principal con imagen de fondo, título y llamada a la acción. |
| `src/components/Services.tsx` | Grilla de tarjetas con los servicios de la empresa. |
| `src/components/Metrics.tsx` | Sección de métricas calculadas dinámicamente desde el Excel. |
| `src/components/Pitch.tsx` | Sección comercial con propuesta de valor y estadísticas clave. |
| `src/components/Footer.tsx` | Pie de página con links y datos de la empresa. |
| `src/utils/excelReader.ts` | Función que lee el archivo Excel y calcula las métricas para la UI. |
| `src/App.tsx` | Componente raíz que compone todos los bloques de la página. |
| `src/config.ts` | Módulo de configuración de la aplicación. |
| `src/index.css` | Estilos globales y variables CSS de la aplicación. |
| `src/main.tsx` | Punto de entrada de React. Monta la app en el DOM. |
| `src/vite-env.d.ts` | Declaraciones de tipos para el entorno Vite. |
| `.env.example` | Ejemplo de variables de entorno necesarias para correr la app. |
| `.gitignore` | Lista de archivos y carpetas que Git debe ignorar (dependencias, builds, env). |
| `index.html` | HTML base de la aplicación. Vite inyecta el bundle aquí. |
| `package.json` | Dependencias del proyecto y scripts disponibles (`dev`, `build`, `preview`). |
| `package-lock.json` | Versiones exactas de cada dependencia instalada. Generado automáticamente. |
| `tsconfig.json` | Configuración del compilador TypeScript para los archivos de `src/`. |
| `tsconfig.node.json` | Configuración TypeScript específica para archivos de Vite (como `vite.config.ts`). |
| `vite.config.ts` | Configuración de Vite: plugins, puerto del servidor y opciones de build. |

---

## Instrucciones para correr el proyecto

### 1. Clonar el repositorio

```
git clone <URL_REPOSITORIO>
cd <NOMBRE_REPOSITORIO>
```

### 2. Instalar dependencias

```
npm install
```

### 3. Ejecutar la aplicación

```
npm run dev
```

La aplicación debería correr en:

```
http://localhost:4173
```

## Entregable

La idea es que nos compartas el resultado como repositorio GitHub, además, agrega un archivo llamado: SOLUTION_NOTES (puede ser .md o .pdf). En ese archivo cuéntanos la manera en que trabajaste y ordenaste las ideas, los problemas hallados y sus soluciones si lo ameritan, supuestos usados etc. La idea es reflejar tu razonamiento.

Consideraciones:
- Puedes usar documentación, internet o herramientas de apoyo.
- Puedes usar IA si lo consideras útil.
- No es necesario rehacer todo desde cero.
- No buscamos perfección visual, pero sí criterio.
- Si algo no alcanzas a resolver, explícalo en tus notas.

Sugerimos dedicar un tiempo razonable que no sobrecargue tu día.

¡Éxito!

Equipo Andes SpA.

