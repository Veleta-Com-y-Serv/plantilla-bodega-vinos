# Bodega y enoturismo: brief de diseño

Plantilla `bodega-vinos` creada el 29/10/2026 a partir de `restaurante` con `php artisan plantillas:nueva` y
rediseñada entera (fila 16 del brief de la tanda «a ancho completo»). Este fichero se queda en el repo: es lo que lee
quien (persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: bodegas familiares y cooperativas con enoturismo; también destilerías, cervecerías artesanales y
  almazaras que enseñan su casa y venden su producto. Su cliente entra para conocer la historia, ver los vinos con su
  precio y reservar una visita con cata o pedir unas botellas.
- **Qué tiene que conseguir la web**: «Reservar una visita» (formulario de visita o WhatsApp) y «Pedir vino».
- **Tono y estilo** (`estilo: clasico`): clásico, sobrio y con oficio, como una etiqueta de vino antigua. Sí: etiquetas
  de vino con filetes dorados, años en cursiva, calados de piedra. No: la elegancia marfil de `restaurante`, ni la
  «caja centrada con tarjetas blancas».
- **Ancho completo**: cada sección es una banda de borde a borde; fotos a sangre en mitades 50/50 y mosaico sin
  márgenes; contenido hasta 90 rem con 16 px de margen lateral en móvil.

## Concepto visual

- **Paleta de ejemplo**: primario `#6b1424` (burdeos), acento `#c8a24a` (oro), fondo `#f3ede2` (marfil), texto
  `#1c1416` (tinta). Derivados con `color-mix`: `--negro` (negro con un toque de burdeos), `--vino` (banda burdeos),
  `--vino-oscuro` (pie), `--claro`, `--oro-legible` (oro oscurecido para texto sobre marfil), filetes `--filete-oro` y
  `--filete-claro`. Aguanta que el cliente cambie los cuatro colores. Colores de tipo de vino: tinto (del primario),
  blanco paja, rosado y espumoso (del acento).
- **Tipografía**: serif de alto contraste del sistema para títulos («Bodoni 72», Didot, «Bodoni MT», Constantia,
  Georgia), de 2,75 rem en móvil a 7,25 rem en la portada; años, añadas y citas en cursiva dorada; texto en sans
  humanista (Gill Sans, Calibri, Trebuchet). Antetítulos y etiquetas en mayúsculas muy espaciadas con filete dorado.
- **Forma**: esquinas rectas; botones rectangulares dorados con letras espaciadas; filetes dorados de 1 px; rombos
  dorados como viñetas y marcas de la línea de tiempo; marco dorado fino dentro de la portada (como una etiqueta).
- **Ritmo de bandas**: portada (foto a sangre) → historia burdeos (texto | foto a sangre + línea de tiempo) → vinos
  negro → visitas marfil (foto a sangre | texto) → dónde comprar en oro pleno → galería negra con mosaico de borde a
  borde → opiniones burdeos (cita enorme) → preguntas marfil → contacto negro (foto a sangre | formulario) → pie
  burdeos muy oscuro con franja de consumo responsable.

## Apartados (en orden)

1. `hero`: portada a pantalla completa (100svh), foto del viñedo a sangre con velo, título enorme, párrafo, dos botones
   y la ficha de la bodega (`items`) en columna con filetes a la derecha (debajo en móvil).
2. `historia`: `declaracion` en cursiva dorada, `texto` en párrafos, `imagen` vertical a sangre y `hitos`
   [{anio, titulo, texto}] en línea de tiempo: vertical en móvil, 3 columnas en tableta y en una fila (deslizable si
   hay muchos) desde 1280 px.
3. `vinos`: `vinos` [{nombre, tipo, anada, variedad, texto, precio, imagen, destacado}] en rejilla de 2 columnas
   (móvil) y 3 (tableta y escritorio), foto vertical 3:4, etiqueta con punto de color del tipo y añada en cursiva;
   filtro por tipo con botones de radio y CSS (`:has`), sin JavaScript; sin foto, botella dibujada del color del tipo.
4. `enoturismo`: `visitas` [{nombre, duracion, precio, texto}] en filas con filetes junto a la foto a sangre; `cta`
   y `nota`.
5. `puntos-venta`: `items` [{titulo, texto, icono, url}] en 2 columnas con icono en círculo sobre la banda de oro.
6. `galeria`: mosaico de borde a borde, la primera foto grande (2×2), 2 columnas en móvil y 4 desde tableta.
7. `opiniones`: la primera en grande y centrada; el resto en columnas con filete dorado.
8. `preguntas`: titular fijo a la izquierda y acordeón a la derecha.
9. `contacto`: foto a sangre, vías de contacto (teléfono, WhatsApp, email, dirección, horario) y formulario de visita
   (qué visita, día, personas) por `mailto`.

## Fotos

15 en `fotos.json`: viñedo al atardecer (portada, 16:9), calado abovedado (historia), sala de barricas con cata
(visitas), portón de la bodega (contacto), seis bodegones de botella sin etiqueta por tipo de vino (3:4) y cinco
cuadradas para la galería (viñedo aéreo, vendimia de manos, barricas, copa a contraluz, cepa vieja). Sin texto
legible, sin logotipos, sin caras.

## Qué no hacer

- Volver al fondo marfil dominante con filetes de `restaurante`: aquí manda lo oscuro y el oro.
- Encajonar secciones en una columna estrecha o meter vinos en tarjetas blancas.
- Inventar precios, añadas o premios: si no los hay, el componente no pinta nada.

## Páginas propias (fichas)
Con la misma piel que la portada: cabecera y pie de la plantilla, migas (Inicio › Sección › Elemento), hero con la foto del
elemento (sin foto, su icono), `detalle` en párrafos, tabla de datos, caja de contacto, galería (`imagenes`) y otros elementos
de la misma lista.
