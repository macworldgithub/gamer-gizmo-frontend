export const formatDate = (dateString: string) => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const date = new Date(dateString);
  //   @ts-ignore
  return date.toLocaleDateString("en-GB", options); // Adjusts format to "20 Jan 2025"
};
