// Mobile Bottom Bar component
// Theme: body에 data-mbar-theme="white" 설정 시 화이트 모드 (기본: dark)
(function () {
  var ICONS = {
    홈: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    피부타입: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z"/></svg>',
    쇼핑: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4.5" width="17" height="16" rx="4.5"/><path d="M8 8.5a4 4 0 0 0 8 0"/></svg>',
    투어: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
    휴그로센터: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>',
    매거진: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  };

  var ITEMS = [
    { label: '홈',       href: 'index.html' },
    { label: '피부타입',  href: 'skin-sol.html' },
    { label: '쇼핑',     href: 'cosmetic.html' },
    { label: '투어',     href: 'travel.html' },
    { label: '휴그로센터', href: 'center.html' },
  ];

  // 파일명 → 활성 탭
  var PAGE_ACTIVE = {
    'index.html':          '홈',
    '':                    '홈',
    'skin-sol.html':       '피부타입',
    'skin-analysis.html':  '피부타입',
    'cosmetic.html':       '쇼핑',
    'product.html':        '쇼핑',
    'travel.html':         '투어',
    'center.html':         '휴그로센터',
    'magazine.html':       '매거진',
    'magazine-detail.html':'매거진',
  };

  var filename = window.location.pathname.split('/').pop() || 'index.html';
  var activeLabel = PAGE_ACTIVE[filename] || null;
  var theme = document.body.dataset.mbarTheme || 'dark';

  var nav = document.createElement('nav');
  nav.className = 'mobile-bar mobile-bar--v1' + (theme === 'white' ? '' : ' mobile-bar--dark');
  nav.setAttribute('aria-label', '메인 메뉴');

  ITEMS.forEach(function (item) {
    var a = document.createElement('a');
    var cls = 'mbar-btn';
    if (item.cta) cls += ' mbar-btn--cta';
    if (activeLabel === item.label) cls += ' is-active';
    a.className = cls;
    a.href = item.href;
    a.setAttribute('aria-label', item.label);
    a.innerHTML = ICONS[item.label] + '<span class="mbar-label">' + item.label + '</span>';
    nav.appendChild(a);
  });

  document.body.appendChild(nav);

  var prevScrollY = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (y > prevScrollY && y > 80) {
      nav.classList.add('is-hidden');
    } else {
      nav.classList.remove('is-hidden');
    }
    prevScrollY = y;
  }, { passive: true });
})();
