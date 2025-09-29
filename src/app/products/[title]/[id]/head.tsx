export default function Head({ params }: { params: { title: string; id: string } }) {
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonical = `${base}/products/${slugify(params.title)}/${params.id}`;

  return (
    <>
      <link rel="canonical" href={canonical} />
    </>
  );
}
