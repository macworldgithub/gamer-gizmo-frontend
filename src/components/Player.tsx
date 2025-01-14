"use client";

import ReactPlayer from "react-player";

export default function Player(props: any) {
  const { src, poster, ...rest } = props;

  // const config = {
  //   file: {
  //     attributes: {
  //       poster,
  //     },
  //   },
  // };

  return (
    // <ReactPlayer
    //   url={src}
    //   config={config}
    //   width="100%"
    //   height="100%"
    //   controls
    //   {...rest}
    // />
    <ReactPlayer
      url={src}
      config={{
        youtube: {
          playerVars: {
            modestbranding: 1, // Minimizes the YouTube logo
            rel: 0, // Prevents related videos from showing
            showinfo: 0,
          },
        },
        file: {
          attributes: {
            poster,
          },
        },
      }}
      width="100%"
      height="100%"
      controls
      {...rest}
    />
  );
}
