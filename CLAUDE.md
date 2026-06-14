# CLAUDE.md

## 项目概述

这是一个 monorepo 项目，使用 pnpm workspaces 管理多个子包。

## 项目结构

```
babel-exp/
├── src/                        # 主项目源代码 (Vite)
│   ├── components/             # React 组件
│   │   ├── App/                # 主应用组件
│   │   └── Mounter/            # 通用组件挂载器
│   ├── index.tsx               # 入口文件
│   ├── routes.ts               # 路由配置
│   ├── index.module.scss       # 入口样式
│   └── global.d.ts             # 全局类型声明
├── packages/                   # 子包 (workspaces)
│   ├── tasks-api/              # Task API 封装 (TypeScript 构建)
│   ├── tasks-types/            # 类型定义 (TypeScript 构建)
│   ├── tasks-service/          # Express 后端服务 (tsx 运行)
│   ├── tasks-with-pinia/       # Vue + Pinia 状态管理 (Vite 构建)
│   ├── tasks-with-redux/       # React + Redux Toolkit (Rollup 构建)
│   └── tasks-with-zustand/     # React + Zustand (tsup 构建)
├── vite.config.ts              # Vite 配置
├── babel.config.json           # Babel 配置
├── eslint.config.ts            # ESLint 配置
├── tsconfig.json               # TypeScript 配置
└── index.html                  # Vite HTML 入口
```

## 构建命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动 Vite 开发服务器 (端口 3000) |
| `pnpm build` | 构建所有 workspace 包 |
| `pnpm type-check` | TypeScript 类型检查 (`tsc --noEmit`) |
| `pnpm service` | 启动 Express 后端服务 |
| `pnpm prepare` | 初始化 Husky git hooks |

## 注意事项

- 依赖安装在根目录，pnpm 通过 symlink 链接 workspace 包
- 子包无需单独 `pnpm install`；内部依赖使用 `workspace:^` 协议
- lock 文件只在根目录：`pnpm-lock.yaml`
- 发布使用 Changesets：`npx changeset add` → `npx changeset version` → `npx changeset publish`
- 主项目构建输出到 `dist/` 目录
- 已配置 Husky + lint-staged 自动格式化 (Prettier + ESLint)
- 如需构建单个子包，可在对应包目录下执行 `pnpm build`