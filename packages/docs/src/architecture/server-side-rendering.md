# Server Side Rendering

## Context and Background

As Ionic has no Server Side Rendering (SSR) capabilities, we had to find an alternative solution for shipping HTML to crawlers. That's when we introduced the `impromat-app-renderer` as a dedicated package for serving the Single Page Application (SPA) bundle produced by `impromat`.

Responsibility of the app renderer is the pre-rendering of the page including Search Engine Optimizations (SEO) relevant files like the sitemap.xml that contains all urls to crawl.

## References

- [SEO Starter Guide Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Prerender IO](https://prerender.io/)
