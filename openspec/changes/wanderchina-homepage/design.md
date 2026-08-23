# Design: wanderchina-homepage（跨单元关键技术决策）

> **Change**: wanderchina-homepage  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-23  
> **Related**: proposal.md / tasks.md / specs/wanderchina-homepage/spec.md  
> **Spec 单元来源**: 阶段 2 计划把 7 个 spec 单元迁移至本仓库 `docs/specs/`；当前引用 [上游 spec 仓库（外部）](https://example.com/specs-repository)（路径待补）

---

## Context

- **WanderChina** 是一个面向外国游客的中国入境旅游平台
- **首页（P0 模块）** 已拆分为 7 个独立可开发的 spec 单元（详见 `proposal.md` 与 `docs/specs/` 阶段 2 迁移后的位置）
- **技术栈已确定**（详见本 design.md Decision 1 与 7 个 spec 单元文件）
- **团队约束**：3 周开发周期 / 1 人 + AI 助手 / 不含支付酒店机票
- **当前 change 的目标**：定义首页 7 个单元的**跨单元**设计决策（每个单元内部决策见各自 spec 文件）

## Goals / Non-Goals

**Goals:**

- 定义 7 个单元共享的**基础设施**（React Query Provider / Tailwind 主题 / shadcn/ui 配置 / 错误处理边界）
- 明确 7 个单元的**依赖图**与**集成顺序**
- 设定**性能预算**与**可访问性最低标准**（每个单元都应满足）
- 明确**响应式断点**与**多语言策略**

**Non-Goals:**

- 不在 design 层重复各单元内部的设计决策（详见各自 spec 文件）
- 不定义后端 API 接口（依赖现有 `/api/homepage/*` Spring Boot 端点）
- 不定义用户认证 / 登录态（本期首页不持有登录态）
- 不定义国际化切换 UI（仅英文）
- 不定义 Service Worker / PWA / 离线缓存

## Decisions

### Decision 1: 技术栈锁定

**Context**: 7 个单元需要统一技术栈，避免风格漂移。

**Decision**:

| 层 | 选型 | 版本 |
|---|---|---|
| 框架 | Next.js（App Router） | 14+ |
| UI 库 | React | 18+ |
| 语言 | TypeScript（strict mode） | 5+ |
| 样式 | Tailwind CSS | 3+ |
| 组件库 | shadcn/ui（基于 Radix） | latest |
| 数据获取 | TanStack Query（React Query） | 5+ |
| 图标 | lucide-react | latest |
| HTTP | fetch（原生） | - |
| 测试（单元） | Vitest + React Testing Library | latest |
| 测试（E2E） | Playwright | latest |
| Mock | MSW（Mock Service Worker） | latest |

**Rationale**:
- Next.js 15 App Router + shadcn/ui 是当前 Next.js 生态最佳实践（Server Components / Server Actions）
- 团队后端基于 Spring Boot 3.2（已有 `/api/homepage/*` 端点），可直接对接
- TypeScript strict 模式减少运行时错误；React Query 提供统一的 loading/error 模式

**Alternatives Considered**:
- 沿用 Vue 3 → **拒绝**（与 frontend-stack 决策冲突；团队精力应聚焦）
- 用 Apollo Client 替代 React Query → **拒绝**（首页无 GraphQL 后端；React Query 更轻量）

### Decision 2: 响应式断点

**Context**: 7 个单元覆盖移动端/平板/桌面三种 viewport。

**Decision**（沿用 Tailwind 默认断点 + 业务微调）：

| 断点 | 宽度 | 设备 | 单元适配 |
|---|---|---|---|
| 默认（mobile-first） | < 640px | 手机 | Hero 单列 / FeatureNav 横滑 / CityQuickEntry 横滑 / HotPosts 横滑 / HotSpots 横滑 |
| `sm:` | ≥ 640px | 大屏手机 | 同上 |
| `md:` | ≥ 768px | 平板 | Hero 双列 / FeatureNav 3×2 / CityQuickEntry 2×4 / HotPosts 2 列 / HotSpots 2 列 |
| `lg:` | ≥ 1024px | 桌面 | Hero 全宽 / FeatureNav 6×1 / CityQuickEntry 4×2 / HotPosts 1+3+6 / HotSpots 4×2 |
| `xl:` | ≥ 1280px | 大屏桌面 | 同 lg + max-width: 1280px 容器 |

**Rationale**:
- 沿用 Tailwind 默认断点降低团队认知负担
- mobile-first 优先（目标用户 70%+ 是手机访问的外国游客）
- 桌面端只是"加分项"，不强求 4K 适配

### Decision 3: 错误处理边界

**Context**: 7 个单元中，6 个有 API 调用（除 FeatureNav 是纯静态图标）。单个单元失败不应影响其他。

**Decision**:

| 场景 | 处理 |
|---|---|
| 单个单元 API 500 | 该单元显示 `Error UI + Retry` 按钮；其他单元正常渲染 |
| 单个单元网络断开 | 同上（React Query 自动 retry 3 次） |
| 全部单元 API 失败 | 显示全页错误页（保留 Header / Footer） |
| JavaScript 加载失败 | Next.js 默认错误页 |
| 401 未登录（如未来引入） | 跳登录页（本期不实现） |

**实现**：
- 每个单元组件**自治**：try/catch + ErrorBoundary + React Query `retry: 3`
- PageShell **不持有全局错误状态**（避免一处错误导致整页崩溃）
- 错误日志统一上报 `console.warn` + 未来可接入 Sentry（本期不实现）

**Rationale**:
- "故障隔离"是首页 P0 级别的可靠性要求（外国游客对错误容忍度低）
- 自治错误处理让 Shell 保持极简（仅组装，不做错误协调）

### Decision 4: 性能预算

**Context**: 首页 LCP 直接影响外国游客的首次体验。

**Decision**:

| 指标 | 目标 | 测量方法 |
|---|---|---|
| 首屏 LCP | < 2.5s | Lighthouse / WebPageTest |
| 首屏 CLS | < 0.1 | Lighthouse |
| 首屏 JS bundle（gzip） | < 150KB | `next build` 输出 |
| 首屏 TTI（可交互时间） | < 3.5s | Lighthouse |
| API 响应（p95） | < 500ms | 后端日志 |
| Hero 区 LCP | < 1.5s | 各单元区域级 Lighthouse |
| HotPosts/HotSpots 区域级 LCP | < 2s | 各单元区域级 Lighthouse |
| 图片 lazy load | 首屏外所有图片 | next/image 默认 |

**Rationale**:
- 外国游客多在弱网（机场、酒店 WiFi），LCP < 2.5s 是 Google Core Web Vitals 的"良好"门槛
- JS bundle < 150KB 保证首屏不卡顿（gzip 后）
- 各单元独立 LCP 目标保证"最坏区域"也能达标

### Decision 5: 多语言策略

**Context**: WanderChina 目标用户是外国游客。

**Decision**:
- **本期仅英文**（UI 文案 / 错误提示 / 时间格式）；**不创建 `locales/` 目录**
- **文案集中化（轻度预留）**：硬编码英文文案抽到 `config/copy.ts` 常量对象（便于未来替换为 i18n key）
- **时间格式**：英文 `"2h ago"` / `"3d ago"`（不本地化）
- **数字格式**：英文千分位 `12,453` / 浏览量 `12.5k`（不本地化）

**Rationale**:
- 简化本期开发（3 周周期）；常量集中化便于后续重构为 i18n 但不引入 i18n 库依赖
- 外国游客默认接受英文 UI
- **避免引入 next-intl / react-i18next**：会增加首屏 JS bundle（与 Decision 4 性能预算冲突）

### Decision 6: 主题与品牌色

**Context**: 7 个单元需统一视觉风格。

**Decision**（详见本仓库 `docs/style-proposal.md` 风格提案，阶段 1 同步落地）：

| 元素 | 选型 |
|---|---|
| 主品牌色 | Deep Emerald `#047857` |
| 辅助色 | Warm Coral `#F97066` |
| 字体 | Inter（next/font/google 加载） |
| 中文备选字体 | Noto Sans SC（次级回退） |
| 圆角 | `rounded-2xl`（卡片）/ `rounded-full`（FAB） |
| 阴影 | `shadow-sm`（默认）/ `shadow-lg`（hover） |

**Rationale**:
- 与品牌定位"现代探索者"匹配（Emerald = 自然 / Coral = 热情）
- 阶段 1 任务 1.7 同步落地 `tailwind.config.ts` 主题色扩展

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|---|---|---|
| 7 个单元并行开发，依赖冲突 | 集成时出现 props 不一致 / 主题色不统一 | 阶段 1 先建基础设施（Tailwind config + shadcn/ui + 类型定义），其他 6 单元并行 |
| React Query 全局 Provider 在 Server Component 边界 | 客户端组件嵌套深度增加 | 所有需要数据的单元统一 `'use client'`；Provider 在 `app/providers.tsx` 注入 |
| Mobile-first 横滑在低端 Android 卡顿 | 用户体验差 | 使用 `snap-x snap-mandatory` + `scroll-smooth`；禁止引入重动画库 |
| 7 个 spec 文件跨仓引用（当前指向外部 spec 仓库） | 未来 WanderChina 独立后引用失效 | **阶段 2（任务 1.10 之前）** 把 7 个 spec 复制到 `wanderchina/docs/specs/`；OpenSpec change 改为引用 `docs/specs/homepage-*.md` 相对路径 |
| Spring Boot 后端接口未到位 | 前端无法联调 | 用 MSW mock 完整实现 `/api/homepage/*` 端点；后端就绪后切换 base URL |

## 跨单元依赖图

```
                   ┌─────────────────────────────────┐
                   │       PageShell (app/page.tsx) │
                   │  + Header / Footer / Providers │
                   └────────────────┬────────────────┘
                                    │ renders
            ┌───────────────────────┼───────────────────────┐
            ▼                       ▼                       ▼
    ┌──────────────┐      ┌──────────────────┐     ┌────────────────┐
    │     Hero     │      │   FeatureNav     │     │ CityQuickEntry │
    │  (API: 无)   │      │ (API: 无)        │     │ (API: 无)      │
    └──────────────┘      └──────────────────┘     └────────────────┘
                                    │
                                    ▼
                   ┌─────────────────────────────────┐
                   │            AiEntry              │
                   │  + AiAssistantModal (占位)      │
                   │  (依赖 Shell 注入 onOpen)       │
                   └─────────────────────────────────┘
                                    │
                                    ▼
                   ┌─────────────────────────────────┐
                   │   HotPosts / HotSpots           │
                   │   (依赖 /api/homepage/*)        │
                   └─────────────────────────────────┘
```

**关键路径**：PageShell → Hero / FeatureNav / CityQuickEntry / AiEntry / HotPosts / HotSpots（Shell 是整合者，必须最后就绪）

**并行机会**：6 个非 Shell 单元可并行开发；Hero / FeatureNav / CityQuickEntry 是纯静态（无 API），可最先完成；HotPosts / HotSpots 需要 Spring Boot 后端联调。

---

## 使用指南（本文件）

### 单元内 vs 跨单元决策

- **单元内决策**（如 Hero 的搜索框 debounce 300ms）→ 写在对应 spec 单元文件（`homepage-hero.md`）
- **跨单元决策**（如响应式断点、主品牌色）→ 写在本文件
- **冲突解决**：跨单元决策**优先于**单元内决策；发现冲突应同步更新两边

### 新增决策的流程

1. 在 PR 中提出 "Decision N: 标题" 段落
2. 列出 Context / Decision / Rationale / Alternatives Considered
3. 团队评审通过后合并
4. 同步更新 7 个 spec 单元文件中的相关章节

---

**版本**: 1.0.0
**最后更新**: 2026-08-23
**关联**: `proposal.md` / `tasks.md` / `specs/wanderchina-homepage/spec.md` / 7 个 spec 单元文件
