/* ==========================================================================
   certificates.js — CyberFolio dynamic credentials panel
   Renders the Certifications section from assets/certificates/certificates.json.
   To add a new certificate: drop the file in assets/certificates/, then add
   one object to certificates.json (see the template in README.md). No HTML
   editing required — this script does the rendering.
   ========================================================================== */
(function () {
  "use strict";

  var JSON_PATH = "assets/certificates/certificates.json";
  var FILE_BASE = "assets/certificates/";

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  function cardHtml(cert) {
    var title = escapeHtml(cert.title || "Untitled credential");
    var subtitle = cert.subtitle ? '<p class="project-tagline">' + escapeHtml(cert.subtitle) + "</p>" : "";
    var description = cert.description ? "<p>" + escapeHtml(cert.description) + "</p>" : "";
    var linkLabel = escapeHtml(cert.linkLabel || "View certificate");
    var fileHref = cert.file ? FILE_BASE + encodeURIComponent(cert.file) : null;

    var link = fileHref
      ? '<a href="' + fileHref + '" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">' +
        linkLabel +
        ' <svg width="14" height="14" viewBox="0 0 24 24"><use href="#ic-external"/></svg></a>'
      : "";

    return (
      '<div class="cert-card glass reveal">' +
        '<div class="cert-card-icon"><svg width="22" height="22" viewBox="0 0 24 24"><use href="#ic-award"/></svg></div>' +
        '<div class="cert-card-body"><h3>' + title + "</h3>" + subtitle + description + "</div>" +
        link +
      "</div>"
    );
  }

  function fadeInNewCards(container) {
    var cards = container.querySelectorAll(".reveal");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      cards.forEach(function (c) { c.classList.add("in-view"); });
      return;
    }
    // Next frame so the initial (opacity:0) state paints before we transition it in.
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        cards.forEach(function (c, i) {
          window.setTimeout(function () { c.classList.add("in-view"); }, i * 90);
        });
      });
    });
  }

  function render(certs, container) {
    if (!Array.isArray(certs) || certs.length === 0) {
      container.innerHTML = '<p class="gh-status">No certificates published yet — check back soon.</p>';
      return;
    }

    var sorted = certs.slice().sort(function (a, b) {
      var da = a.date ? new Date(a.date).getTime() : 0;
      var db = b.date ? new Date(b.date).getTime() : 0;
      return db - da; // newest first
    });

    container.innerHTML = sorted.map(cardHtml).join("");
    fadeInNewCards(container);
  }

  function init() {
    var container = document.getElementById("certGrid");
    if (!container) return;

    fetch(JSON_PATH, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("certificates.json responded " + res.status);
        return res.json();
      })
      .then(function (certs) { render(certs, container); })
      .catch(function () {
        container.innerHTML =
          '<p class="gh-status" style="color:var(--warn)">Couldn\u2019t load certificates.json right now. ' +
          "If you're previewing this from a local file:// path, serve the folder instead " +
          "(see README.md) \u2014 it works normally once deployed.</p>";
      });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
