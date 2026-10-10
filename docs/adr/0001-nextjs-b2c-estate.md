# ADR-0001: Next.js B2C digital estate

**Status:** Superseded by ADR-THA-0018 (§19–21). The B2C business model, retail catalogue, cart, checkout and Medusa commercial architecture are retired. The frontend engineering decisions below (Next.js, React, TypeScript, server-first rendering, SEO, accessibility, performance, independent deployability, adapter-oriented backend integration) are retained.

Use Next.js 15 App Router, React 19, strict TypeScript, Tailwind and server-first rendering. Thamani remains product-agnostic and owns experience only. Baobab Trade remains the commerce system of record. Additional global state, search infrastructure, CMS, micro-frontends and direct ERP/Pulse integrations are rejected until demonstrated requirements justify them.
