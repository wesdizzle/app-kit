# `@wesdizzle/app-kit`

Shared Cloudflare Worker OIDC 1.0 Relying Party & stateless session infrastructure, D1 $(1 + K)$ Cost Guard & operational CLI scripts, semantic CSS tokens, and Angular 21 shell components.

## Subpath Exports

- `@wesdizzle/app-kit/worker`:
  - Stateless HMAC-SHA256 session & OIDC state cookies (`signSession`, `verifySession`, `signOidcStateCookie`, `verifyOidcStateCookie`)
  - OIDC ID token verifier (`verifyOidcIdToken`, `derToP1363`, `resetOidcJwksCache`)
  - Security & CSRF helpers (`isCrossOriginMutatingRequest`, `withSecurityHeaders`)
  - R2 Scheduled Backup (`performScheduledBackup` with zero-write `skipIfUnchanged` and 30-day retention pruning)
- `@wesdizzle/app-kit/scripts`:
  - Pre-Flight SQL Migration Cost Guard (`auditSqlCost`, `printCostReport`, `runWithD1CostGuard`, `isSecondaryIndexOrigin`, `splitSqlStatements`)
  - Static Schema & Runtime Query Plan CI Auditor (`runStaticSchemaCostGuard`)
  - Secret-Injected Wrangler Deploy (`runWranglerDeploy`)
  - Zero-D1-Read R2 Snapshot Local Hydration (`runD1PullFromR2`, `hydrateSqliteFromSnapshot`)
  - Hybrid Dev Server Orchestrator (`runHybridDev`)
- `@wesdizzle/app-kit/angular`:
  - `KitAuthService` (Upstream OIDC session status & BFCache synchronization)
  - `KitProfileModalComponent` (`<kit-profile-modal>`)
  - `KitHeaderBarComponent` (`<kit-header-bar>`)
  - `KitPublicBannerComponent` (`<kit-public-banner>`)
- `@wesdizzle/app-kit/styles/tokens.css`:
  - Semantic `--kit-*` CSS custom properties and shared modal stylesheet rules
