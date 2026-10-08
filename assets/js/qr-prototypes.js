const QR_PROFILES = {
  ana: {
    name: "Ana Laura Flores Ferrer",
    shortName: "Ana Laura",
    role: "Asociada",
    qr: "../assets/img/qr-propuesta-",
    icon: "../assets/img/icon-ana-laura-modern-180.png"
  },
  monica: {
    name: "Mónica Mora Martín",
    shortName: "Mónica Mora",
    role: "Asociada",
    qr: "../assets/img/qr-propuesta-",
    icon: "../assets/img/icon-monica-modern-180.png"
  }
};

const QR_PALETTES = {
  sage: { label: "Salvia", chip: "#5d7563" },
  wine: { label: "Vino", chip: "#7a4854" },
  ink: { label: "Azul tinta", chip: "#25364a" },
  rose: { label: "Rosa humo", chip: "#8e5e68" },
  mocha: { label: "Café cálido", chip: "#6b5243" }
};

const QR_DEFAULT_PALETTES = {
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

const qrBody = document.body;
let qrPersonKey = qrBody.dataset.person;
const qrTheme = Number(qrBody.dataset.theme || 1);
const qrMount = document.getElementById("qrPrototypeMount");
const localProposalNumber = qrBody.dataset.proposalFile || String(qrTheme).padStart(2, "0");
const qrImageNumber = qrBody.dataset.qrFile || localProposalNumber;
const proposalFile = `propuesta-${localProposalNumber}.html`;
let qrPalette = qrBody.dataset.palette || QR_DEFAULT_PALETTES[qrTheme] || "sage";

try {
  const params = new URLSearchParams(window.location.search);
  const storedPalette = window.localStorage.getItem(`storylaw-palette-${qrTheme}`);
  const requestedPalette = params.get("paleta");
  const requestedProfile = params.get("perfil");
  if (QR_PROFILES[requestedProfile]) qrPersonKey = requestedProfile;
  if (storedPalette === "lavender") qrPalette = "mocha";
  if (QR_PALETTES[storedPalette]) qrPalette = storedPalette;
  if (requestedPalette === "lavender") qrPalette = "mocha";
  if (QR_PALETTES[requestedPalette]) qrPalette = requestedPalette;
} catch {}

let qrPerson = QR_PROFILES[qrPersonKey];

function proposalHref() {
  return `${proposalFile}?perfil=${qrPersonKey}&paleta=${qrPalette}`;
}

function syncQrTheme() {
  qrBody.dataset.person = qrPersonKey;
  qrBody.dataset.palette = qrPalette;
  qrBody.dataset.cardHref = proposalHref();
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor && QR_PALETTES[qrPalette]) themeColor.content = QR_PALETTES[qrPalette].chip;
}

qrBody.classList.add(`theme-${qrTheme}`);
syncQrTheme();

if (qrPerson && qrMount) {
  qrMount.innerHTML = `
    <section class="qr-configurator" aria-label="Personalizar código QR">
      <div class="qr-profile-selector" role="group" aria-label="Seleccionar abogada">
        <strong>Mostrar datos de</strong>
        <div>
          <button type="button" data-qr-profile="ana" class="${qrPersonKey === "ana" ? "is-active" : ""}">Ana Laura</button>
          <button type="button" data-qr-profile="monica" class="${qrPersonKey === "monica" ? "is-active" : ""}">Mónica</button>
        </div>
      </div>
      <div class="qr-palette-selector" role="group" aria-label="Seleccionar colores del prototipo">
        <strong>Elige una paleta</strong>
        <span>También se aplicará al abrir la tarjeta</span>
        <div>${Object.entries(QR_PALETTES).map(([key, palette]) => `
          <button type="button" data-qr-palette="${key}" class="${qrPalette === key ? "is-active" : ""}" aria-label="${palette.label}" title="${palette.label}">
            <i style="--chip:${palette.chip}"></i><small>${palette.label}</small>
          </button>`).join("")}</div>
      </div>
    </section>

    <article class="qr-prototype-card">
      <h1 data-qr-person-name>${qrPerson.name}</h1>
      <p class="qr-role" data-qr-person-role>${qrPerson.role}</p>
      <p class="qr-firm">Loperena Lerch y Martín del Campo</p>

      <div class="qr-frame">
        <img src="${qrPerson.qr}${qrImageNumber}.png" alt="Código QR de la propuesta ${qrTheme} de ${qrPerson.name}" data-qr-image>
      </div>

      <p class="qr-instruction">Escanea para consultar </p>
      <a class="qr-card-link" href="${proposalHref()}">Ver tarjeta completa</a>
      <p class="qr-preview-note">Prototipo visual listo para sustituir por el enlace definitivo al publicar.</p>
    </article>`;

  document.title = `QR propuesta ${qrTheme} · ${qrPerson.name}`;
}

document.addEventListener("click", (event) => {
  const profileButton = event.target.closest("[data-qr-profile]");
  if (profileButton) {
    const requestedProfile = profileButton.dataset.qrProfile;
    if (!QR_PROFILES[requestedProfile]) return;

    qrPersonKey = requestedProfile;
    qrPerson = QR_PROFILES[requestedProfile];
    syncQrTheme();
    document.querySelectorAll("[data-qr-profile]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.qrProfile === qrPersonKey);
    });
    const name = document.querySelector("[data-qr-person-name]");
    const role = document.querySelector("[data-qr-person-role]");
    const image = document.querySelector("[data-qr-image]");
    const cardLink = document.querySelector(".qr-card-link");
    if (name) name.textContent = qrPerson.name;
    if (role) role.textContent = qrPerson.role;
    if (image) image.alt = `Código QR de la propuesta ${qrTheme} de ${qrPerson.name}`;
    if (cardLink) cardLink.href = proposalHref();
    document.title = `QR propuesta ${qrTheme} · ${qrPerson.name}`;
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("perfil", qrPersonKey);
      window.history.replaceState({}, "", url);
    } catch {}
    return;
  }

  const paletteButton = event.target.closest("[data-qr-palette]");
  if (!paletteButton) return;
  const requestedPalette = paletteButton.dataset.qrPalette;
  if (!QR_PALETTES[requestedPalette]) return;

  qrPalette = requestedPalette;
  syncQrTheme();
  try {
    window.localStorage.setItem(`storylaw-palette-${qrTheme}`, qrPalette);
  } catch {}

  document.querySelectorAll("[data-qr-palette]").forEach((button) => {
    button.classList.toggle("is-active", button === paletteButton);
  });
  const cardLink = document.querySelector(".qr-card-link");
  if (cardLink) cardLink.href = proposalHref();
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("paleta", qrPalette);
    window.history.replaceState({}, "", url);
  } catch {}
});

const standaloneMode = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
if (standaloneMode && qrPerson) window.location.replace(proposalHref());
