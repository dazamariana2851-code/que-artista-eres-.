/**
 * REFLEJO CREATIVO — Algoritmo de Puntuación, Desempate en 3 Niveles,
 * Telemetría Oculta y Persistencia Real (Únicamente participantes reales del test)
 */

window.ScoringEngine = {
  /**
   * Calcula el resultado completo a partir del objeto answers:
   * { q1: "A", q2: ["B","E"], q3: "C", q4: "D", q5: ["DESGARRO","URGENCIA","ATMÓSFERA"], q6: "B", q7: "C", q8: "D", q9: "A", q10: "C" }
   */
  calculateResult(answers) {
    const scoresByArtistName = {};
    const q3Favored = {};
    const q6Favored = {};
    const q1Favored = {};
    const tagCounts = {};

    window.ARTISTS.forEach((artist) => {
      scoresByArtistName[artist.name] = 0;
      q3Favored[artist.name] = 0;
      q6Favored[artist.name] = 0;
      q1Favored[artist.name] = 0;
    });

    window.QUESTIONS.forEach((question) => {
      const qKey = "q" + question.id;
      const rawAns = answers[qKey];
      if (!rawAns) return;
      const selectedIds = Array.isArray(rawAns) ? rawAns : [rawAns];

      selectedIds.forEach((optId) => {
        const baseOptId =
          question.id === 8 && typeof optId === "string" ? optId.split("-")[0] : optId;
        const option = question.options.find((o) => o.id === baseOptId);
        if (!option) return;

        // Acumular tags psicológicos
        if (Array.isArray(option.tags)) {
          option.tags.forEach((tag) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }

        // Sumar puntos a cada artista vinculado
        if (Array.isArray(option.artists)) {
          option.artists.forEach((artistName) => {
            if (scoresByArtistName[artistName] !== undefined) {
              scoresByArtistName[artistName] += question.weight;
              if (question.id === 3) q3Favored[artistName] += question.weight;
              if (question.id === 6) q6Favored[artistName] += question.weight;
              if (question.id === 1) q1Favored[artistName] += question.weight;
            }
          });
        }
      });
    });

    const ranked = window.ARTISTS.map((artist) => {
      const rawScore = Number((scoresByArtistName[artist.name] || 0).toFixed(2));
      return {
        artist,
        score: rawScore,
        tie1: q3Favored[artist.name] || 0,
        tie2: q6Favored[artist.name] || 0,
        tie3: q1Favored[artist.name] || 0
      };
    });

    // Ordenar con Regla Estricta de Desempate en 3 Niveles (P03 -> P06 -> P01)
    ranked.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.tie1 !== a.tie1) return b.tie1 - a.tie1;
      if (b.tie2 !== a.tie2) return b.tie2 - a.tie2;
      if (b.tie3 !== a.tie3) return b.tie3 - a.tie3;
      return a.artist.id - b.artist.id;
    });

    const winnerScore = Math.max(ranked[0].score, 1);
    // Escala curatorial entre 60% y 98% según fórmula Sección 8.1
    const withAffinity = ranked.map((item, idx) => {
      let affinity = Math.min(98, Math.round(55 + (item.score / winnerScore) * 40));
      if (idx === 0) {
        affinity = Math.min(98, Math.max(91, Math.round(86 + Math.min(item.score, 22) * 0.5)));
      } else if (idx > 0 && affinity >= 94) {
        affinity = 91 - idx * 2;
      }
      return {
        ...item,
        affinityPercent: Math.max(60, affinity)
      };
    });

    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map((entry) => entry[0]);

    if (topTags.length < 3) {
      ["#visceral", "#simbolico", "#atmosferico"].forEach((fallback) => {
        if (topTags.length < 3 && !topTags.includes(fallback)) topTags.push(fallback);
      });
    }

    const q3Opt = window.QUESTIONS[2].options.find((o) => o.id === answers.q3);
    const q4Opt = window.QUESTIONS[3].options.find((o) => o.id === answers.q4);
    const q9Opt = window.QUESTIONS[8].options.find((o) => o.id === answers.q9);
    const q5Words = Array.isArray(answers.q5) ? answers.q5 : ["ATMÓSFERA", "MISTERIO", "SILENCIO"];

    const winner = withAffinity[0];
    const runnerUps = withAffinity.slice(1, 3).map((r) => ({
      id: r.artist.id,
      name: r.artist.name,
      archetype: r.artist.archetype,
      style: r.artist.style,
      color: r.artist.color,
      portrait: r.artist.portrait,
      score: r.score,
      affinity_percent: r.affinityPercent
    }));

    return {
      primary_artist_id: winner.artist.id,
      primary_artist_name: winner.artist.name,
      primary_archetype: winner.artist.archetype,
      primary_score: winner.score,
      primary_affinity_percent: winner.affinityPercent,
      artistObj: winner.artist,
      runner_up_artists: runnerUps,
      all_ranked: withAffinity,
      narrative_meta: {
        emotion: q3Opt ? q3Opt.title : "Euforia",
        chromatic: q4Opt ? q4Opt.title : "Luz Orgánica",
        words: q5Words,
        shadow: q9Opt ? q9Opt.title : "Obsesión"
      },
      dominant_tags: topTags,
      answers_log: JSON.parse(JSON.stringify(answers))
    };
  }
};

