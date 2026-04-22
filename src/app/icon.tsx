import { ImageResponse } from 'next/og';

// Favicon dynamique (généré à build time).
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)',
          color: 'white',
          fontSize: 22,
          fontWeight: 800,
          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          letterSpacing: '-0.03em',
          borderRadius: 6,
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
