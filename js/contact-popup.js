(function () {
  var isEN = document.documentElement.lang === 'en' || location.pathname.indexOf('/en/') !== -1;
  var chatLabel = isEN ? 'Contact' : '문의하기';
  // 예약 페이지 경로 (현재 폴더 깊이에 맞춰 계산)
  var inLangFolder = location.pathname.indexOf('/ko/') !== -1 || location.pathname.indexOf('/en/') !== -1;
  var reservationHref = inLangFolder ? 'reservation.html' : (isEN ? 'en/reservation.html' : 'ko/reservation.html');
  var html = [
    '<button class="chat-btn" id="chatBtn" aria-label="' + chatLabel + '" aria-expanded="false">',
    '  <svg class="chat-icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
    '    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    "  </svg>",
    '  <svg class="chat-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">',
    '    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    "  </svg>",
    '  <span class="chat-btn__label">' + chatLabel + '</span>',
    "</button>",

    '<div class="contact-popup" id="contactPopup" aria-hidden="true" role="dialog" aria-modal="true" aria-label="문의하기">',
    '  <div class="contact-popup__card">',
    '    <div class="contact-popup__head">',
    "      <div>",
    '        <h3 class="contact-popup__title">문의하기</h3>',
    '        <p class="contact-popup__sub">편하신 방법으로 연락 주세요. 평일 9시-18시(KST)<br>내에 답변드립니다.</p>',
    "      </div>",
    '      <button class="contact-popup__close" id="contactClose" aria-label="닫기">',
    '        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    "      </button>",
    "    </div>",
    '    <hr class="contact-popup__divider">',
    '    <a href="' + reservationHref + '" class="contact-popup__item contact-popup__item--feature">',
    '      <span class="contact-popup__icon contact-popup__icon--meet">',
    '        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    "      </span>",
    '      <div class="contact-popup__item-body">',
    '        <strong class="contact-popup__feature-title">만나서 상담받기 <span class="contact-popup__feature-badge">추천</span></strong>',
    "      </div>",
    '      <svg class="contact-popup__feature-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    "    </a>",
    '    <a href="mailto:contact@kmeditour.co.kr" class="contact-popup__item">',
    '      <span class="contact-popup__icon contact-popup__icon--email">',
    '        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>',
    "      </span>",
    '      <div class="contact-popup__item-body">',
    '        <span class="contact-popup__item-label">이메일</span>',
    '        <span class="contact-popup__item-value-row">',
    '          <strong class="contact-popup__item-value">contact@kmeditour.co.kr</strong>',
    '          <button class="contact-popup__copy-btn" id="emailCopyBtn" type="button">복사</button>',
    "        </span>",
    '        <span class="contact-popup__item-hint">PC는 주소 복사, 모바일은 메일 앱이 열려요.</span>',
    "      </div>",
    "    </a>",
    '    <a href="tel:+82-2-514-0799" class="contact-popup__item">',
    '      <span class="contact-popup__icon contact-popup__icon--phone">',
    '        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    "      </span>",
    '      <div class="contact-popup__item-body">',
    '        <span class="contact-popup__item-label">전화 상담</span>',
    '        <strong class="contact-popup__item-value">+82-2-514-0799</strong>',
    '        <span class="contact-popup__item-hint">평일만 가능합니다.</span>',
    "      </div>",
    "    </a>",
    '    <a href="#" class="contact-popup__login-btn" id="contactLoginTrigger">',
    '      <span class="contact-popup__login-icon">',
    '        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    "      </span>",
    "      로그인 후 문의하기",
    '      <svg class="contact-popup__login-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    "    </a>",
    "  </div>",
    "</div>",
  ].join("\n");

  document.body.insertAdjacentHTML("beforeend", html);

  var chatBtn = document.getElementById("chatBtn");
  var popup = document.getElementById("contactPopup");
  var closeBtn = document.getElementById("contactClose");
  var loginTrigger = document.getElementById("contactLoginTrigger");

  /* 진입 시 숨김 → 스크롤 시 노출 (모든 페이지) */
  function onScrollReveal() {
    if (window.scrollY > 30) {
      chatBtn.classList.add("is-revealed");
    } else {
      chatBtn.classList.remove("is-revealed");
    }
  }
  window.addEventListener("scroll", onScrollReveal, { passive: true });
  onScrollReveal();

  /* 모바일(≤860px)에서는 버텀시트 + 뒷배경 고정(스크롤 잠금) */
  var sheetMQ = window.matchMedia("(max-width: 860px)");

  function openPopup() {
    popup.classList.add("is-open");
    popup.setAttribute("aria-hidden", "false");
    chatBtn.classList.add("is-open");
    chatBtn.setAttribute("aria-expanded", "true");
    if (sheetMQ.matches) document.body.style.overflow = "hidden";
  }
  function closePopup() {
    popup.classList.remove("is-open");
    popup.setAttribute("aria-hidden", "true");
    chatBtn.classList.remove("is-open");
    chatBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  chatBtn.addEventListener("click", function () {
    popup.classList.contains("is-open") ? closePopup() : openPopup();
  });
  closeBtn.addEventListener("click", closePopup);
  /* 버텀시트 뒷배경(딤) 탭 시 닫기 — 카드 내부 클릭은 통과 */
  popup.addEventListener("click", function (e) {
    if (e.target === popup) closePopup();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePopup();
  });
  document.addEventListener("click", function (e) {
    if (popup.classList.contains("is-open") && !popup.contains(e.target) && e.target !== chatBtn && !chatBtn.contains(e.target)) {
      closePopup();
    }
  });
  var copyBtn = document.getElementById("emailCopyBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText("contact@kmeditour.co.kr").then(function () {
        copyBtn.textContent = "복사됨!";
        copyBtn.classList.add("is-copied");
        setTimeout(function () {
          copyBtn.textContent = "복사";
          copyBtn.classList.remove("is-copied");
        }, 2000);
      });
    });
  }

  if (loginTrigger) {
    loginTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      closePopup();
      var loginModal = document.getElementById("loginModal");
      if (loginModal) {
        loginModal.classList.add("is-open");
        loginModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
    });
  }
})();
