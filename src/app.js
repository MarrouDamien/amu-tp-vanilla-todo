import { applyRouting } from "./routing.js";

document.addEventListener("DOMContentLoaded", () => {
    applyRouting(window.location.pathname);
});