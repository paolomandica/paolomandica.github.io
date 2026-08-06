/* Small site interactions: mobile navigation menu and back-to-top button. */
(function () {
  "use strict";

  /* Mobile navigation */
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");
  var navWrap = document.querySelector(".nav-wrap");

  if (navToggle && siteNav) {
    function setMenu(open) {
      siteNav.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      var icon = navToggle.querySelector("i");
      if (icon) {
        icon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
      }
    }

    navToggle.addEventListener("click", function () {
      setMenu(!siteNav.classList.contains("open"));
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("click", function (event) {
      if (navWrap && siteNav.classList.contains("open") && !navWrap.contains(event.target)) {
        setMenu(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && siteNav.classList.contains("open")) {
        setMenu(false);
        navToggle.focus();
      }
    });
  }

  /* Back to top */
  var backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    var reduceMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function onScroll() {
      backToTop.classList.toggle("visible", window.scrollY > 600);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
    onScroll();
  }

})();
