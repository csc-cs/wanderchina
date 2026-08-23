# Design: homepage-hero（Hero 单元内设计决策）

> **Change**: homepage-hero  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / tasks.md / specs/homepage-hero/spec.md  
> **跨单元决策继承自**: 已归档 `wanderchina-homepage/design.md`（技术栈 / 响应式断点 / 错误处理 / 性能预算 / 多语言 / 主题色）

---

## Context

- 本单元是 wanderchina-homepage 7 单元之一，**单元内设计决策**写在这里
- **跨单元决策**（技术栈 / 断点 / 错误隔离 / 性能预算 / 品牌色 / 字体）见 `wanderchina-homepage/design.md`，本单元不重复定义
- Hero 是首屏 LCP 决定因素，需要在视觉冲击力与首屏性能之间精确平衡

## Goals / Non-Goals

**Goals:**

- 提供全屏 Hero 区（桌面 100vh-56px），含品牌标语 + 副标题 + 双 CTA（保留 children 扩展位）
- 桌面 / 移动两套背景图，移动端降低高度（70vh 不抢首屏）
- 透明 Header 联动：滚动 > 100px 切换为实底白 + 阴影（200ms 过渡）
- 图片加载失败降级为品牌色渐变背景（不显示空白）
- 完整 a11y：H1 唯一 / 焦点环 / `prefers-reduced-motion` 适配

**Non-Goals:**

- 不做视频背景 / Lottie 动画（性能与流量成本过高，留 P1 扩展）
- 不做 CTA 按钮（本期 children 扩展位留空，入口交给 FeatureNav）
- 不做数据获取 / API 调用（纯静态）
- 不做用户登录 OAuth 流程（Header "Sign In" 占位按钮）
- 不做 A/B 测试埋点 / analytics SDK

## Decisions

### Decision 1: 背景图优化策略

**Context**: Hero 是首屏 LCP 决定因素，背景图必须极速加载。

**Decision**:

- 使用 `next/image` + `priority`（首屏 LCP 优化）+ `sizes="100vw"`
- **桌面图** `/images/hero-desktop.jpg`（1920×1080，JPG/WebP/AVIF，< 300KB）
- **移动图** `/images/hero-mobile.jpg`（750×1334，JPG/WebP/AVIF，< 150KB）
- 移动端 `< 768px` 用移动图，桌面端 `≥ 768px` 用桌面图（中间断点 fallback 到桌面版）

**Rationale**: next/image 自动 AVIF/WebP 转换 + 懒加载优先级控制，比手动 `<img>` 高 30%+ LCP。

**Alternatives Considered**:
- 纯 CSS 渐变背景 → **拒绝**（缺视觉冲击力，与品牌定位"现代探索者"不符）
- CSS `background-image` + `background-size: cover` → **拒绝**（无法获得 next/image 的 AVIF 优化）

### Decision 2: 渐变遮罩强度

**Context**: 文字需要白色，必须在图片上叠加深色渐变保证可读性。

**Decision**: `bg-gradient-to-b from-black/30 via-black/40 to-black/60`

**Rationale**:
- 顶部 30% 黑（Header 区需强对比）
- 中部 40% 黑（标题区）
- 底部 60% 黑（视觉收束，引导视线向下）
- 颜色对比度 ≥ 4.5:1（WCAG AA）

### Decision 3: Header 滚动联动阈值

**Context**: 透明 Header 需在合适时机切换实底，避免过早或过晚。

**Decision**: 滚动阈值默认 100px，过渡时长 200ms，使用 `passive: true` 监听

**Rationale**:
- 100px ≈ 首屏 Hero 高度的 10%（70vh=490px 时），既不太早（标题仍可见）也不太晚（用户已开始浏览下方）
- 200ms 过渡是 Material Motion 推荐时长（snappy 但不突兀）
- `passive: true` 避免阻塞滚动（Chrome 滚动性能优化）

### Decision 4: 错误降级策略

**Context**: CDN 故障 / 网络断开时背景图可能 404。

**Decision**:

- Hero section 容器有默认 `bg-gradient-to-br from-brand-primary to-brand-secondary`（即便图片 404 也好看）
- next/image `onError` 仅 `console.warn`，不抛 React error
- 不使用 `<picture>` 标签 fallback（避免额外网络请求）

**Rationale**: 渐变 fallback 是视觉美感兜底，比显示 `alt` 文字或破损图标更优雅。

### Decision 5: 响应式高度策略

**Context**: 移动端不应占满首屏（用户需要看到下方内容预览）。

**Decision**:

| 断点 | 高度 |
|---|---|
| 移动（< 768px） | `h-[70vh]` |
| 平板（≥ 768px） | `h-[80vh]` md: |
| 桌面（≥ 1024px） | `h-[calc(100vh-56px)]` lg: |

**Rationale**:
- 移动端留 30vh 给下方内容露出（用户感知"还有更多"）
- 桌面端减去 56px Header 高度，让 Hero 与 Header 视觉上无缝衔接
- 平板端折中

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|---|---|---|
| Hero 背景图体积过大 | LCP 超 2.5s | 强制图片 < 300KB；CI 加图片体积 lint；用 next/image AVIF 转换 |
| Header 滚动监听内存泄漏 | 多页面切换卡顿 | useEffect cleanup `removeEventListener`（已实现） |
| 移动端 `h-[70vh]` 单位不一致 | 部分设备刘海遮挡 | 加 `safe-area-inset-top` padding |
| prefers-reduced-motion 用户禁用 fade-in | 入场视觉突兀 | 仅 `fade-in` 受影响；图片/文字依然完整呈现 |

## 与跨单元决策的对接

| 跨单元决策 | 本单元落地方式 |
|---|---|
| Decision 1（技术栈 Next.js 14+） | Hero 使用 `'use client'`（含 useEffect 滚动监听 + useState Header 状态） |
| Decision 2（响应式断点） | `h-[70vh] md:h-[80vh] lg:h-[calc(100vh-56px)]` 严格遵循 |
| Decision 3（错误处理边界） | 单元内 try/catch + onError warn；不影响其他 6 单元 |
| Decision 4（性能预算） | LCP < 2.5s / JS bundle < 150KB gzip / 图片 `priority` + `sizes` |
| Decision 5（多语言策略） | 仅英文；`brandTagline` / `brandSubtitle` 通过 props 覆盖（i18n 预留） |
| Decision 6（主题色） | `from-brand-primary to-brand-secondary` Tailwind 主题色（具体 hex 见 design.md Decision 6 顶层） |

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `tasks.md` / `specs/homepage-hero/spec.md` / 已归档 `wanderchina-homepage/design.md`