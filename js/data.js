/**
 * REFLEJO CREATIVO (Archetype // El Trazo Interno)
 * Base de Datos Maestra: 11 Carreras Universitarias, 18 Artistas, 10 Preguntas y 20 Registros Semilla (Mock Data)
 */

window.ACADEMIC_PROGRAMS = [
  "Ingeniería de Software",
  "Ingeniería en Ciencia de Datos",
  "Ingeniería Industrial",
  "Ingeniería Mecatrónica",
  "Diseño Visual Digital",
  "Publicidad Digital y Mercadeo",
  "Marketing",
  "Negocios Digitales",
  "Administración de Empresas",
  "Negocios Internacionales",
  "Contaduría Pública"
];

window.GENDER_OPTIONS = [
  "Femenino",
  "Masculino",
  "No binario",
  "Prefiero no decirlo"
];

window.ARTISTS = [
  {
    id: 1,
    slug: "vincent-van-gogh",
    name: "Vincent van Gogh",
    displayFirstName: "Vincent",
    displayLastName: "Van Gogh",
    lifespan: "1853 — 1890",
    style: "Postimpresionismo / Trazo emocional",
    archetype: "El Visionario Intenso",
    description: "Pasional, empático, ves el mundo con extrema sensibilidad y expresas tus emociones sin filtro. Vives y creas como actos de entrega absoluta, buscando hacer visible el latido emocional de cada paisaje y de cada vínculo humano.",
    color: "#1D4E89",
    portrait: "assets/artists/vincent-van-gogh.jpeg",
    artworks: [
      {
        title: "La noche estrellada",
        year: "1889",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "73.7 CM × 92.1 CM",
        image: "assets/artworks/vincent-van-gogh/obra-1.jpeg",
        history: "Pintada desde la ventana de su asilo en Saint-Rémy-de-Provence, transforma la turbulencia nocturna en un cosmos vivo donde el trazo en espiral revela la intensidad psíquica del artista."
      },
      {
        title: "Los girasoles",
        year: "1888",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "92.1 CM × 73 CM",
        image: "assets/artworks/vincent-van-gogh/obra-2.jpeg",
        history: "Creada en Arlés para decorar la habitación de Paul Gauguin, celebra la gratitud y la energía vital mediante una sinfonía cromática de amarillos cadmio y ocres vibrantes."
      },
      {
        title: "Autorretrato con sombrero de fieltro",
        year: "1887",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "44 CM × 37.5 CM",
        image: "assets/artworks/vincent-van-gogh/obra-3.jpeg",
        history: "Pinceladas rítmicas y radiales construyen un rostro introspectivo que explora la teoría del color complementario como espejo directo del alma."
      }
    ]
  },
  {
    id: 2,
    slug: "piet-mondrian",
    name: "Piet Mondrian",
    displayFirstName: "Piet",
    displayLastName: "Mondrian",
    lifespan: "1872 — 1944",
    style: "Neoplasticismo / Geométrico",
    archetype: "El Analítico Estructurado",
    description: "Buscas el orden en el caos, amas la claridad, la lógica visual y la simplicidad esencial. Posees una mente arquitectónica capaz de destilar lo complejo hasta encontrar su estructura pura y armonía universal.",
    color: "#D62828",
    portrait: "assets/artists/piet-mondrian.jpeg",
    artworks: [
      {
        title: "Composición en rojo, amarillo, azul y negro",
        year: "1921",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "59.5 CM × 59.5 CM",
        image: "assets/artworks/piet-mondrian/obra-1.jpeg",
        history: "Manifiesto visual del grupo De Stijl donde la realidad natural se abstrae hasta sus fuerzas fundamentales: líneas ortogonales negras y planos puros de color primario."
      },
      {
        title: "Broadway Boogie Woogie",
        year: "1943",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "127 CM × 127 CM",
        image: "assets/artworks/piet-mondrian/obra-2.jpeg",
        history: "Su obra maestra final en Nueva York sustituye las líneas negras por secuencias pulsantes inspiradas en la retícula urbana de Manhattan y el ritmo sincopado del jazz."
      },
      {
        title: "Composición II en rojo, azul y amarillo",
        year: "1930",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "46 CM × 46 CM",
        image: "assets/artworks/piet-mondrian/obra-3.jpeg",
        history: "Equilibrio asimétrico perfecto donde un gran cuadrado rojo dialoga con la serenidad del blanco y acentos medidos en azul y amarillo."
      }
    ]
  },
  {
    id: 3,
    slug: "claude-monet",
    name: "Claude Monet",
    displayFirstName: "Claude",
    displayLastName: "Monet",
    lifespan: "1840 — 1926",
    style: "Impresionismo / Luz y atmósfera",
    archetype: "El Observador Presente",
    description: "Contemplativo, paciente, te enfocas en los matices del momento y en cómo cambian las cosas con el tiempo. Estás conectado con la serenidad y la luz orgánica, deteniéndote a contemplar la belleza fugaz que otros pasan por alto.",
    color: "#588157",
    portrait: "assets/artists/claude-monet.jpeg",
    artworks: [
      {
        title: "Impresión, sol naciente",
        year: "1872",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "48 CM × 63 CM",
        image: "assets/artworks/claude-monet/obra-1.jpeg",
        history: "La pintura del puerto de Le Havre al amanecer que dio nombre al movimiento impresionista, priorizando la vibración atmosférica de la niebla y el reflejo solar."
      },
      {
        title: "Los nenúfares (Nymphéas)",
        year: "1916",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "200 CM × 200 CM",
        image: "assets/artworks/claude-monet/obra-2.jpeg",
        history: "En su jardín acuático de Giverny, Monet elimina el horizonte para sumergir al espectador en un espejo infinito de agua, cielo y flora flotante."
      },
      {
        title: "Mujer con sombrilla",
        year: "1875",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "100 CM × 81 CM",
        image: "assets/artworks/claude-monet/obra-3.jpeg",
        history: "Retrato al aire libre de Camille Monet y su hijo Jean donde el viento y el contraluz se vuelven casi palpables gracias a pinceladas sueltas y luminosas."
      }
    ]
  },
  {
    id: 4,
    slug: "salvador-dali",
    name: "Salvador Dalí",
    displayFirstName: "Salvador",
    displayLastName: "Dalí",
    lifespan: "1904 — 1989",
    style: "Surrealismo",
    archetype: "El Soñador Disruptivo",
    description: "Imaginación sin límites, inconformista, te atrae lo inusual y cuestionas la realidad establecida. Transformas los sueños y el subconsciente en un escenario propio donde las reglas del tiempo y la lógica se doblan.",
    color: "#C98A27",
    portrait: "assets/artists/salvador-dali.jpeg",
    artworks: [
      {
        title: "La persistencia de la memoria",
        year: "1931",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "24 CM × 33 CM",
        image: "assets/artworks/salvador-dali/obra-1.jpeg",
        history: "Los icónicos relojes blandos derritiéndose sobre la costa de Portlligat desafían la rigidez del tiempo físico frente a la relatividad de la memoria y el sueño."
      },
      {
        title: "Sueño causado por el vuelo de una abeja...",
        year: "1944",
        medium: "ÓLEO SOBRE TABLA",
        dimensions: "51 CM × 41 CM",
        image: "assets/artworks/salvador-dali/obra-2.jpeg",
        history: "Ilustración del método paranoico-crítico donde un estímulo sonoro externo desencadena una cadena instantánea de imágenes oníricas suspendidas en el aire."
      },
      {
        title: "Cisnes reflejando elefantes",
        year: "1937",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "51 CM × 77 CM",
        image: "assets/artworks/salvador-dali/obra-3.jpeg",
        history: "Imagen doble magistral donde los cisnes y árboles desnudos del lago se invierten en el agua para formar siluetas monumentales de elefantes."
      }
    ]
  },
  {
    id: 5,
    slug: "frida-kahlo",
    name: "Frida Kahlo",
    displayFirstName: "Frida",
    displayLastName: "Kahlo",
    lifespan: "1907 — 1954",
    style: "Simbolismo / Expresionismo personal",
    archetype: "El Espíritu Introspectivo",
    description: "Resiliente, auténtico, transformas tus experiencias personales y heridas en identidad y arte visual. No temes habitar tu vulnerabilidad, convirtiendo tu biografía y tus raíces en un lenguaje simbólico profundamente honesto.",
    color: "#9E2A2B",
    portrait: "assets/artists/frida-kahlo.jpeg",
    artworks: [
      {
        title: "Las dos Fridas",
        year: "1939",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "173.5 CM × 173 CM",
        image: "assets/artworks/frida-kahlo/obra-1.jpeg",
        history: "Un autorretrato doble monumental que explora la dualidad de su herencia mestiza e indígena unidas por una arteria expuesta y dos corazones."
      },
      {
        title: "La columna rota",
        year: "1944",
        medium: "ÓLEO SOBRE MASONITA",
        dimensions: "40 CM × 30.5 CM",
        image: "assets/artworks/frida-kahlo/obra-2.jpeg",
        history: "Símbolo de resiliencia extrema donde su columna vertebral es reemplazada por un pilar jónico fracturado mientras su mirada permanece firme e indoblegable."
      },
      {
        title: "Autorretrato con collar de espinas y colibrí",
        year: "1940",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "61.2 CM × 47 CM",
        image: "assets/artworks/frida-kahlo/obra-3.jpeg",
        history: "Rodeada de naturaleza exuberante, un mono y un gato negro, transforma símbolos de dolor y esperanza amorosa en un icono de dignidad serena."
      }
    ]
  },
  {
    id: 6,
    slug: "mark-rothko",
    name: "Mark Rothko",
    displayFirstName: "Mark",
    displayLastName: "Rothko",
    lifespan: "1903 — 1970",
    style: "Color Field / Abstracción pura",
    archetype: "El Místico Profundo",
    description: "Buscas conexiones espirituales y emocionales puras; prefieres el silencio y las emociones intensas sin rodeos. Te conmueven las atmósferas envolventes, la quietud meditativa y el poder del color para tocar lo sublime.",
    color: "#6B1D2F",
    portrait: "assets/artists/mark-rothko.jpeg",
    artworks: [
      {
        title: "No. 61 (Rust and Blue)",
        year: "1953",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "292.7 CM × 233.7 CM",
        image: "assets/artworks/mark-rothko/obra-1.jpeg",
        history: "Campos rectangulares de óxido profundo y azul crepuscular que parecen respirar y flotar mediante veladuras translúcidas de pigmento."
      },
      {
        title: "Orange and Yellow",
        year: "1956",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "231.1 CM × 180.3 CM",
        image: "assets/artworks/mark-rothko/obra-2.jpeg",
        history: "Un umbral luminoso de fuego cálido concebido para envolver el campo visual del espectador y despertar una experiencia trascendental."
      },
      {
        title: "Black on Maroon",
        year: "1958",
        medium: "ÓLEO Y ACRÍLICO SOBRE LIENZO",
        dimensions: "266.7 CM × 381.2 CM",
        image: "assets/artworks/mark-rothko/obra-3.jpeg",
        history: "Parte de los murales Seagram, donde los tonos borgoña oscuros y formas arquitectónicas invitan al recogimiento interior y al silencio absoluto."
      }
    ]
  },
  {
    id: 7,
    slug: "jean-michel-basquiat",
    name: "Jean-Michel Basquiat",
    displayFirstName: "Jean-Michel",
    displayLastName: "Basquiat",
    lifespan: "1960 — 1988",
    style: "Neoexpresionismo / Arte urbano",
    archetype: "El Disruptivo Genial",
    description: "Intuitivo, eléctrico, posees una urgencia expresiva inmensa; mezclas referencias culturales diversas y transformas tus vivencias en un lenguaje visual crudo, veloz, auténtico y rebelde.",
    color: "#E09F3E",
    portrait: "assets/artists/jean-michel-basquiat.jpeg",
    artworks: [
      {
        title: "Untitled (Skull)",
        year: "1981",
        medium: "ACRÍLICO Y CRAYÓN DE ÓLEO",
        dimensions: "207 CM × 175.9 CM",
        image: "assets/artworks/jean-michel-basquiat/obra-1.jpeg",
        history: "Una cabeza radiográfica entre la vida y la muerte que fusiona anatomía, graffiti neoyorquino y una energía cromática explosiva."
      },
      {
        title: "Hollywood Africans",
        year: "1983",
        medium: "ACRÍLICO Y BARRA DE ÓLEO",
        dimensions: "213.4 CM × 213.4 CM",
        image: "assets/artworks/jean-michel-basquiat/obra-2.jpeg",
        history: "Sobre un fondo amarillo eléctrico, palabras tachadas, coronas y símbolos cuestionan los estereotipos raciales en la industria del entretenimiento."
      },
      {
        title: "Riding with Death",
        year: "1988",
        medium: "ACRÍLICO Y CRAYÓN SOBRE LIENZO",
        dimensions: "249 CM × 289.5 CM",
        image: "assets/artworks/jean-michel-basquiat/obra-3.jpeg",
        history: "Una de sus obras finales más sobrecogedoras y minimalistas, donde una figura cabalga un esqueleto sobre un campo terroso despojado de artificios."
      }
    ]
  },
  {
    id: 8,
    slug: "francisco-de-goya",
    name: "Francisco de Goya",
    displayFirstName: "Francisco",
    displayLastName: "de Goya",
    lifespan: "1746 — 1828",
    style: "Romanticismo / Neoclasicismo",
    archetype: "El Crítico Introspectivo",
    description: "Observador profundo de las contradicciones humanas, de la sombra y la luz. Posees una mirada lúcida y crítica que desconfía de las apariencias superficiales e indaga sin miedo en la verdad psicológica del alma.",
    color: "#3D352E",
    portrait: "assets/artists/francisco-de-goya.jpeg",
    artworks: [
      {
        title: "El sueño de la razón produce monstruos",
        year: "1799",
        medium: "AGUAFUERTE Y AGUATINTA",
        dimensions: "21.5 CM × 15 CM",
        image: "assets/artworks/francisco-de-goya/obra-1.jpeg",
        history: "Estampa número 43 de Los Caprichos donde el artista dormido es asediado por búhos y murciélagos, símbolo de los peligros del fanatismo y la ignorancia."
      },
      {
        title: "El aquelarre",
        year: "1823",
        medium: "ÓLEO AL SECO SOBRE MURO",
        dimensions: "140 CM × 438 CM",
        image: "assets/artworks/francisco-de-goya/obra-2.jpeg",
        history: "Parte de las Pinturas Negras de la Quinta del Sordo, un estudio tenebrista magistral sobre la psicología de las masas y el miedo colectivo."
      },
      {
        title: "El 3 de mayo en Madrid",
        year: "1814",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "268 CM × 347 CM",
        image: "assets/artworks/francisco-de-goya/obra-3.jpeg",
        history: "Revolucionó la pintura histórica al iluminar con un farol dramático la dignidad humana de las víctimas frente a la maquinaria anónima de la violencia."
      }
    ]
  },
  {
    id: 9,
    slug: "francis-bacon",
    name: "Francis Bacon",
    displayFirstName: "Francis",
    displayLastName: "Bacon",
    lifespan: "1909 — 1992",
    style: "Figuración contemporánea / Visceral",
    archetype: "El Diseccionador de Emociones",
    description: "Introspectivo, audaz y profundamente honesto; no temes mirar de frente las contradicciones humanas, la vulnerabilidad y la intensidad cruda de la existencia. Prefieres la emoción desnuda antes que el consuelo estético.",
    color: "#78290F",
    portrait: "assets/artists/francis-bacon.jpeg",
    artworks: [
      {
        title: "Tres estudios para figuras en la base de una crucifixión",
        year: "1944",
        medium: "ÓLEO Y PASTEL SOBRE TABLA",
        dimensions: "94 CM × 74 CM (C/U)",
        image: "assets/artworks/francis-bacon/obra-1.jpeg",
        history: "Un tríptico visceral sobre fondo naranja incandescente que canaliza la angustia existencial de mediados del siglo XX con fuerza anatómica."
      },
      {
        title: "Estudio según el retrato del papa Inocencio X",
        year: "1953",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "153 CM × 118 CM",
        image: "assets/artworks/francis-bacon/obra-2.jpeg",
        history: "Reinterpretación del retrato de Velázquez donde el poder solemne se fractura en un grito silencioso encerrado dentro de una estructura espacial dorada."
      },
      {
        title: "Autorretrato",
        year: "1971",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "35.5 CM × 30.5 CM",
        image: "assets/artworks/francis-bacon/obra-3.jpeg",
        history: "Trazos gestuales deforman el rostro para capturar no la apariencia estática, sino el movimiento nervioso y el paso implacable del tiempo."
      }
    ]
  },
  {
    id: 10,
    slug: "el-bosco",
    name: "El Bosco",
    displayFirstName: "Hieronymus",
    displayLastName: "Bosch",
    lifespan: "1450 — 1516",
    style: "Gótico tardío / Renacimiento",
    archetype: "El Visionario Enigmático",
    description: "Fascinado por los mundos oníricos, los enigmas visuales y la constante tensión entre la razón y el subconsciente. Posees una mente curiosa y laberíntica que disfruta descifrando símbolos ocultos y paradojas.",
    color: "#386641",
    portrait: "assets/artists/el-bosco.jpeg",
    artworks: [
      {
        title: "El jardín de las delicias",
        year: "1500–1505",
        medium: "ÓLEO SOBRE TABLA DE ROBLE",
        dimensions: "220 CM × 389 CM",
        image: "assets/artworks/el-bosco/obra-1.jpeg",
        history: "Un universo enciclopédico de alquimia, deseo y arquitectura fantástica que sigue desafiando a historiadores y soñadores cinco siglos después."
      },
      {
        title: "El carro de heno",
        year: "1516",
        medium: "ÓLEO SOBRE TABLA",
        dimensions: "135 CM × 190 CM",
        image: "assets/artworks/el-bosco/obra-2.jpeg",
        history: "Alegoría satírica y minuciosa sobre la fugacidad de las ambiciones materiales, con un paisaje atmosférico de extraordinaria modernidad."
      },
      {
        title: "Las tentaciones de San Antonio",
        year: "1501",
        medium: "ÓLEO SOBRE TABLA",
        dimensions: "131.5 CM × 225 CM",
        image: "assets/artworks/el-bosco/obra-3.jpeg",
        history: "Criaturas híbridas, máquinas imposibles y visiones nocturnas rodean la quietud meditativa del ermitaño en medio de una ciudad en llamas."
      }
    ]
  },
  {
    id: 11,
    slug: "simone-martini",
    name: "Simone Martini",
    displayFirstName: "Simone",
    displayLastName: "Martini",
    lifespan: "1284 — 1344",
    style: "Gótico internacional / Escuela sienesa",
    archetype: "El Poeta de la Elegancia",
    description: "Sensible, lírico y refinado; encuentras la belleza en la armonía sutil, el gesto delicado y la narrativa simbólica. Tu mente conecta la tradición con una expresividad íntima, dorada y luminosa.",
    color: "#B5838D",
    portrait: "assets/artists/simone-martini.jpeg",
    artworks: [
      {
        title: "La Anunciación con Santa Margarita y San Ansano",
        year: "1333",
        medium: "TEMPLE Y ORO SOBRE TABLA",
        dimensions: "265 CM × 305 CM",
        image: "assets/artworks/simone-martini/obra-1.jpeg",
        history: "Cumbre de la elegancia lineal sienesa donde el fulgor del pan de oro bruñido enmarca la coreografía espiritual entre el ángel y la Virgen."
      },
      {
        title: "Maestà del Palazzo Pubblico de Siena",
        year: "1315",
        medium: "FRESCO Y DETALLES EN ORO",
        dimensions: "763 CM × 970 CM",
        image: "assets/artworks/simone-martini/obra-2.jpeg",
        history: "Mural cívico monumental bajo un baldaquino de seda que combina esplendor cortesano, rostros individualizados y poesía cromática."
      },
      {
        title: "Guidoriccio da Fogliano",
        year: "1330",
        medium: "FRESCO MURAL",
        dimensions: "340 CM × 968 CM",
        image: "assets/artworks/simone-martini/obra-3.jpeg",
        history: "El jinete avanza en soledad heráldica a través de un paisaje fortificado bajo un cielo azul ultramar de quietud atemporal."
      }
    ]
  },
  {
    id: 12,
    slug: "giotto-di-bondone",
    name: "Giotto di Bondone",
    displayFirstName: "Giotto",
    displayLastName: "di Bondone",
    lifespan: "1267 — 1337",
    style: "Proto-renacimiento / Gótico temprano",
    archetype: "El Pionero Humano",
    description: "Buscas la verdad esencial en las expresiones, valoras los cimientos sólidos y la empatía directa por encima de los aderezos superficiales. Combinas el amor por la estructura clara con una profunda calidez humana.",
    color: "#355070",
    portrait: "assets/artists/giotto-di-bondone.jpeg",
    artworks: [
      {
        title: "La lamentación sobre Cristo muerto",
        year: "1305",
        medium: "FRESCO (CAPILLA SCROVEGNI)",
        dimensions: "200 CM × 185 CM",
        image: "assets/artworks/giotto-di-bondone/obra-1.jpeg",
        history: "Una diagonal rocosa conduce la mirada directamente al epicentro del duelo humano mientras los ángeles en el cielo expresan un dolor nunca antes pintado."
      },
      {
        title: "El beso de Judas",
        year: "1306",
        medium: "FRESCO MURAL",
        dimensions: "200 CM × 185 CM",
        image: "assets/artworks/giotto-di-bondone/obra-2.jpeg",
        history: "El manto amarillo envuelve el instante dramático del encuentro frontal de dos miradas donde se condensa toda la psicología del drama."
      },
      {
        title: "San Francisco predicando a los pájaros",
        year: "1297",
        medium: "FRESCO (BASÍLICA DE ASÍS)",
        dimensions: "270 CM × 230 CM",
        image: "assets/artworks/giotto-di-bondone/obra-3.jpeg",
        history: "Un gesto de ternura y equilibrio arquitectónico que inaugura la observación empática de la naturaleza en la pintura occidental."
      }
    ]
  },
  {
    id: 13,
    slug: "jan-van-eyck",
    name: "Jan van Eyck",
    displayFirstName: "Jan",
    displayLastName: "van Eyck",
    lifespan: "1390 — 1441",
    style: "Primitivo Flamenco",
    archetype: "El Detallista Minucioso",
    description: "Perfeccionista observador; encuentras valor en la precisión técnica, el simbolismo sutil y los detalles que otros pasan por alto. Para tu mirada metódica, cada reflejo y micro-decisión encierra una verdad completa.",
    color: "#283618",
    portrait: "assets/artists/jan-van-eyck.jpeg",
    artworks: [
      {
        title: "El matrimonio Arnolfini",
        year: "1434",
        medium: "ÓLEO SOBRE TABLA DE ROBLE",
        dimensions: "82.2 CM × 60 CM",
        image: "assets/artworks/jan-van-eyck/obra-1.jpeg",
        history: "Prodigio óptico del óleo flamenco donde el espejo convexo del fondo refleja la habitación entera y la firma caligráfica del propio pintor."
      },
      {
        title: "El Políptico de Gante",
        year: "1432",
        medium: "ÓLEO SOBRE TABLA",
        dimensions: "350 CM × 461 CM",
        image: "assets/artworks/jan-van-eyck/obra-2.jpeg",
        history: "Monumento del arte europeo donde joyas, brocados, botánica y luz atmosférica alcanzan una precisión microscópica y telescópica a la vez."
      },
      {
        title: "Hombre con turbante rojo",
        year: "1433",
        medium: "ÓLEO SOBRE TABLA",
        dimensions: "25.5 CM × 19 CM",
        image: "assets/artworks/jan-van-eyck/obra-3.jpeg",
        history: "Considerado su autorretrato, sostiene la mirada del espectador con lucidez serena bajo los pliegues escultóricos del chaperón escarlata."
      }
    ]
  },
  {
    id: 14,
    slug: "yayoi-kusama",
    name: "Yayoi Kusama",
    displayFirstName: "Yayoi",
    displayLastName: "Kusama",
    lifespan: "1929 — Presente",
    style: "Arte contemporáneo / Psicodélico",
    archetype: "El Infinito Obsesivo",
    description: "Canalizas tus mundos internos y repeticiones mentales en patrones visuales expansivos que envuelven el entorno. Posees una energía hipnótica capaz de transformar la intensidad psíquica en universos inmersivos y vibrantes.",
    color: "#D90429",
    portrait: "assets/artists/yayoi-kusama.jpeg",
    artworks: [
      {
        title: "Infinity Mirror Room — Phalli's Field",
        year: "1965",
        medium: "INSTALACIÓN DE ESPEJOS Y TELA",
        dimensions: "ESPACIO INMERSIVO",
        image: "assets/artworks/yayoi-kusama/obra-1.jpeg",
        history: "Pionera de las salas de espejos infinitos donde lunares rojos y blancos se multiplican sin fin, disolviendo las fronteras del espacio físico."
      },
      {
        title: "Pumpkin (Calabaza amarilla)",
        year: "1994",
        medium: "ACRÍLICO / ESCULTURA ICÓNICA",
        dimensions: "200 CM × 250 CM",
        image: "assets/artworks/yayoi-kusama/obra-2.jpeg",
        history: "Su emblema orgánico más famoso: redes hipnóticas de puntos negros graduados que otorgan volumen escultórico y magnetismo visual."
      },
      {
        title: "Narcissus Garden",
        year: "1966",
        medium: "1500 ESFERAS ESPEJADAS",
        dimensions: "INSTALACIÓN VARIABLE",
        image: "assets/artworks/yayoi-kusama/obra-3.jpeg",
        history: "Presentada originalmente en la Bienal de Venecia, una alfombra cinética de esferas reflectantes que fragmenta el paisaje y al propio observador."
      }
    ]
  },
  {
    id: 15,
    slug: "david-hockney",
    name: "David Hockney",
    displayFirstName: "David",
    displayLastName: "Hockney",
    lifespan: "1937 — Presente",
    style: "Pop Art / Figurativo contemporáneo",
    archetype: "El Observador Luminoso",
    description: "Vitalista y versátil; estudias la luz, los espacios cotidianos y te adaptas con soltura a los nuevos medios digitales de expresión. Tienes una mirada fresca y optimista que celebra el color del presente.",
    color: "#0077B6",
    portrait: "assets/artists/david-hockney.jpeg",
    artworks: [
      {
        title: "A Bigger Splash",
        year: "1967",
        medium: "ACRÍLICO SOBRE LIENZO",
        dimensions: "242.5 CM × 243.9 CM",
        image: "assets/artworks/david-hockney/obra-1.jpeg",
        history: "La quietud geométrica de la arquitectura californiana rota por la espuma blanca de una zambullida pintada con paciencia milimétrica."
      },
      {
        title: "Portrait of an Artist (Pool with Two Figures)",
        year: "1972",
        medium: "ACRÍLICO SOBRE LIENZO",
        dimensions: "213.5 CM × 305 CM",
        image: "assets/artworks/david-hockney/obra-2.jpeg",
        history: "Diálogo silencioso entre una figura al borde de la piscina y un nadador sumergido bajo los reflejos ondulantes del agua turquesa."
      },
      {
        title: "Pearblossom Highway",
        year: "1986",
        medium: "COLLAGE FOTOGRÁFICO",
        dimensions: "181.6 CM × 271.8 CM",
        image: "assets/artworks/david-hockney/obra-3.jpeg",
        history: "Compuesto por más de 700 fotografías instantáneas que rompen la perspectiva única para recrear cómo se mueve realmente el ojo humano."
      }
    ]
  },
  {
    id: 16,
    slug: "banksy",
    name: "Banksy",
    displayFirstName: "Banksy",
    displayLastName: "Street Art",
    lifespan: "1974 — Presente",
    style: "Street Art / Arte urbano subversivo",
    archetype: "El Provocador Irónico",
    description: "Agudo e inconforme; utilizas el ingenio gráfico directo y la síntesis visual para cuestionar el entorno social mediante la sátira, el contraste político y la intervención en el espacio público.",
    color: "#2B2D42",
    portrait: "assets/artists/banksy.jpeg",
    artworks: [
      {
        title: "Girl with Balloon",
        year: "2002",
        medium: "ESTARCIDO (STENCIL) Y AEROSOL",
        dimensions: "INTERVENCIÓN MURAL",
        image: "assets/artworks/banksy/obra-1.jpeg",
        history: "Poética visual inmediata en blanco, negro y rojo sobre el muro urbano que recuerda que siempre queda esperanza al alcance de la mano."
      },
      {
        title: "Flower Thrower (Love is in the Air)",
        year: "2003",
        medium: "ESTARCIDO Y AEROSOL",
        dimensions: "INTERVENCIÓN URBANA",
        image: "assets/artworks/banksy/obra-2.jpeg",
        history: "Subversión pacifista donde la postura tensa de un manifestante se transforma al sustituir el proyectil por un ramo de flores a color."
      },
      {
        title: "Devolved Parliament",
        year: "2009",
        medium: "ÓLEO SOBRE LIENZO",
        dimensions: "276 CM × 446 CM",
        image: "assets/artworks/banksy/obra-3.jpeg",
        history: "Sátira monumental en técnica académica tradicional que reemplaza a los parlamentarios de la Cámara de los Comunes por chimpancés."
      }
    ]
  },
  {
    id: 17,
    slug: "njideka-akunyili-crosby",
    name: "Njideka Akunyili Crosby",
    displayFirstName: "Njideka",
    displayLastName: "Akunyili Crosby",
    lifespan: "1983 — Presente",
    style: "Pintura contemporánea mixta",
    archetype: "El Tejedor de Mundos",
    description: "Íntimo y multicultural; encuentras tu lenguaje en la intersección de historias personalizadas, capas de textura e identidades compuestas que entrelazan la memoria doméstica con la calma contemplativa.",
    color: "#6D597A",
    portrait: "assets/artists/njideka-akunyili-crosby.jpeg",
    artworks: [
      {
        title: "Dwell: Aso Ebi",
        year: "2017",
        medium: "ACRÍLICO, TRANSFERENCIA Y COLLAGE",
        dimensions: "213.4 CM × 221 CM",
        image: "assets/artworks/njideka-akunyili-crosby/obra-1.jpeg",
        history: "Un interior doméstico íntimo donde los tejidos llenos de fotografías transferidas conectan la memoria familiar nigeriana con la diáspora contemporánea."
      },
      {
        title: "Before Now After (Mama, Mummy and Mamma)",
        year: "2015",
        medium: "TÉCNICA MIXTA SOBRE PAPEL",
        dimensions: "213.4 CM × 213.4 CM",
        image: "assets/artworks/njideka-akunyili-crosby/obra-2.jpeg",
        history: "Tres generaciones dialogan a través de objetos cotidianos, álbumes visuales y capas translúcidas que entrelazan pasado y presente."
      },
      {
        title: "The Beautyful Ones",
        year: "2014",
        medium: "ACRÍLICO, LÁPIZ Y TRANSFERENCIA",
        dimensions: "160 CM × 121.9 CM",
        image: "assets/artworks/njideka-akunyili-crosby/obra-3.jpeg",
        history: "Retrato de infancia lleno de ternura, patrones textiles y recortes culturales que celebran la identidad híbrida y la memoria afectiva."
      }
    ]
  },
  {
    id: 18,
    slug: "bartolome-bermejo",
    name: "Bartolomé Bermejo",
    displayFirstName: "Bartolomé",
    displayLastName: "Bermejo",
    lifespan: "1440 — 1501",
    style: "Gótico hispano-flamenco",
    archetype: "El Forjador de Identidad",
    description: "De carácter firme e introspectivo; combinas la exigencia formal con una presencia visual cruda y marcada. Tienes una personalidad sobria, magnética y perfeccionista que no teme al dramatismo de la sombra.",
    color: "#5F0F40",
    portrait: "assets/artists/bartolome-bermejo.jpeg",
    artworks: [
      {
        title: "Piedad Desplà",
        year: "1490",
        medium: "ÓLEO SOBRE TABLA",
        dimensions: "175 CM × 189 CM",
        image: "assets/artworks/bartolome-bermejo/obra-1.jpeg",
        history: "Dramatismo expresivo y paisaje tormentoso repleto de decenas de especies botánicas y animales pintados con virtuosismo flamenco."
      },
      {
        title: "Santo Domingo de Silos entronizado",
        year: "1477",
        medium: "ÓLEO Y ORO SOBRE TABLA",
        dimensions: "242 CM × 130 CM",
        image: "assets/artworks/bartolome-bermejo/obra-2.jpeg",
        history: "Presencia monumental, rostro de realismo severo y fastuoso trabajo en oro relevado que domina el espacio con autoridad silenciosa."
      },
      {
        title: "San Miguel triunfante sobre el demonio",
        year: "1468",
        medium: "ÓLEO Y ORO SOBRE TABLA",
        dimensions: "179.7 CM × 81.9 CM",
        image: "assets/artworks/bartolome-bermejo/obra-3.jpeg",
        history: "El reflejo de la ciudad de Jerusalén sobre la coraza metálica bruñida del arcángel demuestra un dominio técnico del óleo sin precedentes."
      }
    ]
  }
];

