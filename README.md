# `@wesdizzle/app-kit` (`v1.3.0`)

Shared Cloudflare Worker OIDC 1.0 Relying Party, WebCrypto, WebAuthn, Web Push & stateless session infrastructure, D1 $(1 + K)$ Cost Guard / Declarative Schema Diff CLI scripts, Material 3 Expressive semantic CSS tokens, and Angular 21 zoneless `OnPush` shell components.

## Subpath Exports

- **`@wesdizzle/app-kit/worker`**:
  - **Stateless Session & `__Host-` Cookie Helpers**: `signSession`, `verifySession`, `signOidcStateCookie`, `verifyOidcStateCookie`, `HOST_SESSION_COOKIE`, `HOST_OIDC_STATE_COOKIE`, `serializeSessionCookie`, `serializeClearSessionCookies`, `readSessionCookie`, `sanitizeReturnToPath`
  - **OIDC 1.0 + PKCE (`S256`) Verifier**: `verifyOidcIdToken` (enforcing `token_use !== 'access'`, `typ !== 'at+jwt'`, and `email_verified` normalization), `resetOidcJwksCache`
  - **WebCrypto Primitives (`crypto.ts`)**: `base64UrlEncode`, `base64UrlDecode`, `timingSafeEqualBytes`, `timingSafeEqualStrings`, `generateRandomBytes`, `generateRandomToken`, `sha256Bytes`, `sha256Hex`, `sha256Base64Url`, `hmacSha256Bytes`, `hmacSha256Hex`, `derToP1363`, `resolveStrongSecret`
  - **WebAuthn Parser (`webauthn-utils.ts`)**: `parseAuthenticatorData` (RP ID hash, `UP`/`UV`/`BE`/`BS`/`AT` flags, `signCount`, `aaguid`, attested `credentialId`)
  - **Web Push (`web-push.ts`)**: Zero-dependency RFC 8291 (`aes128gcm`) + RFC 8292 (VAPID) `sendWebPushNotification`, `isAllowedPushEndpoint` (HTTPS + port `443` + `redirect: 'error'`)
  - **CSRF & Security Headers**: `isCrossOriginMutatingRequest`, `validateSameOriginMutation`, `buildCspHeader`, `withSecurityHeaders` (CSP without `'unsafe-inline'` in `script-src`, HSTS, `Permissions-Policy`, `X-Frame-Options: DENY`, `nosniff`)
  - **R2 Scheduled Backup (`r2-backup.ts`)**: `performScheduledBackup` (identifier validation, single-pass compact JSON, WebCrypto SHA-256 `head()` zero-download `skipIfUnchanged`, cursor-paginated retention pruning)
- **`@wesdizzle/app-kit/scripts`**:
  - **Pre-Flight SQL Cost Guard**: `auditSqlCost`, `printCostReport`, `runWithD1CostGuard`, `isSecondaryIndexOrigin`, `isTableWithoutRowid`, `splitSqlStatements`
  - **Declarative Schema Differ**: `diffSqliteSchema` (compares R2-hydrated `data/remote_baseline.db` against `:memory:` `migrations/schema.sql`)
  - **Remote D1 Schema Drift Check**: `runD1SchemaDriftCheck`, `detectWranglerDatabaseName`
  - **Static Schema & Query Plan CI Auditor**: `runStaticSchemaCostGuard`
  - **Operational Scripts**: `runWranglerDeploy` (UUID validation, early `--put-secrets` exit, single-build coordination), `runD1PullFromR2`, `hydrateSqliteFromSnapshot`, `runHybridDev` (`taskkill /T /F` on Windows)
- **`@wesdizzle/app-kit/angular`**:
  - `KitAuthService`, `sanitizeClientReturnToPath`, `checkUpstreamOidcStatus`
  - `KitThemeService`, `KIT_THEME_CONFIG`, `KitUserPreferences`, `normalizeKitUserPreferences`, `updateUpstreamPreferences` (`light` / `dark` / `auto` mode with custom `theme-color` & cross-app OIDC Account Server preference sync)
  - `BottomSheetDragController`
  - `KitHeaderBarComponent` (`<kit-header-bar>`)
  - `KitProfileModalComponent` (`<kit-profile-modal>`)
  - `KitPublicBannerComponent` (`<kit-public-banner>`)
  - `KitLandingCardComponent` (`<kit-landing-card>`)
  - `KitFilterBarComponent` (`<kit-filter-bar>`)
  - `KitSelectComponent` (`<kit-select>`), `KitComboboxComponent` (`<kit-combobox>`), `KitMultiSelectComponent` (`<kit-multiselect>`)
  - `KitIconComponent` / `IconComponent` (`<kit-icon>`, `<app-icon>`) & `ICON_CATALOG`
  - `KitConfirmationDialogComponent` / `ConfirmationDialogComponent` (`<kit-confirmation-dialog>`, `<app-confirmation-dialog>`)
  - `KitOfflineStore<T>`, `getScopedStorageKey`
- **`@wesdizzle/app-kit/styles/tokens.css`**:
  - Unified Material 3 Expressive Dark & Light `--kit-*` tokens, WCAG 2.1 AA status tokens, typography (`Outfit`, `Inter`, `JetBrains Mono`), `<kit-public-banner>`, `<kit-filter-bar>`, `:focus-visible`, and `prefers-reduced-motion` rules.
