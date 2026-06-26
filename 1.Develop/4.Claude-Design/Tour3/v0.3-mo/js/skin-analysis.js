/* skin-analysis.js — skin-analysis 페이지 인터랙션 */

// ── 메인 탭 전환 ──
(function () {
  var tabs   = document.querySelectorAll('.sa-tab-selector .tab-pill__btn');
  var panels = document.querySelectorAll('.sa-panel');
  function activate(idx) {
    tabs.forEach(function (t, i) {
      t.classList.toggle('is-active', i === idx);
      t.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });
    panels.forEach(function (p, i) { p.classList.toggle('is-active', i === idx); });
  }
  tabs.forEach(function (t, i) { t.addEventListener('click', function () { activate(i); }); });
})();

// ── 서브탭 전환 (탭1: 에이징 / 트러블) ──
(function () {
  var panel1    = document.getElementById('panel-tab1');
  if (!panel1) return;
  var subtabs   = panel1.querySelectorAll('.sa-subtab');
  var subpanels = panel1.querySelectorAll('.sa-subpanel');
  subtabs.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      subtabs.forEach(function (t, j) {
        t.classList.toggle('is-active', j === i);
        t.setAttribute('aria-selected', j === i ? 'true' : 'false');
      });
      subpanels.forEach(function (p, j) { p.classList.toggle('is-active', j === i); });
    });
  });
})();

// ── 캐러셀 팩토리 ──
(function () {
  function initCarousel(trackId, dotsId) {
    var track = document.getElementById(trackId);
    if (!track) return;
    var carousel = track.closest('.sa-carousel');
    var slides   = track.querySelectorAll('.sa-carousel__slide');
    var dots     = document.getElementById(dotsId)
                   ? document.getElementById(dotsId).querySelectorAll('.sa-carousel__dot')
                   : [];
    var prev     = carousel.querySelector('.sa-carousel__arrow--prev');
    var next     = carousel.querySelector('.sa-carousel__arrow--next');
    var total    = slides.length;
    var cur      = 0;

    function goTo(idx) {
      if (idx < 0 || idx >= total) return;
      cur = idx;
      track.style.transform = 'translateX(-' + (cur * 100) + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === cur); });
      if (prev) prev.disabled = cur === 0;
      if (next) next.disabled = cur === total - 1;
    }

    if (prev) prev.addEventListener('click', function () { goTo(cur - 1); });
    if (next) next.addEventListener('click', function () { goTo(cur + 1); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { goTo(i); }); });

    // 터치 스와이프
    var startX = 0;
    var viewport = carousel.querySelector('.sa-carousel__viewport');
    if (viewport) {
      viewport.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
      viewport.addEventListener('touchend', function (e) {
        var diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) { diff > 0 ? goTo(cur + 1) : goTo(cur - 1); }
      }, { passive: true });
    }

    goTo(0);
  }

  initCarousel('track-aging',   'dots-aging');
  initCarousel('track-trouble', 'dots-trouble');
  initCarousel('track-ratio',   'dots-ratio');
  initCarousel('track-angle',   'dots-angle');
})();

// ── 탭2 서브탭 전환 (비율 / 각도) — 별도 인스턴스 ──
(function () {
  var panel2    = document.getElementById('panel-tab2');
  if (!panel2) return;
  var subtabs   = panel2.querySelectorAll('.sa-subtab');
  var subpanels = panel2.querySelectorAll('.sa-subpanel');
  subtabs.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      subtabs.forEach(function (t, j) {
        t.classList.toggle('is-active', j === i);
        t.setAttribute('aria-selected', j === i ? 'true' : 'false');
      });
      subpanels.forEach(function (p, j) { p.classList.toggle('is-active', j === i); });
    });
  });
})();

// Login modal
(function () {
  var trigger  = document.getElementById('loginTrigger');
  var modal    = document.getElementById('loginModal');
  var close    = document.getElementById('loginClose');
  var backdrop = document.getElementById('loginBackdrop');
  function openModal()  { modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
  function closeModal() { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if(trigger) trigger.focus(); }
  if (trigger) trigger.addEventListener('click', function (e) { e.preventDefault(); openModal(); });
  var gnbLoginBtn = document.querySelector('.gnb-login-btn');
  if (gnbLoginBtn) gnbLoginBtn.addEventListener('click', function (e) { e.preventDefault(); openModal(); });
  close.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  var pwdInput  = document.getElementById('loginPassword');
  var pwdToggle = document.getElementById('loginPwdToggle');
  var eyeIcon   = document.getElementById('eyeIcon');
  var eyeOffSvg = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  var eyeOnSvg  = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  if (pwdToggle) pwdToggle.addEventListener('click', function () {
    var isHidden = pwdInput.type === 'password';
    pwdInput.type = isHidden ? 'text' : 'password';
    eyeIcon.innerHTML = isHidden ? eyeOffSvg : eyeOnSvg;
  });
})();
