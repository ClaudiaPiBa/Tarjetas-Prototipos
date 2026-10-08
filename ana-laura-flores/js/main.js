// ===== DATA =====

const DATA = {

  celular: "5618693533",

  oficina: "5552869086",

  extension: "119",

  email: "analaura.flores@loperena.mx",

  whatsappText: "Hola Ana Laura, vi tu información de contacto",

  links: {
    linkedin: "https://www.linkedin.com/in/ana-laura-flores-ferrer-8812893b9/"
  },

vcard: {

  firstName: "Ana Laura",

  lastName: "Flores Ferrer",

  org: "Loperena Lerch y Martín del Campo",

  title: "Asociada",

  celular: "5618693533",

  oficina: "5552869086",

  extension: "119",

  email: "analaura.flores@loperena.mx",

  linkedin: "https://www.linkedin.com/in/ana-laura-flores-ferrer-8812893b9/",

  photo: "",

  address: null

}
};

// ===== HELPERS =====

const $ = (q) => document.querySelector(q);

function toast(msg){

  const el = $("#toast");

  if(!el) return;

  el.textContent = msg;

  el.classList.add("show");

  clearTimeout(toast._t);

  toast._t = setTimeout(() => {
    el.classList.remove("show");
  }, 1800);
}

async function copyText(text){

  try{

    await navigator.clipboard.writeText(text);

    toast("Copiado");

  }catch{

    const ta = document.createElement("textarea");

    ta.value = text;

    document.body.appendChild(ta);

    ta.select();

    document.execCommand("copy");

    ta.remove();

    toast("Copiado");
  }
}

// ===== VCARD =====

async function buildVCard(v){

  let photoLine = "";

  if(v.photo){

    try{

      const base64 =
        await imageToBase64(v.photo);

      photoLine =
`PHOTO;ENCODING=b;TYPE=JPEG:${base64}`;

    }catch(error){

      console.error("Error cargando foto", error);
    }
  }

  return [

    "BEGIN:VCARD",

    "VERSION:3.0",

    `N:${v.lastName};${v.firstName};;;`,

    `FN:${v.firstName} ${v.lastName}`,

    v.org
      ? `ORG:${v.org}`
      : "",

    v.title
      ? `TITLE:${v.title}`
      : "",

    v.celular
      ? `TEL;TYPE=CELL:${v.celular}`
      : "",

    v.oficina
      ? `TEL;TYPE=WORK:${v.oficina}`
      : "",

    v.extension
      ? `NOTE:Extensión ${v.extension}`
      : "",

    v.email
      ? `EMAIL:${v.email}`
      : "",

    v.linkedin
      ? `URL:${v.linkedin}`
      : "",

    v.address
      ? `ADR;TYPE=WORK:;;${v.address.street};${v.address.city};${v.address.state};${v.address.zip};${v.address.country}`
      : "",

    photoLine,

    "END:VCARD"

  ].filter(Boolean).join("\n");
}

function download(filename, content, type="text/plain"){

  const blob = new Blob([content], { type });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = filename;

  document.body.appendChild(a);

  a.click();

  a.remove();

  URL.revokeObjectURL(url);
}

// ===== QUICK BUTTONS =====

document.querySelectorAll(".pill").forEach((btn, index) => {

  btn.addEventListener("click", () => {

    // WHATSAPP

    if(index === 0){

      const url =
        `https://wa.me/52${DATA.celular}?text=${encodeURIComponent(DATA.whatsappText)}`;

      window.open(url, "_blank");

      return;
    }

    // OFICINA

    if(index === 1){

      window.location.href =
        `tel:${DATA.oficina}`;

      return;
    }

    // EMAIL

    if(index === 2){

      window.location.href =
        `mailto:${DATA.email}`;

      return;
    }

  });

});

// ===== LINKS =====

document.querySelectorAll("[data-link]").forEach((el) => {

  el.addEventListener("click", (e) => {

    e.preventDefault();

    const key = el.getAttribute("data-link");

    const url = DATA.links[key];

    if(!url){

      toast("Link pendiente");

      return;
    }

    window.open(url, "_blank");

  });

});

// ===== COPY EMAIL BUTTON =====

$("#copyBtn")?.addEventListener("click", () => {

  copyText(DATA.email);

});

// ===== COPY BUTTONS =====

document.querySelectorAll("[data-copy]").forEach((btn) => {

  btn.addEventListener("click", () => {

    const value = btn.dataset.copy;

    // selector

    if(value.startsWith("#")){

      const text =
        document.querySelector(value)?.textContent?.trim();

      if(text) copyText(text);

      return;
    }

    // texto directo

    copyText(value);

  });

});

// ===== ACCORDION =====

const accBtn = $(".accBtn");

const panel = $(".accPanel");

function closeAccordion(){

  accBtn?.setAttribute("aria-expanded", "false");

  if(panel){
    panel.style.maxHeight = "0px";
  }
}

function openAccordion(){

  accBtn?.setAttribute("aria-expanded", "true");

  if(panel){
    panel.style.maxHeight =
      panel.scrollHeight + "px";
  }
}

accBtn?.addEventListener("click", () => {

  const expanded =
    accBtn.getAttribute("aria-expanded") === "true";

  expanded
    ? closeAccordion()
    : openAccordion();
});

// ===== SHARE =====

async function shareCard(){

  const payload = {

    title: "Ana Laura Flores Ferrer",

    text: "Te comparto mis datos de contacto",

    url: window.location.href
  };

  if(navigator.share){

    try{

      await navigator.share(payload);

      toast("Compartido");

    }catch{}

  }else{

    copyText(window.location.href);

    toast("Link copiado");
  }
}

$("#shareBtn")?.addEventListener("click", shareCard);

// ===== SAVE CONTACT =====

async function saveContact(){

  const vcf =
    await buildVCard(DATA.vcard);

  download(
    "ana-laura-flores-ferrer.vcf",
    vcf,
    "text/vcard"
  );

  toast("Contacto descargado");
}

$("#saveContactBtn")?.addEventListener(
  "click",
  saveContact
);

async function imageToBase64(url){

  const response = await fetch(url);

  const blob = await response.blob();

  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.onloadend = () => {

      const base64 =
        reader.result
          .split(",")[1];

      resolve(base64);
    };

    reader.onerror = reject;

    reader.readAsDataURL(blob);

  });
}
