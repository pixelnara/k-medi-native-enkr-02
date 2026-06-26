/**
 * lang-nav.js
 * 언어 선택 시 대응하는 언어 버전 페이지로 이동합니다.
 *
 * 파일 명명 규칙:
 *   EN (기본) : pagename.html
 *   KR        : pagename-ko.html
 *
 * 예) index.html (EN) ↔ index-ko.html (KR)
 *     about.html (EN) ↔ about-ko.html  (KR)
 */
(function () {
  const LANG_MAP = {
    KR: "ko",
    EN: "en",
    CN: "cn",
    JP: "jp",
    VN: "vn",
  };

  /** 현재 파일명에서 lang 접미사를 제거해 base 이름을 반환 */
  function getBaseName(filename) {
    return filename
      .replace(/-ko\.html$/, ".html")
      .replace(/-en\.html$/, ".html")
      .replace(/-cn\.html$/, ".html")
      .replace(/-jp\.html$/, ".html")
      .replace(/-vn\.html$/, ".html");
  }

  /** 언어 코드에 맞는 URL 반환 */
  function getLangUrl(langCode) {
    const filename = location.pathname.split("/").pop() || "index.html";
    const base = getBaseName(filename);
    if (langCode === "EN") return base; // EN = 접미사 없음
    return base.replace(".html", `-${LANG_MAP[langCode]}.html`);
  }

  /** 현재 페이지의 언어 코드 반환 */
  function getCurrentLang() {
    const lang = document.documentElement.lang || "en";
    if (lang.startsWith("ko")) return "KR";
    if (lang.startsWith("zh")) return "CN";
    if (lang.startsWith("ja")) return "JP";
    if (lang.startsWith("vi")) return "VN";
    return "EN";
  }

  /** 모든 언어 선택 UI의 active 상태를 현재 언어로 동기화 */
  function syncActiveLang() {
    const cur = getCurrentLang();
    document.querySelectorAll(".lang-option").forEach((el) => {
      el.classList.toggle("is-active", el.textContent.trim() === cur);
    });
    document.querySelectorAll(".gnb-lang-tab").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.lang === cur);
    });
    document.querySelectorAll(".lang-sheet__opt").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.lang === cur);
    });
  }

  /** 언어 선택 이벤트 — 해당 언어 페이지로 이동 */
  function handleLangChange(langCode) {
    if (langCode === getCurrentLang()) return;
    const url = getLangUrl(langCode);
    location.href = url;
  }

  // ── Desktop dropdown (.lang-option) ──────────────────────────────
  document.querySelectorAll(".lang-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      // lang-option 텍스트 = "KR" / "EN" etc.
      const code = opt.textContent.trim();
      if (LANG_MAP[code] !== undefined) handleLangChange(code);
    });
  });

  // ── GNB overlay tabs (.gnb-lang-tab) ─────────────────────────────
  document.querySelectorAll(".gnb-lang-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = btn.dataset.lang;
      if (code) handleLangChange(code);
    });
  });

  // ── Mobile bottom sheet (.lang-sheet__opt) ────────────────────────
  document.querySelectorAll(".lang-sheet__opt").forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = btn.dataset.lang;
      if (code) handleLangChange(code);
    });
  });

  // ── 초기 active 상태 동기화 ──────────────────────────────────────
  syncActiveLang();
})();
