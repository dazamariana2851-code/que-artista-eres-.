/**
 * REFLEJO CREATIVO (Archetype // El Trazo Interno)
 * Controlador Principal de Estado, Telemetría Invisible, Animación de Brochazos y Vistas Móviles
 */

window.ReflejoApp = {
  state: {
    currentView: "landing", // 'landing' | 'quiz' | 'form' | 'result' | 'admin'
    currentQuestionIndex: 0, // 0..9
    answers: {},
    userData: {
      full_name: "",
      academic_program: "",
      age: "",
      gender: "",
      privacy_consent: false
    },
    resultData: null,
    submissionId: null,
    telemetry: {
      sessionId: "",
      qrTimestamp: 0,
      quizStartTime: 0,
      questionEnterTime: 0,
      questionTimeMs: { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 },
      backButtonTotalClicks: 0,
      backButtonQuestions: []
    }
  },

  init() {
    window.StorageService.init();
    this.initSessionTelemetry();
    this.restoreProgressIfAvailable();
    this.renderCurrentView();
  },

  initSessionTelemetry() {
    this.state.telemetry.sessionId = "rc-" + Math.random().toString(36).substring(2, 9);
    this.state.telemetry.qrTimestamp = Date.now();
    this.state.telemetry.questionTimeMs = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
    this.state.telemetry.backButtonTotalClicks = 0;
    this.state.telemetry.backButtonQuestions = [];
  },

  saveSessionProgress() {
    try {
      sessionStorage.setItem(
        "reflejo_creativo_active_session",
        JSON.stringify({
          currentQuestionIndex: this.state.currentQuestionIndex,
          answers: this.state.answers,
          telemetry: this.state.telemetry
        })
      );
    } catch (e) {
      // Ignore sessionStorage errors
    }
  },

  restoreProgressIfAvailable() {
    try {
      const saved = sessionStorage.getItem("reflejo_creativo_active_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.answers) {
          this.state.answers = parsed.answers;
        }
      }
    } catch (e) {
      // Ignore
    }
  },

  detectDeviceString() {
    const ua = navigator.userAgent || "";
    const w = window.innerWidth || 390;
    const h = window.innerHeight || 844;
    let os = "Desktop";
    if (/iPhone|iPad|iPod/i.test(ua)) os = "Mobile (iOS";
    else if (/Android/i.test(ua)) os = "Mobile (Android";
    else if (w <= 768) os = "Mobile (Web";
    else return `Desktop (${w}x${h})`;
    return `${os} / ${w}x${h})`;
  },

  recordQuestionElapsed() {
    if (this.state.currentView !== "quiz") return;
    const now = Date.now();
    const elapsed = Math.max(400, now - (this.state.telemetry.questionEnterTime || now));
    const qNum = this.state.currentQuestionIndex + 1;
    const qKey = "q" + qNum;
    this.state.telemetry.questionTimeMs[qKey] = (this.state.telemetry.questionTimeMs[qKey] || 0) + elapsed;
    this.state.telemetry.questionEnterTime = now;
  },

  /**
   * Dispara la transición de 3 brochazos de pincel a pantalla completa (950ms total)
   * Cambia el contenido exactamente a la mitad (475ms) cuando la pantalla está cubierta.
   */
  runBrushTransition(midpointCallback) {
    const overlay = document.getElementById("brush-transition-overlay");
    if (!overlay) {
      midpointCallback();
      return;
    }

    overlay.classList.remove("brush-active", "brush-exit");
    void overlay.offsetWidth; // Force reflow
    overlay.classList.add("brush-active");

    setTimeout(() => {
      midpointCallback();
      window.scrollTo({ top: 0, behavior: "instant" });
      overlay.classList.add("brush-exit");
    }, 475);

    setTimeout(() => {
      overlay.classList.remove("brush-active", "brush-exit");
    }, 960);
  },

  renderCurrentView() {
    const appRoot = document.getElementById("app-root");
    if (!appRoot) return;

    if (this.state.currentView === "admin") {
      document.body.classList.add("admin-mode-body");
      window.AdminDashboard.render(appRoot, () => {
        if (window.location.hash === "#admin") {
          history.pushState("", document.title, window.location.pathname + window.location.search);
        }
        document.body.classList.remove("admin-mode-body");
        this.state.currentView = "landing";
        this.renderCurrentView();
      });
      return;
    }

    document.body.classList.remove("admin-mode-body");

    switch (this.state.currentView) {
      case "landing":
        appRoot.innerHTML = this.renderLandingHTML();
        this.bindLandingEvents(appRoot);
        break;
      case "quiz":
        appRoot.innerHTML = this.renderQuizHTML();
        this.bindQuizEvents(appRoot);
        break;
      case "form":
        appRoot.innerHTML = this.renderFormHTML();
        this.bindFormEvents(appRoot);
        break;
      case "result":
        appRoot.innerHTML = this.renderResultHTML();
        this.bindResultEvents(appRoot);
        break;
    }
  },

  openAdmin() {
    this.state.currentView = "admin";
    this.renderCurrentView();
  },

  /* ============================================================================
   * VISTA 1: PORTADA ("SALON HANG / MURO DE MARCOS CLÁSICOS")
   * Inspirada directamente en Captura de pantalla 2026-11-18 223748.png
   * ============================================================================ */
  renderLandingHTML() {
    return `
      <main class="mobile-viewport landing-screen">
        <!-- Muro de Galería con Marcos Ornamentados (Salon Hang) -->
        <section class="salon-gallery-wall" aria-label="Muro de obras clásicas y contemporáneas">
          <!-- Fila superior de marcos -->
          <div class="salon-grid-top">
            <figure class="ornate-frame frame-rect-gold frame-1">
              <div class="frame-inner">
                <img src="assets/artworks/frida-kahlo/obra-3.jpeg" alt="Frida Kahlo" />
              </div>
            </figure>

            <figure class="ornate-frame frame-oval-gold frame-2">
              <div class="frame-inner">
                <img src="assets/artists/salvador-dali.jpeg" alt="Salvador Dalí" />
              </div>
            </figure>

            <figure class="ornate-frame frame-arch-gold frame-3">
              <div class="frame-inner">
                <img src="assets/artworks/el-bosco/obra-1.jpeg" alt="El Bosco" />
              </div>
            </figure>
          </div>

          <!-- Fila media: Tarjeta Editorial estilo Diccionario/Manifiesto + Marco Vertical -->
          <div class="salon-grid-middle">
            <div class="editorial-manifesto-Block">
              <div class="mini-frames-row">
                <figure class="ornate-frame frame-Square-mini">
                  <div class="frame-inner">
                    <img src="assets/artworks/piet-mondrian/obra-1.jpeg" alt="Piet Mondrian" />
                  </div>
                </figure>
                <figure class="ornate-frame frame-circle-mini">
                  <div class="frame-inner">
                    <img src="assets/artworks/claude-monet/obra-1.jpeg" alt="Claude Monet" />
                  </div>
                </figure>
              </div>

              <div class="dictionary-card">
                <h1 class="dict-word">arte <small>[ar-ke-ti-po]</small></h1>
                <h2 class="dict-hook">¿Qué artista eres según tu personalidad?</h2>
                <p class="dict-desc">
                  Si tu mente fuera un cuadro, ¿quién lo habría pintado?
                </p>
              </div>
            </div>

            <figure class="ornate-frame frame-tall-gold frame-4">
              <div class="frame-inner">
                <img src="assets/artworks/simone-martini/obra-1.jpeg" alt="Simone Martini" />
              </div>
            </figure>
          </div>

          <!-- Fila inferior de marcos (Van Gogh, Retrato Flamenco, Basquiat) -->
          <div class="salon-grid-bottom">
            <div class="salon-bottom-col">
              <figure class="ornate-frame frame-small-rect">
                <div class="frame-inner">
                  <img src="assets/artworks/jean-michel-basquiat/obra-1.jpeg" alt="Basquiat" />
                </div>
              </figure>
              <figure class="ornate-frame frame-circle-gold">
                <div class="frame-inner">
                  <img src="assets/artists/jan-van-eyck.jpeg" alt="Jan van Eyck" />
                </div>
              </figure>
            </div>

            <figure class="ornate-frame frame-wide-gold frame-starry">
              <div class="frame-inner">
                <img src="assets/artworks/vincent-van-gogh/obra-1.jpeg" alt="La noche estrellada - Van Gogh" />
              </div>
            </figure>

            <figure class="ornate-frame frame-portrait-gold">
              <div class="frame-inner">
                <img src="assets/artists/vincent-van-gogh.jpeg" alt="Vincent van Gogh" />
              </div>
            </figure>
          </div>
        </section>

        <!-- Zona de Acción Inferior (CTA Mobile-First) -->
        <footer class="landing-cta-footer">
          <button type="button" id="btn-start-quiz" class="btn-start-experience">
            <span>Descubrir mi Pintor</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </footer>
      </main>
    `;
  },

  bindLandingEvents(root) {
    const startQuiz = () => {
      window.StorageService.recordQrScan();
      this.state.currentQuestionIndex = 0;
      this.state.answers = {};
      this.initSessionTelemetry();
      this.state.telemetry.quizStartTime = Date.now();
      this.state.telemetry.questionEnterTime = Date.now();

      this.runBrushTransition(() => {
        this.state.currentView = "quiz";
        this.renderCurrentView();
      });
    };

    root.querySelector("#btn-start-quiz")?.addEventListener("click", startQuiz);
  },

  /* ============================================================================
   * VISTA 2: CONTENEDOR DEL TEST (PREGUNTAS 01 A 10)
   * ============================================================================ */
  getSelectedArrayForQuestion(qId) {
    const qKey = "q" + qId;
    const val = this.state.answers[qKey];
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
  },

  isQuestionReady(question) {
    const sel = this.getSelectedArrayForQuestion(question.id);
    return sel.length >= question.minSelections && sel.length <= question.maxSelections;
  },

  renderDrinkIconSVG(type) {
    switch (type) {
      case "espresso":
        return `
          <svg viewBox="0 0 64 64" class="drink-svg">
            <path d="M16 26h26v14c0 7.7-6.3 14-14 14h-2c-5.5 0-10-4.5-10-10V26z" fill="#F2E8DF" opacity="0.92"/>
            <path d="M42 29h5c3.3 0 6 2.7 6 6s-2.7 6-6 6h-5" fill="none" stroke="#F2E8DF" stroke-width="3.5"/>
            <line x1="12" y1="56" x2="48" y2="56" stroke="#BDD3E1" stroke-width="3" stroke-linecap="round"/>
            <path d="M24 18c0-3 3-4 3-7M33 18c0-3 3-4 3-7" fill="none" stroke="#D9822B" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        `;
      case "water":
        return `
          <svg viewBox="0 0 64 64" class="drink-svg">
            <polygon points="18,14 46,14 42,54 22,54" fill="rgba(189,211,225,0.28)" stroke="#FAF8F5" stroke-width="3"/>
            <path d="M20 28q6-3 12 0t12 0l-2 24H22z" fill="#BDD3E1" opacity="0.75"/>
            <rect x="26" y="31" width="7" height="7" rx="1.5" fill="#FAF8F5" opacity="0.85" transform="rotate(15 29 34)"/>
          </svg>
        `;
      case "latte":
        return `
          <svg viewBox="0 0 64 64" class="drink-svg">
            <path d="M12 22h32v16c0 9.9-8.1 18-18 18h-2c-6.6 0-12-5.4-12-12V22z" fill="#F2E8DF"/>
            <path d="M44 26h6c3.9 0 7 3.1 7 7s-3.1 7-7 7h-6" fill="none" stroke="#F2E8DF" stroke-width="3.5"/>
            <ellipse cx="28" cy="22" rx="16" ry="4" fill="#C98A27"/>
            <path d="M24 13c0-3 3-4 3-7M32 13c0-3 3-4 3-7" fill="none" stroke="#FAF8F5" stroke-width="2.2" stroke-linecap="round"/>
          </svg>
        `;
      case "tea":
      default:
        return `
          <svg viewBox="0 0 64 64" class="drink-svg">
            <path d="M14 26h30v12c0 8.8-7.2 16-16 16h-2c-6.6 0-12-5.4-12-12V26z" fill="#E2EAEB"/>
            <path d="M44 29h5c3.3 0 6 2.7 6 6s-2.7 6-6 6h-5" fill="none" stroke="#E2EAEB" stroke-width="3"/>
            <line x1="35" y1="26" x2="35" y2="38" stroke="#588157" stroke-width="2"/>
            <rect x="32" y="36" width="6" height="8" rx="1" fill="#588157"/>
            <path d="M25 16c2-4-2-6 0-10" fill="none" stroke="#BDD3E1" stroke-width="2.2" stroke-linecap="round"/>
          </svg>
        `;
    }
  },

  renderBrushArrowSVG(direction, isActive = true) {
    const gradId = `gold-brush-grad-${direction}`;
    const highlightId = `gold-brush-hi-${direction}`;
    return `
      <svg
        viewBox="0 0 130 56"
        class="brush-arrow-svg ${direction === "left" ? "brush-arrow-left" : "brush-arrow-right"} ${isActive ? "brush-ready" : "brush-disabled"}"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="${gradId}" x1="0%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stop-color="#8e6621" />
            <stop offset="28%" stop-color="#e2c275" />
            <stop offset="55%" stop-color="#f5df9e" />
            <stop offset="80%" stop-color="#b58938" />
            <stop offset="100%" stop-color="#f5df9e" />
          </linearGradient>
          <linearGradient id="${highlightId}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(255,248,220,0.15)" />
            <stop offset="60%" stop-color="rgba(255,248,220,0.85)" />
            <stop offset="100%" stop-color="rgba(226,194,117,0.4)" />
          </linearGradient>
        </defs>
        <g class="brush-arrow-group">
          <!-- Trazo principal orgánico del cuerpo de la pincelada -->
          <path
            class="brush-stroke-main"
            d="M8 29C14 23 28 21 48 22C63 23 76 22 87 20C82 14 78 10 76 6C89 10 106 19 123 28C106 37 89 46 76 50C79 45 83 41 87 36C73 35 55 36 37 35C22 34 12 33 6 31C4 30 6 29 8 29Z"
            fill="url(#${gradId})"
          />
          <!-- Cerdas y vetas orgánicas de pintura dorada -->
          <path
            class="brush-stroke-bristle"
            d="M14 26C32 24 58 25 89 24M20 32C42 33 68 32 92 31M79 11C91 16 104 22 116 28C104 34 91 40 79 45"
            fill="none"
            stroke="url(#${highlightId})"
            stroke-width="1.8"
            stroke-linecap="round"
          />
          <!-- Salpicaduras finas de cerdas en la cola del trazo -->
          <path
            class="brush-stroke-tail"
            d="M3 25C7 24 11 24 15 25M2 33C6 33 10 34 14 33M9 20C13 20 17 20 21 21"
            fill="none"
            stroke="#e2c275"
            stroke-width="1.4"
            stroke-linecap="round"
            opacity="0.8"
          />
        </g>
      </svg>
    `;
  },

  renderQuizHTML() {
    const q = window.QUESTIONS[this.state.currentQuestionIndex];
    const progressPct = ((this.state.currentQuestionIndex + 1) / window.QUESTIONS.length) * 100;
    const selected = this.getSelectedArrayForQuestion(q.id);
    const quotaReached = selected.length >= q.maxSelections;
    const isReady = this.isQuestionReady(q);

    let ruleCounterText = q.ruleText;
    if (q.maxSelections > 1) {
      ruleCounterText = `${q.ruleText} (${selected.length}/${q.maxSelections})`;
    }

    let optionsHTML = "";

    if (q.layout === "paired-gender-wardrobe") {
      optionsHTML = `
        <div class="wardrobe-pairs-list">
          ${q.options
            .map((opt) => {
              const idF = `${opt.id}-F`;
              const idM = `${opt.id}-M`;
              const isSelectedF = selected.includes(idF) || selected.includes(opt.id);
              const isSelectedM = selected.includes(idM);
              const isLetterActive = isSelectedF || isSelectedM;
              const isDimmedF = !isSelectedF && quotaReached;
              const isDimmedM = !isSelectedM && quotaReached;

              return `
                <div class="wardrobe-pair-block ${isLetterActive ? "pair-active" : ""}">
                  <div class="wardrobe-pair-header">
                    <span class="option-letter-pill">${opt.id}</span>
                    <div class="wardrobe-pair-text-wrap">
                      <p class="wardrobe-pair-desc">${opt.text}</p>
                    </div>
                  </div>

                  <div class="wardrobe-pair-cards">
                    <!-- Versión Femenina -->
                    <button
                      type="button"
                      class="quiz-option-card wardrobe-gender-card ${isSelectedF ? "selected" : ""} ${isDimmedF ? "dimmed" : ""}"
                      data-option-id="${idF}"
                      aria-pressed="${isSelectedF}"
                    >
                      <div class="visual-thumb-wrap wardrobe-thumb" style="background:${opt.visualGradient}">
                        <img src="${opt.visualImageF}" alt="Opción ${opt.id} Femenino" loading="lazy" onerror="this.style.display='none'" />
                        <span class="visual-option-tag">${opt.id} · Femenino</span>
                        <span class="selection-check-badge">✓</span>
                      </div>
                    </button>

                    <!-- Versión Masculina -->
                    <button
                      type="button"
                      class="quiz-option-card wardrobe-gender-card ${isSelectedM ? "selected" : ""} ${isDimmedM ? "dimmed" : ""}"
                      data-option-id="${idM}"
                      aria-pressed="${isSelectedM}"
                    >
                      <div class="visual-thumb-wrap wardrobe-thumb" style="background:${opt.visualGradient}">
                        <img src="${opt.visualImageM}" alt="Opción ${opt.id} Masculino" loading="lazy" onerror="this.style.display='none'" />
                        <span class="visual-option-tag">${opt.id} · Masculino</span>
                        <span class="selection-check-badge">✓</span>
                      </div>
                    </button>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      `;
    } else if (q.layout === "grid-2x2-visual") {
      optionsHTML = `
        <div class="options-grid-2x2">
          ${q.options
            .map((opt) => {
              const isSelected = selected.includes(opt.id);
              const isDimmed = !isSelected && quotaReached;
              return `
                <button
                  type="button"
                  class="quiz-option-card visual-card-2x2 ${isSelected ? "selected" : ""} ${isDimmed ? "dimmed" : ""}"
                  data-option-id="${opt.id}"
                  aria-pressed="${isSelected}"
                >
                  <div class="visual-thumb-wrap" style="background:${opt.visualGradient}">
                    <img src="${opt.visualImage}" alt="${opt.label}" loading="lazy" onerror="this.style.display='none'" />
                    <span class="visual-option-tag">${opt.id}</span>
                    <span class="selection-check-badge">✓</span>
                  </div>
                  <div class="visual-card-body">
                    <p class="visual-card-text">${opt.text}</p>
                  </div>
                </button>
              `;
            })
            .join("")}
        </div>
      `;
    } else if (q.layout === "grid-2x2-swatches") {
      optionsHTML = `
        <div class="options-grid-2x2">
          ${q.options
            .map((opt) => {
              const isSelected = selected.includes(opt.id);
              const isDimmed = !isSelected && quotaReached;
              return `
                <button
                  type="button"
                  class="quiz-option-card swatch-card-2x2 ${isSelected ? "selected" : ""} ${isDimmed ? "dimmed" : ""}"
                  data-option-id="${opt.id}"
                  aria-pressed="${isSelected}"
                >
                  <div class="swatch-bars-triad">
                    ${opt.swatches
                      .map(
                        (sw) => `
                      <div class="swatch-block" style="background:${sw.hex}">
                        <span class="swatch-hex-code" style="color:${sw.hex === "#FFFFFF" || sw.hex === "#FFE600" || sw.hex === "#F5C742" ? "#121518" : "#FAF8F5"}">${sw.hex}</span>
                      </div>
                    `
                      )
                      .join("")}
                    <span class="selection-check-badge">✓</span>
                  </div>
                  <div class="visual-card-body">
                    <strong class="swatch-title">«${opt.title}»</strong>
                    <p class="visual-card-text">${opt.text}</p>
                  </div>
                </button>
              `;
            })
            .join("")}
        </div>
      `;
    } else if (q.layout === "word-chips") {
      optionsHTML = `
        <div class="options-word-cloud">
          ${q.options
            .map((opt) => {
              const isSelected = selected.includes(opt.id);
              const isDimmed = !isSelected && quotaReached;
              return `
                <button
                  type="button"
                  class="quiz-option-card word-chip-card ${isSelected ? "selected" : ""} ${isDimmed ? "dimmed" : ""}"
                  data-option-id="${opt.id}"
                  aria-pressed="${isSelected}"
                >
                  <span class="word-chip-label">${opt.title}</span>
                  <span class="selection-check-badge">✓</span>
                </button>
              `;
            })
            .join("")}
        </div>
      `;
    } else if (q.layout === "manifesto-quotes") {
      optionsHTML = `
        <div class="options-list-vertical">
          ${q.options
            .map((opt) => {
              const isSelected = selected.includes(opt.id);
              const isDimmed = !isSelected && quotaReached;
              return `
                <button
                  type="button"
                  class="quiz-option-card manifesto-quote-card ${isSelected ? "selected" : ""} ${isDimmed ? "dimmed" : ""}"
                  data-option-id="${opt.id}"
                  aria-pressed="${isSelected}"
                >
                  <div class="manifesto-head">
                    <span class="option-letter-pill">${opt.id}</span>
                    <span class="manifesto-kicker">${opt.label}</span>
                  </div>
                  <blockquote class="manifesto-quote-text">${opt.text}</blockquote>
                  <span class="selection-check-badge">✓</span>
                </button>
              `;
            })
            .join("")}
        </div>
      `;
    } else if (q.layout === "grid-2x2-drinks") {
      optionsHTML = `
        <div class="options-grid-2x2">
          ${q.options
            .map((opt) => {
              const isSelected = selected.includes(opt.id);
              const isDimmed = !isSelected && quotaReached;
              return `
                <button
                  type="button"
                  class="quiz-option-card drink-card-2x2 ${isSelected ? "selected" : ""} ${isDimmed ? "dimmed" : ""}"
                  data-option-id="${opt.id}"
                  aria-pressed="${isSelected}"
                >
                  <div class="visual-thumb-wrap" style="background:${opt.visualGradient}">
                    <img src="${opt.visualImage}" alt="${opt.title}" loading="lazy" onerror="this.style.display='none'" />
                    <span class="visual-option-tag">${opt.id}</span>
                    <span class="selection-check-badge">✓</span>
                  </div>
                  <div class="visual-card-body">
                    <strong class="swatch-title">«${opt.title}»</strong>
                    <p class="visual-card-text">${opt.text}</p>
                  </div>
                </button>
              `;
            })
            .join("")}
        </div>
      `;
    } else {
      // list-cards (P02, P03, P07, P09)
      optionsHTML = `
        <div class="options-list-vertical">
          ${q.options
            .map((opt) => {
              const isSelected = selected.includes(opt.id);
              const isDimmed = !isSelected && quotaReached;
              return `
                <button
                  type="button"
                  class="quiz-option-card list-text-card ${isSelected ? "selected" : ""} ${isDimmed ? "dimmed" : ""}"
                  data-option-id="${opt.id}"
                  aria-pressed="${isSelected}"
                >
                  <div class="list-card-left">
                    <span class="option-letter-pill">${opt.id}</span>
                  </div>
                  <div class="list-card-content">
                    ${opt.title ? `<strong class="list-card-title">«${opt.title}»</strong>` : ""}
                    <p class="list-card-desc">${opt.text}</p>
                  </div>
                  <span class="selection-check-badge">✓</span>
                </button>
              `;
            })
            .join("")}
        </div>
      `;
    }

    return `
      <main class="mobile-viewport quiz-screen">
        <!-- Fondo con obras de los artistas difuminadas (blur) -->
        <div class="quiz-blurred-bg" aria-hidden="true">
          <div class="quiz-blurred-grid">
            <img src="assets/artworks/vincent-van-gogh/obra-1.jpeg" alt="" />
            <img src="assets/artworks/claude-monet/obra-1.jpeg" alt="" />
            <img src="assets/artworks/frida-kahlo/obra-3.jpeg" alt="" />
            <img src="assets/artworks/salvador-dali/obra-1.jpeg" alt="" />
            <img src="assets/artworks/el-bosco/obra-1.jpeg" alt="" />
            <img src="assets/artworks/simone-martini/obra-1.jpeg" alt="" />
            <img src="assets/artworks/piet-mondrian/obra-1.jpeg" alt="" />
            <img src="assets/artworks/jean-michel-basquiat/obra-1.jpeg" alt="" />
            <img src="assets/artworks/jan-van-eyck/obra-1.jpeg" alt="" />
          </div>
          <div class="quiz-blurred-overlay"></div>
        </div>

        <!-- Barra de progreso fija en el borde superior absoluto -->
        <div class="quiz-progress-track" role="progressbar" aria-valuenow="${progressPct}" aria-valuemin="10" aria-valuemax="100">
          <div class="quiz-progress-fill" style="width: ${progressPct}%"></div>
        </div>

        <!-- Cabecera del Test directamente sobre el fondo difuminado -->
        <header class="quiz-header">
          <div class="quiz-header-top">
            <div class="quiz-counter-wrap">
              <span class="quiz-num-current">${q.number}</span>
              <span class="quiz-num-total">/ 10</span>
            </div>
            <span class="quiz-section-tag">${q.title}</span>
          </div>

          <h1 class="quiz-question-prompt">${q.prompt}</h1>

          <div class="quiz-rule-banner ${isReady ? "rule-complete" : ""}">
            <span class="rule-dot"></span>
            <span>${ruleCounterText}</span>
          </div>
        </header>

        <!-- Cuerpo de Opciones directamente sobre el fondo difuminado -->
        <section class="quiz-options-section">
          ${optionsHTML}
        </section>

        <!-- Navegación Inferior Fija (Footer con Pinceladas Doradas ← y →) -->
        <footer class="quiz-footer-nav">
          <div class="quiz-footer-left">
            ${
              this.state.currentQuestionIndex > 0
                ? `<button
                    type="button"
                    id="btn-prev-question"
                    class="btn-brush-nav btn-brush-prev ready"
                    aria-label="Volver a la pregunta anterior"
                    title="Anterior"
                  >
                    ${this.renderBrushArrowSVG("left", true)}
                  </button>`
                : `<span class="quiz-footer-hint"></span>`
            }
          </div>

          <div class="quiz-footer-center">
            <span class="palette-hint-label">${isReady ? "Avanzar →" : "Completa la selección"}</span>
          </div>

          <div class="quiz-footer-right">
            <button
              type="button"
              id="btn-palette-next"
              class="btn-brush-nav btn-brush-next ${isReady ? "ready" : "disabled"}"
              ${isReady ? "" : "disabled"}
              aria-label="Avanzar a la siguiente pregunta"
              title="Siguiente"
            >
              ${this.renderBrushArrowSVG("right", isReady)}
            </button>
          </div>
        </footer>
      </main>
    `;
  },

  bindQuizEvents(root) {
    const q = window.QUESTIONS[this.state.currentQuestionIndex];
    const qKey = "q" + q.id;

    // Selección de tarjetas
    root.querySelectorAll(".quiz-option-card").forEach((card) => {
      card.addEventListener("click", () => {
        const optId = card.getAttribute("data-option-id");
        if (q.maxSelections === 1) {
          this.state.answers[qKey] = optId;
        } else {
          const current = [...this.getSelectedArrayForQuestion(q.id)];
          const idx = current.indexOf(optId);
          if (idx >= 0) {
            current.splice(idx, 1);
          } else if (current.length < q.maxSelections) {
            current.push(optId);
          } else {
            // Reemplazar la última si ya estaba en el límite para fluidez táctil
            current[current.length - 1] = optId;
          }
          this.state.answers[qKey] = current;
        }
        this.saveSessionProgress();
        this.renderCurrentView();
      });
    });

    // Botón ← Anterior (Incrementa telemetría oculta de indecisión y dispara transición de pincelazos)
    const prevBtn = root.querySelector("#btn-prev-question");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        this.recordQuestionElapsed();
        const currentQNum = q.id;
        this.state.telemetry.backButtonTotalClicks++;
        if (!this.state.telemetry.backButtonQuestions.includes(currentQNum)) {
          this.state.telemetry.backButtonQuestions.push(currentQNum);
        }
        this.saveSessionProgress();

        this.runBrushTransition(() => {
          this.state.currentQuestionIndex = Math.max(0, this.state.currentQuestionIndex - 1);
          this.state.telemetry.questionEnterTime = Date.now();
          this.saveSessionProgress();
          this.renderCurrentView();
        });
      });
    }

    // Botón Siguiente → (Pincelada dorada que dispara animación de Brochazos de 950ms)
    const nextBtn = root.querySelector("#btn-palette-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (!this.isQuestionReady(q)) return;
        this.recordQuestionElapsed();
        this.saveSessionProgress();

        this.runBrushTransition(() => {
          if (this.state.currentQuestionIndex < window.QUESTIONS.length - 1) {
            this.state.currentQuestionIndex++;
            this.state.telemetry.questionEnterTime = Date.now();
            this.renderCurrentView();
          } else {
            this.state.currentView = "form";
            this.renderCurrentView();
          }
        });
      });
    }
  },

  /* ============================================================================
   * VISTA 3: CUESTIONARIO DEMOGRÁFICO POST-TEST (OBLIGATORIO + HABEAS DATA)
   * Incluye opción múltiple de selección única con las 11 carreras oficiales
   * ============================================================================ */
  isDemographicFormValid() {
    const u = this.state.userData;
    const nameValid = (u.full_name || "").trim().length >= 2;
    const programValid = window.ACADEMIC_PROGRAMS.includes(u.academic_program);
    const ageNum = Number(u.age);
    const ageValid = Number.isInteger(ageNum) && ageNum >= 14 && ageNum <= 99;
    const genderValid = window.GENDER_OPTIONS.includes(u.gender);
    const consentValid = u.privacy_consent === true;
    return nameValid && programValid && ageValid && genderValid && consentValid;
  },

  renderFormHTML() {
    const u = this.state.userData;
    const isValid = this.isDemographicFormValid();

    return `
      <main class="mobile-viewport demographic-screen">
        <div class="demographic-card">
          <span class="demographic-kicker">LIENZO COMPLETADO · 100%</span>
          <h1 class="demographic-title">Tu lienzo está listo.</h1>
          <p class="demographic-subtitle">
            Antes de revelar qué maestro habita en ti, cuéntanos un poco sobre quién sostiene el pincel.
          </p>

          <form id="demographic-form" class="demographic-form" novalidate>
            <!-- 1. Nombre completo o Alias -->
            <div class="form-group">
              <label for="input-fullname" class="form-label">1. Nombre completo o Alias *</label>
              <input
                type="text"
                id="input-fullname"
                class="form-input"
                placeholder="Ej. Valentina Gómez"
                value="${u.full_name}"
                minlength="2"
                required
              />
            </div>

            <!-- 2. Programa / Carrera Universitaria (Opción múltiple selección única con las 11 carreras) -->
            <div class="form-group">
              <label class="form-label">2. Programa / Carrera Universitaria * <small>(Selecciona 1 opción)</small></label>
              <div class="programs-multiple-choice" role="radiogroup" aria-label="Programa o Carrera Universitaria">
                ${window.ACADEMIC_PROGRAMS.map((prog) => {
                  const active = u.academic_program === prog;
                  return `
                    <button
                      type="button"
                      class="program-choice-option ${active ? "selected" : ""}"
                      data-program="${prog}"
                      role="radio"
                      aria-checked="${active}"
                    >
                      <span class="program-radio-circle"></span>
                      <span class="program-choice-name">${prog}</span>
                    </button>
                  `;
                }).join("")}
              </div>
            </div>

            <!-- 3. Edad -->
            <div class="form-group">
              <label for="input-age" class="form-label">3. Edad (14 – 99 años) *</label>
              <input
                type="number"
                id="input-age"
                class="form-input"
                placeholder="Ej. 20"
                min="14"
                max="99"
                value="${u.age}"
                required
              />
            </div>

            <!-- 4. Género -->
            <div class="form-group">
              <label class="form-label">4. Género *</label>
              <div class="gender-pills-group" role="radiogroup" aria-label="Género">
                ${window.GENDER_OPTIONS.map((g) => {
                  const active = u.gender === g;
                  return `
                    <button
                      type="button"
                      class="gender-pill-btn ${active ? "selected" : ""}"
                      data-gender="${g}"
                      role="radio"
                      aria-checked="${active}"
                    >
                      ${g}
                    </button>
                  `;
                }).join("")}
              </div>
            </div>

            <!-- 5. Consentimiento Legal / Habeas Data -->
            <div class="form-group habeas-group">
              <label class="habeas-checkbox-label">
                <input
                  type="checkbox"
                  id="input-consent"
                  class="habeas-checkbox"
                  ${u.privacy_consent ? "checked" : ""}
                  required
                />
                <span class="habeas-text">
                  Autorizo de manera previa, expresa e informada el tratamiento de mis datos personales con fines académicos, estadísticos y de análisis cultural dentro del proyecto <strong>Reflejo Creativo</strong>, conforme a la Ley 1581 de 2012 (Habeas Data) y la política de privacidad vigente.
                </span>
              </label>
              <button type="button" id="btn-open-legal-modal" class="btn-legal-link">
                Ver política de tratamiento de datos
              </button>
            </div>

            <!-- Botón de Envío -->
            <button
              type="submit"
              id="btn-submit-demographic"
              class="btn-reveal-artist ${isValid ? "ready" : "disabled"}"
              ${isValid ? "" : "disabled"}
            >
              Revelar mi Artista →
            </button>
          </form>
        </div>

        <!-- Modal Legal Habeas Data -->
        <div id="legal-modal" class="curatorial-modal" style="display:none;" role="dialog" aria-modal="true">
          <div class="curatorial-modal-content">
            <span class="modal-kicker">AVISO DE PRIVACIDAD // LEY 1581 DE 2012</span>
            <h3>Política de Tratamiento de Datos Personales</h3>
            <p>
              El proyecto académico y cultural <strong>Reflejo Creativo (Archetype // El Trazo Interno)</strong> recolecta datos básicos de perfilamiento demográfico y preferencias estéticas con fines exclusivamente <strong>académicos, pedagógicos y de visualización estadística universitaria</strong>.
            </p>
            <ul>
              <li><strong>Finalidad:</strong> Analizar tendencias culturales, afinidades artísticas por programa académico y métricas agregadas de interacción en el Dashboard Curatorial.</li>
              <li><strong>Confidencialidad:</strong> Los datos no serán comercializados, cedidos ni transferidos a terceros ajenos al ejercicio académico.</li>
              <li><strong>Derechos del Titular:</strong> Como titular de la información tienes derecho a conocer, actualizar, rectificar y solicitar la supresión de tus datos en cualquier momento conforme a la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013.</li>
            </ul>
            <button type="button" id="btn-close-legal-modal" class="btn-primary-curatorial">
              Entendido y Cerrar
            </button>
          </div>
        </div>
      </main>
    `;
  },

  bindFormEvents(root) {
    const updateSubmitState = () => {
      const btn = root.querySelector("#btn-submit-demographic");
      if (!btn) return;
      const valid = this.isDemographicFormValid();
      btn.disabled = !valid;
      btn.classList.toggle("ready", valid);
      btn.classList.toggle("disabled", !valid);
    };

    const nameInput = root.querySelector("#input-fullname");
    const ageInput = root.querySelector("#input-age");
    const consentInput = root.querySelector("#input-consent");

    nameInput?.addEventListener("input", (e) => {
      this.state.userData.full_name = e.target.value;
      updateSubmitState();
    });

    ageInput?.addEventListener("input", (e) => {
      this.state.userData.age = e.target.value;
      updateSubmitState();
    });

    consentInput?.addEventListener("change", (e) => {
      this.state.userData.privacy_consent = e.target.checked;
      updateSubmitState();
    });

    // Opción múltiple de las 11 carreras
    root.querySelectorAll(".program-choice-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.state.userData.academic_program = btn.getAttribute("data-program");
        root.querySelectorAll(".program-choice-option").forEach((b) => {
          const active = b.getAttribute("data-program") === this.state.userData.academic_program;
          b.classList.toggle("selected", active);
          b.setAttribute("aria-checked", String(active));
        });
        updateSubmitState();
      });
    });

    // Píldoras de género
    root.querySelectorAll(".gender-pill-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.state.userData.gender = btn.getAttribute("data-gender");
        root.querySelectorAll(".gender-pill-btn").forEach((b) => {
          const active = b.getAttribute("data-gender") === this.state.userData.gender;
          b.classList.toggle("selected", active);
          b.setAttribute("aria-checked", String(active));
        });
        updateSubmitState();
      });
    });

    // Modal Legal
    const legalModal = root.querySelector("#legal-modal");
    root.querySelector("#btn-open-legal-modal")?.addEventListener("click", () => {
      if (legalModal) legalModal.style.display = "flex";
    });
    root.querySelector("#btn-close-legal-modal")?.addEventListener("click", () => {
      if (legalModal) legalModal.style.display = "none";
    });

    // Envío del formulario -> Calcula resultado, guarda en base de datos y lanza brochazo final
    root.querySelector("#demographic-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!this.isDemographicFormValid()) return;

      const calc = window.ScoringEngine.calculateResult(this.state.answers);
      this.state.resultData = calc;

      const nowIso = new Date().toISOString();
      const qTimes = this.state.telemetry.questionTimeMs;
      const totalMs = Object.values(qTimes).reduce((acc, v) => acc + (v || 6500), 0);
      const subId = "rc-" + Date.now().toString(36);
      this.state.submissionId = subId;

      const submissionRecord = {
        id: subId,
        created_at: nowIso,
        user_data: {
          full_name: this.state.userData.full_name.trim(),
          academic_program: this.state.userData.academic_program,
          age: Number(this.state.userData.age),
          gender: this.state.userData.gender,
          privacy_consent: true,
          consent_timestamp: nowIso
        },
        test_result: {
          primary_artist_id: calc.primary_artist_id,
          primary_artist_name: calc.primary_artist_name,
          primary_archetype: calc.primary_archetype,
          primary_score: calc.primary_score,
          primary_affinity_percent: calc.primary_affinity_percent,
          runner_up_artists: calc.runner_up_artists,
          answers_log: calc.answers_log
        },
        telemetry_hidden: {
          device_type: this.detectDeviceString(),
          total_duration_seconds: Math.max(25, Math.round(totalMs / 1000)),
          back_button_total_clicks: this.state.telemetry.backButtonTotalClicks,
          back_button_questions: this.state.telemetry.backButtonQuestions,
          question_time_ms: qTimes,
          dominant_tags: calc.dominant_tags,
          shared_or_downloaded: false
        }
      };

      window.StorageService.saveSubmission(submissionRecord);
      sessionStorage.removeItem("reflejo_creativo_active_session");

      this.runBrushTransition(() => {
        this.state.currentView = "result";
        this.renderCurrentView();
      });
    });
  },

  /* ============================================================================
   * VISTA 4: PANTALLA DE RESULTADO FINAL Y VIRALIZACIÓN
   * Diseñada con la estética exacta de Captura de pantalla 2026-11-18 223759.png
   * ============================================================================ */
  renderResultHTML() {
    const res = this.state.resultData || window.ScoringEngine.calculateResult(this.state.answers);
    const artist = res.artistObj || window.ARTISTS[0];
    const userName = this.state.userData.full_name || "Visitante";
    const meta = res.narrative_meta || {
      emotion: "Euforia",
      chromatic: "Luz Orgánica",
      words: ["DESGARRO", "URGENCIA", "ATMÓSFERA"]
    };

    return `
      <main class="mobile-viewport result-screen">
        <!-- BLOQUE A: REVELACIÓN VISUAL (ABOVE THE FOLD - ESTÉTICA VAN GOGH / AIVAZOVSKY) -->
        <section class="result-hero-block">
          <!-- Retrato del artista a sangre desde carpeta autoretratos artistas -->
          <div class="result-portrait-backdrop">
            <img src="${artist.portrait}" alt="${artist.name}" class="result-portrait-img" />
            <div class="result-portrait-vignette"></div>
          </div>

          <!-- Barra superior sobre el retrato -->
          <header class="result-top-nav">
            <span class="result-top-kicker">ARCHETYPE // RESULTADO</span>
          </header>

          <!-- Línea de vida vertical a la derecha (Estética Ivan Aivazovsky 1817 --- 1900) -->
          <div class="result-vertical-lifespan" aria-hidden="true">
            <span>${artist.lifespan}</span>
          </div>

          <!-- Contenido superpuesto al retrato -->
          <div class="result-hero-content">
            <p class="result-personal-greeting">${userName}, tu arquetipo artístico es:</p>

            <h1 class="result-artist-name">
              <span>${artist.displayFirstName}</span>
              <span>${artist.displayLastName}</span>
            </h1>

            <div class="result-badges-row">
              <span class="result-archetype-badge" style="border-color:${artist.color}; background:${artist.color}33">
                ${artist.archetype} — ${artist.style}
              </span>
              <span class="result-affinity-pill">
                ${res.primary_affinity_percent}% de compatibilidad
              </span>
            </div>

            <!-- Mini-Galería de 3 Obras Más Famosas ("Famous Artworks" de la carpeta del artista) -->
            <div class="famous-artworks-block">
              <div class="famous-artworks-header">
                <h2>Famous Artworks / Obras Cumbres</h2>
                <span class="tap-hint">Toca una obra para ampliar</span>
              </div>

              <div class="famous-artworks-grid">
                ${artist.artworks
                  .map(
                    (art, idx) => `
                  <button
                    type="button"
                    class="famous-artwork-card"
                    data-artwork-index="${idx}"
                    aria-label="Ver detalle de ${art.title}"
                  >
                    <div class="famous-artwork-img-wrap">
                      <img src="${art.image}" alt="${art.title}" />
                    </div>
                    <div class="famous-artwork-caption">
                      <strong>${art.title}</strong>
                      <span>${art.year}</span>
                    </div>
                  </button>
                `
                  )
                  .join("")}
              </div>
            </div>

            <!-- Botón circular de scroll hacia el Bloque B (como en pantalla "The Ninth Wave") -->
            <div class="scroll-down-trigger-wrap">
              <a href="#result-block-b" class="btn-circle-scroll-down" aria-label="Deslizar al análisis psicológico">
                ↓
              </a>
            </div>
          </div>
        </section>

        <!-- BLOQUE B: ANÁLISIS PSICOLÓGICO, AFINIDADES Y VIRALIZACIÓN (ESTÉTICA "HISTORY") -->
        <section id="result-block-b" class="result-editorial-block">
          <!-- Estructura inspirada en la 3ra pantalla móvil (Rótulo vertical History + Metadatos) -->
          <div class="history-editorial-grid">
            <div class="history-vertical-col">
              <span class="history-rotated-label">History &amp; Soul</span>
            </div>

            <div class="history-main-col">
              <div class="curatorial-specs-grid">
                <div class="spec-item">
                  <span class="spec-value">${artist.style.toUpperCase()}</span>
                  <span class="spec-label">Movimiento / Técnica</span>
                </div>
                <div class="spec-item">
                  <span class="spec-value">${meta.emotion.toUpperCase()} · ${meta.chromatic.toUpperCase()}</span>
                  <span class="spec-label">Ancla Emocional &amp; Cromática</span>
                </div>
              </div>

              <h3 class="psych-section-title">Por qué eres ${artist.name}</h3>
              <p class="psych-description-body">${artist.description}</p>

              <!-- Resumen Dinámico de Elecciones -->
              <div class="dynamic-choices-box" style="border-left-color:${artist.color}">
                <span class="choices-box-kicker">LECTURA DE TU TRAZO INTERNO</span>
                <p>
                  Tu elección de la emoción ancla <strong>${meta.emotion}</strong>, combinada con tu resonancia cromática <strong>${meta.chromatic}</strong> y tus activadores creativos (<strong>${meta.words.join(", ")}</strong>), revelan una mente que comparte la misma sensibilidad plástica que <strong>${artist.name}</strong>.
                </p>
              </div>
            </div>
          </div>

          <!-- Afinidad Secundaria (2º y 3º lugar) -->
          <div class="runner-ups-card">
            <span class="runner-ups-kicker">MATICES SECUNDARIOS DE TU PERFIL</span>
            <h3 class="runner-ups-title">2.º y 3.º Artista Más Cercano</h3>

            <div class="runner-ups-list">
              ${res.runner_up_artists
                .map(
                  (r, i) => `
                <div class="runner-up-item">
                  <img src="${r.portrait}" alt="${r.name}" class="runner-up-avatar" />
                  <div class="runner-up-body">
                    <div class="runner-up-head">
                      <strong>#${i + 2} · ${r.name}</strong>
                      <span class="runner-up-pct">${r.affinity_percent}% afinidad</span>
                    </div>
                    <span class="runner-up-arch">${r.archetype} — ${r.style}</span>
                    <div class="runner-up-bar-track">
                      <div class="runner-up-bar-fill" style="width:${r.affinity_percent}%; background:${r.color}"></div>
                    </div>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <!-- Módulo de Exportación y Viralización -->
          <div class="viral-actions-card">
            <span class="runner-ups-kicker">EXPORTACIÓN &amp; VIRALIDAD</span>
            <h3 class="runner-ups-title">Comparte tu Arquetipo</h3>

            <button type="button" id="btn-download-story" class="btn-viral-primary">
              <span>↓ Descargar Tarjeta para Stories (9:16)</span>
            </button>

            <button type="button" id="btn-share-friend" class="btn-viral-secondary">
              <span>Compartir con un Amigo</span>
            </button>

            <div id="share-social-links" class="share-social-Drawer" style="display:none;">
              <a id="link-share-wa" href="#" target="_blank" rel="noopener" class="social-pill wa-pill">WhatsApp</a>
              <a id="link-share-x" href="#" target="_blank" rel="noopener" class="social-pill x-pill">X (Twitter)</a>
            </div>

            <button type="button" id="btn-restart-quiz" class="btn-viral-tertiary">
              ↺ Reiniciar el Test / Probar de nuevo
            </button>
          </div>
        </section>

        <!-- LIGHTBOX DE OBRA A PANTALLA COMPLETA (Inspirado en 3ra pantalla "The Ninth Wave") -->
        <div id="artwork-lightbox" class="artwork-lightbox-modal" style="display:none;" role="dialog" aria-modal="true">
          <div class="lightbox-card">
            <button type="button" id="btn-close-lightbox" class="btn-close-lightbox" aria-label="Cerrar obra">✕</button>
            <div class="lightbox-image-stage">
              <img id="lightbox-img" src="" alt="" />
              <div class="lightbox-img-gradient"></div>
              <h2 id="lightbox-title" class="lightbox-art-title"></h2>
            </div>
            <div class="lightbox-history-body">
              <div class="lightbox-vertical-tag">
                <span>History</span>
              </div>
              <div class="lightbox-meta-col">
                <div class="lightbox-spec-block">
                  <strong id="lightbox-medium">ÓLEO SOBRE LIENZO</strong>
                  <span>Medium / Técnica</span>
                </div>
                <div class="lightbox-spec-block">
                  <strong id="lightbox-dimensions">73.7 CM × 92.1 CM</strong>
                  <span>Dimensions / Formato</span>
                </div>
                <p id="lightbox-history-text" class="lightbox-narrative"></p>
              </div>
              <div class="lightbox-year-vertical">
                <span id="lightbox-year">1889</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Toast flotante -->
        <div id="app-toast" class="app-toast" style="display:none;">¡Enlace copiado al portapapeles!</div>
      </main>
    `;
  },

  showToast(msg) {
    const toast = document.getElementById("app-toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 3200);
  },

  bindResultEvents(root) {
    const res = this.state.resultData || window.ScoringEngine.calculateResult(this.state.answers);
    const artist = res.artistObj || window.ARTISTS[0];

    // Abrir Lightbox al tocar cualquiera de las 3 obras famosas
    const lightbox = root.querySelector("#artwork-lightbox");
    root.querySelectorAll(".famous-artwork-card").forEach((card) => {
      card.addEventListener("click", () => {
        const idx = Number(card.getAttribute("data-artwork-index") || 0);
        const art = artist.artworks[idx];
        if (!art || !lightbox) return;

        root.querySelector("#lightbox-img").src = art.image;
        root.querySelector("#lightbox-img").alt = art.title;
        root.querySelector("#lightbox-title").textContent = art.title;
        root.querySelector("#lightbox-medium").textContent = art.medium || "ÓLEO SOBRE LIENZO";
        root.querySelector("#lightbox-dimensions").textContent = art.dimensions || "COLECCIÓN MUSEÍSTICA";
        root.querySelector("#lightbox-year").textContent = art.year;
        root.querySelector("#lightbox-history-text").textContent = art.history || artist.description;
        lightbox.style.display = "flex";
      });
    });

    root.querySelector("#btn-close-lightbox")?.addEventListener("click", () => {
      if (lightbox) lightbox.style.display = "none";
    });
    lightbox?.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.style.display = "none";
    });

    // Botón 1: Descargar Tarjeta para Stories (9:16 - 1080x1920px)
    const downloadBtn = root.querySelector("#btn-download-story");
    downloadBtn?.addEventListener("click", async () => {
      const originalText = downloadBtn.innerHTML;
      downloadBtn.innerHTML = "<span>Generando Póster 9:16 (1080×1920px)...</span>";
      window.StorageService.markSharedOrDownloaded(this.state.submissionId);
      await window.PosterGenerator.generateAndDownload(this.state.userData, res);
      downloadBtn.innerHTML = originalText;
      this.showToast("¡Tarjeta 9:16 descargada con éxito!");
    });

    // Botón 2: Compartir con un Amigo
    const shareBtn = root.querySelector("#btn-share-friend");
    const socialDrawer = root.querySelector("#share-social-links");
    shareBtn?.addEventListener("click", async () => {
      window.StorageService.markSharedOrDownloaded(this.state.submissionId);
      const shareUrl = window.location.href.split("#")[0];
      const shareText = `¡Hice el test de Reflejo Creativo y mi personalidad artística es ${artist.name} (${artist.archetype})! Descubre qué pintor habita en ti aquí: ${shareUrl}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: "Reflejo Creativo // Archetype",
            text: shareText,
            url: shareUrl
          });
          return;
        } catch (err) {
          // Fallback to clipboard + social drawer
        }
      }

      try {
        await navigator.clipboard.writeText(shareText);
      } catch (e) {
        // Fallback
      }
      this.showToast("¡Enlace copiado al portapapeles!");
      if (socialDrawer) {
        socialDrawer.style.display = "flex";
        root.querySelector("#link-share-wa").href = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        root.querySelector("#link-share-x").href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
      }
    });

    // Botón 3: Reiniciar el Test
    root.querySelector("#btn-restart-quiz")?.addEventListener("click", () => {
      this.runBrushTransition(() => {
        this.state.currentView = "landing";
        this.state.currentQuestionIndex = 0;
        this.state.answers = {};
        this.renderCurrentView();
      });
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.ReflejoApp.init();
});
