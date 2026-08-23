# Tasks: wanderchina-homepage（实施任务分解）

> **Change**: wanderchina-homepage  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-23  
> **Related**: proposal.md / design.md / specs/wanderchina-homepage/spec.md  
> **Total Tasks**: 64（5 阶段）

---

## 1. 基础设施（前置依赖，必须最先完成）

- [ ] 1.1 初始化 Next.js 14+ 项目：`npx create-next-app@latest wanderchina-frontend --typescript --tailwind --app --src-dir --import-alias "@/*"`
- [ ] 1.2 安装核心依赖：`npm i @tanstack/react-query lucide-react clsx`
- [ ] 1.3 安装开发依赖：`npm i -D msw @playwright/test vitest @testing-library/react`
- [ ] 1.4 初始化 shadcn：`npx shadcn@latest init`（注意：`shadcn-ui` 已于 2024 改名为 `shadcn`；选 Default / Neutral 主题）
- [ ] 1.5 添加常用 shadcn 组件：`npx shadcn@latest add button card skeleton dialog input`
- [ ] 1.6 创建 `app/providers.tsx`：注入 React Query Provider（`staleTime: 5*60*1000, retry: 3`）
- [ ] 1.7 配置 Tailwind 主题色：`tailwind.config.ts` 加 `brand-primary: '#047857'` / `brand-accent: '#F97066'`
- [ ] 1.8 配置 Inter 字体：`app/layout.tsx` 用 `next/font/google` 加载 Inter + Noto Sans SC
- [ ] 1.9 创建 `config/homepage.ts`：导出 `SHELL_CONFIG` / `AI_ENTRY_CONSTRAINTS` 等常量
- [ ] 1.10 创建 `config/cities.ts`：导出 `MVP_CITIES` 8 个城市配置（被 CityQuickEntry 复用）
- [ ] 1.11 创建 `lib/api/homepage.ts`：封装 `getHotPosts()` / `getHotSpots()` / `getCities()`
- [ ] 1.12 创建 `lib/utils/format.ts`：`formatViewCount()` / `formatRelativeTime()`
- [ ] 1.13 创建 `lib/utils/cn.ts`：`cn()` Tailwind class 合并工具
- [ ] 1.14 创建 MSW handlers：`mocks/handlers/homepage.ts` mock 8 个城市 + 10 个帖子 + 8 个景点
- [ ] 1.15 创建 `__tests__/setup.ts`：配置 Vitest + React Testing Library + MSW server
- [ ] 1.16 创建 `app/page.tsx` 空壳：返回 `<HomeShellClient />` 占位
- [ ] 1.17 创建 `app/HomeShellClient.tsx` 空壳：6 个单元位置预留

## 2. 单元并行开发（基础设施就绪后，6 单元可并行）

### 2.1 Hero（[P0] 1 人天）

- [ ] 2.1.1 创建 `components/homepage/Hero.tsx` + `HeroSearchBox.tsx` + `HeroSkeleton.tsx`
- [ ] 2.1.2 实现搜索框：受控输入 + 300ms debounce + onSearch 回调（本期仅 log）
- [ ] 2.1.3 实现双 CTA："Explore Guides" / "Ask AI"
- [ ] 2.1.4 配 next/image 加载 `/public/hero-bg.jpg`（1920×1080）
- [ ] 2.1.5 单元测试：`Hero.test.tsx` 覆盖 5 个 Scenario

### 2.2 FeatureNav（[P0] 0.5 人天）

- [ ] 2.2.1 创建 `components/homepage/FeatureNav.tsx`
- [ ] 2.2.2 配置 6 个图标：City / Spots / Food / AI / Community / Routes（lucide-react）
- [ ] 2.2.3 实现响应式：移动横滑 / 平板 3×2 / 桌面 6×1
- [ ] 2.2.4 单元测试：`FeatureNav.test.tsx`

### 2.3 CityQuickEntry（[P0] 0.5 人天）

- [ ] 2.3.1 创建 `components/homepage/CityQuickEntry.tsx` + `CityCard.tsx`
- [ ] 2.3.2 从 `config/cities.ts` 读取 MVP_CITIES 8 个城市
- [ ] 2.3.3 实现点击跳转 `/guides/[code]`（next/link prefetch）
- [ ] 2.3.4 实现响应式 + hover 动效
- [ ] 2.3.5 单元测试：`CityQuickEntry.test.tsx` 覆盖 8 个城市渲染

### 2.4 AiEntry（[P0] 0.5 人天）

- [ ] 2.4.1 创建 `components/homepage/AiEntry.tsx`
- [ ] 2.4.2 实现右下角 FAB（移动 48px / 桌面 56px）+ Header "Ask AI" 入口
- [ ] 2.4.3 实现 hover 动效 + tooltip（1500ms 延迟）
- [ ] 2.4.4 创建 `components/homepage/AiAssistantModal.tsx` 占位（"Coming Soon"）
- [ ] 2.4.5 单元测试：`AiEntry.test.tsx`

