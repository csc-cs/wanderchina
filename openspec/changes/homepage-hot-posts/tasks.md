# Tasks: homepage-hot-posts（HotPosts 实施任务分解）

> **Change**: homepage-hot-posts  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / design.md / specs/homepage-hot-posts/spec.md  
> **前置依赖**: wanderchina-homepage 阶段 1 基础设施（React Query Provider / MSW handler）

---

## 1. 类型与 API

- [ ] 1.1 `types/homepage.ts` 定义 `HotPostItem` / `HotPostAuthor` / `HotPostsData` / `HotPostsApiResponse`
- [ ] 1.2 `lib/api/homepage.ts` 实现 `getHotPosts({ limit, days, apiBaseUrl })`
- [ ] 1.3 `hooks/useHotPosts.ts` 实现 React Query hook（staleTime 5min / retry 3 / refetchOnWindowFocus false）

## 2. 工具函数

- [ ] 2.1 `lib/utils/time.ts` 实现 `formatRelativeTime(isoString): string`
- [ ] 2.2 阈值：`< 1h` → `"Xm ago"` / `< 24h` → `"Xh ago"` / `< 7d` → `"Xd ago"` / `> 7d` → ISO 简短日期

## 3. 子组件实现

- [ ] 3.1 创建 `components/homepage/HotPostCardLarge.tsx`：大卡（封面 + 标题 + 作者 + upvote + 时间）
- [ ] 3.2 创建 `components/homepage/HotPostCardSmall.tsx`：小卡（紧凑模式 prop）
- [ ] 3.3 创建 `components/homepage/HotPostsSkeleton.tsx`：5 大 + 5 小骨架屏
- [ ] 3.4 创建 `components/homepage/HotPostsEmpty.tsx`：空态 + "Write a Post" 按钮（链接 `/community/new`）
- [ ] 3.5 创建 `components/homepage/HotPostsError.tsx`：错误态 + "Retry" 按钮（接 refetch）

## 4. 主组件

- [ ] 4.1 创建 `components/homepage/HotPosts.tsx`：`'use client'` + `interface HotPostsProps`
- [ ] 4.2 实现三态分发：`isLoading` → Skeleton / `isError` → Error / `!data || items.length===0` → Empty
- [ ] 4.3 实现桌面 1+3+6 布局：`<div className="lg:grid lg:grid-cols-3">` + col-span-2 大卡 + grid-rows-3 中卡 + grid-cols-6 小卡
- [ ] 4.4 实现移动横滑：`<div className="lg:hidden flex snap-x snap-mandatory">`
- [ ] 4.5 实现 "View All" 跳转 `/community`
- [ ] 4.6 实现 `aria-label` 给每张卡片

## 5. MSW Mock

- [ ] 5.1 `mocks/handlers/homepage.ts` 追加 `http.get('/api/homepage/hot-posts', ...)` handler
- [ ] 5.2 mock 10 条静态数据（覆盖正常 / 空 / 错误三种情况）
- [ ] 5.3 单元测试时启用 MSW server

## 6. 测试覆盖

- [ ] 6.1 单元测试 `HotPosts.test.tsx`：默认渲染 10 张卡片（mock API 返回正常数据）
- [ ] 6.2 单元测试：空态渲染（mock API 返回 `{ items: [] }`）
- [ ] 6.3 单元测试：错误态 + Retry（mock API 500，retry 后成功）
- [ ] 6.4 单元测试：点击跳转 `/community/post/{id}`（mock Next.js Link）
- [ ] 6.5 单元测试：时间格式化（mock 当前时间为 2026-08-22T12:00:00Z，断言 `"2h ago"` 等）
- [ ] 6.6 Storybook `HotPosts.stories.tsx`：4 个 story（normal / loading / empty / error）
- [ ] 6.7 E2E `tests/e2e/homepage.spec.ts` 加用例：访问 `/` 后热门帖子渲染

## 7. 验证与归档

- [ ] 7.1 Lighthouse 跑分：区域级 LCP < 2s（数据延迟时 < 2.5s）
- [ ] 7.2 响应式验证：375px / 768px / 1024px 截图对比
- [ ] 7.3 视觉回归：4 种状态截图（normal / loading / empty / error）
- [ ] 7.4 axe-core 可访问性扫描
- [ ] 7.5 `npm run build` 无 error / warning
- [ ] 7.6 提交 4 件套 + HotPosts 实现（**精确路径**，禁止 `git add .`）：
  ```bash
  git add openspec/changes/homepage-hot-posts/ \
          components/homepage/HotPosts.tsx components/homepage/HotPostCardLarge.tsx \
          components/homepage/HotPostCardSmall.tsx components/homepage/HotPostsSkeleton.tsx \
          components/homepage/HotPostsEmpty.tsx components/homepage/HotPostsError.tsx \
          components/homepage/HotPosts.test.tsx components/homepage/HotPosts.stories.tsx \
          hooks/useHotPosts.ts lib/api/homepage.ts lib/utils/time.ts \
          types/homepage.ts mocks/handlers/homepage.ts && \
  git commit -m "feat(homepage): implement HotPosts unit per OpenSpec spec

  - React Query fetching /api/homepage/hot-posts (staleTime 5min, retry 3)
  - 10 cards layout: 1 large + 3 stacked mid + 6 horizontal small (desktop)
  - Three states: Loading Skeleton / Empty + 'Write a Post' / Error + Retry
  - Relative time format ('2h ago' / '3d ago') via dayjs
  - MSW mock handler with 10 static posts
  - 4 OpenSpec artifacts (proposal/design/tasks/specs)
  - 10 Scenarios covered by unit tests"
  ```
- [ ] 7.7 `openspec archive homepage-hot-posts --yes` 归档（实施完成后）

---

## 工作量估算

- **阶段 1（类型 API）**：~0.1 人天
- **阶段 2（工具）**：~0.05 人天
- **阶段 3（子组件）**：~0.2 人天（5 个）
- **阶段 4（主组件）**：~0.15 人天
- **阶段 5（MSW Mock）**：~0.1 人天
- **阶段 6（测试）**：~0.25 人天
- **阶段 7（验证归档）**：~0.15 人天
- **合计**：~1 人天

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `design.md` / `specs/homepage-hot-posts/spec.md`