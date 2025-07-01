

// export const sortByCreatedAt = (data: any) => {
//   return [...(data || [])].sort(
//     //@ts-ignore
//     (a, b) => new Date(b.created_at) - new Date(a.created_at)
//   );
// };


export const sortByCreatedAt = (data: any) => {
  if (!Array.isArray(data)) return [];

  const featured = data.filter((item) => item.is_featured === true);
  const nonFeatured = data
    .filter((item) => item.is_featured === false)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return [...featured, ...nonFeatured];
};
