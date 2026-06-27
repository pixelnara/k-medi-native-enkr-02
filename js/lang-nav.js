/**
 * lang-nav.js
 * 언어 선택 시 대응하는 언어 버전 페이지로 이동합니다.
 *
 * 폴더 구조:
 *   ko/pagename.html  ← 국문
 *   en/pagename.html  ← 영문
 *
 * 예) en/center.html ↔ ko/center.html
 */
(function () {
  const LANG_FOLDER = {
    KR: "ko",
    EN: "en",
  };

  /** 언어 코드에 맞는 URL 반환 */
  function getLangUrl(langCode) {
    const targetFolder = LANG_FOLDER[langCode];
    if (!targetFolder) return null;

    const parts = location.pathname.split("/");
    const raw    = parts[parts.length - 1]; // 마지막 세그먼트 (빈 값·폴더명·파일명 모두 가능)
    const parent = parts[parts.length - 2]; // 그 앞 세그먼트

    const FOLDERS = Object.values(LANG_FOLDER); // ['ko', 'en']

    let filename, inLangFolder;

    if (FOLDERS.includes(raw) || raw === "") {
      // /ko  /ko/  처럼 마지막이 폴더명이거나 빈 문자열인 경우 → index 페이지
      const folder = FOLDERS.includes(raw) ? raw : parent;
      inLangFolder = FOLDERS.includes(folder);
      filename = "index.html";
    } else {
      // /ko/center  /ko/center.html 처럼 파일명이 있는 경우
      filename = raw.endsWith(".html") ? raw : raw + ".html";
      inLangFolder = FOLDERS.includes(parent);
    }

    return inLangFolder
      ? `../${targetFolder}/${filename}`
      : `${targetFolder}/${filename}`;
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
      if (code) handleLangChange(code);
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
