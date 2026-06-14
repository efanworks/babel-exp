# babel-exp

一个关于 **pnpm workspaces 工程化实践**与**前端状态管理库对比**的实验项目。

---

## 🎯 这个项目在想什么

### 1. pnpm workspaces 的全链路工程化怎么搭

- **Workspaces 管理** — monorepo 下多包如何组织、依赖如何提升、版本如何协调
- **版本与发布** — 多包依赖版本的管理策略（workspace 协议、Changesets 版本管理）
- **多构建工具集成** — 同一仓库里 Vite、tsup、Rollup、tsc 各自扮演什么角色
- **CI 流程** — 构建 → 类型检查 → 测试 → 发布的流水线如何设计
- **代码质量** — Husky + lint-staged + ESLint + Prettier 自动格式化与检查

### 2. 状态管理库的差异在哪里

所有状态库实现的是**同一个 CRUD 任务应用**，用同一套 API 和数据模型，方便横向对比。

| 状态库 | 框架 | 构建工具 | 风格 | 场景定位 |
|--------|------|----------|------|----------|
| **Zustand** | React | tsup | 轻量 Hooks 式 | 中小型应用、组件级状态 |
| **Redux Toolkit** | React | Rollup | 约定式 + Immer | 大型应用、复杂状态逻辑 |
| **Pinia** | Vue 3 | Vite | Composition API | Vue 3 官方推荐 |
| **MobX** | React (src) | Babel | 响应式/可变 | 数据模型驱动的应用 |

> 注：另外还有一个 `useSyncExternalStore` 的 Counter 示例（`tasks-with-zustand`），用于验证 React 18+ 的外部存储订阅能力。

---

## 📦 项目结构

```
babel-exp/
├── src/                          # 主应用 (Vite + React)
│   ├── components/
│   │   ├── App/                  # 主应用入口
│   │   └── Mounter/              # 通用组件挂载器（将 Vue 组件挂载到 React 中）
│   ├── index.tsx                 # 入口文件
│   ├── routes.ts                 # 路由配置，展示各状态库实现
│   └── global.d.ts               # 全局类型声明
│
├── packages/                     # workspace 子包
│   ├── tasks-types/              # 共享类型定义 (tsc)
│   │   └── src/index.ts          # Task、MountedFn 类型
│   │
│   ├── tasks-api/                # 统一的 API 请求层 (tsc)
│   │   └── src/
│   │       ├── fetchTasks.ts     # GET /tasks
│   │       ├── addTask.ts        # POST /addTask
│   │       ├── changeTask.ts     # PATCH /changeTask/:id
│   │       └── deleteTask.ts     # DELETE /deleteTask/:id
│   │
│   ├── tasks-service/            # Express 后端服务 (tsx)
│   │   └── src/service.ts        # 内存存储的 REST API
│   │
│   ├── tasks-with-zustand/       # Zustand 实现 (tsup)
│   │   ├── src/store/
│   │   │   ├── useTasks.ts       # Zustand store（异步 CRUD Action）
│   │   │   └── counter.ts        # useSyncExternalStore 示例
│   │   └── src/components/       # Tasks / TaskList / TaskItem / AddTask / Counter
│   │
│   ├── tasks-with-redux/         # Redux Toolkit 实现 (Rollup)
│   │   ├── src/store/
│   │   │   ├── index.ts          # configureStore
│   │   │   └── tasksSlice.ts     # createSlice + createAsyncThunk
│   │   └── src/components/       # Tasks / TaskList / TaskItem / AddTask
│   │
│   ├── tasks-with-pinia/         # Pinia 实现 (Vite)
│   │   ├── src/store/
│   │   │   └── useTasksStore.ts  # defineStore (Options API 风格)
│   │   ├── src/components/       # Tasks / TaskList / TaskItem / AddTask
│   │   └── src/mount.ts          # 挂载函数，供主应用 Mounter 调用
│   │
│   └── ... (可扩展更多状态库)
│
├── vite.config.ts                # Vite 配置
├── babel.config.json             # Babel 配置（主项目组件构建）
├── eslint.config.ts              # ESLint 配置
├── tsconfig.json                 # 根 TypeScript 配置
└── index.html                    # Vite 入口 HTML
```

---

## 🧩 状态库对比总览

