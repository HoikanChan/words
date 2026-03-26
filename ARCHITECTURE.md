# Words PWA Architecture

## Overview

这是一个面向移动端的单词背诵 PWA，核心目标是：

- 以 **每日任务** 驱动学习
- 提供 **低干扰、高专注** 的背诵流程
- 在单词详情页提供 **扩展理解与兴趣增强内容**
- 通过 PWA 提供接近原生 App 的体验

本项目采用：

- **Next.js**
- **Vercel Deployments**
- **Vercel Postgres / Blob / KV（按需）**
- **Vercel AI SDK**

当前阶段只做**架构初始化文档**，不展开字段级详细设计。

---

## Product Goals

### Primary goals

1. 支持用户配置并完成每日背诵任务
2. 提供清晰、轻量、连续的学习流程
3. 在学习完成后给予结果反馈与成就感
4. 通过 AI 能力增强词汇理解和记忆兴趣
5. 支持移动端优先和 PWA 离线体验

### Non-goals (for now)

1. 不在第一阶段实现复杂 SRS 算法
2. 不优先支持多角色协作
3. 不优先支持后台内容运营系统
4. 不在架构初始化阶段细化数据库字段和表结构

---

## Core User Journey

产品的主链路如下：

1. 用户进入首页
2. 查看今日任务情况
3. 选择要背诵的任务列表
4. 设置当天目标量
5. 进入背诵流程
6. 对每个单词进行判断：熟悉 / 陌生 / 忘记
7. 查看单词详情页（含扩展内容）
8. 完成全部任务后进入每日完成页

这是整个系统的主干，所有技术设计都围绕这条链路服务。

---

## Information Architecture

### 1. Home / Daily Mission

职责：

- 展示今日学习概况
- 管理今日目标量
- 选择今日学习任务
- 启动一次新的背诵会话

核心内容：

- 今日进度
- 已完成/待完成数量
- 任务列表或词书列表
- 目标量设置
- 开始背诵按钮

### 2. Review Flow

职责：

- 承载核心背诵交互
- 控制单词卡片的展示顺序与状态切换
- 收集用户对单词掌握程度的反馈

核心交互：

- 先展示原意
- 自动播放音频
- 可点击提示按钮
- 展示部分例句
- 用户选择熟悉/陌生/忘记
- 进入下一个词或详情页

### 3. Word Detail

职责：

- 提供单词的完整理解页面
- 帮助用户建立语义、搭配、词源和联想
- 承接 AI 增强内容

核心内容：

- 基础释义
- 音标与发音
- 例句
- 近义词/相关词
- 词根词源
- AI 推荐的歌词、电影片段等

### 4. Session Result / Daily Completion

职责：

- 呈现本次背诵会话的完成结果
- 强化反馈感和成就感
- 引导用户继续下一步学习

核心内容：

- 本次完成数量
- 学习耗时
- 掌握情况分布
- streak / 连续学习情况
- AI 学习建议

### 5. Library / Task Management

职责：

- 管理词书、任务来源和学习范围
- 作为首页任务配置的补充页

第一阶段只需保留基础入口，复杂管理能力后续再扩展。

---

## Technical Stack

## Frontend

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **PWA support**
- **Vercel AI SDK**

说明：

- Next.js 负责页面路由、服务端渲染、Server Actions 和 API Route。
- App Router 更适合围绕页面段落拆分架构。
- TypeScript 用于约束业务模型和模块边界。
- Tailwind CSS 负责快速搭建设计稿风格。

## Deployment

- **Vercel Deployments**

说明：

- 作为默认部署平台
- 提供 Preview / Production 环境
- 与 Next.js 配合成本最低

## Data & Storage

- **Vercel Postgres**：结构化业务数据
- **Vercel Blob**：媒体/静态内容（按需）
- **Vercel KV**：缓存、短期状态、AI 结果缓存（按需）

说明：

- 业务主数据以 Postgres 为核心
- Blob 用于音频、封面图或部分资源存储（如后续需要）
- KV 只做缓存层，不做主业务真相来源

## AI Layer

- **Vercel AI SDK**

说明：

- 用于生成或组织扩展内容
- 包括歌词推荐文案、电影片段推荐、记忆辅助内容等
- AI 只作为增强层，不阻塞核心学习流程

---

## High-Level System Design

系统分为四层：

### 1. Experience Layer

对应用户可见页面和交互：

- 首页
- 背诵页
- 单词详情页
- 完成页

