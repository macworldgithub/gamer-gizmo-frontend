export const detectPlatform = () => {
  // @ts-expect-error
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const platform = navigator.platform;

  console.log("User Agent:", userAgent);
  console.log("Platform:", platform);

  // Use platform as primary detection for known desktop systems
  if (/Win/.test(platform)) {
    return "Windows";
  } else if (/Mac/.test(platform) && !/iPhone|iPad|iPod/.test(userAgent)) {
    return "MacOS";
  } else if (/Linux/.test(platform) && !/android/i.test(userAgent)) {
    return "Linux";
  }

  // Fallback to userAgent for mobile systems
  if (/android/i.test(userAgent)) {
    return "Android";
    // @ts-expect-error
  } else if (/iPhone|iPad|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  // Default fallback
  return "Unknown";
};
