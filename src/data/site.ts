// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';

export interface Enlace { texto: string; url: string }
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; url?: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
/** Opinión. `nota` es opcional (de dónde viene: «Google», «TripAdvisor»…). */
export interface Testimonio { texto: string; autor: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
export interface Proyecto { titulo: string; texto?: string; imagen?: string; categoria?: string; anio?: string }
export interface Noticia { fecha: string; titulo: string; texto?: string; url?: string }
/** Hito de la historia (línea de tiempo). `anio` como cadena («1921»). */
export interface Hito { anio: string; titulo: string; texto: string }
/** Vino. `tipo` agrupa y filtra (Tinto, Blanco, Rosado, Espumoso…); `precio` y `anada` siempre como cadena. */
export interface Vino { nombre: string; tipo: string; anada: string; variedad: string; texto: string; precio: string; imagen: string; destacado: boolean }
/** Visita de enoturismo. `precio` como cadena («18 €», «Consultar»). */
export interface Visita { nombre: string; texto: string; precio: string; duracion: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace;
  cta_secundario?: Enlace;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  proyectos: Proyecto[];
  noticias: Noticia[];
  /** historia */
  hitos: Hito[];
  declaracion?: string;
  /** vinos */
  vinos: Vino[];
  marca_destacado?: string;
  /** enoturismo */
  visitas: Visita[];
  nota?: string;
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  /** Aviso de consumo responsable del pie. Vacío = el de por defecto. */
  aviso_edad: string;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = (datos ?? {}) as Crudo;
function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
const texto = (v: unknown) => (v == null ? '' : String(v).trim());

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    items: lista<Item>(s.items),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Testimonio>(s.testimonios).filter((t) => texto(t.texto)),
    galeria: lista<unknown>(s.galeria).map(texto).filter(Boolean),
    horario: lista<Horario>(s.horario),
    preguntas: lista<Pregunta>(s.preguntas),
    proyectos: lista<Proyecto>(s.proyectos),
    noticias: lista<Noticia>(s.noticias),
    hitos: lista<Crudo>(s.hitos)
      .map((h) => ({ anio: texto(h.anio), titulo: texto(h.titulo), texto: texto(h.texto) }))
      .filter((h) => h.anio || h.titulo || h.texto),
    vinos: lista<Crudo>(s.vinos)
      .filter((v) => texto(v.nombre))
      .map((v) => ({
        nombre: texto(v.nombre),
        tipo: texto(v.tipo),
        anada: texto(v.anada),
        variedad: texto(v.variedad),
        texto: texto(v.texto),
        precio: texto(v.precio),
        imagen: texto(v.imagen),
        destacado: v.destacado === true,
      })),
    visitas: lista<Crudo>(s.visitas)
      .filter((v) => texto(v.nombre))
      .map((v) => ({ nombre: texto(v.nombre), texto: texto(v.texto), precio: texto(v.precio), duracion: texto(v.duracion) })),
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi bodega',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#6b1424', acento: '#c8a24a', fondo: '#f3ede2', texto: '#1c1416', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'Winery',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  aviso_edad: texto(d.aviso_edad) || 'Bebe con moderación. Venta de bebidas alcohólicas solo a mayores de 18 años.',
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

/** Agrupa una lista por un campo escalar (p. ej. `tipo`), respetando el orden en que aparece cada grupo. */
export function agrupar<T>(items: T[], campo: (x: T) => string | undefined): { grupo: string; items: T[] }[] {
  const grupos: { grupo: string; items: T[] }[] = [];
  for (const it of items) {
    const g = (campo(it) ?? '').trim();
    let destino = grupos.find((x) => x.grupo === g);
    if (!destino) grupos.push((destino = { grupo: g, items: [] }));
    destino.items.push(it);
  }
  return grupos;
}

/** Visitas de enoturismo de la primera sección activa que las tenga (para el desplegable del formulario). */
export function visitasActivas(): Visita[] {
  for (const s of Object.values(site.secciones)) if (s.activa && s.visitas.length) return s.visitas;
  return [];
}

/** Clave sin tildes ni espacios para un tipo de vino («Espumoso» → «espumoso»): da el color de la etiqueta. */
export const clave = (t?: string) =>
  (t ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
export const externo = (u?: string) => !!u && /^https?:/.test(u);
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
