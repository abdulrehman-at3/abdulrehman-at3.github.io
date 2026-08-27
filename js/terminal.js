/* ==========================================================================
   terminal.js — CyberFolio interactive terminal
   A themed command simulation. Nothing here executes real shell commands;
   it is a guided, safe walkthrough of the page's own content.
   ========================================================================== */
(function () {
  "use strict";

  var output, input, form;
  var history = [];
  var historyIndex = -1;

  function esc(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function printCommand(cmd) {
    var p = document.createElement("p");
    p.className = "t-cmd";
    p.textContent = cmd;
    output.appendChild(p);
  }

  function printLine(html, cls) {
    var p = document.createElement("p");
    if (cls) p.className = cls;
    p.innerHTML = html;
    output.appendChild(p);
  }

  function scrollToSection(id) {
    var el = document.getElementById(id);
    if (el) window.setTimeout(function () { el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 350);
  }

  var commands = {
    help: function () {
      printLine(
        "Available commands:\n" +
        "  whoami        about          skills\n" +
        "  education     experience     projects\n" +
        "  certifications  roadmap      github\n" +
        "  contact       resume         neofetch\n" +
        "  clear         date           ls",
        "t-dim"
      );
    },
    whoami: function () {
      printLine("abdul_rehman_tahir — Computer Science student, aspiring SOC / Cybersecurity Analyst.");
      printLine("Currently: BS Computer Science (Post-ADP) @ University of Central Punjab.", "t-dim");
    },
    about: function () {
      printLine(
        "I'm a Computer Science student with a genuine pull toward cybersecurity, secure\n" +
        "software development, and Python. I build practical, security-focused apps —\n" +
        "phishing detectors, password auditors, encryption tools — and I'm steadily\n" +
        "expanding into ethical hacking, network security, and defensive cybersecurity."
      );
      scrollToSection("about");
    },
    education: function () {
      printLine("Associate Degree in Computer Science — UCP (2023–2025) — completed", "t-ok");
      printLine("BS Computer Science (Post-ADP) — UCP — expected 2027 — in progress", "t-dim");
      scrollToSection("education");
    },
    skills: function () {
      printLine(
        "Cybersecurity : Phishing Detection, Password Security, Secure Coding,\n" +
        "                Email Security, Network Fundamentals, Threat Analysis,\n" +
        "                Vulnerability Assessment, Linux, Windows Security Basics\n" +
        "Programming   : Python, C++, SQL\n" +
        "Tools         : Git, GitHub, VS Code, Linux, Windows\n" +
        "Learning now  : Ethical Hacking, Penetration Testing, Network Security"
      );
      scrollToSection("skills");
    },
    experience: function () {
      printLine("Cybersecurity Intern — DecodeLabs (Jul–Aug 2026)", "t-ok");
      printLine("Built practical security projects, applied secure dev practices, worked in Python.", "t-dim");
      scrollToSection("experience");
    },
    projects: function () {
      printLine(
        "PhishGuard   — context-aware phishing email detector (Flask)\n" +
        "CyberShield  — password strength & entropy analyzer (CLI)\n" +
        "Encrypto     — Caesar / Vigenère / AES-256-GCM encryption toolkit"
      );
      scrollToSection("projects");
    },
    certifications: function () {
      printLine("DecodeLabs Virtual Internship — Cyber Security — Certificate of Completion", "t-ok");
      printLine("Letter of Recommendation — DecodeLabs, Aug 9 2026", "t-ok");
      scrollToSection("certifications");
    },
    roadmap: function () {
      printLine(
        "Planned: CompTIA Security+, Google Cybersecurity Cert, CEH,\n" +
        "         TryHackMe paths, Hack The Box labs",
        "t-dim"
      );
      scrollToSection("roadmap");
    },
    github: function () {
      printLine("github.com/abdulrehman-at3 — opening live stats below.", "t-ok");
      scrollToSection("github");
    },
    contact: function () {
      printLine(
        "email : abdulrehman.at3.official@gmail.com\n" +
        "phone : +92 319 7337028\n" +
        "linkedin : linkedin.com/in/mabdul-rehman\n" +
        "github   : github.com/abdulrehman-at3"
      );
      scrollToSection("contact");
    },
    resume: function () {
      printLine("Downloading resume ...", "t-ok");
      var a = document.createElement("a");
      a.href = "assets/resume/Abdul_Rehman_Tahir_Resume.pdf";
      a.download = "";
      document.body.appendChild(a);
      a.click();
      a.remove();
    },
    neofetch: function () {
      printLine(
        "     ▲        rehman@cyberfolio\n" +
        "    ▲ ▲       -----------------\n" +
        "   ▲   ▲      Role   : Aspiring SOC / Security Analyst\n" +
        "  ▲▲▲▲▲▲▲     Stack  : Python, Flask, SQL\n" +
        "              Focus  : AppSec, Phishing Defense, Crypto\n" +
        "              Status : Open to entry-level roles",
        "t-dim"
      );
    },
    date: function () {
      printLine(new Date().toString(), "t-dim");
    },
    ls: function () {
      printLine(
        "about/  education/  skills/  experience/  projects/  certifications/\n" +
        "roadmap/  github/  achievements/  contact/  resume.pdf",
        "t-dim"
      );
    },
    clear: function () {
      output.innerHTML = "";
    },
    "sudo hire-me": function () {
      printLine("[sudo] password for recruiter: ", "t-dim");
      printLine("Permission granted. Reviewing resume now would be a great next step →", "t-ok");
      window.setTimeout(function () {
        var a = document.createElement("a");
        a.href = "assets/resume/Abdul_Rehman_Tahir_Resume.pdf";
        a.download = "";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }, 400);
    }
  };

  function run(raw) {
    var cmd = raw.trim();
    if (!cmd) return;
    printCommand(cmd);

    var key = cmd.toLowerCase();
    if (commands[key]) {
      commands[key]();
    } else if (key === "echo" || key.indexOf("echo ") === 0) {
      printLine(esc(cmd.slice(5)));
    } else {
      printLine("command not found: " + esc(cmd) + " — type 'help' for a list.", "t-err");
    }
    output.scrollTop = output.scrollHeight;
  }

  function initTerminal() {
    output = document.getElementById("terminalOutput");
    input = document.getElementById("terminalInput");
    form = document.getElementById("terminalForm");
    if (!output || !input || !form) return;

    printLine("CyberFolio secure shell — type <b class=\"t-ok\">help</b> to begin.", "t-dim");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = input.value;
      history.push(val);
      historyIndex = history.length;
      run(val);
      input.value = "";
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex > 0) { historyIndex--; input.value = history[historyIndex] || ""; }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex < history.length) {
          historyIndex++;
          input.value = history[historyIndex] || "";
        }
      }
    });

    document.getElementById("terminalWindow").addEventListener("click", function () {
      input.focus();
    });
  }

  document.addEventListener("DOMContentLoaded", initTerminal);
})();
