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

当前仓库已完成：

- 架构文档初始化
- Next.js 项目骨架初始化
- App Router 核心路由骨架
- 基础视觉 token 初始化
- Vercel 环境变量示例文件

请先阅读：

- `ARCHITECTURE.md`
- `.env.example`

## Available Routes

- `/` 首页 / 今日任务
- `/review` 背诵入口占位页
- `/review/demo-session` 背诵流程示例页
- `/word/demo-word` 单词详情示例页
- `/result/demo-session` 完成页示例页
- `/library` 词库页骨架
- `/settings` 设置页骨架

## Getting Started

```bash
npm install
npm run dev
```

然后打开：

```bash
http://localhost:3000
```

## Environment Setup

复制一份环境变量：

```bash
cp .env.example .env.local
```

后续根据你实际启用的 Vercel 能力补充：

- Postgres
- Blob
- KV
- AI provider key

## Product Direction

核心体验：

- 首页管理今日任务
- 进入背诵流程
- 单词详情页做理解扩展
- 完成后展示每日结果
- 移动端优先 + PWA 体验

## Next Suggested Steps

1. 接入真实页面组件与设计稿还原
2. 接入 Vercel Postgres
3. 建立 review session 的服务端流程
4. 接入 AI 推荐内容能力
5. 增加 PWA manifest 和缓存策略

## Notes

- 当前阶段不展开字段级数据库设计
- AI 作为增强层，不阻塞核心学习流程
- Vercel KV 只用于缓存，不作为主数据真相来源
