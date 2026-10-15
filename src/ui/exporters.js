import avatarCss from "../styles/avatar.css?raw";

const XMLNS = "http://www.w3.org/2000/svg";

/**
 * Sérialise l'avatar affiché en un fichier SVG autonome.
 * `animated: true`  → le CSS d'animation est embarqué : le fichier bouge dans un navigateur
 *                     ou dans une balise <img>.
 * `animated: false` → image fixe (data-static), idéale pour le PNG.
 */
export function serializeAvatar(svgEl, { animated }) {
  const clone = svgEl.cloneNode(true);
  clone.setAttribute("xmlns", XMLNS);
  clone.removeAttribute("data-offscreen");
  clone.removeAttribute("aria-hidden");
  clone.setAttribute("width", "800");
  clone.setAttribute("height", "800");
  if (!animated) clone.setAttribute("data-static", "true");

  const style = document.createElementNS(XMLNS, "style");
  style.textContent = avatarCss;
  clone.insertBefore(style, clone.firstChild);

  return new XMLSerializer().serializeToString(clone);
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function downloadSvg(svgEl, name = "avatar") {
  const text = serializeAvatar(svgEl, { animated: true });
  download(new Blob([text], { type: "image/svg+xml;charset=utf-8" }), `${name}-anime.svg`);
}

export function downloadPng(svgEl, name = "avatar", size = 1024) {
  return new Promise((resolve, reject) => {
    const text = serializeAvatar(svgEl, { animated: false });
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      canvas.getContext("2d").drawImage(img, 0, 0, size, size);
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error("Export PNG impossible"));
        download(blob, `${name}.png`);
        resolve();
      }, "image/png");
    };
    img.onerror = () => reject(new Error("Export PNG impossible"));
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(text)}`;
  });
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Repli pour les navigateurs sans API presse-papiers (ou contexte non sécurisé)
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    ta.remove();
    return ok;
  }
}
