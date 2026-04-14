export interface Persona {
  id: string;      // El slug para la URL (ej: "tresillo")
  nombre: string;
  avatar: string;
}

export interface Reportaje {
  id: number;
  titulo: string;
  resumen: string;
  imagenUrl: string;
  layout: "stats" | "frase" | "simple";
  signed: Persona[]; 
  section: "TV" | "Records" | "Dev" | "Mag"; 
  collection?: string;
  impacto?: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  cita?: string;
}

// --- CONSTANTES DE PERSONAS ---
const personaTresillo: Persona = { 
  id: "tresillo", 
  nombre: "tresillo", 
  avatar: "https://i.postimg.cc/qqs054ct/tresillo.jpg" 
};

const personaKurto: Persona = { 
  id: "kurto", 
  nombre: "kurto", 
  avatar: "https://i.postimg.cc/0Nhs5bcd/kurto.jpg" 
};

const personaDario: Persona = { 
  id: "dario", 
  nombre: "dario", 
  avatar: "https://i.postimg.cc/nLXxtvYC/dario.jpg" 
};

export const misReportajes: Reportaje[] = [
  {
    id: 9,
    titulo: "Cobbleverso",
    resumen: "Crónica detallada sobre el servidor que unificó a la comunidad bajo un mismo cielo de bloques.",
    imagenUrl: "https://i.postimg.cc/HxC6tyzT/missingtexture.jpg",
    layout: "simple",
    signed: [personaTresillo],
    section: "Dev",
    collection: "SQU_AD"
  },
  {
    id: 8,
    titulo: "Cursed Wrapped",
    resumen: "El análisis de datos más oscuro de la plataforma: lo que tus hábitos de escucha dicen de ti.",
    imagenUrl: "https://i.postimg.cc/HxC6tyzT/missingtexture.jpg",
    layout: "simple",
    signed: [personaTresillo],
    section: "Dev"
  },
  {
    id: 7,
    titulo: "Detención de Nicolás Maduro",
    resumen: "Crónica de los eventos y la repercusión internacional tras la noticia que paralizó al mundo.",
    imagenUrl: "https://i.postimg.cc/442KRGtt/nicolasmaduro.png",
    layout: "stats",
    signed: [personaTresillo],
    section: "Mag",
    impacto: { views: 2450000, likes: 90000, comments: 750, shares: 200000 }
  },
  {
    id: 6,
    titulo: "Tapped in the underground",
    resumen: "Cobertura de las tendencias en alza en el género urbano.",
    imagenUrl: "https://i.postimg.cc/0jKKHXV3/esdeekid.png",
    layout: "stats",
    signed: [personaTresillo],
    section: "Mag",
    impacto: { views: 750000, likes: 22500, comments: 130, shares: 3500 }
  },
  {
    id: 5,
    titulo: "Los 10 españoles con más aura de 2025",
    resumen: "Reportaje repasando el top 10 de españoles que han farmeado más aura a lo largo de este año.",
    imagenUrl: "https://i.postimg.cc/7Lj74yjg/jesusgil.png",
    layout: "stats",
    signed: [personaTresillo],
    section: "Mag",
    impacto: { views: 460000, likes: 16000, comments: 110, shares: 7000 }
  },
  {
    id: 4,
    titulo: "Game Night: Chained Together",
    resumen: "Cuatro perspectivas, una cadena y el descenso absoluto a la desesperación cooperativa.",
    imagenUrl: "https://i.postimg.cc/HxC6tyzT/missingtexture.jpg",
    layout: "frase",
    signed: [personaDario, personaKurto, personaTresillo],
    section: "TV",
    cita: "Si uno cae, todos bajamos al infierno."
  },
  {
    id: 3,
    titulo: "Game Night: Fortnite Simpson",
    resumen: "Análisis técnico y narrativo de la noche en la que Springfield invadió el Battle Royale.",
    imagenUrl: "https://i.postimg.cc/HxC6tyzT/missingtexture.jpg",
    layout: "simple",
    signed: [personaDario, personaKurto, personaTresillo],
    section: "TV"
  },
  {
    id: 2,
    titulo: "Rosalía o la Biblia",
    resumen: "Un estudio sobre la lírica contemporánea frente a los textos clásicos. ¿Sabrías distinguir el autor?",
    imagenUrl: "https://i.postimg.cc/HxC6tyzT/missingtexture.jpg",
    layout: "simple",
    signed: [personaKurto, personaTresillo],
    section: "Dev",
    collection: "Cultura"
  },
  {
    id: 1,
    titulo: "Pasapalabro",
    resumen: "El formato que puso a prueba el léxico y los nervios de la emisión en directo.",
    imagenUrl: "https://i.postimg.cc/HxC6tyzT/missingtexture.jpg",
    layout: "simple",
    signed: [personaTresillo],
    section: "TV"
  }
];