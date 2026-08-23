# Proposal: homepage-city-quick-entry（首页城市快速入口）

> **Change**: homepage-city-quick-entry  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Module**: 首页 / 城市快速入口（8 个 MVP 城市卡片）  
> **Priority**: P0 | **Workload**: 0.5 人天  
> **Related**: design.md / tasks.md / specs/homepage-city-quick-entry/spec.md  
> **详细设计来源**: 外部 spec 仓库 `specs/homepage-city-quick-entry.md`（阶段 2 迁移）

---

## Why

首页城市快速入口是外国游客了解"中国有哪些值得去的城市"的视觉化入口。固定 8 个 MVP 城市（Beijing / Shanghai / Xi'an / Chengdu / Chongqing / Hangzhou / Guangzhou / Xiamen），点击跳转对应城市的景点攻略页。

**业务动机**：

- 把 8 个城市可视化（emoji 图标 + 中英文名）比纯文字列表更直观
- 桌面 4×2 / 平板 2×4 / 移动横滑三档响应式适配
- 与景点攻略模块（`/guides/[code]`）严格对齐 city.code

**为何 OpenSpec 化**：

- 城市配置是结构化数据（8 条静态记录），适合 capability 化
- 后续扩展（增加第 9 个城市 / 替换 emoji 为真实封面图）走 OpenSpec 流程
- 与 wanderchina-homepage 顶层能力解耦

## What Changes

| 动作 | 路径 |
|---|---|
| 新建 | `openspec/changes/homepage-city-quick-entry/proposal.md`（本文件） |
| 新建 | `openspec/changes/homepage-city-quick-entry/design.md` |
| 新建 | `openspec/changes/homepage-city-quick-entry/tasks.md` |
| 新建 | `openspec/changes/homepage-city-quick-entry/specs/homepage-city-quick-entry/spec.md` |
| 引用 | 外部 spec 仓库 `specs/homepage-city-quick-entry.md` |

## Capabilities

### New Capabilities

- `homepage-city-quick-entry`：8 城市快速入口 capability，包含：
  - **Eight MVP City Cards**：固定 8 个城市（Beijing / Shanghai / Xi'an / Chengdu / Chongqing / Hangzhou / Guangzhou / Xiamen）
  - **Responsive Layout**：桌面 4×2 / 平板 2×4 / 移动横滑
  - **Hover Effects**：背景色加深 + emoji scale(1.05)
  - **Next.js Link Navigation**：跳转 `/guides/{code}`，启用 prefetch
  - **Graceful Degradation**：name_zh 缺失降级为只显示英文

### Modified Capabilities

<!-- 空 -->

## Impact

**新增**：

| 路径 | 用途 |
|---|---|
| `openspec/changes/homepage-city-quick-entry/*`（4 文件） | OpenSpec 四件套 |
| 未来实施：`components/homepage/CityQuickEntry.tsx` | 组件 |
| 未来实施：`config/cities.ts` | 8 城市共享配置 |

**不影响**：

- 已归档 `wanderchina-homepage`
- 其他 5 个并行单元

---

## 团队评审清单（Acceptance Criteria）

- [ ] 5 个 Requirement 覆盖原 spec §4.1-4.9
- [ ] `openspec validate homepage-city-quick-entry --strict` 通过
- [ ] 8 个城市顺序固定：Beijing → Shanghai → Xi'an → Chengdu → Chongqing → Hangzhou → Guangzhou → Xiamen
- [ ] city.code 与景点攻略模块对齐（同一份 `config/cities.ts` 共享）
- [ ] Scenario 字段统一英文

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联能力**: 已归档的 `wanderchina-homepage`