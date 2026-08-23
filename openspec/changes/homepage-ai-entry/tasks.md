# Tasks: homepage-ai-entry（AiEntry 实施任务分解）

> **Change**: homepage-ai-entry  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / design.md / specs/homepage-ai-entry/spec.md  
> **前置依赖**: wanderchina-homepage 阶段 1 基础设施完成

---

## 1. 组件实现

- [ ] 1.1 创建 `components/homepage/AiEntry.tsx`：`'use client'` + `interface AiEntryProps`
- [ ] 1.2 实现 FAB 按钮：`<button type="button">` + lucide-react MessageCircle 图标
- [ ] 1.3 实现 FAB 样式：圆形 + `bg-brand-primary` + 阴影 + 200ms 过渡
- [ ] 1.4 实现响应式尺寸：移动 `w-12 h-12` + 桌面 `md:w-14 md:h-14`
- [ ] 1.5 实现 safe-area-inset：内联 style `bottom: calc(...px + env(safe-area-inset-bottom))`
- [ ] 1.6 实现 hover 动效：`hover:scale-105 hover:shadow-2xl motion-reduce:hover:scale-100`
- [ ] 1.7 实现 Header 次级入口：`<Button variant="ghost" size="sm" className="hidden md:inline-flex">Ask AI</Button>`
- [ ] 1.8 实现 handleClick：检查 onOpen 函数存在性 + warn fallback + log 调试
- [ ] 1.9 实现 a11y：FAB `aria-label="Open AI Assistant"` + Header 入口同名 aria-label

## 2. Tooltip 子组件（可选拆分）

- [ ] 2.1 创建 `components/homepage/AiFabTooltip.tsx`（可选：内联在 AiEntry 也可）
- [ ] 2.2 实现 useState `tooltipVisible` + useEffect setTimeout 1500ms
- [ ] 2.3 实现 tooltip UI：`absolute right-full mr-2 px-2 py-1 bg-gray-900 text-white text-xs rounded`
- [ ] 2.4 实现 fade-in / fade-out 过渡

## 3. 类型与配置

- [ ] 3.1 `lib/validation.ts` 追加 `AI_ENTRY_CONSTRAINTS`（FAB_SIZE_DESKTOP=56, FAB_SIZE_MOBILE=48, TOOLTIP_DELAY_MS=1500, HOVER_TRANSITION_MS=200）

## 4. 测试覆盖

- [ ] 4.1 单元测试 `AiEntry.test.tsx`：FAB 点击触发 onOpen（mock 回调 + spy）
- [ ] 4.2 单元测试：Header 入口点击触发 onOpen
- [ ] 4.3 单元测试：移动端 Header 入口隐藏（mock viewport < 768px）
- [ ] 4.4 单元测试：onOpen 未提供时仅 warn（mock console.warn）
- [ ] 4.5 单元测试：tooltip 1.5s 后显示（jest fake timers）
- [ ] 4.6 Storybook `AiEntry.stories.tsx`：3 个 story（desktop / mobile / with-modal-open）

## 5. 验证与归档

- [ ] 5.1 Lighthouse 跑分：FAB 不影响首屏 LCP（fixed 定位）
- [ ] 5.2 响应式验证：375px / 768px / 1024px FAB 尺寸与位置
- [ ] 5.3 axe-core 可访问性扫描：aria-label + 焦点环 + 颜色对比度
- [ ] 5.4 跨浏览器：iOS Safari safe-area-inset 验证
- [ ] 5.5 `npm run build` 无 error / warning
- [ ] 5.6 提交 4 件套 + AiEntry 实现（**精确路径**，禁止 `git add .`）：
  ```bash
  git add openspec/changes/homepage-ai-entry/ \
          components/homepage/AiEntry.tsx components/homepage/AiEntry.test.tsx \
          components/homepage/AiEntry.stories.tsx \
          lib/validation.ts && \
  git commit -m "feat(homepage): implement AiEntry unit per OpenSpec spec

  - FAB (48px mobile / 56px desktop) with safe-area-inset
  - Header entry (desktop only)
  - hover scale + shadow + 1.5s tooltip
  - onOpen callback contract (warns if missing)
  - 4 OpenSpec artifacts (proposal/design/tasks/specs)
  - 5 Scenarios covered by unit tests"
  ```
- [ ] 5.7 `openspec archive homepage-ai-entry --yes` 归档（实施完成后）

---

## 工作量估算

- **阶段 1（组件）**：~0.2 人天
- **阶段 2（Tooltip）**：~0.05 人天（可选拆分）
- **阶段 3（类型）**：~0.05 人天
- **阶段 4（测试）**：~0.15 人天
- **阶段 5（验证归档）**：~0.05 人天
- **合计**：~0.5 人天

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `design.md` / `specs/homepage-ai-entry/spec.md`