const PROPOSAL_PROFILES = {
  ana: {
    slug: "ana-laura-flores",
    firstName: "Ana Laura",
    lastName: "Flores Ferrer",
    role: "Asociada",
    office: "55 52 86 90 86",
    officeLink: "5552869086",
    extension: "119",
    schedule: "Atención de 11:00 a 18:00 horas",
    mobile: "56 18 69 35 33",
    mobileLink: "5618693533",
    email: "analaura.flores@loperena.mx",
    linkedin: "https://www.linkedin.com/in/ana-laura-flores-ferrer-8812893b9/"
  },
  monica: {
    slug: "monica-mora",
    firstName: "Mónica",
    lastName: "Mora Martín",
    role: "Asociada",
    office: "55 52 86 90 86",
    officeLink: "5552869086",
    extension: "115",
    schedule: "",
    mobile: "55 17 98 98 07",
    mobileLink: "5517989807",
    email: "monica.mora@loperena.mx",
    linkedin: ""
  }
};

const COLOR_PALETTES = {
  sage: { label: "Salvia", chip: "#5d7563" },
  wine: { label: "Vino", chip: "#7a4854" },
  ink: { label: "Azul tinta", chip: "#25364a" },
  rose: { label: "Rosa humo", chip: "#8e5e68" },
  mocha: { label: "Café cálido", chip: "#6b5243" }
};

const DEFAULT_PALETTES = {
  1: "sage",
  2: "wine",
  3: "ink",
  4: "sage",
  5: "rose",
  6: "mocha",
  7: "ink",
  8: "wine",
  9: "sage",
  10: "mocha"
};

const FIRM = "Loperena Lerch y Martín del Campo";
const ADDRESS = "Campeche 315 piso 3, Hipódromo Condesa, Cuauhtémoc, 06170 Ciudad de México, CDMX";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Campeche+315+Piso+3+Hip%C3%B3dromo+Condesa+Cuauht%C3%A9moc+06170+Ciudad+de+M%C3%A9xico+CDMX";
const WAZE_URL = "https://waze.com/ul?q=Campeche+315+Piso+3+Hip%C3%B3dromo+Condesa+Cuauht%C3%A9moc+CDMX&navigate=yes";
const SERVICES = [
  "Derecho corporativo",
  "Derecho contractual",
  "Datos personales",
  "Cumplimiento legal",
  "Arbitraje comercial"
];

const body = document.body;
let personKey = body.dataset.person;
const themeNumber = Number(body.dataset.theme || 1);
let activePalette = body.dataset.palette || DEFAULT_PALETTES[themeNumber] || "sage";
try {
  const storedPalette = window.localStorage.getItem(`storylaw-palette-${themeNumber}`);
  if (storedPalette === "lavender") activePalette = "mocha";
  if (COLOR_PALETTES[storedPalette]) activePalette = storedPalette;
  const searchParams = new URLSearchParams(window.location.search);
  const requestedProfile = searchParams.get("perfil");
  if (PROPOSAL_PROFILES[requestedProfile]) personKey = requestedProfile;
  const requestedPalette = searchParams.get("paleta");
  if (requestedPalette === "lavender") activePalette = "mocha";
  if (COLOR_PALETTES[requestedPalette]) activePalette = requestedPalette;
} catch {}
let person = PROPOSAL_PROFILES[personKey];
const mount = document.getElementById("proposalMount");
if (activePalette === "lavender") activePalette = "mocha";

body.classList.add(`theme-${themeNumber}`);
body.dataset.person = personKey;
body.dataset.palette = activePalette;

function syncThemeColor() {
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor && COLOR_PALETTES[activePalette]) themeColor.content = COLOR_PALETTES[activePalette].chip;
}

syncThemeColor();

function configuratorTemplate() {
  return `
    <section class="proposal-configurator" aria-label="Personalizar vista">
      <div class="profile-selector" role="group" aria-label="Seleccionar abogada">
        <span>Ver datos de</span>
        <div>
          <button type="button" data-profile-option="ana" class="${personKey === "ana" ? "is-active" : ""}">Ana Laura</button>
          <button type="button" data-profile-option="monica" class="${personKey === "monica" ? "is-active" : ""}">Mónica</button>
        </div>
      </div>
      <div class="palette-selector" role="group" aria-label="Seleccionar colores">
        <span>Probar colores</span>
        <div>${Object.entries(COLOR_PALETTES).map(([key, palette]) => `
          <button type="button" data-palette-option="${key}" class="${activePalette === key ? "is-active" : ""}" aria-label="${palette.label}" title="${palette.label}">
            <i style="--chip:${palette.chip}"></i>
          </button>`).join("")}</div>
      </div>
    </section>`;
}

