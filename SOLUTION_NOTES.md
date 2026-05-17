# SOLUTION NOTES — Candidate Challenge
**Proyecto:** Landing page Callenge Insight  
**Stack:** React + TypeScript + Vite  
**Autor:** [Tu nombre]  
**Fecha:** Mayo 2026

---

## 1. Metodología de trabajo

Al recibir el proyecto, el primer paso fue leer el README completo para entender el contexto, el stack y los objetivos del desafío. Luego procedí a levantar el proyecto localmente para observar el comportamiento real antes de revisar el código.

El orden de trabajo fue:
1. Leer documentación del proyecto
2. Instalar dependencias y levantar el entorno
3. Identificar errores visibles en el navegador
4. Revisar el código fuente para entender las causas
5. Aplicar correcciones
6. Evaluar mejoras posibles

---

## 2. Instalación del entorno

### Requisitos previos
- Node.js (versión LTS recomendada)
- Git

### Pasos ejecutados
```bash
git clone https://github.com/IvanRenatoC/candidate_challenge.git
cd candidate_challenge
npm install
npm run dev
```

La aplicación quedó disponible en `http://localhost:4173/`

### Resultado de `npm install`
La instalación fue exitosa (77 paquetes instalados). Se registraron 3 vulnerabilidades menores en dependencias de desarrollo, no críticas para el funcionamiento del proyecto.

---

## 3. Problemas encontrados y soluciones

### Bug #1 — Error 401: Unauthorized / Missing access token

**Descripción:**  
Al levantar el proyecto, la aplicación mostraba una pantalla de error con el mensaje:  
`"401: Unauthorized. Invalid or missing access token. Check your environment configuration."`

**Causa:**  
El proyecto requiere variables de entorno definidas en un archivo `.env`. El repositorio incluye un archivo `.env.example` como referencia, pero el archivo `.env` real no estaba creado (es ignorado por `.gitignore` intencionalmente, ya que puede contener datos sensibles).

**Solución:**  
1. Localizar el archivo `.env.example` en la raíz del proyecto
2. Duplicarlo y renombrar la copia como `.env`
3. Completar los valores requeridos según lo que indica el `.env.example`

**Solución aplicada:**  
Se revisó el archivo `src/config.ts` y se encontró el valor esperado del token (`challenge-access-2024`) hardcodeado en la función `validateAccess()`. Se creó el `.env` con ese valor y el error se resolvió.

**Aprendizaje:**  
Este es un patrón estándar en proyectos reales. El `.env.example` actúa como documentación de qué variables necesita la app, sin exponer valores sensibles en el repositorio.

---

### ¿Cómo se sabría el valor del token en un proyecto real?

En un proyecto real, el token **no estaría hardcodeado** en el código fuente — eso sería una mala práctica de seguridad. El valor llegaría por alguna de estas vías:

- Lo entrega el equipo de forma segura (Slack privado, gestor de secretos, etc.)
- Está almacenado en un sistema como AWS Secrets Manager, HashiCorp Vault o similar
- Lo genera el propio desarrollador siguiendo una convención documentada

En este desafío, el valor estaba visible en `config.ts` de forma intencional, para que el candidato lo encuentre. En producción, eso nunca debería ocurrir.

---

### ¿Por qué buscar la respuesta en la carpeta `src/`?

Porque `src/` es donde vive todo el código fuente de la aplicación. Es una convención universal en proyectos frontend. Dentro de `src/`, el archivo `config.ts` es el lugar lógico donde un desarrollador centraliza configuraciones y validaciones — su nombre mismo lo indica. Al ver que el error mencionaba un "access token", el paso natural fue revisar cómo el proyecto valida ese token, y `config.ts` era el candidato más obvio.

---

### Bug #2 — CSS: paleta de colores incorrecta (amarillo dominante)

**Descripción:**  
Al cargar la página, el Navbar, el Footer, los bordes de tarjetas, el overlay del Hero y el fondo general mostraban un amarillo intenso (`#ffd700`) que hacía la página visualmente inconsistente e improfesional para una consultora de datos.

**Causa:**  
En `src/index.css`, la variable `--primary` estaba definida como amarillo (`#ffd700`), y ese color se usaba en prácticamente todos los elementos visuales: fondo del Navbar, fondo del Footer, bordes de tarjetas, overlay del Hero y fondos de sección. Además, el layout del Navbar usaba `display: block` en lugar de `display: flex`, lo que causaba que los links aparecieran apilados verticalmente.