这一层关注：

- 移动端体验
- 页面结构与信息优先级
- 动效反馈
- PWA 可用性

### 2. Application Layer

对应业务流程组织：

- 创建今日任务
- 创建背诵会话
- 构建待背队列
- 提交单词结果
- 汇总本次完成结果
- 加载 AI 增强内容

这一层是系统的业务核心。

### 3. Data Layer

负责结构化持久化和查询：

- 用户
- 任务
- 会话
- 单词
- 学习记录
- AI 缓存数据

### 4. Infrastructure Layer

负责部署、缓存、存储、环境变量与平台能力：

- Vercel Deployments
- Vercel Postgres
- Vercel Blob
- Vercel KV
- Edge / Serverless runtime（按需）

---

## Route Plan

建议的页面路由如下：

```txt
/
/review
/review/[sessionId]
/word/[wordId]
/result/[sessionId]
/library
/settings
```

### Route responsibilities

- `/`：今日任务首页
- `/review`：背诵入口页/背诵上下文初始化
- `/review/[sessionId]`：单次背诵会话页
- `/word/[wordId]`：单词详情页
- `/result/[sessionId]`：本次学习结果页
- `/library`：词书/任务管理入口
- `/settings`：偏好和产品设置

---

## Suggested Project Structure

```txt
src/
  app/
    page.tsx
    review/
      page.tsx
      [sessionId]/page.tsx
    word/
      [wordId]/page.tsx
    result/
      [sessionId]/page.tsx
    library/
      page.tsx
    settings/
      page.tsx
    api/
      review/
      words/
      ai/
      tasks/

  features/
    home/
    review/
    word/
    result/
    library/

  components/
    ui/
    shared/
    layout/

  lib/
    db/
    ai/
    audio/
    pwa/
    utils/
    constants/

  server/
    services/
    repositories/
    adapters/

  types/
  styles/
```

### Why this structure

- `app/`：负责路由与页面装配
- `features/`：按业务域分模块，避免所有逻辑堆到页面
- `components/`：沉淀通用 UI 与共享组件
- `lib/`：基础设施与工具封装
- `server/`：服务端业务逻辑、数据访问、第三方适配

---

## Feature Modules

## home

负责：

- 首页信息聚合
- 今日任务展示
- 启动学习动作

建议拆分：

- components
- hooks
- services
- view-models

## review

负责：

- 背诵流程状态控制
- 当前单词卡片展示
- 用户反馈提交
- 会话推进

这是最核心模块。

建议把该模块设计成“流程驱动型模块”，而不是普通静态页面模块。

## word

负责：

- 单词详情聚合
- 例句、近义词、相关词展示
- AI 内容挂载

## result

负责：

- 结果统计
- 结果展示
- 后续动作引导

## library

负责：

- 词书/学习范围管理
- 任务来源配置

---

## State Strategy

### Server State

适合放在服务端处理或通过请求获取：

- 今日任务数据
- 会话数据
- 单词详情数据
- 结果页聚合数据
- AI 扩展内容

这类状态的特点是：

- 与数据库一致性相关
- 需要在刷新后恢复
- 可以被缓存

### Client Interaction State

适合放在客户端局部状态：

- 当前展示中的单词卡片阶段
- 是否已播放音频
- 是否已展开提示
- 当前是否正在提交反馈
- 页面过渡动效状态

这类状态只服务当前交互，不需要作为主数据真相来源。

### Recommendation

- 服务端数据优先通过 Next.js 服务端能力处理
- 客户端交互状态保持轻量，不引入过度复杂的状态系统
- 背诵流程如后续变复杂，可升级为状态机模型

---

## Core Flow Design

### Review session lifecycle

一轮背诵会话大致经历：

1. 初始化会话
2. 获取今日队列
3. 逐个展示单词
4. 用户提交掌握反馈
5. 更新会话进度
6. 全部完成后生成结果页数据

### Review card phases

建议将背诵卡片设计为明确阶段：

1. 初始展示
2. 音频播放
3. 提示可用
4. 提示展开
5. 等待用户选择
6. 提交结果
7. 切换到下一词

这样做的好处：

- 交互更稳定
- 后续更容易加动画与恢复逻辑
- 便于埋点与排查问题

---

## Data Responsibility Plan

### Vercel Postgres

适合存储：

- 用户与偏好
- 任务数据
- 会话数据
- 单词数据
- 学习记录
- 结果统计基础数据

