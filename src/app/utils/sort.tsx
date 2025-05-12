

export const sortByCreatedAt = (data: any) => {
  return [...(data || [])].sort(
    //@ts-ignore
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
};
