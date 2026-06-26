(function () {
  var html = [
    '<button class="chat-btn" id="chatBtn" aria-label="문의하기" aria-expanded="false">',
    '  <svg class="chat-icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
    '    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    "  </svg>",
    '  <svg class="chat-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">',
    '    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    "  </svg>",
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
    '    <a href="mailto:contact@kmeditour.co.kr" class="contact-popup__item">',
    '      <span class="contact-popup__icon contact-popup__icon--email">',
    '        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>',
    "      </span>",
    '      <div class="contact-popup__item-body">',
    '        <span class="contact-popup__item-label">이메일</span>',
    '        <strong class="contact-popup__item-value">contact@kmeditour.co.kr</strong>',
    '        <span class="contact-popup__item-hint">PC는 주소 복사, 모바일은 메일 앱이 열려요. <button class="contact-popup__copy-btn" id="emailCopyBtn" type="button">복사</button></span>',
    "      </div>",
    "    </a>",
    '    <a href="tel:+82-2-514-0799" class="contact-popup__item">',
    '      <span class="contact-popup__icon contact-popup__icon--phone">',
    '        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    "      </span>",
    '      <div class="contact-popup__item-body">',
    '        <span class="contact-popup__item-label">전화 상담</span>',
    '        <strong class="contact-popup__item-value">+82-2-514-0799</strong>',
    '        <span class="contact-popup__item-hint">평일만 가능합니다.<br/> 주말 및 공휴일은 이용이 불가능합니다.</span>',
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

  function openPopup() {
    popup.classList.add("is-open");
    popup.setAttribute("aria-hidden", "false");
    chatBtn.classList.add("is-open");
    chatBtn.setAttribute("aria-expanded", "true");
  }
  function closePopup() {
    popup.classList.remove("is-open");
    popup.setAttribute("aria-hidden", "true");
    chatBtn.classList.remove("is-open");
    chatBtn.setAttribute("aria-expanded", "false");
  }

  chatBtn.addEventListener("click", function () {
    popup.classList.contains("is-open") ? closePopup() : openPopup();
  });
  closeBtn.addEventListener("click", closePopup);
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
