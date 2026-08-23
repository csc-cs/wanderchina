# Design: homepage-hot-posts（HotPosts 单元内设计决策）

> **Change**: homepage-hot-posts  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / tasks.md / specs/homepage-hot-posts/spec.md  
> **跨单元决策继承自**: 已归档 `wanderchina-homepage/design.md`

---

## Context

本单元是 7 单元中**第一个涉及 API 调用 + React Query** 的异步组件。与之前 3 个纯静态单元（Hero / FeatureNav / CityQuickEntry）和 1 个 onOpen 回调单元（AiEntry）不同，本单元需要处理加载/空/错误三态。

## Goals / Non-Goals

**Goals:**

- React Query 获取 Top 10 帖子（按 7 天 Upvote DESC）
- 桌面 1 大卡 + 3 中卡 + 6 小卡布局；平板 2+4；移动横滑
- 加载 / 空 / 错误三态齐全（Skeleton + Empty+CTA + Error+Retry）
- 点击跳转 `/community/post/{post_id}`
- 相对时间格式化（`"2h ago"` / `"3d ago"`）

**Non-Goals:**

- 不做点赞 / 收藏 / 分享（只读）
- 不做评论数实时更新（首屏静态）
- 不做用户登录态判断
- 不做无限滚动 / 翻页（仅 10 张）
- 不做视频帖子（仅图文）
- 不做个性化推荐（严格按 upvote DESC）

## Decisions

### Decision 1: React Query 缓存策略

**Context**: 帖子数据是相对静态的（每 5 分钟才更新一次），不需要激进刷新。

**Decision**:

- `staleTime: 5 * 60 * 1000`（5 分钟）
- `refetchOnWindowFocus: false`（不抢焦点）
- `retry: 3`（失败重试 3 次）
- queryKey: `['homepage', 'hot-posts', { limit, days }]`

**Rationale**:
- 5 分钟 staleTime 与后端 cron 频率匹配（避免重复请求）
- focus 重拉会"抢"用户体验（用户切回窗口时看到 loading）
- retry 3 次容忍网络抖动

### Decision 2: API 契约

**Context**: 与后端 Spring Boot `/api/homepage/hot-posts` 对齐。

**Decision**:

**请求**：`GET {apiBaseUrl}/api/homepage/hot-posts?limit=10&days=7`

**响应**：
```typescript
interface HotPostsApiResponse {
  code: number;
  message: string;
  data: {
    items: HotPostItem[];
    generated_at: string;
  } | null;
}

interface HotPostItem {
  post_id: number;
  title: string;
  cover_url: string;
  author: { user_id: number; nickname: string; avatar_url: string };
  city_code: string;
  city_name_en: string;
  upvote_count: number;
  comment_count: number;
  created_at: string; // ISO 8601
}
```

**Rationale**: 统一 `{ code, message, data }` 信封格式，与项目其他 API 一致。

### Decision 3: 三态分离子组件

**Context**: 加载 / 空 / 错误三态 UI 不同，需独立子组件便于 Storybook 隔离。

**Decision**:

- `HotPosts.tsx` 主组件：根据 `isLoading / isError / data` 渲染对应子组件
- `HotPostsSkeleton.tsx`：5 大 + 5 小骨架屏
- `HotPostsEmpty.tsx`：空态 UI + "Write a Post" 按钮
- `HotPostsError.tsx`：错误 UI + "Retry" 按钮
- `HotPostCardLarge.tsx` / `HotPostCardSmall.tsx`：大卡 / 小卡

**Rationale**: 子组件隔离便于 Storybook 单独演示 + 单元测试独立覆盖。

### Decision 4: 桌面布局策略

**Context**: 10 张卡片在桌面需有视觉层级。

**Decision**:

- 第 1 名：`HotPostCardLarge`（占 `lg:col-span-2`，约 2/3 宽度）
- 第 2-4 名：`HotPostCardSmall` 堆叠（占 1/3 宽度，3 行）
- 第 5-10 名：`HotPostCardSmall compact` 横排（6 列）

**Rationale**:
- 第 1 名最吸睛（占据大卡位置）
- 第 2-4 名是"亚军"，堆叠节省空间
- 第 5-10 名是"长尾"，横排快速浏览

### Decision 5: 相对时间格式化

**Context**: 用户看到"X 小时前"比绝对时间更直观。

**Decision**:

- 使用 `dayjs` 或 `date-fns`（轻量）
- 阈值：`< 1h` → `"Xm ago"` / `< 24h` → `"Xh ago"` / `< 7d` → `"Xd ago"` / `> 7d` → ISO 简短日期
- 仅英文格式（i18n 留给 P1）

**Rationale**: 相对时间是社交产品的标配（Twitter / Reddit / 微博都用）。

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|---|---|---|
| API 后端未上线 | 前端无法联调 | MSW mock 完整实现 `/api/homepage/hot-posts`；后端就绪后切 base URL |
| React Query 在 SSR 边界 | 客户端组件嵌套增加 | 整个组件 `'use client'`；Provider 在 `app/providers.tsx` 注入 |
| 封面图 CDN 故障 | 视觉降级 | next/image onError 降级为纯文字版；warn 日志 |
| 字段缺失（如 author.avatar_url） | 单条数据空白 | 头像降级为灰色 placeholder；不抛 React error |

## 与跨单元决策的对接

| 跨单元决策 | 本单元落地方式 |
|---|---|
| Decision 1（技术栈） | `'use client'` + `@tanstack/react-query` + `next/image` + `next/link` |
| Decision 2（响应式断点） | `lg:grid-cols-3` + `lg:hidden flex` 横滑 |
| Decision 3（错误处理） | ErrorBoundary + React Query retry；自治不影响其他单元 |
| Decision 4（性能预算） | React Query 缓存避免重复；LCP < 2s；staleTime 5min |
| Decision 5（多语言） | 仅英文；时间格式 `"2h ago"` |
| Decision 6（主题色） | 城市 badge 用 `CITY_COLOR_MAP[city_code]`（与 CityQuickEntry 共享） |

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `tasks.md` / `specs/homepage-hot-posts/spec.md`