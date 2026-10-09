import { ImageResponse } from "next/og";

export const size = {
  height: 32,
  width: 32
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "transparent",
          display: "flex",
          fontSize: 24,
          height: "100%",
          justifyContent: "center",
          lineHeight: 1,
          width: "100%"
        }}
      >
        🤘
      </div>
    ),
    size
  );
}
