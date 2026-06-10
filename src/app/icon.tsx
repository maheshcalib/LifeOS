import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#102A43",
          color: "white",
          display: "flex",
          fontSize: 24,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          width: "100%"
        }}
      >
        L<span style={{ color: "#A9C1D3" }}>OS</span>
      </div>
    ),
    size
  );
}
