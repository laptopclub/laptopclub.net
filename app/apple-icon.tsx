import { ImageResponse } from "next/og";

export const size = {
  height: 180,
  width: 180
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "transparent",
          display: "flex",
          fontSize: 132,
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
