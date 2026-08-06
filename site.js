/* Small site interactions: mobile navigation menu and back-to-top button. */
(function () {
  "use strict";

  /* Mobile navigation */
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");
  var navWrap = document.querySelector(".nav-wrap");

  if (navToggle && siteNav) {
    var body = document.body;
    var links = Array.prototype.slice.call(siteNav.querySelectorAll("a"));
    var lastScrollY = 0;

    function lockScroll() {
      lastScrollY = window.scrollY;
      body.style.top = "-" + lastScrollY + "px";
      body.classList.add("scroll-locked");
    }

    function unlockScroll() {
      body.classList.remove("scroll-locked");
      body.style.top = "";
      var html = document.documentElement;
      var previousBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, lastScrollY);
      html.style.scrollBehavior = previousBehavior;
    }

    function setMenu(open) {
      siteNav.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (open) {
        lockScroll();
        var target = siteNav.querySelector("a.active") || links[0];
        if (target) {
          target.focus();
        }
      } else {
        unlockScroll();
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

    /* Keep keyboard focus cycling inside the open menu. */
    siteNav.addEventListener("keydown", function (event) {
      if (event.key !== "Tab" || !siteNav.classList.contains("open") || links.length === 0) {
        return;
      }
      var first = links[0];
      var last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    /* Close the menu if the viewport grows to desktop size. */
    var desktopMq = window.matchMedia("(min-width: 641px)");
    function handleDesktopChange(event) {
      if (event.matches && siteNav.classList.contains("open")) {
        setMenu(false);
      }
    }
    if (desktopMq.addEventListener) {
      desktopMq.addEventListener("change", handleDesktopChange);
    } else if (desktopMq.addListener) {
      desktopMq.addListener(handleDesktopChange);
    }
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