**¿Por qué buscamos el problema aquí?**  
Al ver que el problema era puramente visual y afectaba a múltiples componentes al mismo tiempo, lo más lógico era buscar en los estilos globales antes que en cada componente por separado. En proyectos React, `index.css` es el archivo que define las variables CSS (`:root`) que se usan en toda la app. Si un color está mal en ese archivo, se rompe todo al mismo tiempo — exactamente lo que observamos.

**Solución aplicada:**  
Se reescribió el archivo `src/index.css` completo. Los cambios principales fueron:

**Navbar — links apilados verticalmente:**  
La clase `.navbar` usaba `display: block` en lugar de `display: flex`, lo que hacía que el logo y los links aparecieran uno debajo del otro. Se corrigió a `display: flex` con `justify-content: space-between` para que el logo quede a la izquierda y los links a la derecha en una sola línea horizontal.
- `--primary` cambió de `#ffd700` (amarillo) a `#1a1f2e` (azul oscuro marino) — este color ahora se usa en Navbar, Footer y sección de Métricas, dándole coherencia visual profesional
- Se agregó `--accent: #4f8ef7` (azul claro) para íconos de servicios, reemplazando el amarillo
- `--bg` y `--bg-card` pasaron a blancos/grises neutros en lugar de amarillos cálidos
- Se agregó `--text-light: #ffffff` para texto sobre fondos oscuros

---

### Bug #3 — Hero con overlay amarillo muy intenso

**Descripción:**  
La imagen de fondo de Santiago aparecía completamente teñida de amarillo, haciendo imposible apreciar la foto.

**Causa:**  
La clase `.hero-overlay` tenía `background: rgba(255, 215, 0, 0.65)` — es decir, amarillo al 65% de opacidad cubriendo toda la imagen.

**Solución aplicada:**  
Se cambió a `background: rgba(15, 20, 40, 0.55)` — un azul oscuro semitransparente que oscurece la imagen sutilmente sin destruirla, permitiendo leer el texto encima con claridad y manteniendo coherencia con la paleta general.

---

### Bug #4 — Bordes amarillos en tarjetas de Servicios y Pitch

**Descripción:**  
Las tarjetas de la sección Servicios y los elementos de Pitch tenían bordes amarillos gruesos (`border: 2px solid var(--primary)`) que se veían fuera de lugar.

**Causa:**  
Al usar `--primary` como color de borde y ese valor ser amarillo, todos los bordes heredaban ese color.

**Solución aplicada:**  
Se cambió el borde de las tarjetas a `1px solid #e0e4ef` — un gris azulado suave, estándar en interfaces profesionales. Además se agregó una sombra sutil (`box-shadow: 0 2px 8px rgba(0,0,0,0.06)`) que reemplaza la función visual del borde sin llamar la atención innecesariamente.

---

---

## 4. Mejoras estéticas aplicadas

### Mejora #1 — Footer: columnas en horizontal

**Descripción:**  
Las columnas "Servicios" y "Empresa" del Footer aparecían apiladas verticalmente, desperdiciando espacio horizontal y luciendo poco profesional.

**Causa:**  
La clase `.footer-links` en `index.css` usaba `display: block` por defecto.

**Solución aplicada:**  
Se cambió `.footer-links` a `display: flex` con `gap: 48px`. No fue necesario modificar el componente `Footer.tsx` — el problema era puramente de CSS.

**Criterio detrás de la decisión:**  
En un footer estándar, las columnas de links se muestran horizontalmente. Es una convención de diseño web ampliamente adoptada que mejora la legibilidad y el uso del espacio disponible.

### Mejora #2 — Navbar sticky (fijo al hacer scroll)

**Descripción:**  
El navbar desaparecía al hacer scroll hacia abajo, obligando al usuario a volver arriba para navegar.

**Inspiración:**  
Observado en sungrowpower.com, donde el header permanece visible durante todo el scroll.

**Solución aplicada:**  
Se agregaron tres propiedades a `.navbar` en `index.css`:
- `position: sticky` — hace que el elemento se "pegue" al viewport al llegar a su posición
- `top: 0` — se fija en la parte superior de la pantalla
- `z-index: 100` — asegura que quede por encima de todos los demás elementos al scrollear

