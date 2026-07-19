# Performance budget

The homepage keeps the cinematic experience, but its first render must not depend on video, 3D, or optional widgets.

- Hero poster: aim for 500 KB or less; it is the only high-priority visual on the homepage.
- Below-the-fold video: `preload="none"`, load only near the viewport, and use a poster or static mobile fallback.
- 3D: load only after the services section is reached; never load the Three.js carousel on mobile or with reduced motion.
- Initial JavaScript: keep feature sections, chatbot, project tools, and internal pages in separate chunks.
- Section images: aim for 100–250 KB for cards and 300–600 KB for backgrounds where image quality permits.

Before publishing new media, verify mobile performance with a cold-cache Lighthouse run. Do not add autoplaying full-resolution video or GLB assets to the initial route.
