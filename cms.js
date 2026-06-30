const textFields = [
  ["home.hero.title", "Home · Título", "short"],
  ["home.hero.subtitle", "Home · Subtítulo", "short"],
  ["home.context.title", "Home · Contexto título", "short"],
  ["home.context.p1", "Home · Contexto párrafo 1", "long"],
  ["home.context.p2", "Home · Contexto párrafo 2", "long"],
  ["home.context.p3", "Home · Contexto párrafo 3", "long"],
  ["home.trajectory.title", "Home · Trayectoria título", "short"],
  ["home.trajectory.text", "Home · Trayectoria texto", "long"],
  ["ayuda.hero.title", "En qué puede ayudarte · Título", "short"],
  ["ayuda.hero.p1", "En qué puede ayudarte · Texto 1", "long"],
  ["ayuda.hero.p2", "En qué puede ayudarte · Texto 2", "long"],
  ["trabaja.hero.title", "Cómo trabaja · Título", "short"],
  ["trabaja.hero.text", "Cómo trabaja · Texto", "long"],
  ["eventos.hero.title", "Eventos · Título", "short"],
  ["eventos.hero.p1", "Eventos · Texto 1", "long"],
  ["eventos.hero.p2", "Eventos · Texto 2", "long"],
  ["eventos.hero.p3", "Eventos · Texto 3", "long"],
  ["notas.hero.title", "Notas · Título", "long"],
  ["notas.hero.p1", "Notas · Texto 1", "long"],
  ["notas.hero.p2", "Notas · Texto 2", "short"],
  ["notas.post.title", "Notas · Post ejemplo título", "short"],
  ["notas.post.text", "Notas · Post ejemplo texto", "long"],
  ["quien.hero.title", "Quién hay detrás · Título", "short"],
  ["quien.hero.p1", "Quién hay detrás · Texto 1", "long"],
  ["quien.hero.p2", "Quién hay detrás · Texto 2", "long"],
  ["quien.hero.p3", "Quién hay detrás · Texto 3", "short"],
  ["quien.note.p1", "Quién hay detrás · Nota 1", "long"],
  ["quien.note.p2", "Quién hay detrás · Nota 2", "long"],
  ["contacto.title", "Contacto · Título", "short"],
  ["contacto.intro", "Contacto · Introducción", "long"],
  ["contacto.name", "Contacto · Nombre", "short"],
  ["contacto.note", "Contacto · Nota", "long"]
];

const imageFields = [
  ["home.hero.image", "Home · Imagen principal"],
  ["home.trajectory.image", "Home · Imagen trayectoria"],
  ["ayuda.hero.image", "En qué puede ayudarte · Imagen"],
  ["trabaja.hero.image", "Cómo trabaja · Imagen"],
  ["eventos.hero.image", "Eventos · Imagen"],
  ["notas.hero.image", "Notas · Imagen"],
  ["notas.post.image", "Notas · Imagen post"],
  ["quien.hero.image", "Quién hay detrás · Imagen"],
  ["contacto.image", "Contacto · Imagen"]
];

const imageOptions = [
  ["assets/photos/plaza-kiosko-wide.png", "Plaza con kiosko"],
  ["assets/photos/petanca-wide.png", "Petanca"],
  ["assets/photos/comida-popular-wide.png", "Comida popular"],
  ["assets/photos/tienda-pueblo-wide.png", "Tienda de pueblo"],
  ["assets/photos/mesa-exterior-wide.png", "Mesa exterior"],
  ["assets/photos/banco-charla-wide.png", "Banco con charla"],
  ["assets/photos/sillas-enea-wide.png", "Sillas de enea"],
  ["assets/photos/calle-pueblo.jpg", "Calle de pueblo"]
];

