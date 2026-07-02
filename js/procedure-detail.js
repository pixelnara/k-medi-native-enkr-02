/* procedure-detail.js — 시술 상세 페이지 인터랙션
   처리: 시술 부위 탭 전환
   아코디언(시술 과정)은 app.js의 공통 acc 로직이 처리함 */
(function () {
  "use strict";

  /* ─── Treatment Areas 탭 전환 ─── */
  var areaTabs = document.querySelectorAll(".pd-areas__tabs .chip");
  var areaPanels = document.querySelectorAll(".pd-area-panel");
  var areaCurrentName = document.getElementById("areaCurrentName");

  function playPanelVideo(panel) {
    if (!panel) return;
    var video = panel.querySelector("video.pd-area-panel__video");
    if (video) {
      video.currentTime = 0;
      var playPromise = video.play();
      if (playPromise && playPromise.catch) playPromise.catch(function () {});
    }
  }

  areaPanels.forEach(function (p) {
    var video = p.querySelector("video.pd-area-panel__video");
    if (video) video.pause();
  });
  playPanelVideo(document.querySelector(".pd-area-panel.is-active"));

  areaTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var idx = tab.dataset.area;
      areaTabs.forEach(function (t) {
        t.classList.remove("is-active");
      });
      areaPanels.forEach(function (p) {
        p.classList.remove("is-active");
        var video = p.querySelector("video.pd-area-panel__video");
        if (video) video.pause();
      });
      tab.classList.add("is-active");
      var panel = document.querySelector('.pd-area-panel[data-area="' + idx + '"]');
      if (panel) panel.classList.add("is-active");
      if (areaCurrentName) areaCurrentName.textContent = tab.textContent.trim();
      playPanelVideo(panel);
    });
  });
})();

/* ── login-modal (인라인에서 이동) ── */
/* Login modal */
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
  var eyeOnSvg = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  if (pwdToggle)
    pwdToggle.addEventListener("click", function () {
      var isHidden = pwdInput.type === "password";
      pwdInput.type = isHidden ? "text" : "password";
      eyeIcon.innerHTML = isHidden ? eyeOffSvg : eyeOnSvg;
    });
})();
