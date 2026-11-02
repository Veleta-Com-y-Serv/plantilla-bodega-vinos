# Plantilla NoExpertise · Bodega y enoturismo

Web clásica en burdeos, negro y oro para bodegas y enoturismo: historia, vinos, visitas con cata y venta.

- Sectores: bodega, vinos, enoturismo, destilería, cervecería artesanal, almazara. Estilo: clásico. Plan mínimo: presencia.
- Secciones: hero, historia, vinos, enoturismo, puntos-venta, galeria, opiniones, preguntas, contacto (y `texto` para apartados nuevos).
- Diseño: todo a ancho completo, en bandas que alternan negro, burdeos, marfil y oro. Portada a pantalla completa con la foto del viñedo a sangre, marco dorado fino de etiqueta y título enorme en serif; historia con foto a sangre y línea de tiempo de años en cursiva dorada; rejilla de botellas con filtro por tipo (sin JavaScript); visitas en mitad marfil junto a una foto a sangre; banda de oro de puntos de venta; mosaico de fotos de borde a borde; cita grande; preguntas en acordeón; contacto con formulario de visita; pie burdeos con el aviso de consumo responsable.
- Campos propios: `aviso_edad` (raíz); `historia.declaracion` y `historia.hitos` [{anio, titulo, texto}]; `vinos.vinos` [{nombre, tipo, anada, variedad, texto, precio, imagen, destacado}] y `vinos.marca_destacado`; `enoturismo.visitas` [{nombre, duracion, precio, texto}] y `enoturismo.nota`; `puntos-venta.items` [{titulo, texto, icono, url}]. Detalle en `CLAUDE.md`.
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD del negocio (`Winery`) y de las preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Contenido editable en `site.yaml`; metadatos en `template.yaml`; reglas para el agente en `CLAUDE.md`; brief de diseño en `DISEÑO.md`; fotos a generar en `fotos.json`.

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Imágenes de relleno (`public/placeholders/`) dibujadas para esta plantilla, sin licencias de terceros.

## Páginas propias
- Cada elemento de `secciones.vinos.vinos` con `detalle` tiene su página en `/vinos/<slug>/` (`src/pages/[coleccion]/[slug].astro`).
- Campos opcionales de los elementos con ficha: `detalle` (párrafos separados por una línea en blanco), `slug` e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»).
