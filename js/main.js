/* ==========================================================================
   main.js — CyberFolio
   Nav, scroll progress, reveal-on-scroll, boot sequence, typed hero role,
   hero particle network, and the (mailto-based) contact form.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     Boot sequence
     ------------------------------------------------------------------- */
  function runBootSequence() {
    var overlay = document.getElementById("bootOverlay");
    var linesEl = document.getElementById("bootLines");
    if (!overlay || !linesEl) return;

    var alreadyBooted = sessionStorage.getItem("cf_booted");
    if (alreadyBooted || reduceMotion) {
      overlay.classList.add("is-hidden");
      overlay.setAttribute("aria-hidden", "true");
      return;
    }

    var lines = [
      "booting cyberfolio.sys ...",
      "loading credentials [abdul_rehman_tahir] ... <b>OK</b>",
      "verifying integrity ... <b>OK</b>",
      "establishing secure session ... <b>OK</b>",
      "ACCESS GRANTED"
    ];

    lines.forEach(function (text, i) {
      var p = document.createElement("div");
      p.className = "line" + (i === lines.length - 1 ? " granted" : "");
      p.style.animationDelay = i * 0.22 + "s";
      p.innerHTML = "&gt; " + text;
      linesEl.appendChild(p);
    });

    var dismiss = function () {
      overlay.classList.add("is-hidden");
      overlay.setAttribute("aria-hidden", "true");
      sessionStorage.setItem("cf_booted", "1");
      overlay.removeEventListener("click", dismiss);
    };
    overlay.addEventListener("click", dismiss);
    window.setTimeout(dismiss, lines.length * 220 + 650);
  }

  /* ---------------------------------------------------------------------
     Mobile nav toggle
     ------------------------------------------------------------------- */
  function initNavToggle() {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("navMenu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });

    menu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------------------------------------------------------------------
     Scroll progress bar + header scroll-spy
     ------------------------------------------------------------------- */
  function initScrollProgressAndSpy() {
    var bar = document.getElementById("scrollProgress");
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link[href^='#']"));
    var sections = navLinks
      .map(function (link) {
        var id = link.getAttribute("href").slice(1);
        return { link: link, el: document.getElementById(id) };
      })
      .filter(function (s) { return s.el; });

    function onScroll() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (bar) bar.style.width = pct + "%";

      var fromTop = scrollTop + 140;
      var current = null;
      sections.forEach(function (s) {
        if (s.el.offsetTop <= fromTop) current = s;
      });
      sections.forEach(function (s) { s.link.classList.remove("active"); });
      if (current) current.link.classList.add("active");
    }

    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------------------
     Reveal-on-scroll
     ------------------------------------------------------------------- */
  function initReveal() {
    var targets = document.querySelectorAll(
      ".timeline-item, .skill-card, .project-card, .cert-card, .roadmap-item, .achv-card, .exp-card, .contact-card, .gh-panel, .about-grid > *"
    );
    targets.forEach(function (el) { el.classList.add("reveal"); });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------------
     Typed hero role text
     ------------------------------------------------------------------- */
  function initTypedRole() {
    var el = document.getElementById("typedRole");
    if (!el) return;
    var roles = ["Computer Science Student", "Cybersecurity Enthusiast", "Python Developer"];

    if (reduceMotion) {
      el.textContent = roles[0];
      return;
    }

    var roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      var word = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          return window.setTimeout(tick, 1500);
        }
      } else {
        charIndex--;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      window.setTimeout(tick, deleting ? 35 : 70);
    }
    tick();
  }

  /* ---------------------------------------------------------------------
     Hero particle network (canvas) — confined to hero, paused off-screen
     ------------------------------------------------------------------- */
  function initHeroCanvas() {
    var canvas = document.getElementById("heroCanvas");
    if (!canvas || reduceMotion) return;
    var ctx = canvas.getContext("2d");
    var hero = canvas.closest(".hero");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var particles = [];
    var running = true;
    var raf = null;

    function resize() {
      var w = hero.clientWidth, h = hero.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.max(24, Math.min(60, Math.round((w * h) / 26000)));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.6 + 0.6
        });
      }
    }

    function step() {
      if (!running) return;
      var w = hero.clientWidth, h = hero.clientHeight;
      ctx.clearRect(0, 0, w, h);

      particles.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });

      var maxDist = Math.min(150, w / 6);
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var a = particles[i], b = particles[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.strokeStyle = "rgba(79,216,255," + (0.16 * (1 - dist / maxDist)) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      particles.forEach(function (p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(79,216,255,.55)";
        ctx.fill();
      });

      raf = window.requestAnimationFrame(step);
    }

    resize();
    raf = window.requestAnimationFrame(step);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
      if (running) raf = window.requestAnimationFrame(step);
      else if (raf) window.cancelAnimationFrame(raf);
    });
  }

  /* ---------------------------------------------------------------------
     Contact form -> mailto (fully static-hosting friendly, no backend)
     ------------------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var subject = encodeURIComponent("Portfolio contact from " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href = "mailto:abdulrehman.at3.official@gmail.com?subject=" + subject + "&body=" + body;
    });
  }

  /* ---------------------------------------------------------------------
     Misc: footer year
     ------------------------------------------------------------------- */
  function initFooterYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    runBootSequence();
    initNavToggle();
    initScrollProgressAndSpy();
    initReveal();
    initTypedRole();
    initHeroCanvas();
    initContactForm();
    initFooterYear();
  });
})();
