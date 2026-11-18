export interface StoryChapter {
  year: string;
  title: string;
  text: string;
}

export interface ScheduleItem {
  time: string;
  label: string;
}

export interface WeddingConfig {
  couple: {
    /** Nombre corto que se muestra en el hero, la portada y el footer. */
    firstName: string;
    secondName: string;
    /** Nombres completos, conservados por si se quieren mostrar más adelante. */
    brideFullName: string;
    groomFullName: string;
    monogram: string;
  };
  wedding: {
    /** Fecha y hora local con zona horaria, usada por el countdown. */
    dateISO: string;
    weekday: string;
    dateLabel: string;
    dateShort: string;
    /** Piezas de la tarjeta de la portada y el hero. */
    cardDay: string;
    cardMonth: string;
    cardYear: string;
    cardDateLabel: string;
    yearRoman: string;
    timeLabel: string;
    city: string;
    /** Versión corta para la portada y el hero. */
    cityShort: string;
    quote: string;
    /** Segunda capa de la frase: se lee en cuerpo pequeño bajo la cita. */
    quoteSupport: string;
    intro: string;
  };
  venue: {
    name: string;
    address: string;
    city: string;
    mapUrl: string;
    calendarUrl: string;
    note: string;
  };
  audio: {
    /** Ruta del archivo dentro de public/. */
    src: string;
    title: string;
    artist: string;
  };
  celebration: {
    label: string;
    time: string;
  };
  schedule: ScheduleItem[];
  dayNote: string;
  // Historia desactivada por ahora. El componente Story.tsx sigue existiendo
  // y se puede reactivar descomentando su import en App.tsx.
  story: StoryChapter[];
  // RSVP desactivado por ahora. El componente RSVP.tsx sigue existiendo
  // y se puede reactivar descomentando su import en App.tsx.
  rsvp: {
    deadlineLabel: string;
    /** Número en formato internacional, solo dígitos, para wa.me. */
    whatsappNumber: string;
    whatsappDisplay: string;
    maxGuests: number;
    note: string;
  };
  gifts: {
    title: string;
    text: string;
  };
  // Código de vestimenta: sin especificar por ahora.
  // dressCode: {
  //   value: string;
  //   note: string;
  // };
  seo: {
    title: string;
    description: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    firstName: 'Lesly',
    secondName: 'Rogelio',
    brideFullName: 'Lesly Kassandra Esparza Reyes',
    groomFullName: 'Rogelio Martínez Santillán',
    monogram: 'L & R',
  },
  wedding: {
    dateISO: '2026-12-21T17:00:00-06:00',
    weekday: 'Lunes',
    dateLabel: '21 de diciembre de 2026',
    dateShort: '21 · 12 · 26',
    cardDay: '21',
    cardMonth: 'Diciembre',
    cardYear: '2026',
    cardDateLabel: '21 · Diciembre · 2026',
    yearRoman: 'MMXXVI',
    timeLabel: '5:00 p.\u00A0m.',
    city: 'Carboneras, Tepezalá, Aguascalientes',
    cityShort: 'Carboneras, Tepezalá',
    quote:
      'Elegirnos, todos los días, es nuestra forma favorita de escribir esta historia.',
    quoteSupport:
      'Porque el amor también se escribe en lo cotidiano: en las mañanas compartidas, en las risas sin motivo y en los días que elegimos quedarnos. Este 21 de diciembre abrimos un capítulo nuevo, y queremos celebrarlo contigo.',
    intro:
      'Con la bendición de nuestras familias, tenemos el honor de invitarte a celebrar nuestra boda civil y el comienzo de nuestra vida juntos.',
  },
  venue: {
    name: 'Casa del novio',
    address: 'Álvaro Obregón #54',
    city: 'Carboneras, Tepezalá, Aguascalientes',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Alvaro+Obregon+54+Carboneras+Tepezala+Aguascalientes',
    calendarUrl:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda%20civil%20de%20Lesly%20%26%20Rogelio&dates=20261221T230000Z/20261222T040000Z&details=Boda%20civil%205%3A00%20p.%20m.%20%C2%B7%20Casa%20del%20novio&location=%C3%81lvaro%20Obreg%C3%B3n%2054%2C%20Carboneras%2C%20Tepezal%C3%A1%2C%20Aguascalientes',
    note: 'La casa está sobre la calle Álvaro Obregón, en el corazón de Carboneras. Si necesitas apoyo con la ubicación, escríbenos.',
  },
  audio: {
    src: '/audio/simplemente-gracias.mp3',
    title: 'Simplemente Gracias',
    artist: 'Rubén Montañez',
  },
  celebration: {
    label: 'Boda civil',
    time: '5:00 p.\u00A0m.',
  },
  schedule: [
    { time: '4:50', label: 'Llegada' },
    { time: '5:00', label: 'Boda civil' },
  ],
  dayNote:
    'Te pedimos llegar unos minutos antes: la ceremonia civil comenzará puntual.',
  story: [
    {
      year: '2018',
      title: 'El primer café',
      text: 'Una mesa compartida, una conversación que no quería terminar y la sensación de haber encontrado algo que no sabíamos que buscábamos.',
    },
    {
      year: '2022',
      title: 'El viaje',
      text: 'Entre maletas, planes improvisados y atardeceres nuevos, aprendimos que cualquier lugar se siente como casa cuando estamos juntos.',
    },
    {
      year: '2025',
      title: 'La promesa',
      text: 'Un sí dicho en voz baja, con la certeza de que queremos seguir escribiendo esta historia el resto de la vida.',
    },
  ],
  rsvp: {
    deadlineLabel: '1 de diciembre de 2026',
    whatsappNumber: '520000000000',
    whatsappDisplay: '+52 00 0000 0000',
    maxGuests: 4,
    note: 'Tu respuesta nos ayuda a cuidar cada detalle. Confirma antes del 1 de diciembre de 2026.',
  },
  gifts: {
    title: 'Lluvia de sobres',
    text: 'Su presencia es nuestro mayor regalo. Si desean tener un detalle, encontrarán un buzón de sobres en la celebración.',
  },
  seo: {
    title: 'Lesly & Rogelio · Boda civil',
    description:
      'Lesly y Rogelio te invitan a celebrar su boda civil el lunes 21 de diciembre de 2026 a las 5:00 p.\u00A0m. en Carboneras, Tepezalá, Aguascalientes.',
  },
};