let overrides = JSON.parse(localStorage.getItem("alafresca-cms-overrides") || "{}");
const defaults = {};
let dynamicContent = JSON.parse(localStorage.getItem("alafresca-content") || "null") || structuredClone(window.ALAFRESCA_CONTENT || {});
const fallbackDefaults = {
  "home.hero.title": "Un turismo más cuidado, cercano y honesto",
  "home.hero.subtitle": "Turismo técnico de proximidad para pueblos, entidades y pequeñas empresas.",
  "home.context.title": "A la fresca trabaja en esa diferencia",
  "home.context.p1": "Muchos territorios tienen recursos. Tienen fondos y personas con ganas de impulsar cosas. Lo que escasea, casi siempre, es tiempo y capacidad técnica para convertir todo eso en algo concreto y sostenible.",
  "home.context.p2": "El turismo puede ayudar. Puede generar ingresos, dar visibilidad a lo que ya existe y crear razones para quedarse. Pero también puede convertirse en una promesa que no se cumple, o en actividad que llena los fines de semana de agosto sin dejar nada útil el resto del año.",
  "home.context.p3": "Ayuda a decidir qué merece la pena hacer, con qué recursos y a qué escala. Para que lo que se ponga en marcha tenga sentido para quien visita y, sobre todo, para quienes viven allí todo el año.",
  "home.trajectory.title": "Conocer el territorio ayuda. Haber trabajado en él, también",
  "home.trajectory.text": "Más de veinte años en distintos ámbitos del turismo: administración pública, gestión de destinos, comunicación, creación de producto, digitalización y proyectos con fondos europeos. Lo que ha quedado de ese recorrido es la convicción de que los proyectos que funcionan son los que parten de lo real: de lo que existe, de lo que es posible y de lo que las personas del lugar pueden sostener después.",
  "ayuda.hero.title": "Cada organización llega con una situación distinta",
  "ayuda.hero.p1": "Un ayuntamiento pequeño con recursos turísticos y buenas intenciones, pero sin nadie que pueda ordenar prioridades o preparar una memoria a tiempo. Una comarca o un GAL con municipios que trabajan por separado y oportunidades de financiación que piden proyectos bien definidos. Una asociación donde las decisiones se toman en junta, pero luego nadie tiene tiempo de ejecutarlas. Un alojamiento rural que funciona, pero depende demasiado de las plataformas. Una bodega o una quesería que recibe visitas sin precio claro, sin sistema de reserva y sin relato.",
  "ayuda.hero.p2": "Si algo de esto suena familiar, estas son las situaciones en las que A la fresca puede ayudar.",
  "trabaja.hero.title": "Cada proyecto parte de una situación distinta",
  "trabaja.hero.text": "Por eso lo primero no es proponer, sino escuchar: qué existe, qué funciona, qué no y qué puede sostenerse con los recursos reales. No hay una metodología estándar que se aplique igual a todos. Hay una forma de trabajar que se adapta a lo que cada situación necesita.",
  "eventos.hero.title": "Un encuentro bien pensado puede dejar cosas útiles mucho después de que termine",
  "eventos.hero.p1": "Nuevas relaciones entre personas o entidades que antes no se conocían. Visibilidad para un producto, un oficio o una propuesta cultural. Actividad para el comercio y las empresas del lugar. Contactos con medios, agencias o prescriptores. Conversaciones que abren puertas que ninguna campaña habría abierto.",
  "eventos.hero.p2": "Pero para que eso ocurra, el encuentro tiene que tener sentido. Saber por qué merece la pena reunir a esas personas, qué debería ocurrir durante el encuentro y qué debería quedar después.",
  "eventos.hero.p3": "Más que hacer muchos eventos, la idea es crear encuentros que tengan sentido para quienes participan y para el lugar donde ocurren.",
  "notas.hero.title": "Un espacio para compartir ideas, conversaciones con personas interesantes y recomendaciones sobre turismo y vida local",
  "notas.hero.p1": "También para plantear preguntas que no siempre tienen respuesta fácil, contar proyectos que merecen la pena y dejar por escrito algunas dudas y reflexiones.",
  "notas.hero.p2": "Sin periodicidad fija ni obligación de publicar por publicar.",
  "notas.post.title": "No todo pueblo necesita atraer más visitantes",
  "notas.post.text": "El turismo puede ayudar. Puede generar ingresos, dar visibilidad a lo que ya existe y crear razones para quedarse. Pero también puede convertirse en una promesa que no se cumple, o en actividad que llena los fines de semana de agosto sin dejar nada útil el resto del año.",
  "quien.hero.title": "El origen",
  "quien.hero.p1": "Llevo más de veinte años trabajando en turismo. En la administración regional, en un ayuntamiento, en una empresa pública de innovación, en una ruta del vino, en una empresa que prepara licitaciones. He estado en muchos lados de la mesa: redactando memorias, coordinando proyectos, gestionando webs de destino, trabajando con bodegas y alojamientos, preparando propuestas para fondos públicos.",
  "quien.hero.p2": "En todo ese recorrido hay algo que he visto repetirse una y otra vez: territorios con recursos, con fondos disponibles y con personas con ganas, donde los proyectos no avanzan porque no hay nadie con tiempo y capacidad técnica para llevarlos adelante. Planes que se quedan en el documento. Convocatorias que se cierran sin proyecto presentado. Ideas buenas esperando a que alguien las recoja.",
  "quien.hero.p3": "A la fresca nace para trabajar en ese espacio.",
  "quien.note.p1": "Más de veinte años en distintos ámbitos del turismo: administración pública, gestión de destinos, comunicación, creación de producto, digitalización y proyectos con fondos europeos.",
  "quien.note.p2": "A la fresca trabaja desde Logroño, con La Rioja como base y proyección hacia Rioja Alavesa, Navarra, Soria y Burgos.",
  "contacto.title": "Cuéntamelo",
  "contacto.intro": "Tanto si tienes claro lo que necesitas como si todavía estás dándole vueltas, escríbeme y lo vemos juntos. Una primera conversación no compromete a nada y casi siempre ayuda a ordenar las ideas.",
  "contacto.name": "María Sanz Fernández",
  "contacto.note": "Respondo personalmente a todos los mensajes. Si tu consulta tiene un plazo cerca ?una convocatoria, una fecha límite dímelo en el mensaje y la priorizo.",
  "home.hero.image": "assets/photos/plaza-kiosko-wide.png",
  "home.trajectory.image": "assets/photos/banco-charla-wide.png",
  "ayuda.hero.image": "assets/photos/tienda-pueblo-wide.png",
  "trabaja.hero.image": "assets/photos/mesa-exterior-wide.png",
  "eventos.hero.image": "assets/photos/comida-popular-wide.png",
  "notas.hero.image": "assets/photos/sillas-enea-wide.png",
  "notas.post.image": "assets/photos/calle-pueblo.jpg",
  "quien.hero.image": "assets/photos/sillas-enea-wide.png",
  "contacto.image": "assets/photos/banco-charla-wide.png"
};

