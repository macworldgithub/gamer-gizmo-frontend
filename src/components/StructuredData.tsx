// components/StructuredData.tsx
import Script from "next/script";

export function StructuredData({ data }: { data: any }) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
