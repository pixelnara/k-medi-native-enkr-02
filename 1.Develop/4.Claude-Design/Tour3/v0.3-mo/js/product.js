/* product.js — product 페이지 인터랙션 */

(function () {
  'use strict';

  /* ── 상품 데이터 로드 ── */
  var p = null;
  try { p = JSON.parse(sessionStorage.getItem('cosm_product')); } catch(e) {}
  if (!p) { history.length > 1 ? history.back() : (window.location.href = 'cosmetic.html'); return; }

  function fmt(n) {
    if (typeof n === 'string') return n;
    return '₩' + n.toLocaleString('ko-KR');
  }

  /* ── 갤러리 ── */
  /* 추천 패널용 recProds 먼저 계산 (썸네일 이미지 제외 목록 구성) */
  var allProds = [];
  try { allProds = JSON.parse(sessionStorage.getItem('cosm_products')) || []; } catch(e) {}
  var recProds = allProds
    .filter(function(r) { return r.id !== p.id; })
    .sort(function(a, b) { return b.popularity - a.popularity; })
    .slice(0, 3);
  var recImgs = recProds.map(function(r) { return r.img; });

  /* 현재 상품 이미지 + 추천 패널 이미지를 제외한 풀에서 4장 보충 */
  var extraPool = allProds
    .filter(function(x) { return x.id !== p.id && recImgs.indexOf(x.img) === -1; })
    .map(function(x) { return x.img; });
  var pIdx = allProds.findIndex ? allProds.findIndex(function(x){ return x.id === p.id; }) : 0;
  var offset = pIdx % (extraPool.length || 1);
  extraPool = extraPool.slice(offset).concat(extraPool.slice(0, offset));

  var imgs = [p.img].concat(extraPool.slice(0, 4));
  var curIdx = 0;

  function setImg(idx) {
    curIdx = (idx + imgs.length) % imgs.length;
    document.getElementById('pdMainImg').src = imgs[curIdx];
    document.getElementById('pdMainImg').alt = p.name;
    document.getElementById('pdCounter').textContent = (curIdx + 1) + ' / ' + imgs.length;
    document.querySelectorAll('.pd-gallery__dot').forEach(function(d, i) {
      d.classList.toggle('is-active', i === curIdx);
    });
    document.querySelectorAll('.pd-gallery__thumb').forEach(function(t, i) {
      t.classList.toggle('is-active', i === curIdx);
    });
  }

  /* 태그 뱃지 */
  var tagsEl = document.getElementById('pdGalleryTags');
  (p.tags || []).slice(0, 2).forEach(function(t) {
    var span = document.createElement('span');
    span.className = 'pd-gallery__tag';
    span.textContent = t;
    tagsEl.appendChild(span);
  });

  /* 갤러리 도트 */
  var dotsEl = document.getElementById('pdGalleryDots');
  imgs.forEach(function(_, i) {
    var btn = document.createElement('button');
    btn.className = 'pd-gallery__dot' + (i === 0 ? ' is-active' : '');
    btn.setAttribute('aria-label', (i + 1) + '번 이미지');
    btn.addEventListener('click', function() { setImg(i); });
    dotsEl.appendChild(btn);
  });

  /* ★ [신규 기능] 하단 썸네일 스트립: 메인 이미지 안쪽 하단에 제품 다른 사진 버튼 생성 */
  var thumbStripEl = document.getElementById('pdThumbStrip');
  imgs.forEach(function(src, i) {
    var btn = document.createElement('button');
    btn.className = 'pd-gallery__thumb' + (i === 0 ? ' is-active' : '');
    btn.setAttribute('aria-label', (i + 1) + '번 이미지');
    var tImg = document.createElement('img');
    tImg.src = src;
    tImg.alt = '';
    btn.appendChild(tImg);
    btn.addEventListener('click', function() { setImg(i); });
    thumbStripEl.appendChild(btn);
  });

  document.getElementById('pdPrev').addEventListener('click', function() { setImg(curIdx - 1); });
  document.getElementById('pdNext').addEventListener('click', function() { setImg(curIdx + 1); });
  setImg(0);

  /* 깨진 이미지 자동 스킵 */
  var pdErrCount = 0;
  document.getElementById('pdMainImg').addEventListener('error', function () {
    if (pdErrCount < imgs.length - 1) {
      pdErrCount++;
      setImg(curIdx + 1);
    }
  });

  /* 이미지 1장이면 화살표/썸네일/카운터 숨김 */
  if (imgs.length <= 1) {
    document.getElementById('pdPrev').style.display = 'none';
    document.getElementById('pdNext').style.display = 'none';
    document.getElementById('pdCounter').style.display = 'none';
    document.getElementById('pdThumbStrip').style.display = 'none';
  }

  /* ★ [신규 기능] 좌측 추천 상품 패널 */
  var recItemsEl = document.getElementById('pdRecItems');
  if (recProds.length === 0) {
    document.getElementById('pdRecPanel').style.display = 'none';
  } else {
    recProds.forEach(function(r) {
      var rPrice = r.discount ? Math.round(r.price * (1 - r.discount / 100)) : r.price;
      var item = document.createElement('button');
      item.className = 'pd-rec-item';
      item.innerHTML =
        '<div class="pd-rec-item__img-wrap"><img class="pd-rec-item__img" src="' + r.img + '" alt="' + r.name + '" /></div>';
      item.addEventListener('click', function() {
        sessionStorage.setItem('cosm_product', JSON.stringify(r));
        window.location.reload();
      });
      recItemsEl.appendChild(item);
    });
  }

  /* ── 상품 정보 ── */
  document.getElementById('pdCategoryTag').textContent = p.category || '';
  document.getElementById('pdTitle').textContent = p.name;

  var ratingVal = p.rating ? p.rating.toFixed(1) : '';
  document.getElementById('pdRatingVal').textContent = ratingVal;
  document.getElementById('pdRatingCount').textContent = p.ratingCount ? '(' + p.ratingCount + ')' : '';

  /* ── 가격 계산 ── */
  var finalPrice = p.discount ? Math.round(p.price * (1 - p.discount / 100)) : p.price;
  document.getElementById('pdOptionPrice').textContent = fmt(finalPrice);
  if (p.discount) {
    document.getElementById('pdPriceOrig').textContent = fmt(p.price);
    document.getElementById('pdPriceOrig').style.display = '';
    document.getElementById('pdDiscount').textContent = p.discount + '%';
    document.getElementById('pdDiscount').style.display = '';
  }
  document.getElementById('pdPrice').textContent = fmt(finalPrice);

  document.getElementById('pdDesc').textContent = p.desc || '';

  /* ── 수량 ── */
  var qty = 1;
  document.getElementById('pdQtyMinus').addEventListener('click', function() {
    if (qty > 1) { qty--; document.getElementById('pdQtyVal').textContent = qty; }
  });
  document.getElementById('pdQtyPlus').addEventListener('click', function() {
    qty++; document.getElementById('pdQtyVal').textContent = qty;
  });

  /* ── 스펙 테이블 ── */
  var specsTable = document.getElementById('pdSpecsTable');
  var specRows = [
    ['카테고리', p.category || '-'],
    ['용량', p.volume || '-'],
    ['피부타입', p.skinType || '모든 피부'],
    ['원산지', '대한민국'],
    ['브랜드', p.brand || 'BONICS'],
  ];
  specRows.forEach(function(row) {
    var tr = document.createElement('tr');
    tr.innerHTML = '<th>' + row[0] + '</th><td>' + row[1] + '</td>';
    specsTable.appendChild(tr);
  });

  /* ── 상세 설명 주입 ── */
  var ph = document.getElementById('pdDetailPlaceholder');
  var features = [
    { icon: '🌿', title: '자연 유래 성분', desc: '자극 없는 천연 원료로 예민한 피부도 안심' },
    { icon: '💧', title: '고보습 포뮬러', desc: '24시간 지속되는 깊은 수분 공급' },
    { icon: '✨', title: '가시적 효과', desc: '4주 사용 후 눈에 띄는 피부 개선' },
    { icon: '🔬', title: '임상 테스트', desc: '피부과 전문의 검증 완료' },
  ];
  var featureItems = features.map(function(f) {
    return '<div class="pd-feat-item">' +
           '<span class="pd-feat-label"><span class="pd-feat-icon">' + f.icon + '</span>' +
           '<strong class="pd-feat-title">' + f.title + '</strong></span>' +
           '<p class="pd-feat-desc">' + f.desc + '</p></div>';
  }).join('');

  ph.innerHTML =
    '<div class="pd-detail-hero">' +
      '<p class="pd-detail-hero__label">' + (p.category || '') + '</p>' +
      '<h3 class="pd-detail-hero__title">' + p.name + '</h3>' +
      '<p class="pd-detail-hero__desc">' + (p.desc || '피부 깊은 곳부터 채워주는 프리미엄 스킨케어') + '</p>' +
    '</div>' +
    '<div class="pd-detail-features">' + featureItems + '</div>' +
    '<div class="pd-detail-howto">' +
      '<h4 class="pd-detail-howto__title">사용 방법</h4>' +
      '<ol class="pd-detail-howto__steps">' +
        '<li>세안 후 스킨 정돈</li>' +
        '<li>적당량을 손에 덜어내기</li>' +
        '<li>얼굴 전체에 가볍게 도포</li>' +
        '<li>부드럽게 흡수될 때까지 마사지</li>' +
      '</ol>' +
    '</div>';

})();