function whatsappUrl() {
  return `https://wa.me/52${person.mobileLink}?text=${encodeURIComponent("Hola, vi tu tarjeta digital")}`;
}

function icon(name) {
  return `<img src="../../assets/icons/${name}.svg" alt="">`;
}

function serviceList(className = "service-tags") {
  return `<ul class="${className}">${SERVICES.map((service) => `<li>${service}</li>`).join("")}</ul>`;
}

function linkedInLink(className, label = "LinkedIn") {
  return person.linkedin
    ? `<a class="${className}" href="${person.linkedin}" target="_blank" rel="noopener noreferrer">${icon("linkedin")}<span>${label}</span></a>`
    : "";
}

function compactLocation(className = "location-block") {
  return `
    <section class="${className}" aria-label="Ubicación del despacho">
      <div class="section-heading"><span>Ubicación</span><small>Ciudad de México</small></div>
      <address>Campeche 315 · Piso 3<br>Hipódromo Condesa · Cuauhtémoc, CDMX 06170</address>
      <div class="location-links">
        <button type="button" data-action="copy" data-value="${ADDRESS}">Copiar</button>
        <a href="${MAPS_URL}" target="_blank" rel="noopener noreferrer">Maps</a>
        <a href="${WAZE_URL}" target="_blank" rel="noopener noreferrer">Waze</a>
      </div>
    </section>`;
}

function finalActions(className = "utility-actions") {
  return `
    <section class="${className}" aria-label="Acciones de la tarjeta">
      <button type="button" data-action="save-contact">Guardar contacto</button>
      <button type="button" data-action="share">Compartir</button>
      <button type="button" disabled>CV pendiente</button>
    </section>`;
}

function minimalTemplate() {
  return `
    <article class="proposal-card layout-minimal" aria-label="Propuesta minimalista para ${person.firstName} ${person.lastName}">
      <header class="minimal-hero">
        <span class="minimal-rule" aria-hidden="true"></span>
        <p>${person.role}</p>
        <h1><span>${person.firstName}</span><span>${person.lastName}</span></h1>
        <small>${FIRM}</small>
      </header>

      <nav class="minimal-dock" aria-label="Acciones rápidas">
        <a href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer">${icon("whatsapp")}<span>WhatsApp</span></a>
        <a href="tel:${person.officeLink}">${icon("call")}<span>Oficina</span></a>
        <a href="mailto:${person.email}">${icon("email")}<span>Email</span></a>
      </nav>

      <section class="minimal-directory" aria-label="Directorio">
        <div><small>Celular</small><strong>${person.mobile}</strong><button type="button" data-action="copy" data-value="${person.mobile}">Copiar</button></div>
        <div><small>Oficina · Ext. ${person.extension}</small><strong>${person.office}</strong><button type="button" data-action="copy" data-value="${person.office}">Copiar</button></div>
        <div class="directory-email"><small>Correo</small><strong>${person.email}</strong><button type="button" data-action="copy" data-value="${person.email}">Copiar</button></div>
        ${person.schedule ? `<p>${person.schedule}</p>` : ""}
      </section>

      <section class="minimal-section">
        <div class="section-heading"><span>Áreas de práctica</span><small>Información provisional</small></div>
        ${serviceList()}
      </section>

      <section class="minimal-profile" aria-label="Información profesional">
        <h2>Información profesional</h2>
        <div><small>Cargo</small><strong>${person.role}</strong></div>
        <div><small>Despacho</small><strong>${FIRM}</strong></div>
      </section>

      <section class="minimal-network">
        ${linkedInLink("network-pill")}
        <button class="network-pill" type="button" data-action="copy" data-value="${person.email}">${icon("copy")}<span>Copiar email</span></button>
      </section>

      ${finalActions("minimal-utilities")}
      ${compactLocation("minimal-location")}
    </article>`;
}

