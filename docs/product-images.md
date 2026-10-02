# Product capability images

All ten product pages have three locally hosted capability images. The hero dashboard illustrations are unchanged.

The nine pages other than IPS use 27 free Unsplash images. Each image was selected from the free photo results, excluding Unsplash+ and sponsored stock results. The [Unsplash License](https://unsplash.com/license) permits commercial website use without required attribution. The images are downloaded JPEG renditions, cropped to 1400 × 788 and compressed at quality 82; the site does not hotlink to Unsplash.

Each of the 27 source photo pages was individually checked on September 30, 2026 and displayed “Free to use under the Unsplash License.” The source photo page, photographer, download URL, license URL, download date, section assignment, dimensions, and file size are recorded in [product-image-sources.json](product-image-sources.json). The content mappings and accessible descriptions are in `src/content/product-images.data.mjs`.

IPS retains the three owner-supplied images approved on September 30, 2026: `ips-connected-city.jpg`, `ips-threat-network.jpg`, and `ips-virtual-patching.jpg`. They are recorded separately from the newly sourced free Unsplash collection.

Run `npm run build` after changing images or their mappings. Alternating capability panels share the responsive `feature-alt__image` styling: a consistent 16:9 crop on desktop and a single-column layout on smaller screens, with lazy loading and explicit dimensions.

## Verification — September 30, 2026

- Build passed for all 81 site pages.
- All ten product pages render exactly three local capability images with nonempty alt text and no fallback panels; every referenced image exists in the built output.
- All 30 images loaded in Chrome at desktop width and at a 390 px phone viewport. No horizontal overflow was detected. Phone panels use a single 350 px column with 16:9 images.
- The 27 newly sourced JPEGs total 4,551,713 bytes (about 4.34 MiB).