function findCurrentValue(key) {
  return defaults[key] || fallbackDefaults[key] || "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function imageName(value) {
  if (!value) return "Sin imagen seleccionada";
  if (value.startsWith("data:image")) return "Foto subida";
  return imageOptions.find(([src]) => src === value)?.[1] || value.split("/").pop() || value;
}

function imagePreviewMarkup(key, value) {
  const safeValue = escapeHtml(value || "");
  return `
    <figure class="cms-image-preview" data-preview-for="${escapeHtml(key)}">
      ${value ? `<img src="${safeValue}" alt="">` : ""}
      <figcaption>${escapeHtml(imageName(value))}</figcaption>
    </figure>
  `;
}

function imageFieldMarkup(name, label, value, uploadKey) {
  const options = imageOptions.map(([src, optionLabel]) => `<option value="${escapeHtml(src)}" ${src === value ? "selected" : ""}>${escapeHtml(optionLabel)}</option>`).join("");
  return `
    <div class="cms-image-field">
      <label><span>${label}</span><select name="${escapeHtml(name)}" data-preview-target="${escapeHtml(uploadKey)}"><option value="">Sin cambiar</option>${options}</select></label>
      ${imagePreviewMarkup(uploadKey, value)}
      <input type="file" accept="image/*" data-upload="${escapeHtml(uploadKey)}">
    </div>
  `;
}

