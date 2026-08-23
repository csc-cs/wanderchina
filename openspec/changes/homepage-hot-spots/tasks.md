# Tasks: homepage-hot-spots（HotSpots 实施任务分解）

> **Change**: homepage-hot-spots  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / design.md / specs/homepage-hot-spots/spec.md  
> **前置依赖**: wanderchina-homepage 阶段 1 基础设施（React Query Provider / MSW handler / config/cities.ts）

---

## 1. 类型与 API

- [ ] 1.1 `types/homepage.ts` 追加 `HotSpotItem` / `HotSpotsData` / `HotSpotsApiResponse`
- [ ] 1.2 `lib/api/homepage.ts` 追加 `getHotSpots({ limit, apiBaseUrl })`
- [ ] 1.3 `hooks/useHotSpots.ts` 实现 React Query hook（staleTime 10min / retry 3）

## 2. 工具函数

- [ ] 2.1 `lib/utils/format.ts` 追加 `formatViewCount(count: number): string`（覆盖 0 / 999 / 1k / 10k / 1M 边界）
- [ ] 2.2 `config/cities.ts` 追加 `CITY_COLOR_MAP: Record<string, { bg: string; text: string }>`

## 3. 子组件

- [ ] 3.1 创建 `components/homepage/HotSpotCard.tsx`：单卡（封面图 + city badge + 标题 + 浏览量 + 推荐时长）
- [ ] 3.2 创建 `components/homepage/HotSpotsSkeleton.tsx`：8 张骨架卡
- [ ] 3.3 创建 `components/homepage/HotSpotsEmpty.tsx`：空态 UI
- [ ] 3.4 创建 `components/homepage/HotSpotsError.tsx`：错误 UI + "Retry"

## 4. 主组件

- [ ] 4.1 创建 `components/homepage/HotSpots.tsx`：`'use client'` + `interface HotSpotsProps`
- [ ] 4.2 实现三态分发（同 HotPosts）
- [ ] 4.3 实现桌面 4×2 网格：`hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6`
- [ ] 4.4 实现移动横滑：`md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory`，每卡 `w-[70vw]`
- [ ] 4.5 实现 "View All" 跳转 `/guides`
- [ ] 4.6 实现封面图 lazy load（除首屏外）+ `aspect-[3/4]`

## 5. MSW Mock

- [ ] 5.1 `mocks/handlers/homepage.ts` 追加 `http.get('/api/homepage/hot-spots', ...)` handler
- [ ] 5.2 mock 8 条静态数据（覆盖正常 / 空 / 错误三种情况）

## 6. 测试覆盖

- [ ] 6.1 单元测试 `HotSpots.test.tsx`：默认渲染 8 张卡片
- [ ] 6.2 单元测试：空态 / 错误态
- [ ] 6.3 单元测试：浏览量格式化（覆盖 0 / 4823 / 12453 / 1000000 边界）
- [ ] 6.4 单元测试：点击跳转 `/guides/spot/{id}`
- [ ] 6.5 单元测试：城市 badge 颜色（mock CITY_COLOR_MAP）
- [ ] 6.6 Storybook `HotSpots.stories.tsx`：4 个 story（normal / loading / empty / error）
- [ ] 6.7 E2E：访问 `/` 后热门景点渲染

## 7. 验证与归档

- [ ] 7.1 Lighthouse 跑分：区域级 LCP < 1.5s
- [ ] 7.2 响应式验证：375px / 768px / 1024px 截图对比
- [ ] 7.3 视觉回归：4 种状态截图
- [ ] 7.4 axe-core 可访问性扫描
- [ ] 7.5 `npm run build` 无 error / warning
- [ ] 7.6 提交 4 件套 + HotSpots 实现（**精确路径**，禁止 `git add .`）：
  ```bash
  git add openspec/changes/homepage-hot-spots/ \
          components/homepage/HotSpots.tsx components/homepage/HotSpotCard.tsx \
          components/homepage/HotSpotsSkeleton.tsx components/homepage/HotSpotsEmpty.tsx \
          components/homepage/HotSpotsError.tsx components/homepage/HotSpots.test.tsx \
          components/homepage/HotSpots.stories.tsx \
          hooks/useHotSpots.ts lib/utils/format.ts config/cities.ts \
          types/homepage.ts mocks/handlers/homepage.ts && \
  git commit -m "feat(homepage): implement HotSpots unit per OpenSpec spec

  - React Query fetching /api/homepage/hot-spots (staleTime 10min, retry 3)
  - 8 spot cards in 4x2 grid (desktop) / 2x4 (tablet) / snap-x (mobile)
  - formatViewCount: '12.5k views' / '4823 views' / '1.2M views'
  - City badge color mapped via CITY_COLOR_MAP (shared with CityQuickEntry)
  - 3:4 aspect ratio cover image (vertical, gallery feel)
  - MSW mock handler with 8 static spots
  - 4 OpenSpec artifacts (proposal/design/tasks/specs)
  - 10 Scenarios covered by unit tests"
  ```
- [ ] 7.7 `openspec archive homepage-hot-spots --yes` 归档（实施完成后）

---

## 工作量估算

- **阶段 1（类型 API）**：~0.1 人天
- **阶段 2（工具）**：~0.1 人天（formatViewCount + CITY_COLOR_MAP）
- **阶段 3（子组件）**：~0.2 人天
- **阶段 4（主组件）**：~0.15 人天
- **阶段 5（MSW Mock）**：~0.1 人天
- **阶段 6（测试）**：~0.2 人天
- **阶段 7（验证归档）**：~0.15 人天
- **合计**：~1 人天

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `design.md` / `specs/homepage-hot-spots/spec.md`