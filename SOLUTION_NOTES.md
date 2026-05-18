# SOLUTION NOTES — Candidate Challenge
**Proyecto:** Landing page Challenge Insight  
**Stack:** React + TypeScript + Vite  
**Autor:** Guido Serrano  
**Fecha:** Mayo 2026

---

## Cómo encaré el proyecto

Al recibir el repositorio, lo primero fue leer el README completo antes de tocar cualquier archivo. Entender qué se esperaba del proyecto, qué stack usaba y qué datos manejaba. Solo después levanté el entorno para observar el comportamiento real de la app.

El orden de trabajo fue siempre el mismo: entender el problema → identificar la causa → evaluar opciones → decidir → aplicar → documentar.

Los problemas los abordé en este orden de prioridad:
1. Primero lo que impedía que la app funcionara (errores bloqueantes)
2. Luego lo que afectaba la correctitud de los datos (bugs lógicos)
3. Finalmente lo visual y la experiencia de usuario (mejoras)

---

## Cómo sabemos dónde buscar

Para no explicar en cada solución por qué buscamos en determinado lugar, este esquema sirve de referencia:

**`src/`** — todo lo que es código. Componentes, lógica, estilos, utilidades. Si algo no funciona visualmente o en la lógica de la app, la respuesta está acá.

**`public/data/`** — archivos estáticos que la app consume en tiempo de ejecución. El Excel vive acá porque el navegador necesita descargarlo mientras la app corre — no es código, es un dato externo.

**Archivos en la raíz** (`index.html`, `package.json`, `.env`, `vite.config.ts`) — configuración base del proyecto. No son parte de la app en sí, sino las instrucciones de cómo construirla y correrla.

Dentro de `src/`, muchos cambios terminan en `index.css` porque define las variables CSS globales (`:root`) que heredan todos los componentes. Si un problema visual afecta múltiples elementos al mismo tiempo, casi siempre la causa está ahí.

Al evaluar los distintos bugs, se buscó en diferentes partes según la naturaleza de cada problema. Un hallazgo relevante: la consola del navegador no mostraba ningún error — lo que indica que el TypeScript estaba bien escrito. Los bugs eran intencionales a nivel de valores (colores incorrectos, datos sin validar, rutas rotas), no de estructura de código.

---

## Bugs encontrados y resueltos

### Bug #1 — Error 401: Unauthorized

Al levantar el proyecto, la app mostraba una pantalla de error en lugar de la landing page. El mensaje decía "Invalid or missing access token".

El primer paso fue entender qué validaba ese error antes de buscar dónde. Al ver que mencionaba un token de acceso, el lugar lógico era `src/config.ts` — el archivo de configuración donde típicamente se centralizan validaciones de este tipo. Ahí se encontró el valor esperado del token hardcodeado en la función `validateAccess()`.

La solución fue crear el archivo `.env` (que el repositorio no incluye por convención — solo existe el `.env.example` como referencia) con el valor correcto.

---

### Bugs #2, #3 y #4 — Problemas visuales generalizados

Al cargar la página, múltiples elementos mostraban amarillo intenso: el Navbar, el Footer, el overlay del Hero y los bordes de tarjetas. Los links del Navbar aparecían apilados verticalmente.

El primer instinto podría ser revisar cada componente por separado. Sin embargo, cuando un problema visual afecta múltiples componentes al mismo tiempo, es poco probable que cada uno tenga un error independiente — apunta a una causa común. Buscamos en `index.css` porque ahí se definen las variables CSS (`:root`) que heredan todos los elementos. Si una variable está mal, se rompe todo al mismo tiempo, exactamente lo que observamos.

**Causa:** la variable `--primary` estaba definida como `#ffd700` (amarillo) y se usaba en prácticamente todo. El Navbar usaba `display: block` en lugar de `display: flex`.

**Solución:** se reescribió la paleta completa usando azul oscuro marino como color primario. Los componentes del Navbar se dispusieron horizontalmente corrigiendo `display: block` a `display: flex`.

---

### Bug #5 — Edad promedio incorrecta (73 años)

La sección de métricas mostraba 73 años como edad promedio — inconsistente con una consultora enfocada en startups y emprendedores jóvenes.

Al revisar el Excel se encontró que 14 de 23 registros (60%) tenían edad `99` — un valor centinela usado cuando el dato real no estaba disponible. El código los incluía en el cálculo sin filtrarlos.

**¿Eliminar o imputar?** Esta fue la decisión más importante del proyecto desde el punto de vista de análisis de datos. Se evaluaron cuatro enfoques:

| Enfoque | Por qué se descartó |
|---|---|
| Eliminar registros inválidos | Elimina el 60% del dataset — pérdida de representatividad inaceptable |
| Imputar con la media | Sensible a outliers; en datasets pequeños un valor extremo contamina todos los reemplazos |
| Imputar con la mediana | Robusta ante extremos — **elegida** |
| Modelos complejos (KNN, regresión) | Solo 2 variables numéricas y 9 registros válidos — insuficiente para un modelo confiable |

Se calculó la mediana de los 9 registros válidos y se reemplazaron los valores `99` con ella, manteniendo los 23 registros. La edad promedio pasó de 73 a 32.5 años.

---

### Bug #6 — Favicon ausente

