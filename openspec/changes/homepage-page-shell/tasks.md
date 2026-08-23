# Tasks: homepage-page-shell（PageShell 实施任务分解）

> **Change**: homepage-page-shell  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / design.md / specs/homepage-page-shell/spec.md  
> **前置依赖**: wanderchina-homepage 阶段 1 基础设施 + 其他 5 个单元（Hero / FeatureNav / CityQuickEntry / AiEntry / HotPosts / HotSpots）已就绪

---

## 1. Next.js 入口

- [ ] 1.1 创建 `app/layout.tsx`：根布局 + Inter 字体 + Providers 注入
- [ ] 1.2 创建 `app/providers.tsx`：`'use client'` + QueryClientProvider + QueryClient 配置
- [ ] 1.3 创建 `app/page.tsx`：导出 `metadata` + `default function HomePage() { return <HomeShellClient /> }`
- [ ] 1.4 创建 `app/globals.css`：Tailwind directives + CSS 变量（字体 / 颜色）

## 2. HomeShellClient（核心）

- [ ] 2.1 创建 `app/HomeShellClient.tsx`：`'use client'`
- [ ] 2.2 实现 `useState(SHELL_CONFIG.AI_MODAL_DEFAULT_OPEN)` 管理 `aiOpen`
- [ ] 2.3 实现渲染顺序：Header → main(Hero + FeatureNav + CityQuickEntry + HotPosts + HotSpots) → Footer
- [ ] 2.4 注入 `<AiEntry onOpen={() => setAiOpen(true)} />`
- [ ] 2.5 注入 `<AiAssistantModal open={aiOpen} onClose={() => setAiOpen(false)} />`

## 3. 布局组件

- [ ] 3.1 创建 `components/layout/Header.tsx`：与 Hero 联动（在 Hero 内部渲染）
- [ ] 3.2 创建 `components/layout/Footer.tsx`：简单版权信息

## 4. AI 模态框占位

- [ ] 4.1 创建 `components/homepage/AiAssistantModal.tsx`：`'use client'`
- [ ] 4.2 实现 ESC 键关闭：`useEffect` + `keydown` 监听
- [ ] 4.3 实现 `role="dialog"` + `aria-modal="true"` + `aria-labelledby`
- [ ] 4.4 实现点击遮罩关闭：`onClick={onClose}` 在外层，`onClick={e => e.stopPropagation()}` 在内层
- [ ] 4.5 实现焦点管理：打开时聚焦 closeRef，关闭时回 FAB（`useRef` + `useEffect`）

## 5. 配置与类型

- [ ] 5.1 `config/homepage.ts` 追加 `SHELL_CONFIG` 常量（HEADER_SCROLL_THRESHOLD=100, HEADER_HEIGHT_PX=56, AI_MODAL_DEFAULT_OPEN=false）
- [ ] 5.2 `app/page.tsx` 完整 `metadata` 导出（title / description / OG / Twitter）

## 6. 测试覆盖

- [ ] 6.1 单元测试 `HomeShellClient.test.tsx`：6 单元渲染顺序正确（mock 所有子组件 + 检查 DOM 顺序）
- [ ] 6.2 单元测试：AI Modal 打开 / 关闭（点击 FAB / 点击遮罩 / 按 ESC）
- [ ] 6.3 单元测试：单元失败隔离（mock HotPosts 抛错 + 验证其他单元正常）
- [ ] 6.4 E2E `tests/e2e/homepage.spec.ts`：访问 `/` 后 6 区域可见 + 点击跳转

## 7. 静态资源

- [ ] 7.1 准备 `public/og-image.jpg`（1200×630，< 100KB JPG）
- [ ] 7.2 准备 `public/favicon.ico`（如有）

## 8. 验证与归档

- [ ] 8.1 Lighthouse 跑分：Performance ≥ 90 / LCP < 2.5s / CLS < 0.1 / TTI < 3.5s
- [ ] 8.2 响应式验证：320px / 768px / 1024px / 1440px 截图对比
- [ ] 8.3 视觉回归：4 种状态截图（normal / modal-open / scroll-deep / mobile）
- [ ] 8.4 axe-core 可访问性扫描：无 Critical issue
- [ ] 8.5 跨浏览器：Chrome / Safari 15+ / Firefox / Edge 验证
- [ ] 8.6 `npm run build` 无 error / warning；JS bundle < 150KB gzip
- [ ] 8.7 提交 4 件套 + PageShell 实现（**精确路径**，禁止 `git add .`）：
  ```bash
  git add openspec/changes/homepage-page-shell/ \
          app/page.tsx app/layout.tsx app/providers.tsx app/globals.css \
          app/HomeShellClient.tsx app/HomeShellClient.test.tsx \
          components/layout/Header.tsx components/layout/Footer.tsx \
          components/homepage/AiAssistantModal.tsx \
          config/homepage.ts public/og-image.jpg public/favicon.ico && \
  git commit -m "feat(homepage): implement PageShell unit per OpenSpec spec

  - Next.js App Router entry (app/page.tsx + app/layout.tsx)
  - HomeShellClient assembles 6 units in order
  - AI Modal state owned by Shell (onOpen injected to AiEntry)
  - SEO metadata: title/description/OG image/Twitter card
  - Unit failure isolation (each unit owns its ErrorBoundary)
  - Inter font via next/font/google
  - 4 OpenSpec artifacts (proposal/design/tasks/specs)
  - 10 Scenarios covered by unit tests + E2E"
  ```
- [ ] 8.8 `openspec archive homepage-page-shell --yes` 归档（实施完成后）

---

## 工作量估算

- **阶段 1（Next.js 入口）**：~0.1 人天
- **阶段 2（HomeShellClient）**：~0.1 人天
- **阶段 3（布局组件）**：~0.05 人天
- **阶段 4（AI Modal）**：~0.1 人天
- **阶段 5（配置）**：~0.05 人天
- **阶段 6（测试）**：~0.15 人天
- **阶段 7（静态资源）**：~0.05 人天
- **阶段 8（验证归档）**：~0.1 人天
- **合计**：~0.7 人天（略多于原 0.5 人天，因 Shell 涉及 SEO + Modal + 多组件整合复杂度）

## 任务依赖

- 阶段 1-5 → 阶段 6（Shell 就绪后才能测试）
- 阶段 6 → 阶段 8（测试通过才能验证归档）
- 阶段 8 依赖其他 5 单元全部完成（Hero / FeatureNav / CityQuickEntry / AiEntry / HotPosts / HotSpots）

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `design.md` / `specs/homepage-page-shell/spec.md`