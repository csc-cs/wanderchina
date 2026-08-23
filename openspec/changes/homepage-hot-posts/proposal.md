# Proposal: homepage-hot-posts（首页热门帖子）

> **Change**: homepage-hot-posts  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Module**: 首页 / 热门帖子（按 7 天 Upvote 数排序的 Top 10）  
> **Priority**: P0 | **Workload**: 1 人天  
> **Related**: design.md / tasks.md / specs/homepage-hot-posts/spec.md  
> **详细设计来源**: 外部 spec 仓库 `specs/homepage-hot-posts.md`（阶段 2 迁移）

---

## Why

热门帖子是社区内容的"橱窗"，按 7 天 Upvote 数 DESC 排序，让外国游客看到"最近什么话题最热门"。

**业务动机**：

- Top 10 是用户决策点（决定是否深入 `/community`）
- 1 大卡 + 3 中卡 + 6 小卡的桌面布局突出第一名
- 数据来自 Spring Boot 后端 `/api/homepage/hot-posts?limit=10&days=7`

**为何 OpenSpec 化**：

- 涉及 API 契约（前端 / 后端对齐）
- React Query 缓存策略（staleTime、retry）需要文档化
- 加载 / 空 / 错误三态是典型异步组件模式

## What Changes

| 动作 | 路径 |
|---|---|
| 新建 | `openspec/changes/homepage-hot-posts/proposal.md`（本文件） |
| 新建 | `openspec/changes/homepage-hot-posts/design.md` |
| 新建 | `openspec/changes/homepage-hot-posts/tasks.md` |
| 新建 | `openspec/changes/homepage-hot-posts/specs/homepage-hot-posts/spec.md` |
| 引用 | 外部 spec 仓库 `specs/homepage-hot-posts.md` |

## Capabilities

### New Capabilities

- `homepage-hot-posts`：热门帖子 capability，包含：
  - **API Data Fetching**：`GET /api/homepage/hot-posts?limit=10&days=7`（React Query）
  - **Three States**：Loading Skeleton / Empty / Error+Retry
  - **Responsive Layout**：桌面 1 大 + 3 中 + 6 小 / 平板 2+4 / 移动横滑
  - **Click Navigation**：跳转 `/community/post/{post_id}`
  - **Relative Time Format**：`"2h ago"` / `"3d ago"`

### Modified Capabilities

<!-- 空 -->

## Impact

**新增**：

| 路径 | 用途 |
|---|---|
| `openspec/changes/homepage-hot-posts/*`（4 文件） | OpenSpec 四件套 |
| 未来实施：`components/homepage/HotPosts.tsx` + 5 子组件 | 主组件 + 子组件 |
| 未来实施：`hooks/useHotPosts.ts` | React Query Hook |
| 未来实施：`lib/api/homepage.ts` | API 客户端 |
| 未来实施：`lib/utils/time.ts` | 时间格式化工具 |
| 未来实施：`mocks/handlers/homepage.ts` | MSW handler |

**不影响**：

- 已归档 `wanderchina-homepage`
- 后端 Spring Boot（仅消费现有 API）

---

## 团队评审清单（Acceptance Criteria）

- [ ] 5 个 Requirement 覆盖原 spec §4.1-4.9
- [ ] `openspec validate homepage-hot-posts --strict` 通过
- [ ] API 契约与后端对齐（URL / 参数 / 响应字段）
- [ ] React Query 配置：staleTime=5min / retry=3 / refetchOnWindowFocus=false
- [ ] Scenario 字段统一英文

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联能力**: 已归档的 `wanderchina-homepage`