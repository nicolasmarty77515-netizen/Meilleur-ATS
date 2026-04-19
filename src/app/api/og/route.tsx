import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Meilleur ATS';
  const subtitle = searchParams.get('subtitle') || 'Comparatif des logiciels de recrutement';
  const rating = searchParams.get('rating');
  const type = searchParams.get('type') || 'default';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: type === 'product'
            ? 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)'
            : type === 'guide'
            ? 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)'
            : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '8px 16px',
              color: 'white',
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            Meilleur ATS
          </div>
          {type === 'product' && (
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '8px 16px',
                color: '#93c5fd',
                fontSize: '16px',
              }}
            >
              Fiche logiciel
            </div>
          )}
          {type === 'guide' && (
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '8px 16px',
                color: '#93c5fd',
                fontSize: '16px',
              }}
            >
              Guide
            </div>
          )}
          {type === 'comparatif' && (
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '8px 16px',
                color: '#fbbf24',
                fontSize: '16px',
              }}
            >
              Comparatif
            </div>
          )}
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: title.length > 40 ? '42px' : '52px',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.2,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#93c5fd',
              maxWidth: '800px',
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ color: '#60a5fa', fontSize: '18px' }}>
            meilleur-ats.fr
          </div>
          {rating && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '12px',
                padding: '10px 20px',
              }}
            >
              <span style={{ color: '#fbbf24', fontSize: '28px' }}>★</span>
              <span style={{ color: 'white', fontSize: '28px', fontWeight: 700 }}>
                {rating}/5
              </span>
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
