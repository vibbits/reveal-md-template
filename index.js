import Reveal from "./reveal/reveal.esm.js";
import RevealNotes from "./reveal/plugin/notes/notes.esm.js";
import RevealMarkdown from "./reveal/plugin/markdown/markdown.esm.js";
import RevealHighlight from "./reveal/plugin/highlight/highlight.esm.js";
import RevealZoom from "./reveal/plugin/zoom/zoom.esm.js";

import data from "./slides/slides.md";

let backgroundImage = null;

const setup = (event) => {
  const viewport = document.querySelector("#vib-background-image");
  backgroundImage = window.getComputedStyle(viewport).backgroundImage;
  return event;
};

const dynamicStyles = (event) => {
  let id = event.currentSlide.getAttribute("id");
  let viewport = document.querySelector(".reveal-viewport");
  let watermarks = document.querySelector("#vib-watermarks");

  switch (id) {
    case "title":
      viewport.style.setProperty("--r-background-color", "#1b2944");
      viewport.style.setProperty("--r-heading-color", "rgb(244, 244, 244)");
      viewport.style.setProperty("background-image", backgroundImage);
      watermarks.style.setProperty("display", "inline");

      break;
    case "final":
      viewport.style.setProperty("background-image", undefined);
      viewport.style.setProperty("--r-background-color", "#1b2944");
      viewport.style.removeProperty("background-image");
      watermarks.style.setProperty("display", "none");
      break;

    default:
      viewport.style.setProperty("--r-background-color", "#f4f4f4");
      viewport.style.setProperty("--r-heading-color", "#1b2944");
      viewport.style.setProperty("--r-selection-color", "#1b2944");
      viewport.style.setProperty("--r-main-color", "#1b2944");
      viewport.style.setProperty("background-image", backgroundImage);
      watermarks.style.setProperty("display", "inline");
      break;
  }
};

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#markdown-area").innerHTML = data;

  Reveal.initialize({
    hash: true,
    plugins: [RevealMarkdown, RevealHighlight, RevealNotes, RevealZoom],
  });

  Reveal.addEventListener("ready", (event) => dynamicStyles(setup(event)));

  Reveal.addEventListener("slidechanged", dynamicStyles);
});
