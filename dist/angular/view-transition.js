import { isKitReducedMotionPreferred } from './theme.service.js';
export const KIT_VT_MEDIA_CLASS = 'kit-vt-media';
export const KIT_VT_MEDIA_ATTR = 'data-kit-vt-media';
export const KIT_VT_RADIUS_FROM_VAR = '--kit-vt-radius-from';
export const KIT_VT_RADIUS_TO_VAR = '--kit-vt-radius-to';
/**
 * Walks `firstChild` pointers down to the deepest active route snapshot.
 */
export function getKitLeafRouteSnapshot(snapshot) {
    let current = snapshot;
    while (current.firstChild) {
        current = current.firstChild;
    }
    return current;
}
/**
 * Builds an Angular Router `onViewTransitionCreated` handler that respects
 * `prefers-reduced-motion: reduce` and coordinates shared-element media
 * `border-radius` morph tokens (`--kit-vt-radius-from` / `--kit-vt-radius-to`)
 * for `.kit-vt-media` view transitions.
 */
export function createKitViewTransitionHandler(options) {
    let activeTransition = null;
    return (info) => {
        const doc = options?.documentRef !== undefined
            ? options.documentRef
            : typeof document !== 'undefined'
                ? document
                : null;
        const root = doc?.documentElement ?? null;
        const clearRoot = () => {
            if (!root)
                return;
            root.removeAttribute(KIT_VT_MEDIA_ATTR);
            root.style.removeProperty(KIT_VT_RADIUS_FROM_VAR);
            root.style.removeProperty(KIT_VT_RADIUS_TO_VAR);
        };
        if ((options?.skipOnReducedMotion ?? true) &&
            isKitReducedMotionPreferred()) {
            activeTransition = null;
            clearRoot();
            info.transition.skipTransition();
            return;
        }
        const fromLeaf = getKitLeafRouteSnapshot(info.from);
        const toLeaf = getKitLeafRouteSnapshot(info.to);
        const morph = options?.resolveMediaRadius?.(fromLeaf, toLeaf, info) ?? null;
        if (morph && root) {
            activeTransition = info.transition;
            root.style.setProperty(KIT_VT_RADIUS_FROM_VAR, morph.from);
            root.style.setProperty(KIT_VT_RADIUS_TO_VAR, morph.to);
            root.setAttribute(KIT_VT_MEDIA_ATTR, 'morph');
            Promise.resolve(info.transition.finished)
                .catch(() => { })
                .finally(() => {
                if (activeTransition === info.transition) {
                    activeTransition = null;
                    clearRoot();
                }
            });
        }
        else {
            activeTransition = null;
            clearRoot();
        }
    };
}
