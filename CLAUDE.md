# CLAUDE.md

## 项目概述

这是一个 monorepo 项目，使用 npm workspaces 管理多个子包。主项目是一个包含 React 和 Vue 组件的库。

## 项目结构

```
babel-exp/
├── src/                    # 源代码
│   ├── components/         # React 组件
│   ├── vueComponents/      # Vue 组件
│   ├── utils/              # 工具函数
│   └── service.ts          # Express 服务入口
├── lib/                    # 构建输出目录
├── packages/               # 子包 (workspaces)
│   ├── tasks-api/          # Task API 封装
│   ├── tasks-types/        # 类型定义
│   └── with-zustand/       # Zustand 示例
└── package.json            # 根 package.json
```

## 构建命令

| 命令 | 说明 |
|------|------|
| `npm run build:react` | 构建 React 组件 (Babel) |
| `npm run build:vue` | 构建 Vue 组件 (Vite) |
| `npm run build:all` | 构建全部 |
| `npm run service-start` | 启动 Express 服务 |

## 注意事项

- 依赖安装在根目录，npm 会自动提升子包依赖
- 子包无需单独 `npm install`
- lock 文件只在根目录
- 构建输出到 `lib/` 目录