# Words

移动端单词背诵 PWA 项目。

## Tech Direction

- Next.js
- Vercel Deployments
- Vercel Postgres
- Vercel Blob（按需）
- Vercel KV（按需）
- Vercel AI SDK

## Current Status

当前仓库已完成第一步架构文档初始化。

请先阅读：

- `ARCHITECTURE.md`

## Product Direction

核心体验：

- 首页管理今日任务
- 进入背诵流程
- 单词详情页做理解扩展
- 完成后展示每日结果
- 移动端优先 + PWA 体验

## Next Suggested Steps

1. 初始化 Next.js 项目骨架
2. 建立 App Router 页面结构
3. 接入 Tailwind CSS 和基础设计 token
4. 接入 Vercel Postgres
5. 先打通首页 -> 背诵 -> 完成页主链路

## Notes

- 当前阶段不展开字段级数据库设计
- AI 作为增强层，不阻塞核心学习流程
- Vercel KV 只用于缓存，不作为主数据真相来源
