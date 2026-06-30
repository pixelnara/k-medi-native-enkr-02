/* ================================================================
   PSS Quiz State — sessionStorage 저장/복원/삭제
   skin-sol.html 퀴즈 결과를 보존해 product.html 이동 후 뒤로가기 시
   추천 제품 섹션이 그대로 유지되도록 합니다.
   ================================================================ */
window.pssState = (function () {
  var KEY = "pss_quiz_result";

  return {
    save: function (sel) {
      try {
        sessionStorage.setItem(
          KEY,
          JSON.stringify({
            moisture: sel.moisture,
            pigment: sel.pigment,
            elastic: sel.elastic,
            sensitive: sel.sensitive,
          }),
        );
      } catch (e) {}
    },

    get: function () {
      try {
        var raw = sessionStorage.getItem(KEY);
        if (!raw) return null;
        var data = JSON.parse(raw);
        if (data.moisture && data.pigment && data.elastic && data.sensitive)
          return data;
        return null;
      } catch (e) {
        return null;
      }
    },

    clear: function () {
      try {
        sessionStorage.removeItem(KEY);
      } catch (e) {}
    },

    markNavToProduct: function () {
      try {
        sessionStorage.setItem("pss_nav_to_product", "1");
      } catch (e) {}
    },

    isFromProduct: function () {
      try {
        var flag = sessionStorage.getItem("pss_nav_to_product");
        sessionStorage.removeItem("pss_nav_to_product");
        return flag === "1";
      } catch (e) {
        return false;
      }
    },
  };
})();
