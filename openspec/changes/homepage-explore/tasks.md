# Tasks: homepage-explore（Explore 实施任务分解）

> **Change**: homepage-explore  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / design.md / specs/homepage-explore/spec.md  
> **前置依赖**: wanderchina-homepage 阶段 1 + 7 单元全部就绪 + `useHotPosts` / `useHotSpots` 已实现

---

## 1. 类型与数据层

- [ ] 1.1 `types/homepage.ts` 定义 `ExploreCategory` 联合类型 + `ExploreItem` 判别联合
- [ ] 1.2 `config/explore.ts` 定义 `EXPLORE_CATEGORIES` 常量（id / label / icon / accent color）
- [ ] 1.3 `lib/data/explore.ts` 实现 `mergeExploreItems(hotPosts, hotSpots, category)` 客户端合并
- [ ] 1.4 `lib/data/explore.ts` 实现 `filterByCategory(items, category): ExploreItem[]`

## 2. Hook

- [ ] 2.1 `hooks/useExploreItems.ts` 实现：内部并行调用 `useHotPosts()` + `useHotSpots()` + `useState(category)`
- [ ] 2.2 实现 `keepPreviousData` 模式（React Query：切换 tab 时保留旧数据 + 显示 skeleton 背景）

## 3. 主组件

- [ ] 3.1 创建 `components/homepage/Explore.tsx`：`'use client'` + `interface ExploreProps`
- [ ] 3.2 实现 Section Header：标题 "Explore China" + 副标题 "Curated by locals · Updated weekly" + 右侧 "Browse All" 链接到 `/guides`
- [ ] 3.3 渲染 `<CategoryTabs />` + `<ExploreGrid />`
- [ ] 3.4 加载态：12 张 Skeleton 等高（`useSkeletonGrid` 子组件）
- [ ] 3.5 错误态：单个 API 失败时降级（仍渲染成功的部分）
- [ ] 3.6 空态：标题 + "Clear Filters" 按钮（点击重置为 'all'）

## 4. 子组件

- [ ] 4.1 创建 `components/homepage/CategoryTabs.tsx`：5 个 tab + 受控 selected + 滚动指示器（移动端横滑）
- [ ] 4.2 创建 `components/homepage/ExploreGrid.tsx`：`lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6`
- [ ] 4.3 创建 `components/homepage/ExploreCard.tsx`：7 字段 Trust Stack 渲染
  - 4.3.1 Cover Image（next/image，aspect-[3/4]，lazy load）
  - 4.3.2 City Badge（CITy_COLOR_MAP 半透明白底）
  - 4.3.3 Quick View 覆盖层（仅桌面 hover）
  - 4.3.4 Category Icon + Title
  - 4.3.5 Rating + Review Count（★ 4.8 (1.2k)）
  - 4.3.6 Duration + Price（`¥45 / $6`）
  - 4.3.7 "Loved by Xk+ from <country>" 社会证明
- [ ] 4.4 创建 `components/homepage/ExplorePreviewDrawer.tsx`：Quick View 触发的预览抽屉（同 Modal 模式）
- [ ] 4.5 创建 `components/homepage/ExploreSkeleton.tsx`：12 张等高 Skeleton

## 5. 工具函数

- [ ] 5.1 `lib/utils/format.ts` 追加 `formatDuration('2-3 hours' | 'Half day' | 'Full day')` + `formatPrice(cny: number): { cny: string; usd: string }`
- [ ] 5.2 `lib/utils/i18n.ts` 追加 `cnToEnCategory(cn: string): ExploreCategory`（处理后端可能返回中文 category）

## 6. Mock 数据扩展

- [ ] 6.1 `mocks/handlers/homepage.ts` 追加 `category` / `duration` / `price_cny` / `rating` / `review_count` / `loved_by_count` / `loved_by_country` / `english_guide` 字段到 hot-spots / hot-posts 响应
- [ ] 6.2 mock 12 条数据覆盖 5 个分类（每个分类 2-3 条）

## 7. PageShell 集成

- [ ] 7.1 `app/HomeShellClient.tsx`：在 `<HotSpots />` 之后插入 `<Explore />`
- [ ] 7.2 修改 `openspec/changes/homepage-page-shell/specs/homepage-page-shell/spec.md`：渲染顺序 Scenario 增加 Explore（追加 Scenario，不破坏已通过的 validate）
- [ ] 7.3 验证：`openspec validate homepage-page-shell --strict` 仍通过

## 8. Tailwind 色板

- [ ] 8.1 `tailwind.config.ts` 扩展 `colors.brand` 5 色
- [ ] 8.2 `app/globals.css` 加 `:root` CSS 变量（`--brand-primary` / `--brand-accent`）
- [ ] 8.3 验证：Explore 主按钮 `bg-brand-primary` 渲染为 `#4F46E5`

## 9. 测试覆盖

