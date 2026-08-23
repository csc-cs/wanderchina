# Proposal: homepage-hot-spots（首页热门景点）

> **Change**: homepage-hot-spots  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Module**: 首页 / 热门景点（按浏览量排序的 6-8 张景点卡）  
> **Priority**: P0 | **Workload**: 1 人天  
> **Related**: design.md / tasks.md / specs/homepage-hot-spots/spec.md  
> **详细设计来源**: 外部 spec 仓库 `specs/homepage-hot-spots.md`（阶段 2 迁移）

---

## Why

热门景点是外国游客"看图种草"的核心入口。按浏览量 DESC 排序的 8 张景点卡，是首页最直观的内容展示。

**业务动机**：

- 视觉化（封面图 + 城市 badge + 浏览量）是社交化旅游的标配
- 数据来自 Spring Boot `/api/homepage/hot-spots?limit=8`
- 与城市配置（`config/cities.ts`）共享 city_code + 城市颜色

**为何 OpenSpec 化**：

- 涉及 API 契约 + React Query 缓存策略
- 加载 / 空 / 错误三态与 HotPosts 一致（可复用模式）
- 浏览量格式化（`"12.5k views"` / `"4823 views"`）需文档化

## What Changes

| 动作 | 路径 |
|---|---|
| 新建 | `openspec/changes/homepage-hot-spots/proposal.md`（本文件） |
| 新建 | `openspec/changes/homepage-hot-spots/design.md` |
| 新建 | `openspec/changes/homepage-hot-spots/tasks.md` |
| 新建 | `openspec/changes/homepage-hot-spots/specs/homepage-hot-spots/spec.md` |
| 引用 | 外部 spec 仓库 `specs/homepage-hot-spots.md` |

## Capabilities

### New Capabilities

- `homepage-hot-spots`：热门景点 capability，包含：
  - **API Data Fetching**：`GET /api/homepage/hot-spots?limit=8`（React Query）
  - **Three States**：Loading Skeleton / Empty / Error+Retry
  - **Responsive Layout**：桌面 4×2 / 平板 2×4 / 移动横滑
  - **Click Navigation**：跳转 `/guides/spot/{spot_id}`
  - **View Count Format**：`"12.5k views"` / `"4823 views"`

### Modified Capabilities

<!-- 空 -->

## Impact

**新增**：

| 路径 | 用途 |
|---|---|
| `openspec/changes/homepage-hot-spots/*`（4 文件） | OpenSpec 四件套 |
| 未来实施：`components/homepage/HotSpots.tsx` + 4 子组件 | 主组件 + 子组件 |
| 未来实施：`hooks/useHotSpots.ts` | React Query Hook |
| 未来实施：`lib/utils/format.ts` 追加 `formatViewCount` | 浏览量格式化 |

**不影响**：

- 已归档 `wanderchina-homepage`
- HotPosts 单元（API 不同，组件不同，但模式一致）

---

## 团队评审清单（Acceptance Criteria）

- [ ] 5 个 Requirement 覆盖原 spec §4.1-4.9
- [ ] `openspec validate homepage-hot-spots --strict` 通过
- [ ] API 契约与后端对齐（URL / 参数 / 响应字段）
- [ ] React Query 配置：staleTime=10min（景点数据更静态）/ retry=3
- [ ] 浏览量格式化正确（`12453` → `"12.5k views"`，`4823` → `"4823 views"`）
- [ ] 城市 badge 颜色与 `config/cities.ts` 的 `CITY_COLOR_MAP` 一致

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联能力**: 已归档的 `wanderchina-homepage`