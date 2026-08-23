# Design: homepage-feature-nav（FeatureNav 单元内设计决策）

> **Change**: homepage-feature-nav  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / tasks.md / specs/homepage-feature-nav/spec.md  
> **跨单元决策继承自**: 已归档 `wanderchina-homepage/design.md`

---

## Context

本单元设计决策聚焦 3 张卡片的视觉与交互。技术栈、错误隔离、性能预算等跨单元问题已在 wanderchina-homepage 顶层 design 锁定，本单元不重复。

## Goals / Non-Goals

**Goals:**

- 3 张功能卡片（Travel Community / City Guides / AI Travel Assistant），每卡含 emoji + 标题 + 描述 + "Enter →" 按钮
- 响应式网格：桌面 `lg:grid-cols-3` / 平板 `sm:grid-cols-2` / 移动 `grid-cols-1`
- hover 动效：translateY(-4px) + shadow-sm → shadow-lg + 箭头右移 4px
- 全部用 `<Link>` 跳转，启用 prefetch

**Non-Goals:**

- 不做个性化推荐 / 卡片顺序动态化（固定 3 张顺序）
- 不做点击埋点 / analytics
- 不做第 4 张或更多卡片
- 不做卡片内部展开 / 折叠（仅整体点击跳转）
- 不做 emoji 替换为 SVG（本期用 emoji，P1 扩展）

## Decisions

### Decision 1: 卡片配置数据结构

**Context**: 3 张卡片是配置化数据（icon / title / description / href），需要明确类型与默认值位置。

**Decision**:

- 类型定义：`interface FeatureCard { icon: string; title: string; description: string; href: Route; iconBgColor?: string; hoverAccentColor?: string }`
- 默认数组：`DEFAULT_FEATURE_CARDS: FeatureCard[]`（位于 `config/homepage.ts`）
- Props 允许 `cards?: FeatureCard[]` 整体覆盖

**Rationale**:
- 配置与组件分离（团队可独立 PR 修改文案 / icon，无需改组件代码）
- `Route` 类型由 next.js 提供，避免字符串拼写错误
- 可选 color 字段允许未来品牌定制

### Decision 2: 网格布局策略

**Context**: 桌面 / 平板 / 移动三种 viewport 需要不同的列数。

**Decision**:

| 断点 | 列数 |
|---|---|
| 移动（默认） | `grid-cols-1` |
| 平板（≥ 640px） | `sm:grid-cols-2` |
| 桌面（≥ 1024px） | `lg:grid-cols-3` |

间距：`gap-6`（24px），容器 `max-w-7xl mx-auto px-4`

**Rationale**:
- 移动 1 列保证触摸目标 ≥ 44×44px（不被挤窄）
- 平板 2 列让第 3 张单独占第二行第一列（避免 1+2 错位感）
- 桌面 3 列是 3 张卡片的"原始布局"

### Decision 3: hover 动效细节

**Context**: hover 动效要 snappy 但不突兀。

**Decision**:

- `hover:-translate-y-1`（上浮 4px）
- `hover:shadow-lg`（shadow-sm → shadow-lg）
- 箭头 `group-hover:translate-x-1`（右移 4px）
- 过渡 `transition-all duration-200`
- 尊重 `prefers-reduced-motion`：`motion-reduce:hover:translate-y-0`

**Rationale**: 200ms 是 Material Motion 推荐时长；transform 启用 GPU 加速；reduced-motion 下无 transform 防止眩晕。

### Decision 4: Link vs Button

**Context**: 卡片整体可点击跳转，需要明确语义。

**Decision**: 整张卡片是 `<Link>`（不是嵌套 div 套 button）

**Rationale**:
- 语义正确（导航 = Link）
- Next.js `<Link>` 自动 prefetch 命中，导航 < 200ms
- 单一焦点目标（避免 div + button 嵌套的 a11y 问题）
- 整张卡片可点击区域更大（移动端友好）

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|---|---|---|
| 跳转目标 404 | 用户体验断裂 | 卡片本身不感知目标页状态；目标模块未上线时由运维提供友好 "Coming Soon" 页 |
| emoji 在老旧设备显示为方块 | 视觉降级 | emoji 默认 inline-block 不会撑高容器；P1 可替换为 SVG 彻底规避 |
| 平板 2 列下第 3 张单独占行 | 视觉错位感 | 接受此布局（grid 行为）；P1 可改为平板 3 列填满第一行 |
| hover 动效在触摸设备残留 | 移动端体验不一致 | Tailwind `motion-reduce` + 触摸设备无 hover 事件触发（自动避免） |

## 与跨单元决策的对接

| 跨单元决策 | 本单元落地方式 |
|---|---|
| Decision 1（技术栈） | `import Link from 'next/link'` + `interface` 定义 |
| Decision 2（响应式断点） | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` 严格遵循 |
| Decision 3（错误处理） | 不持有任何状态，无 API 调用，零错误隔离风险 |
| Decision 4（性能预算） | 区域级 LCP < 1.5s（纯静态，最快）；Link prefetch 命中 |
| Decision 5（多语言） | 仅英文；`title` / `description` 字符串写死（i18n 预留 props） |
| Decision 6（主题色） | `text-brand-primary` hover 强调色（继承顶层 hex） |

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `tasks.md` / `specs/homepage-feature-nav/spec.md`