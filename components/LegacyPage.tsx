import Script from "next/script";
import { getLegacyPage } from "@/lib/legacy";

/**
 * Renders one of the original static pages: faithful markup via
 * dangerouslySetInnerHTML, plus its declared scripts via next/script.
 *
 * Phase 1 of the React/Next migration — see lib/legacy.ts.
 */
export default function LegacyPage({ file }: { file: string }) {
  const { bodyHtml, scripts } = getLegacyPage(file);
  return (
    <>
      <div
        className="legacy-root"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
      {scripts.map((src) => (
        <Script key={src} src={src} strategy="afterInteractive" />
      ))}
    </>
  );
}