No fue necesario tocar ningún componente `.tsx`.

---

### Mejora #3 — Sección Servicios con tabs interactivos

**Descripción:**  
La sección de servicios originalmente mostraba todas las tarjetas apiladas verticalmente. Se rediseñó como un componente con pestañas interactivas: el usuario clickea un servicio y ve su imagen y descripción destacada.

**Inspiración:**  
Observado en sungrowpower.com, en la sección de soluciones residenciales donde las opciones se despliegan al seleccionarlas.

**Cambios técnicos:**
- Se agregó `useState` de React para manejar qué pestaña está activa
- Se incorporó una imagen representativa por servicio (desde Unsplash)
- El componente `Services.tsx` fue reescrito para usar el nuevo layout
- Se agregaron los estilos `.services-tabs`, `.services-tab-btn`, `.services-tab-content` al `index.css`

**Criterio detrás de la decisión:**  
Muestra más información de cada servicio sin abrumar visualmente. El usuario interactúa activamente con el contenido, lo que mejora la experiencia y el tiempo en pantalla.

---

### Mejora #2 — Navbar sticky (fijo al hacer scroll)

**Descripción:**  
El navbar desaparecía al hacer scroll hacia abajo, obligando al usuario a volver arriba para navegar.

**Inspiración:**  
Observado en sungrowpower.com, donde el header permanece visible durante todo el scroll.

**Solución aplicada:**  
Se agregaron tres propiedades a `.navbar` en `index.css`:
- `position: sticky` — hace que el elemento se "pegue" al viewport al llegar a su posición
- `top: 0` — se fija en la parte superior de la pantalla
- `z-index: 100` — asegura que quede por encima de todos los demás elementos al scrollear

No fue necesario tocar ningún componente `.tsx`.

---

### Mejora #3 — Sección Servicios: evaluación de dos enfoques y decisión final

Al rediseñar la sección de servicios se evaluaron dos enfoques distintos antes de tomar una decisión final. El criterio fue priorizar la experiencia visual del usuario y la coherencia con el tipo de empresa que representa el proyecto.

**Enfoque A evaluado — Scroll Reveal (estilo MAS Analytics)**  
Cards individuales que aparecen con animación al entrar al viewport usando `IntersectionObserver`. Simple, limpio y familiar para el usuario.

**Enfoque B evaluado — Tabs con animación fade (estilo Sungrow)**  
Pestañas interactivas donde al clickear un servicio el contenido (imagen + descripción) aparece con transición de fade + slide. Muestra más información por servicio.

**Decisión final — Sticky Scroll Sections**  
Tras evaluar ambos enfoques visualmente, se optó por una tercera solución más impactante: cada servicio ocupa la pantalla completa y se reemplaza a medida que el usuario scrollea, con el contenido fijo (`position: sticky`) y transiciones suaves de color de fondo, ícono y texto.

**¿Por qué esta decisión?**  
- Es más memorable visualmente que una lista de cards
- No requiere clicks — el scroll es la interacción más natural
- Transmite una imagen más premium, coherente con una consultora de datos e IA
- Los enfoques A y B quedaban estáticos una vez cargados; este mantiene al usuario activo durante todo el recorrido por los servicios

**Cambios técnicos:**
- Se creó `src/components/ServicesScroll.tsx` con lógica de scroll usando `useRef`, `useState` y un event listener en `window.scroll`
- El componente calcula el progreso del scroll dentro de la sección y determina qué servicio mostrar con `Math.floor`
- La sección tiene altura de `4 × 100vh` para dar espacio a cada servicio
- El contenido interior usa `position: sticky; top: 0` para mantenerse fijo mientras el scroll avanza
- Se agregaron indicadores de progreso (dots) que se expanden al estar activos
- En `App.tsx` se reemplazó `<Services />` por `<ServicesScroll />`

---

## 6. Bug #5 — Edad promedio incorrecta en Métricas (73 años)

**Descripción:**  
La sección de métricas mostraba una edad promedio de 73 años para los clientes de la consultora, lo cual era inconsistente con el perfil declarado de la empresa (startups, emprendedores, nueva economía).

**Investigación:**  
Se descargó y analizó el archivo `public/data/clientes_andes_insight.xlsx`. Al revisar los datos fila por fila se encontró que 14 de los 23 registros tenían edad `99` — un valor placeholder utilizado típicamente cuando el dato real no está disponible. El código en `excelReader.ts` los incluía todos en el cálculo sin filtrarlos, elevando artificialmente el promedio.

