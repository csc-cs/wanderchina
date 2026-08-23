# Proposal: homepage-hero（首页 Hero 区）

> **Change**: homepage-hero  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Module**: 首页 / Hero 区（顶层视觉区）  
> **Priority**: P0  
> **Workload**: 0.5 人天（1 人 + AI 协作可压缩至 2-3 小时）  
> **Related**: design.md / tasks.md / specs/homepage-hero/spec.md  
> **详细设计来源**: 外部 spec 仓库 `specs/homepage-hero.md`（阶段 2 迁移到本仓库 `docs/specs/`）

---

## Why

首页 Hero 区是外国游客首次访问的视觉冲击点。当前 wanderchina-homepage 顶层能力（已归档）已声明 7 个 Requirement 之一是 Hero Section，需要把它下沉为**可独立开发的 capability**，便于：

- 单独排期 / 单独 PR review / 单独 Storybook 演示
- 后续 A/B 测试不同 hero 文案 / 背景图组合
- 团队成员可独立负责而不阻塞其他 6 单元

**业务动机**：

- Hero 是首屏 LCP 决定因素（LCP < 2.5s 是 Core Web Vitals 良好门槛）
- 外国游客在弱网（机场 WiFi）下进入，背景图需 next/image 优化 + 移动端降级
- 透明 Header 联动是品牌质感的关键细节（滚动 100px 后切换实底）

**为何 OpenSpec 化**：

- Hero 涉及多维度约束（响应式 3 断点 × 视觉 / 性能 / a11y × 正常+异常路径），需要规范文档化
- 跨模块依赖：依赖 Shell 渲染 + 共享 `HERO_DEFAULTS` 配置
- 后续扩展（视频背景 / Lottie / i18n）需要 OpenSpec 化变更管理

## What Changes

| 动作 | 路径 | 说明 |
|---|---|---|
| 新建 | `openspec/changes/homepage-hero/proposal.md`（本文件） | OpenSpec 初始提案 |
| 新建 | `openspec/changes/homepage-hero/design.md` | Hero 单元内设计决策 |
| 新建 | `openspec/changes/homepage-hero/tasks.md` | Hero 实施任务分解 |
| 新建 | `openspec/changes/homepage-hero/specs/homepage-hero/spec.md` | Hero Requirement + Scenario |
| 引用 | 外部 spec 仓库 `specs/homepage-hero.md` | 详细设计文档（阶段 2 迁移到 `docs/specs/`） |

**保留（不重复）**：原 `homepage-hero.md` 的全部 7 节内容（边界 / 场景 / Props / AC / 文件清单 / 参考实现 / 扩展）作为 capability 级详细设计，被 `specs/homepage-hero/spec.md` 中的高 Requirement 引用。

## Capabilities

### New Capabilities

- `homepage-hero`：首页 Hero 区的 OpenSpec 级 capability。包含以下 Requirement：
  - **Full-screen Hero Section**：全屏背景图 + 品牌标语 + 副标题 + 透明 Header 联动
  - **Responsive Breakpoints**：桌面 100vh-56px / 平板 80vh / 移动 70vh
  - **Background Fallback**：图片加载失败降级为品牌色渐变
  - **Header Scroll Behavior**：scrollY > 100 切换实底白 + 阴影
  - **Accessibility & Reduced Motion**：H1 唯一 / 焦点环 / prefers-reduced-motion 适配

### Modified Capabilities

<!-- 空：本次不修改任何已有 capability -->

### 详细设计映射

| Capability Requirement | 详细设计（仅引用） | 优先级 |
|---|---|---|
| Full-screen Hero Section | `specs/homepage-hero.md §2.1 场景 1-5` | P0 |
| Responsive Breakpoints | `specs/homepage-hero.md §4.5` | P0 |
| Background Fallback | `specs/homepage-hero.md §2.2 场景 6` | P0 |
| Header Scroll Behavior | `specs/homepage-hero.md §2.1 场景 3` | P0 |
| Accessibility & Reduced Motion | `specs/homepage-hero.md §4.6 / §4.7` | P0 |

## Impact

**新增**：

| 路径 | 用途 |
|---|---|
| `openspec/changes/homepage-hero/proposal.md`（本文件） | OpenSpec proposal |
| `openspec/changes/homepage-hero/design.md` | 单元内设计决策 |
| `openspec/changes/homepage-hero/tasks.md` | 实施任务分解 |
| `openspec/changes/homepage-hero/specs/homepage-hero/spec.md` | 5 个 Requirement |
| 未来实施：`components/homepage/Hero.tsx` + `Header.tsx` | Hero / Header 组件 |
| 未来实施：`public/images/hero-desktop.jpg` + `hero-mobile.jpg` | 背景图资源 |

**不影响**：

- 已归档的 `wanderchina-homepage` change（顶层能力，集成所有 7 单元）
- 其他 6 个并行单元（FeatureNav / CityQuickEntry / AiEntry / HotPosts / HotSpots / PageShell）
- 任何 npm / maven 依赖（不引入新包）

**团队影响**：

- 6 单元可并行开发（Hero 是其中之一）
- Hero 与 Shell（`homepage-page-shell`）的依赖由 Shell 持有状态
- 后续 A/B 测试 Hero 文案 / 背景图可在 OpenSpec 化下单独变更

---

## 团队评审清单（Acceptance Criteria）

- [ ] 5 个 Requirement 覆盖原 spec §4 的 7 类验收（代码结构 / 功能 / 视觉 / 性能 / 响应式 / a11y / 异常降级）
- [ ] `openspec validate homepage-hero --strict` 通过
- [ ] `openspec status --change homepage-hero` 显示 `4/4 artifacts complete`
- [ ] 跨单元决策（design.md Decision）与 wanderchina-homepage 顶层 design 一致（响应式断点 / 品牌色 / 字体）
- [ ] tasks.md 实施任务与 §5 文件交付物清单一致
- [ ] 引用外部 spec 仓库相对路径，无跨仓绝对路径
- [ ] Scenario WHEN / THEN / AND 字段统一英文

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联能力**: 已归档的 `wanderchina-homepage`（Hero 是其 7 Requirement 之一）