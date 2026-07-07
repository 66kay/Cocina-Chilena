export const menuData = [
  {
    id: '1',
    nombre: 'Pastel de Choclo',
    descripcion: 'Pino de carne de vacuno picada, pechuga de pollo, pasas, aceitunas y huevo duro, cubierto con una cremosa pasta de maíz choclo gratinada con azúcar.',
    precio: 8500,
    categoria: 'fondos',
    imagen: '',
    colorGradiente: 'linear-gradient(135deg, #ffd175, #ff9800)',
    ingredientes: ['Choclo fresco picado', 'Carne de vacuno', 'Pechuga de pollo', 'Cebolla picada', 'Pasas de uva', 'Aceituna negra', 'Huevo duro', 'Albahaca y comino']
  },
  {
    id: '2',
    nombre: 'Empanada de Pino',
    descripcion: 'Masa tradicional horneada rellena con un guiso jugoso de carne de vacuno picada, cebollas tiernas, huevo duro, aceitunas y pasas.',
    precio: 3000,
    categoria: 'entradas',
    imagen: '',
    colorGradiente: 'linear-gradient(135deg, #f5d0a9, #d35400)',
    ingredientes: ['Harina de trigo', 'Carne de vacuno picada', 'Cebollas', 'Huevo duro', 'Aceituna negra', 'Pasas de uva', 'Comino y manteca']
  },
  {
    id: '3',
    nombre: 'Cazuela de Vacuno',
    descripcion: 'Sopa casera tradicional chilena hecha con una tierna costilla de vacuno, papa entera, zapallo camote, choclo, porotos verdes y arroz.',
    precio: 7500,
    categoria: 'fondos',
    imagen: '',
    colorGradiente: 'linear-gradient(135deg, #fce8c3, #e67e22)',
    ingredientes: ['Carne de vacuno con hueso', 'Papa entera', 'Trozos de zapallo', 'Trozo de choclo', 'Porotos verdes', 'Arroz', 'Zanahoria y pimentón']
  },
  {
    id: '4',
    nombre: 'Humitas Chilenas',
    descripcion: 'Crema espesa de choclo molido sazonado con albahaca, cebolla y manteca de cerdo, envuelta en las mismas hojas de la mazorca y cocida al vapor.',
    precio: 4000,
    categoria: 'entradas',
    imagen: '',
    colorGradiente: 'linear-gradient(135deg, #ffe57f, #c0ca33)',
    ingredientes: ['Choclo tierno molido', 'Albahaca fresca', 'Cebolla frita', 'Manteca', 'Hojas de choclo', 'Sal y leche']
  },
  {
    id: '5',
    nombre: 'Completo Italiano',
    descripcion: 'Un clásico nacional: salchicha en pan de completo alargado, coronado con una abundante capa de tomate picado, palta molida cremosa y mayonesa casera.',
    precio: 3500,
    categoria: 'entradas',
    imagen: '',
    colorGradiente: 'linear-gradient(135deg, #aed581, #2e7d32)',
    ingredientes: ['Pan de completo', 'Salchicha (vienesa)', 'Tomate en cubitos', 'Palta Hass molida', 'Mayonesa', 'Sal y aderezos']
  },
  {
    id: '6',
    nombre: 'Mote con Huesillo',
    descripcion: 'Bebida dulce tradicional sin alcohol que consiste en una base de huesillos (duraznos deshidratados) rehidratados y cocidos con azúcar y canela, acompañados de trigo mote cocido.',
    precio: 2500,
    categoria: 'postres_bebidas',
    imagen: '',
    colorGradiente: 'linear-gradient(135deg, #ffb74d, #e65100)',
    ingredientes: ['Huesillos (durazno seco)', 'Trigo mote cocido', 'Chancaca o azúcar rubia', 'Palito de canela', 'Cáscara de naranja']
  },
  {
    id: '7',
    nombre: 'Chorrillana',
    descripcion: 'Gran plato para compartir consistente en una montaña de papas fritas crujientes cubiertas con carne de vacuno picada, cebolla frita caramelizada y huevos fritos.',
    precio: 12000,
    categoria: 'fondos',
    imagen: '',
    colorGradiente: 'linear-gradient(135deg, #ffcc80, #d84315)',
    ingredientes: ['Papas fritas abundantes', 'Carne de vacuno troceada', 'Cebollas en pluma', 'Huevos fritos', 'Aceite, sal y especias']
  },
  {
    id: '8',
    nombre: 'Sopaipillas con Pebre',
    descripcion: 'Masa frita hecha a base de harina y zapallo cocido molido. Se acompaña de Pebre chileno fresco con tomate, cebolla, cilantro, ají verde y ajo.',
    precio: 2000,
    categoria: 'entradas',
    imagen: '',
    colorGradiente: 'linear-gradient(135deg, #ffb300, #c2185b)',
    ingredientes: ['Harina', 'Zapallo camote cocido', 'Cilantro picado', 'Tomate y cebolla', 'Ají verde y aceite', 'Vinagre y sal']
  },
  {
    id: '9',
    nombre: 'Leche Asada',
    descripcion: 'Postre clásico chileno horneado a baño María elaborado con huevos, leche y azúcar, formando un flan esponjoso cubierto de una salsa fina de caramelo.',
    precio: 3000,
    categoria: 'postres_bebidas',
    imagen: '',
    colorGradiente: 'linear-gradient(135deg, #ffe082, #8d6e63)',
    ingredientes: ['Leche entera', 'Huevos frescos', 'Azúcar para la mezcla', 'Azúcar para el caramelo', 'Esencia de vainilla']
  }
];

export const categories = [
  { id: 'todos', nombre: 'Todos' },
  { id: 'fondos', nombre: 'Platos de Fondo' },
  { id: 'entradas', nombre: 'Entradas' },
  { id: 'postres_bebidas', nombre: 'Postres y Bebidas' }
];

export const formatCLP = (amount) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(amount);
};