La pestaña del navegador no mostraba el ícono de la empresa. El `index.html` apuntaba a `/logo.png` en `public/`, pero el archivo real se llamaba `logo_challenge.PNG` y estaba en `src/assets/`.

Los archivos en `src/assets/` son procesados por Vite y reciben un hash en su nombre — el `index.html` no puede referenciarlos directamente. Los archivos en `public/` se sirven tal cual desde la raíz. Se copió el logo a `public/` y se corrigió la referencia.

---

## Mejoras aplicadas

### Concepto visual — identidad futurista

La versión original usaba amarillo como color primario en toda la interfaz, lo que generaba una estética inconsistente con el producto que vende la consultora: datos, automatización e inteligencia artificial. Una empresa de este rubro proyecta confianza, tecnología y precisión — no calidez ni energía festiva.

Se tomó la decisión de rediseñar la identidad visual completa bajo un concepto más futurista y coherente con el negocio. Esto implicó:

- **Paleta:** se evaluaron tres opciones antes de decidir. Se eligió azul pizarra oscuro (`#0f1c2e`) como base — evoca profundidad, datos y noche de servidores — con verde menta (`#00e676`) como acento, asociado a crecimiento y outputs positivos. La combinación se diferencia de competidores que usan azul + naranja.
- **Hero:** fondo con fotografía nocturna de Santiago, overlay oscuro sutil y texto centrado entre los edificios. Los botones se rediseñaron en blanco y borde semitransparente para no competir visualmente con la imagen.
- **Sección Servicios:** cada servicio ocupa la pantalla completa con una imagen de fondo real y un cuadro con efecto glassmorphism (`backdrop-filter: blur`) para el contenido — estética asociada a interfaces de productos tech modernos.
- **Métricas:** fondo oscuro con números que cuentan desde cero al entrar al viewport, separados por líneas verticales sutiles. El movimiento refuerza la idea de datos en tiempo real.
- **"¿Por qué nosotros?":** tarjetas con fondo semitransparente y animación de entrada escalonada. La sección de stats (Startups, 2-4 semanas, 100% remoto) se rediseñó como tarjetas con deslizamiento al aparecer.
- **Footer:** se agregó un formulario de contacto funcional con campos de nombre, email y mensaje, además de email y teléfono de contacto — para que el CTA "Habla con nuestro equipo" tuviera un destino real.
- **Navbar sticky:** permanece visible durante el scroll, manteniendo la marca presente en todo momento.
- **Separadores:** líneas verdes entre secciones clave para dar estructura y ritmo visual a la página.

---

### Sección Servicios — evaluación de enfoques

Se evaluaron dos enfoques antes de llegar a la solución final:

**Enfoque A — Scroll reveal:** cards que aparecen con animación al entrar al viewport. Simple pero estático una vez cargado.

**Enfoque B — Tabs con animación fade:** pestañas interactivas con imagen y descripción. Más contenido visible pero requiere clicks activos del usuario.

**Decisión final — Sticky scroll sections:** cada servicio ocupa la pantalla completa y se reemplaza al scrollear, con `position: sticky` y transiciones suaves. Se eligió porque no requiere clicks, es más memorable y transmite una imagen más premium.

---

### Métricas con animación de conteo

Se rediseñó la sección con números que cuentan desde 0 al entrar al viewport. Requirió tres iteraciones:

- **Intento #1:** estado `started` compartido — se reseteaba en cada recarga porque `useState` no persiste entre cargas.
- **Intento #2:** observer desconectado tras primera activación — no resolvía la sincronización con la carga asíncrona del Excel.
- **Solución final:** cada `MetricItem` maneja su propio `IntersectionObserver` y una bandera con `useRef`. A diferencia de `useState`, `useRef` persiste entre re-renders sin causarlos — garantizando que la animación corra exactamente una vez cuando el elemento es visible y los datos ya están cargados.

---

## Qué haría con más tiempo

- **Responsividad:** la página no está optimizada para móvil. Se agregarían media queries para adaptar el layout en pantallas pequeñas — métricas en grilla 2x2, footer en columna, navbar colapsable.
- **Formulario de contacto funcional:** actualmente no envía nada. Se conectaría a un servicio como EmailJS o un backend propio.
- **Datos reales:** con solo 23 registros y el 60% con valores inválidos, las métricas son orientativas. Con datos reales el análisis sería más robusto y se podrían agregar más indicadores.
- **Animaciones más refinadas:** las transiciones entre servicios y secciones podrían mejorarse con Framer Motion para mayor fluidez y control.

---

## Correcciones menores

### Footer — servicio Dashboards faltante

Al revisar el Footer se detectó que la sección de Servicios listaba solo tres de los cuatro servicios de la empresa — faltaba Dashboards. Se agregó el link correspondiente.

### Ícono de "¿Por qué nosotros?" — adaptación a nueva paleta

El ícono de reloj de la tarjeta "Velocidad" era un emoji (⏱) que no tomaba color CSS, por lo que al cambiar la paleta seguía viéndose con los colores originales del sistema operativo, desentonando con la nueva estética. Se reemplazó por un SVG personalizado con colores adaptados a la paleta — azul oscuro para las manecillas y verde menta para el centro — logrando coherencia visual con el resto de la interfaz.