### Vercel Blob

适合存储：

- 媒体资源
- 自定义音频或图片资源
- 后续如需用户上传资料，也可扩展到这里

第一阶段如果音频和素材来自外部词典资源，可以暂时不依赖 Blob。

### Vercel KV

适合存储：

- 短期缓存
- 热门单词详情缓存
- AI 结果缓存
- 会话中轻量辅助状态

KV 不应承担长期业务主数据。

---

## AI Integration Strategy

AI 能力放在“增强层”，不放在“主干流程层”。

### Suitable AI use cases

- 推荐包含该词的歌词片段
- 推荐包含该词的电影台词/片段
- 生成更适合记忆的解释或联想
- 生成学习总结文案

### Unsuitable AI dependencies

以下流程不应依赖 AI 才能继续：

- 首页打开
- 背诵页进入
- 用户提交学习结果
- 结果页生成

### AI design principle

- 可异步
- 可缓存
- 可为空
- 可降级

这意味着就算 AI 接口暂时失败，产品主功能也不应受影响。

---

## PWA Strategy

作为移动端优先产品，PWA 是一等公民能力。

### PWA goals

- 可安装到主屏幕
- 页面切换轻量
- 基础能力可离线使用
- 提升重复使用频率

### Offline priorities

优先保障以下内容具备离线/弱网体验：

1. 首页基础壳
2. 最近一次背诵会话的页面壳
3. 最近已访问的单词详情
4. 必要静态资源

### Cache priorities

优先缓存：

- app shell
- 页面静态资源
- 最近学习数据
- 常用音频或词条内容（按需）

### Design note

离线能力目标是“不中断学习”，不是“一切都离线全可用”。

---

## API / Server Action Direction

当前阶段不定义详细接口字段，但定义职责边界。

### review

负责：

- 创建会话
- 获取当前学习进度
- 提交单词判断结果
- 结束会话

### words

负责：

- 获取单词详情
- 获取相关内容
- 获取扩展信息

### ai

负责：

- 获取 AI 推荐内容
- 生成学习建议
- 生成轻量增强文案

### tasks

负责：

- 获取今日任务
- 更新目标量
- 管理今日选择范围

---

## Design System Alignment

基于当前设计稿，整体视觉应遵循以下原则：

### Visual keywords

- 高对比
- 宣纸感 / 纸墨感
- 黑、米白、竹绿
- 编辑感排版
- 不做通用 SaaS 风

### UI principles

- 使用背景层次代替密集边框
- 保持移动端视图聚焦
- 首页偏“总览”，背诵页偏“极简沉浸”
- 单词详情页偏“知识展开 + 兴趣补充”
- 完成页偏“仪式感与成就反馈”

### Brand role

Panda Judge 不是装饰图，而是产品人格的一部分。后续如果需要，可以把它发展成：

- 反馈角色
- 学习结果提示角色
- AI 推荐内容承载角色

---

## Engineering Principles

1. **先打通主链路，再丰富细节**
2. **AI 只增强，不阻塞主流程**
3. **结构化数据优先于 prompt 驱动数据**
4. **缓存是优化手段，不是真相来源**
5. **移动端优先，不做桌面端思维下放**
6. **先模块边界清晰，再考虑复杂抽象**

---

## Phase Plan

### Phase 0 - Foundation

目标：

- 初始化项目基础结构
- 建立页面骨架
- 搭建部署与环境约定
- 明确模块边界

### Phase 1 - Core MVP

目标：

- 首页
- 背诵流程页
- 单词详情页（基础版）
- 完成页
- 基础数据流打通
- 可部署

### Phase 2 - Enhanced Learning

目标：

- 更好的学习状态策略
- 更完整的相关推荐
- 更细的结果分析
- 更强的缓存与离线体验

### Phase 3 - AI Enrichment

目标：

- 歌词推荐
- 电影片段推荐
- 学习总结与建议
- 更自然的内容发现路径

---

## Decision Summary

当前项目技术方向确认如下：

- **Framework:** Next.js
- **Hosting / Deployments:** Vercel Deployments
- **Database:** Vercel Postgres
- **Storage:** Vercel Blob（按需启用）
- **Cache:** Vercel KV（按需启用）
- **AI Layer:** Vercel AI SDK

这是一套偏前端友好、部署顺滑、适合快速推进 MVP 的方案。

后续如果业务复杂度继续上升，再决定是否补充更细的领域建模和数据设计。
