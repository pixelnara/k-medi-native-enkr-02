/**
 * #  ← 임시 디버그 전용, 확인 후 <script> 태그 제거
 *
 * --font-display (Optima/Marcellus 계열)이 실제로 렌더되는 요소에
 * .font-display 클래스를 자동으로 추가합니다.
 * → common.css의 .font-display { color: red } 로 시각화됩니다.
 *
 * 사용법: </body> 바로 앞에 추가
 *   ko/en 페이지: <script src="../#"></script>
 *   루트 페이지:  <script src="#"></script>
 */
(function () {
  const DISPLAY_FAMILIES = ["optima", "marcellus", "candara"];

  function isDisplayFont(el) {
    const ff = getComputedStyle(el).fontFamily.toLowerCase();
    return DISPLAY_FAMILIES.some((f) => ff.startsWith(f) || ff.includes(f));
  }

  function hasOwnText(el) {
    return Array.from(el.childNodes).some((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0);
  }

  let count = 0;

  document.querySelectorAll("*").forEach((el) => {
    if (!hasOwnText(el)) return;
    if (el.classList.contains("font-display")) return; // 이미 붙어 있으면 skip
    if (isDisplayFont(el)) {
      el.classList.add("font-display");
      count++;
    }
  });

  console.log(`[debug-display-font] .font-display 클래스 ${count}개 요소에 추가`);

  const badge = document.createElement("div");
  badge.textContent = `Display font: ${count}`;
  Object.assign(badge.style, {
    position: "fixed",
    top: "8px",
    right: "8px",
    zIndex: "99999",
    background: "red",
    color: "#fff",
    fontSize: "12px",
    fontFamily: "monospace",
    padding: "4px 10px",
    borderRadius: "4px",
    pointerEvents: "none",
  });
  document.body.appendChild(badge);
})();
