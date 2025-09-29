export default function Head({ params }: { params: { title: string } }) {
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonical = `${base}/blogs/${slugify(params.title)}`;

  return (
    <>
      <link rel="canonical" href={canonical} />
    </>
  );
}
