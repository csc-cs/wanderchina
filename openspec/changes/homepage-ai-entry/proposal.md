# Proposal: homepage-ai-entry（首页 AI 助手入口）

> **Change**: homepage-ai-entry  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Module**: 首页 / AI 助手入口（悬浮按钮 + Header 次级入口）  
> **Priority**: P0 | **Workload**: 0.5 人天  
> **Related**: design.md / tasks.md / specs/homepage-ai-entry/spec.md  
> **详细设计来源**: 外部 spec 仓库 `specs/homepage-ai-entry.md`（阶段 2 迁移）

---

## Why

AI 助手入口是外国游客与 WanderChina 平台对话的快捷通道。它通过右下角悬浮按钮（FAB）+ 桌面 Header 次级入口（"Ask AI" 按钮）两个触点，让用户随时唤起 AI 助手模态框。

**业务动机**：

- FAB 是移动端用户的唯一 AI 入口（Header 入口在移动端隐藏）
- Header 入口是桌面端用户的次要触点（避免 FAB 单点的视觉突兀）
- 两个入口共享同一 `onOpen` 回调（由 Shell 注入，连接到 AI 模态框状态）

**为何 OpenSpec 化**：

- FAB 与 Header 入口是两个子组件，但属于同一 capability（共享 onOpen 回调）
- 与 Shell（`homepage-page-shell`）有明确的契约（onOpen 注入契约）
- 后续扩展（未读消息红点 / 快捷 Prompt / 语音输入）走 OpenSpec 流程

## What Changes

| 动作 | 路径 |
|---|---|
| 新建 | `openspec/changes/homepage-ai-entry/proposal.md`（本文件） |
| 新建 | `openspec/changes/homepage-ai-entry/design.md` |
| 新建 | `openspec/changes/homepage-ai-entry/tasks.md` |
| 新建 | `openspec/changes/homepage-ai-entry/specs/homepage-ai-entry/spec.md` |
| 引用 | 外部 spec 仓库 `specs/homepage-ai-entry.md` |

## Capabilities

### New Capabilities

- `homepage-ai-entry`：AI 助手入口 capability，包含：
  - **Floating Action Button**：右下角 FAB（桌面 56px / 移动 48px），fixed 定位
  - **Header Entry**：桌面端 "Ask AI" 按钮，移动端隐藏
  - **onOpen Callback**：点击触发 props.onOpen（由 Shell 注入）
  - **Hover Effects**：FAB scale(1.05) + 阴影增强 + 1.5s 后显示 tooltip
  - **Safe Area**：移动端 FAB 适配刘海/导航条

### Modified Capabilities

<!-- 空 -->

## Impact

**新增**：

| 路径 | 用途 |
|---|---|
| `openspec/changes/homepage-ai-entry/*`（4 文件） | OpenSpec 四件套 |
| 未来实施：`components/homepage/AiEntry.tsx` | 主组件 |
| 未来实施：`components/homepage/AiFab.tsx`（可选子组件） | FAB 子组件 |

**不影响**：

- 已归档 `wanderchina-homepage`
- 其他 5 个并行单元

---

## 团队评审清单（Acceptance Criteria）

- [ ] 5 个 Requirement 覆盖原 spec §4.1-4.9
- [ ] `openspec validate homepage-ai-entry --strict` 通过
- [ ] `onOpen` 契约清晰：必需 prop，未提供仅 warn
- [ ] 移动端 FAB 适配 safe-area-inset
- [ ] Scenario 字段统一英文

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联能力**: 已归档的 `wanderchina-homepage`