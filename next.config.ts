import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Le comparatif rédigé Taleez/Flatchr vivait sur un slug non canonique
      // (l'ordre des paires est alphabétique), en doublon de la page générée.
      {
        source: '/comparatif/taleez-vs-flatchr',
        destination: '/comparatif/flatchr-vs-taleez',
        permanent: true,
      },
      {
        source: '/:locale(fr|en)/comparatif/taleez-vs-flatchr',
        destination: '/:locale/comparatif/flatchr-vs-taleez',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
