// @ts-check
import { defineConfig } from 'astro/config';

// If you rename the repo to `FrauBlucher.github.io` (recommended for a personal site),
// the site lives at the domain root and `base` stays as '/'.
// If you keep a different repo name (e.g. `Website_phil`), set base: '/Website_phil/'.
export default defineConfig({
  site: 'https://FrauBlucher.github.io',
  base: '/',
  trailingSlash: 'ignore',
});
