const proposalAssetBase = document.documentElement.dataset.assetBase || ".";

const profile = {
  firstName: "Alejandro",
  lastName: "Flores Patiño",
  role: "Socio",
  firm: "Loperena Lerch y Martín del Campo",
  mobile: "55 3082 0068",
  mobileLink: "5530820068",
  office: "55 52 86 90 86",
  officeLink: "5552869086",
  extension: "114",
  email: "alejandro.flores@loperena.mx",
  linkedin: "https://www.linkedin.com/in/alejandro-flores-pati%C3%B1o-86101055/?skipRedirect=true",
  photo: `${proposalAssetBase}/alejandro-flores/assets/img/foto-ale.jpeg`,
  cv: `${proposalAssetBase}/alejandro-flores/assets/cv/CV_Alejandro_Flores_Patino.pdf`
};

const themes = [
  { id: 1, className: "concept-navy", label: "Propuesta 01", palette: "navy" },
  { id: 2, className: "concept-charcoal", label: "Propuesta 02", palette: "graphite" },
  { id: 3, className: "concept-midnight", label: "Propuesta 03", palette: "steel" },
  { id: 4, className: "concept-signature", label: "Propuesta 04", palette: "mist" }
];

const singleTheme = Number(document.documentElement.dataset.singleTheme || 0);

const alejandroPalettes = {
  navy: { label: "Azul noche", chip: "#18202f" },
  graphite: { label: "Azul pizarra", chip: "#28334b" },
  steel: { label: "Gris traje", chip: "#52515a" },
  mist: { label: "Azul corbata", chip: "#616487" },
  slate: { label: "Azul hielo", chip: "#7893aa" }
};

const services = [
  "Arbitraje comercial",
  "Derecho corporativo",
  "Propiedad industrial",
  "Derechos de autor",
  "Derecho contractual",
  "Joint venture",
  "Fideicomisos",
  "Compraventa de acciones",
  "Distribución",
  "Transferencia de tecnología",
  "Datos personales",
  "Regulación",
  "Cumplimiento legal"
];

const address = "Campeche 315 piso 3, Hipódromo Condesa, Cuauhtémoc, 06170 Ciudad de México, CDMX";
const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Campeche+315+Piso+3+Hip%C3%B3dromo+Condesa+Cuauht%C3%A9moc+06170+Ciudad+de+M%C3%A9xico+CDMX";
const wazeUrl = "https://waze.com/ul?q=Campeche+315+Piso+3+Hip%C3%B3dromo+Condesa+Cuauht%C3%A9moc+CDMX&navigate=yes";
const whatsappUrl = `https://wa.me/${profile.mobileLink}?text=${encodeURIComponent("Hola, vi tu tarjeta digital")}`;

function paletteSelector(theme, selectedPalette) {
  return `
    <section class="alejandro-palette-selector" aria-label="Probar colores">
      <span>Probar colores</span>
      <div>${Object.entries(alejandroPalettes).map(([key, palette]) => `
        <button type="button" data-ale-palette="${key}" class="${selectedPalette === key ? "is-active" : ""}" aria-label="${palette.label}" title="${palette.label}">
          <i style="--chip:${palette.chip}"></i><small>${palette.label}</small>
        </button>`).join("")}</div>
    </section>`;
}

function proposalFrame(theme, selectedPalette, card) {
  return `
    <div class="proposal">
      <div class="proposal-heading">
        <p class="proposal-label">${theme.label}</p>
        ${singleTheme ? "" : `<a href="${proposalAssetBase}/alejandro-flores/propuestas/propuesta-${String(theme.id).padStart(2, "0")}.html">Ver individual</a>`}
      </div>
      ${paletteSelector(theme, selectedPalette)}
      ${card}
    </div>`;
}

function mapArtwork() {
  return `<div class="map-card" aria-hidden="true"><span></span><span></span><span></span><b></b></div>`;
}

