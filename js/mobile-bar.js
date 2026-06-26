// Mobile Bottom Bar component
// Theme: body에 data-mbar-theme="white" 설정 시 화이트 모드 (기본: dark)
(function () {
  var ICONS = {
    홈: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    피부타입: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z"/></svg>',
    상담받기: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    매거진: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    쇼핑: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4.5" width="17" height="16" rx="4.5"/><path d="M8 8.5a4 4 0 0 0 8 0"/></svg>',
  };

  var ITEMS = [
    { label: '홈',     href: 'index.html' },
    { label: '피부타입', href: 'skin-sol.html' },
    { label: '상담받기', href: '#booking', cta: true },
    { label: '매거진',  href: 'magazine.html' },
    { label: '쇼핑',   href: 'cosmetic.html' },
  ];

  // 파일명 → 활성 탭
  var PAGE_ACTIVE = {
    'index.html':          '홈',
    '':                    '홈',
    'skin-sol.html':       '피부타입',
    'cosmetic.html':       '쇼핑',
    'product.html':        '쇼핑',
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
})();
