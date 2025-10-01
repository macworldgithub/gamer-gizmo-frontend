import { useInView } from "react-intersection-observer";
import Player from "./Player";

export function LazyVideo({ src, poster }: any) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
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
