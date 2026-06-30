/* skin-sol.js — skin-sol 페이지 인터랙션 */

(function () {
  "use strict";

  /* ── Login Modal ── */
  const trigger = document.getElementById("loginTrigger");
  const modal = document.getElementById("loginModal");
  const closeBtn = document.getElementById("loginClose");
  const backdrop = document.getElementById("loginBackdrop");
  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  if (trigger)
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
  const gnbLogin = document.querySelector(".gnb-login-btn");
  if (gnbLogin)
    gnbLogin.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });

  /* ── Password toggle ── */
  const pwdInput = document.getElementById("loginPassword");
  const pwdToggle = document.getElementById("loginPwdToggle");
  const eyeIcon = document.getElementById("eyeIcon");
  if (pwdToggle)
    pwdToggle.addEventListener("click", function () {
      const hidden = pwdInput.type === "password";
      pwdInput.type = hidden ? "text" : "password";
      eyeIcon.innerHTML = hidden
        ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'
        : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
    });

  /* ── Footer TOP button ── */
  const topBtn = document.querySelector(".footer__top-btn");
  if (topBtn)
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

  /* ── Reveal on scroll ── */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ================================================================
     SKIN TYPE QUIZ LOGIC — SLIDER
     ================================================================ */

  const selections = {
    moisture: null,
    pigment: null,
    elastic: null,
    sensitive: null,
  };
  const STEP_IDS = {
    moisture: "step-moisture",
    pigment: "step-pigment",
    elastic: "step-elastic",
    sensitive: "step-sensitive",
  };
  const SLIDE_ORDER = ["moisture", "pigment", "elastic", "sensitive"];

  /* ── Quiz slider ── */
  var quizTrack = document.getElementById("pssQuizTrack");
  var currentQuizSlide = 0;

  function goQuizSlide(idx) {
    var slides = document.querySelectorAll(".pss-quiz-slide");
    if (idx < 0 || idx >= slides.length) return;
    currentQuizSlide = idx;
    quizTrack.style.transform = "translateX(-" + idx * 100 + "%)";

    /* Update step is-active */
    document.querySelectorAll(".pss-step").forEach(function (s, i) {
      s.classList.toggle("is-active", i === idx);
    });
  }

  /* Step circles clickable */
  document.querySelectorAll(".pss-step").forEach(function (stepEl, i) {
    stepEl.style.cursor = "pointer";
    stepEl.addEventListener("click", function () {
      goQuizSlide(i);
    });
  });

  /* Init: activate first step */
  goQuizSlide(0);

  /* ── Listen for radio changes ── */
  document.querySelectorAll(".pss-option__input").forEach(function (input) {
    input.addEventListener("change", function () {
      var cat = this.closest(".pss-category").dataset.cat;
      selections[cat] = this.value;

      /* Mark category answered */
      this.closest(".pss-category").classList.add("is-answered");

      /* Step: done */
      var stepEl = document.getElementById(STEP_IDS[cat]);
      if (stepEl) stepEl.classList.add("is-done");

      /* Enable analyze button when all 4 selected */
      var allDone = Object.values(selections).every(function (v) {
        return v !== null;
      });
      var btn = document.getElementById("analyzeBtn");
      var hint = document.getElementById("analyzeHint");
      if (allDone) {
        btn.disabled = false;
        btn.removeAttribute("aria-disabled");
        btn.classList.add("is-ready");
        if (hint) hint.style.opacity = "0";
      }

      /* Auto-advance to next slide */
      var nextIdx = currentQuizSlide + 1;
      if (nextIdx < 4) {
        setTimeout(function () {
          goQuizSlide(nextIdx);
        }, 550);
      }
    });
  });

  /* ── Skin type data ── */
  const MOISTURE_TEXT = { D: "건성", O: "지성" };
  const PIGMENT_TEXT = { P: "색소침착", N: "비색소" };
  const ELASTIC_TEXT = { W: "주름성", F: "탄력성" };
  const SENSITIVE_TEXT = { S: "민감성", R: "저항성" };

  function buildCode(m, p, e, s) {
    return m + s + p + e;
  }

  function buildKrText(m, p, e, s) {
    return [
      MOISTURE_TEXT[m],
      SENSITIVE_TEXT[s],
      PIGMENT_TEXT[p],
      ELASTIC_TEXT[e],
    ].join(" · ");
  }

  function buildComment(m, p, e, s) {
    let intro = "";
    if (m === "O") intro += "피지 분비가 많아 번들거림이 나타나기 쉽고, ";
    else intro += "피부 수분이 부족하여 당김과 각질이 생기기 쉽고, ";

    if (s === "S")
      intro +=
        "외부 자극에 민감하게 반응하며 붉어짐이 나타날 수 있는 피부 타입입니다.";
    else intro += "외부 자극에 대한 내성이 강한 건강한 피부 타입입니다.";

    let detail = "";
    if (p === "P")
      detail +=
        " 멜라닌 생성이 활발하여 기미·잡티 등 색소 침착이 발생하기 쉬우므로 브라이트닝 케어가 필요합니다.";
    else
      detail +=
        " 피부톤이 비교적 균일하고 색소 침착이 적어 밝고 화사한 피부 상태를 유지하기에 유리합니다.";

    if (e === "W")
      detail +=
        " 피부 탄력이 저하되어 주름이 생기기 쉬우므로 콜라겐 생성을 촉진하는 리프팅 케어를 추천합니다.";
    else
      detail +=
        " 피부 탄력이 좋고 주름이 적은 건강한 상태로, 예방적 항노화 케어로 건강한 피부를 유지하세요.";

    return intro + detail;
  }

  function buildFocusTags(m, p, e, s) {
    const tags = [];
    if (m === "O") tags.push("유분 조절");
    else tags.push("집중 보습");
    if (s === "S") tags.push("진정 케어");
    if (p === "P") tags.push("색소침착");
    if (e === "W") tags.push("탄력·주름");
    if (m === "D") tags.push("수분 공급");
    if (s === "R") tags.push("기본 유지");
    if (p === "N") tags.push("안티옥시던트");
    if (e === "F") tags.push("예방 관리");
    return tags.slice(0, 4);
  }

  const INGREDIENTS_MAP = {
    O: [
      {
        code: "BMTS-AUT-SOD1",
        ppm: "0.5ppm",
        area: "진체",
        name: "항산화 효소",
        desc: "활성산소 제거, 피부 노화 방지, 모공 정화",
      },
      {
        code: "BMTS-AUT-NIA",
        ppm: "2%",
        area: "표피",
        name: "나이아신아마이드",
        desc: "피지 분비 억제, 모공 수축, 피부결 개선",
      },
      {
        code: "BMTS-AUT-ZNO",
        ppm: "1%",
        area: "표피",
        name: "산화 아연",
        desc: "항균·피지 조절, 모공 정제, 트러블 예방",
      },
    ],
    D: [
      {
        code: "BMTS-AUT-HA",
        ppm: "1.5%",
        area: "진체",
        name: "히알루론산",
        desc: "강력한 수분 결합력, 피부 탄력 개선, 건조함 해소",
      },
      {
        code: "BMTS-AUT-CER",
        ppm: "2%",
        area: "표피",
        name: "세라마이드",
        desc: "피부 장벽 강화, 수분 손실 방지, 각질 완화",
      },
      {
        code: "BMTS-AUT-PAN",
        ppm: "5%",
        area: "표피",
        name: "판테놀",
        desc: "피부 재생 촉진, 자극 완화, 보습 유지",
      },
    ],
    S: [
      {
        code: "BMTS-AUT-CEN",
        ppm: "1%",
        area: "진체",
        name: "센텔라아시아티카",
        desc: "진정 효과, 상처 치유, 콜라겐 합성 촉진",
      },
      {
        code: "BMTS-AUT-ALL",
        ppm: "0.5%",
        area: "표피",
        name: "알란토인",
        desc: "세포 재생 촉진, 자극 완화, 피부 진정",
      },
      {
        code: "BMTS-AUT-BG",
        ppm: "0.3%",
        area: "표피",
        name: "베타글루칸",
        desc: "면역력 강화, 장벽 개선, 항염 효과",
      },
    ],
    R: [
      {
        code: "BMTS-AUT-RET",
        ppm: "0.1%",
        area: "진체",
        name: "레티놀",
        desc: "세포 재생 촉진, 주름 개선, 피부결 정돈",
      },
      {
        code: "BMTS-AUT-AHA",
        ppm: "5%",
        area: "표피",
        name: "알파하이드록시산",
        desc: "각질 제거, 피부결 개선, 밝기 증진",
      },
      {
        code: "BMTS-AUT-VCE",
        ppm: "3%",
        area: "표피",
        name: "비타민C 에스터",
        desc: "항산화, 브라이트닝, 콜라겐 합성 지원",
      },
    ],
    P: [
      {
        code: "BMTS-AUT-ARB",
        ppm: "2%",
        area: "표피",
        name: "알부틴",
        desc: "멜라닌 생성 억제, 기미·잡티 개선, 피부톤 균일화",
      },
      {
        code: "BMTS-AUT-NIA",
        ppm: "2%",
        area: "표피",
        name: "나이아신아마이드",
        desc: "색소 전달 차단, 브라이트닝, 피부결 개선",
      },
      {
        code: "BMTS-AUT-VC",
        ppm: "5%",
        area: "진체",
        name: "비타민C",
        desc: "항산화·미백, 광채 부여, 콜라겐 생성 촉진",
      },
    ],
    N: [
      {
        code: "BMTS-AUT-SOD1",
        ppm: "0.5ppm",
        area: "진체",
        name: "항산화 효소",
        desc: "활성산소 제거, 피부 노화 방지, 세포 보호",
      },
      {
        code: "BMTS-AUT-RES",
        ppm: "0.5%",
        area: "진체",
        name: "레스베라트롤",
        desc: "항산화, 세포 보호, 노화 방지",
      },
      {
        code: "BMTS-AUT-COQ",
        ppm: "0.1%",
        area: "진체",
        name: "코엔자임Q10",
        desc: "에너지 생성, 항산화, 세포 활성화",
      },
    ],
    W: [
      {
        code: "BMTS-AUT-PEP",
        ppm: "5ppm",
        area: "진체",
        name: "신호 펩타이드",
        desc: "콜라겐·엘라스틴 합성 촉진, 주름 개선, 탄력 증진",
      },
      {
        code: "BMTS-AUT-EGF",
        ppm: "1ppm",
        area: "표피",
        name: "상피세포 성장인자",
        desc: "표피 재생 촉진, 피부결 개선, 세포 회복력 강화",
      },
      {
        code: "BMTS-AUT-IGF1",
        ppm: "0.15ppm",
        area: "진체",
        name: "인슐린유사 성장인자",
        desc: "세포 성장 및 재생력 증진, 노화 억제",
      },
    ],
    F: [
      {
        code: "BMTS-AUT-COL",
        ppm: "3%",
        area: "진체",
        name: "가수분해 콜라겐",
        desc: "피부 보습 강화, 탄력 보조, 노화 예방",
      },
      {
        code: "BMTS-AUT-SOD1",
        ppm: "0.5ppm",
        area: "진체",
        name: "항산화 효소",
        desc: "활성산소 제거, 피부 노화 방지, 세포 보호",
      },
      {
        code: "BMTS-AUT-VCE",
        ppm: "3%",
        area: "표피",
        name: "비타민C 에스터",
        desc: "예방적 항산화, 콜라겐 보조, 광채 유지",
      },
    ],
  };

  const PRODUCTS_MAP = {
    O: [
      {
        name: "보닉스 휴그로 밸런싱 세럼",
        price: "198,000원",
        tags: ["피지조절", "모공케어"],
        img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=70",
      },
      {
        name: "보닉스 레쥬티 리보 세럼",
        price: "220,000원",
        tags: ["깊은주름", "탄력"],
        img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=70",
      },
      {
        name: "보닉스 퓨어C 브라이트닝",
        price: "176,000원",
        tags: ["브라이트닝"],
        img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=70",
      },
    ],
    D: [
      {
        name: "보닉스 휴그로 딥모이스트 크림",
        price: "220,000원",
        tags: ["집중보습", "수분공급"],
        img: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&w=600&q=70",
      },
      {
        name: "보닉스 세라마이드 배리어 세럼",
        price: "198,000원",
        tags: ["장벽강화"],
        img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=70",
      },
      {
        name: "보닉스 펩타이드 미스트",
        price: "176,000원",
        tags: ["수분", "진정"],
        img: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=70",
      },
    ],
    S: [
      {
        name: "보닉스 센텔라 진정 앰플",
        price: "198,000원",
        tags: ["진정", "민감"],
        img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=70",
      },
      {
        name: "보닉스 배리어 리페어 크림",
        price: "220,000원",
        tags: ["장벽강화", "진정"],
        img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=70",
      },
      {
        name: "보닉스 큐어 C",
        price: "220,000원",
        tags: ["각질케어", "흡착세럼"],
        img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=70",
      },
    ],
    R: [
      {
        name: "보닉스 레티놀 리뉴 세럼",
        price: "242,000원",
        tags: ["항노화", "재생"],
        img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=70",
      },
      {
        name: "보닉스 레쥬티 리보 세럼",
        price: "220,000원",
        tags: ["깊은주름"],
        img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=70",
      },
      {
        name: "보닉스 에이지리스 크림",
        price: "198,000원",
        tags: ["탄력", "안티에이징"],
        img: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&w=600&q=70",
      },
    ],
  };

  function getIngredients(m, p, e, s) {
    const mainKey = p === "P" ? "P" : e === "W" ? "W" : m;
    const list = INGREDIENTS_MAP[mainKey] || INGREDIENTS_MAP[m];
    return list;
  }

  function getProducts(m, s) {
    const key = s === "S" ? "S" : m === "O" ? "O" : "D";
    return PRODUCTS_MAP[key] || PRODUCTS_MAP["D"];
  }

  function renderIngredients(items) {
    return items
      .map(function (item) {
        return (
          '<div class="pss-ingredient-card">' +
          '<div class="pss-ingredient-card__top">' +
          '<div class="pss-ingredient-card__icon">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.58 16.5h12.85"/></svg>' +
          "</div>" +
          '<span class="pss-ingredient-card__ppm">' +
          item.ppm +
          "</span>" +
          "</div>" +
          '<p class="pss-ingredient-card__code">' +
          item.code +
          "</p>" +
          '<p class="pss-ingredient-card__area">' +
          item.area +
          "</p>" +
          '<p class="pss-ingredient-card__name">' +
          item.name +
          "</p>" +
          '<p class="pss-ingredient-card__desc">' +
          item.desc +
          "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  function renderProducts(items) {
    return items
      .map(function (item) {
        const tagHtml = item.tags
          .map(function (t) {
            return '<span class="prod-img-tag">' + t + "</span>";
          })
          .join("");
        return (
          '<div class="prod-card">' +
          '<div class="prod-card__img-wrap">' +
          '<img class="prod-card__img" src="' +
          (item.img || "") +
          '" alt="' +
          item.name +
          '" loading="lazy" />' +
          '<div class="prod-card__img-tags">' +
          tagHtml +
          "</div>" +
          "</div>" +
          '<div class="prod-card__body">' +
          '<h3 class="prod-card__name">' +
          item.name +
          "</h3>" +
          '<div class="prod-card__meta"><span class="prod-card__price">' +
          item.price +
          "</span></div>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  function renderRecCards(items) {
    return items
      .map(function (item) {
        var sub = item.tags && item.tags.length ? item.tags[0] : "SKIN CARE";
        var safeName = (item.name || "").replace(/"/g, "&quot;");
        var safeImg = (item.img || "").replace(/"/g, "&quot;");
        var tagsVal = (item.tags || []).join(",");
        return (
          '<a href="#" class="pss-rec-card"' +
          ' data-prd-name="' +
          safeName +
          '"' +
          ' data-prd-price="' +
          (item.price || "") +
          '"' +
          ' data-prd-img="' +
          safeImg +
          '"' +
          ' data-prd-tags="' +
          tagsVal +
          '">' +
          '<div class="pss-rec-card__top">' +
          '<p class="pss-rec-card__label">KMEDITOUR<br>' +
          sub +
          "</p>" +
          '<hr class="pss-rec-card__sep">' +
          '<strong class="pss-rec-card__name">' +
          item.name +
          "</strong>" +
          "</div>" +
          '<div class="pss-rec-card__img">' +
          '<img src="' +
          (item.img || "") +
          '" alt="' +
          item.name +
          '" loading="lazy">' +
          "</div>" +
          "</a>"
        );
      })
      .join("");
  }

  function renderBadges(m, p, e, s) {
    const code = buildCode(m, p, e, s);
    const map = [
      { letter: m, label: MOISTURE_TEXT[m] },
      { letter: s, label: SENSITIVE_TEXT[s] },
      { letter: p, label: PIGMENT_TEXT[p] },
      { letter: e, label: ELASTIC_TEXT[e] },
    ];
    return map
      .map(function (b) {
        return (
          '<span class="pss-badge pss-badge--' +
          b.letter +
          '">' +
          b.letter +
          " " +
          b.label +
          "</span>"
        );
      })
      .join("");
  }

  /* ── Analyze button click ── */
  document.getElementById("analyzeBtn").addEventListener("click", function () {
    const m = selections.moisture;
    const p = selections.pigment;
    const e = selections.elastic;
    const s = selections.sensitive;

    /* Populate result */
    document.getElementById("resultCode").textContent = buildCode(m, p, e, s);
    document.getElementById("resultKr").textContent = buildKrText(m, p, e, s);
    document.getElementById("resultBadges").innerHTML = renderBadges(
      m,
      p,
      e,
      s,
    );
    document.getElementById("aiComment").textContent = buildComment(m, p, e, s);

    const tags = buildFocusTags(m, p, e, s);
    document.getElementById("aiTags").innerHTML = tags
      .map(function (t) {
        return '<span class="pss-focus-tag">' + t + "</span>";
      })
      .join("");

    document.getElementById("ingredientGrid").innerHTML = renderIngredients(
      getIngredients(m, p, e, s),
    );
    document.getElementById("recStrip").innerHTML = renderRecCards(
      getProducts(m, s),
    );

    /* Show result section */
    const result = document.getElementById("pssResult");
    result.classList.add("is-visible");
    result.setAttribute("aria-hidden", "false");

    setTimeout(function () {
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    /* 결과 상태 저장 (product.html 이동 후 뒤로가기 복원용) */
    if (window.pssState) pssState.save(selections);
  });

  /* ── Solution Tab Switching (스킨 솔루션 ↔ 헤어 솔루션) ── */
  var solTabs = document.querySelectorAll(".tab-pill__btn[data-tab]");
  var quizSection = document.querySelector(".pss-quiz");
  var resultSection = document.getElementById("pssResult");
  var hairSection = document.getElementById("pssHairSection");
  var stepsEl = document.querySelector(".pss-steps");
  var heroTitle = document.querySelector(".page-hero__title");
  var heroDesc = document.querySelector(".page-hero__sub");
  var breadcrumbCurrent = document.getElementById("pss-breadcrumb-current");

  solTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var tabType = this.dataset.tab;
      solTabs.forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      this.classList.add("is-active");
      this.setAttribute("aria-selected", "true");

      if (tabType === "hair") {
        quizSection.style.display = "none";
        resultSection.style.display = "none";
        stepsEl.style.display = "none";
        hairSection.classList.add("is-visible");
        hairSection.setAttribute("aria-hidden", "false");
        if (breadcrumbCurrent) breadcrumbCurrent.textContent = "헤어 솔루션";
        heroTitle.textContent = "나의 헤어 케어 솔루션";
        heroDesc.innerHTML =
          "두피 고민별 맞춤 성분과 추천 제품을 확인하세요.<br>전문 성분 데이터를 기반으로 최적의 헤어 케어를 제안합니다.";
      } else {
        quizSection.style.display = "";
        resultSection.style.display = "";
        stepsEl.style.display = "";
        hairSection.classList.remove("is-visible");
        hairSection.setAttribute("aria-hidden", "true");
        if (breadcrumbCurrent) breadcrumbCurrent.textContent = "스킨 솔루션";
        heroTitle.textContent = "나의 피부 솔루션 찾기";
        heroDesc.innerHTML =
          "4가지 항목에서 본인의 피부에 해당하는 특성을 선택하세요.<br>AI가 맞춤 피부 타입과 케어 솔루션을 분석해 드립니다.";
      }
    });
  });

  /* ── Hair Slider ── */
  var hairTrack = document.getElementById("pssHairTrack");
  var hairSlides = hairTrack
    ? hairTrack.querySelectorAll(".pss-hair-slide")
    : [];
  var hairTabBtns = document.querySelectorAll(".pss-hair-tab");
  var hairCount = document.getElementById("pssHairCount");
  var hairPrev = document.getElementById("pssHairPrev");
  var hairNext = document.getElementById("pssHairNext");
  var currentHairSlide = 0;

  function goHairSlide(idx) {
    if (idx < 0 || idx >= hairSlides.length) return;
    currentHairSlide = idx;
    if (hairTrack)
      hairTrack.style.transform = "translateX(-" + idx * 100 + "%)";
    hairTabBtns.forEach(function (t, i) {
      t.classList.toggle("is-active", i === idx);
      t.setAttribute("aria-selected", i === idx ? "true" : "false");
    });
    if (hairCount) hairCount.textContent = idx + 1 + " / " + hairSlides.length;
    if (hairPrev) hairPrev.disabled = idx === 0;
    if (hairNext) hairNext.disabled = idx === hairSlides.length - 1;
  }

  hairTabBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      goHairSlide(parseInt(this.dataset.htab));
    });
  });
  if (hairPrev)
    hairPrev.addEventListener("click", function () {
      goHairSlide(currentHairSlide - 1);
    });
  if (hairNext)
    hairNext.addEventListener("click", function () {
      goHairSlide(currentHairSlide + 1);
    });

  goHairSlide(0);

  /* ── Product card → product.html ── */
  document.addEventListener("click", function (e) {
    var card = e.target.closest(".prod-card");
    if (!card || !card.closest(".pss-products-grid")) return;

    var nameEl = card.querySelector(".prod-card__name");
    var priceEl = card.querySelector(".prod-card__price");
    var imgEl = card.querySelector(".prod-card__img");
    var tagEls = card.querySelectorAll(".prod-img-tag");

    var name = nameEl ? nameEl.textContent.trim() : "";
    var priceStr = priceEl ? priceEl.textContent.trim() : "";
    var img = imgEl ? imgEl.src : "";
    var tags = Array.from(tagEls).map(function (t) {
      return t.textContent.trim();
    });
    var price = parseInt(priceStr.replace(/[^0-9]/g, "")) || 0;

    sessionStorage.setItem(
      "cosm_product",
      JSON.stringify({
        name: name,
        price: price,
        imgs: img ? [img] : [],
        img: img,
        tags: tags,
        category: "스킨케어",
      }),
    );
    if (window.pssState) pssState.markNavToProduct();
    window.location.href = "product.html";
  });

  /* ── rec-card (분석 결과 추천 제품) → product.html ── */
  document.addEventListener("click", function (e) {
    var card = e.target.closest(".pss-rec-card");
    if (!card) return;
    e.preventDefault();
    var name = card.getAttribute("data-prd-name") || "";
    var priceStr = card.getAttribute("data-prd-price") || "";
    var img = card.getAttribute("data-prd-img") || "";
    var tagsStr = card.getAttribute("data-prd-tags") || "";
    var tags = tagsStr ? tagsStr.split(",").filter(Boolean) : [];
    var price = parseInt(priceStr.replace(/[^0-9]/g, "")) || 0;
    sessionStorage.setItem(
      "cosm_product",
      JSON.stringify({
        name: name,
        price: price,
        img: img,
        imgs: img ? [img] : [],
        tags: tags,
        category: "스킨케어",
      }),
    );
    if (window.pssState) pssState.markNavToProduct();
    window.location.href = "product.html";
  });

  /* ── Reset ── */
  document.getElementById("resetBtn").addEventListener("click", function () {
    /* Clear selections & saved state */
    Object.keys(selections).forEach(function (k) {
      selections[k] = null;
    });
    if (window.pssState) pssState.clear();

    /* Uncheck all radios */
    document.querySelectorAll(".pss-option__input").forEach(function (r) {
      r.checked = false;
    });

    /* Remove answered state */
    document.querySelectorAll(".pss-category").forEach(function (c) {
      c.classList.remove("is-answered");
    });

    /* Reset steps */
    document.querySelectorAll(".pss-step").forEach(function (s) {
      s.classList.remove("is-done", "is-active");
    });

    /* Reset quiz slider to slide 0 */
    goQuizSlide(0);

    /* Disable button */
    const btn = document.getElementById("analyzeBtn");
    btn.disabled = true;
    btn.setAttribute("aria-disabled", "true");
    btn.classList.remove("is-ready");
    const hint = document.getElementById("analyzeHint");
    if (hint) hint.style.opacity = "1";

    /* Hide result */
    const result = document.getElementById("pssResult");
    result.classList.remove("is-visible");
    result.setAttribute("aria-hidden", "true");

    /* Scroll to quiz */
    document
      .querySelector(".pss-quiz")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ── 저장된 퀴즈 결과 복원 (product.html 뒤로가기 시에만) ── */
  (function restoreSavedResult() {
    if (!window.pssState) return;
    if (!pssState.isFromProduct()) {
      pssState.clear();
      return;
    }
    var saved = pssState.get();
    if (!saved) return;

    var rm = saved.moisture,
      rp = saved.pigment,
      re = saved.elastic,
      rs = saved.sensitive;

    /* selections 복원 */
    selections.moisture = rm;
    selections.pigment = rp;
    selections.elastic = re;
    selections.sensitive = rs;

    /* 라디오·is-answered·is-done 복원 */
    document.querySelectorAll(".pss-option__input").forEach(function (input) {
      var cat = input.closest(".pss-category").dataset.cat;
      if (input.value === saved[cat]) {
        input.checked = true;
        input.closest(".pss-category").classList.add("is-answered");
        var stepEl = document.getElementById(STEP_IDS[cat]);
        if (stepEl) stepEl.classList.add("is-done");
      }
    });

    /* 분석 버튼 활성화 */
    var btn = document.getElementById("analyzeBtn");
    if (btn) {
      btn.disabled = false;
      btn.removeAttribute("aria-disabled");
      btn.classList.add("is-ready");
    }

    /* 결과 렌더링 */
    document.getElementById("resultCode").textContent = buildCode(
      rm,
      rp,
      re,
      rs,
    );
    document.getElementById("resultKr").textContent = buildKrText(
      rm,
      rp,
      re,
      rs,
    );
    document.getElementById("resultBadges").innerHTML = renderBadges(
      rm,
      rp,
      re,
      rs,
    );
    document.getElementById("aiComment").textContent = buildComment(
      rm,
      rp,
      re,
      rs,
    );

    var focusTags = buildFocusTags(rm, rp, re, rs);
    document.getElementById("aiTags").innerHTML = focusTags
      .map(function (t) {
        return '<span class="pss-focus-tag">' + t + "</span>";
      })
      .join("");

    document.getElementById("ingredientGrid").innerHTML = renderIngredients(
      getIngredients(rm, rp, re, rs),
    );
    document.getElementById("recStrip").innerHTML = renderRecCards(
      getProducts(rm, rs),
    );

    /* 결과 섹션 표시 */
    var resultEl = document.getElementById("pssResult");
    resultEl.classList.add("is-visible");
    resultEl.setAttribute("aria-hidden", "false");
  })();
})();

(function () {
  const trigger = document.getElementById("loginTrigger");
  const modal = document.getElementById("loginModal");
  const close = document.getElementById("loginClose");
  const backdrop = document.getElementById("loginBackdrop");
  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var first = modal.querySelector(
      "input:not([type=hidden]),button:not([disabled])",
    );
    if (first)
      setTimeout(function () {
        first.focus();
      }, 50);
  }
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (trigger) trigger.focus();
  }
  if (trigger)
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  const gnbLoginBtn = document.querySelector(".gnb-login-btn");
  if (gnbLoginBtn)
    gnbLoginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  close.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
  const pwdInput = document.getElementById("loginPassword");
  const pwdToggle = document.getElementById("loginPwdToggle");
  const eyeIcon = document.getElementById("eyeIcon");
  const eyeOffSvg =
    '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  const eyeOnSvg =
    '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  if (pwdToggle)
    pwdToggle.addEventListener("click", function () {
      const isHidden = pwdInput.type === "password";
      pwdInput.type = isHidden ? "text" : "password";
      eyeIcon.innerHTML = isHidden ? eyeOffSvg : eyeOnSvg;
    });
})();