function editorialTemplate() {
  return `
    <article class="proposal-card layout-directory" aria-label="Propuesta de directorio para ${person.firstName} ${person.lastName}">
      <header class="directory-identity">
        <p>${person.role}</p>
        <h1><span>${person.firstName}</span><strong>${person.lastName}</strong></h1>
        <small>${FIRM}</small>
      </header>

      <nav class="directory-quick-actions" aria-label="Acciones rápidas">
        <a href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer">${icon("whatsapp")}<span><strong>WhatsApp</strong><small>Celular</small></span><i>↗</i></a>
        <a href="tel:${person.officeLink}">${icon("call")}<span><strong>Oficina</strong><small>Ext. ${person.extension}</small></span><i>↗</i></a>
        <a href="mailto:${person.email}">${icon("email")}<span><strong>Email</strong></span><i>↗</i></a>
      </nav>

      <section class="directory-network" aria-label="Redes y correo">
        ${linkedInLink("directory-network-link")}
        <button class="directory-network-link" type="button" data-action="copy" data-value="${person.email}">${icon("copy")}<span>Copiar email</span></button>
      </section>

      <section class="directory-contact" aria-label="Datos de contacto">
        <div><span><small>Celular / WhatsApp</small><strong>${person.mobile}</strong></span><button type="button" data-action="copy" data-value="${person.mobile}">Copiar</button></div>
        <div><span><small>Oficina · Ext. ${person.extension}</small><strong>${person.office}</strong>${person.schedule ? `<em>${person.schedule}</em>` : ""}</span><button type="button" data-action="copy" data-value="${person.office}">Copiar</button></div>
        <div><span><small>Correo electrónico</small><strong>${person.email}</strong></span><button type="button" data-action="copy" data-value="${person.email}">Copiar</button></div>
      </section>

      <details class="directory-details" open>
        <summary>Áreas / Servicios <span aria-hidden="true">⌄</span></summary>
        ${serviceList("directory-tags")}
        <p>Contenido provisional para sustituir por las especialidades definitivas.</p>
      </details>
      <details class="directory-details">
        <summary>Información profesional <span aria-hidden="true">⌄</span></summary>
        <div class="directory-facts"><p><small>Cargo</small><strong>${person.role}</strong></p><p><small>Despacho</small><strong>${FIRM}</strong></p></div>
      </details>

      <section class="directory-utilities" aria-label="Acciones de la tarjeta">
        <button type="button" data-action="save-contact">Guardar contacto</button>
        <button type="button" disabled>CV pendiente</button>
        <button type="button" data-action="share">Compartir</button>
      </section>

      <section class="directory-location" aria-label="Ubicación del despacho">
        <h2><span aria-hidden="true"></span>Ubicación del despacho</h2>
        <div class="directory-map" aria-hidden="true"><i></i><i></i><i></i><b></b></div>
        <address>Campeche 315 · Piso 3<br>Hipódromo Condesa · Cuauhtémoc, CDMX 06170</address>
        <div class="location-links"><button type="button" data-action="copy" data-value="${ADDRESS}">Copiar</button><a href="${MAPS_URL}" target="_blank" rel="noopener noreferrer">Maps</a><a href="${WAZE_URL}" target="_blank" rel="noopener noreferrer">Waze</a></div>
      </section>
    </article>`;
}

