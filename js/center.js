/* center.js — center 페이지 인터랙션 */

// Inside Hugro Carousel
(function () {
  var ihcSlides = [
    {
      src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85",
      alt: "B1 Premium Massage & Spa",
    },
    {
      src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      alt: "1F Hugro Center",
    },
    {
      src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85",
      alt: "2F Exhibition Gallery",
    },
  ];
  var ihcEl = document.querySelector(".ihc");
  if (!ihcEl) return;
  var ihcImg = document.getElementById("ihcImg");
  var ihcTabs = ihcEl.querySelectorAll(".ihc__tab");
  var ihcInfos = ihcEl.querySelectorAll(".ihc__info");
  var ihcPrev = ihcEl.querySelector(".ihc__arrow--prev");
  var ihcNext = ihcEl.querySelector(".ihc__arrow--next");
  var ihcCur = 0;

  function ihcGoTo(idx) {
    idx = (idx + ihcSlides.length) % ihcSlides.length;
    ihcCur = idx;
    ihcImg.style.opacity = "0";
    setTimeout(function () {
      ihcImg.src = ihcSlides[idx].src;
      ihcImg.alt = ihcSlides[idx].alt;
      ihcImg.style.opacity = "1";
    }, 220);
    ihcTabs.forEach(function (t, i) {
      t.classList.toggle("is-active", i === idx);
    });
    ihcInfos.forEach(function (info, i) {
      info.classList.toggle("is-active", i === idx);
    });
  }

  ihcTabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () {
      ihcGoTo(i);
    });
  });
  ihcPrev.addEventListener("click", function () {
    ihcGoTo(ihcCur - 1);
  });
  ihcNext.addEventListener("click", function () {
    ihcGoTo(ihcCur + 1);
  });
})();

// Treatment carousel
(function () {
  var track = document.getElementById("treatmentTrack");
  if (!track) return;
  var slides = track.querySelectorAll(".treatment-carousel__slide");
  var dots = document.querySelectorAll(
    "#treatmentDots .treatment-carousel__dot",
  );
  var btnPrev = document.querySelector(".treatment-carousel__btn--prev");
  var btnNext = document.querySelector(".treatment-carousel__btn--next");
  var total = slides.length;
  var cur = 0;

  function updateBtns() {
    btnPrev.classList.toggle("is-active", cur > 0);
    btnNext.classList.toggle("is-active", cur < total - 1);
  }

  function goTo(idx) {
    if (idx < 0 || idx >= total) return;
    cur = idx;
    track.style.transform = "translateX(-" + cur * 100 + "%)";
    dots.forEach(function (d, i) {
      d.classList.toggle("is-active", i === cur);
      d.setAttribute("aria-current", i === cur ? "true" : "false");
    });
    updateBtns();
  }

  btnPrev.addEventListener("click", function () {
    goTo(cur - 1);
  });
  btnNext.addEventListener("click", function () {
    goTo(cur + 1);
  });
  dots.forEach(function (d, i) {
    d.addEventListener("click", function () {
      goTo(i);
    });
  });
  goTo(0);
})();

(function () {
  const trigger = document.getElementById("loginTrigger");
  const modal = document.getElementById("loginModal");
  const close = document.getElementById("loginClose");
  const backdrop = document.getElementById("loginBackdrop");
  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var first = modal.querySelector(
      "input:not([type=hidden]),button:not([disabled])",
    );
    if (first)
      setTimeout(function () {
        first.focus();
      }, 50);
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
  const gnbLoginBtn = document.querySelector(".gnb-login-btn");
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
  const pwdInput = document.getElementById("loginPassword");
  const pwdToggle = document.getElementById("loginPwdToggle");
  const eyeIcon = document.getElementById("eyeIcon");
  const eyeOffSvg =
    '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  const eyeOnSvg =
    '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  if (pwdToggle)
    pwdToggle.addEventListener("click", function () {
      const isHidden = pwdInput.type === "password";
      pwdInput.type = isHidden ? "text" : "password";
      eyeIcon.innerHTML = isHidden ? eyeOffSvg : eyeOnSvg;
    });
})();
