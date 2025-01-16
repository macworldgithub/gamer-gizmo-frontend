"use client";
import ReactPlayer from "react-player";

export default function Player(props: any) {
  const { src, poster, ...rest } = props;

  const config = {
    file: {
      attributes: {
        poster,
        className: " object-cover max-sm:h-2 max-sm:w-2", // Resizing poster
      },
    },
  };

  return (
    <ReactPlayer
      url={src}
      config={config}
      width="100%"
      height="100%"
      controls
      {...rest}
    />
  );
}
