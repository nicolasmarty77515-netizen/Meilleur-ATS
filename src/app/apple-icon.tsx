import { ImageResponse } from 'next/og';

// Apple touch icon (iOS / iPadOS home screen).
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          M
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 20,
            fontWeight: 600,
            opacity: 0.9,
            letterSpacing: '0.05em',
          }}
        >
          ATS
        </div>
      </div>
    ),
    { ...size }
  );
}
