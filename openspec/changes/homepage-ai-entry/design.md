# Design: homepage-ai-entry（AiEntry 单元内设计决策）

> **Change**: homepage-ai-entry  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / tasks.md / specs/homepage-ai-entry/spec.md  
> **跨单元决策继承自**: 已归档 `wanderchina-homepage/design.md`

---

## Context

本单元聚焦 FAB + onOpen 契约 + 移动端适配。跨单元决策（技术栈 / 错误隔离 / 性能）已由 wanderchina-homepage 顶层 design 锁定，本单元不重复。

## Goals / Non-Goals

**Goals:**

- 右下角 FAB 圆形按钮（桌面 56px / 移动 48px），主品牌色背景，白色图标
- 桌面端 Header 显示 "Ask AI" 次级入口，移动端隐藏
- 点击触发 props.onOpen 回调（由 Shell 注入）
- hover scale(1.05) + 阴影增强（200ms 过渡）
- 移动端 FAB 适配刘海（`safe-area-inset-bottom`）

**Non-Goals:**

- 不实现 AI 助手模态框本体（由 Shell 注入或独立 AI 模块负责）
- 不实现对话逻辑 / LLM 调用（全部在 AI 模块）
- 不做未读消息红点 / 语音输入 / 快捷 Prompt（留 P1）
- 不做多语言切换

## Decisions

### Decision 1: onOpen 契约

**Context**: FAB 点击需要触发 AI 模态框，但 AiEntry 不持有模态框状态（解耦）。

**Decision**:

- `onOpen: () => void` 为必需 prop
- 未提供时仅 `console.warn`，不抛 React error
- 调用时额外 `console.log`：`[AiEntry] FAB clicked, opening assistant modal`

**Rationale**:
- 解耦：AiEntry 只负责"入口"语义，模态框由 Shell 持有
- 契约失败优雅降级（warn 而非 error）

### Decision 2: FAB 位置与尺寸

**Context**: FAB 需在不阻挡内容的前提下随时可达。

**Decision**:

| 视口 | 尺寸 | 位置 |
|---|---|---|
| 移动（< 768px） | 48px（`w-12 h-12`） | `bottom: 16px; right: 16px` |
| 桌面（≥ 768px） | 56px（`md:w-14 md:h-14`） | `bottom: 24px; right: 24px` |

位置使用内联 style + `env(safe-area-inset-bottom)` 适配刘海。

**Rationale**:
- 移动端 48px 是 iOS HIG 触摸目标最小尺寸
- 桌面端 56px 更显眼（FAB 不抢主体内容注意力）
- safe-area-inset 适配 iPhone 刘海 / Android 导航条

### Decision 3: FAB 视觉层级

**Context**: FAB 是浮动元素，需在所有内容之上但不抢主视觉。

**Decision**:

- `z-50`（高于内容，低于全局 Modal z-100）
- `shadow-lg` → `hover:shadow-2xl`（200ms 过渡）
- `bg-brand-primary` 主品牌色 + 白色图标

**Rationale**:
- z-50 高于常规内容但低于 Modal（避免模态框打开时被 FAB 遮挡）
- shadow 渐变提供深度感（FAB "浮起来" 的视觉暗示）

### Decision 4: tooltip 延迟策略

**Context**: hover 1.5s 后显示 tooltip 太长会让用户觉得"没反应"。

**Decision**:

- 桌面端 hover 1.5s 后显示 tooltip（"Ask AI Assistant"）
- 使用 `useState` + `setTimeout` 管理显示状态
- 移动端无 tooltip（无 hover 概念）

**Rationale**:
- 1.5s 是 Material Design 推荐延迟（既不打扰用户，又给好奇用户足够时间触发）
- tooltip 是次要信息（不阻塞主操作）

### Decision 5: 与 Shell 的契约

**Context**: AiEntry 不持有 AI 模态框状态，需要 Shell 注入 onOpen。

**Decision**:

- Shell 在 `HomeShellClient` 中维护 `aiOpen` state
- Shell 渲染 `<AiEntry onOpen={() => setAiOpen(true)} />`
- Shell 同时渲染 `<AiAssistantModal open={aiOpen} onClose={...} />`（占位 Modal）

**Rationale**:
- 单一 state 来源（Shell 持有，避免 prop drilling）
- AiEntry 完全不感知模态框存在（关注点分离）

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|---|---|---|
| FAB 遮挡右下角 Footer 文字 | 用户体验受影响 | z-50 让 FAB 在文字之上；FAB 区域小（48-56px），大部分 Footer 可点击 |
| tooltip 1.5s 延迟过长 | 用户错过提示 | tooltip 是次要信息；FAB 图标 + 主品牌色已具备明确语义 |
| onOpen 未提供 | 行为未定义 | 仅控制台 warn；UI 不显示异常（用户可能误以为"已点击但没反应"，需文档说明） |
| FAB 移动端适配刘海 | 部分设备被遮挡 | `env(safe-area-inset-bottom)` 处理；iOS Safari / Chrome Android 均支持 |

## 与跨单元决策的对接

| 跨单元决策 | 本单元落地方式 |
|---|---|
| Decision 1（技术栈） | `'use client'` 组件（useState + useEffect）；`lucide-react MessageCircle` 图标 |
| Decision 2（响应式断点） | `w-12 h-12 md:w-14 md:h-14` 尺寸；`hidden md:inline-flex` Header 入口 |
| Decision 3（错误处理） | onOpen 缺失 warn；不影响其他单元 |
| Decision 4（性能预算） | FAB fixed 零渲染成本；tooltip 用 Portal 避免 reflow |
| Decision 5（多语言） | 仅英文 tooltip 文案 |
| Decision 6（主题色） | `bg-brand-primary` 主品牌色 |

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `tasks.md` / `specs/homepage-ai-entry/spec.md`