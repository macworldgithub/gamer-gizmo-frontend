export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();

  if (diffInMilliseconds < 0) {
    return "Just now"; // Future date handling (optional)
  }

  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);
  const remainingDays = diffInDays % 30;

  if (diffInDays < 1) {
    return "Today";
  }

  if (diffInMonths > 0) {
    return `${diffInMonths}m ${remainingDays}d ago`; // e.g., "1m 11d ago"
  }

  return `${diffInDays} days ago`; // e.g., "9 days ago"
};
