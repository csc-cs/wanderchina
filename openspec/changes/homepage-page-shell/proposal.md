# Proposal: homepage-page-shell（首页页面骨架）

> **Change**: homepage-page-shell  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Module**: 首页 / 页面骨架（顶层 Shell 整合所有子单元）  
> **Priority**: P0 | **Workload**: 0.5 人天  
> **Related**: design.md / tasks.md / specs/homepage-page-shell/spec.md  
> **详细设计来源**: 外部 spec 仓库 `specs/homepage-page-shell.md`（阶段 2 迁移）

---

## Why

PageShell 是首页的最顶层整合者。它把 6 个子单元（Hero / FeatureNav / CityQuickEntry / HotPosts / HotSpots / AiEntry）按顺序组装，并持有 Header 滚动状态、AI 模态框开关状态、SEO metadata 等"跨单元"基础设施。

**业务动机**：

- 单页应用必须有"页面级 Shell"（App Router 入口）
- 6 单元彼此独立，但渲染顺序、错误隔离、SEO 等需要在 Shell 层统一
- AI 模态框是 Shell 持有 state（避免 prop drilling 到 AiEntry）

**为何 OpenSpec 化**：

- Shell 与其他 6 单元有**显式契约**（Header scrollThreshold / AiEntry onOpen / AiAssistantModal open+onClose）
- SEO metadata 是首页"门面"（搜索引擎 / 社交分享），需文档化
- 任意子单元失败隔离的边界由 Shell 定义

## What Changes

| 动作 | 路径 |
|---|---|
| 新建 | `openspec/changes/homepage-page-shell/proposal.md`（本文件） |
| 新建 | `openspec/changes/homepage-page-shell/design.md` |
| 新建 | `openspec/changes/homepage-page-shell/tasks.md` |
| 新建 | `openspec/changes/homepage-page-shell/specs/homepage-page-shell/spec.md` |
| 引用 | 外部 spec 仓库 `specs/homepage-page-shell.md` |

## Capabilities

### New Capabilities

- `homepage-page-shell`：首页 Shell capability，包含：
  - **Unit Assembly**：按顺序渲染 6 单元（Header → Hero → FeatureNav → CityQuickEntry → HotPosts → HotSpots → Footer）
  - **AI Modal State Management**：Shell 持有 `aiOpen` state + 控制 Modal 渲染
  - **Header Scroll Coordination**：Header 是 Hero 的子组件（详见 homepage-hero）
  - **SEO Metadata**：title / description / OG image / Twitter card
  - **Failure Isolation**：单元错误不影响其他单元（依赖单元自治 ErrorBoundary）

### Modified Capabilities

<!-- 空 -->

## Impact

**新增**：

| 路径 | 用途 |
|---|---|
| `openspec/changes/homepage-page-shell/*`（4 文件） | OpenSpec 四件套 |
| 未来实施：`app/page.tsx` | Next.js App Router 入口（含 metadata） |
| 未来实施：`app/layout.tsx` | 根布局（React Query Provider） |
| 未来实施：`app/providers.tsx` | Providers 注入 |
| 未来实施：`app/HomeShellClient.tsx` | 客户端组件（state 管理） |
| 未来实施：`components/layout/Header.tsx` + `Footer.tsx` | Header / Footer 布局组件 |
| 未来实施：`components/homepage/AiAssistantModal.tsx` | AI 模态框（占位） |
| 未来实施：`public/og-image.jpg` | OG 分享图（1200×630） |

**不影响**：

- 已归档 `wanderchina-homepage`（Shell 是其 7 Requirement 之一）
- 其他 5 个并行单元（Shell 是它们的最终整合者）

---

## 团队评审清单（Acceptance Criteria）

- [ ] 5 个 Requirement 覆盖原 spec §4.1-4.9
- [ ] `openspec validate homepage-page-shell --strict` 通过
- [ ] 6 单元渲染顺序正确（Header → Hero → FeatureNav → CityQuickEntry → HotPosts → HotSpots → Footer）
- [ ] SEO metadata 完整（title / description / OG image / Twitter card）
- [ ] AI Modal 状态由 Shell 持有（AiEntry 通过 onOpen 注入）
- [ ] 单元失败隔离（自治 ErrorBoundary，不影响其他单元）

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联能力**: 已归档的 `wanderchina-homepage`