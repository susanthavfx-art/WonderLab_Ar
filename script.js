/* ==========================================================================
   WONDERLAB AR — Interactive Website Controller (Vanilla JS)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------------------------------
     1. MOBILE MENU & HEADER SCROLL STATE
     ------------------------------------------------------------------------ */
  const header = document.querySelector(".site-header");
  const menuBtn = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuBtn?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn?.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 24) {
        header?.classList.add("scrolled");
      } else {
        header?.classList.remove("scrolled");
      }
    },
    { passive: true }
  );

  /* ------------------------------------------------------------------------
     2. REVEAL-ON-SCROLL ANIMATIONS
     ------------------------------------------------------------------------ */
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ------------------------------------------------------------------------
     3. ANIMATED METRIC COUNTERS
     ------------------------------------------------------------------------ */
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count || 0);
        if (target === 0) {
          el.textContent = "0";
          obs.unobserve(el);
          return;
        }
        const duration = 1350;
        const start = performance.now();

        function updateCounter(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = String(Math.round(target * eased));
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        }
        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => counterObserver.observe(el));

  /* ------------------------------------------------------------------------
     4. DESKTOP AMBIENT CURSOR GLOW
     ------------------------------------------------------------------------ */
  const glow = document.querySelector(".cursor-glow");
  window.addEventListener(
    "pointermove",
    (e) => {
      if (glow && window.innerWidth > 860) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      }
    },
    { passive: true }
  );

  /* ------------------------------------------------------------------------
     5. HERO AR VIEWPORT SCENE SWITCHER
     ------------------------------------------------------------------------ */
  const heroTabs = document.querySelectorAll(".hero-scene-btn");
  const heroImg = document.getElementById("heroPreviewImg");
  const heroBadge = document.getElementById("heroLayerBadge");
  const heroTitle = document.getElementById("heroSceneTitle");
  const heroSub = document.getElementById("heroSceneSub");
  const heroStatus = document.getElementById("heroMarkerStatus");

  heroTabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      heroTabs.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      if (!heroImg) return;
      heroImg.style.opacity = "0.28";
      if (heroStatus) heroStatus.textContent = "SCANNING…";

      setTimeout(() => {
        heroImg.src = btn.dataset.img || "assets/hero-ar-scan.jpg";
        if (heroBadge) heroBadge.textContent = btn.dataset.badge || "";
        if (heroTitle) heroTitle.textContent = btn.dataset.title || "";
        if (heroSub) heroSub.textContent = btn.dataset.sub || "";
        heroImg.style.opacity = "1";
        if (heroStatus) heroStatus.textContent = "MARKER DETECTED";
      }, 220);
    });
  });

  /* ------------------------------------------------------------------------
     6. REAL LIVE WEBAR SAMPLES — MARKER + DYNAMIC QR GENERATOR (#live-demo)
     ------------------------------------------------------------------------ */
  const SCENARIOS = {
    heart: {
      badge: "MARKER 01 • TUITION",
      name: "Human Heart — A/L Biology",
      markerImg: "assets/markers/marker-heart.jpg",
      downloadName: "WonderLab-AR-Marker-01-Heart.jpg",
      summary: "Beating 3D Heart + Blood Flow + Lecturer Voiceover",
      pills: ["72 BPM 3D Mesh", "Blood Particles", "Audio Lesson"]
    },
    showroom: {
      badge: "MARKER 02 • MEDIA AD",
      name: "Aero-X 360° Print Ad Showroom",
      markerImg: "assets/markers/marker-showroom.jpg",
      downloadName: "WonderLab-AR-Marker-02-Sneaker.jpg",
      summary: "Rotating 3D Aero-X Sneaker + Live Colorway Switcher",
      pills: ["360° 3D Product", "Color Switcher", "Showroom Rings"]
    },
    science: {
      badge: "MARKER 03 • PUBLISHING",
      name: "Solar System AR Flash Card",
      markerImg: "assets/markers/marker-science.jpg",
      downloadName: "WonderLab-AR-Marker-03-SolarSystem.jpg",
      summary: "Orbiting 3D Planets + Saturn Rings + Space Narration",
      pills: ["8 Orbiting Planets", "Illuminated Sun", "2× Speed Control"]
    },
    packaging: {
      badge: "MARKER 04 • PACKAGING",
      name: "Ceylon Highland Tea Box",
      markerImg: "assets/markers/marker-packaging.jpg",
      downloadName: "WonderLab-AR-Marker-04-CeylonTea.jpg",
      summary: "3D Luxury Tea Caddy + Swirling Leaves + Origin Verification",
      pills: ["3D Gold Caddy", "Botanical Vortex", "Origin Audio"]
    },
    bcard: {
      badge: "MARKER 05 • CORPORATE",
      name: "WonderLab Executive AR Card",
      markerImg: "assets/markers/marker-bcard.jpg",
      downloadName: "WonderLab-AR-Marker-05-BusinessCard.jpg",
      summary: "3D WonderLab Emblem Hologram + One-Tap WhatsApp Connect",
      pills: ["3D Studio Emblem", "Lab Bubbles", "WhatsApp CTA"]
    }
  };

  const scenarioBtns = document.querySelectorAll(".scenario-btn");
  const activeMarkerImg = document.getElementById("activeMarkerImg");
  const simMarkerBadge = document.getElementById("simMarkerBadge");
  const simMarkerName = document.getElementById("simMarkerName");
  const btnDownloadMarker = document.getElementById("btnDownloadMarker");
  const arQrBox = document.getElementById("arQrBox");
  const openArCameraLink = document.getElementById("openArCameraLink");
  const btnCopyArUrl = document.getElementById("btnCopyArUrl");
  const simSampleSummary = document.getElementById("simSampleSummary");
  const simPills = document.getElementById("simPills");

  // Enlarge Modal Elements
  const markerModal = document.getElementById("markerModal");
  const btnEnlargeMarker = document.getElementById("btnEnlargeMarker");
  const markerCardFrame = document.getElementById("markerCardFrame");
  const closeMarkerModal = document.getElementById("closeMarkerModal");
  const modalMarkerImg = document.getElementById("modalMarkerImg");
  const modalMarkerBadge = document.getElementById("modalMarkerBadge");
  const modalMarkerTitle = document.getElementById("modalMarkerTitle");
  const modalQrBox = document.getElementById("modalQrBox");
  const modalOpenArLink = document.getElementById("modalOpenArLink");

  let currentArUrl = "";

  function getArCameraUrl(sceneKey) {
    const rel = `ar-camera.html?scene=${encodeURIComponent(sceneKey)}`;
    try {
      return new URL(rel, window.location.href).href;
    } catch (_) {
      return rel;
    }
  }

  function renderQrSvg(targetUrl) {
    if (typeof window.qrcode !== "function") return "";
    try {
      const qr = window.qrcode(0, "M");
      qr.addData(targetUrl);
      qr.make();
      return qr.createSvgTag({ scalable: true, margin: 1 });
    } catch (_) {
      return "";
    }
  }

  function selectArScenario(key) {
    const data = SCENARIOS[key];
    if (!data || !activeMarkerImg) return;

    const fullUrl = getArCameraUrl(key);
    currentArUrl = fullUrl;
    const relativeUrl = `ar-camera.html?scene=${encodeURIComponent(key)}`;

    activeMarkerImg.style.opacity = "0.35";
    setTimeout(() => {
      activeMarkerImg.src = data.markerImg;
      activeMarkerImg.alt = `WonderLab AR Scannable Image Marker — ${data.name}`;
      activeMarkerImg.style.opacity = "1";
    }, 120);

    if (simMarkerBadge) simMarkerBadge.textContent = data.badge;
    if (simMarkerName) simMarkerName.textContent = data.name;
    if (btnDownloadMarker) {
      btnDownloadMarker.href = data.markerImg;
      btnDownloadMarker.setAttribute("download", data.downloadName);
    }
    if (openArCameraLink) openArCameraLink.href = relativeUrl;
    if (simSampleSummary) simSampleSummary.textContent = data.summary;
    if (simPills) {
      simPills.innerHTML = data.pills.map((p) => `<span>${p}</span>`).join("");
    }

    const svgMarkup = renderQrSvg(fullUrl);
    if (arQrBox && svgMarkup) arQrBox.innerHTML = svgMarkup;

    // Keep Enlarge Modal synced
    if (modalMarkerImg) modalMarkerImg.src = data.markerImg;
    if (modalMarkerBadge) modalMarkerBadge.textContent = data.badge;
    if (modalMarkerTitle) modalMarkerTitle.textContent = data.name;
    if (modalQrBox && svgMarkup) modalQrBox.innerHTML = svgMarkup;
    if (modalOpenArLink) modalOpenArLink.href = relativeUrl;
  }

  // Initialize default scenario on page load
  selectArScenario("heart");

  scenarioBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      scenarioBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectArScenario(btn.dataset.scenario || "heart");
    });
  });

  btnCopyArUrl?.addEventListener("click", async () => {
    if (!currentArUrl) return;
    try {
      await navigator.clipboard.writeText(currentArUrl);
      const original = btnCopyArUrl.textContent;
      btnCopyArUrl.textContent = "Copied ✓";
      setTimeout(() => {
        btnCopyArUrl.textContent = original;
      }, 1600);
    } catch (_) {
      window.prompt("Copy AR Camera Link:", currentArUrl);
    }
  });

  function openModal() {
    if (!markerModal) return;
    markerModal.classList.add("open");
    markerModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!markerModal) return;
    markerModal.classList.remove("open");
    markerModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  btnEnlargeMarker?.addEventListener("click", openModal);
  markerCardFrame?.addEventListener("click", openModal);
  closeMarkerModal?.addEventListener("click", closeModal);
  markerModal?.addEventListener("click", (e) => {
    if (e.target === markerModal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* ------------------------------------------------------------------------
     7. INTERACTIVE CAMPAIGN ANALYTICS DASHBOARD
     ------------------------------------------------------------------------ */
  const CAMPAIGNS = {
    tuition: {
      scans: "48,240",
      users: "19,810",
      time: "2m 42s",
      cta: "18.4%",
      label: "Weekly Scan Activity — Islandwide A/L Revision Print Run",
      bars: [48, 62, 56, 74, 82, 100, 92],
      devices: "📱 Android Chrome: 71% • iOS Safari: 29%",
      regions: "📍 Top: Colombo, Kandy, Kurunegala, Galle"
    },
    newspaper: {
      scans: "22,950",
      users: "17,400",
      time: "1m 38s",
      cta: "24.6%",
      label: "Weekly Scan Activity — Sunday Broadsheet Full-Page Ad",
      bars: [32, 28, 35, 40, 52, 76, 100],
      devices: "📱 Android Chrome: 64% • iOS Safari: 36%",
      regions: "📍 Top: Colombo, Negombo, Kandy, Matara"
    },
    tea: {
      scans: "31,680",
      users: "24,120",
      time: "2m 05s",
      cta: "21.9%",
      label: "Weekly Scan Activity — Export & Retail Ceylon Tea Boxes",
      bars: [65, 70, 68, 78, 85, 94, 88],
      devices: "📱 iOS Safari: 54% • Android Chrome: 46%",
      regions: "📍 Top: Colombo, London, Dubai, Galle"
    }
  };

  const dashTabs = document.querySelectorAll(".dash-tab");
  const kpiScans = document.getElementById("kpiScans");
  const kpiUsers = document.getElementById("kpiUsers");
  const kpiTime = document.getElementById("kpiTime");
  const kpiCta = document.getElementById("kpiCta");
  const dashLabel = document.getElementById("dashCampaignLabel");
  const dashBars = document.querySelectorAll("#dashBars .bar-fill");
  const dashDeviceSplit = document.getElementById("dashDeviceSplit");
  const dashTopRegion = document.getElementById("dashTopRegion");

  dashTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      dashTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const data = CAMPAIGNS[tab.dataset.campaign || "tuition"];
      if (!data) return;

      if (kpiScans) kpiScans.textContent = data.scans;
      if (kpiUsers) kpiUsers.textContent = data.users;
      if (kpiTime) kpiTime.textContent = data.time;
      if (kpiCta) kpiCta.textContent = data.cta;
      if (dashLabel) dashLabel.textContent = data.label;
      if (dashDeviceSplit) dashDeviceSplit.textContent = data.devices;
      if (dashTopRegion) dashTopRegion.textContent = data.regions;

      dashBars.forEach((bar, i) => {
        bar.style.height = `${data.bars[i] || 50}%`;
      });
    });
  });

  /* ------------------------------------------------------------------------
     8. INTERACTIVE AR PROJECT BRIEF BUILDER (WHATSAPP + EMAIL)
     ------------------------------------------------------------------------ */
  document.querySelectorAll(".chip-selector").forEach((group) => {
    const chips = group.querySelectorAll(".choice-chip");
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("selected"));
        chip.classList.add("selected");
      });
    });
  });

  function composeProjectBrief() {
    const material =
      document.querySelector('.chip-selector[data-group="material"] .choice-chip.selected')
        ?.dataset.value || "Print-to-AR Project";
    const layer =
      document.querySelector('.chip-selector[data-group="layer"] .choice-chip.selected')
        ?.dataset.value || "Custom 3D & WebAR";
    const name = document.getElementById("clientName")?.value.trim() || "Prospective Client";
    const phone = document.getElementById("clientPhone")?.value.trim() || "Not provided";
    const notes = document.getElementById("clientNotes")?.value.trim() || "Interested in seeing a live WonderLab AR demo.";

    return [
      "Hi WonderLab AR Team,",
      "",
      "I would like to discuss a custom WebAR project:",
      `• Print Material: ${material}`,
      `• AR Layer: ${layer}`,
      `• Name / Brand: ${name}`,
      `• Contact: ${phone}`,
      `• Details: ${notes}`
    ].join("\n");
  }

  const whatsappBtn = document.getElementById("sendWhatsappBtn");
  const emailBtn = document.getElementById("sendEmailBtn");
  const briefFeedback = document.getElementById("briefFeedback");

  whatsappBtn?.addEventListener("click", () => {
    const message = composeProjectBrief();
    const url = `https://wa.me/94769801157?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    if (briefFeedback) {
      briefFeedback.textContent = "✓ Opening WhatsApp with your custom WonderLab AR project brief…";
      briefFeedback.style.color = "var(--emerald)";
    }
  });

  emailBtn?.addEventListener("click", () => {
    const message = composeProjectBrief();
    const subject = "WonderLab AR — Custom WebAR Project Enquiry";
    const mailto = `mailto:wonderlabstudio.lk@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
    if (briefFeedback) {
      briefFeedback.textContent = "✓ Opening your email client with your WonderLab AR brief…";
      briefFeedback.style.color = "var(--cyan)";
    }
  });

  /* ------------------------------------------------------------------------
     9. DYNAMIC COPYRIGHT YEAR
     ------------------------------------------------------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
});