async function readDefaults() {
  const pages = ["index.html", "ayuda.html", "trabaja.html", "eventos.html", "notas.html", "quien.html", "contacto.html"];
  const parser = new DOMParser();
  for (const page of pages) {
    try {
      const html = await fetch(page).then((res) => res.text());
      const pageDoc = parser.parseFromString(html, "text/html");
      pageDoc.querySelectorAll("[data-cms-text]").forEach((el) => {
        defaults[el.dataset.cmsText] = el.textContent.trim();
      });
      pageDoc.querySelectorAll("[data-cms-src]").forEach((el) => {
        defaults[el.dataset.cmsSrc] = el.getAttribute("src") || "";
      });
    } catch {
      // If local fetch is unavailable, fields will still render with saved values.
    }
  }
}

async function readSharedOverrides() {
  if (location.protocol === "file:") return;
  try {
    const response = await fetch(`cms-data.json?ts=${Date.now()}`);
    if (!response.ok) return;
    const data = await response.json();
    if (data && typeof data === "object") {
      if (data.__content && typeof data.__content === "object") {
        dynamicContent = data.__content;
        localStorage.setItem("alafresca-content", JSON.stringify(dynamicContent));
      }
      overrides = { ...overrides, ...data };
      delete overrides.__content;
      localStorage.setItem("alafresca-cms-overrides", JSON.stringify(overrides));
    }
  } catch {
    // Local file preview still works without the shared CMS file.
  }
}

async function saveSharedOverrides(data) {
  if (location.protocol === "file:") return false;
  try {
    const response = await fetch("/cms-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return response.ok;
  } catch {
    return false;
  }
}

function updateImagePreview(key, value) {
  const preview = document.querySelector(`[data-preview-for="${CSS.escape(key)}"]`);
  if (!preview) return;
  preview.innerHTML = `${value ? `<img src="${escapeHtml(value)}" alt="">` : ""}<figcaption>${escapeHtml(imageName(value))}</figcaption>`;
}

function renderTextFields() {
  const container = document.getElementById("text-fields");
  container.innerHTML = textFields.map(([key, label, size]) => {
    const value = escapeHtml(overrides[key] ?? findCurrentValue(key));
    const control = size === "long"
      ? `<textarea name="${key}" rows="4">${value}</textarea>`
      : `<input name="${key}" type="text" value="${value}">`;
    return `<label><span>${label}</span>${control}</label>`;
  }).join("");
}

function renderImageFields() {
  const container = document.getElementById("image-fields");
  container.innerHTML = imageFields.map(([key, label]) => {
    const value = overrides[key] ?? findCurrentValue(key);
    return imageFieldMarkup(key, label, value, key);
  }).join("");
}

function contentLabel(path) {
  return path
    .replaceAll(".", " · ")
    .replaceAll("method", "Método")
    .replaceAll("situations", "Situaciones")
    .replaceAll("examples", "Ejemplos")
    .replaceAll("collaboration", "Colaboración")
    .replaceAll("eventFormats", "Eventos")
    .replaceAll("notesCategories", "Categorías notas")
    .replaceAll("notePosts", "Posts notas")
    .replaceAll("title", "Título")
    .replaceAll("text", "Texto")
    .replaceAll("short", "Resumen")
    .replaceAll("body", "Cuerpo")
    .replaceAll("launch", "Puesta en marcha")
    .replaceAll("change", "Cambio")
    .replaceAll("how", "Cómo")
    .replaceAll("image", "Imagen")
    .replaceAll("category", "Categoría")
    .replaceAll("steps", "Pasos");
}

function collectContentFields(value, base = "") {
  if (typeof value === "string") return [{ path: base, value }];
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, child]) => collectContentFields(child, base ? `${base}.${key}` : key));
}

function setContentValue(target, path, value) {
  const parts = path.split(".");
  let current = target;
  parts.slice(0, -1).forEach((part) => {
    current = current[Number.isNaN(Number(part)) ? part : Number(part)];
  });
  const last = parts.at(-1);
  current[Number.isNaN(Number(last)) ? last : Number(last)] = value;
}

