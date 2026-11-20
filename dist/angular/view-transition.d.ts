export declare const KIT_VT_MEDIA_CLASS = "kit-vt-media";
export declare const KIT_VT_MEDIA_ATTR = "data-kit-vt-media";
export declare const KIT_VT_RADIUS_FROM_VAR = "--kit-vt-radius-from";
export declare const KIT_VT_RADIUS_TO_VAR = "--kit-vt-radius-to";
export interface KitRouteSnapshotLike {
    readonly routeConfig?: {
        readonly path?: string | null;
    } | null;
    readonly params?: Readonly<Record<string, unknown>>;
    readonly firstChild?: KitRouteSnapshotLike | null;
}
export interface KitViewTransitionLike {
    skipTransition(): void;
    readonly finished?: Promise<unknown>;
}
export interface KitRouterViewTransitionInfo<TRoute extends KitRouteSnapshotLike = KitRouteSnapshotLike> {
    readonly transition: KitViewTransitionLike;
    readonly from: TRoute;
    readonly to: TRoute;
}
export interface KitMediaRadiusMorph {
    readonly from: string;
    readonly to: string;
}
export interface KitMediaViewTransitionOptions<TRoute extends KitRouteSnapshotLike = KitRouteSnapshotLike> {
    readonly resolveMediaRadius?: (fromLeaf: TRoute, toLeaf: TRoute, info: KitRouterViewTransitionInfo<TRoute>) => KitMediaRadiusMorph | null;
    readonly skipOnReducedMotion?: boolean;
    readonly documentRef?: Document | null;
}
/**
 * Walks `firstChild` pointers down to the deepest active route snapshot.
 */
export declare function getKitLeafRouteSnapshot<TRoute extends KitRouteSnapshotLike>(snapshot: TRoute): TRoute;
/**
 * Builds an Angular Router `onViewTransitionCreated` handler that respects
 * `prefers-reduced-motion: reduce` and coordinates shared-element media
 * `border-radius` morph tokens (`--kit-vt-radius-from` / `--kit-vt-radius-to`)
 * for `.kit-vt-media` view transitions.
 */
export declare function createKitViewTransitionHandler<TRoute extends KitRouteSnapshotLike = KitRouteSnapshotLike>(options?: KitMediaViewTransitionOptions<TRoute>): (info: KitRouterViewTransitionInfo<TRoute>) => void;