(function(){
  const trigger = document.getElementById('loginTrigger');
  const modal   = document.getElementById('loginModal');
  const close   = document.getElementById('loginClose');
  const backdrop= document.getElementById('loginBackdrop');
  function openModal(){ modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; var first=modal.querySelector('input:not([type=hidden]),button:not([disabled])'); if(first) setTimeout(function(){first.focus();},50); }
  function closeModal(){ modal.classList.remove('is-open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; if(trigger) trigger.focus(); }
  if (trigger) trigger.addEventListener('click', function(e){ e.preventDefault(); openModal(); });
  const gnbLoginBtn = document.querySelector('.gnb-login-btn');
  if (gnbLoginBtn) gnbLoginBtn.addEventListener('click', function(e){ e.preventDefault(); openModal(); });
  close.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeModal(); });
  const pwdInput = document.getElementById('loginPassword');
  const pwdToggle = document.getElementById('loginPwdToggle');
  const eyeIcon = document.getElementById('eyeIcon');
  const eyeOffSvg = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  const eyeOnSvg = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  if (pwdToggle) pwdToggle.addEventListener('click', function(){
    const isHidden = pwdInput.type === 'password';
    pwdInput.type = isHidden ? 'text' : 'password';
    eyeIcon.innerHTML = isHidden ? eyeOffSvg : eyeOnSvg;
  });
})();
