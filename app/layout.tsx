import type { Metadata } from "next";

// ── Global stylesheets (load order mirrors the original <link> order) ──
import "../css/reset.css";
import "../css/font.css";
import "../css/theme.css";
import "../css/components/button.css";
import "../css/components/accordion.css";
import "../css/components/modal.css";
import "../css/components/card.css";
import "../css/components/tab.css";
import "../css/components/breadcrumb.css";
import "../css/components/header.css";
import "../css/components/footer.css";
import "../css/common.css";

export const metadata: Metadata = {
  title: "KMEDITOUR — 프리미엄 컨시어지 인 코리아 | Premium Concierge in Korea",
  description:
    "KMEDITOUR는 한국 뷰티·의료·관광을 아우르는 프리미엄 컨시어지 서비스입니다. 전담 코디네이터가 처음부터 끝까지 함께합니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
