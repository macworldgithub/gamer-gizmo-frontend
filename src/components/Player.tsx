"use client";
import { ClassNames } from "@emotion/react";
import ReactPlayer from "react-player";
export default function Player(props: any) {
  const { src, poster, ...rest } = props;

  const config = {
    file: {
      attributes: {
        poster,
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
