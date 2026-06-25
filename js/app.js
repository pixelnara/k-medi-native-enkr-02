// ============================================================
//  Grand InterContinental Seoul Parnas — interactions
// ============================================================
(function () {
  "use strict";

  /* ---------- applyLang — 언어 코드/국기 동기화 헬퍼 ---------- */
  function applyLang(code, flagImg) {
    document.querySelectorAll(".lang-code, .header-lang-code").forEach((el) => (el.textContent = code));
    if (flagImg) {
      document.querySelectorAll(".lang-flag img").forEach((img) => {
        img.src = flagImg.src;
        img.alt = flagImg.alt;
      });
    }
  }

  /* ---------- Header: transparent -> solid on scroll ---------- */
  const header = document.querySelector(".header");
  const onScroll = () => {
    if (window.scrollY > 60) header.classList.add("is-solid");
    else header.classList.remove("is-solid");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Header: hide main bar on scroll-down (non-index pages) ---------- */
  const isIndex = /(?:^|\/)(index\.html)?$/.test(window.location.pathname);
  if (header && !isIndex) {
    let prevY = window.scrollY;
    window.addEventListener(
      "scroll",
      function () {
        const y = window.scrollY;
        if (y > 80) {
          header.classList.toggle("is-compact", y > prevY);
        } else {
          header.classList.remove("is-compact");
        }
        prevY = y;
      },
      { passive: true },
    );
  }

  /* ---------- GNB full-screen overlay ---------- */
  const overlay = document.querySelector(".gnb-overlay");
  const openBtns = document.querySelectorAll(".menu-btn, .mbar-menu-trigger");
  const closeBtn = document.querySelector(".gnb-overlay__close");

  if (overlay) {
    var gnbOpener = null;
    openBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        gnbOpener = btn;
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        if (closeBtn) closeBtn.focus();
      });
    });
    function closeOverlay() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      document.querySelectorAll(".gnb-col.is-open").forEach((c) => c.classList.remove("is-open"));
      document.querySelectorAll(".gnb-has-sub.is-open").forEach((s) => s.classList.remove("is-open"));
      document.querySelectorAll(".gnb-has-sub2.is-open").forEach((s) => s.classList.remove("is-open"));
      if (gnbOpener) {
        gnbOpener.focus();
        gnbOpener = null;
      }
    }
    if (closeBtn) closeBtn.addEventListener("click", closeOverlay);

    // Focus trap: keep Tab/Shift+Tab inside overlay while open
    overlay.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeOverlay();
        return;
      }
      if (e.key !== "Tab") return;
      var focusable = Array.from(
        overlay.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => !el.closest('[aria-hidden="true"]'));
      if (!focusable.length) return;
      var first = focusable[0],
        last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    // 로고 클릭 → 오버레이 닫기만 하고 페이지 이동 없음
    const overlayBrand = overlay.querySelector(".gnb-overlay__brand");
    if (overlayBrand) {
      overlayBrand.addEventListener("click", (e) => {
        e.preventDefault();
        closeOverlay();
      });
    }
  }

  /* ★ 모바일 GNB 언어 탭 핸들러: 정적 HTML(.gnb-mobile-top)의 탭에 연결 ---------- */
  (function wireGnbMobileLangTabs() {
    const tabs = document.querySelectorAll(".gnb-overlay .gnb-mobile-top .gnb-lang-tab");
    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        tabs.forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        applyLang(btn.dataset.lang);
      });
    });
  })();

  /* ---------- GNB accordion (mobile) ---------- */
  document.querySelectorAll(".gnb-col > h4").forEach((h4) => {
    h4.addEventListener("click", () => {
      const col = h4.parentElement;
      const isOpen = col.classList.contains("is-open");
      document.querySelectorAll(".gnb-col.is-open").forEach((c) => {
        c.classList.remove("is-open");
        c.querySelectorAll(".gnb-has-sub.is-open").forEach((s) => s.classList.remove("is-open"));
      });
      if (!isOpen) col.classList.add("is-open");
    });
  });

  /* ---------- GNB sub-list toggle (시술 하위 메뉴) ---------- */
  document.querySelectorAll(".gnb-sub-toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const li = btn.closest(".gnb-has-sub");
      li.classList.toggle("is-open");
    });
  });

  /* ---------- GNB sub2 토글 (시술 하위 목록) ---------- */
  document.querySelectorAll(".gnb-sub2-toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.closest(".gnb-has-sub2").classList.toggle("is-open");
    });
  });

  /* ---------- 시술 팝업 시트 (모바일) ---------- */
  const procSheet = document.getElementById("procSheet");
  const procClose = procSheet && procSheet.querySelector(".proc-sheet__close");
  const isMobile = () => window.matchMedia("(max-width: 860px)").matches;
  document.querySelectorAll(".gnb-proc-trigger").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      if (isMobile() && procSheet) {
        e.preventDefault();
        e.stopPropagation();
        procSheet.classList.add("is-open");
        procSheet.setAttribute("aria-hidden", "false");
      }
    });
  });
  if (procClose) {
    procClose.addEventListener("click", () => {
      procSheet.classList.remove("is-open");
      procSheet.setAttribute("aria-hidden", "true");
    });
  }

  /* ---------- Hero slider ---------- */
  const slides = [...document.querySelectorAll(".hero__slide")].filter((s) => getComputedStyle(s).display !== "none");
  const counterCur = document.querySelector(".hero__counter-cur");
  const counterTot = document.querySelector(".hero__counter-tot");
  const heroSection = document.querySelector(".hero");
  const heroTitle = document.querySelector(".hero__title");
  const heroDesc = document.querySelector(".hero__desc");
  const defaultTitle = heroTitle ? heroTitle.innerHTML : "";
  const defaultDesc = heroDesc ? heroDesc.innerHTML : "";
  let cur = 0;
  let timer = null;
  function go(i) {
    cur = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("is-active", k === cur));
    if (counterCur) counterCur.textContent = String(cur + 1).padStart(2, "0");
    const slide = slides[cur];
    if (heroTitle) heroTitle.innerHTML = slide.dataset.title || defaultTitle;
    if (heroDesc) heroDesc.innerHTML = slide.dataset.desc || defaultDesc;
  }
  function play() {
    stop();
    timer = setInterval(() => go(cur + 1), 6000);
  }
  function stop() {
    if (timer) clearInterval(timer);
  }
  if (slides.length) {
    if (counterTot) counterTot.textContent = String(slides.length).padStart(2, "0");
    go(0);
    play();
  }

  /* touch swipe on hero */
  const heroEl = document.querySelector(".hero");
  if (heroEl) {
    let tx = 0;
    heroEl.addEventListener(
      "touchstart",
      (e) => {
        tx = e.touches[0].clientX;
      },
      { passive: true },
    );
    heroEl.addEventListener(
      "touchend",
      (e) => {
        const dx = e.changedTouches[0].clientX - tx;
        if (Math.abs(dx) < 40) return;
        go(dx < 0 ? cur + 1 : cur - 1);
        play();
      },
      { passive: true },
    );
  }

  /* hero nav buttons */
  const heroNavPrev = document.querySelector(".hero__nav--prev");
  const heroNavNext = document.querySelector(".hero__nav--next");
  if (heroNavPrev)
    heroNavPrev.addEventListener("click", () => {
      stop();
      go(cur - 1);
      play();
    });
  if (heroNavNext)
    heroNavNext.addEventListener("click", () => {
      stop();
      go(cur + 1);
      play();
    });

  /* ---------- News filter ---------- */
  const filters = [...document.querySelectorAll(".filter")];
  const cards = [...document.querySelectorAll(".news-card")];
  filters.forEach((f) => {
    f.addEventListener("click", () => {
      const cat = f.dataset.cat;
      filters.forEach((x) => x.classList.toggle("is-active", x === f));
      cards.forEach((c) => {
        const show = cat === "all" || c.dataset.cat === cat;
        c.style.display = show ? "" : "none";
      });
    });
  });

  /* ---------- Services accordion ---------- */
  const accItems = [...document.querySelectorAll(".acc-item")];
  function setAcc(item, open) {
    const body = item.querySelector(".acc-body");
    const head = item.querySelector(".acc-head");
    item.classList.toggle("is-open", open);
    body.style.maxHeight = open ? body.scrollHeight + "px" : "0px";
    if (head) head.setAttribute("aria-expanded", String(open));
  }
  accItems.forEach((item) => {
    const head = item.querySelector(".acc-head");
    head.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");
      accItems.forEach((other) => setAcc(other, false));
      if (willOpen) setAcc(item, true);
    });
  });
  // initialise open item
  accItems.forEach((item) => setAcc(item, item.classList.contains("is-open")));
  window.addEventListener("resize", () => {
    accItems.forEach((item) => {
      if (item.classList.contains("is-open")) setAcc(item, true);
    });
  });

  /* ---------- Feature slider (bounded, no loop) ---------- */
  const fvp = document.querySelector(".feature__viewport");
  if (fvp) {
    const ftrack = fvp.querySelector(".feature__track");
    const fSlides = [...fvp.querySelectorAll(".feature__slide")];
    const fDots = [...document.querySelectorAll(".feature__dots button")];
    const slideCount = fSlides.length;
    let fIndex = 0;

    function metrics() {
      const w = fSlides[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(ftrack).columnGap) || 0;
      return { w, step: w + gap };
    }
    function baseFor(i) {
      const { w, step } = metrics();
      return fvp.clientWidth / 2 - (i * step + w / 2);
    }
    function setTranslate(x, anim) {
      ftrack.classList.toggle("no-anim", !anim);
      ftrack.style.transform = "translateX(" + x + "px)";
    }
    function goFeature(i, anim) {
      fIndex = Math.max(0, Math.min(slideCount - 1, i));
      setTranslate(baseFor(fIndex), anim !== false);
      fDots.forEach((d, k) => d.classList.toggle("is-active", k === fIndex));
    }
    fDots.forEach((d, k) => d.addEventListener("click", () => goFeature(k)));

    // pointer drag
    let down = false,
      decided = false,
      horiz = false;
    let startX = 0,
      startY = 0,
      lastX = 0,
      base = 0,
      moved = false;
    fvp.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      down = true;
      decided = false;
      horiz = false;
      moved = false;
      startX = lastX = e.clientX;
      startY = e.clientY;
      base = baseFor(fIndex);
    });
    fvp.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX,
        dy = e.clientY - startY;
      if (!decided) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        decided = true;
        horiz = Math.abs(dx) > Math.abs(dy);
        if (horiz) {
          fvp.classList.add("is-dragging");
          fvp.setPointerCapture(e.pointerId);
        }
      }
      if (!horiz) return;
      moved = true;
      lastX = e.clientX;
      e.preventDefault();
      // clamp drag so it can't pull past first or last slide
      const { step } = metrics();
      const maxPull = step * 0.1;
      const clamped = fIndex === 0 ? Math.min(dx, maxPull) : fIndex === slideCount - 1 ? Math.max(dx, -maxPull) : dx;
      setTranslate(base + clamped, false);
    });
    function endDrag(e) {
      if (!down) return;
      down = false;
      if (horiz) {
        fvp.classList.remove("is-dragging");
        try {
          fvp.releasePointerCapture(e.pointerId);
        } catch (_) {}
        const dx = lastX - startX;
        const { step } = metrics();
        let shift = 0;
        if (Math.abs(dx) > step * 0.08) shift = dx < 0 ? 1 : -1;
        goFeature(fIndex + shift);
      }
    }
    fvp.addEventListener("pointerup", endDrag);
    fvp.addEventListener("pointercancel", endDrag);
    fvp.addEventListener(
      "click",
      (e) => {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      true,
    );
    fvp.addEventListener("dragstart", (e) => e.preventDefault());

    window.addEventListener("resize", () => goFeature(fIndex, false));
    window.requestAnimationFrame(() => goFeature(1, false));
  }

  /* ---------- Mobile bar: language sheet ---------- */
  const mbarLangs = document.querySelectorAll(".mbar-lang");
  const langSheet = document.getElementById("langSheet");
  if (mbarLangs.length && langSheet) {
    const backdrop = langSheet.querySelector(".lang-sheet__backdrop");
    const closeLang = () => {
      langSheet.classList.remove("is-open");
      langSheet.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    mbarLangs.forEach((btn) =>
      btn.addEventListener("click", () => {
        langSheet.classList.add("is-open");
        langSheet.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }),
    );
    backdrop.addEventListener("click", closeLang);
    langSheet.querySelectorAll(".lang-sheet__opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        langSheet.querySelectorAll(".lang-sheet__opt").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        applyLang(btn.dataset.lang || "", btn.querySelector("img"));
        closeLang();
      });
    });
  }

  /* ---------- Desktop lang-select dropdown ---------- */
  document.querySelectorAll(".lang-select").forEach((sel) => {
    const btn = sel.querySelector(".lang-select__btn");
    const dropdown = sel.querySelector(".lang-dropdown");
    if (!btn || !dropdown) return;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = sel.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
    document.addEventListener("click", () => {
      sel.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
  document.querySelectorAll(".lang-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".lang-option").forEach((o) => o.classList.remove("is-active"));
      opt.classList.add("is-active");
      applyLang(opt.textContent.trim(), opt.querySelector("img"));
      const parentSel = opt.closest(".lang-select");
      if (parentSel) {
        parentSel.classList.remove("is-open");
        const parentBtn = parentSel.querySelector(".lang-select__btn");
        if (parentBtn) parentBtn.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ---------- Login modal: 모든 트리거 통합 (util-bar, mobile, GNB) ---------- */
  (function initLoginModal() {
    var modal    = document.getElementById("loginModal");
    var closeEl  = document.getElementById("loginClose");
    var backdrop = document.getElementById("loginBackdrop");
    if (!modal) return;

    function openLoginModal() {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function closeLoginModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    // 트리거: util-bar 사람 아이콘(loginTrigger), 모바일 헤더 버튼, GNB 로그인 링크
    var triggerIds = ["loginTrigger"];
    triggerIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener("click", function (e) { e.preventDefault(); openLoginModal(); });
    });
    document.querySelectorAll(".header-mypage-btn, .gnb-login-btn").forEach(function (el) {
      el.addEventListener("click", function (e) { e.preventDefault(); openLoginModal(); });
    });

    if (closeEl)  closeEl.addEventListener("click", closeLoginModal);
    if (backdrop) backdrop.addEventListener("click", closeLoginModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeLoginModal();
    });

  })();

  /* ---------- Mobile bottom bar: active state ---------- */
  const mbarBtns = document.querySelectorAll(".mobile-bar .mbar-btn");
  mbarBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      mbarBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });

  /* ---------- Mobile bottom bar: hide while scrolling, show on stop ---------- */
  (function () {
    const bars = document.querySelectorAll(".mobile-bar");
    if (!bars.length) return;
    let scrollTimer = null;
    window.addEventListener(
      "scroll",
      () => {
        bars.forEach((b) => b.classList.add("is-hidden"));
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          bars.forEach((b) => b.classList.remove("is-hidden"));
        }, 300);
      },
      { passive: true },
    );
  })();

  /* ---------- Footer top button ---------- */
  const footerTopBtn = document.querySelector(".footer__top-btn");
  if (footerTopBtn) {
    footerTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------- Top button ---------- */
  const topBtn = document.querySelector(".top-btn");
  if (topBtn) {
    window.addEventListener(
      "scroll",
      () => {
        topBtn.classList.toggle("is-visible", window.scrollY > 400);
      },
      { passive: true },
    );
    topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.05 },
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

  /* ---------- Mobile CTA: hide when footer is visible ---------- */
  const heroCta = document.querySelector(".hero__cta");
  const footer = document.querySelector(".footer");
  if (heroCta && footer) {
    const footerIO = new IntersectionObserver(([e]) => heroCta.classList.toggle("is-hidden", e.isIntersecting), { threshold: 0 });
    footerIO.observe(footer);
  }
})();