Distribución de edades en el archivo:
- 9 registros con edades reales (26–40 años)
- 14 registros con edad `99` (valor inválido)

**Causa raíz:**  
El archivo Excel contiene datos incompletos con un valor centinela (`99`) para registros sin edad real. La función `calculateMetrics()` no validaba ni filtraba estos valores antes de calcular el promedio.

**Contexto del dataset:**  
Con solo 23 registros totales, cualquier decisión estadística es frágil. Un promedio calculado con 9 datos puede variar 5-10 años con solo agregar o quitar un registro. Por esto, los resultados deben interpretarse como orientativos de esta muestra, no como valores generalizables. Esta limitación está documentada conscientemente.

**Enfoques evaluados:**  
Se consideraron cuatro estrategias para tratar los valores inválidos:

1. **Eliminar los registros (listwise deletion)** — nos dejaría con solo 9 de 23 registros (60% eliminado). En estadística, eliminar más del 20-30% de los datos compromete la representatividad del análisis. El promedio resultante describiría únicamente a los 9 clientes con datos completos, no a la cartera real. Descartado por distorsión excesiva.

2. **Imputar con la media** — calcular el promedio de los 9 válidos y asignarlo a los 14 inválidos. El problema es que la media es sensible a valores extremos (outliers). En datasets pequeños, un solo registro atípico puede desplazar la media varios años y contaminar todos los reemplazos. Descartado por menor robustez.

3. **Imputar con la mediana** — el valor del medio al ordenar los datos. No se ve afectada por extremos: si hay un cliente de 70 años entre los válidos, la mediana no se mueve significativamente. Más robusta que la media en datasets pequeños con posibles outliers.

4. **Extrapolación o modelos más complejos (imputación múltiple, KNN, regresión)** — técnicas sofisticadas que predicen el valor faltante en base a otras variables. En este caso solo contamos con `age` y `salary` como variables numéricas, y con apenas 9 registros válidos cualquier modelo sería poco confiable. Mayor complejidad no garantiza mejor resultado con tan pocos datos. Descartado por no tener suficiente base estadística.

**Decisión:** dado que el 60% de los registros tenía edad inválida, eliminarlos distorsionaría demasiado las métricas. La mediana es la opción más honesta dado lo que tenemos: no elimina datos, no es sensible a outliers como la media, no requiere asumir relaciones entre variables que no podemos validar con 9 puntos, y es transparente y explicable. Se optó por **imputación con la mediana** de los valores válidos, manteniendo los 23 registros en el dataset.

**Solución aplicada:**  
Se modificó `excelReader.ts` para calcular la mediana de los registros válidos y reemplazar los valores `99` con ella antes de calcular el promedio final:

```ts
const validAgeRecords = data.filter(r => r.age && r.age < 99)
const sortedAges = validAgeRecords.map(r => r.age).sort((a, b) => a - b)
const mid = Math.floor(sortedAges.length / 2)
const medianAge = sortedAges.length % 2 !== 0
  ? sortedAges[mid]
  : (sortedAges[mid - 1] + sortedAges[mid]) / 2

const imputedData = data.map(r => ({
  ...r,
  age: r.age === 99 ? medianAge : r.age
}))

const totalAge = imputedData.reduce((sum, r) => sum + r.age, 0)
const avgAge = totalAge / imputedData.length
```

**Resultado:**  
La edad promedio pasó de 73 a aproximadamente 32 años, manteniendo los 23 registros del dataset. El resultado es coherente con el perfil de clientes de una consultora orientada a startups y emprendedores.

**Aprendizaje:**  
En datos reales es común encontrar valores centinela o placeholders (99, 0, -1, "N/A") que requieren tratamiento antes de cualquier cálculo. La elección entre eliminar o imputar depende del volumen de datos faltantes y del impacto en la representatividad del análisis.

---

---

## 8. Bug #6 — Favicon no aparecía en la pestaña del navegador

**Descripción:**  
La pestaña del navegador mostraba el título "Challenge Insight" pero sin ícono (favicon), lo que le quitaba identidad visual a la aplicación.

**Causa:**  
En `index.html`, la línea que define el favicon apuntaba a un archivo inexistente:

```html
<link rel="icon" type="image/png" href="/logo.png" />
```

