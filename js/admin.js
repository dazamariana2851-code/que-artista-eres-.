/**
 * REFLEJO CREATIVO — Módulo del Dashboard Analítico Privado (admin.html)
 * Registra y analiza exclusivamente los participantes reales que completan el test.
 */

window.AdminDashboard = {
  isAuthenticated: false,
  timeFilter: "all", // 'all' | '7d' | 'today'
  programFilter: "all",
  searchQuery: "",

  checkCredentials(user, pass) {
    const u = (user || "").trim().toLowerCase();
    const p = (pass || "").trim();
    const validUser = u === "admin@reflejocreativo.edu" || u === "admin";
    const validPass = p === "Arte2026*" || p === "123456";
    if (validUser && validPass) {
      this.isAuthenticated = true;
      sessionStorage.setItem("rc_admin_auth", "1");
      return true;
    }
    return false;
  },

  initAuthFromSession() {
    if (sessionStorage.getItem("rc_admin_auth") === "1") {
      this.isAuthenticated = true;
    }
  },

  logout() {
    this.isAuthenticated = false;
    sessionStorage.removeItem("rc_admin_auth");
  },

  getFilteredSubmissions() {
    const all = window.StorageService.getAllSubmissions();
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const sevenDaysAgo = now.getTime() - 7 * 86400000;

    return all.filter((s) => {
      const createdMs = new Date(s.created_at).getTime();
      if (this.timeFilter === "today" && createdMs < startOfToday) return false;
      if (this.timeFilter === "7d" && createdMs < sevenDaysAgo) return false;
      if (this.programFilter !== "all" && s.user_data?.academic_program !== this.programFilter) return false;
      return true;
    });
  },

  formatDuration(sec) {
    const s = Math.round(sec || 0);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return m > 0 ? `${m}m ${String(rem).padStart(2, "0")}s` : `${rem}s`;
  },

  render(container) {
    this.initAuthFromSession();

    if (!this.isAuthenticated) {
      container.innerHTML = this.renderLoginHTML();
      this.bindLoginEvents(container);
      return;
    }

    const filtered = this.getFilteredSubmissions();
    container.innerHTML = this.renderDashboardHTML(filtered);
    this.bindDashboardEvents(container, filtered);
  },

  renderLoginHTML() {
    return `
      <div class="admin-login-screen">
        <div class="admin-login-card">
          <div class="admin-login-badge">ACCESO CURATORIAL PRIVADO // DASHBOARD</div>
          <h1 class="admin-login-title">Panel Analítico<br><span>Reflejo Creativo</span></h1>
          <p class="admin-login-sub">Ingresa las credenciales de curaduría para auditar las métricas demográficas, afinidades artísticas y telemetría cognitiva oculta.</p>

          <form id="admin-login-form" class="admin-login-form">
            <div class="form-field">
              <label for="admin-user">Usuario o Correo Institucional</label>
              <input type="text" id="admin-user" value="admin@reflejocreativo.edu" placeholder="admin@reflejocreativo.edu" required />
            </div>
            <div class="form-field">
              <label for="admin-pass">Contraseña / PIN Curatorial</label>
              <input type="password" id="admin-pass" value="Arte2026*" placeholder="••••••••" required />
            </div>
            <div id="admin-login-error" class="admin-login-error" style="display:none;">
              Credenciales inválidas. Usa las credenciales demo indicadas abajo.
            </div>
            <button type="submit" class="btn-primary-curatorial">Ingresar al Dashboard →</button>
          </form>

          <div class="admin-demo-credentials">
            <strong>Credenciales Demo Preconfiguradas:</strong><br/>
            Usuario: <code>admin@reflejocreativo.edu</code> (o <code>admin</code>)<br/>
            Contraseña: <code>Arte2026*</code> (o <code>123456</code>)
          </div>
        </div>
      </div>
    `;
  },

  bindLoginEvents(container) {
    const form = container.querySelector("#admin-login-form");
    const err = container.querySelector("#admin-login-error");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = container.querySelector("#admin-user").value;
      const p = container.querySelector("#admin-pass").value;
      if (this.checkCredentials(u, p)) {
        this.render(container);
      } else {
        err.style.display = "block";
      }
    });
  },

  computeAnalytics(submissions) {
    const total = submissions.length;
    const totalScans = Math.max(window.StorageService.getTotalQrScans(), total);
    const completionRate = total > 0 && totalScans > 0 ? Math.min(100, Math.round((total / totalScans) * 100)) : 0;

    // 1. Conteo por artista
    const artistCounts = {};
    window.ARTISTS.forEach((a) => (artistCounts[a.id] = 0));
    submissions.forEach((s) => {
      const id = s.test_result?.primary_artist_id;
      if (id && artistCounts[id] !== undefined) artistCounts[id]++;
    });

    const rankedArtists = window.ARTISTS.map((a) => ({
      ...a,
      count: artistCounts[a.id] || 0,
      percent: total > 0 ? Math.round(((artistCounts[a.id] || 0) / total) * 100) : 0
    })).sort((a, b) => b.count - a.count || a.id - b.id);

    const topArtist =
      total > 0 && rankedArtists[0].count > 0
        ? rankedArtists[0]
        : { name: "Sin registros", archetype: "Esperando participantes", percent: 0 };

    // 2. Conteo por carrera y artista líder dentro de cada carrera
    const programStats = window.ACADEMIC_PROGRAMS.map((prog) => {
      const inProg = submissions.filter((s) => s.user_data?.academic_program === prog);
      const count = inProg.length;
      const byArtist = {};
      inProg.forEach((s) => {
        const aName = s.test_result?.primary_artist_name;
        if (aName) byArtist[aName] = (byArtist[aName] || 0) + 1;
      });
      const leaderArtist =
        Object.entries(byArtist).sort((a, b) => b[1] - a[1])[0]?.[0] || "Sin registros";
      return {
        program: prog,
        count,
        percent: total > 0 ? Math.round((count / total) * 100) : 0,
        leaderArtist
      };
    }).sort((a, b) => b.count - a.count);

    const topProgram =
      total > 0 && programStats[0].count > 0
        ? programStats[0]
        : { program: "Sin registros", count: 0 };

    // 3. Edad promedio y Género
    let ageSum = 0;
    const genderCounts = {
      Femenino: 0,
      Masculino: 0,
      "No binario": 0,
      "Prefiero no decirlo": 0
    };
    const ageCohorts = {
      "14–18 años": 0,
      "19–21 años": 0,
      "22–25 años": 0,
      "26+ años": 0
    };

    submissions.forEach((s) => {
      const age = Number(s.user_data?.age || 0);
      if (age > 0) {
        ageSum += age;
        if (age <= 18) ageCohorts["14–18 años"]++;
        else if (age <= 21) ageCohorts["19–21 años"]++;
        else if (age <= 25) ageCohorts["22–25 años"]++;
        else ageCohorts["26+ años"]++;
      }

      const g = s.user_data?.gender;
      if (g && genderCounts[g] !== undefined) genderCounts[g]++;
      else if (g) genderCounts["Prefiero no decirlo"]++;
    });

    const avgAge = total > 0 ? (ageSum / total).toFixed(1) : "0.0";
    const topGenderEntry = Object.entries(genderCounts).sort((a, b) => b[1] - a[1])[0] || ["Sin registros", 0];
    const topGender = total > 0 && topGenderEntry[1] > 0 ? topGenderEntry[0] : "Sin registros";
    const topGenderPercent = total > 0 ? Math.round((topGenderEntry[1] / total) * 100) : 0;

    // 4. Telemetría Oculta: Tiempo promedio e Índice de indecisión
    let durationSum = 0;
    let totalBackClicks = 0;
    const questionBackCounts = {};
    const questionTimeSums = {};
    for (let i = 1; i <= 10; i++) {
      questionBackCounts[i] = 0;
      questionTimeSums[i] = 0;
    }

    submissions.forEach((s) => {
      durationSum += Number(s.telemetry_hidden?.total_duration_seconds || 0);
      totalBackClicks += Number(s.telemetry_hidden?.back_button_total_clicks || 0);
      const bq = s.telemetry_hidden?.back_button_questions || [];
      bq.forEach((qNum) => {
        if (questionBackCounts[qNum] !== undefined) questionBackCounts[qNum]++;
      });
      const qt = s.telemetry_hidden?.question_time_ms || {};
      for (let i = 1; i <= 10; i++) {
        questionTimeSums[i] += Number(qt["q" + i] || 0);
      }
    });

    const avgDurationSec = total > 0 ? Math.round(durationSum / total) : 0;
    const avgBackClicks = total > 0 ? (totalBackClicks / total).toFixed(1) : "0.0";

    const mostIndecisiveQ = Object.entries(questionBackCounts).sort((a, b) => b[1] - a[1])[0] || ["1", 0];
    const mostIndecisiveQObj =
      total > 0 && mostIndecisiveQ[1] > 0
        ? window.QUESTIONS.find((q) => q.id === Number(mostIndecisiveQ[0])) || window.QUESTIONS[0]
        : null;

    // 5. Termómetro Emocional (P3) y Mapa de Sombras (P9)
    const emotionsMap = {
      A: { label: "Nostalgia", color: "#9E2A2B", count: 0 },
      B: { label: "Melancolía", color: "#213448", count: 0 },
      C: { label: "Euforia", color: "#D9822B", count: 0 },
      D: { label: "Serenidad", color: "#4A7480", count: 0 },
      E: { label: "Rebeldía", color: "#5F0F40", count: 0 }
    };

    const shadowsMap = {
      A: { label: "Autodestrucción", count: 0, color: "#9E2A2B" },
      B: { label: "Obsesión", count: 0, color: "#4A7480" },
      C: { label: "Adicción / Evasión", count: 0, color: "#D9822B" },
      D: { label: "Dureza / Impaciencia", count: 0, color: "#213448" },
      E: { label: "Arrogancia / Rigidez", count: 0, color: "#54626F" }
    };

    submissions.forEach((s) => {
      const q3 = s.test_result?.answers_log?.q3;
      const q9 = s.test_result?.answers_log?.q9;
      if (q3 && emotionsMap[q3]) emotionsMap[q3].count++;
      if (q9 && shadowsMap[q9]) shadowsMap[q9].count++;
    });

    const questionTelemetry = window.QUESTIONS.map((q) => ({
      id: q.id,
      number: q.number,
      title: q.title,
      avgSeconds: total > 0 ? (questionTimeSums[q.id] / total / 1000).toFixed(1) : "0.0",
      backClicks: questionBackCounts[q.id] || 0
    }));

    return {
      total,
      totalScans,
      completionRate,
      topArtist,
      rankedArtists,
      programStats,
      topProgram,
      avgAge,
      topGender,
      topGenderPercent,
      genderCounts,
      ageCohorts,
      avgDurationSec,
      avgBackClicks,
      mostIndecisiveQObj,
      mostIndecisiveQClicks: mostIndecisiveQ[1],
      emotions: Object.values(emotionsMap),
      shadows: Object.values(shadowsMap),
      questionTelemetry
    };
  },

  renderDonutSVG(genderCounts, total) {
    const colors = {
      Femenino: "#213448",
      Masculino: "#4A7480",
      "No binario": "#D9822B",
      "Prefiero no decirlo": "#9BAAB5"
    };
    const entries = Object.entries(genderCounts);
    const radius = 56;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    const circles = entries
      .map(([label, count]) => {
        if (total === 0 || count === 0) return "";
        const frac = count / total;
        const dash = frac * circumference;
        const gap = circumference - dash;
        const svgCircle = `<circle cx="80" cy="80" r="${radius}" fill="transparent" stroke="${colors[label]}" stroke-width="22" stroke-dasharray="${dash} ${gap}" stroke-dashoffset="${-offset}" />`;
        offset += dash;
        return svgCircle;
      })
      .join("");

    const legend = entries
      .map(([label, count]) => {
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return `
          <div class="donut-legend-item">
            <span class="donut-swatch" style="background:${colors[label]}"></span>
            <span class="donut-label">${label}</span>
            <strong class="donut-val">${count} (${pct}%)</strong>
          </div>
        `;
      })
      .join("");

    return `
      <div class="donut-chart-wrap">
        <svg viewBox="0 0 160 160" class="donut-svg">
          <circle cx="80" cy="80" r="${radius}" fill="transparent" stroke="#E2EAEB" stroke-width="22" />
          ${circles}
          <text x="80" y="76" text-anchor="middle" class="donut-center-num">${total}</text>
          <text x="80" y="96" text-anchor="middle" class="donut-center-sub">PERFILES</text>
        </svg>
        <div class="donut-legend">${legend}</div>
      </div>
    `;
  },

  renderDashboardHTML(submissions) {
    const stats = this.computeAnalytics(submissions);
    const maxArtistCount = Math.max(...stats.rankedArtists.map((a) => a.count), 1);
    const maxProgCount = Math.max(...stats.programStats.map((p) => p.count), 1);
    const maxAgeCount = Math.max(...Object.values(stats.ageCohorts), 1);
    const maxShadowCount = Math.max(...stats.shadows.map((s) => s.count), 1);

    const q3Map = { A: "Nostalgia", B: "Melancolía", C: "Euforia", D: "Serenidad", E: "Rebeldía" };
    const q9Map = {
      A: "Autodestrucción",
      B: "Obsesión",
      C: "Adicción / Evasión",
      D: "Dureza / Impaciencia",
      E: "Arrogancia / Rigidez"
    };

    const filteredTable = submissions.filter((s) => {
      if (!this.searchQuery.trim()) return true;
      const q = this.searchQuery.toLowerCase();
      return (
        (s.user_data?.full_name || "").toLowerCase().includes(q) ||
        (s.user_data?.academic_program || "").toLowerCase().includes(q) ||
        (s.test_result?.primary_artist_name || "").toLowerCase().includes(q) ||
        (s.id || "").toLowerCase().includes(q)
      );
    });

    return `
      <div class="admin-dashboard">
        <!-- Cabecera Global del Dashboard -->
        <header class="admin-header">
          <div class="admin-header-left">
            <span class="admin-kicker">REFLEJO CREATIVO // TELEMETRÍA & HABEAS DATA</span>
            <h1 class="admin-main-title">Dashboard Analítico Curatorial</h1>
          </div>
          <div class="admin-header-actions">
            <button type="button" id="btn-export-csv" class="btn-admin-action btn-export">
              ↓ Exportar Base de Datos (.CSV)
            </button>
            <button type="button" id="btn-logout-admin" class="btn-admin-logout" title="Cerrar sesión">
              Salir
            </button>
          </div>
        </header>

        <!-- Barra de Filtros Globales -->
        <section class="admin-filters-bar">
          <div class="filter-group">
            <label>Rango de Tiempo:</label>
            <div class="segmented-pills">
              <button type="button" class="pill-btn ${this.timeFilter === "all" ? "active" : ""}" data-time="all">Todo el tiempo</button>
              <button type="button" class="pill-btn ${this.timeFilter === "7d" ? "active" : ""}" data-time="7d">Últimos 7 días</button>
              <button type="button" class="pill-btn ${this.timeFilter === "today" ? "active" : ""}" data-time="today">Hoy</button>
            </div>
          </div>

          <div class="filter-group">
            <label for="admin-program-select">Filtrar por Carrera Universitaria:</label>
            <select id="admin-program-select" class="admin-select">
              <option value="all" ${this.programFilter === "all" ? "selected" : ""}>Todas las carreras (${window.ACADEMIC_PROGRAMS.length} programas)</option>
              ${window.ACADEMIC_PROGRAMS.map(
                (prog) => `<option value="${prog}" ${this.programFilter === prog ? "selected" : ""}>${prog}</option>`
              ).join("")}
            </select>
          </div>
        </section>

        <!-- FILA 1: 6 Tarjetas de KPIs Principales -->
        <section class="admin-kpi-grid">
          <article class="kpi-card">
            <span class="kpi-label">01. TOTAL PARTICIPANTES</span>
            <div class="kpi-value">${stats.total}</div>
            <span class="kpi-meta">${stats.completionRate}% tasa de finalización (${stats.totalScans} inicios de test)</span>
          </article>

          <article class="kpi-card">
            <span class="kpi-label">02. ARTISTA DOMINANTE (TOP 1)</span>
            <div class="kpi-value kpi-serif">${stats.topArtist.name}</div>
            <span class="kpi-meta">${stats.topArtist.archetype} (${stats.topArtist.percent}% del total)</span>
          </article>

          <article class="kpi-card">
            <span class="kpi-label">03. CARRERA MÁS ACTIVA</span>
            <div class="kpi-value kpi-medium">${stats.topProgram.program}</div>
            <span class="kpi-meta">${stats.topProgram.count} participantes registrados</span>
          </article>

          <article class="kpi-card">
            <span class="kpi-label">04. EDAD PROMEDIO & GÉNERO</span>
            <div class="kpi-value">${stats.avgAge} <small>años</small></div>
            <span class="kpi-meta">Líder: ${stats.topGender} (${stats.topGenderPercent}%)</span>
          </article>

          <article class="kpi-card kpi-telemetry">
            <span class="kpi-label">05. TIEMPO PROMEDIO DE TEST</span>
            <div class="kpi-value">${this.formatDuration(stats.avgDurationSec)}</div>
            <span class="kpi-meta">Telemetría oculta de sesión P01–P10</span>
          </article>

          <article class="kpi-card kpi-warning">
            <span class="kpi-label">06. ÍNDICE DE INDECISIÓN (ATRÁS)</span>
            <div class="kpi-value">${stats.avgBackClicks} <small>clics/test</small></div>
            <span class="kpi-meta">${
              stats.mostIndecisiveQObj
                ? `Mayor fricción: P${stats.mostIndecisiveQObj.number} (${stats.mostIndecisiveQObj.title})`
                : "Sin retrocesos registrados"
            }</span>
          </article>
        </section>

        <!-- FILA 2: Ranking 18 Artistas + Participación por Carrera -->
        <section class="admin-row-2col">
          <div class="admin-panel">
            <div class="panel-header">
              <h2>Gráfico 1 — Ranking de los 18 Artistas Detectados</h2>
              <span class="panel-subtitle">Distribución acumulada de arquetipos asignados</span>
            </div>
            <div class="artists-ranking-list">
              ${stats.rankedArtists
                .map(
                  (a, idx) => `
                <div class="ranking-row">
                  <span class="ranking-pos">${String(idx + 1).padStart(2, "0")}</span>
                  <img src="${a.portrait}" alt="${a.name}" class="ranking-avatar" />
                  <div class="ranking-info">
                    <div class="ranking-title-line">
                      <strong>${a.name}</strong>
                      <span class="ranking-count">${a.count} (${a.percent}%)</span>
                    </div>
                    <div class="ranking-bar-track">
                      <div class="ranking-bar-fill" style="width:${a.count > 0 ? Math.max(4, (a.count / maxArtistCount) * 100) : 0}%; background:${a.color}"></div>
                    </div>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <div class="admin-panel">
            <div class="panel-header">
              <h2>Gráfico 2 — Participación por Carrera y Cruce Artístico</h2>
              <span class="panel-subtitle">Volumen por programa universitario y su Artista Top #1</span>
            </div>
            <div class="programs-ranking-list">
              ${stats.programStats
                .map(
                  (p) => `
                <div class="program-row">
                  <div class="program-row-head">
                    <strong>${p.program}</strong>
                    <span class="program-badge-artist">Top 1: ${p.leaderArtist}</span>
                  </div>
                  <div class="program-bar-wrap">
                    <div class="ranking-bar-track">
                      <div class="ranking-bar-fill" style="width:${p.count > 0 ? Math.max(3, (p.count / maxProgCount) * 100) : 0}%; background:#4A7480"></div>
                    </div>
                    <span class="program-count-num">${p.count} (${p.percent}%)</span>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </section>

        <!-- FILA 3: Demografía (Género y Edad) -->
        <section class="admin-row-2col">
          <div class="admin-panel">
            <div class="panel-header">
              <h2>Gráfico 3 — Distribución por Género</h2>
              <span class="panel-subtitle">Composición demográfica de la muestra</span>
            </div>
            ${this.renderDonutSVG(stats.genderCounts, stats.total)}
          </div>

          <div class="admin-panel">
            <div class="panel-header">
              <h2>Gráfico 4 — Distribución por Rangos de Edad</h2>
              <span class="panel-subtitle">Histograma vertical por cohortes generacionales</span>
            </div>
            <div class="age-histogram">
              ${Object.entries(stats.ageCohorts)
                .map(([label, count]) => {
                  const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                  const hPct = count > 0 ? Math.max(8, Math.round((count / maxAgeCount) * 100)) : 0;
                  return `
                    <div class="age-bar-col">
                      <span class="age-bar-val">${count} (${pct}%)</span>
                      <div class="age-bar-track">
                        <div class="age-bar-fill" style="height:${hPct}%"></div>
                      </div>
                      <span class="age-bar-label">${label}</span>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>
        </section>

        <!-- FILA 4: Analítica Psicológica Invisible y Fricción Cognitiva -->
        <section class="admin-row-3col">
          <div class="admin-panel">
            <div class="panel-header">
              <h2>Gráfico 5 — Termómetro Emocional Colectivo (P03)</h2>
              <span class="panel-subtitle">Estado de ánimo ancla de la comunidad</span>
            </div>
            <div class="psych-bars-list">
              ${stats.emotions
                .map((e) => {
                  const pct = stats.total > 0 ? Math.round((e.count / stats.total) * 100) : 0;
                  return `
                    <div class="psych-bar-item">
                      <div class="psych-bar-head">
                        <span>${e.label}</span>
                        <strong>${e.count} (${pct}%)</strong>
                      </div>
                      <div class="ranking-bar-track">
                        <div class="ranking-bar-fill" style="width:${e.count > 0 ? Math.max(4, pct) : 0}%; background:${e.color}"></div>
                      </div>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>

          <div class="admin-panel">
            <div class="panel-header">
              <h2>Gráfico 6 — Mapa de Sombras y Bloqueos (P09)</h2>
              <span class="panel-subtitle">Tendencias de autosabotaje confesadas anónimamente</span>
            </div>
            <div class="psych-bars-list">
              ${stats.shadows
                .map((sh) => {
                  const pct = stats.total > 0 ? Math.round((sh.count / stats.total) * 100) : 0;
                  const wPct = sh.count > 0 ? Math.max(4, Math.round((sh.count / maxShadowCount) * 100)) : 0;
                  return `
                    <div class="psych-bar-item">
                      <div class="psych-bar-head">
                        <span>${sh.label}</span>
                        <strong>${sh.count} (${pct}%)</strong>
                      </div>
                      <div class="ranking-bar-track">
                        <div class="ranking-bar-fill" style="width:${wPct}%; background:${sh.color}"></div>
                      </div>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>

          <div class="admin-panel">
            <div class="panel-header">
              <h2>Gráfico 7 — Telemetría de Fricción Cognitiva (P01–P10)</h2>
              <span class="panel-subtitle">Tiempo medio de decisión (seg)</span>
            </div>
            <div class="telemetry-table-wrap">
              <table class="telemetry-mini-table">
                <thead>
                  <tr>
                    <th>Pregunta</th>
                    <th>Tiempo Medio</th>
                  </tr>
                </thead>
                <tbody>
                  ${stats.questionTelemetry
                    .map(
                      (qt) => `
                    <tr>
                      <td><strong>P${qt.number}</strong> · ${qt.title}</td>
                      <td>${qt.avgSeconds}s</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- FILA 5: Tabla Auditable de Registros -->
        <section class="admin-panel admin-table-panel">
          <div class="table-header-bar">
            <div>
              <h2>Registro Auditable de Participantes (${filteredTable.length})</h2>
              <span class="panel-subtitle">Datos explícitos de formulario + telemetría invisible por sesión</span>
            </div>
            <input
              type="search"
              id="admin-table-search"
              class="admin-search-input"
              placeholder="Buscar por nombre, carrera o artista..."
              value="${this.searchQuery}"
            />
          </div>

          <div class="admin-table-responsive">
            <table class="admin-data-table">
              <thead>
                <tr>
                  <th>ID Sesión</th>
                  <th>Fecha / Hora</th>
                  <th>Participante</th>
                  <th>Programa Académico</th>
                  <th>Edad / Género</th>
                  <th>Artista Asignado</th>
                  <th>Emoción / Sombra (P3/P9)</th>
                  <th>Tiempo Total</th>
                  <th>Cambios (Atrás)</th>
                  <th>Consentimiento</th>
                </tr>
              </thead>
              <tbody>
                ${
                  filteredTable.length === 0
                    ? `
                      <tr>
                        <td colspan="10" style="text-align:center; padding: 28px 16px; color: var(--color-text-secondary);">
                          Aún no hay participantes registrados. Los datos aparecerán aquí automáticamente en cuanto un usuario complete el test.
                        </td>
                      </tr>
                    `
                    : filteredTable
                        .map((s) => {
                          const d = new Date(s.created_at);
                          const dateStr =
                            d.toLocaleDateString("es-CO", { day: "2-digit", month: "short" }) +
                            " " +
                            d.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
                          const ans = s.test_result?.answers_log || {};
                          const bq = s.telemetry_hidden?.back_button_questions || [];
                          return `
                      <tr>
                        <td><code>${s.id}</code></td>
                        <td>${dateStr}</td>
                        <td><strong>${s.user_data?.full_name || "Anónimo"}</strong></td>
                        <td>${s.user_data?.academic_program || ""}</td>
                        <td>${s.user_data?.age} años · ${s.user_data?.gender}</td>
                        <td>
                          <span class="table-artist-badge">
                            ${s.test_result?.primary_artist_name} (${s.test_result?.primary_affinity_percent}%)
                          </span>
                        </td>
                        <td>${q3Map[ans.q3] || "—"} / ${q9Map[ans.q9] || "—"}</td>
                        <td>${this.formatDuration(s.telemetry_hidden?.total_duration_seconds)}</td>
                        <td>
                          ${
                            bq.length > 0
                              ? `<span class="indecision-pill high">${bq.length} (${bq.map((q) => "P" + q).join(", ")})</span>`
                              : `<span class="indecision-pill">0 (Directo)</span>`
                          }
                        </td>
                        <td><span class="habeas-ok-badge">✓ Habeas Data OK</span></td>
                      </tr>
                    `;
                        })
                        .join("")
                }
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `;
  },

  bindDashboardEvents(container, filtered) {
    // Botón Exportar CSV
    container.querySelector("#btn-export-csv")?.addEventListener("click", () => {
      window.StorageService.exportCSV(filtered);
    });

    // Logout
    container.querySelector("#btn-logout-admin")?.addEventListener("click", () => {
      this.logout();
      this.render(container);
    });

    // Filtros de rango de tiempo
    container.querySelectorAll("[data-time]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.timeFilter = btn.getAttribute("data-time");
        this.render(container);
      });
    });

    // Filtro de Carrera Universitaria
    container.querySelector("#admin-program-select")?.addEventListener("change", (e) => {
      this.programFilter = e.target.value;
      this.render(container);
    });

    // Buscador de la tabla
    const searchInput = container.querySelector("#admin-table-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.render(container);
        const newInput = container.querySelector("#admin-table-search");
        if (newInput) {
          newInput.focus();
          newInput.setSelectionRange(newInput.value.length, newInput.value.length);
        }
      });
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const adminRoot = document.getElementById("admin-root");
  if (adminRoot) {
    window.StorageService.init();
    window.AdminDashboard.render(adminRoot);
    window.addEventListener("storage", () => {
      window.AdminDashboard.render(adminRoot);
    });
  }
});
