// Cronograma Hacienda II — real project data
// Source: Cronograma HDA II.xlsx

export type Status = 'en_proceso' | 'pendiente' | 'completado'
export type CategoryId = 'infraestructura' | 'piscina' | 'casa_club' | 'tapias'

export interface ActivityGroup {
  id: CategoryId
  label: string
  color: string         // hex
  glowColor: string     // rgba for glow
  startDate: string     // YYYY-MM-DD
  endDate: string
  status: Status
}

export interface Activity {
  id: string
  groupId: CategoryId
  name: string
  status: Status
  startDate: string     // YYYY-MM-DD
  endDate: string
  duration: number      // calendar days
  comments?: string
}

// Project anchor — all day offsets computed from this
export const PROJECT_START = new Date('2026-02-04')
export const PROJECT_END   = new Date('2026-05-31')

export function dayOffset(dateStr: string): number {
  const d = new Date(dateStr)
  return Math.round((d.getTime() - PROJECT_START.getTime()) / 86_400_000)
}

export function offsetToDate(offset: number): Date {
  const d = new Date(PROJECT_START)
  d.setDate(d.getDate() + offset)
  return d
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-CR', { day: 'numeric', month: 'short' })
}

// ─── Groups / sections ────────────────────────────────────────────────────────

export const GROUPS: ActivityGroup[] = [
  {
    id: 'infraestructura',
    label: 'Infraestructura HDA II',
    color: '#4C82EE',
    glowColor: 'rgba(76,130,238,0.25)',
    startDate: '2026-02-04',
    endDate: '2026-05-31',
    status: 'en_proceso',
  },
  {
    id: 'piscina',
    label: 'Piscina',
    color: '#22d3ee',
    glowColor: 'rgba(34,211,238,0.25)',
    startDate: '2026-02-04',
    endDate: '2026-04-25',
    status: 'en_proceso',
  },
  {
    id: 'casa_club',
    label: 'Casa Club',
    color: '#fb923c',
    glowColor: 'rgba(251,146,60,0.25)',
    startDate: '2026-03-15',
    endDate: '2026-05-31',
    status: 'pendiente',
  },
  {
    id: 'tapias',
    label: 'Tapias',
    color: '#a78bfa',
    glowColor: 'rgba(167,139,250,0.25)',
    startDate: '2026-04-15',
    endDate: '2026-05-20',
    status: 'pendiente',
  },
]

// ─── Activities ───────────────────────────────────────────────────────────────

