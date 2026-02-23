/**
 * src/config/index.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Tenant registry and runtime resolver.
 *
 * HOW TENANT SELECTION WORKS
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. At build time, Next.js inlines NEXT_PUBLIC_TENANT_ID into the JS bundle.
 * 2. getTenant() reads the env var (or defaults to 'ajou').
 * 3. It looks up the matching TenantConfig in TENANT_REGISTRY.
 * 4. Every page/component that needs tenant data imports getTenant() once
 *    at the module level — no prop drilling, no Context API overhead.
 *
 * WHY NOT CONTEXT?
 *   Tenant data is 100% static at build time. Shipping it as a plain module
 *   constant is cheaper (no re-render risk) and works in both RSC and Client.
 *
 * ADDING A NEW UNIVERSITY
 * ─────────────────────────────────────────────────────────────────────────────
 *   1. Create  src/config/tenants/<slug>.ts
 *   2. Import and add to TENANT_REGISTRY below
 *   3. Set NEXT_PUBLIC_TENANT_ID in deployment env vars
 */

import type { TenantConfig } from './tenant';
import { ajouTenant } from './tenants/ajou';

// ── Registry ──────────────────────────────────────────────────────────────────
// Add future university configs here.
const TENANT_REGISTRY: Record<string, TenantConfig> = {
  ajou: ajouTenant,
  // snu:   snuTenant,    // TODO: Seoul National University
  // kaist: kaistTenant,  // TODO: KAIST
  // yonsei: yonseiTenant,
};

// ── Resolver ──────────────────────────────────────────────────────────────────

/**
 * Returns the active TenantConfig based on the NEXT_PUBLIC_TENANT_ID
 * environment variable. Falls back to 'ajou' if unset or unknown.
 *
 * This function is safe to call from both RSC and Client Components.
 * The env var is baked in at build time by Next.js.
 */
export function getTenant(): TenantConfig {
  const id = process.env.NEXT_PUBLIC_TENANT_ID ?? 'ajou';
  const tenant = TENANT_REGISTRY[id];

  if (!tenant) {
    console.warn(
      `[getTenant] Unknown tenant id "${id}". Falling back to "ajou".`
    );
    return ajouTenant;
  }

  return tenant;
}

/**
 * Convenience: the active tenant. Import this in most files.
 *
 * @example
 * import { tenant } from '@/config';
 * console.log(tenant.universityName); // '아주대학교'
 */
export const tenant = getTenant();

// Re-export the type so consumers don't need a second import
export type { TenantConfig } from './tenant';
