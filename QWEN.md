# MeHub 项目上下文

## 项目概述

MeHub 是一个个人博客网站项目，基于 **Next.js 16** 构建，采用 App Router 架构。项目主要用于展示技术文章、日常记录和个人信息。

### 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | Next.js 16 (App Router) |
| **语言** | TypeScript 5 |
| **UI 库** | shadcn/ui (Radix UI) |
| **样式** | Tailwind CSS v4 |
| **动画** | Motion (Framer Motion) |
| **内容管理** | Content Collections |
| **Markdown 处理** | rehype-pretty-code, remark-gfm |
| **字体** | Geist Sans / Geist Mono |

### 项目结构

```
mehub/
├── app/                    # Next.js App Router 页面
│   ├── (index)/           # 首页
│   ├── about/             # 关于页面
│   ├── blog/              # 博客列表页
│   ├── daily/             # 日常记录页
│   └── post/              # 文章详情页
├── components/            # React 组件
│   ├── ui/                # shadcn/ui 基础组件
│   ├── layout/            # 布局组件 (Header, Main)
│   ├── blog/              # 博客相关组件
│   ├── post/              # 文章相关组件
│   └── mdx/               # MDX 渲染组件
├── contents/              # 博客内容源文件
│   ├── posts/             # 技术文章 (.mdx)
│   ├── daily/             # 日常记录 (.mdx)
│   └── notices/           # 公告通知 (.md)
├── config/                # 配置文件
├── lib/                   # 工具函数和 Hooks
│   ├── utils.ts           # 通用工具函数 (cn, throttle, debounce)
│   ├── useContents.ts     # Content Collections Hook
│   ├── useMediaQuery.ts   # 媒体查询 Hook
│   ├── useOnlineTime.ts   # 在线时长 Hook
│   └── weather.ts         # 天气相关工具
├── public/                # 静态资源
├── types/                 # TypeScript 类型定义
└── .content-collections/  # Content Collections 生成目录
```

## 构建与运行

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器 (HTTP, 端口 3596)
npm run dev

# 启动开发服务器 (HTTPS)
npm run dev:https
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### 代码质量

```bash
# ESLint 检查
npm run lint

# Prettier 检查
npm run prettier:check

# Prettier 格式化
npm run prettier:write
```

## 开发规范

### 组件开发

1. **优先使用 shadcn/ui 组件库**
2. 新增组件必须通过 CLI 命令：
   ```bash
   npx shadcn add <组件名称>
   ```
3. 禁止手动复制 shadcn 组件源码
4. 自定义组件需保持与现有组件风格一致

### 内容创作

- `contents/` 目录用于存放博客内容
- 支持的文件类型：
  - `posts/**/*.mdx` - 技术文章
  - `daily/**/*.mdx` - 日常记录
  - `notices/**/*.md` - 公告通知
- 创建新内容时只需提供简要占位内容

### 代码风格

- 严格遵循 ESLint 配置 (`eslint.config.mjs`)
- 使用 Prettier 格式化代码 (`.prettierrc`)
- 保存时自动格式化 (VS Code 配置)
- 样式优先使用 Tailwind CSS 类
- 禁止随意编写全局 CSS

### 工具函数

`lib/utils.ts` 提供以下通用函数：

- `cn(...inputs)` - 类名合并工具 (clsx + tailwind-merge)
- `throttle(func, delay)` - 节流函数
- `debounce(func, delay)` - 防抖函数
- `calculateOnlineTime(startTime)` - 计算运行时长

### 内容集合配置

`content-collections.ts` 定义了三种内容集合：

| 集合 | 目录 | 字段 |
|------|------|------|
| `posts` | `contents/posts` | title, summary, tags, content, date |
| `daily` | `contents/daily` | title, weather, content, date, weekday |
| `notices` | `contents/notices` | title, date, priority, tags, content |

## 重要配置

### Next.js 配置 (`next.config.ts`)

- 使用 `withContentCollections` 插件（必须是最外层）
- 图片质量配置：[75, 90, 100]
- 环境变量：`NEXT_PUBLIC_APP_VERSION` 从 package.json 读取

### TypeScript 配置 (`tsconfig.json`)

- 严格模式开启
- 路径别名：`@/*` 指向根目录
- 支持增量编译
- Next.js 类型插件启用

### 路径别名

```typescript
@/*           → ./*
content-collections → ./.content-collections/generated
```

## 注意事项

1. **Content Collections 生成**：修改内容后需重新生成类型
2. **MDX 处理**：使用 rehype-pretty-code 进行代码高亮，主题支持明暗切换
3. **锚点前缀**：文章标题锚点前缀为 `iamcola-`，日常记录为 `heading-`
4. **PWA 支持**：项目包含 PWA 相关配置 (`manifest.ts`, `UsePWA` 组件)
5. **SEO 优化**：已配置 sitemap、robots、metadata
