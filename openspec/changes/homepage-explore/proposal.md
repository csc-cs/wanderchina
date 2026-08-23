# Proposal: homepage-explore（首页 Explore 探索区块）

> **Change**: homepage-explore  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Module**: 首页 / Explore（第 8 单元，嵌在 HotSpots 之后）  
> **Priority**: P0 | **Workload**: 1.5 人天  
> **Related**: design.md / tasks.md / specs/homepage-explore/spec.md  
> **详细设计来源**: 外部 spec 仓库 `specs/homepage-explore.md`（阶段 2 迁移）  
> **产品理念源**: README.md「面向外国游客的中国入境旅游平台」

---

## Why

首页 7 单元（Hero / FeatureNav / CityQuickEntry / AiEntry / HotPosts / HotSpots / PageShell）已覆盖首屏视觉与基础内容，但**缺少「沉浸式探索」入口**——海外用户登录首页后，需要一个能直接"看图种草 + 立即筛选 + 信任判断"的区块，才能转化为 `/guides` 或 `/community` 的访问者。

**业务动机**：

- 海外用户的浏览路径：**信任判断 → 内容筛选 → 详情点击**，区别于国内用户的"瀑布流刷下去"
- 现有 HotPosts（社交）和 HotSpots（景点）分散在不同区域，缺少"按兴趣筛选"能力
- 国外产品（Airbnb / Booking / TripAdvisor）的"Explore / Discover"模式已被验证有效

**为什么这是 P0 而非 P1**：

- 7 单元的入口已完成，但**留客**依赖 Explore 这样的"内容深度"
- 没有 Explore 区块，用户只能从 HotPosts / HotSpots 单点跳走，路径短、转化浅

**为何 OpenSpec 化**：

- 涉及**复用现有 API 的客户端聚合策略**（hot-spots + hot-posts 合并 + 分类筛选）
- 涉及**海外用户的产品体验决策**（信任信号 / 社会证明 / 文化翻译）
- 涉及**8 单元在 PageShell 中的位置**（修改 `homepage-page-shell` 已定义的渲染顺序）

## What Changes

| 动作 | 路径 |
|---|---|
| 新建 | `openspec/changes/homepage-explore/proposal.md`（本文件） |
| 新建 | `openspec/changes/homepage-explore/design.md` |
| 新建 | `openspec/changes/homepage-explore/tasks.md` |
| 新建 | `openspec/changes/homepage-explore/specs/homepage-explore/spec.md` |
| 修改 | `openspec/changes/homepage-page-shell/specs/homepage-page-shell/spec.md`（追加 Scenario：渲染顺序含 Explore） |

## Capabilities

### New Capabilities

- `homepage-explore`：Explore 探索区块 capability，包含：
  - **Curated by Locals** 副标题（社会证明 + 信任信号）
  - **5 个分类 Tabs**：All / Food & Cuisine / Nature & Hiking / History & Culture / Nightlife & Markets
  - **筛选逻辑**：客户端按 category 字段合并 hot-spots + hot-posts
  - **响应式布局**：桌面 4 列 / 平板 2 列 / 移动 1 列横滑
  - **卡片 Trust Stack**：封面 + 城市 badge + 类别 icon + 时长 + 价格 + 评分 + 评论数 + "Loved by" 标签
  - **Quick View Hover**：hover 时显示"Quick View"覆盖层（不跳转直接预览）
  - **CTA "Browse All"** 跳转 `/guides`

### Modified Capabilities

- `homepage-page-shell`：在 PageShell 渲染顺序的 HotSpots 之后插入 `<Explore />`，作为第 7 个内容单元（在 Footer 之前）

## Impact

**新增**：

| 路径 | 用途 |
|---|---|
| `openspec/changes/homepage-explore/*`（4 文件） | OpenSpec 四件套 |
| 未来实施：`components/homepage/Explore.tsx` + 5 子组件 | 主组件 + 子组件 |
| 未来实施：`hooks/useExploreItems.ts` | 合并 useHotPosts + useHotSpots |
| 未来实施：`lib/data/explore.ts` | 客户端合并 + 分类筛选 |
| 未来实施：`components/homepage/CategoryTabs.tsx` | 分类切换 UI |
| 未来实施：`components/homepage/ExploreCard.tsx` | 单张卡片（复用 + 扩展 HotSpotCard） |

**修改**：

| 路径 | 修改 |
|---|---|
| `app/HomeShellClient.tsx` | 在 `<HotSpots />` 之后插入 `<Explore />` |
| `openspec/changes/homepage-page-shell/specs/homepage-page-shell/spec.md` | 渲染顺序 Scenario 增加 Explore |

**不影响**：

- 已归档的 `wanderchina-homepage`
- 后端 API（纯前端聚合）
- 现有 7 单元的 spec（除 PageShell 的渲染顺序 Scenario）

---

## 产品理念 / 海外用户思维（贯穿全 change）

| 维度 | 海外用户特点 | 本单元设计落地 |
|---|---|---|
| **信任建立** | 习惯看评分、评论数、验证标识 | 卡片展示 ★ 4.8 (1.2k reviews) + "Verified by Local Expert" 徽章 |
| **社会证明** | "X 人收藏" / "Y 人本周预订"显著提升点击率 | 卡片右下"Loved by 12k+ travelers from USA" |
| **价格透明** | 关心 USD 等价而非单纯 CNY | 价格字段同时显示 `¥45 / $6` |
| **时长预期** | 行程时间敏感 | 每卡显示 `2-3 hours` / `Half day` / `Full day` |
| **语言提示** | "是否讲英文"是关键决策点 | 部分卡片显示 "English guide available" 标签 |
| **文化翻译** | 直译会让外国人困惑 | "夜市" 翻译为 "Night Markets" 而非 "Night Market"；"小吃街" 翻译为 "Food Street" |
| **CTA 文案** | 海外习惯 imperative + benefit | "Browse All" 而非 "View More"；"Quick View" 而非 "See More" |
| **配色** | 不喜欢国内常见的红金 + 龙凤 | 主色调 Indigo `#4F46E5` + 暖橙 `#F59E0B` 强调；城市 badge 复用 CITY_COLOR_MAP |
| **字体节奏** | 习惯 Sans-serif + 充足留白 | Inter + 4-8px letter-spacing；卡片 padding ≥ 16px |
| **微交互** | 期待 hover 反馈 | 卡片 hover：封面图 `scale(1.05)` + shadow + Quick View 覆盖层 |

---

## 团队评审清单（Acceptance Criteria）

- [ ] 5 个 Requirement 覆盖原 spec §4.1-4.9
- [ ] `openspec validate homepage-explore --strict` 通过
- [ ] `openspec validate homepage-page-shell --strict` 仍通过（修改后）
- [ ] 5 个分类标签英文文化翻译正确（Food & Cuisine / Nature & Hiking / History & Culture / Nightlife & Markets）
- [ ] 卡片 Trust Stack 7 个字段全部渲染
- [ ] 海外用户思维 10 条全部落地（验证清单另列）
- [ ] 客户端合并 hot-spots + hot-posts：useHotPosts + useHotSpots 并行请求 + 字段统一
- [ ] 响应式 4/2/1 列正确
- [ ] Quick View hover 不跳转（仅展示 preview）

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联能力**: 已归档的 `wanderchina-homepage` + `homepage-page-shell`（修改）