function renderContentFields() {
  const container = document.getElementById("content-fields");
  if (!container) return;
  const editableRoots = ["method", "situations", "examples", "collaboration", "eventFormats", "notesCategories", "notePosts"];
  const fields = editableRoots.flatMap((root) => collectContentFields(dynamicContent[root], root));
  container.innerHTML = fields.map(({ path, value }) => {
    const isImage = path.endsWith(".image");
    if (isImage) {
      return imageFieldMarkup(`content:${path}`, contentLabel(path), value, `content:${path}`);
    }
    const rows = value.length > 95 ? 4 : 2;
    return `<label><span>${contentLabel(path)}</span><textarea name="content:${path}" rows="${rows}">${escapeHtml(value)}</textarea></label>`;
  }).join("");
}

function saveForm(event) {
  event.preventDefault();
  const data = JSON.parse(localStorage.getItem("alafresca-cms-overrides") || "{}");
  const nextContent = structuredClone(dynamicContent);
  new FormData(event.currentTarget).forEach((value, key) => {
    const cleanValue = String(value).trim();
    if (!cleanValue) return;
    if (key.startsWith("content:")) {
      setContentValue(nextContent, key.replace("content:", ""), cleanValue);
    } else {
      data[key] = cleanValue;
    }
  });
  dynamicContent = nextContent;
  localStorage.setItem("alafresca-cms-overrides", JSON.stringify(data));
  localStorage.setItem("alafresca-content", JSON.stringify(dynamicContent));
  overrides = data;
  saveSharedOverrides({ ...data, __content: dynamicContent }).finally(() => {
    alert("Cambios guardados. Abre la web o recarga la página para verlos.");
  });
}

function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const maxSide = 1800;
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", .86));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function handleUpload(event) {
  const input = event.target;
  if (!input.dataset.upload || !input.files?.[0]) return;
  try {
    const resizedImage = await resizeImage(input.files[0]);
    const uploadKey = input.dataset.upload;
    const data = JSON.parse(localStorage.getItem("alafresca-cms-overrides") || "{}");

    if (uploadKey.startsWith("content:")) {
      const path = uploadKey.replace("content:", "");
      const nextContent = structuredClone(dynamicContent);
      setContentValue(nextContent, path, resizedImage);
      dynamicContent = nextContent;
      localStorage.setItem("alafresca-content", JSON.stringify(dynamicContent));
      await saveSharedOverrides({ ...data, __content: dynamicContent });
    } else {
      data[uploadKey] = resizedImage;
      localStorage.setItem("alafresca-cms-overrides", JSON.stringify(data));
      overrides[uploadKey] = resizedImage;
      await saveSharedOverrides(data);
    }

    const select = document.querySelector(`select[name="${CSS.escape(uploadKey)}"]`);
    if (select) select.value = "";
    updateImagePreview(uploadKey, resizedImage);
    alert("Foto guardada. Recarga la web para verla.");
  } catch {
    alert("No he podido guardar esa foto. Prueba con una imagen más pequeña.");
  }
}

function handleImageSelect(event) {
  const select = event.target;
  if (!select.matches("select[data-preview-target]")) return;
  const key = select.dataset.previewTarget;
  const savedValue = key.startsWith("content:")
    ? collectContentFields(dynamicContent).find((field) => `content:${field.path}` === key)?.value
    : overrides[key] ?? findCurrentValue(key);
  updateImagePreview(key, select.value || savedValue || "");
}

document.getElementById("cms-form").addEventListener("submit", saveForm);
document.getElementById("image-fields").addEventListener("change", handleUpload);
document.getElementById("image-fields").addEventListener("change", handleImageSelect);
document.getElementById("content-fields").addEventListener("change", handleUpload);
document.getElementById("content-fields").addEventListener("change", handleImageSelect);
document.getElementById("reset-cms").addEventListener("click", () => {
  localStorage.removeItem("alafresca-cms-overrides");
  localStorage.removeItem("alafresca-content");
  location.reload();
});

Promise.all([readDefaults(), readSharedOverrides()]).finally(() => {
  renderTextFields();
  renderImageFields();
  renderContentFields();
});
