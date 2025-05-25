import React from "react";
import { deflate } from "zlib";
export default function Spacer({ height = 16 }: { height?: number }) {
  return (
    <div
      style={{
        height: `${height}px`,
        width: "100%",
        display: "block",
      }}
    />
  );
  }
