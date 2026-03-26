# Recallink / 背词判官

移动端优先的单词背诵 PWA。风格走 **Ink & Iron / Panda Judge**：纸墨质感、高对比、轻一点的“判词”人格，不走通用 SaaS 面板味。

## 这次 MVP 已打通什么

- 首页 `/`
  - 今日任务总览
  - deck 列表
  - 最近战绩
  - 可直接创建新 review session
- 背词入口 `/review`
- 背词流程 `/review/[sessionId]`
  - 会话进度
  - hint / example 展开
  - 熟悉 / 陌生 / 忘记 三态提交
  - 自动完成并跳转结果页
- 单词详情 `/word/[wordId]`
- 结果页 `/result/[sessionId]`
- 词库页 `/library`
- 设置页 `/settings`
- API routes
  - `GET /api/tasks/home`
  - `POST /api/tasks/target`
  - `POST /api/review/create`
  - `GET /api/review/[sessionId]`
  - `POST /api/review/[sessionId]/submit`
  - `POST /api/review/[sessionId]/complete`
  - `GET /api/words/[wordId]`
  - `GET /api/ai/word/[wordId]`
- 数据层
  - Vercel Postgres-friendly schema
  - `postgres` client
  - seed script
  - 未配置 DB 时自动回退到内置 demo seed
- PWA baseline
  - manifest
  - app icons
  - service worker app shell cache

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- `postgres` for Vercel Postgres

## 项目结构（当前重点）

```txt
src/
  app/
    api/
    review/
    result/
    word/
    library/
    settings/
  components/
  features/
  lib/
    ai/
    constants/
    db/
    pwa/
    utils/
  server/
    repositories/
    services/
  types/
```

## 本地启动

```bash
npm install
npm run dev
```

打开：

```bash
http://localhost:3000
```

## 环境变量

先复制：

```bash
cp .env.example .env.local
```

### 方案 A：先用内置 demo 数据（最快）

什么都不用填，直接跑。

- 首页、背词流、结果页都会用内置 seed 数据
- 适合先看 UI / 主链路 / 前端交互

### 方案 B：接 Vercel Postgres

填写：

- `POSTGRES_URL`
- 以及 Vercel 自动提供的其他 Postgres 变量（可选保留）

然后初始化 schema + seed：

```bash
node --experimental-strip-types scripts/seed.ts
```

> Node 24 可直接跑这个 TypeScript 脚本；如果你本地 Node 太老，换成 tsx 或先升级 Node。

## 开发脚本

```bash
npm run dev
npm run lint
npm run build
```

## 设计原则

- 首页偏总览
- review 页偏极简沉浸
- word detail 偏知识展开 + 兴趣增强
- result 页偏仪式感
- AI 只做增强，不阻塞主流程

## AI 现状

当前 `AI spotlight` 使用 graceful degradation：

- 没接模型也能正常工作
- `/api/ai/word/[wordId]` 会返回 fallback 内容
- 后续可接 Vercel AI SDK 替换 `src/lib/ai/fallback.ts`

## 数据层说明

### 当前 schema 包含
- `app_user`
- `user_settings`
- `deck`
- `word`
- `review_session`
- `review_session_item`

### 当前策略
- **有 DB** → 读写 Postgres
- **无 DB** → 回退内置 seed / memory session

这样本地体验和部署路径都比较顺。

## 后续还可以继续补

- 真正的 SRS / spaced repetition 策略
- 登录和多用户
- AI lyrics / movie hooks
- 音频真实播放与缓存
- 更精细的离线数据同步
