# WanderChina

> 面向外国游客的中国入境旅游平台  
> 含 AI 助手 + 旅行社区 + 结构化景点攻略

---

## 当前状态

**OpenSpec 化阶段（v0.1.0）**：仅包含 OpenSpec 四件套（proposal / design / tasks / specs），未含实施代码。

```
openspec/changes/wanderchina-homepage/
├── proposal.md                        ← Why / What Changes / Capabilities / Impact
├── design.md                          ← Context / Goals / Decisions / Risks
├── tasks.md                           ← 5 阶段 / 64 个原子任务
└── specs/wanderchina-homepage/
    └── spec.md                        ← 7 ADDED Requirements + 22 Scenarios
```

## 项目计划

- **首页 MVP**：7 个独立可开发的能力单元（Hero / FeatureNav / CityQuickEntry / AiEntry / HotPosts / HotSpots / PageShell），工作量约 5 人天（3 周 AI 辅助单人）。
- **后端**：Spring Boot 3.2（已有 `/api/homepage/*` 端点）。
- **前端**：Next.js 14+ App Router + TypeScript + Tailwind + shadcn/ui + React Query。

详细见 [openspec/changes/wanderchina-homepage/proposal.md](openspec/changes/wanderchina-homepage/proposal.md)。

## OpenSpec 工作流

```bash
# 1. 校验当前 change
openspec validate wanderchina-homepage --strict

# 2. 查看 change 状态
openspec status --change wanderchina-homepage

# 3. 列出所有 changes
openspec list

# 4. 实施完成后归档
openspec archive wanderchina-homepage --yes
```

## 文档

- **首页提案**：[proposal.md](openspec/changes/wanderchina-homepage/proposal.md)
- **首页设计**：[design.md](openspec/changes/wanderchina-homepage/design.md)
- **首页任务**：[tasks.md](openspec/changes/wanderchina-homepage/tasks.md)
- **首页规范**：[spec.md](openspec/changes/wanderchina-homepage/specs/wanderchina-homepage/spec.md)
- **详细 spec 单元**（阶段 2 由外部 spec 仓库迁移到本仓库 `docs/specs/`）：
  - `docs/specs/homepage-hero.md`
  - `docs/specs/homepage-feature-nav.md`
  - `docs/specs/homepage-city-quick-entry.md`
  - `docs/specs/homepage-ai-entry.md`
  - `docs/specs/homepage-hot-posts.md`
  - `docs/specs/homepage-hot-spots.md`
  - `docs/specs/homepage-page-shell.md`

## 许可证

待定（建议 MIT）。

---

**版本**: 0.1.0  
**最后更新**: 2026-08-23