- [ ] 9.1 单元测试 `Explore.test.tsx`：默认渲染 12 张卡（mock API 返回数据）
- [ ] 9.2 单元测试：5 个分类 tab 切换 + 数据筛选正确
- [ ] 9.3 单元测试：Trust Stack 7 字段全部渲染（mock 完整字段）
- [ ] 9.4 单元测试：Quick View hover 触发 drawer
- [ ] 9.5 单元测试：空态 + Clear Filters 重置
- [ ] 9.6 单元测试：单个 API 失败时降级（mock useHotPosts 失败 + useHotSpots 成功 → 仅显示 spots）
- [ ] 9.7 单元测试：双币价格格式化（mock price_cny=45 → 断言 `¥45 / $6`）
- [ ] 9.8 单元测试：社会证明文案（mock loved_by_count=12000 → 断言 `"Loved by 12k+ from USA"`）
- [ ] 9.9 Storybook `Explore.stories.tsx`：5 个分类各 1 story + 加载 / 空 / 错误 各 1 story = 8 个
- [ ] 9.10 E2E `tests/e2e/homepage.spec.ts`：访问 `/` 后 Explore 区块可见 + tab 切换 + 卡片点击跳转

## 10. 可访问性

- [ ] 10.1 `axe-core` 扫描：无 Critical issue
- [ ] 10.2 颜色对比度：白底 + Indigo 按钮 ≥ 4.5:1（WCAG AA）
- [ ] 10.3 Tab 键盘导航：Tab/Shift+Tab 在 5 个分类 + 卡片间循环
- [ ] 10.4 屏幕阅读器：每张卡片有 `aria-label="Explore {title} in {city}, rated {rating} from {review_count} reviews"`

## 11. 性能验证

- [ ] 11.1 Lighthouse 跑分：Explore 区块 LCP < 2.5s
- [ ] 11.2 切换 tab 不重新拉取（React Query cache）
- [ ] 11.3 封面图懒加载（除首屏 4 张外）
- [ ] 11.4 `npm run build` 后 JS bundle 增加 < 30KB gzip

## 12. 验证与归档

- [ ] 12.1 响应式验证：375px / 768px / 1024px / 1440px 截图对比
- [ ] 12.2 视觉回归：5 个分类各 1 截图 + 加载 / 空 / 错误 各 1 截图 = 8 张
- [ ] 12.3 海外用户体验走查（个人 check）：分类标签英文自然 + 价格双币 + 评分显眼 + 社会证明完整
- [ ] 12.4 提交 4 件套 + Explore 实现 + PageShell 修改（**精确路径**，禁止 `git add .`）：
  ```bash
  git add openspec/changes/homepage-explore/ \
          openspec/changes/homepage-page-shell/specs/homepage-page-shell/spec.md \
          components/homepage/Explore.tsx components/homepage/CategoryTabs.tsx \
          components/homepage/ExploreGrid.tsx components/homepage/ExploreCard.tsx \
          components/homepage/ExplorePreviewDrawer.tsx components/homepage/ExploreSkeleton.tsx \
          components/homepage/Explore.test.tsx components/homepage/Explore.stories.tsx \
          hooks/useExploreItems.ts lib/data/explore.ts lib/utils/format.ts lib/utils/i18n.ts \
          types/homepage.ts config/explore.ts mocks/handlers/homepage.ts \
          tailwind.config.ts app/globals.css app/HomeShellClient.tsx && \
  git commit -m "feat(homepage): implement Explore unit (8th) per OpenSpec spec

  - 5 category tabs (Food & Cuisine / Nature & Hiking / History & Culture / Nightlife & Markets)
  - Client-side merge of hot-spots + hot-posts with category filtering
  - Trust Stack: cover + city badge + category icon + duration + price (CNY/USD) +
    rating + review count + 'Loved by Xk+ from <country>' social proof
  - Quick View hover preview (desktop only)
  - Indigo primary (#4F46E5) + Warm Orange accent (#F59E0B) brand colors
  - Skeleton loading / single API degrade / empty state with Clear Filters
  - Responsive: 4-col desktop / 2-col tablet / 1-col mobile
  - PageShell updated: Explore inserted between HotSpots and Footer
  - 4 OpenSpec artifacts (proposal/design/tasks/specs)
  - 10 Scenarios + 10 unit tests covered"
  ```
- [ ] 12.5 `openspec archive homepage-explore --yes` 归档（实施完成后）
- [ ] 12.6 验证 `openspec validate homepage-page-shell --strict` 仍通过（修改 spec 后）

---

## 工作量估算

- **阶段 1-2（数据 + Hook）**：~0.2 人天
- **阶段 3-4（主组件 + 子组件）**：~0.5 人天（5 个子组件）
- **阶段 5（工具）**：~0.1 人天
- **阶段 6（Mock）**：~0.1 人天
- **阶段 7（PageShell 集成）**：~0.05 人天
- **阶段 8（Tailwind）**：~0.05 人天
- **阶段 9（测试）**：~0.3 人天（10 个测试）
- **阶段 10-11（可访问性 + 性能）**：~0.1 人天
- **阶段 12（验证归档）**：~0.1 人天
- **合计**：~1.5 人天

## 任务依赖

- 阶段 1-2 → 阶段 3-4（数据层就绪才能渲染）
- 阶段 4 → 阶段 6（卡片字段定义后 mock 才能扩展）
- 阶段 3-4 → 阶段 9（组件就绪才能测试）
- 阶段 9 → 阶段 12（测试通过才能归档）
- 阶段 7 与 阶段 8 可与阶段 3-4 并行

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `design.md` / `specs/homepage-explore/spec.md`