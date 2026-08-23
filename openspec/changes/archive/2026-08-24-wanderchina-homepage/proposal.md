# Proposal: wanderchina-homepage（WanderChina 首页 MVP）

> **Change**: wanderchina-homepage  
> **Version**: 1.0.0（OpenSpec 化迁移至独立项目）  
> **Last Updated**: 2026-08-23  
> **项目位置**: 本仓库 `wanderchina/`（独立项目，独立 OpenSpec 仓库）  
> **关联 spec 单元**: 本仓库 `docs/specs/homepage-*.md`（7 个详细 spec 单元，阶段 2 由外部 spec 仓库迁移落地；当前作 capability 级别引用）  
> **OpenSpec schema**: spec-driven（CLI 1.10.0）  
> **模板参考**: spec-driven-template（独立仓库 PR 内部模板，对应 `openspec/changes/spec-driven-template/`）

---

## Why

WanderChina 是一个面向外国游客的中国入境旅游平台（含 AI 助手 + 旅行社区 + 结构化景点攻略）。其首页（P0 模块）已拆分为 7 个独立可开发的 spec 单元：

| # | 单元文件（阶段 2 落地路径） | 主题 | 工作量 |
|---|---|---|---|
| 1 | `docs/specs/homepage-hero.md` | Hero 英雄区（含搜索框 + 双 CTA） | 1 人天 |
| 2 | `docs/specs/homepage-feature-nav.md` | 6 个功能图标导航 | 0.5 人天 |
| 3 | `docs/specs/homepage-city-quick-entry.md` | 8 个 MVP 城市卡片 | 0.5 人天 |
| 4 | `docs/specs/homepage-ai-entry.md` | AI 助手 FAB + Header 入口 | 0.5 人天 |
| 5 | `docs/specs/homepage-hot-posts.md` | 热门帖子 Top 10 | 1 人天 |
| 6 | `docs/specs/homepage-hot-spots.md` | 热门景点 6-8 张 | 1 人天 |
| 7 | `docs/specs/homepage-page-shell.md` | 顶层 Shell 整合所有单元 | 0.5 人天 |
| **合计** | | | **5 人天（3 人天并行）** |

**为何要 OpenSpec 化**：
- 7 个 spec 单元**互相独立但有依赖关系**（Shell 整合其他 6 个 → 需明确依赖图）
- 当前 spec 是**纯 markdown 文档**，无法走 OpenSpec CLI 的 `validate --strict` / `status` / `apply` 工作流
- 团队后续需按 spec 实施时，**没有统一的任务分解**（每个 spec 都有自己的 4.9 测试覆盖 checklist，但缺少跨单元的里程碑）
- 7 个 spec 都依赖**统一的 4 项基础设施**：React Query / next/image / next/link / shadcn/ui → 需要 OpenSpec 化管理以避免重复决策
- WanderChina 是**独立项目**，不应污染 `my-first-pproject/`（Spring Boot + Vue demo）父仓的 OpenSpec

## What Changes

本次变更把 7 个 homepage spec 单元**结构化**为 WanderChina 项目的第 1 个 OpenSpec change：

| 动作 | 路径 | 说明 |
|---|---|---|
| 新建 | `openspec/changes/wanderchina-homepage/proposal.md`（本文件） | OpenSpec 风格的初始提案 |
| 新建 | `openspec/changes/wanderchina-homepage/design.md` | 跨单元的关键技术决策 |
| 新建 | `openspec/changes/wanderchina-homepage/tasks.md` | 跨单元的实施任务分解 |
| 新建 | `openspec/changes/wanderchina-homepage/specs/wanderchina-homepage/spec.md` | 7 个单元的高层 Requirement 合并 |
| 保留（不复制） | `docs/specs/homepage-*.md`（阶段 2 由外部 spec 仓库迁移） | 7 个详细 spec 单元作为 capability 级别引用；阶段 2 同步到本仓库 `docs/specs/` |

**重要原则**：7 个独立 spec 单元**不复制**到 wanderchina 仓库——它们作为"上游详细设计文档"被引用，避免内容重复漂移。OpenSpec change 只承载"高层抽象 + 依赖管理 + 任务分解"。

## Capabilities

### New Capabilities

- `wanderchina-homepage`：WanderChina 首页的 OpenSpec 级 capability，整合 7 个 spec 单元（Hero / FeatureNav / CityQuickEntry / AiEntry / HotPosts / HotSpots / PageShell），定义跨单元的依赖图与里程碑。

### Modified Capabilities

<!-- 空：本次不修改任何已有 capability -->

### 7 个单元的能力映射

每个 spec 单元作为 capability 下的一个 Requirement（在 `specs/wanderchina-homepage/spec.md` 中展开，每个 Requirement 引用对应的详细 spec 单元文件）：

