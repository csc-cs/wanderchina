# Design: homepage-page-shell（PageShell 单元内设计决策）

> **Change**: homepage-page-shell  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / tasks.md / specs/homepage-page-shell/spec.md  
> **跨单元决策继承自**: 已归档 `wanderchina-homepage/design.md`

---

## Context

PageShell 是 7 单元中**最特殊的**：它是其他 6 单元的整合者。本单元的设计决策聚焦"Shell 与子单元的契约"以及 SEO metadata。

## Goals / Non-Goals

**Goals:**

- 按顺序组装 6 单元：Header → Hero → FeatureNav → CityQuickEntry → HotPosts → HotSpots → Footer
- Shell 持有 AI 模态框开关 state（`aiOpen`），通过 `onOpen` 注入 AiEntry
- SEO metadata 完整导出（Next.js `metadata` 对象）
- 任意子单元失败不影响其他（依赖单元自治 ErrorBoundary）

**Non-Goals:**

- 不持有业务数据获取（全部由子单元自治）
- 不持有用户认证 / 登录态（本期不实现）
- 不实现 AI 助手模态框的真实逻辑（仅占位）
- 不实现 Service Worker / PWA / 离线缓存
- 不实现全局 ErrorBoundary（留待 `app/error.tsx` 全局配置）

## Decisions

### Decision 1: 渲染顺序

**Context**: 6 单元的视觉顺序影响用户阅读路径。

**Decision**:

```
<HomeShellClient>
  <Header />                          ← 透明/实底联动（Hero 子组件）
  <main>
    <Hero />                          ← 全屏背景 + 标题 + 副标题
    <div max-w-7xl space-y-*>
      <FeatureNav />                  ← 3 张功能卡
      <CityQuickEntry />              ← 8 城市入口
      <HotPosts />                    ← Top 10 帖子
      <HotSpots />                    ← Top 8 景点
    </div>
  </main>
  <Footer />                          ← 版权信息
  <AiEntry onOpen={() => setAiOpen(true)} />     ← FAB
  <AiAssistantModal open={aiOpen} onClose={...} /> ← 占位 Modal
</HomeShellClient>
```

**Rationale**:
- Hero 在最前（首屏视觉冲击）
- FeatureNav 在 Hero 之后（核心入口分流）
- CityQuickEntry 在 FeatureNav 之后（视觉上的"导航延伸"）
- HotPosts / HotSpots 是内容层（最后）

### Decision 2: AI Modal 状态归属

**Context**: Modal 状态放哪？AiEntry / Shell / Modal 自己？

**Decision**: Shell 持有 `aiOpen` state

**Rationale**:
- AiEntry 只需触发 onOpen（解耦）
- Modal 是受控组件（`open` + `onClose`）
- Shell 是状态拥有者（单一数据源）

### Decision 3: SEO Metadata 完整性

**Context**: 搜索引擎 + 社交分享依赖 metadata。

**Decision**:

```typescript
export const metadata: Metadata = {
  title: { default: 'WanderChina · Discover China Like a Local', template: '%s · WanderChina' },
  description: 'English guides, real traveler stories, and a 24/7 AI travel companion — all in one place.',
  keywords: ['China travel', 'English travel guide', 'China tourism', 'Beijing', 'Shanghai'],
  openGraph: {
    title: 'WanderChina',
    description: 'Discover China Like a Local',
    url: 'https://wanderchina.com',
    siteName: 'WanderChina',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WanderChina hero' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WanderChina',
    description: 'Discover China Like a Local',
    images: ['/og-image.jpg'],
  },
};
```

**Rationale**:
- 标题模板让子页面（如 `/guides/beijing`）继承 `WanderChina ·` 前缀
- OG image 1200×630 是社交平台标准
- Twitter card 选 `summary_large_image`（大图吸引点击）

### Decision 4: 单元失败隔离策略

**Context**: HotPosts API 500 时不能让整页崩溃。

**Decision**:

- **单元自治 ErrorBoundary**：每个数据获取单元自带 ErrorBoundary（实现细节在单元内）
- **Shell 不持有全局错误状态**：Shell 不感知任何单元的失败
- **Next.js `error.tsx`**：作为兜底（捕获 Shell 本身错误 + 未被单元捕获的 React error）

**Rationale**:
- 单元自治让 Shell 保持极简（仅组装，不做错误协调）
- 全局 ErrorBoundary 防止"空白页"（最坏情况显示 Next.js 默认错误页）

### Decision 5: 字体加载策略

**Context**: Inter 字体需要预加载以避免 FOUT（Flash of Unstyled Text）。

**Decision**:

- 使用 `next/font/google` 加载 Inter + Noto Sans SC
- 在 `app/layout.tsx` 注入 `<body className={inter.className}>`
- 字体变量在 CSS 变量 `font-sans` 中暴露

**Rationale**:
- `next/font` 自动 subset + preload + self-host（无需外部请求）
- CSS 变量让其他组件能 `font-sans` 引用

### Decision 6: Header 在 Hero 内部 vs Shell 顶层

**Context**: Header 视觉上覆盖 Hero，但状态上需要全局可访问。

**Decision**: Header 由 Hero 组件内部渲染（不是 Shell 顶层）

**Rationale**:
- Header 的"透明/实底"切换由 Hero 区的滚动联动（Hero 必须先渲染才能监听 scrollY）
- Header 不属于"页面骨架"（是 Hero 的子组件）
- 其他 5 单元（FeatureNav 等）不持有 Header

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|---|---|---|
| React Query Provider 边界 | SSR / Client 混用 | 整个 `app/layout.tsx` 注入 Provider；所有数据单元 `'use client'` |
| Modal Portal SSR | 服务端渲染报错 | Modal 组件用 `'use client'` + 条件渲染 `{open && ...}` |
| OG image 体积过大 | 社交分享加载慢 | 1200×630 + JPG 压缩至 < 100KB |
| Header 与 Hero 强耦合 | 重构 Hero 需同步 Header | Header 是 Hero 的子组件，文档化清晰 |

## 与跨单元决策的对接

| 跨单元决策 | 本单元落地方式 |
|---|---|
| Decision 1（技术栈） | Next.js App Router + `metadata` 导出 |
| Decision 2（响应式断点） | `max-w-7xl mx-auto px-4` 容器；`space-y-4 md:space-y-8` 单元间距 |
| Decision 3（错误处理） | Shell 不持有全局错误；单元自治 ErrorBoundary |
| Decision 4（性能预算） | LCP < 2.5s / CLS < 0.1 / JS bundle < 150KB gzip |
| Decision 5（多语言） | 仅英文；metadata 固定文案 |
| Decision 6（主题色） | `bg-gray-50` 页面背景；Header 透明/实底 |

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `tasks.md` / `specs/homepage-page-shell/spec.md`