export const ACTIVITIES: Activity[] = [
  // ── Infraestructura ──────────────────────────────────────────────────────
  {
    id: 'infra-1',
    groupId: 'infraestructura',
    name: 'Pórtico de acceso',
    status: 'en_proceso',
    startDate: '2026-03-15',
    endDate: '2026-05-14',
    duration: 60,
  },
  {
    id: 'infra-2',
    groupId: 'infraestructura',
    name: 'Caseta de guarda',
    status: 'en_proceso',
    startDate: '2026-03-15',
    endDate: '2026-04-29',
    duration: 45,
    comments: 'Faltante por terminar',
  },
  {
    id: 'infra-3',
    groupId: 'infraestructura',
    name: 'Calle de acceso',
    status: 'en_proceso',
    startDate: '2026-04-29',
    endDate: '2026-05-14',
    duration: 15,
  },
  {
    id: 'infra-4',
    groupId: 'infraestructura',
    name: 'Aceras y bordillos',
    status: 'en_proceso',
    startDate: '2026-04-29',
    endDate: '2026-05-09',
    duration: 10,
  },
  {
    id: 'infra-5',
    groupId: 'infraestructura',
    name: 'Verjas fijas',
    status: 'en_proceso',
    startDate: '2026-03-20',
    endDate: '2026-04-19',
    duration: 30,
  },
  {
    id: 'infra-6',
    groupId: 'infraestructura',
    name: 'Portones peatonales',
    status: 'en_proceso',
    startDate: '2026-03-31',
    endDate: '2026-04-20',
    duration: 20,
  },
  {
    id: 'infra-7',
    groupId: 'infraestructura',
    name: 'Portones vehiculares',
    status: 'en_proceso',
    startDate: '2026-03-31',
    endDate: '2026-04-20',
    duration: 20,
  },

  // ── Piscina ───────────────────────────────────────────────────────────────
  {
    id: 'pisc-1',
    groupId: 'piscina',
    name: 'Excavación',
    status: 'en_proceso',
    startDate: '2026-02-04',
    endDate: '2026-02-20',
    duration: 16,
  },
  {
    id: 'pisc-2',
    groupId: 'piscina',
    name: 'Losa de concreto',
    status: 'en_proceso',
    startDate: '2026-02-20',
    endDate: '2026-03-13',
    duration: 21,
  },
  {
    id: 'pisc-3',
    groupId: 'piscina',
    name: 'Muros de concreto',
    status: 'en_proceso',
    startDate: '2026-03-13',
    endDate: '2026-04-06',
    duration: 24,
  },
  {
    id: 'pisc-4',
    groupId: 'piscina',
    name: 'Acabado en vitrocerámica',
    status: 'en_proceso',
    startDate: '2026-04-06',
    endDate: '2026-04-25',
    duration: 19,
  },

  // ── Casa Club ─────────────────────────────────────────────────────────────
  {
    id: 'club-1',
    groupId: 'casa_club',
    name: 'Excavación y conformación',
    status: 'pendiente',
    startDate: '2026-03-15',
    endDate: '2026-03-20',
    duration: 5,
  },
  {
    id: 'club-2',
    groupId: 'casa_club',
    name: 'Sello de concreto',
    status: 'pendiente',
    startDate: '2026-03-18',
    endDate: '2026-03-19',
    duration: 1,
  },
  {
    id: 'club-3',
    groupId: 'casa_club',
    name: 'Armadura de fundaciones y losa',
    status: 'pendiente',
    startDate: '2026-03-15',
    endDate: '2026-03-23',
    duration: 8,
  },
  {
    id: 'club-4',
    groupId: 'casa_club',
    name: 'Concreto de losa de fundación',
    status: 'pendiente',
    startDate: '2026-03-23',
    endDate: '2026-03-24',
    duration: 1,
  },
  {
    id: 'club-5',
    groupId: 'casa_club',
    name: 'Armadura de muros N1 y entrepiso',
    status: 'pendiente',
    startDate: '2026-03-24',
    endDate: '2026-03-31',
    duration: 7,
  },
  {
    id: 'club-6',
    groupId: 'casa_club',
    name: 'Encofrado de muros N1 y entrepiso',
    status: 'pendiente',
    startDate: '2026-03-31',
    endDate: '2026-04-05',
    duration: 5,
  },
  {
    id: 'club-7',
    groupId: 'casa_club',
    name: 'Concreto de muros N1 y entrepiso',
    status: 'pendiente',
    startDate: '2026-04-05',
    endDate: '2026-04-06',
    duration: 1,
  },
  {
    id: 'club-8',
    groupId: 'casa_club',
    name: 'Desencofrado N1 y entrepiso',
    status: 'pendiente',
    startDate: '2026-04-06',
    endDate: '2026-04-07',
    duration: 1,
  },
  {
    id: 'club-9',
    groupId: 'casa_club',
    name: 'Armadura de muros N2',
    status: 'pendiente',
    startDate: '2026-04-07',
    endDate: '2026-04-10',
    duration: 3,
  },
  {
    id: 'club-10',
    groupId: 'casa_club',
    name: 'Encofrado de muros N2',
    status: 'pendiente',
    startDate: '2026-04-10',
    endDate: '2026-04-12',
    duration: 2,
  },
  {
    id: 'club-11',
    groupId: 'casa_club',
    name: 'Concreto de muros N2',
    status: 'pendiente',
    startDate: '2026-04-12',
    endDate: '2026-04-13',
    duration: 1,
  },
  {
    id: 'club-12',
    groupId: 'casa_club',
    name: 'Gradas de concreto',
    status: 'pendiente',
    startDate: '2026-04-13',
    endDate: '2026-04-16',
    duration: 3,
  },
  {
    id: 'club-13',
    groupId: 'casa_club',
    name: 'Resane de paredes de concreto',
    status: 'pendiente',
    startDate: '2026-04-16',
    endDate: '2026-04-19',
    duration: 3,
  },
  {
    id: 'club-14',
    groupId: 'casa_club',
    name: 'Estructura metálica techos',
    status: 'pendiente',
    startDate: '2026-04-13',
    endDate: '2026-04-21',
    duration: 8,
  },
  {
    id: 'club-15',
    groupId: 'casa_club',
    name: 'Cubierta',
    status: 'pendiente',
    startDate: '2026-04-19',
    endDate: '2026-04-23',
    duration: 4,
  },
  {
    id: 'club-16',
    groupId: 'casa_club',
    name: 'Paredes livianas',
    status: 'pendiente',
    startDate: '2026-04-23',
    endDate: '2026-04-28',
    duration: 5,
  },
  {
    id: 'club-17',
    groupId: 'casa_club',
    name: 'Instalaciones mecánicas',
    status: 'pendiente',
    startDate: '2026-04-13',
    endDate: '2026-04-18',
    duration: 5,
  },
  {
    id: 'club-18',
    groupId: 'casa_club',
    name: 'Ventanería',
    status: 'pendiente',
    startDate: '2026-04-13',
    endDate: '2026-04-20',
    duration: 7,
  },
  {
    id: 'club-19',
    groupId: 'casa_club',
    name: 'Cielos livianos acabados',
    status: 'pendiente',
    startDate: '2026-04-23',
    endDate: '2026-05-01',
    duration: 8,
  },
  {
    id: 'club-20',
    groupId: 'casa_club',
    name: 'Repello y empastado de paredes',
    status: 'pendiente',
    startDate: '2026-05-01',
    endDate: '2026-05-09',
    duration: 8,
  },
  {
    id: 'club-21',
    groupId: 'casa_club',
    name: 'Enchape de piso',
    status: 'pendiente',
    startDate: '2026-05-09',
    endDate: '2026-05-21',
    duration: 12,
  },
  {
    id: 'club-22',
    groupId: 'casa_club',
    name: 'Puertas',
    status: 'pendiente',
    startDate: '2026-05-20',
    endDate: '2026-05-23',
    duration: 3,
  },
  {
    id: 'club-23',
    groupId: 'casa_club',
    name: 'Mobiliario',
    status: 'pendiente',
    startDate: '2026-05-21',
    endDate: '2026-05-31',
    duration: 10,
  },
  {
    id: 'club-24',
    groupId: 'casa_club',
    name: 'Losa sanitaria',
    status: 'pendiente',
    startDate: '2026-05-09',
    endDate: '2026-05-12',
    duration: 3,
  },

  // ── Tapias ────────────────────────────────────────────────────────────────
  {
    id: 'tap-1',
    groupId: 'tapias',
    name: 'Tapia prefabricada (división etapa 1)',
    status: 'pendiente',
    startDate: '2026-04-25',
    endDate: '2026-05-20',
    duration: 25,
  },
  {
    id: 'tap-2',
    groupId: 'tapias',
    name: 'Muro principal etapa 1',
    status: 'pendiente',
    startDate: '2026-04-15',
    endDate: '2026-05-10',
    duration: 25,
  },
]

// ─── Derived stats ────────────────────────────────────────────────────────────

export const TOTAL_DAYS = dayOffset(PROJECT_END.toISOString().split('T')[0]) + 1

export const STATUS_LABELS: Record<Status, string> = {
  en_proceso: 'En proceso',
  pendiente:  'Pendiente',
  completado: 'Completado',
}

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  infraestructura: 'Infraestructura',
  piscina:         'Piscina',
  casa_club:       'Casa Club',
  tapias:          'Tapias',
}
