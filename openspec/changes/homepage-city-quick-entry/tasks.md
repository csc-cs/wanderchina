# Tasks: homepage-city-quick-entry（CityQuickEntry 实施任务分解）

> **Change**: homepage-city-quick-entry  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / design.md / specs/homepage-city-quick-entry/spec.md  
> **前置依赖**: wanderchina-homepage 阶段 1 基础设施完成

---

## 1. 组件实现

- [ ] 1.1 创建 `components/homepage/CityQuickEntry.tsx`：函数式组件 + `interface CityQuickEntryProps`
- [ ] 1.2 实现桌面 / 平板网格：`hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4`
- [ ] 1.3 实现移动横滑：`md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4`，每卡 `w-[42vw]`
- [ ] 1.4 实现 CityCard 子组件：`aspect-square rounded-2xl` + flex 居中
- [ ] 1.5 实现 emoji 图标：`text-5xl md:text-6xl` + `group-hover:scale-105 transition-transform duration-200`
- [ ] 1.6 实现城市名：`name_en` font-semibold + `name_zh` text-xs（条件渲染）
- [ ] 1.7 实现 hover 动效：`bgColor` + `hoverColor` + `transition-all duration-200 motion-reduce:transform-none`
- [ ] 1.8 实现 `aria-label`：`Enter ${city.name_en} city guide`
- [ ] 1.9 实现 title / subtitle 区域头部（条件渲染）

## 2. 配置与类型

- [ ] 2.1 创建 `config/cities.ts`（共享给景点攻略模块）：`MVP_CITIES` 常量数组（8 条）
- [ ] 2.2 城市记录：`code` / `name_en` / `name_zh` / `icon` / `bgColor` / `hoverColor`
- [ ] 2.3 `lib/validation.ts` 追加 `CITY_ENTRY_CONSTRAINTS`（COUNT=8, NAME_EN_MAX_LENGTH=40, NAME_ZH_MAX_LENGTH=10）

## 3. 测试覆盖

- [ ] 3.1 单元测试 `CityQuickEntry.test.tsx`：默认 8 张卡片渲染（验证顺序 + 中英文名）
- [ ] 3.2 单元测试：name_zh 缺失降级（仅显示英文名 + 控制台 warn）
- [ ] 3.3 单元测试：点击跳转 `/guides/{code}`（mock Next.js Link）
- [ ] 3.4 单元测试：响应式断点切换（mobile 横滑 vs 桌面网格）
- [ ] 3.5 Storybook `CityQuickEntry.stories.tsx`：4 个 story（default / mobile / tablet / custom）

## 4. 验证与归档

- [ ] 4.1 Lighthouse 跑分：区域级 LCP < 1.5s
- [ ] 4.2 响应式验证：375px / 768px / 1024px 截图对比
- [ ] 4.3 axe-core 可访问性扫描：aria-label + 焦点环 + 颜色对比度
- [ ] 4.4 `npm run build` 无 error / warning
- [ ] 4.5 提交 4 件套 + CityQuickEntry 实现（**精确路径**，禁止 `git add .`）：
  ```bash
  git add openspec/changes/homepage-city-quick-entry/ \
          components/homepage/CityQuickEntry.tsx components/homepage/CityQuickEntry.test.tsx \
          components/homepage/CityQuickEntry.stories.tsx \
          config/cities.ts lib/validation.ts && \
  git commit -m "feat(homepage): implement CityQuickEntry unit per OpenSpec spec

  - 8 MVP city cards (Beijing/Shanghai/Xi'an/Chengdu/Chongqing/Hangzhou/Guangzhou/Xiamen)
  - Responsive: 4x2 desktop / 2x4 tablet / snap-x mobile
  - hover: bgColor deepen + emoji scale(1.05), 200ms
  - graceful degradation when name_zh missing
  - 4 OpenSpec artifacts (proposal/design/tasks/specs)
  - 5 Scenarios covered by unit tests"
  ```
- [ ] 4.6 `openspec archive homepage-city-quick-entry --yes` 归档（实施完成后）

---

## 工作量估算

- **阶段 1（组件）**：~0.2 人天
- **阶段 2（配置）**：~0.05 人天（8 条城市记录）
- **阶段 3（测试）**：~0.15 人天
- **阶段 4（验证归档）**：~0.1 人天
- **合计**：~0.5 人天

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `design.md` / `specs/homepage-city-quick-entry/spec.md`