| Capability Requirement | 对应 spec 单元（仅引用） | 关键依赖 |
|---|---|---|
| `Hero Section` | `docs/specs/homepage-hero.md` | next/image, 搜索框 debounce |
| `Feature Navigation` | `docs/specs/homepage-feature-nav.md` | lucide-react 图标 |
| `City Quick Entry` | `docs/specs/homepage-city-quick-entry.md` | config/cities.ts, next/link |
| `AI Assistant Entry` | `docs/specs/homepage-ai-entry.md` | onOpen callback 由 Shell 注入 |
| `Hot Posts` | `docs/specs/homepage-hot-posts.md` | `/api/homepage/hot-posts` Spring Boot 接口 |
| `Hot Spots` | `docs/specs/homepage-hot-spots.md` | `/api/homepage/hot-spots` Spring Boot 接口 |
| `Page Shell` | `docs/specs/homepage-page-shell.md` | 整合上述 6 个 + React Query Provider |

## Impact

**新增**：

| 路径 | 用途 |
|---|---|
| `openspec/changes/wanderchina-homepage/proposal.md`（本文件） | OpenSpec proposal |
| `openspec/changes/wanderchina-homepage/design.md` | 跨单元设计决策 |
| `openspec/changes/wanderchina-homepage/tasks.md` | 实施任务分解 |
| `openspec/changes/wanderchina-homepage/specs/wanderchina-homepage/spec.md` | 7 个 Requirement 合并 |
| `openspec/project.md`（后续补） | WanderChina 项目宪法 |
| `docs/` | 项目文档目录（含阶段 2 落地的 7 个 spec 单元） |

**不影响**：

- 外部 spec 仓库（7 个详细 spec 单元文件保留在原位，仅作引用；阶段 2 同步到本仓库 `docs/specs/`）
- 任何 npm / maven 依赖（不实施代码 → 无新增）

**团队影响**：

- 后续可走 `openspec apply wanderchina-homepage` 工作流（需先 `git init` + 提交到独立 GitHub 仓）
- 7 个单元的开发者可继续按各自的详细 spec 文件实施，OpenSpec 层只负责依赖管理与里程碑
- 跨单元的 4 项基础设施（React Query / next/image / next/link / shadcn/ui）由 OpenSpec 层统一约定，避免重复决策

## 使用指南（本文件）

### 团队评审清单（Acceptance Criteria）

#### 内容完整性
- [ ] 7 个 spec 单元文件完整（hero / feature-nav / city-quick-entry / ai-entry / hot-posts / hot-spots / page-shell）
- [ ] 工作量估算合理（5 人天合计 / 3 人天并行压缩）
- [ ] 依赖图清晰（Shell 依赖其他 6 单元；HotPosts/HotSpots 依赖 Spring Boot 后端接口）
- [ ] 跨单元决策（design.md）与单元内决策（7 个 spec 文件）无冲突

#### OpenSpec 合规
- [ ] `openspec validate wanderchina-homepage --strict` 通过（exit 0）
- [ ] `openspec status --change wanderchina-homepage` 显示 `4/4 artifacts complete`
- [ ] proposal.md 包含 Why / What Changes / Capabilities / Impact 四段
- [ ] design.md 包含 Context / Goals/Non-Goals / Decisions / Risks 章节
- [ ] tasks.md 包含 5 个阶段分组 + 64 个原子任务
- [ ] spec.md 包含 7 个 ADDED Requirements + 22 个 Scenario

#### 工程验收
- [ ] 4 件套均为相对路径引用，无跨仓绝对路径污染
- [ ] Scenario WHEN / THEN / AND 字段统一英文（便于跨语言团队协作）
- [ ] 4 个文件头部 metadata 块完整（Change / Version / Last Updated / Related）
- [ ] tasks.md 阶段 5 提交使用精确 `git add` 路径，禁止 `git add .`
- [ ] `.claude/skills/` / `.env` / `node_modules` 等敏感或无关文件**不在**任何 add 路径中

#### 上线门槛（Definition of Done）
- [ ] `npm run build` 无 error / warning
- [ ] Lighthouse Performance ≥ 90；JS bundle < 150KB gzip
- [ ] 6 个单元各自的单元测试通过（Hero 5 个 / HotPosts 5 个等）
- [ ] Playwright E2E 用例覆盖 6 个区域可见 + 点击跳转
- [ ] 推送到 GitHub `csc-cs/wanderchina` 公开仓 `main` 分支成功

### 下一步建议

1. **立即**：评审本文档 + 补充 `design.md` / `tasks.md` / `specs/wanderchina-homepage/spec.md`
2. **短期（1-2 天）**：`git init` 创建本地仓库；提交 4 件套
3. **中期**：评估是否推送 GitHub 远程仓（`gh repo create wanderchina --public --source=. --push`）
4. **长期**：把 OpenSpec 工作流集成到 CI（`scripts/verify.sh` 加 `openspec validate`）

---

**版本**: 0.2.0（迁移至独立项目）
**最后更新**: 2026-08-23
**关联 spec 单元**: 7 个（见上表）
**OpenSpec schema**: spec-driven（CLI 1.10.0）
**模板参考**: `openspec/changes/spec-driven-template/`（已提交到 my-first-pproject 父仓作范例）
