/* Minimal light/dark theme toggle.
   By default the site follows the system preference. Clicking the
   header button overrides it and remembers the choice. */
(function () {
  "use strict";

  var root = document.documentElement;
  var STORAGE_KEY = "site-theme";
  var LIGHT_BG = "#f4f6fa";
  var DARK_BG = "#111418";

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  var stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* storage unavailable; fall back to system preference */
  }
  var theme = stored === "light" || stored === "dark" ? stored : null;

  var button = document.getElementById("theme-toggle");

  function syncChromeColor() {
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    var color = theme === "dark" ? DARK_BG : LIGHT_BG;
    metas.forEach(function (meta) {
      meta.setAttribute("content", color);
      meta.removeAttribute("media");
    });
  }

  function syncButton() {
    if (!button) {
      return;
    }
    var icon = button.querySelector("i");
    var dark = theme === "dark" || (!theme && systemPrefersDark());
    if (icon) {
      icon.className = dark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
    button.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }

  if (theme) {
    root.setAttribute("data-theme", theme);
    syncChromeColor();
  }

  if (button) {
    button.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      theme = next;
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (e) {
        /* storage unavailable; theme applies for this page view only */
      }
      syncChromeColor();
      syncButton();
    });
  }

  syncButton();
})();
