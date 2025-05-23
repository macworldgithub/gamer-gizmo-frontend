import { useInView } from "react-intersection-observer";
import Player from "./Player"; // Assuming your Player component is here

export function LazyVideo({ src, poster }: any) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2, // Load when 20% of the video enters viewport
  });

  return (
    <div ref={ref} className="w-full h-full">
      {inView ? (
        <Player src={src} poster={poster} />
      ) : (
        <img
          src={poster}
          alt="Video preview"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
