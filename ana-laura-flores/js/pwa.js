let deferredInstallPrompt = null;

const installButton = document.querySelector("#installButton");
const iosInstallGuide = document.querySelector("#iosInstallGuide");
const closeInstallGuide = document.querySelector("#closeInstallGuide");
const copyInstallLink = document.querySelector("#copyInstallLink");

const isIos =
  /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js", { scope: "./" })
      .catch((error) => console.error("No se pudo registrar el service worker", error));
  });
}

if (installButton && isIos && !isStandalone) {
  installButton.textContent = "Instalar en iPhone";
  installButton.hidden = false;
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;

  if (installButton && !isStandalone) {
    installButton.hidden = false;
  }
});

installButton?.addEventListener("click", async () => {
  if (isIos) {
    iosInstallGuide.hidden = false;
    document.body.classList.add("install-guide-open");
    closeInstallGuide?.focus();
    return;
  }

  if (!deferredInstallPrompt) return;

  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installButton.hidden = true;
});

function closeIosGuide() {
  if (!iosInstallGuide) return;
  iosInstallGuide.hidden = true;
  document.body.classList.remove("install-guide-open");
  installButton?.focus();
}

closeInstallGuide?.addEventListener("click", closeIosGuide);

document.querySelector("[data-close-install-guide]")
  ?.addEventListener("click", closeIosGuide);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !iosInstallGuide?.hidden) {
    closeIosGuide();
  }
});

copyInstallLink?.addEventListener("click", async () => {
  const url = window.location.href;

  try {
    await navigator.clipboard.writeText(url);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  copyInstallLink.textContent = "Enlace copiado ✓";
  setTimeout(() => {
    copyInstallLink.textContent = "Copiar enlace para abrirlo en Safari";
  }, 1800);
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  if (installButton) installButton.hidden = true;
});