### 2.5 HotPosts（[P0] 1 人天）

- [ ] 2.5.1 创建 `components/homepage/HotPosts.tsx` + `HotPostCardLarge.tsx` + `HotPostCardSmall.tsx` + 3 个状态组件
- [ ] 2.5.2 创建 `hooks/useHotPosts.ts`（React Query）
- [ ] 2.5.3 实现桌面 1+3+6 布局 / 平板 2+4 / 移动横滑
- [ ] 2.5.4 实现 Loading / Empty / Error 三态
- [ ] 2.5.5 单元测试：`HotPosts.test.tsx` 覆盖 5 个 Scenario

### 2.6 HotSpots（[P0] 1 人天）

- [ ] 2.6.1 创建 `components/homepage/HotSpots.tsx` + `HotSpotCard.tsx` + 3 个状态组件
- [ ] 2.6.2 创建 `hooks/useHotSpots.ts`
- [ ] 2.6.3 实现桌面 4×2 / 平板 2×4 / 移动横滑
- [ ] 2.6.4 实现 Loading / Empty / Error 三态
- [ ] 2.6.5 单元测试：`HotSpots.test.tsx`

## 3. PageShell 整合（依赖 6 单元就绪）

- [ ] 3.1 创建 `components/layout/Header.tsx`：滚动联动透明/实底（200ms 过渡）
- [ ] 3.2 创建 `components/layout/Footer.tsx`：简单版权信息
- [ ] 3.3 完善 `app/HomeShellClient.tsx`：按顺序组装 Hero / FeatureNav / CityQuickEntry / HotPosts / HotSpots / Footer
- [ ] 3.4 接入 AiEntry + AiAssistantModal：Shell 管理 aiOpen state
- [ ] 3.5 配置 SEO metadata：title / description / OG image
- [ ] 3.6 E2E 测试：`tests/e2e/homepage.spec.ts` 用 Playwright 验证 6 个区域可见 + 点击跳转

## 4. 视觉与质量验证

- [ ] 4.1 Lighthouse 跑分：Performance / Accessibility / Best Practices / SEO 均 ≥ 90
- [ ] 4.2 响应式验证：320px / 768px / 1024px / 1440px 截图对比
- [ ] 4.3 视觉回归：4 个状态截图（normal / loading / empty / error）
- [ ] 4.4 可访问性扫描：axe-core 无 Critical issue
- [ ] 4.5 跨浏览器：Chrome / Safari / Firefox / Edge 验证
- [ ] 4.6 `mvn verify` 后端通过 + `npm run test` 前端通过
- [ ] 4.7 `npm run build` 无 warning；JS bundle < 150KB gzip

## 5. 归档与提交

- [ ] 5.1 `git init` 创建本地仓库
- [ ] 5.2 添加 `.gitignore`（node_modules / .next / .env 等）
- [ ] 5.3 提交 4 件套 + 实施代码（**精确路径**，禁止 `git add .`）：
  ```bash
  git add openspec/ src/ public/ package.json package-lock.json tsconfig.json \
          tailwind.config.ts postcss.config.js next.config.js .gitignore README.md && \
  git commit -m "feat(homepage): implement 7 unit components per OpenSpec spec

  - 4 OpenSpec artifacts (proposal/design/tasks/specs)
  - 7 unit components: Hero / FeatureNav / CityQuickEntry / AiEntry
    HotPosts / HotSpots / PageShell
  - Lighthouse Performance >= 90, JS bundle < 150KB gzip"
  ```
- [ ] 5.4 评估是否推送 GitHub 远程仓：`gh repo create wanderchina --public --source=. --push`（可选）
- [ ] 5.5 `openspec archive wanderchina-homepage --yes` 归档（实施完成后）

---

## 使用指南（本文件）

### 工作量估算

- **阶段 1（基础设施）**：~1 人天
- **阶段 2（6 单元并行）**：~3 人天（理论 5 人天，并行压缩）
- **阶段 3（Shell 整合）**：~0.5 人天
- **阶段 4（验证）**：~0.5 人天
- **阶段 5（归档）**：~0.2 人天
- **合计**：~5 人天（实际单人 AI 辅助 3 周可完成）

### 任务依赖关系

- 阶段 1 → 阶段 2（基础设施必须先完成）
- 阶段 2.1-2.6 → 阶段 3（6 单元就绪后才能整合）
- 阶段 3 → 阶段 4（Shell 就绪后才能验证）
- 阶段 4 → 阶段 5（验证通过后才能归档）

### DEMO 标记

- 所有任务均为**实际执行任务**（本 change 不是示例，是真实业务）
- `[P0]` 前缀标识优先级（本期必做）
- `[P1]` / `[P2]` 优先级（如未来扩展添加）

---

**版本**: 1.0.0
**最后更新**: 2026-08-23
**关联**: `proposal.md` / `design.md` / `specs/wanderchina-homepage/spec.md` / 7 个详细 spec 单元（`docs/specs/homepage-*.md`，阶段 2 迁移）
