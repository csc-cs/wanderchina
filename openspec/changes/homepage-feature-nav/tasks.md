# Tasks: homepage-feature-nav（FeatureNav 实施任务分解）

> **Change**: homepage-feature-nav  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / design.md / specs/homepage-feature-nav/spec.md  
> **前置依赖**: wanderchina-homepage 阶段 1 基础设施完成（任务 1.1-1.17）

---

## 1. 组件实现

- [ ] 1.1 创建 `components/homepage/FeatureNav.tsx`：函数式组件 + `interface FeatureNavProps`
- [ ] 1.2 实现响应式网格：`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- [ ] 1.3 实现卡片渲染循环：`cards.map(card => <Link key={card.href} href={card.href}>...)`
- [ ] 1.4 实现 emoji 图标容器：`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6`
- [ ] 1.5 实现标题 + 描述：H3 + line-clamp-2 描述
- [ ] 1.6 实现 "Enter →" 按钮行：lucide-react `ArrowRight` + `group-hover:translate-x-1`
- [ ] 1.7 实现 hover 动效：`hover:-translate-y-1 hover:shadow-lg transition-all duration-200 motion-reduce:hover:translate-y-0`
- [ ] 1.8 实现可选 title / subtitle 区域头部（条件渲染）
- [ ] 1.9 实现 `aria-label`：`{card.title} - {card.description}`（描述跳转目标）

## 2. 配置与类型

- [ ] 2.1 `config/homepage.ts` 追加 `DEFAULT_FEATURE_CARDS` 常量（3 张固定卡片：Community / Guides / AI Assistant）
- [ ] 2.2 `lib/validation.ts` 追加 `FEATURE_NAV_CONSTRAINTS`（CARDS_COUNT=3, TITLE_MAX_LENGTH=40, SUBTITLE_MAX_LENGTH=120, DESCRIPTION_MAX_LINES=2）

## 3. 测试覆盖

- [ ] 3.1 单元测试 `FeatureNav.test.tsx`：默认 3 张卡片渲染（顺序：Community → Guides → AI Assistant）
- [ ] 3.2 单元测试：props 覆盖（自定义 cards 数组）
- [ ] 3.3 单元测试：点击卡片跳转（mock Next.js Link）
- [ ] 3.4 单元测试：响应式断点切换（mock viewport）
- [ ] 3.5 Storybook `FeatureNav.stories.tsx`：4 个 story（default / mobile / tablet / custom-cards）

## 4. 验证与归档

- [ ] 4.1 Lighthouse 跑分：区域级 LCP < 1.5s（纯静态，几乎瞬时）
- [ ] 4.2 响应式验证：375px / 768px / 1024px 截图对比
- [ ] 4.3 axe-core 可访问性扫描：焦点环 + aria-label + 颜色对比度
- [ ] 4.4 `npm run build` 无 error / warning
- [ ] 4.5 提交 4 件套 + FeatureNav 实现（**精确路径**，禁止 `git add .`）：
  ```bash
  git add openspec/changes/homepage-feature-nav/ \
          components/homepage/FeatureNav.tsx components/homepage/FeatureNav.test.tsx \
          components/homepage/FeatureNav.stories.tsx \
          config/homepage.ts lib/validation.ts && \
  git commit -m "feat(homepage): implement FeatureNav unit per OpenSpec spec

  - 3 feature cards (Community / Guides / AI Assistant)
  - Responsive grid (1/2/3 columns across mobile/tablet/desktop)
  - Hover effects: translateY + shadow + arrow slide (200ms)
  - 4 OpenSpec artifacts (proposal/design/tasks/specs)
  - 5 Scenarios covered by unit tests"
  ```
- [ ] 4.6 `openspec archive homepage-feature-nav --yes` 归档（实施完成后）

---

## 工作量估算

- **阶段 1（组件）**：~0.2 人天
- **阶段 2（配置）**：~0.05 人天
- **阶段 3（测试）**：~0.15 人天
- **阶段 4（验证归档）**：~0.1 人天
- **合计**：~0.5 人天

## 任务依赖

- 阶段 1 → 阶段 2（组件完成后写配置）
- 阶段 1-2 → 阶段 3（依赖组件）
- 阶段 3 → 阶段 4（测试通过才能验证）

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `design.md` / `specs/homepage-feature-nav/spec.md`