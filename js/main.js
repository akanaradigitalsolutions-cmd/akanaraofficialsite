/* =========================================================================
   AKANARA DIGITAL SOLUTIONS — Core script
   Runs across all pages. Every block guards for the elements it needs,
   so the same file is safe to load on pages without a hero/canvas/form.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- Analytics: Google Tag Manager ----------
     Paste your GTM container id below (e.g. "GTM-ABC1234") to enable analytics
     across every page. Leave it empty to keep analytics off. Manage GA4 and any
     other tags inside GTM itself. */
  var GTM_ID = "";
  if (GTM_ID) {
    (function (w, d, s, l, i) {
      w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", GTM_ID);
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Image fallback: reveal the tropical gradient if a photo fails ---------- */
  (function mediaFallback() {
    document.querySelectorAll(".media > img").forEach(function (img) {
      function broke() { var m = img.closest(".media"); if (m) m.classList.add("is-broken"); }
      if (img.complete && img.naturalWidth === 0) broke();
      img.addEventListener("error", broke);
    });
  })();

  /* ---------- Hero canvas: luminous constellation field (only if #field present) ---------- */
  (function heroField() {
    var c = document.getElementById("field");
    if (!c) return;
    var ctx = c.getContext("2d");
    var w, h, dpr, pts = [], mouse = { x: -999, y: -999 }, raf;

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.width = innerWidth * dpr;
      h = c.height = c.offsetHeight * dpr;
      c.style.width = innerWidth + "px";
      var n = Math.min(90, Math.floor(innerWidth / 16));
      pts = [];
      for (var i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18 * dpr,
          vy: (Math.random() - 0.5) * 0.18 * dpr,
          r: (Math.random() * 1.6 + 0.4) * dpr
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.hypot(dx, dy);
          if (d < 130 * dpr) {
            var a = (1 - d / (130 * dpr)) * 0.30;
            ctx.strokeStyle = "rgba(16,156,151," + a + ")";
            ctx.lineWidth = 0.7 * dpr;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        var mdx = p.x - mouse.x, mdy = p.y - mouse.y, md = Math.hypot(mdx, mdy);
        var glow = 0;
        if (md < 200 * dpr) glow = 1 - md / (200 * dpr);
        ctx.beginPath();
        ctx.fillStyle = glow > 0
          ? "rgba(234,90,50," + (0.35 + glow * 0.55) + ")"
          : "rgba(33,26,21,.28)";
        ctx.arc(p.x, p.y, p.r + glow * 1.6 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    window.addEventListener("resize", size);
    window.addEventListener("mousemove", function (e) {
      var r = c.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * dpr;
      mouse.y = (e.clientY - r.top) * dpr;
    });
    window.addEventListener("mouseleave", function () { mouse.x = -999; mouse.y = -999; });
    size();
    draw();
    if (reduce) cancelAnimationFrame(raf); // static single frame
  })();

  /* ---------- Smooth scroll (Lenis) ---------- */
  var lenis;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })();
    if (window.ScrollTrigger) lenis.on("scroll", ScrollTrigger.update);
  }

  /* ---------- Nav scrolled state ---------- */
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", scrollY > 40); };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector(".burger");
  var mobileMenu = document.getElementById("mobileMenu");
  if (burger && mobileMenu) {
    var setMenu = function (open) {
      burger.classList.toggle("open", open);
      mobileMenu.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", function () {
      setMenu(!mobileMenu.classList.contains("open"));
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
      a.style.maxHeight = open ? a.scrollHeight + "px" : 0;
    });
  });

  /* ---------- GSAP reveals + hero entrance + count-ups ---------- */
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    if (!reduce) {
      var heroLines = document.querySelectorAll(".hero h1 .ln > span");
      if (heroLines.length) {
        gsap.set(heroLines, { yPercent: 115 });
        var tl = gsap.timeline({ delay: 0.25 });
        tl.to(heroLines, { yPercent: 0, duration: 1.05, stagger: 0.09, ease: "power4.out" })
          .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.7 }, "-=.9")
          .from(".hero-sub", { opacity: 0, y: 24, duration: 0.8 }, "-=.7");
      }
      gsap.utils.toArray(".reveal").forEach(function (el) {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
      });
      gsap.utils.toArray(".stat .num").forEach(function (el) {
        var target = +el.dataset.count, span = el.querySelector("span");
        if (!span) return;
        ScrollTrigger.create({
          trigger: el, start: "top 85%", once: true,
          onEnter: function () {
            gsap.to({ v: 0 }, {
              v: target, duration: 1.6, ease: "power2.out",
              onUpdate: function () { span.textContent = Math.round(this.targets()[0].v); }
            });
          }
        });
      });
    } else {
      gsap.set(".reveal", { opacity: 1, y: 0 });
      document.querySelectorAll(".stat .num").forEach(function (el) {
        var span = el.querySelector("span");
        if (span) span.textContent = el.dataset.count;
      });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (e) {
      e.style.opacity = 1; e.style.transform = "none";
    });
    // no GSAP: still show the real stat numbers (no count-up)
    document.querySelectorAll(".stat .num").forEach(function (el) {
      var s = el.querySelector("span");
      if (s) s.textContent = el.dataset.count;
    });
  }

  /* Safety net: force any still-hidden reveal visible after 1.2s */
  setTimeout(function () {
    document.querySelectorAll(".reveal").forEach(function (e) {
      if (getComputedStyle(e).opacity === "0") { e.style.opacity = 1; e.style.transform = "none"; }
    });
  }, 1200);

  /* ---------- Contact form (Web3Forms — static-hosting friendly) ---------- */
  var form = document.getElementById("leadForm");
  if (form) {
    var status = document.getElementById("formStatus");
    var submitBtn = form.querySelector('button[type="submit"]');
    var ACCESS_KEY = form.dataset.accessKey || "";

    var say = function (msg, ok) {
      if (!status) return;
      status.textContent = msg;
      status.className = "form-status show " + (ok ? "ok" : "err");
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // honeypot: bots fill this hidden field
      if (form.querySelector('input[name="botcheck"]') &&
          form.querySelector('input[name="botcheck"]').checked) return;

      if (!ACCESS_KEY || ACCESS_KEY === "REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY") {
        say("Form not configured yet. Add your Web3Forms access key (see README), or email hello@akanara.com.", false);
        return;
      }

      var data = Object.fromEntries(new FormData(form).entries());
      data.access_key = ACCESS_KEY;
      data.subject = "New project inquiry — akanara.com";
      data.from_name = "Akanara Website";

      if (submitBtn) { submitBtn.disabled = true; submitBtn.dataset.label = submitBtn.textContent; submitBtn.textContent = "Sending…"; }

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.success) {
            say("Thank you — your inquiry is in. We usually reply within one business day.", true);
            form.reset();
          } else {
            say((res.message || "Something went wrong.") + " You can also email hello@akanara.com.", false);
          }
        })
        .catch(function () {
          say("Network error. Please email hello@akanara.com and we'll jump on it.", false);
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.label || "Send inquiry"; }
        });
    });
  }
})();
