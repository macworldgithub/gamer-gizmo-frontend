export default function Head({ params }: { params: { id: string } }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonical = `${base}/community-chat/${params.id}`;

  return (
    <>
      <link rel="canonical" href={canonical} />
    </>
  );
}
