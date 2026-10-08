# Tarjetas digitales instalables

La tarjeta funciona como una PWA: se abre desde el navegador y puede agregarse a la pantalla de inicio sin generar un APK.

## Para publicarla

1. Sube completa la carpeta `storylaw/` respetando su estructura.
2. Sirve el sitio mediante HTTPS.
3. Abre el `qr.html` correspondiente en el navegador.
4. En Android, usa **Instalar aplicación** o **Agregar a pantalla principal** desde el menú del navegador.

Cada service worker está al mismo nivel que su `qr.html`, para que pueda controlar y guardar en caché su propia tarjeta. Cada PWA se instala y abre directamente en el `qr.html` correspondiente.

En iPhone, el botón **Instalar en iPhone** abre una guía visual. También permite copiar el enlace cuando la tarjeta se abre dentro de WhatsApp u otra aplicación y se necesita continuar en Safari.

## Carpetas incluidas

- `alejandro-flores/`: tarjeta principal de Alejandro.
- `alejandro-flores-2/`: segunda tarjeta de Alejandro, con identidad PWA independiente.
- `ana-laura-flores/`: información confirmada y diseño joven sin fotografía ni iniciales.
- `monica-mora/`: información confirmada y diseño joven sin fotografía ni iniciales.

## Propuestas organizadas por abogado

- `alejandro-flores/propuestas/index.html`: tres propuestas para Alejandro.
- `alejandro-flores-2/propuestas/index.html`: acceso a las mismas tres propuestas desde su segunda carpeta.
- `ana-laura-flores/propuestas/index.html`: tarjeta vigente y cuatro propuestas individuales para Ana Laura.
- `monica-mora/propuestas/index.html`: tarjeta vigente y cuatro propuestas individuales para Mónica.

Cada propuesta de las asociadas tiene dos páginas independientes:

- El catálogo de asociadas reúne 10 estructuras distintas: las rutas internas de Ana contienen las propuestas 01–05 y las de Mónica contienen las propuestas 06–10.
- Cada propuesta permite alternar los datos de Ana Laura o Mónica y probar cinco paletas de color.
- Cada HTML conserva su código QR y su flujo de instalación PWA.
- Alejandro cuenta con cuatro estructuras (incluida la tarjeta actual refinada), cada una con cinco paletas de color y una página individual dentro de `alejandro-flores/propuestas/`.

Las cuatro tarjetas conservan composiciones diferentes: propuesta 01 minimalista y centrada; propuesta 02 editorial con acciones verticales; propuesta 03 contemporánea con formas orgánicas; y propuesta 04 con encabezado ejecutivo institucional.

Los ocho QR apuntan a su página de instalación publicada en GitHub Pages. Cada propuesta utiliza un manifiesto con identificador, ruta de inicio y colores propios. En Android se instala con el aviso del navegador; en iPhone se muestra la guía para **Agregar a pantalla de inicio**. Al abrir el ícono instalado se muestra directamente la tarjeta elegida.

El archivo raíz `propuestas-abogadas.html` funciona ahora como índice y dirige a las propuestas separadas. Las tarjetas vigentes continúan en el `index.html` de cada carpeta.