function bentoTemplate() {
  return `
    <article class="proposal-card layout-bento" aria-label="Propuesta modular para ${person.firstName} ${person.lastName}">
      <header class="bento-hero">
        <div>
          <p>${person.role} · Legal</p>
          <h1>${person.firstName}<br>${person.lastName}</h1>
        </div>
        <span>${FIRM}</span>
      </header>

      <nav class="bento-actions" aria-label="Acciones rápidas">
        <a href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer">${icon("whatsapp")}<span>WhatsApp</span></a>
        <a href="tel:${person.officeLink}">${icon("call")}<span>Llamar</span></a>
        <a href="mailto:${person.email}">${icon("email")}<span>Email</span></a>
        ${person.linkedin ? `<a href="${person.linkedin}" target="_blank" rel="noopener noreferrer">${icon("linkedin")}<span>LinkedIn</span></a>` : `<button type="button" data-action="copy" data-value="${person.email}">${icon("copy")}<span>Copiar</span></button>`}
      </nav>

      <section class="bento-grid" aria-label="Información profesional">
        <article class="bento-tile bento-mobile">
          <small>Celular / WhatsApp</small><strong>${person.mobile}</strong>
          <button type="button" data-action="copy" data-value="${person.mobile}">Copiar</button>
        </article>
        <article class="bento-tile bento-office">
          <small>Oficina</small><strong>${person.office}</strong><span>Ext. ${person.extension}</span>
          <button type="button" data-action="copy" data-value="${person.office}">Copiar</button>
        </article>
        <article class="bento-tile bento-email">
          <small>Correo electrónico</small><strong>${person.email}</strong>
          <button type="button" data-action="copy" data-value="${person.email}">Copiar</button>
        </article>
        <article class="bento-tile bento-practice">
          <small>Áreas / Servicios</small>
          ${serviceList("bento-tags")}
          <p>Especialidades provisionales para sustituir.</p>
        </article>
        <article class="bento-tile bento-profile">
          <small>Información profesional</small><strong>${person.role}</strong><span>${FIRM}</span>
          ${person.schedule ? `<em>${person.schedule}</em>` : ""}
        </article>
        <article class="bento-tile bento-place">
          <small>Ubicación del despacho · CDMX</small>
          <address>Campeche 315 · Piso 3<br>Hipódromo Condesa</address>
          <div><button type="button" data-action="copy" data-value="${ADDRESS}">Copiar</button><a href="${MAPS_URL}" target="_blank" rel="noopener noreferrer">Maps</a><a href="${WAZE_URL}" target="_blank" rel="noopener noreferrer">Waze</a></div>
        </article>
      </section>

      ${finalActions("bento-utilities")}
    </article>`;
}

function executiveTemplate() {
  return `
    <article class="proposal-card layout-executive" aria-label="Propuesta ejecutiva para ${person.firstName} ${person.lastName}">
      <header class="executive-brand">
        <strong>Loperena Lerch</strong><span>y Martín del Campo</span>
      </header>
      <section class="executive-identity">
        <p>Perfil profesional</p>
        <h1><span>${person.firstName}</span><span>${person.lastName}</span></h1>
        <div><i></i><strong>${person.role}</strong><i></i></div>
      </section>

      <nav class="executive-actions" aria-label="Acciones rápidas">
        <a href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer">${icon("whatsapp")}<span>WhatsApp<small>${person.mobile}</small></span></a>
        <a href="tel:${person.officeLink}">${icon("call")}<span>Oficina<small>Extensión ${person.extension}</small></span></a>
        <a href="mailto:${person.email}">${icon("email")}<span>Correo<small>Enviar mensaje</small></span></a>
      </nav>

      <section class="executive-ledger">
        <header><span>Datos de contacto</span><small>Directorio</small></header>
        <div><b>01</b><span><small>Celular / WhatsApp</small><strong>${person.mobile}</strong></span><button type="button" data-action="copy" data-value="${person.mobile}">Copiar</button></div>
        <div><b>02</b><span><small>Oficina · Ext. ${person.extension}</small><strong>${person.office}</strong>${person.schedule ? `<em>${person.schedule}</em>` : ""}</span><button type="button" data-action="copy" data-value="${person.office}">Copiar</button></div>
        <div><b>03</b><span><small>Correo electrónico</small><strong>${person.email}</strong></span><button type="button" data-action="copy" data-value="${person.email}">Copiar</button></div>
      </section>

      <details class="executive-details" open>
        <summary>Áreas / Servicios <span>＋</span></summary>
        ${serviceList("executive-tags")}
        <p>Contenido de muestra para sustituir por las especialidades definitivas.</p>
      </details>
      <details class="executive-details">
        <summary>Información profesional <span>＋</span></summary>
        <div class="executive-facts"><p><small>Cargo</small>${person.role}</p><p><small>Despacho</small>${FIRM}</p></div>
      </details>

      <section class="executive-network">
        ${linkedInLink("executive-network-link")}
        <button class="executive-network-link" type="button" data-action="copy" data-value="${person.email}">${icon("copy")}<span>Copiar email</span></button>
      </section>
      ${finalActions("executive-utilities")}
      ${compactLocation("executive-location")}
    </article>`;
}

