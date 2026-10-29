# Plantilla «Bodega y enoturismo» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **clásico**.
Todo en castellano de España, frases cortas, sin jerga. El brief de diseño está en `DISEÑO.md`.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa (normaliza `hitos`, `vinos` y `visitas`); no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario = burdeos, acento = oro, fondo = marfil, texto = tinta). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…). Los tonos derivados se calculan con `color-mix` en `src/styles/global.css`: `--negro` (bandas negras y cabecera), `--vino` (bandas burdeos), `--vino-oscuro` (pie), `--claro`, `--oro-legible` (oro oscurecido para textos sobre marfil) y los filetes `--filete-oro` y `--filete-claro`.
- **Tipografías y aspecto**: `src/styles/global.css`. Títulos en serif de alto contraste del sistema (Bodoni/Didot si están; Constantia o Georgia si no), texto en sans humanista (Gill Sans, Calibri…). Fuentes del sistema: no añadas fuentes externas.
- **Bandas**: `src/components/ui/Seccion.astro` pinta cada sección como banda a todo el ancho (`fondo`: negro, vino, marfil u oro). Las mitades con foto a sangre usan `.partida` / `.partida-foto` / `.partida-texto`.
- **Imágenes**: en `public/`. Fotos en `public/fotos/` (se generan a partir de `fotos.json`); si una foto de `/fotos/` falta, `Imagen.astro` muestra `/placeholders/<mismo nombre>.svg`. En `site.yaml` se referencian con ruta absoluta (`/fotos/hero.jpg`). Personas: siempre `/placeholders/persona.svg`, nunca caras generadas.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = nombre en texto (mayúsculas espaciadas con un rombo dorado).
- **Pie**: columnas con dirección, horario, contacto y menú; franja con el aviso de consumo responsable (`site.yaml → aviso_edad`; vacío = uno por defecto) y «Web creada con NoExpertise» si `marca_pie` no es `false`.

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`, en el orden de `site.yaml`.
- `hero` → `hero.astro` (portada a pantalla completa con foto a sangre y marco dorado; cabecera transparente encima)
- `historia` → `historia.astro` (banda burdeos: texto + foto a sangre y línea de tiempo de `hitos`)
- `vinos` → `vinos.astro` (banda negra: rejilla de botellas con filtro por tipo)
- `enoturismo` → `enoturismo.astro` (banda marfil partida: foto a sangre + `visitas`)
- `puntos-venta` → `puntos-venta.astro` (banda de oro: dónde comprar)
- `galeria` → `galeria.astro` (banda negra con mosaico de borde a borde)
- `opiniones` → `opiniones.astro` (banda burdeos: cita grande + columnas; sin opiniones no se pinta)
- `preguntas` → `preguntas.astro` (banda marfil, acordeón `details/summary`; sin preguntas no se pinta)
- `contacto` → `contacto.astro` (banda negra partida: foto a sangre, vías de contacto y formulario de visita)
- `texto` → `texto.astro` (apartado genérico para `tipo: texto`)

## Campos propios de esta plantilla (además del esquema común)
- Raíz: `aviso_edad` (texto del aviso de consumo responsable del pie y del aviso legal).
- `hero`: `cta` y `cta_secundario` (sin `cta` el botón llama; sin `cta_secundario`, «Cómo llegar» al mapa); `items` = ficha corta de la bodega (solo `titulo`).
- `historia`: `declaracion` (frase corta en cursiva dorada), `texto` en párrafos (línea en blanco entre párrafos), `imagen` vertical y `hitos` [{anio, titulo, texto}] (`anio` como cadena entre comillas: `"1921"`). Sin hitos no hay línea de tiempo.
- `vinos.vinos` [{nombre, tipo, anada, variedad, texto, precio, imagen, destacado}]: `tipo` da el color de la etiqueta (Tinto, Blanco, Rosado/Clarete, Espumoso/Cava; otro tipo, oro) y, si hay dos tipos o más, los botones de filtro (sin JavaScript). `anada` y `precio` SIEMPRE como cadena. Sin `imagen`, se dibuja una botella del color del tipo. `destacado: true` pone la marca de `vinos.marca_destacado` («Recomendado» si está vacío). `cta` opcional debajo (p. ej. pedir por WhatsApp).
- `enoturismo`: `imagen`, `visitas` [{nombre, duracion, precio, texto}] (precio como cadena: `"18 €"`, `"Consultar"`), `cta` y `nota`. Las visitas salen también como opciones del formulario de contacto.
- `puntos-venta.items` [{titulo, texto, icono, url}]: iconos `botella`, `copa`, `cubiertos`, `caja`, `uva`, `barrica`, `casa`, `mapa`…; `url` opcional (enlace bajo el punto).
- `opiniones.testimonios` [{texto, autor, nota}]: la primera sale en grande. Sin estrellas ni notas numéricas.
- `contacto`: `imagen` (foto a sangre al lado). El formulario pide nombre, contacto, qué visita, día, personas y mensaje, y abre el correo (`mailto`).

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`. Si `hero` deja de ser la primera, la cabecera pasa a ser sólida sola.
3. **Cambiar textos, vinos, precios, visitas, fotos**: solo en `site.yaml`. Si un texto contiene comas o dos puntos dentro de `{ … }`, ponlo entre comillas. Precios, años y añadas siempre entre comillas.
4. **Listas planas**: nunca una lista dentro de un elemento de lista. Para agrupar vinos usa `tipo`; para varios datos, una cadena («Tempranillo y graciano»). Máximo 24 elementos por lista.
5. **Nunca inventes** precios, añadas, cifras ni opiniones: si el cliente no los da, déjalos vacíos (los componentes lo soportan).
6. **Página nueva**: crea `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`; enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
7. **Apartado nuevo**: añade `secciones.<id>` en `site.yaml` con `tipo:` = `texto`, `vinos`, `galeria`, `opiniones`… (el diseño que quiera reutilizar). `src/pages/index.astro` lo recoge solo; no lo toques.
8. **No tocar** `src/pages/index.astro`, `src/layouts/Base.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts`: son el SEO de base (canónica, og:image, `noindex` si `seo.indexable: false`, JSON-LD del negocio —tipo `Winery`— y de las preguntas, robots, sitemap y llms.txt), salen solos de `site.yaml` y el fichero es el mismo en todas las plantillas. `seo.url` y `seo.indexable` los pone la plataforma: no los cambies.
9. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` (carga diferida), sin JavaScript nuevo salvo necesidad real (solo hay el de la cabecera), bandas a todo el ancho, 16 px de margen lateral del texto en móvil (`.contenedor`, `--margen`), sin scroll horizontal en móvil. Imágenes de contenido con `alt` sacado del contenido (`altHero`, `altFicha`, `altGaleria`, `altSeccion` de `src/lib/seo.ts`); las decorativas, `alt=""`.
10. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`. Para envío real, cambia `action` en `src/components/ui/FormularioContacto.astro`.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.
