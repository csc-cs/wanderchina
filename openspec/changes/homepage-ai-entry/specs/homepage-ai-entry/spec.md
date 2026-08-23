# Spec: homepage-ai-entry（AI 助手入口能力规范）

> **Capability**: homepage-ai-entry  
> **Change**: homepage-ai-entry  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / design.md / tasks.md  
> **详细设计来源**: 外部 spec 仓库 `specs/homepage-ai-entry.md`

## Purpose

The AI Assistant Entry provides two touch points (a floating action button + a Header button) for invoking the AI assistant modal, which is owned by the Page Shell. This spec defines the high-level Requirements for the entry mechanism only; the modal itself is out of scope.

## ADDED Requirements

### Requirement: Floating Action Button

The system MUST render a floating action button (FAB) at the bottom-right corner of the viewport, sized 56px on desktop and 48px on mobile, fixed in position regardless of scroll.

#### Scenario: Desktop FAB Visible

- **WHEN** user views homepage on viewport ≥ 1024px
- **THEN** a 56px circular FAB is displayed at `bottom: 24px; right: 24px`
- **AND** the FAB uses the brand primary color background with white icon
- **AND** its z-index is 50 (above content, below modals)

#### Scenario: Mobile FAB Visible With Safe Area

- **WHEN** user views on viewport < 768px
- **THEN** a 48px circular FAB is displayed at `bottom: 16px; right: 16px`
- **AND** the bottom offset respects `env(safe-area-inset-bottom)` (not occluded by notches or nav bars)
- **AND** touch target is ≥ 44×44px

#### Scenario: FAB Fixed During Scroll

- **WHEN** user scrolls to any vertical position
- **THEN** the FAB remains fixed at the same viewport coordinates
- **AND** no jitter or layout shift occurs

### Requirement: Header Secondary Entry

The system MUST render an "Ask AI" button in the desktop Header (hidden on mobile).

#### Scenario: Desktop Header Entry Visible

- **WHEN** user views homepage on viewport ≥ 768px
- **THEN** the Header contains an "Ask AI" ghost button (right side)
- **AND** clicking it triggers the same `onOpen` callback as the FAB

#### Scenario: Mobile Header Entry Hidden

- **WHEN** user views homepage on viewport < 768px
- **THEN** the Header "Ask AI" button is hidden (`hidden md:inline-flex`)

### Requirement: onOpen Callback Contract

The system MUST invoke `props.onOpen()` when either the FAB or Header entry is clicked.

#### Scenario: FAB Click Invokes onOpen

- **WHEN** user clicks the FAB
- **THEN** the `onOpen` callback is invoked
- **AND** a log entry is emitted: `[AiEntry] FAB clicked, opening assistant modal`

#### Scenario: onOpen Not Provided

- **WHEN** the Shell forgets to inject `onOpen`
- **THEN** the browser console logs a single `warn`: `[AiEntry] onOpen callback is not provided`
- **AND** no React error is thrown
- **AND** the UI does not display any error state

### Requirement: Hover Feedback

The system MUST provide visual feedback when the user hovers over the FAB (desktop only).

#### Scenario: FAB Hover Scale

- **WHEN** user hovers the FAB with a mouse
- **THEN** the FAB scales to 1.05 (`hover:scale-105`)
- **AND** the shadow upgrades from `shadow-lg` to `shadow-2xl`
- **AND** the transition completes in 200ms

#### Scenario: FAB Tooltip After Delay

- **WHEN** user hovers the FAB for 1.5 seconds continuously
- **THEN** a tooltip "Ask AI Assistant" is displayed (left of the FAB, dark background, white text)

#### Scenario: Reduced Motion Disables Scale

- **WHEN** `prefers-reduced-motion: reduce` is enabled
- **THEN** the FAB does not scale on hover
- **AND** the shadow change still applies (so the hover state remains visible)

### Requirement: Accessibility

The system MUST expose both entry points to assistive technologies.

#### Scenario: ARIA Labels Present

- **WHEN** assistive technology scans the page
- **THEN** both FAB and Header entry have `aria-label="Open AI Assistant"`

#### Scenario: Keyboard Activation

- **WHEN** user tabs to either entry and presses Enter or Space
- **THEN** the click handler fires and `onOpen` is invoked

#### Scenario: Focus Ring Visible

- **WHEN** either entry receives keyboard focus
- **THEN** a focus ring is visible (`focus-visible:ring-2`)

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `design.md` / `tasks.md` / 已归档 `wanderchina-homepage/specs/wanderchina-homepage/spec.md`