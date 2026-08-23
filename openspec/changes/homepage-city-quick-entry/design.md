# Design: homepage-city-quick-entry（CityQuickEntry 单元内设计决策）

> **Change**: homepage-city-quick-entry  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / tasks.md / specs/homepage-city-quick-entry/spec.md  
> **跨单元决策继承自**: 已归档 `wanderchina-homepage/design.md`

---

## Context

本单元聚焦 8 城市卡片的视觉与响应式策略。跨单元决策（技术栈 / 错误隔离 / 性能）已由 wanderchina-homepage 顶层 design 锁定，本单元不重复。

## Goals / Non-Goals

**Goals:**

- 8 张正方形城市卡（aspect-square），每卡 emoji 图标 + 英文名 + 中文名
- 桌面 4×2 / 平板 2×4 / 移动 snap-x 横滑
- hover 背景色加深 + emoji scale(1.05)（200ms 过渡）
- 全部 `<Link>` 跳转 `/guides/{city.code}`，启用 prefetch
- `name_zh` 缺失时优雅降级为只显示英文（控制台 warn）

**Non-Goals:**

- 不做城市搜索 / 筛选（固定 8 个）
- 不做用户收藏 / 偏好持久化
- 不做 hover 弹窗预览（仅点击跳转）
- 不做第 9 个或更多城市
- 不做真实景点封面图（用 emoji 替代，P1 扩展）

## Decisions

### Decision 1: 城市配置数据结构

**Context**: 8 城市是结构化数据，需要类型安全 + 与景点攻略模块 city.code 严格对齐。

**Decision**:

- 类型：`interface CityEntry { code: string; name_en: string; name_zh?: string; icon: string; bgColor?: string; hoverColor?: string }`
- 配置：`MVP_CITIES: CityEntry[]`（位于 `config/cities.ts`，与景点攻略模块共享）
- Props 允许 `cities?: CityEntry[]` 整体覆盖

**Rationale**:
- `config/cities.ts` 单一数据源（避免城市信息在多处 drift）
- `name_zh` 可选（允许未来国际化扩展）
- bgColor / hoverColor 可选（默认 gray-50 / gray-100 fallback）

### Decision 2: 响应式布局策略

**Context**: 桌面 4 列、平板 2 列、移动横滑三档 viewport 适配。

**Decision**:

| 断点 | 布局 | 实现 |
|---|---|---|
| 移动（< 768px） | 横滑（snap-x） | `md:hidden flex overflow-x-auto snap-x snap-mandatory`，每卡 `w-[42vw]` |
| 平板（≥ 768px） | 2 列 × 4 行 | `hidden md:grid md:grid-cols-2` |
| 桌面（≥ 1024px） | 4 列 × 2 行 | `lg:grid-cols-4` |

**Rationale**:
- 移动横滑节省首屏空间（同时可见约 2.5 张，部分第三张露出）
- 平板 2 列避免 1 列过长（8 张 1 列要滚很久）
- 桌面 4 列让用户一眼看完 8 个城市

### Decision 3: 卡片正方形约束

**Context**: 卡片需要整齐统一，不能因 emoji + 中英文名的高度差异导致参差不齐。

**Decision**: `aspect-square` + `flex flex-col items-center justify-center`

**Rationale**:
- `aspect-square` 保证卡片宽高相等（不论 emoji 大小）
- flex 居中让 emoji + 英文名 + 中文名 始终垂直水平居中
- 中文名缺失时英文名依然居中（无需额外 padding 调整）

### Decision 4: 优雅降级策略

**Context**: `config/cities.ts` 某条记录可能漏配 `name_zh`（数据维护疏忽）。

**Decision**:

- 模板条件渲染：`{city.name_zh && <div className="text-xs text-gray-500 mt-1">{city.name_zh}</div>}`
- 缺失时仅显示英文名 + 控制台 warn：`[CityQuickEntry] Missing name_zh for city: ${code}`
- 不抛 React error

**Rationale**: 数据维护的灵活性 + 组件健壮性兼顾。

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|---|---|---|
| 目标城市攻略页未上线 | 用户点击 404 | 卡片本身不感知；运维提供 "Coming Soon" 页（生产环境） |
| emoji 在老旧设备显示为方块 | 视觉降级 | emoji 默认 inline-block 不撑高容器；P1 可替换为 SVG |
| 移动横滑与底部容器间距 | 视觉紧贴边缘 | `-mx-4 px-4` 让横滑延伸至屏幕边缘但内容有内边距 |
| 8 张卡片未来扩展到 16+ | 移动横滑体验下降 | 接受当前 8 张；扩展时改为"查看更多城市" 按钮跳转 `/guides/cities` |

## 与跨单元决策的对接

| 跨单元决策 | 本单元落地方式 |
|---|---|
| Decision 1（技术栈） | `import Link from 'next/link'` + `interface CityEntry` |
| Decision 2（响应式断点） | `grid-cols-*` + `md:hidden flex` 严格遵循 |
| Decision 3（错误处理） | 仅控制台 warn，无错误隔离风险 |
| Decision 4（性能预算） | 区域级 LCP < 1.5s；纯静态 + emoji 不阻塞 |
| Decision 5（多语言） | 仅英文 city.name_en；name_zh 是辅助显示 |
| Decision 6（主题色） | 各城市 bgColor / hoverColor 用 Tailwind 主题色（gray-50/100 系列） |

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `tasks.md` / `specs/homepage-city-quick-entry/spec.md`