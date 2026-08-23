# Proposal: homepage-feature-nav（首页功能导航栏）

> **Change**: homepage-feature-nav  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Module**: 首页 / 功能导航区（Hero 区下方的三大入口）  
> **Priority**: P0 | **Workload**: 0.5 人天  
> **Related**: design.md / tasks.md / specs/homepage-feature-nav/spec.md  
> **详细设计来源**: 外部 spec 仓库 `specs/homepage-feature-nav.md`（阶段 2 迁移到 `docs/specs/`）

---

## Why

首页功能导航栏是外国游客进入三大核心模块（Travel Community / City Guides / AI Travel Assistant）的关键入口。它位于 Hero 区下方，承担"分流 + 导航"双重作用。

**业务动机**：

- 把 3 个核心模块的入口放在首屏可见位置（首屏即转化）
- 避免用户在内容海洋中迷失（直接给 3 个明确方向）
- 与 Hero 文字信息互补：Hero 讲故事，FeatureNav 给行动

**为何 OpenSpec 化**：

- 卡片配置是结构化数据（icon / title / description / href），适合 capability 化
- 后续扩展（增加第 4 张卡片 / 替换 emoji 为 SVG）需走 OpenSpec 流程
- 与 wanderchina-homepage 顶层能力（已归档）解耦，便于独立 PR

## What Changes

| 动作 | 路径 | 说明 |
|---|---|---|
| 新建 | `openspec/changes/homepage-feature-nav/proposal.md`（本文件） | OpenSpec 初始提案 |
| 新建 | `openspec/changes/homepage-feature-nav/design.md` | FeatureNav 单元内设计决策 |
| 新建 | `openspec/changes/homepage-feature-nav/tasks.md` | 实施任务分解 |
| 新建 | `openspec/changes/homepage-feature-nav/specs/homepage-feature-nav/spec.md` | Requirement + Scenario |
| 引用 | 外部 spec 仓库 `specs/homepage-feature-nav.md` | 详细设计（阶段 2 迁移） |

## Capabilities

### New Capabilities

- `homepage-feature-nav`：首页 3 卡功能导航 capability，包含：
  - **Three Feature Cards**：固定 3 张（Community / Guides / AI Assistant）
  - **Responsive Grid**：桌面 3 列 / 平板 2 列 / 移动 1 列
  - **Hover Effects**：translateY(-4px) + 阴影增强 + 箭头右移
  - **Next.js Link Navigation**：点击跳转对应模块路由，启用 prefetch
  - **Accessibility**：aria-label / focus-visible / 键盘导航

### Modified Capabilities

<!-- 空 -->

## Impact

**新增**：

| 路径 | 用途 |
|---|---|
| `openspec/changes/homepage-feature-nav/*`（4 文件） | OpenSpec 四件套 |
| 未来实施：`components/homepage/FeatureNav.tsx` | FeatureNav 组件 |
| 未来实施：`config/homepage.ts` 追加 `DEFAULT_FEATURE_CARDS` | 3 卡配置常量 |

**不影响**：

- 已归档 `wanderchina-homepage`（FeatureNav 是其 7 Requirement 之一）
- 其他 5 个并行单元
- 任何 npm 依赖（不引入新包）

---

## 团队评审清单（Acceptance Criteria）

- [ ] 5 个 Requirement 覆盖原 spec §4.1-4.9 验收
- [ ] `openspec validate homepage-feature-nav --strict` 通过
- [ ] 3 张卡片顺序固定：Community → Guides → AI Assistant
- [ ] 跨单元决策一致（响应式断点 / 品牌色 / 字体继承自 wanderchina-homepage）
- [ ] Scenario 字段统一英文
- [ ] 引用外部 spec 仓库相对路径

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联能力**: 已归档的 `wanderchina-homepage`