// Inicialización de Firebase Firestore (Modo Compat por CDN)
const firebaseConfig = {
  apiKey: "AIzaSyCJoio4tZL5wdpIGe7y8EV3kXqjRpqhj_w",
  authDomain: "reflejo-creativo.firebaseapp.com",
  projectId: "reflejo-creativo",
  storageBucket: "reflejo-creativo.firebasestorage.app",
  messagingSenderId: "841627313484",
  appId: "1:841627313484:web:9f634c32f2a9f3ee805be9",
  measurementId: "G-HGGKGGEMD4"
};

let firestoreDb = null;
try {
  if (typeof firebase !== "undefined") {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firestoreDb = firebase.firestore();
  }
} catch (err) {
  console.error("Error inicializando Firebase:", err);
}

window.StorageService = {
  COLLECTION_NAME: "submissions",
  STATS_COLLECTION: "metadata",
  STATS_DOC: "stats",
  submissionsCache: [],
  qrScansCache: 0,
  isListening: false,
  listeners: [],

  init() {
    if (!firestoreDb) return this.submissionsCache;

    if (!this.isListening) {
      this.isListening = true;

      // Escuchar en tiempo real todos los participantes desde Firestore
      firestoreDb
        .collection(this.COLLECTION_NAME)
        .onSnapshot(
          (snapshot) => {
            const docs = [];
            snapshot.forEach((doc) => {
              const data = doc.data();
              if (data) {
                docs.push({
                  ...data,
                  id: data.id || doc.id
                });
              }
            });
            // Ordenar del más reciente al más antiguo por created_at
            docs.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
            this.submissionsCache = docs;
            this.notifyListeners();
          },
          (error) => {
            console.error("Error escuchando colección submissions en Firestore:", error);
          }
        );

      // Escuchar en tiempo real el contador de inicios/escaneos QR
      firestoreDb
        .collection(this.STATS_COLLECTION)
        .doc(this.STATS_DOC)
        .onSnapshot(
          (doc) => {
            if (doc.exists) {
              const data = doc.data();
              this.qrScansCache = Number(data?.qr_scans || 0);
              this.notifyListeners();
            }
          },
          (error) => {
            console.error("Error escuchando stats en Firestore:", error);
          }
        );
    }

    return this.submissionsCache;
  },

  subscribe(callback) {
    if (typeof callback === "function" && !this.listeners.includes(callback)) {
      this.listeners.push(callback);
    }
  },

  notifyListeners() {
    this.listeners.forEach((cb) => {
      try {
        cb(this.submissionsCache);
      } catch (e) {
        console.error(e);
      }
    });
  },

  getAllSubmissions() {
    this.init();
    return this.submissionsCache;
  },

  recordQrScan() {
    this.qrScansCache += 1;
    if (!firestoreDb) return;

    firestoreDb
      .collection(this.STATS_COLLECTION)
      .doc(this.STATS_DOC)
      .set(
        {
          qr_scans: firebase.firestore.FieldValue.increment(1),
          updated_at: new Date().toISOString()
        },
        { merge: true }
      )
      .catch((err) => {
        console.error("Error registrando inicio de test en Firestore:", err);
      });
  },

  getTotalQrScans() {
    const subs = this.submissionsCache.length;
    return Math.max(this.qrScansCache, subs);
  },

  saveSubmission(submission) {
    // Actualizar caché en memoria de inmediato
    const existsIdx = this.submissionsCache.findIndex((s) => s.id === submission.id);
    if (existsIdx >= 0) {
      this.submissionsCache[existsIdx] = submission;
    } else {
      this.submissionsCache.unshift(submission);
    }

    if (firestoreDb) {
      firestoreDb
        .collection(this.COLLECTION_NAME)
        .doc(String(submission.id))
        .set(submission)
        .catch((err) => {
          console.error("Error guardando resultado en Firestore:", err);
        });
    }

    return submission;
  },

  markSharedOrDownloaded(submissionId) {
    if (!submissionId) return;
    const target = this.submissionsCache.find((s) => s.id === submissionId);
    if (target && target.telemetry_hidden) {
      target.telemetry_hidden.shared_or_downloaded = true;
    }

    if (firestoreDb) {
      firestoreDb
        .collection(this.COLLECTION_NAME)
        .doc(String(submissionId))
        .set(
          {
            telemetry_hidden: {
              shared_or_downloaded: true
            }
          },
          { merge: true }
        )
        .catch((err) => {
          console.error("Error actualizando estado compartido en Firestore:", err);
        });
    }
  },

  exportCSV(submissions) {
    const headers = [
      "ID Sesion",
      "Fecha ISO",
      "Nombre Participante",
      "Programa Universitario",
      "Edad",
      "Genero",
      "Artista Asignado",
      "Arquetipo",
      "Puntaje Bruto",
      "Afinidad (%)",
      "2do Artista",
      "3er Artista",
      "Emocion Dominante (P3)",
      "Resonancia Cromatica (P4)",
      "Activadores (P5)",
      "Sombra / Bloqueo (P9)",
      "Dispositivo",
      "Duracion Total (seg)",
      "Clics Boton Atras",
      "Preguntas con Indecision",
      "Tags Dominantes",
      "Habeas Data"
    ];

    const q3Map = { A: "Nostalgia", B: "Melancolía", C: "Euforia", D: "Serenidad", E: "Rebeldía" };
    const q4Map = { A: "Tenebrismo", B: "Neoplástico", C: "Urbano Neón", D: "Luz Orgánica" };
    const q9Map = {
      A: "Autodestrucción",
      B: "Obsesión",
      C: "Adicción / Evasión",
      D: "Maltrato / Impaciencia",
      E: "Arrogancia / Rigidez"
    };

    const escapeCell = (val) => {
      const str = String(val ?? "").replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = submissions.map((s) => {
      const ans = (s.test_result && s.test_result.answers_log) || {};
      const r2 = s.test_result?.runner_up_artists?.[0]?.name || "";
      const r3 = s.test_result?.runner_up_artists?.[1]?.name || "";
      return [
        s.id,
        s.created_at,
        s.user_data?.full_name,
        s.user_data?.academic_program,
        s.user_data?.age,
        s.user_data?.gender,
        s.test_result?.primary_artist_name,
        s.test_result?.primary_archetype,
        s.test_result?.primary_score,
        s.test_result?.primary_affinity_percent + "%",
        r2,
        r3,
        q3Map[ans.q3] || ans.q3 || "",
        q4Map[ans.q4] || ans.q4 || "",
        Array.isArray(ans.q5) ? ans.q5.join(" | ") : "",
        q9Map[ans.q9] || ans.q9 || "",
        s.telemetry_hidden?.device_type,
        s.telemetry_hidden?.total_duration_seconds,
        s.telemetry_hidden?.back_button_total_clicks,
        Array.isArray(s.telemetry_hidden?.back_button_questions)
          ? s.telemetry_hidden.back_button_questions.map((q) => "P" + q).join(", ")
          : "",
        Array.isArray(s.telemetry_hidden?.dominant_tags) ? s.telemetry_hidden.dominant_tags.join(" ") : "",
        s.user_data?.privacy_consent ? "AUTORIZADO (Ley 1581)" : "NO"
      ].map(escapeCell).join(",");
    });

    const csvContent = "\uFEFF" + [headers.map(escapeCell).join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Reflejo_Creativo_BaseDatos_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
};