El proyecto buscaba `/logo.png` en la carpeta `public/`, pero el logo real se llamaba `logo_challenge.PNG` y estaba en `src/assets/`, no en `public/`. Dos problemas en uno: nombre incorrecto y ubicación incorrecta.

**¿Por qué debe estar en `public/` y no en `src/assets/`?**  
Los archivos en `src/assets/` son procesados por Vite — se importan en el código y Vite les asigna un hash en el nombre final. El `index.html` no puede referenciar esos archivos directamente porque no sabe el nombre final que tendrán. En cambio, los archivos en `public/` se sirven tal cual, con su nombre original, accesibles desde la raíz del servidor.

**Solución aplicada:**  
1. Se copió `logo_challenge.PNG` desde `src/assets/` a la carpeta `public/`
2. Se actualizó `index.html` para apuntar al nombre correcto:

```html
<link rel="icon" type="image/PNG" href="/logo_challenge.PNG" />
```

**Resultado:**  
El logo de Challenge Insight aparece correctamente en la pestaña del navegador. — Métricas con animación de conteo y diseño centrado

**Descripción:**  
Se rediseñó la sección de Métricas para que los números cuenten desde 0 hasta su valor final al entrar al viewport, con texto centrado y un diseño más limpio inspirado en sitios como soluciones.cl.

**Implementación inicial y problemas encontrados:**

El desarrollo de esta mejora requirió tres iteraciones hasta llegar a una solución estable. Documentar cada intento fallido es relevante porque refleja el proceso real de resolución de problemas.

---

**Intento #1 — Estado compartido (`started`)**  
Se creó un hook `useCountUp` que recibía un booleano `started` controlado por un `IntersectionObserver` a nivel del componente padre. El problema fue que `started` es un estado de React que se reinicia a `false` en cada recarga de página. Además, la animación se disparaba antes de que los datos del Excel estuvieran listos, porque el observer y la carga asíncrona del archivo no estaban sincronizados.

*Resultado: los números se quedaban en 0 al recargar la página.*

---

**Intento #2 — Desconectar el observer tras primera activación**  
Se agregó `observer.disconnect()` dentro del callback del `IntersectionObserver` para evitar que se volviera a disparar. Esto resolvió el problema del loop, pero no el de la sincronización con los datos — si el observer se activaba antes de que el Excel terminara de cargarse, `finalValue` era 0 y la animación no tenía nada que contar.

*Resultado: los números contaban una vez pero volvían a 0 al reabrir la página.*

---

**Intento #3 (solución final) — Observer por componente + `useRef` como bandera**  
Se reestructuró completamente el enfoque: en lugar de un observer global en el componente padre, cada `MetricItem` maneja su propio `IntersectionObserver` y su propia bandera `animated` usando `useRef`.

Las claves de por qué esto funciona:

- **`useRef` en lugar de `useState` para la bandera:** `useRef` persiste su valor entre re-renders sin causar re-renders adicionales. Cuando `animated.current = true` se setea, el componente no se vuelve a renderizar y la animación no se resetea.

- **Observer por elemento:** cada métrica observa su propio DOM node. El `useEffect` que inicia la animación depende de `finalValue` — esto garantiza que solo se ejecuta cuando el dato real ya llegó desde el Excel.

- **`observer.disconnect()` dentro del callback:** una vez que el elemento entra al viewport y la animación comienza, el observer se desconecta. No puede volver a dispararse.

- **Sincronización natural:** como el `useEffect` depende de `finalValue`, si los datos del Excel no llegaron todavía, `finalValue` es 0 y el effect no hace nada. Cuando los datos llegan, React re-renderiza con los valores reales, el effect corre nuevamente, encuentra el elemento en el viewport, y lanza la animación.

**Resultado final:**  
Los números cuentan desde 0 hasta su valor real al entrar al viewport, con animación suave de 1.5 segundos. La animación ocurre exactamente una vez por carga de página, independientemente de cuántas veces el usuario scrollee hacia arriba y hacia abajo.

**Aprendizaje:**  
En React, `useState` y `useRef` tienen propósitos distintos. `useState` es para valores que al cambiar deben re-renderizar el componente. `useRef` es para valores que deben persistir entre renders sin causarlos — ideal para flags de control como "¿ya se animó?". Usar el hook incorrecto en este contexto era precisamente la causa del bug.