function bioLinksTemplate() {
  const linkedInButton = person.linkedin
    ? `<a href="${person.linkedin}" target="_blank" rel="noopener noreferrer"><span>LinkedIn profesional</span><i>↗</i></a>`
    : "";

  return `
    <article class="proposal-card layout-biolinks" aria-label="Propuesta bio links para ${person.firstName} ${person.lastName}">
      <header class="biolinks-banner" aria-label="Composición gráfica sin fotografía">
        <span></span><span></span><span></span><i></i>
      </header>
      <section class="biolinks-identity">
        <p>${FIRM}</p>
        <h1>${person.firstName} ${person.lastName}</h1>
        <span>${person.role}</span>
      </section>

      <nav class="biolinks-icons" aria-label="Accesos rápidos">
        <a href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">${icon("whatsapp")}</a>
        <a href="tel:${person.officeLink}" aria-label="Llamar a oficina">${icon("call")}</a>
        <a href="mailto:${person.email}" aria-label="Enviar correo">${icon("email")}</a>
        ${person.linkedin ? `<a href="${person.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">${icon("linkedin")}</a>` : `<button type="button" data-action="copy" data-value="${person.email}" aria-label="Copiar correo">${icon("copy")}</button>`}
      </nav>

      <nav class="biolinks-stack" aria-label="Enlaces profesionales">
        <a href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer"><span>WhatsApp · ${person.mobile}</span><i>↗</i></a>
        <a href="tel:${person.officeLink}"><span>Oficina · Extensión ${person.extension}</span><i>↗</i></a>
        <a href="mailto:${person.email}"><span>${person.email}</span><i>↗</i></a>
        ${linkedInButton}
        <button type="button" data-action="save-contact"><span>Guardar contacto</span><i>＋</i></button>
        <button type="button" data-action="share"><span>Compartir tarjeta</span><i>↗</i></button>
      </nav>

      <section class="biolinks-contact">
        <div><small>Celular</small><strong>${person.mobile}</strong><button type="button" data-action="copy" data-value="${person.mobile}">Copiar</button></div>
        <div><small>Oficina</small><strong>${person.office} · Ext. ${person.extension}</strong><button type="button" data-action="copy" data-value="${person.office}">Copiar</button></div>
        ${person.schedule ? `<p>${person.schedule}</p>` : ""}
      </section>

      <details class="biolinks-details" open>
        <summary>Áreas / Servicios <span>⌄</span></summary>
        ${serviceList("biolinks-services")}
        <p>Contenido provisional para actualizar.</p>
      </details>
      <details class="biolinks-details">
        <summary>Información profesional <span>⌄</span></summary>
        <div class="biolinks-professional"><p><small>Cargo</small>${person.role}</p><p><small>Despacho</small>${FIRM}</p><p><small>CV</small>Pendiente de publicar</p></div>
      </details>

      ${compactLocation("biolinks-location")}
      <footer class="biolinks-footer">Tarjeta de contacto profesional</footer>
    </article>`;
}

function splitTemplate() {
  return `
    <article class="proposal-card layout-split" aria-label="Propuesta split para ${person.firstName} ${person.lastName}">
      <header class="split-hero">
        <aside><span>Perfil</span><strong>06</strong></aside>
        <div>
          <p>${person.role}</p>
          <h1>${person.firstName}<br><b>${person.lastName}</b></h1>
          <small>${FIRM}</small>
        </div>
      </header>

      <nav class="split-actions" aria-label="Acciones rápidas">
        <a href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer">${icon("whatsapp")}<span>Mensaje<small>WhatsApp</small></span></a>
        <a href="tel:${person.officeLink}">${icon("call")}<span>Llamar<small>Oficina</small></span></a>
        <a href="mailto:${person.email}">${icon("email")}<span>Escribir<small>Email</small></span></a>
      </nav>

      <section class="split-directory" aria-label="Datos de contacto">
        <header><span>Contacto</span><small>Directorio profesional</small></header>
        <div><small>Celular / WhatsApp</small><strong>${person.mobile}</strong><button type="button" data-action="copy" data-value="${person.mobile}">Copiar</button></div>
        <div><small>Oficina · Ext. ${person.extension}</small><strong>${person.office}</strong><button type="button" data-action="copy" data-value="${person.office}">Copiar</button></div>
        <div class="split-email"><small>Correo electrónico</small><strong>${person.email}</strong><button type="button" data-action="copy" data-value="${person.email}">Copiar</button></div>
        ${person.schedule ? `<p>${person.schedule}</p>` : ""}
      </section>

      <section class="split-practice">
        <div class="section-heading"><span>Áreas / Servicios</span><small>Contenido provisional</small></div>
        <div>${SERVICES.map((service, index) => `<p><b>${String(index + 1).padStart(2, "0")}</b>${service}</p>`).join("")}</div>
      </section>

      <section class="split-profile">
        <p><small>Información profesional</small><strong>${person.role}</strong></p>
        <p><small>Despacho</small><strong>${FIRM}</strong></p>
      </section>

      <section class="split-network">
        ${linkedInLink("split-network-link")}
        <button class="split-network-link" type="button" data-action="copy" data-value="${person.email}">${icon("copy")}<span>Copiar email</span></button>
      </section>
      ${finalActions("split-utilities")}
      ${compactLocation("split-location")}
    </article>`;
}

