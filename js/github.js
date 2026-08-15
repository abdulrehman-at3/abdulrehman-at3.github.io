/* ==========================================================================
   github.js — CyberFolio live GitHub panel
   Pulls public profile + repo data from the GitHub REST API client-side.
   Fails soft: on any error the section still shows a working profile link.
   ========================================================================== */
(function () {
  "use strict";

  var USERNAME = "abdulrehman-at3";
  var API = "https://api.github.com/users/" + USERNAME;

  function el(id) { return document.getElementById(id); }

  function timeAgo(dateStr) {
    var diff = Date.now() - new Date(dateStr).getTime();
    var days = Math.floor(diff / 86400000);
    if (days < 1) return "today";
    if (days === 1) return "yesterday";
    if (days < 30) return days + "d ago";
    var months = Math.floor(days / 30);
    if (months < 12) return months + "mo ago";
    return Math.floor(months / 12) + "y ago";
  }

  function setStatus(msg, isError) {
    var s = el("ghStatus");
    if (!s) return;
    s.textContent = msg || "";
    s.style.color = isError ? "var(--warn)" : "";
  }

  function renderProfile(user) {
    if (user.avatar_url) {
      var avatar = el("ghAvatar");
      if (avatar) { avatar.src = user.avatar_url; avatar.alt = user.name || USERNAME; avatar.hidden = false; }
    }
    if (user.bio) {
      var bio = el("ghBio");
      if (bio) bio.textContent = user.bio;
    }
    if (el("ghRepos")) el("ghRepos").textContent = user.public_repos ?? "—";
    if (el("ghFollowers")) el("ghFollowers").textContent = user.followers ?? "—";
    if (el("ghFollowing")) el("ghFollowing").textContent = user.following ?? "—";
    if (el("ghSince") && user.created_at) {
      el("ghSince").textContent = new Date(user.created_at).getFullYear();
    }
  }

  function renderRepos(repos) {
    var list = el("ghRepoList");
    if (!list) return;
    var ranked = repos
      .filter(function (r) { return !r.fork; })
      .sort(function (a, b) {
        if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count;
        return new Date(b.pushed_at) - new Date(a.pushed_at);
      })
      .slice(0, 4);

    if (!ranked.length) {
      list.innerHTML = '<p class="gh-status">No public repositories found yet.</p>';
      return;
    }

    list.innerHTML = ranked
      .map(function (r) {
        var desc = r.description ? escapeHtml(r.description) : "No description provided.";
        return (
          '<div class="gh-repo-card">' +
            '<a href="' + r.html_url + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(r.name) + "</a>" +
            "<p>" + desc + "</p>" +
            '<div class="gh-repo-meta">' +
              (r.language ? "<span>" + escapeHtml(r.language) + "</span>" : "") +
              "<span>\u2605 " + r.stargazers_count + "</span>" +
              "<span>Updated " + timeAgo(r.pushed_at) + "</span>" +
            "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function loadContributionChart() {
    var img = el("ghContribution");
    if (!img) return;
    img.src = "https://ghchart.rshah.org/4FD8FF/" + USERNAME;
    img.addEventListener("error", function () {
      img.closest(".gh-chart-wrap").style.display = "none";
    });
  }

  function fetchJSON(url) {
    return fetch(url, { headers: { Accept: "application/vnd.github+json" } }).then(function (res) {
      if (!res.ok) throw new Error("GitHub API responded " + res.status);
      return res.json();
    });
  }

  function init() {
    if (!el("ghStats")) return;
    setStatus("Fetching live data from GitHub \u2026");
    loadContributionChart();

    Promise.all([
      fetchJSON(API),
      fetchJSON(API + "/repos?sort=pushed&per_page=100")
    ])
      .then(function (results) {
        renderProfile(results[0]);
        renderRepos(results[1]);
        setStatus("");
      })
      .catch(function () {
        setStatus("Live GitHub data is unavailable right now (rate limit or offline) — the profile link above still works.", true);
      });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