function diplomaticCard(theme, selectedPalette) {
  return `
    <article class="executive-card ${theme.className}" data-theme-id="${theme.id}" data-palette="${selectedPalette}">
      <header class="executive-hero">
        <div class="executive-photo"><img src="${profile.photo}" alt="Alejandro Flores Patiño"></div>
        <p class="firm-mark">Loperena Lerch<br>y Martín del Campo</p>
        <div class="executive-identity">
          <p class="executive-role">${profile.role}</p>
          <h2 class="executive-name"><span>${profile.firstName}</span><span>${profile.lastName}</span></h2>
        </div>
      </header>

      <nav class="quick-actions" aria-label="Acciones rápidas">
        <a class="quick-action" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer"><img src="${proposalAssetBase}/assets/icons/whatsapp.svg" alt=""><span>WhatsApp<small>Celular</small></span></a>
        <a class="quick-action" href="tel:${profile.officeLink}"><img src="${proposalAssetBase}/assets/icons/call.svg" alt=""><span>Oficina<small>Ext. ${profile.extension}</small></span></a>
        <a class="quick-action" href="mailto:${profile.email}"><img src="${proposalAssetBase}/assets/icons/email.svg" alt=""><span>Email</span></a>
      </nav>

      <section class="professional-links" aria-label="Redes y correo">
        <a class="professional-link" href="${profile.linkedin}" target="_blank" rel="noopener noreferrer"><img src="${proposalAssetBase}/assets/icons/linkedin.svg" alt="">LinkedIn</a>
        <button class="professional-link" type="button" data-action="copy" data-value="${profile.email}">Copiar email</button>
      </section>

      <section class="contact-panel" aria-label="Datos de contacto">
        <div class="contact-row"><div class="contact-copy"><small>Celular / WhatsApp</small><strong>${profile.mobile}</strong></div><button class="copy-button" type="button" data-action="copy" data-value="${profile.mobile}">Copiar</button></div>
        <div class="contact-row"><div class="contact-copy"><small>Oficina · Ext. ${profile.extension}</small><strong>${profile.office}</strong></div><button class="copy-button" type="button" data-action="copy" data-value="${profile.office}">Copiar</button></div>
        <div class="contact-row"><div class="contact-copy"><small>Correo electrónico</small><strong>${profile.email}</strong></div><button class="copy-button" type="button" data-action="copy" data-value="${profile.email}">Copiar</button></div>
      </section>

      <details class="services" open><summary>Áreas / Servicios <span aria-hidden="true">⌄</span></summary><ul class="service-tags">${services.map((service) => `<li>${service}</li>`).join("")}</ul></details>
      <section class="final-actions" aria-label="Acciones finales"><button type="button" data-action="save-contact">Guardar contacto</button><a href="${profile.cv}" target="_blank" rel="noopener noreferrer">Ver CV</a><button type="button" data-action="share">Compartir</button></section>
      <section class="location-section" aria-label="Ubicación del despacho"><p class="location-title"><span aria-hidden="true"></span>Ubicación del despacho</p>${mapArtwork()}<address>Campeche 315 · Piso 3<br>Hipódromo Condesa · Cuauhtémoc, CDMX 06170</address><div class="location-actions"><button type="button" data-action="copy" data-value="${address}">Copiar</button><a href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Maps</a><a href="${wazeUrl}" target="_blank" rel="noopener noreferrer">Waze</a></div></section>
    </article>`;
}