function timelineTemplate() {
  return `
    <article class="proposal-card layout-timeline" aria-label="Propuesta timeline para ${person.firstName} ${person.lastName}">
      <header class="timeline-hero">
        <p>${FIRM}</p>
        <h1>${person.firstName} <strong>${person.lastName}</strong></h1>
        <span>${person.role}</span>
      </header>

      <nav class="timeline-quick" aria-label="Acciones rápidas">
        <a href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer">${icon("whatsapp")}<span>WhatsApp</span></a>
        <a href="tel:${person.officeLink}">${icon("call")}<span>Oficina</span></a>
        <a href="mailto:${person.email}">${icon("email")}<span>Correo</span></a>
      </nav>

      <section class="timeline-contact">
        <h2>Directorio</h2>
        <div><i>1</i><p><small>Celular / WhatsApp</small><strong>${person.mobile}</strong></p><button type="button" data-action="copy" data-value="${person.mobile}">Copiar</button></div>
        <div><i>2</i><p><small>Oficina · Ext. ${person.extension}</small><strong>${person.office}</strong>${person.schedule ? `<em>${person.schedule}</em>` : ""}</p><button type="button" data-action="copy" data-value="${person.office}">Copiar</button></div>
        <div><i>3</i><p><small>Correo electrónico</small><strong>${person.email}</strong></p><button type="button" data-action="copy" data-value="${person.email}">Copiar</button></div>
      </section>

      <section class="timeline-practice">
        <header><h2>Áreas / Servicios</h2><span>Selección provisional</span></header>
        ${serviceList("timeline-tags")}
      </section>

      <section class="timeline-professional">
        <h2>Información profesional</h2>
        <p><span>Cargo</span><strong>${person.role}</strong></p>
        <p><span>Firma</span><strong>${FIRM}</strong></p>
      </section>

      <section class="timeline-network">
        ${linkedInLink("timeline-network-link")}
        <button class="timeline-network-link" type="button" data-action="copy" data-value="${person.email}">${icon("copy")}<span>Copiar email</span></button>
      </section>
      ${finalActions("timeline-utilities")}
      ${compactLocation("timeline-location")}
    </article>`;
}

function magazineTemplate() {
  return `
    <article class="proposal-card layout-magazine" aria-label="Propuesta magazine para ${person.firstName} ${person.lastName}">
      <header class="magazine-cover">
        <div>${FIRM}</div>
        <h1>${person.firstName}<br><strong>${person.lastName}</strong></h1>
        <em>${person.role}</em>
      </header>

      <nav class="magazine-actions" aria-label="Acciones rápidas">
        <a href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer"><span>01</span>WhatsApp<i>↗</i></a>
        <a href="tel:${person.officeLink}"><span>02</span>Oficina<i>↗</i></a>
        <a href="mailto:${person.email}"><span>03</span>Email<i>↗</i></a>
      </nav>

      <section class="magazine-contact">
        <header><h2>Contacto</h2><p>Datos profesionales</p></header>
        <div><small>Celular</small><strong>${person.mobile}</strong><button type="button" data-action="copy" data-value="${person.mobile}">Copiar</button></div>
        <div><small>Oficina / Ext. ${person.extension}</small><strong>${person.office}</strong><button type="button" data-action="copy" data-value="${person.office}">Copiar</button></div>
        <div><small>Email</small><strong>${person.email}</strong><button type="button" data-action="copy" data-value="${person.email}">Copiar</button></div>
        ${person.schedule ? `<p>${person.schedule}</p>` : ""}
      </section>

      <section class="magazine-practice">
        <p>Áreas / Servicios</p>
        <ol>${SERVICES.map((service, index) => `<li><span>${index + 1}</span>${service}</li>`).join("")}</ol>
        <small>Especialidades provisionales para sustituir.</small>
      </section>

      <section class="magazine-profile">
        <span>Información profesional</span>
        <strong>${person.role}</strong>
        <p>${FIRM}</p>
      </section>

      <section class="magazine-network">
        ${linkedInLink("magazine-network-link")}
        <button class="magazine-network-link" type="button" data-action="copy" data-value="${person.email}">${icon("copy")}<span>Copiar email</span></button>
      </section>
      ${finalActions("magazine-utilities")}
      ${compactLocation("magazine-location")}
    </article>`;
}

