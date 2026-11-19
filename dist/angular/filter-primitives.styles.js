export const KIT_FILTER_DROPDOWN_BASE_CSS = `
  kit-select,
  kit-combobox,
  kit-multiselect {
    display: block;
    min-width: 0;
    max-width: 100%;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .flex {
    display: flex;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .items-center {
    align-items: center;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .justify-between {
    justify-content: space-between;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .gap-xs {
    gap: 6px;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .gap-sm {
    gap: 10px;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .pr-xs {
    padding-right: 4px;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .filter-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-8, 8px);
    min-width: 0;
    max-width: 100%;
    width: 100%;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .filter-group-header {
    display: flex;
    align-items: center;
    min-height: 20px;
    gap: 8px;
    flex-wrap: wrap;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .m3-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--kit-primary);
    margin-left: 4px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    line-height: 1;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .dropdown-wrapper.active-wrapper {
    z-index: 60;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .m3-input {
    box-sizing: border-box;
    height: var(--kit-input-height, 46px);
    background: var(--kit-surface-container-high);
    border: 1px solid var(--kit-outline);
    color: var(--kit-on-surface);
    padding: 0 2.75rem 0 1rem;
    border-radius: var(--kit-radius-sm);
    font-family: var(--kit-font-sans);
    font-size: var(--kit-input-font-size, 0.9375rem);
    line-height: normal;
    outline: none;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease,
      box-shadow 0.2s ease;
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .m3-input:hover:not(:disabled) {
    background: var(--kit-surface-container-highest);
    border-color: var(--kit-outline);
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .m3-input:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .m3-input:focus,
  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .dropdown-trigger.open,
  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .list-input.open {
    border-color: var(--kit-primary);
    background: var(--kit-surface-container-highest);
    box-shadow: 0 0 0 1px var(--kit-primary);
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .dropdown-icon-wrapper {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    color: var(--kit-on-surface-variant);
    transition: color 0.2s ease;
    z-index: 1;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .dropdown-chevron {
    width: 18px;
    height: 18px;
    transition:
      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      color 0.2s ease;
    flex-shrink: 0;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .dropdown-chevron.open {
    transform: rotate(180deg);
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .input-wrapper:hover
    .dropdown-icon-wrapper,
  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .input-wrapper:focus-within
    .dropdown-icon-wrapper,
  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .dropdown-trigger.open
    .dropdown-icon-wrapper {
    color: var(--kit-primary);
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .dropdown-trigger {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    text-align: left;
    padding-left: 1rem;
    padding-right: 2.75rem;
    position: relative;
    user-select: none;
    min-width: 0;
    max-width: 100%;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .trigger-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @keyframes kitDropdownEnter {
    from {
      opacity: 0;
      transform: translateY(-6px) scaleY(0.92);
    }
    to {
      opacity: 1;
      transform: translateY(0) scaleY(1);
    }
  }

  @keyframes kitCheckPop {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .dropdown-list,
  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .dropdown-list.animate-expressive {
    position: absolute;
    top: calc(100% + 6px);
    left: var(--kit-dropdown-left, 0);
    right: var(--kit-dropdown-right, auto);
    min-width: 100%;
    width: var(--kit-dropdown-width, max-content);
    max-width: var(--kit-dropdown-max-width, min(340px, calc(100vw - 48px)));
    z-index: 100;
    background: var(--kit-surface-container-high);
    backdrop-filter: blur(20px) contrast(95%);
    -webkit-backdrop-filter: blur(20px) contrast(95%);
    border: 1px solid var(--kit-outline);
    border-radius: var(--kit-radius-sm);
    padding: 0.375rem 0;
    max-height: 280px;
    overflow-y: auto;
    box-shadow: 0 12px 36px 0 rgba(0, 0, 0, 0.45);
    scrollbar-width: thin;
    scrollbar-color: var(--kit-outline-variant) transparent;
    transform-origin: top center;
    animation: kitDropdownEnter 180ms var(--kit-ease-spring) both;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .dropdown-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.625rem 1rem;
    cursor: pointer;
    user-select: none;
    background: transparent;
    border: none;
    font-family: var(--kit-font-sans);
    font-size: 0.875rem;
    color: var(--kit-on-surface);
    text-align: left;
    transition:
      background-color 0.15s ease,
      color 0.15s ease;
    gap: 0.75rem;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .dropdown-item:hover {
    background: var(--kit-surface-container-highest);
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .dropdown-item.selected {
    background: var(--m3-secondary-container, var(--kit-primary-container));
    color: var(--m3-on-secondary-container, var(--kit-on-primary-container));
    font-weight: 600;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .dropdown-item.selected
    .selected-check {
    color: var(--m3-on-secondary-container, var(--kit-on-primary-container));
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .selected-check {
    color: var(--kit-primary);
    flex-shrink: 0;
    animation: kitCheckPop 180ms var(--kit-ease-spring) both;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .item-label {
    font-size: 0.875rem;
    color: inherit;
    text-transform: none;
    letter-spacing: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .dropdown-group-header {
    padding: 0.6rem 1rem 0.25rem 1rem;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--kit-primary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    pointer-events: none;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .child-platform {
    padding-left: 1.75rem;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .sub-platform-arrow {
    color: var(--kit-on-surface-variant);
    margin-right: 0.35rem;
    font-size: 0.85rem;
  }

  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)
    .dropdown-empty {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    color: var(--kit-on-surface-variant);
    text-align: center;
  }
`;
export const KIT_SELECT_CSS = `
  kit-select .quick-sort-wrapper {
    width: 100%;
    min-width: 0;
    flex: 0 1 190px;
  }

  kit-select .quick-sort-trigger {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
  }

  kit-select .sort-icon-prefix {
    display: inline-flex;
    align-items: center;
    color: var(--kit-on-surface-variant);
    flex-shrink: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    kit-select * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
export const KIT_COMBOBOX_CSS = `
  :is(.kit-filter-bar, kit-combobox) .combobox-wrapper {
    position: relative;
  }

  :is(.kit-filter-bar, kit-combobox) .combobox-wrapper.active-wrapper {
    z-index: 60;
  }

  :is(.kit-filter-bar, kit-combobox) .list-input {
    cursor: text;
  }

  :is(.kit-filter-bar, kit-combobox) .combobox-chevron-btn {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 2.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--kit-on-surface-variant);
    z-index: 2;
    padding: 0;
  }

  :is(.kit-filter-bar, kit-combobox)
    .combobox-chevron-btn:hover
    .dropdown-icon-wrapper {
    color: var(--kit-primary);
  }

  :is(.kit-filter-bar, kit-combobox) .m3-checkbox-label {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--kit-on-surface-variant);
    cursor: pointer;
    user-select: none;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  :is(.kit-filter-bar, kit-combobox) .m3-checkbox {
    width: 14px;
    height: 14px;
    accent-color: var(--kit-primary);
    cursor: pointer;
  }

  @media (prefers-reduced-motion: reduce) {
    kit-combobox * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
export const KIT_MULTISELECT_CSS = `
  :is(.kit-filter-bar, kit-multiselect) .checkbox-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
  }

  :is(.kit-filter-bar, kit-multiselect) .dropdown-clear-btn {
    display: block;
    width: calc(100% - 1.5rem);
    margin: 0.25rem 0.75rem 0.5rem 0.75rem;
    padding: 0.55rem;
    text-align: center;
    background: var(--kit-primary-container);
    color: var(--kit-on-primary-container);
    border: none;
    border-radius: var(--kit-radius-full);
    font-family: var(--kit-font-sans);
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.2s ease;
  }

  :is(.kit-filter-bar, kit-multiselect)
    .dropdown-clear-btn:hover:not(:disabled) {
    background: var(--kit-primary);
    color: var(--kit-on-primary);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  :is(.kit-filter-bar, kit-multiselect) .dropdown-clear-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: var(--kit-surface-container-highest);
    color: var(--kit-on-surface-variant);
  }

  :is(.kit-filter-bar, kit-multiselect) .m3-checkbox {
    width: 14px;
    height: 14px;
    accent-color: var(--kit-primary);
    cursor: pointer;
  }

  @media (prefers-reduced-motion: reduce) {
    kit-multiselect * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
export const KIT_FILTER_BAR_CSS = `
  .kit-filter-bar {
    display: block;
    position: relative;
    z-index: 20;
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .kit-filter-bar .mb-lg {
    margin-bottom: var(--spacing-32, 24px);
  }

  .kit-filter-bar .filter-bar {
    background: var(--kit-surface-container);
    border-radius: var(--kit-radius-md);
    border: 1px solid var(--kit-outline-variant);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 20;
    padding: var(--spacing-16, 16px) var(--spacing-24, 24px);
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .kit-filter-bar .filter-group {
    min-width: 160px;
  }

  .kit-filter-bar .toolbar-auxiliary-row {
    margin-top: 12px;
  }

  .kit-filter-bar .count-badge {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--kit-on-surface-variant);
  }

  .kit-filter-bar .sync-timestamp {
    font-size: 0.78rem;
    color: var(--kit-on-surface-variant);
    opacity: 0.85;
  }

  .kit-filter-bar .view-toggle-group {
    display: inline-flex;
    align-items: center;
    background: var(--kit-surface-container-high);
    border: 1px solid var(--kit-outline);
    border-radius: var(--kit-radius-sm);
    padding: 3px;
    gap: 2px;
    box-sizing: border-box;
    height: 46px;
  }

  .kit-filter-bar .view-toggle-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: var(--kit-on-surface-variant);
    border: none;
    border-radius: calc(var(--kit-radius-sm) - 4px);
    width: 38px;
    height: 38px;
    cursor: pointer;
    transition:
      background-color var(--kit-duration-fast) var(--kit-ease-standard),
      color var(--kit-duration-fast) var(--kit-ease-standard),
      transform var(--kit-duration-fast) var(--kit-ease-spring),
      box-shadow var(--kit-duration-fast) var(--kit-ease-standard);
  }

  .kit-filter-bar .view-toggle-btn:hover {
    background: var(--kit-surface-container-highest);
    color: var(--kit-on-surface);
  }

  .kit-filter-bar .view-toggle-btn:active {
    transform: scale(0.94);
  }

  .kit-filter-bar .view-toggle-btn.active {
    background: var(--kit-primary);
    color: var(--kit-on-primary);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .kit-filter-bar .quick-toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    flex-wrap: wrap;
  }

  .kit-filter-bar .quick-search-box {
    position: relative;
    flex: 1 1 240px;
    min-width: 180px;
    display: flex;
    align-items: center;
  }

  .kit-filter-bar .search-icon-wrapper {
    position: absolute;
    left: 0.875rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--kit-on-surface-variant);
    display: flex;
    align-items: center;
    z-index: 1;
  }

  .kit-filter-bar .quick-search-input {
    padding-left: 2.5rem !important;
    padding-right: 2.25rem !important;
  }

  .kit-filter-bar .clear-search-btn {
    position: absolute;
    right: 0.625rem;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: var(--kit-on-surface-variant);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 50%;
    transition:
      background-color 0.15s ease,
      color 0.15s ease;
    z-index: 2;
  }

  .kit-filter-bar .clear-search-btn:hover {
    background: var(--kit-surface-container-highest);
    color: var(--kit-on-surface);
  }

  .kit-filter-bar .segmented-status-group {
    display: inline-flex;
    align-items: center;
    background: var(--kit-surface-container-high);
    border: 1px solid var(--kit-outline);
    border-radius: var(--kit-radius-full);
    padding: 3px;
    gap: 2px;
    height: 46px;
    box-sizing: border-box;
  }

  .kit-filter-bar .status-pill-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: transparent;
    border: none;
    border-radius: var(--kit-radius-full);
    padding: 0.3125rem 0.75rem;
    font-family: var(--kit-font-sans);
    font-size: 0.78125rem;
    font-weight: 600;
    color: var(--kit-on-surface-variant);
    cursor: pointer;
    transition:
      background-color 200ms var(--kit-ease-emphasized),
      color 180ms var(--kit-ease-standard),
      transform var(--kit-duration-fast) var(--kit-ease-spring),
      box-shadow 200ms var(--kit-ease-standard);
    white-space: nowrap;
    height: 38px;
  }

  .kit-filter-bar .status-pill-btn:hover {
    color: var(--kit-on-surface);
    background: var(--kit-surface-container-highest);
  }

  .kit-filter-bar .status-pill-btn:active {
    transform: scale(0.96);
  }

  .kit-filter-bar .status-pill-btn.active {
    background: var(--kit-primary);
    color: var(--kit-on-primary);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .kit-filter-bar .status-pill-btn.deals-pill.active {
    background: #ef4444;
    color: #ffffff;
    box-shadow: 0 1px 4px rgba(239, 68, 68, 0.4);
  }

  .kit-filter-bar .pill-fire-icon {
    display: inline-flex;
    align-items: center;
    line-height: 1;
  }

  .kit-filter-bar .quick-toolbar > kit-select {
    display: block;
    min-width: 170px;
    flex: 0 1 190px;
    max-width: 100%;
  }

  .kit-filter-bar .quick-sort-wrapper {
    width: 100%;
    min-width: 0;
    flex: 0 1 190px;
  }

  .kit-filter-bar .quick-sort-trigger {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
  }

  .kit-filter-bar .sort-icon-prefix {
    display: inline-flex;
    align-items: center;
    color: var(--kit-on-surface-variant);
    flex-shrink: 0;
  }

  .kit-filter-bar .more-filters-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 46px;
    padding: 0 16px;
    border-radius: var(--kit-radius-sm);
    border: 1px solid var(--kit-outline);
    background: var(--kit-surface-container-high);
    color: var(--kit-on-surface);
    font-family: var(--kit-font-sans);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .kit-filter-bar .more-filters-btn:hover {
    background: var(--kit-surface-container-highest);
  }

  .kit-filter-bar .more-filters-btn.drawer-active {
    border-color: var(--kit-primary);
    background: var(--m3-secondary-container, var(--kit-primary-container));
    color: var(--m3-on-secondary-container, var(--kit-on-primary-container));
  }

  @keyframes kitBadgePop {
    from {
      opacity: 0;
      transform: scale(0.6);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes kitDrawerInnerClip {
    0%,
    99% {
      overflow: hidden;
    }
    100% {
      overflow: visible;
    }
  }

  .kit-filter-bar .filter-count-badge {
    background: var(--kit-primary);
    color: var(--kit-on-primary);
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 999px;
    padding: 1px 7px;
    line-height: 1.4;
    animation: kitBadgePop 200ms var(--kit-ease-spring) both;
  }

  .kit-filter-bar .secondary-filters-drawer {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 1fr;
    width: 100%;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--kit-outline-variant);
    opacity: 1;
    visibility: visible;
    transition:
      grid-template-rows var(--kit-duration-medium) var(--kit-ease-smooth),
      opacity 200ms var(--kit-ease-standard),
      margin-top var(--kit-duration-medium) var(--kit-ease-smooth),
      padding-top var(--kit-duration-medium) var(--kit-ease-smooth),
      border-top-width 200ms var(--kit-ease-standard),
      visibility 0s linear 0s;
  }

  .kit-filter-bar .secondary-filters-drawer-inner {
    min-height: 0;
    min-width: 0;
    max-width: 100%;
    overflow: visible;
  }

  .kit-filter-bar
    .secondary-filters-drawer:not(.drawer-collapsed)
    .secondary-filters-drawer-inner {
    animation: kitDrawerInnerClip var(--kit-duration-medium) step-end both;
  }

  .kit-filter-bar .secondary-filters-drawer.drawer-collapsed {
    grid-template-rows: 0fr;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    overflow: hidden;
    margin-top: 0;
    padding-top: 0;
    border-top-width: 0;
    transition:
      grid-template-rows var(--kit-duration-medium) var(--kit-ease-smooth),
      opacity 160ms var(--kit-ease-exit),
      margin-top var(--kit-duration-medium) var(--kit-ease-smooth),
      padding-top var(--kit-duration-medium) var(--kit-ease-smooth),
      border-top-width 160ms var(--kit-ease-exit),
      visibility 0s linear var(--kit-duration-medium);
  }

  .kit-filter-bar
    .secondary-filters-drawer.drawer-collapsed
    .secondary-filters-drawer-inner {
    overflow: hidden;
    animation: none;
  }

  .kit-filter-bar .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }

  .kit-filter-bar .drawer-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .kit-filter-bar .drawer-heading {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--kit-on-surface);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .kit-filter-bar .active-tag {
    background: var(--kit-primary-container);
    color: var(--kit-on-primary-container);
    font-size: 0.75rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: var(--kit-radius-full);
  }

  .kit-filter-bar .drawer-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .kit-filter-bar .reset-filters-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: 1px solid var(--kit-outline);
    border-radius: var(--kit-radius-full);
    padding: 0.375rem 0.875rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--kit-primary);
    cursor: pointer;
    transition: all 0.2s;
  }

  .kit-filter-bar .reset-filters-btn:hover {
    background: var(--kit-surface-container-highest);
    border-color: var(--kit-primary);
  }

  .kit-filter-bar .drawer-close-btn {
    background: transparent;
    border: none;
    color: var(--kit-on-surface-variant);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 50%;
    transition: all 0.2s;
  }

  .kit-filter-bar .drawer-close-btn:hover {
    background: var(--kit-surface-container-highest);
    color: var(--kit-on-surface);
  }

  .kit-filter-bar .secondary-filters-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-end;
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .kit-filter-bar .secondary-filters-grid > kit-select,
  .kit-filter-bar .secondary-filters-grid > kit-combobox,
  .kit-filter-bar .secondary-filters-grid > kit-multiselect {
    display: block;
    min-width: 0;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    .kit-filter-bar .filter-bar {
      padding: 16px;
    }
    .kit-filter-bar .quick-toolbar {
      gap: 8px;
    }
    .kit-filter-bar .quick-search-box {
      flex: 1 1 100%;
      min-width: 0;
      max-width: 100%;
    }
    .kit-filter-bar .segmented-status-group {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      max-width: 100%;
      height: auto;
      background: transparent;
      border: none;
      border-radius: 0;
      padding: 0;
      gap: 6px;
      justify-content: flex-start;
      flex-shrink: 0;
      overflow: visible;
    }
    .kit-filter-bar .status-pill-btn {
      height: 32px;
      padding: 0.25rem 0.6875rem;
      font-size: 0.75rem;
      background: var(--kit-surface-container-high);
      border: 1px solid var(--kit-outline);
      border-radius: var(--kit-radius-full);
      flex-shrink: 0;
    }
    .kit-filter-bar .status-pill-btn.active {
      background: var(--kit-primary);
      color: var(--kit-on-primary);
      border-color: var(--kit-primary);
    }
    .kit-filter-bar .status-pill-btn.deals-pill.active {
      background: #ef4444;
      color: #ffffff;
      border-color: #dc2626;
    }
    .kit-filter-bar .quick-toolbar > kit-select {
      flex: 1 1 0;
      min-width: 0;
      max-width: 100%;
    }
    .kit-filter-bar .quick-sort-wrapper {
      flex: 1 1 0;
      min-width: 0;
      width: 100%;
    }
    .kit-filter-bar .secondary-filters-grid > kit-select,
    .kit-filter-bar .secondary-filters-grid > kit-combobox,
    .kit-filter-bar .secondary-filters-grid > kit-multiselect,
    .kit-filter-bar .secondary-filters-grid > .filter-group {
      min-width: 0;
      max-width: 100%;
      flex: 1 1 calc(50% - 8px);
    }
    .kit-filter-bar .filter-group {
      min-width: 0;
      max-width: 100%;
      width: 100%;
      flex: 1 1 calc(50% - 8px);
    }
    .kit-filter-bar .secondary-filters-grid .dropdown-list,
    .kit-filter-bar .secondary-filters-grid .dropdown-list.animate-expressive {
      max-width: 100%;
    }
    .kit-filter-bar .toolbar-auxiliary-row {
      flex-wrap: wrap;
      gap: 8px;
    }
  }

  @media (max-width: 480px) {
    .kit-filter-bar .secondary-filters-grid > kit-select,
    .kit-filter-bar .secondary-filters-grid > kit-combobox,
    .kit-filter-bar .secondary-filters-grid > kit-multiselect,
    .kit-filter-bar .secondary-filters-grid > .filter-group,
    .kit-filter-bar .filter-group {
      flex: 1 1 100%;
      width: 100%;
    }
    .kit-filter-bar .secondary-filters-grid .dropdown-list,
    .kit-filter-bar .secondary-filters-grid .dropdown-list.animate-expressive {
      width: 100%;
      max-width: 100%;
    }
    .kit-filter-bar .toolbar-auxiliary-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
    .kit-filter-bar .toolbar-auxiliary-row .view-toggle-group {
      align-self: flex-end;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .kit-filter-bar * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
