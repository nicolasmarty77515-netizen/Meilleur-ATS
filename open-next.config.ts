import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default defineCloudflareConfig({
  // Leave incrementalCache off — we rely on SSG (generateStaticParams)
  // and don't use ISR/revalidate in this project.
  // Add an R2-backed cache later if we ever enable ISR.
});
