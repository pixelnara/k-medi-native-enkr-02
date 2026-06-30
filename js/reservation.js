/* reservation.js — 상담 예약 3-STEP 퍼널 */

(function () {
  "use strict";

  /* ── DOM refs ── */
  const steps = document.querySelectorAll(".rsv-step");
  const panels = document.querySelectorAll(".rsv-panel");
  const chips = document.querySelectorAll(".rsv-chip");
  const payModal = document.getElementById("rsvPayModal");
  const payBackdrop = document.getElementById("rsvPayBackdrop");
  const payClose = document.getElementById("rsvPayClose");
  const payOptions = document.querySelectorAll(".rsv-pay-option");

  let currentStep = 1;

  /* ── Utility ── */
  function goToStep(n) {
    if (n < 1 || n > 3) return;

    // Update panels
    panels.forEach((p, i) => {
      p.classList.toggle("is-active", i + 1 === n);
    });

    // Update step indicator
    steps.forEach((s, i) => {
      const stepNum = i + 1;
      s.classList.remove("is-active", "is-done");
      if (stepNum === n) s.classList.add("is-active");
      if (stepNum < n) s.classList.add("is-done");
    });

    currentStep = n;

    // Populate summary when entering step 3
    if (n === 3) buildSummary();

    // Scroll to top of form
    const hero = document.querySelector(".rsv-hero");
    if (hero) {
      const offset = hero.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  }

  /* ── Procedure chip toggle ── */
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const selected = !chip.classList.contains("is-selected");
      chip.classList.toggle("is-selected", selected);
      chip.setAttribute("aria-pressed", String(selected));
    });
  });

  /* ── Next / Prev buttons ── */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-rsv-action]");
    if (!btn) return;

    const action = btn.dataset.rsvAction;

    if (action === "next") {
      const target = parseInt(btn.dataset.target, 10);
      if (validateStep(currentStep)) goToStep(target);
    }

    if (action === "prev") {
      const target = parseInt(btn.dataset.target, 10);
      goToStep(target);
    }

    if (action === "pay") {
      openPayModal();
    }

    if (action === "paymethod") {
      const method = btn.dataset.method;
      handlePayment(method);
    }
  });

  /* ── Validation ── */
  function validateStep(step) {
    if (step === 1) {
      const selected = document.querySelectorAll(".rsv-chip.is-selected");
      const date = document.getElementById("rsvDate");
      const symptom = document.getElementById("rsvSymptom");
      const errChip = document.getElementById("errChip");
      const errDate = document.getElementById("errDate");
      const errSymptom = document.getElementById("errSymptom");
      let ok = true;

      if (selected.length === 0) {
        errChip && errChip.classList.add("is-visible");
        ok = false;
      } else {
        errChip && errChip.classList.remove("is-visible");
      }

      if (!date || !date.value) {
        errDate && errDate.classList.add("is-visible");
        ok = false;
      } else {
        errDate && errDate.classList.remove("is-visible");
      }

      if (!symptom || !symptom.value.trim()) {
        errSymptom && errSymptom.classList.add("is-visible");
        ok = false;
      } else {
        errSymptom && errSymptom.classList.remove("is-visible");
      }

      return ok;
    }

    if (step === 2) {
      const name = document.getElementById("rsvName");
      const phone = document.getElementById("rsvPhone");
      const email = document.getElementById("rsvEmail");
      const nationality = document.getElementById("rsvNationality");
      const errName = document.getElementById("errName");
      const errPhone = document.getElementById("errPhone");
      const errEmail = document.getElementById("errEmail");
      let ok = true;

      const check = (input, err) => {
        if (!input || !input.value.trim()) {
          err && err.classList.add("is-visible");
          ok = false;
        } else {
          err && err.classList.remove("is-visible");
        }
      };

      check(name, errName);
      check(phone, errPhone);
      check(email, errEmail);

      return ok;
    }

    return true;
  }

  /* ── Build Step 3 summary ── */
  function buildSummary() {
    // Procedure tags
    const tagWrap = document.getElementById("summaryTags");
    if (tagWrap) {
      tagWrap.innerHTML = "";
      document.querySelectorAll(".rsv-chip.is-selected").forEach((c) => {
        const tag = document.createElement("span");
        tag.className = "rsv-summary-tag";
        tag.textContent = c.textContent;
        tagWrap.appendChild(tag);
      });
    }

    const getVal = (id) => {
      const el = document.getElementById(id);
      if (!el) return "—";
      if (el.tagName === "SELECT") {
        const opt = el.options[el.selectedIndex];
        return opt && opt.value ? opt.text : "—";
      }
      return el.value || "—";
    };

    const setEl = (destId, val) => {
      const el = document.getElementById(destId);
      if (el) el.textContent = val;
    };

    setEl("summaryDate", getVal("rsvDate"));
    setEl("summaryTime", getVal("rsvTime"));

    const symptomEl = document.getElementById("summarySymptom");
    const symptomSrc = document.getElementById("rsvSymptom");
    if (symptomEl && symptomSrc)
      symptomEl.textContent = symptomSrc.value || "—";

    setEl("summaryName", getVal("rsvName"));
    setEl("summaryPhone", getVal("rsvPhone"));
    setEl("summaryEmail", getVal("rsvEmail"));
    setEl("summaryNationality", getVal("rsvNationality"));
    setEl("summaryGender", getVal("rsvGender"));
    setEl("summaryBirthdate", getVal("rsvBirthdate"));
    setEl("summaryLang", getVal("rsvLang"));
  }

  /* ── Weekday-only date picker ── */
  const rsvDate = document.getElementById("rsvDate");
  if (rsvDate) {
    // Set min to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    rsvDate.min = `${yyyy}-${mm}-${dd}`;

    rsvDate.addEventListener("change", () => {
      const d = new Date(rsvDate.value + "T00:00:00");
      const day = d.getDay(); // 0=Sun, 6=Sat
      if (day === 0 || day === 6) {
        const errDate = document.getElementById("errDate");
        if (errDate) {
          errDate.textContent = "* 평일(월~금)만 선택 가능합니다.";
          errDate.classList.add("is-visible");
        }
        rsvDate.value = "";
      } else {
        const errDate = document.getElementById("errDate");
        errDate && errDate.classList.remove("is-visible");
      }
    });
  }

  /* ── Payment Modal ── */
  function openPayModal() {
    if (!payModal) return;
    payModal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closePayModal() {
    if (!payModal) return;
    payModal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (payClose) payClose.addEventListener("click", closePayModal);
  if (payModal) {
    payModal.addEventListener("click", (e) => {
      if (!e.target.closest(".rsv-pay-modal__box")) closePayModal();
    });
  }

  /* Close on Escape */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePayModal();
  });

  function handlePayment(method) {
    closePayModal();
    // Placeholder: show completion step
    showComplete(method);
  }

  /* ── Completion screen ── */
  function showComplete(method) {
    panels.forEach((p) => p.classList.remove("is-active"));

    const completePanel = document.getElementById("rsvPanelComplete");
    if (completePanel) {
      completePanel.classList.add("is-active");
    }

    steps.forEach((s) => s.classList.remove("is-active"));
    steps.forEach((s) => s.classList.add("is-done"));
  }

  /* ── Textarea auto-grow (optional UX) ── */
  const textarea = document.getElementById("rsvSymptom");
  if (textarea) {
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    });
  }
})();