window.QUESTIONS = [
  {
    id: 1,
    number: "01",
    title: "El Espacio Habitado",
    prompt: "Elige el escenario donde te gustaría perderte por una hora.",
    ruleText: "Selecciona 1 opción",
    minSelections: 1,
    maxSelections: 1,
    weight: 2.0,
    layout: "grid-2x2-visual",
    options: [
      {
        id: "A",
        label: "Opción A",
        text: "Una habitación minimalista vacía con una sola estructura cúbica metálica flotando en el centro.",
        atmosphere: "Brutalismo arquitectónico, luz cenital fría sobre concreto y acero reflectante.",
        visualImage: "assets/questions/q1-A.jpg",
        visualGradient: "linear-gradient(135deg, #1b2228 0%, #3a4a54 55%, #121518 100%)",
        tags: ["#visceral", "#misterio", "#silencio"],
        artists: ["Francis Bacon", "Mark Rothko", "Yayoi Kusama"]
      },
      {
        id: "B",
        label: "Opción B",
        text: "Un estudio de arquitectura o diseño lleno de planos ordenados y muestras de color primario.",
        atmosphere: "Mesa luminosa con retículas ortogonales, compases y bloques en rojo, azul y amarillo.",
        visualImage: "assets/questions/q1-B.jpeg",
        visualGradient: "linear-gradient(135deg, #213448 0%, #D62828 50%, #F5C742 100%)",
        tags: ["#estructurado", "#geometria", "#precision"],
        artists: ["Piet Mondrian", "David Hockney", "Giotto di Bondone"]
      },
      {
        id: "C",
        label: "Opción C",
        text: "Un gabinete medieval de curiosidades lleno de manuscritos, lupas y frascos de pigmento.",
        atmosphere: "Claroscuro cálido, estanterías de roble antiguo, astrolabios y pigmentos minerales.",
        visualImage: "assets/questions/q1-C.jpeg",
        visualGradient: "linear-gradient(135deg, #283618 0%, #6b4c2b 60%, #1c1611 100%)",
        tags: ["#minucioso", "#onirico", "#simbolico"],
        artists: ["Jan van Eyck", "El Bosco", "Bartolomé Bermejo", "Simone Martini"]
      },
      {
        id: "D",
        label: "Opción D",
        text: "Una calle nocturna de una gran metrópoli cubierta de graffiti y carteles superpuestos.",
        atmosphere: "Asfalto húmedo con reflejos de neón, muros intervenidos con aerosol y street art.",
        visualImage: "assets/questions/q1-D.jpeg",
        visualGradient: "linear-gradient(135deg, #121518 0%, #E09F3E 55%, #9E2A2B 100%)",
        tags: ["#subversivo", "#urgencia", "#caos"],
        artists: ["Jean-Michel Basquiat", "Banksy", "Njideka Akunyili Crosby"]
      }
    ]
  },
  {
    id: 2,
    number: "02",
    title: "Conceptos de Vida",
    prompt: "Elige las 2 duplas de palabras que mejor definan tu proceso creativo y personal.",
    ruleText: "Selecciona exactamente 2 conceptos",
    minSelections: 2,
    maxSelections: 2,
    weight: 2.0,
    layout: "list-cards",
    options: [
      {
        id: "A",
        title: "Estructura / Geometría",
        text: "El orden oculto y la proporción detrás de todas las cosas.",
        tags: ["#estructurado", "#geometria"],
        artists: ["Piet Mondrian", "Giotto di Bondone", "Mark Rothko"]
      },
      {
        id: "B",
        title: "Caos / Pasión",
        text: "La urgencia visceral de sentir y plasmar sin filtros.",
        tags: ["#visceral", "#emocional", "#urgencia"],
        artists: ["Vincent van Gogh", "Jean-Michel Basquiat", "Francis Bacon", "Frida Kahlo"]
      },
      {
        id: "C",
        title: "Detalle / Calma",
        text: "La paciencia metódica donde habita la perfección técnica.",
        tags: ["#minucioso", "#precision"],
        artists: ["Jan van Eyck", "Simone Martini", "Bartolomé Bermejo", "Njideka Akunyili Crosby"]
      },
      {
        id: "D",
        title: "Luz / Momento",
        text: "La captura sensible del instante fugaz y la atmósfera.",
        tags: ["#atmosferico", "#luminoso"],
        artists: ["Claude Monet", "David Hockney"]
      },
      {
        id: "E",
        title: "Misterio / Sueños",
        text: "Los mundos simbólicos que despiertan cuando la razón duerme.",
        tags: ["#onirico", "#subconsciente"],
        artists: ["Salvador Dalí", "El Bosco", "Francisco de Goya", "Yayoi Kusama"]
      }
    ]
  },
  {
    id: 3,
    number: "03",
    title: "Emoción Dominante",
    prompt: "Si tuvieras que elegir una sola palabra ancla que resuene con tu mundo interior hoy, ¿cuál sería?",
    ruleText: "Selecciona 1 opción",
    minSelections: 1,
    maxSelections: 1,
    weight: 3.0,
    tieBreakerLevel: 1,
    layout: "list-cards",
    options: [
      {
        id: "A",
        title: "Nostalgia",
        text: "El eco poético de la memoria, las raíces y el tiempo vivido.",
        tags: ["#simbolico", "#memoria"],
        artists: ["Frida Kahlo", "Njideka Akunyili Crosby", "Simone Martini", "Jan van Eyck"]
      },
      {
        id: "B",
        title: "Melancolía",
        text: "La belleza profunda de la sombra, el silencio y la lucidez interior.",
        tags: ["#sombra", "#visceral"],
        artists: ["Francisco de Goya", "Mark Rothko", "Francis Bacon", "Bartolomé Bermejo"]
      },
      {
        id: "C",
        title: "Euforia",
        text: "El latido vibrante del color, la obsesión creativa y la energía vital.",
        tags: ["#vitalista", "#emocional"],
        artists: ["Vincent van Gogh", "Yayoi Kusama", "Salvador Dalí", "David Hockney"]
      },
      {
        id: "D",
        title: "Serenidad",
        text: "El equilibrio contemplativo donde la mente y la forma descansan.",
        tags: ["#calma", "#atmosferico"],
        artists: ["Claude Monet", "Piet Mondrian", "Giotto di Bondone"]
      },
      {
        id: "E",
        title: "Rebeldía",
        text: "El impulso indomable de cuestionar las reglas y sacudir conciencias.",
        tags: ["#subversivo", "#provocacion"],
        artists: ["Jean-Michel Basquiat", "Banksy", "El Bosco"]
      }
    ]
  },
  {
    id: 4,
    number: "04",
    title: "Resonancia Cromática",
    prompt: "Selecciona la combinación cromática que más resuena con tu espacio actual.",
    ruleText: "Selecciona 1 opción",
    minSelections: 1,
    maxSelections: 1,
    weight: 2.0,
    layout: "grid-2x2-swatches",
    options: [
      {
        id: "A",
        title: "Tenebrismo",
        text: "Negro carbón (#141414), Carmín profundo (#6E1414), Ocre tenue (#B88B4A).",
        swatches: [
          { hex: "#141414", name: "Negro carbón" },
          { hex: "#6E1414", name: "Carmín profundo" },
          { hex: "#B88B4A", name: "Ocre tenue" }
        ],
        tags: ["#sombra", "#visceral"],
        artists: ["Francisco de Goya", "Francis Bacon", "Bartolomé Bermejo", "Mark Rothko"]
      },
      {
        id: "B",
        title: "Neoplástico",
        text: "Blanco puro (#FFFFFF), Negro absoluto (#0A0A0A), Azul primario (#0047AB).",
        swatches: [
          { hex: "#FFFFFF", name: "Blanco puro" },
          { hex: "#0A0A0A", name: "Negro absoluto" },
          { hex: "#0047AB", name: "Azul primario" }
        ],
        tags: ["#estructurado", "#geometria"],
        artists: ["Piet Mondrian", "Giotto di Bondone", "Jan van Eyck"]
      },
      {
        id: "C",
        title: "Urbano Neón",
        text: "Amarillo estridente (#FFE600), Negro mate (#1C1C1C), Rosa grafiti (#FF2A85).",
        swatches: [
          { hex: "#FFE600", name: "Amarillo estridente" },
          { hex: "#1C1C1C", name: "Negro mate" },
          { hex: "#FF2A85", name: "Rosa grafiti" }
        ],
        tags: ["#subversivo", "#urgencia"],
        artists: ["Jean-Michel Basquiat", "Banksy", "Yayoi Kusama", "Salvador Dalí"]
      },
      {
        id: "D",
        title: "Luz Orgánica",
        text: "Verde oliva (#6B7F46), Azul lavanda (#8C9EE8), Amarillo solar (#F5C742).",
        swatches: [
          { hex: "#6B7F46", name: "Verde oliva" },
          { hex: "#8C9EE8", name: "Azul lavanda" },
          { hex: "#F5C742", name: "Amarillo solar" }
        ],
        tags: ["#atmosferico", "#luminoso"],
        artists: ["Claude Monet", "David Hockney", "Vincent van Gogh", "Frida Kahlo", "Simone Martini", "Njideka Akunyili Crosby"]
      }
    ]
  },
  {
    id: 5,
    number: "05",
    title: "Activadores del Proceso Creativo",
    prompt: "Toca las 3 palabras que activan tu proceso creativo.",
    ruleText: "Toca exactamente 3 palabras",
    minSelections: 3,
    maxSelections: 3,
    weight: 1.5,
    layout: "word-chips",
    options: [
      {
        id: "GEOMETRÍA",
        title: "GEOMETRÍA",
        tags: ["#estructurado"],
        artists: ["Piet Mondrian", "Giotto di Bondone", "Yayoi Kusama"]
      },
      {
        id: "SOMBRA",
        title: "SOMBRA",
        tags: ["#sombra"],
        artists: ["Francisco de Goya", "Bartolomé Bermejo", "Mark Rothko"]
      },
      {
        id: "DESGARRO",
        title: "DESGARRO",
        tags: ["#visceral"],
        artists: ["Francis Bacon", "Frida Kahlo", "Vincent van Gogh"]
      },
      {
        id: "ATMÓSFERA",
        title: "ATMÓSFERA",
        tags: ["#atmosferico"],
        artists: ["Claude Monet", "David Hockney", "Njideka Akunyili Crosby"]
      },
      {
        id: "URGENCIA",
        title: "URGENCIA",
        tags: ["#urgencia"],
        artists: ["Jean-Michel Basquiat", "Vincent van Gogh", "Yayoi Kusama"]
      },
      {
        id: "PRECISIÓN",
        title: "PRECISIÓN",
        tags: ["#minucioso"],
        artists: ["Jan van Eyck", "Simone Martini", "Piet Mondrian"]
      },
      {
        id: "MISTERIO",
        title: "MISTERIO",
        tags: ["#onirico"],
        artists: ["El Bosco", "Salvador Dalí", "Mark Rothko"]
      },
      {
        id: "SÁTIRA",
        title: "SÁTIRA",
        tags: ["#subversivo"],
        artists: ["Banksy", "Francisco de Goya", "El Bosco"]
      },
      {
        id: "SILENCIO",
        title: "SILENCIO",
        tags: ["#silencio"],
        artists: ["Mark Rothko", "Claude Monet", "Jan van Eyck", "Njideka Akunyili Crosby"]
      },
      {
        id: "PROVOCACIÓN",
        title: "PROVOCACIÓN",
        tags: ["#provocacion"],
        artists: ["Salvador Dalí", "Banksy", "Jean-Michel Basquiat", "Francis Bacon"]
      }
    ]
  },
  {
    id: 6,
    number: "06",
    title: "El Manifiesto Personal",
    prompt: "Elige la frase con la que sellarías tu trabajo.",
    ruleText: "Selecciona 1 opción",
    minSelections: 1,
    maxSelections: 1,
    weight: 3.0,
    tieBreakerLevel: 2,
    layout: "manifesto-quotes",
    options: [
      {
        id: "A",
        label: "Manifiesto I",
        text: "«La belleza nace del orden estricto de las formas.»",
        tags: ["#estructurado", "#geometria"],
        artists: ["Piet Mondrian", "Giotto di Bondone", "Simone Martini"]
      },
      {
        id: "B",
        label: "Manifiesto II",
        text: "«Prefiero pintar la emoción humana antes que la realidad objetiva.»",
        tags: ["#visceral", "#emocional"],
        artists: ["Francis Bacon", "Vincent van Gogh", "Frida Kahlo", "Mark Rothko", "Francisco de Goya"]
      },
      {
        id: "C",
        label: "Manifiesto III",
        text: "«El arte es una herramienta de intervención en el espacio público.»",
        tags: ["#subversivo", "#urgencia"],
        artists: ["Jean-Michel Basquiat", "Banksy", "Yayoi Kusama", "David Hockney"]
      },
      {
        id: "D",
        label: "Manifiesto IV",
        text: "«En el detalle más pequeño habita la verdad completa.»",
        tags: ["#minucioso", "#simbolico"],
        artists: ["Jan van Eyck", "El Bosco", "Bartolomé Bermejo", "Salvador Dalí", "Njideka Akunyili Crosby"]
      }
    ]
  },
  {
    id: 7,
    number: "07",
    title: "El Momento de Pausa",
    prompt: "Elige el momento de pausa que mejor describe tu domingo ideal:",
    ruleText: "Selecciona 1 opción",
    minSelections: 1,
    maxSelections: 1,
    weight: 2.0,
    layout: "list-cards",
    options: [
      {
        id: "A",
        title: "Arquitectura e Historia",
        text: "Caminar solo por calles antiguas o museos analizando la arquitectura y los detalles de los edificios.",
        tags: ["#minucioso", "#precision"],
        artists: ["Jan van Eyck", "Francisco de Goya", "Giotto di Bondone", "Simone Martini", "Bartolomé Bermejo"]
      },
      {
        id: "B",
        title: "Inmersión Sonora y Penumbra",
        text: "Escuchar música a un volumen alto en una habitación con poca luz, divagando en pensamientos profundos.",
        tags: ["#visceral", "#sombra"],
        artists: ["Francis Bacon", "Mark Rothko", "Frida Kahlo", "El Bosco"]
      },
      {
        id: "C",
        title: "Contemplación Solar",
        text: "Salir a un parque o un lugar abierto a observar cómo cambia la luz del sol a lo largo de la tarde.",
        tags: ["#atmosferico", "#luminoso"],
        artists: ["Claude Monet", "David Hockney", "Vincent van Gogh", "Njideka Akunyili Crosby"]
      },
      {
        id: "D",
        title: "Pulso y Bitácora Urbana",
        text: "Sumergirme en la ciudad, ver el movimiento urbano, la gente y capturar ideas rápidas en el celular o libreta.",
        tags: ["#subversivo", "#urgencia"],
        artists: ["Jean-Michel Basquiat", "Banksy", "Salvador Dalí", "Yayoi Kusama"]
      }
    ]
  },
  {
    id: 8,
    number: "08",
    title: "Identidad Textil y Guardarropa",
    prompt: "Si tu guardarropa hablara de ti hoy, ¿qué texturas y tonos predominan?",
    ruleText: "Selecciona 1 opción (Femenino o Masculino)",
    minSelections: 1,
    maxSelections: 1,
    weight: 2.0,
    layout: "paired-gender-wardrobe",
    options: [
      {
        id: "A",
        label: "Monocromo & Corte Recto",
        text: "Monocromático estricto, líneas rectas, negro absoluto o blanco puro.",
        visualImage: "assets/questions/q8-A-f.jpeg",
        visualImageF: "assets/questions/q8-A-f.jpeg",
        visualImageM: "assets/questions/q8-A-m.jpeg",
        visualGradient: "linear-gradient(135deg, #0A0A0A 0%, #3a3a3a 50%, #FAF8F5 100%)",
        tags: ["#estructurado", "#precision"],
        artists: ["Piet Mondrian", "Mark Rothko", "Jan van Eyck", "Giotto di Bondone"]
      },
      {
        id: "B",
        label: "Oversize & Capas Urbanas",
        text: "Prendas oversize, capas mixtas, detalles texturizados o toques de estilo alternativo y urbano.",
        visualImage: "assets/questions/q8-B-f.jpeg",
        visualImageF: "assets/questions/q8-B-f.jpeg",
        visualImageM: "assets/questions/q8-B-m.jpeg",
        visualGradient: "linear-gradient(135deg, #1C1C1C 0%, #D90429 50%, #FFE600 100%)",
        tags: ["#subversivo", "#urgencia"],
        artists: ["Jean-Michel Basquiat", "Banksy", "Yayoi Kusama", "Salvador Dalí"]
      },
      {
        id: "C",
        label: "Tejidos Pesados & Tierra",
        text: "Tejidos pesados, tonos tierra oscuros, abrigos largos con historia y presencia imponente.",
        visualImage: "assets/questions/q8-C-f.jpeg",
        visualImageF: "assets/questions/q8-C-f.jpeg",
        visualImageM: "assets/questions/q8-C-m.jpeg",
        visualGradient: "linear-gradient(135deg, #231915 0%, #5F0F40 55%, #3D352E 100%)",
        tags: ["#sombra", "#visceral"],
        artists: ["Francisco de Goya", "Francis Bacon", "Bartolomé Bermejo", "El Bosco"]
      },
      {
        id: "D",
        label: "Fluidez & Luz Orgánica",
        text: "Prendas fluidas, cómodas, con colores suaves o toques de luz muy orgánicos.",
        visualImage: "assets/questions/q8-D-f.jpeg",
        visualImageF: "assets/questions/q8-D-f.jpeg",
        visualImageM: "assets/questions/q8-D-m.jpeg",
        visualGradient: "linear-gradient(135deg, #588157 0%, #BDD3E1 55%, #F2E8DF 100%)",
        tags: ["#atmosferico", "#luminoso"],
        artists: ["Claude Monet", "David Hockney", "Vincent van Gogh", "Frida Kahlo", "Simone Martini", "Njideka Akunyili Crosby"]
      }
    ]
  },
  {
    id: 9,
    number: "09",
    title: "La Sombra del Proceso (El Mal Hábito)",
    prompt: "¿Cuál crees que es el mal hábito en el que más fácilmente caerías? Elige la tendencia que más podría sabotear tu proceso creativo o personal.",
    ruleText: "Selecciona 1 opción",
    minSelections: 1,
    maxSelections: 1,
    weight: 2.5,
    layout: "list-cards",
    options: [
      {
        id: "A",
        title: "Autodestrucción",
        text: "Tengo la tendencia a exigirme más de lo necesario, ignorando mis propios límites hasta terminar perjudicándome.",
        tags: ["#visceral", "#emocional"],
        artists: ["Vincent van Gogh", "Frida Kahlo", "Francis Bacon", "Mark Rothko"]
      },
      {
        id: "B",
        title: "Obsesión",
        text: "Puedo quedarme atrapado intentando alcanzar una idea de perfección, incapaz de soltar algo incluso cuando ya debería hacerlo.",
        tags: ["#minucioso", "#precision"],
        artists: ["Yayoi Kusama", "Jan van Eyck", "Simone Martini", "Njideka Akunyili Crosby"]
      },
      {
        id: "C",
        title: "Adicción / Evasión",
        text: "Puedo refugiarme demasiado en aquello que me produce satisfacción inmediata, convirtiéndolo en una forma de evitar mis responsabilidades o emociones.",
        tags: ["#onirico", "#subconsciente"],
        artists: ["El Bosco", "Salvador Dalí", "David Hockney"]
      },
      {
        id: "D",
        title: "Maltrato / Impaciencia",
        text: "Cuando algo no responde a mis expectativas, puedo reaccionar con dureza, impaciencia o poca consideración hacia los demás.",
        tags: ["#sombra", "#urgencia"],
        artists: ["Francisco de Goya", "Jean-Michel Basquiat", "Bartolomé Bermejo", "Banksy"]
      },
      {
        id: "E",
        title: "Arrogancia / Rigidez",
        text: "Puedo aferrarme tanto a mis propias ideas que termino ignorando otras perspectivas, rechazando críticas o sintiéndome superior.",
        tags: ["#estructurado", "#provocacion"],
        artists: ["Salvador Dalí", "Piet Mondrian", "Giotto di Bondone"]
      }
    ]
  },
  {
    id: 10,
    number: "10",
    title: "El Combustible Diario",
    prompt: "¿Cómo te mantienes en movimiento durante un día largo?",
    ruleText: "Selecciona 1 opción",
    minSelections: 1,
    maxSelections: 1,
    weight: 2.0,
    layout: "grid-2x2-drinks",
    options: [
      {
        id: "A",
        title: "Espresso",
        text: "Enfoque intenso, directo y estructurado.",
        drinkIcon: "espresso",
        visualImage: "assets/questions/q10-A.jpeg",
        visualGradient: "linear-gradient(145deg, #1b120e 0%, #4b2e1e 65%, #78290F 100%)",
        tags: ["#visceral", "#estructurado"],
        artists: ["Francis Bacon", "Francisco de Goya", "Piet Mondrian", "Bartolomé Bermejo", "Banksy"]
      },
      {
        id: "B",
        title: "Un vaso de agua fría",
        text: "Enfoque limpio, puro y metódico.",
        drinkIcon: "water",
        visualImage: "assets/questions/q10-B.jpeg",
        visualGradient: "linear-gradient(145deg, #213448 0%, #4A7480 55%, #BDD3E1 100%)",
        tags: ["#precision", "#geometria"],
        artists: ["Jan van Eyck", "Piet Mondrian", "Giotto di Bondone", "Simone Martini"]
      },
      {
        id: "C",
        title: "Una taza grande de café con leche",
        text: "Enfoque visceral, cálido y expresivo.",
        drinkIcon: "latte",
        visualImage: "assets/questions/q10-C.jpeg",
        visualGradient: "linear-gradient(145deg, #5c3a21 0%, #C98A27 60%, #F2E8DF 100%)",
        tags: ["#emocional", "#urgencia"],
        artists: ["Jean-Michel Basquiat", "Vincent van Gogh", "Frida Kahlo", "Salvador Dalí", "Yayoi Kusama"]
      },
      {
        id: "D",
        title: "Té",
        text: "Enfoque contemplativo, pausado y atmosférico.",
        drinkIcon: "tea",
        visualImage: "assets/questions/q10-D.jpeg",
        visualGradient: "linear-gradient(145deg, #283618 0%, #588157 60%, #B5838D 100%)",
        tags: ["#atmosferico", "#silencio"],
        artists: ["Claude Monet", "David Hockney", "Mark Rothko", "El Bosco", "Njideka Akunyili Crosby"]
      }
    ]
  }
];
