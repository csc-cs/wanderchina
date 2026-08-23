# Tasks: homepage-hero（Hero 实施任务分解）

> **Change**: homepage-hero  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / design.md / specs/homepage-hero/spec.md  
> **前置依赖**: wanderchina-homepage 阶段 1 基础设施（tasks.md 1.1-1.17）完成

---

## 1. 组件实现（核心）

- [ ] 1.1 创建 `components/homepage/Hero.tsx`：函数式组件 + `interface HeroProps` + 默认 props
- [ ] 1.2 实现全屏 section：`h-[70vh] md:h-[80vh] lg:h-[calc(100vh-56px)]` + `overflow-hidden`
- [ ] 1.3 实现桌面 / 移动双图渲染：两枚 `<Image>` 用 `hidden md:block` / `block md:hidden` 互斥
- [ ] 1.4 实现渐变遮罩：`absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60`
- [ ] 1.5 实现品牌文案：H1 标语（响应式 32-72px）+ H2 副标题（line-clamp-3）
- [ ] 1.6 实现 `children` 扩展位：在文案下方预留 `{children}`（本期留空，CTA 交给 FeatureNav）
- [ ] 1.7 实现 fade-in 入场动画：`animate-fade-in motion-reduce:animate-none`（遵循 prefers-reduced-motion）

## 2. Header 联动（透明/实底）

- [ ] 2.1 创建 `components/homepage/Header.tsx`：受 `scrollThreshold` prop 控制（默认 100）
- [ ] 2.2 实现 useState `scrolled` + useEffect scroll listener + cleanup
- [ ] 2.3 实现 Header 样式切换：`scrolled ? 'bg-white shadow-md' : 'bg-transparent'`，200ms 过渡
- [ ] 2.4 实现 Logo + 桌面导航（Community / Guides / AI Assistant）+ "Sign In" 占位按钮
- [ ] 2.5 Header 与 Hero 集成：在 Hero 内部 `<Header scrollThreshold={headerScrollThreshold} />`

## 3. 降级与配置

- [ ] 3.1 实现 onError fallback：next/image onError 仅 `console.warn`，不抛 error
- [ ] 3.2 实现容器默认渐变：`bg-gradient-to-br from-brand-primary to-brand-secondary`（无图片也好看）
- [ ] 3.3 创建 `config/homepage.ts` 追加 `HERO_DEFAULTS` 常量（brandTagline / brandSubtitle / image URLs）
- [ ] 3.4 创建 `lib/validation.ts` 追加 `HERO_CONSTRAINTS`（长度上限 / 体积上限）

## 4. 测试覆盖

- [ ] 4.1 单元测试 `Hero.test.tsx`：默认 props 渲染快照（H1 + H2 文案）
- [ ] 4.2 单元测试：props 覆盖（自定义 brandTagline / brandSubtitle / images）
- [ ] 4.3 单元测试：scroll event 触发 Header 切换（mock window.scrollY）
- [ ] 4.4 单元测试：onError 触发 fallback 渐变（mock next/image onError）
- [ ] 4.5 Storybook `Hero.stories.tsx`：4 个 story（normal / mobile / fallback / scrolled）
- [ ] 4.6 E2E `tests/e2e/homepage.spec.ts` 加用例：访问 `/` LCP < 2.5s + 移动端 viewport 布局正确

## 5. 静态资源

- [ ] 5.1 准备 `public/images/hero-desktop.jpg`（1920×1080，< 300KB，AVIF/WebP 优先）
- [ ] 5.2 准备 `public/images/hero-mobile.jpg`（750×1334，< 150KB，AVIF/WebP 优先）
- [ ] 5.3 在 `tailwind.config.ts` 确认 `brand-primary` / `brand-secondary` 主题色已定义（继承自 wanderchina-homepage design Decision 6）

## 6. 验证与归档

- [ ] 6.1 Lighthouse 跑分：Performance ≥ 90 / LCP < 2.5s / CLS < 0.1 / TTI < 3.5s
- [ ] 6.2 响应式验证：320px / 768px / 1024px / 1440px 截图对比
- [ ] 6.3 视觉回归：4 种状态截图（normal / scrolled / mobile / fallback）纳入 Playwright trace
- [ ] 6.4 axe-core 可访问性扫描：无 Critical issue
- [ ] 6.5 跨浏览器：Chrome / Safari 15+ / Firefox / Edge 验证 Header 联动正常
- [ ] 6.6 `npm run build` 无 error / warning；JS bundle < 150KB gzip
- [ ] 6.7 提交 4 件套 + Hero 实现（**精确路径**，禁止 `git add .`）：
  ```bash
  git add openspec/changes/homepage-hero/ \
          components/homepage/Hero.tsx components/homepage/Hero.test.tsx \
          components/homepage/Hero.stories.tsx \
          components/homepage/Header.tsx components/homepage/Header.test.tsx \
          components/homepage/Header.stories.tsx \
          config/homepage.ts lib/validation.ts \
          public/images/hero-desktop.jpg public/images/hero-mobile.jpg && \
  git commit -m "feat(homepage): implement Hero unit + Header per OpenSpec spec

  - Hero with desktop/mobile backgrounds, gradient overlay, fade-in
  - Header with transparent-to-solid scroll behavior (100px threshold, 200ms)
  - 4 OpenSpec artifacts (proposal/design/tasks/specs)
  - Lighthouse LCP < 2.5s, JS bundle < 150KB gzip
  - 5 Scenarios covered by unit tests"
  ```
- [ ] 6.8 `openspec archive homepage-hero --yes` 归档（实施完成后）

---

## 工作量估算

- **阶段 1（组件实现）**：~0.2 人天
- **阶段 2（Header 联动）**：~0.1 人天
- **阶段 3（降级与配置）**：~0.05 人天
- **阶段 4（测试）**：~0.1 人天
- **阶段 5（静态资源）**：~0.05 人天（图片准备可并行）
- **阶段 6（验证归档）**：~0.05 人天
- **合计**：~0.5 人天（与 proposal.md 工作量一致）

## 任务依赖关系

- 阶段 1 → 阶段 2（Hero 主体完成后做 Header）
- 阶段 1-2 → 阶段 3（依赖 Hero 组件结构）
- 阶段 1-3 → 阶段 4（测试依赖组件）
- 阶段 4 → 阶段 6（测试通过才能验证 + 归档）
- 阶段 5 可与阶段 1-4 并行

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `design.md` / `specs/homepage-hero/spec.md` / 已归档 `wanderchina-homepage/tasks.md` 阶段 1 基础设施