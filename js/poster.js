/**
 * REFLEJO CREATIVO — Generador Programático de Tarjeta Vertical 9:16 (1080x1920px)
 * Utiliza Data URIs locales (window.IMAGE_DATA_URIS) para garantizar cero errores CORS
 * incluso ejecutándose directamente desde file:// o en dispositivos móviles.
 */

window.PosterGenerator = {
  loadImage(path) {
    return new Promise((resolve) => {
      const img = new Image();
      const dataUri = (window.IMAGE_DATA_URIS && window.IMAGE_DATA_URIS[path]) || path;
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = dataUri;
    });
  },

  drawCoverImage(ctx, img, x, y, w, h) {
    if (!img) return;
    const imgRatio = img.width / img.height;
    const boxRatio = w / h;
    let sx = 0,
      sy = 0,
      sw = img.width,
      sh = img.height;

    if (imgRatio > boxRatio) {
      sw = img.height * boxRatio;
      sx = (img.width - sw) / 2;
    } else {
      sh = img.width / boxRatio;
      sy = (img.height - sh) / 4;
    }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  },

  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  },

  wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
    const words = text.split(" ");
    let line = "";
    let linesDrawn = 0;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, y);
        line = words[n] + " ";
        y += lineHeight;
        linesDrawn++;
        if (linesDrawn >= maxLines - 1) break;
      } else {
        line = testLine;
      }
    }
    if (line.trim()) {
      ctx.fillText(line.trim(), x, y);
      y += lineHeight;
    }
    return y;
  },

  async generateAndDownload(userData, resultData) {
    const artist = resultData.artistObj || window.ARTISTS.find((a) => a.id === resultData.primary_artist_id) || window.ARTISTS[0];
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");

    // 1. Fondo principal estilo galería oscura (#121518)
    ctx.fillStyle = "#121518";
    ctx.fillRect(0, 0, 1080, 1920);

    // 2. Cargar autorretrato y 3 obras famosas desde Data URIs seguros
    const [portraitImg, art1Img, art2Img, art3Img] = await Promise.all([
      this.loadImage(artist.portrait),
      this.loadImage(artist.artworks[0]?.image),
      this.loadImage(artist.artworks[1]?.image),
      this.loadImage(artist.artworks[2]?.image)
    ]);

    // 3. Dibujar autorretrato superior a sangre (inspirado en referencia móvil)
    ctx.save();
    this.drawCoverImage(ctx, portraitImg, 0, 0, 1080, 1020);
    ctx.restore();

    // 4. Degradados cinematográficos sobre el retrato
    const topGrad = ctx.createLinearGradient(0, 0, 0, 260);
    topGrad.addColorStop(0, "rgba(18, 21, 24, 0.85)");
    topGrad.addColorStop(1, "rgba(18, 21, 24, 0)");
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, 1080, 260);

    const midGrad = ctx.createLinearGradient(0, 480, 0, 1030);
    midGrad.addColorStop(0, "rgba(18, 21, 24, 0)");
    midGrad.addColorStop(0.55, "rgba(18, 21, 24, 0.78)");
    midGrad.addColorStop(1, "#121518");
    ctx.fillStyle = midGrad;
    ctx.fillRect(0, 480, 1080, 560);

    // Resplandor con el color firma del artista
    const glowGrad = ctx.createRadialGradient(240, 880, 40, 240, 880, 620);
    glowGrad.addColorStop(0, artist.color + "55");
    glowGrad.addColorStop(1, "rgba(18, 21, 24, 0)");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 400, 1080, 750);

    // Marco fino interior estilo curatorial
    ctx.strokeStyle = "rgba(242, 232, 223, 0.22)";
    ctx.lineWidth = 2;
    ctx.strokeRect(44, 44, 992, 1832);

    // 5. Encabezado Editorial
    ctx.fillStyle = "#BDD3E1";
    ctx.font = "600 22px 'Inter', sans-serif";
    ctx.fillText("REFLEJO CREATIVO  //  ARCHETYPE", 84, 104);

    const userName = (userData?.full_name || "VISITANTE").toUpperCase();
    ctx.fillStyle = "#F2E8DF";
    ctx.font = "500 24px 'Inter', sans-serif";
    ctx.fillText(`EL TRAZO INTERNO DE ${userName}`, 84, 144);

    // Badge de afinidad superior derecha
    const affinityText = `${resultData.primary_affinity_percent || 95}% AFINIDAD`;
    ctx.save();
    this.roundRect(ctx, 760, 78, 236, 54, 27);
    ctx.fillStyle = artist.color;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = "#FAF8F5";
    ctx.font = "700 22px 'Syne', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(affinityText, 878, 113);
    ctx.restore();

    // 6. Línea vertical de época a la derecha (como en referencia Ivan Aivazovsky)
    ctx.save();
    ctx.translate(985, 480);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = "rgba(242, 232, 223, 0.72)";
    ctx.font = "600 24px 'Cormorant Garamond', Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText(artist.lifespan || "MAESTRO CLÁSICO", 0, 0);
    ctx.restore();

    // 7. Nombre Monumental del Pintor en dos líneas (como en referencia Van Gogh)
    ctx.fillStyle = "#FAF8F5";
    ctx.font = "700 96px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText(artist.displayFirstName || artist.name, 84, 745);
    ctx.fillText(artist.displayLastName || "", 84, 838);

    // Arquetipo y Estilo Artístico
    ctx.fillStyle = "#BDD3E1";
    ctx.font = "italic 600 34px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText(`${artist.archetype}  —  ${artist.style}`, 84, 895);

    // 8. Descripción psicológica breve
    ctx.fillStyle = "rgba(242, 232, 223, 0.86)";
    ctx.font = "400 25px 'Inter', sans-serif";
    this.wrapText(ctx, artist.description, 84, 952, 912, 37, 3);

    // 9. Las 3 palabras activadoras elegidas en la Pregunta 5
    const words = resultData.narrative_meta?.words || ["ATMÓSFERA", "MISTERIO", "SILENCIO"];
    let chipX = 84;
    const chipY = 1075;
    ctx.font = "600 20px 'Inter', sans-serif";
    words.forEach((word) => {
      const label = `#${word}`;
      const w = ctx.measureText(label).width + 44;
      this.roundRect(ctx, chipX, chipY, w, 46, 23);
      ctx.fillStyle = "rgba(74, 116, 128, 0.28)";
      ctx.fill();
      ctx.strokeStyle = "#4A7480";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "#FAF8F5";
      ctx.fillText(label, chipX + 22, chipY + 30);
      chipX += w + 16;
    });

    // 10. Galería de 3 Obras Más Famosas ("Famous Artworks" estilo referencia móvil)
    ctx.fillStyle = "#FAF8F5";
    ctx.font = "600 32px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText("Famous Artworks / Obras Cumbres", 84, 1180);

    const artImgs = [art1Img, art2Img, art3Img];
    const cardW = 286;
    const cardH = 385;
    const gap = 26;
    const startX = 84;
    const startY = 1208;

    artist.artworks.slice(0, 3).forEach((art, idx) => {
      const x = startX + idx * (cardW + gap);
      const y = startY;

      ctx.save();
      this.roundRect(ctx, x, y, cardW, cardH, 10);
      ctx.clip();
      ctx.fillStyle = "#1E262B";
      ctx.fillRect(x, y, cardW, cardH);
      this.drawCoverImage(ctx, artImgs[idx], x, y, cardW, cardH);

      const cardGrad = ctx.createLinearGradient(0, y + cardH - 150, 0, y + cardH);
      cardGrad.addColorStop(0, "rgba(18,21,24,0)");
      cardGrad.addColorStop(1, "rgba(18,21,24,0.92)");
      ctx.fillStyle = cardGrad;
      ctx.fillRect(x, y + cardH - 150, cardW, 150);
      ctx.restore();

      // Borde sutil de la obra
      ctx.save();
      this.roundRect(ctx, x, y, cardW, cardH, 10);
      ctx.strokeStyle = "rgba(242, 232, 223, 0.24)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Título y año de la obra
      ctx.fillStyle = "#FAF8F5";
      ctx.font = "600 20px 'Cormorant Garamond', Georgia, serif";
      const shortTitle = art.title.length > 26 ? art.title.slice(0, 24) + "…" : art.title;
      ctx.fillText(shortTitle, x + 16, y + cardH - 44);
      ctx.fillStyle = "#BDD3E1";
      ctx.font = "500 17px 'Inter', sans-serif";
      ctx.fillText(art.year, x + 16, y + cardH - 18);
    });

    // 11. Pie de firma con QR estilizado e invitación
    ctx.strokeStyle = "rgba(242, 232, 223, 0.18)";
    ctx.beginPath();
    ctx.moveTo(84, 1650);
    ctx.lineTo(996, 1650);
    ctx.stroke();

    ctx.fillStyle = "#F2E8DF";
    ctx.font = "700 32px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText("¿Qué artista habita en tu forma de ver el mundo?", 84, 1715);

    ctx.fillStyle = "#BDD3E1";
    ctx.font = "400 22px 'Inter', sans-serif";
    ctx.fillText(
      `Programa: ${userData?.academic_program || "Comunidad Universitaria"}`,
      84,
      1760
    );
    ctx.fillStyle = "rgba(242, 232, 223, 0.6)";
    ctx.font = "400 20px 'Inter', sans-serif";
    ctx.fillText("Escanea el código QR en sala para descubrir tu arquetipo artístico.", 84, 1798);

    // Mini QR Simbólico Vectorial
    const qrX = 880;
    const qrY = 1682;
    ctx.fillStyle = "#FAF8F5";
    this.roundRect(ctx, qrX, qrY, 116, 116, 10);
    ctx.fill();
    ctx.fillStyle = "#121518";
    const cells = [
      [1,1,1,0,1,1,1],
      [1,0,1,1,1,0,1],
      [1,1,1,0,1,1,1],
      [0,1,0,1,0,1,0],
      [1,1,1,1,0,1,1],
      [1,0,1,0,1,0,1],
      [1,1,1,0,1,1,1]
    ];
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (cells[r][c]) {
          ctx.fillRect(qrX + 14 + c * 12.5, qrY + 14 + r * 12.5, 11, 11);
        }
      }
    }

    // 12. Descargar PNG
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `Reflejo-Creativo-${artist.slug}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
