/* faq.js — faq 페이지 인터랙션 */

(function () {
  /* ── 카테고리 탭 필터 ── */
  var tabs = document.querySelectorAll('.faq-tab');
  var groups = document.querySelectorAll('.faq-group');
  function filterCat(cat) {
    groups.forEach(function (g) {
      g.style.display = g.getAttribute('data-cat') === cat ? '' : 'none';
    });
  }
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      filterCat(tab.getAttribute('data-cat'));
    });
  });
  /* 초기 상태: 첫 번째 탭(예약·결제) */
  filterCat('booking');

  /* ── 로그인 모달 ── */
  var modal = document.getElementById('loginModal');
  var trigger = document.getElementById('loginTrigger');
  var closeBtn = document.getElementById('loginClose');
  var backdrop = document.getElementById('loginBackdrop');
  var gnbLoginBtn = document.querySelector('.gnb-login-btn');
  function openModal() { modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; var first=modal.querySelector('input:not([type=hidden]),button:not([disabled])'); if(first) setTimeout(function(){first.focus();},50); }
  function closeModal() { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if(trigger) trigger.focus(); }
  if (trigger) trigger.addEventListener('click', function (e) { e.preventDefault(); openModal(); });
  if (gnbLoginBtn) gnbLoginBtn.addEventListener('click', function (e) { e.preventDefault(); openModal(); });
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* ── 비밀번호 토글 ── */
  var pwdToggle = document.getElementById('loginPwdToggle');
  var pwdInput = document.getElementById('loginPassword');
  var eyeIcon = document.getElementById('eyeIcon');
  var eyeOnSvg = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  var eyeOffSvg = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  if (pwdToggle) pwdToggle.addEventListener('click', function () {
    var isHidden = pwdInput.type === 'password';
    pwdInput.type = isHidden ? 'text' : 'password';
    eyeIcon.innerHTML = isHidden ? eyeOffSvg : eyeOnSvg;
  });
})();