| 维度 | Zustand | Redux Toolkit | Pinia | MobX |
|------|---------|---------------|-------|------|
| **样板代码** | 极少（~30 行） | 中等（Slice + Thunk） | 少（defineStore） | 少（class + makeObservable） |
| **状态修改** | `set((state) => {...})` 不可变 | `createSlice` + Immer 不可变 | `this.xxx =` 直接赋值（可变） | `@observable` 自动追踪 |
| **异步处理** | 直接在 Action 中 `await` | `createAsyncThunk` 或 RTK Query | 直接在 Action 中 `await` | `@action` + `flow` |
| **TypeScript** | 泛型推导，类型良好 | 类型完整但复杂 | 内置，自动推导 | 需额外装饰器配置 |
| **学习曲线** | ⭐（几乎零门槛） | ⭐⭐⭐（概念较多） | ⭐⭐ | ⭐⭐⭐（响应式模型） |
| **框架绑定** | 独立（可脱离 React 使用） | React 优先（但有独立 core） | Vue 3 专属 | 独立（可脱离 React） |
| **适用场景** | 中小型应用、快速原型 | 大型团队、复杂状态逻辑 | Vue 3 项目首选 | 数据模型复杂的应用 |
| **Bundle 体积** | ~2KB | ~12KB + React Redux | ~9KB + Vue | ~16KB |

### 各方案的核心差异

**Zustand** — 以最少的 API 暴露实现状态管理。Store 是 plain object，通过 `create` 创建，用 selector 模式精确订阅，天然避免不必要的重渲染。

**Redux Toolkit** — 提供完整的架构约束：Slice 定义状态/Reducer、createAsyncThunk 处理异步、configureStore 集成中间件。适合多人协作的大项目。

**Pinia** — 与 Vue 3 Composition API 深度集成。支持 Options API（如本例）和 Setup Store 两种写法，自动推导 TypeScript 类型，devtools 开箱即用。

**MobX** — 响应式编程模型（类似于 Vue 的响应式系统），通过 `observable` 追踪数据的每次变化。适合数据模型层次深、关系复杂的场景。

---

## 🚀 快速开始

```bash
# 安装依赖（根目录安装，workspaces 自动通过 symlink 链接）
pnpm install

# 启动开发服务器（Vite，端口 3000）
pnpm dev

# 启动后端服务（端口 3010）
pnpm service

# 类型检查全部代码
pnpm type-check

# 构建所有 workspace 包
pnpm build
```

然后访问 http://localhost:3000，各个路由对应不同的状态库实现：

| 路由 | 实现 |
|------|------|
| `/tasks-zustand` | Zustand |
| `/tasks-with-redux` | Redux Toolkit |
| `/tasks-with-pinia` | Pinia（通过 Mounter 嵌入 React） |
| `/useSyncExternalTest` | useSyncExternalStore Counter |

---

## 🔧 构建工具对比

每个子包采用不同的构建工具，方便比较：

| 包 | 构建工具 | 输出格式 | 配置文件 |
|----|----------|----------|----------|
| `tasks-types` | tsc | `.d.ts`（纯类型） | `tsconfig.json` |
| `tasks-api` | tsc | ESM/CJS | `tsconfig.json` |
| `tasks-service` | tsx | 运行时直接执行 | — |
| `tasks-with-zustand` | tsup | `.mjs` + `.cjs` + `.d.ts` | `tsup.config.ts` |
| `tasks-with-redux` | Rollup | ESM (`esm/`) + CJS (`cjs/`) | `rollup.config.js` |
| `tasks-with-pinia` | Vite lib mode | `.mjs` + `.js` + `.d.ts` | `vite.config.ts` |

---

## 📐 版本管理策略

本项目使用 **pnpm workspaces** 管理内部依赖，通过 `pnpm-workspace.yaml` 声明工作区。内部包之间使用 `workspace:^` 协议声明依赖，配合 Changesets 在发布时自动转换为实际版本号。

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
```

> Changesets 发布时会将 `workspace:^` 自动替换为对应的 npm 版本范围（如 `^1.0.2`）。
> 详见 [Changesets 官方文档](https://github.com/changesets/changesets)。

### 依赖关系图

```
tasks-types (类型定义)
     ↑
tasks-api (API 请求层)
     ├── tasks-with-zustand
     ├── tasks-with-redux
     ├── tasks-with-pinia
     └── tasks-service (后端)
```

---

## 📋 命令速查

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动 Vite 开发服务器 (端口 3000) |
| `pnpm build` | 构建所有 workspace 包 |
| `pnpm type-check` | TypeScript 类型检查 |
| `pnpm service` | 启动 Express 后端服务 (端口 3010) |
| `pnpm prepare` | 初始化 Husky git hooks |

---

## 📄 License

ISC