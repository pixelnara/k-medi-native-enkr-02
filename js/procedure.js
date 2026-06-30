/* procedure.js — procedure 페이지 인터랙션 */

(function () {
  var track = document.getElementById("procTrack");
  var filterBtns = document.querySelectorAll(".tab-line__btn");
  var dots = document.querySelectorAll(".proc-dot");
  var total = 7;
  var cur = 0;

  function goTo(idx) {
    if (idx < 0 || idx >= total) return;
    cur = idx;
    track.style.transform = "translateX(-" + cur * 100 + "%)";
    filterBtns.forEach(function (b, i) {
      b.classList.toggle("is-active", i === cur);
    });
    dots.forEach(function (d, i) {
      d.classList.toggle("is-active", i === cur);
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      goTo(parseInt(btn.dataset.idx, 10));
    });
  });
  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      goTo(parseInt(dot.dataset.idx, 10));
    });
  });

  // 터치 스와이프
  var viewport = document.querySelector(".proc-slider-viewport");
  var startX = 0;
  viewport.addEventListener(
    "touchstart",
    function (e) {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );
  viewport.addEventListener(
    "touchend",
    function (e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? goTo(cur + 1) : goTo(cur - 1);
      }
    },
    { passive: true },
  );

  // URL 파라미터로 초기 슬라이드 설정 (?t=0~6)
  var params = new URLSearchParams(window.location.search);
  var initIdx = parseInt(params.get("t") || "0", 10);
  goTo(isNaN(initIdx) ? 0 : Math.max(0, Math.min(6, initIdx)));

  // 히어로 "시술 둘러보기" 버튼
  var heroScrollBtn = document.getElementById("heroScrollBtn");
  if (heroScrollBtn)
    heroScrollBtn.addEventListener("click", function () {
      document
        .getElementById("procFilter")
        .scrollIntoView({ behavior: "smooth" });
    });
})();

// Login modal
(function () {
  var trigger = document.getElementById("loginTrigger");
  var modal = document.getElementById("loginModal");
  var close = document.getElementById("loginClose");
  var backdrop = document.getElementById("loginBackdrop");
  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
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
  var gnbLoginBtn = document.querySelector(".gnb-login-btn");
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
  var pwdInput = document.getElementById("loginPassword");
  var pwdToggle = document.getElementById("loginPwdToggle");
  var eyeIcon = document.getElementById("eyeIcon");
  var eyeOffSvg =
    '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  var eyeOnSvg =
    '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  if (pwdToggle)
    pwdToggle.addEventListener("click", function () {
      var isHidden = pwdInput.type === "password";
      pwdInput.type = isHidden ? "text" : "password";
      eyeIcon.innerHTML = isHidden ? eyeOffSvg : eyeOnSvg;
    });
})();
