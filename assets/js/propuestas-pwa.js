let proposalInstallPrompt = null;

const installButton = document.getElementById("installButton");

function isIosDevice() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function buildIosGuide() {
  const guide = document.createElement("div");
  guide.className = "install-dialog";
  guide.id = "iosInstallGuide";
  guide.hidden = true;
  guide.innerHTML = `
    <div class="install-backdrop" data-close-install-guide></div>
    <section class="install-sheet" role="dialog" aria-modal="true" aria-labelledby="installGuideTitle">
      <button class="close-guide" type="button" data-close-install-guide aria-label="Cerrar instrucciones">×</button>
      <p class="install-kicker">iPhone · Safari</p>
      <h2 id="installGuideTitle">Instala esta tarjeta como una app</h2>
      <p class="install-intro">Solo tienes que hacerlo una vez. Después aparecerá en tu pantalla de inicio.</p>
      <ol class="install-steps">
        <li><b>1</b><span><strong>Ábrela en Safari</strong>Si llegaste desde WhatsApp, toca “Abrir en Safari”.</span></li>
        <li><b>2</b><span><strong>Toca Compartir</strong>Es el cuadro con una flecha hacia arriba.</span></li>
        <li><b>3</b><span><strong>Agregar a pantalla de inicio</strong>Desliza el menú si aún no ves la opción.</span></li>
        <li><b>4</b><span><strong>Activa “Abrir como app web”</strong>Después toca “Agregar”.</span></li>
      </ol>
      <button class="copy-install-link" type="button" id="copyInstallLink">Copiar enlace para Safari</button>
    </section>`;
  document.body.appendChild(guide);
  return guide;
}

const iosGuide = buildIosGuide();

function openGuide() {
  iosGuide.hidden = false;
  document.body.classList.add("dialog-open");
}

function closeGuide() {
  iosGuide.hidden = true;
  document.body.classList.remove("dialog-open");
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js?v=11", { scope: "./", updateViaCache: "none" }).catch(() => {});
  });
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  proposalInstallPrompt = event;
  if (installButton) installButton.hidden = false;
});

window.addEventListener("appinstalled", () => {
  proposalInstallPrompt = null;
  if (installButton) {
    installButton.disabled = true;
    installButton.textContent = "Tarjeta instalada";
  }
});

if (installButton) {
  installButton.hidden = isStandalone();
  installButton.addEventListener("click", async () => {
    if (isStandalone()) return;

    if (proposalInstallPrompt) {
      proposalInstallPrompt.prompt();
      await proposalInstallPrompt.userChoice;
      proposalInstallPrompt = null;
      return;
    }

    if (isIosDevice()) {
      openGuide();
      return;
    }

    openGuide();
  });
}

document.addEventListener("click", async (event) => {
  if (event.target.closest("[data-close-install-guide]")) closeGuide();
  if (event.target.closest("#copyInstallLink")) {
    try {
      await navigator.clipboard.writeText(window.location.href);
      event.target.textContent = "Enlace copiado";
    } catch {
      event.target.textContent = "Copia la dirección del navegador";
    }
  }
});