function softCardsTemplate() {
  return `
    <article class="proposal-card layout-soft" aria-label="Propuesta soft cards para ${person.firstName} ${person.lastName}">
      <header class="soft-hero">
        <span>${person.role}</span>
        <h1>${person.firstName}<br>${person.lastName}</h1>
        <p>${FIRM}</p>
      </header>

      <nav class="soft-actions" aria-label="Acciones rápidas">
        <a href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer">${icon("whatsapp")}<span>WhatsApp</span></a>
        <a href="tel:${person.officeLink}">${icon("call")}<span>Llamar</span></a>
        <a href="mailto:${person.email}">${icon("email")}<span>Email</span></a>
      </nav>

      <section class="soft-contact">
        <article><small>Celular / WhatsApp</small><strong>${person.mobile}</strong><button type="button" data-action="copy" data-value="${person.mobile}">Copiar</button></article>
        <article><small>Oficina · Ext. ${person.extension}</small><strong>${person.office}</strong><button type="button" data-action="copy" data-value="${person.office}">Copiar</button></article>
        <article class="soft-email"><small>Correo electrónico</small><strong>${person.email}</strong><button type="button" data-action="copy" data-value="${person.email}">Copiar</button></article>
        ${person.schedule ? `<p>${person.schedule}</p>` : ""}
      </section>

      <section class="soft-practice">
        <div class="section-heading"><span>Áreas / Servicios</span><small>Información provisional</small></div>
        ${serviceList("soft-tags")}
      </section>

      <section class="soft-professional">
        <div><small>Información profesional</small><strong>${person.role}</strong></div>
        <div><small>Despacho</small><strong>${FIRM}</strong></div>
      </section>

      <section class="soft-network">
        ${linkedInLink("soft-network-link")}
        <button class="soft-network-link" type="button" data-action="copy" data-value="${person.email}">${icon("copy")}<span>Copiar email</span></button>
      </section>
      ${finalActions("soft-utilities")}
      ${compactLocation("soft-location")}
    </article>`;
}

function dossierTemplate() {
  return `
    <article class="proposal-card layout-dossier" aria-label="Propuesta dossier para ${person.firstName} ${person.lastName}">
      <header class="dossier-cover">
        <div>${FIRM}</div>
        <h1>${person.firstName}<br><strong>${person.lastName}</strong></h1>
        <small>${person.role}</small>
      </header>

      <nav class="dossier-actions" aria-label="Acciones principales">
        <a href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer"><b>W</b><span>WhatsApp<small>${person.mobile}</small></span></a>
        <a href="tel:${person.officeLink}"><b>T</b><span>Oficina<small>Ext. ${person.extension}</small></span></a>
        <a href="mailto:${person.email}"><b>E</b><span>Email<small>Escribir ahora</small></span></a>
      </nav>

      <section class="dossier-section dossier-contact">
        <header><span>01</span><h2>Datos de contacto</h2></header>
        <dl>
          <div><dt>Celular</dt><dd>${person.mobile}</dd><button type="button" data-action="copy" data-value="${person.mobile}">Copiar</button></div>
          <div><dt>Oficina</dt><dd>${person.office} · Ext. ${person.extension}</dd><button type="button" data-action="copy" data-value="${person.office}">Copiar</button></div>
          <div><dt>Correo</dt><dd>${person.email}</dd><button type="button" data-action="copy" data-value="${person.email}">Copiar</button></div>
        </dl>
        ${person.schedule ? `<p>${person.schedule}</p>` : ""}
      </section>

      <section class="dossier-section dossier-practice">
        <header><span>02</span><h2>Áreas / Servicios</h2></header>
        ${serviceList("dossier-list")}
        <p>Contenido provisional para actualizar.</p>
      </section>

      <section class="dossier-section dossier-profile">
        <header><span>03</span><h2>Información profesional</h2></header>
        <div><p><small>Cargo</small>${person.role}</p><p><small>Despacho</small>${FIRM}</p></div>
      </section>

      <section class="dossier-network">
        ${linkedInLink("dossier-network-link")}
        <button class="dossier-network-link" type="button" data-action="copy" data-value="${person.email}">${icon("copy")}<span>Copiar email</span></button>
      </section>
      ${finalActions("dossier-utilities")}
      ${compactLocation("dossier-location")}
    </article>`;
}