function editorialCard(theme, selectedPalette) {
  return `
    <article class="executive-card ${theme.className} editorial-card" data-theme-id="${theme.id}" data-palette="${selectedPalette}">
      <header class="editorial-hero">
        <div class="editorial-photo"><img src="${profile.photo}" alt="Alejandro Flores Patiño"></div>
        <div class="editorial-title">
          <p class="editorial-firm">Loperena Lerch<br>y Martín del Campo</p>
          <span class="editorial-rule" aria-hidden="true"></span>
          <p>${profile.role}</p>
          <h2><span>${profile.firstName}</span><span>${profile.lastName}</span></h2>
        </div>
      </header>

      <nav class="editorial-action-index" aria-label="Contacto principal">
        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer"><b>01</b><span>WhatsApp<small>${profile.mobile}</small></span><i>↗</i></a>
        <a href="tel:${profile.officeLink}"><b>02</b><span>Oficina<small>${profile.office} · Ext. ${profile.extension}</small></span><i>↗</i></a>
        <a href="mailto:${profile.email}"><b>03</b><span>Correo<small>${profile.email}</small></span><i>↗</i></a>
      </nav>

      <section class="editorial-directory" aria-label="Directorio profesional">
        <div class="editorial-section-title"><p>Directorio profesional</p><span>Contacto</span></div>
        <dl>
          <div><dt>Celular / WhatsApp</dt><dd>${profile.mobile}<button type="button" data-action="copy" data-value="${profile.mobile}">Copiar</button></dd></div>
          <div><dt>Oficina</dt><dd>${profile.office} · Ext. ${profile.extension}<button type="button" data-action="copy" data-value="${profile.office}">Copiar</button></dd></div>
          <div><dt>Correo electrónico</dt><dd>${profile.email}<button type="button" data-action="copy" data-value="${profile.email}">Copiar</button></dd></div>
          <div><dt>Perfil profesional</dt><dd><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></dd></div>
        </dl>
      </section>

      <section class="editorial-practice" aria-label="Áreas de práctica">
        <div class="editorial-section-title"><p>Áreas / Servicios</p><span>${String(services.length).padStart(2, "0")} áreas</span></div>
        <ol>${services.map((service, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span>${service}</li>`).join("")}</ol>
      </section>

      <section class="editorial-utility" aria-label="Acciones del perfil">
        <button type="button" data-action="save-contact">Guardar contacto</button>
        <a href="${profile.cv}" target="_blank" rel="noopener noreferrer">Consultar CV</a>
        <button type="button" data-action="share">Compartir perfil</button>
      </section>

      <section class="editorial-location" aria-label="Ubicación del despacho">
        <div><p>Ubicación del despacho</p><address>Campeche 315 · Piso 3<br>Hipódromo Condesa · Cuauhtémoc<br>Ciudad de México · 06170</address></div>
        <nav><button type="button" data-action="copy" data-value="${address}">Copiar dirección</button><a href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Google Maps</a><a href="${wazeUrl}" target="_blank" rel="noopener noreferrer">Waze</a></nav>
      </section>
    </article>`;
}

function bentoCard(theme, selectedPalette) {
  return `
    <article class="executive-card ${theme.className} bento-card" data-theme-id="${theme.id}" data-palette="${selectedPalette}">
      <header class="bento-hero">
        <div class="bento-brand"><p>Loperena Lerch y Martín del Campo</p></div>
        <div class="bento-profile"><div><img src="${profile.photo}" alt="Alejandro Flores Patiño"></div><section><p>${profile.role}</p><h2>${profile.firstName}<br>${profile.lastName}</h2></section></div>
      </header>

      <section class="bento-dashboard" aria-label="Panel de contacto">
        <a class="bento-tile bento-primary" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer"><small>Contacto directo</small><strong>WhatsApp</strong><span>${profile.mobile} ↗</span></a>
        <a class="bento-tile" href="tel:${profile.officeLink}"><small>Despacho</small><strong>Oficina</strong><span>${profile.office}<br>Ext. ${profile.extension}</span></a>
        <a class="bento-tile" href="mailto:${profile.email}"><small>Escríbeme</small><strong>Email</strong><span class="mt-0">${profile.email}</span></a>
        <article class="bento-tile bento-profile-tile"><small>Perfil profesional</small><p>Socio en ${profile.firm}.</p><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><button type="button" data-action="copy" data-value="${profile.email}">Copiar email</button></article>
      </section>

      <details class="bento-services" open><summary><span>Áreas / Servicios</span><small>${services.length} especialidades</small><i aria-hidden="true">+</i></summary><ul>${services.map((service) => `<li>${service}</li>`).join("")}</ul></details>

      <section class="bento-utility" aria-label="Acciones del perfil"><button type="button" data-action="save-contact"><span>01</span>Guardar contacto</button><a href="${profile.cv}" target="_blank" rel="noopener noreferrer"><span>02</span>Ver CV</a><button type="button" data-action="share"><span>03</span>Compartir</button></section>

      <section class="bento-location" aria-label="Ubicación del despacho">
        <header><p>Visítanos</p><span>CDMX</span></header>
        ${mapArtwork()}
        <address>Campeche 315, Piso 3<br>Hipódromo Condesa · Cuauhtémoc · 06170</address>
        <div><button type="button" data-action="copy" data-value="${address}">Copiar</button><a href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Maps</a><a href="${wazeUrl}" target="_blank" rel="noopener noreferrer">Waze</a></div>
      </section>
    </article>`;
}

function signatureCard(theme, selectedPalette) {
  return `
    <article class="executive-card ${theme.className} signature-card" data-theme-id="${theme.id}" data-palette="${selectedPalette}">
      <header class="signature-masthead"><p>Loperena Lerch y Martín del Campo</p><span>Perfil de socio · 04</span></header>
      <section class="signature-cover">
        <div class="signature-identity"><p>${profile.role}</p><h2><span>${profile.firstName}</span><span>${profile.lastName}</span></h2><i aria-hidden="true"></i></div>
        <div class="signature-photo"><img src="${profile.photo}" alt="Alejandro Flores Patiño"></div>
      </section>

      <nav class="signature-command-list" aria-label="Contacto principal">
        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer"><span><small>01 · Celular</small>WhatsApp</span><strong>${profile.mobile}</strong><i>↗</i></a>
        <a href="tel:${profile.officeLink}"><span><small>02 · Despacho</small>Oficina</span><strong>${profile.office} · Ext. ${profile.extension}</strong><i>↗</i></a>
        <a href="mailto:${profile.email}"><span><small>03 · Mensaje</small>Correo</span><strong>${profile.email}</strong><i>↗</i></a>
      </nav>

      <section class="signature-contact-cards" aria-label="Información profesional">
        <article><span>Correo electrónico</span><strong>${profile.email}</strong><button type="button" data-action="copy" data-value="${profile.email}">Copiar</button></article>
        <article><span>Red profesional</span><strong>LinkedIn</strong><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer">Abrir perfil</a></article>
      </section>

      <section class="signature-practice" aria-label="Áreas de práctica">
        <header><div><small>Experiencia</small><h3>Áreas / Servicios</h3></div><span>${services.length}</span></header>
        <ul>${services.map((service) => `<li>${service}</li>`).join("")}</ul>
      </section>

      <section class="signature-utility" aria-label="Acciones del perfil"><button type="button" data-action="save-contact">Guardar contacto</button><a href="${profile.cv}" target="_blank" rel="noopener noreferrer">Ver currículum</a><button type="button" data-action="share">Compartir</button></section>

      <section class="signature-location" aria-label="Ubicación del despacho">
        <div class="signature-address"><small>Ciudad de México</small><h3>Ubicación del despacho</h3><address>Campeche 315 · Piso 3<br>Hipódromo Condesa · Cuauhtémoc<br>CDMX · 06170</address></div>
        <div class="signature-route"><a href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Maps ↗</a><a href="${wazeUrl}" target="_blank" rel="noopener noreferrer">Waze ↗</a><button type="button" data-action="copy" data-value="${address}">Copiar dirección</button></div>
      </section>
    </article>`;
}

function cardTemplate(theme) {
  let selectedPalette = theme.palette;
  try {
    const requestedPalette = new URLSearchParams(window.location.search).get("paleta");
    const storedPalette = window.localStorage.getItem(`storylaw-alejandro-palette-${theme.id}`);
    if (storedPalette === "forest") selectedPalette = "mist";
    if (storedPalette === "burgundy") selectedPalette = "slate";
    if (alejandroPalettes[storedPalette]) selectedPalette = storedPalette;
    if (alejandroPalettes[requestedPalette]) selectedPalette = requestedPalette;
  } catch {}

  const cards = {
    1: diplomaticCard,
    2: editorialCard,
    3: bentoCard,
    4: signatureCard
  };

  return proposalFrame(theme, selectedPalette, cards[theme.id](theme, selectedPalette));
}

const proposals = document.getElementById("alejandroProposals");
const visibleThemes = singleTheme ? themes.filter((theme) => theme.id === singleTheme) : themes;
if (proposals) proposals.innerHTML = visibleThemes.map(cardTemplate).join("");

function showToast(message) {
  const toast = document.getElementById("previewToast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  showToast("Copiado");
}

function downloadVCard() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${profile.lastName};${profile.firstName};;;`,
    `FN:${profile.firstName} ${profile.lastName}`,
    `ORG:${profile.firm}`,
    `TITLE:${profile.role}`,
    `TEL;TYPE=CELL:${profile.mobileLink}`,
    `TEL;TYPE=WORK:${profile.officeLink}`,
    `NOTE:Extensión ${profile.extension}`,
    `EMAIL:${profile.email}`,
    `URL:${profile.linkedin}`,
    "ADR;TYPE=WORK:;;Campeche 315 piso 3;Ciudad de México;CDMX;06170;México",
    "END:VCARD"
  ].join("\n");

  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "alejandro-flores-patino.vcf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Contacto descargado");
}

async function shareProfile() {
  const payload = {
    title: "Alejandro Flores Patiño",
    text: "Te comparto mis datos de contacto",
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(payload);
      showToast("Compartido");
      return;
    } catch {
      return;
    }
  }

  await copyText(window.location.href);
  showToast("Enlace copiado");
}

document.addEventListener("click", (event) => {
  const paletteButton = event.target.closest("[data-ale-palette]");
  if (paletteButton) {
    const proposal = paletteButton.closest(".proposal");
    const card = proposal?.querySelector(".executive-card");
    const palette = paletteButton.dataset.alePalette;
    if (card && alejandroPalettes[palette]) {
      card.dataset.palette = palette;
      try {
        window.localStorage.setItem(`storylaw-alejandro-palette-${card.dataset.themeId}`, palette);
      } catch {}
      proposal.querySelectorAll("[data-ale-palette]").forEach((button) => {
        button.classList.toggle("is-active", button === paletteButton);
      });
    }
    return;
  }

  const button = event.target.closest("[data-action]");
  if (!button) return;

  if (button.dataset.action === "copy") copyText(button.dataset.value || "");
  if (button.dataset.action === "save-contact") downloadVCard();
  if (button.dataset.action === "share") shareProfile();
});