const TEMPLATES = {
  1: minimalTemplate,
  2: editorialTemplate,
  3: bentoTemplate,
  4: executiveTemplate,
  5: bioLinksTemplate,
  6: splitTemplate,
  7: timelineTemplate,
  8: magazineTemplate,
  9: softCardsTemplate,
  10: dossierTemplate
};

function renderProposal() {
  if (!person || !mount) return;
  const render = TEMPLATES[themeNumber] || TEMPLATES[1];
  mount.innerHTML = configuratorTemplate() + render();
  document.title = `Propuesta ${String(themeNumber).padStart(2, "0")} · ${person.firstName} ${person.lastName}`;
  const label = document.querySelector("[data-proposal-label]");
  if (label) label.textContent = `Propuesta ${String(themeNumber).padStart(2, "0")}`;
}

renderProposal();

function showToast(message) {
  const toast = document.getElementById("proposalToast");
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
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${person.lastName};${person.firstName};;;`,
    `FN:${person.firstName} ${person.lastName}`,
    `ORG:${FIRM}`,
    `TITLE:${person.role}`,
    `TEL;TYPE=CELL:${person.mobileLink}`,
    `TEL;TYPE=WORK:${person.officeLink}`,
    `NOTE:Extensión ${person.extension}`,
    `EMAIL:${person.email}`,
    person.linkedin ? `URL:${person.linkedin}` : "",
    "ADR;TYPE=WORK:;;Campeche 315 piso 3;Ciudad de México;CDMX;06170;México",
    "END:VCARD"
  ].filter(Boolean).join("\n");

  const blob = new Blob([lines], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${person.slug}.vcf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Contacto descargado");
}

async function shareProfile() {
  const payload = {
    title: `${person.firstName} ${person.lastName}`,
    text: "Te comparto esta tarjeta de contacto",
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(payload);
      showToast("Compartido");
      return;
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
  }

  await copyText(window.location.href);
  showToast("Enlace copiado");
}

document.addEventListener("click", (event) => {
  const profileOption = event.target.closest("[data-profile-option]");
  if (profileOption) {
    const nextPersonKey = profileOption.dataset.profileOption;
    if (PROPOSAL_PROFILES[nextPersonKey]) {
      personKey = nextPersonKey;
      person = PROPOSAL_PROFILES[nextPersonKey];
      body.dataset.person = nextPersonKey;
      renderProposal();
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("perfil", nextPersonKey);
        window.history.replaceState({}, "", url);
      } catch {}
    }
    return;
  }

  const paletteOption = event.target.closest("[data-palette-option]");
  if (paletteOption) {
    const nextPalette = paletteOption.dataset.paletteOption;
    if (COLOR_PALETTES[nextPalette]) {
      activePalette = nextPalette;
      body.dataset.palette = nextPalette;
      syncThemeColor();
      try { window.localStorage.setItem(`storylaw-palette-${themeNumber}`, nextPalette); } catch {}
      document.querySelectorAll("[data-palette-option]").forEach((button) => {
        button.classList.toggle("is-active", button.dataset.paletteOption === nextPalette);
      });
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("paleta", nextPalette);
        window.history.replaceState({}, "", url);
      } catch {}
    }
    return;
  }

  const trigger = event.target.closest("[data-action]");
  if (!trigger || !person) return;

  if (trigger.dataset.action === "copy") copyText(trigger.dataset.value || "");
  if (trigger.dataset.action === "save-contact") downloadVCard();
  if (trigger.dataset.action === "share") shareProfile();
});
