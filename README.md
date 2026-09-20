# Are You OK? —— 生命守护 AI 助手

## 一、作品简介

Are You OK? 是一款基于 openvela 的生命守护与健康陪伴应用，面向独居、异地生活以及希望进行日常安全确认的用户。

应用以“我还活着”每日确认作为核心交互，并结合可穿戴设备健康数据、QuickApp 与 AI Agent，实现健康状态展示、AI 日常健康建议以及长时间未确认状态下的主动安全守护。

本项目使用 LCKFB Huangshan Pi（SF32LB52）进行真机功能验证，并使用 openvela QEMU 环境完成联网 AI Agent、VelaClaw 与主动安全守护能力验证。

## 二、选题方向

AI 硬件产品创新。

项目将 QuickApp、openvela AI Agent、Skill、自定义 Tool、健康服务和可穿戴硬件结合，探索资源受限设备上的 AI-Native 健康与安全守护应用。

## 三、主要功能

### 1. 每日安全确认

用户通过 QuickApp 点击“我还活着”完成当天确认，应用记录：

- 最近确认时间
- 连续确认天数
- 当日安全状态

### 2. 健康数据展示

通过 openvela 健康服务读取并展示：

- 心率 Heart Rate
- 血氧 SpO2
- 压力 Stress

相关功能已在 Huangshan Pi 真机环境完成验证。

### 3. AI 健康助手

QuickApp 提供 AI 健康助手页面，将健康状态与用户交互交给 AI Agent 处理，生成简短的日常健康建议。

AI 建议仅供日常参考，不用于医学诊断。

### 4. Alive Guardian 主动安全守护

项目实现专用 `alive_guardian` C Tool。

支持：

- `test`：启动 30 秒演示守护
- `confirm`：确认用户安全并重置 72 小时守护
- `status`：查询守护状态
- `cancel`：取消守护

用户说“我还活着”“我没事”“我安全”等自然语言时，由 AI Agent 识别意图，并调用本地 Alive Guardian Tool。

安全状态与定时逻辑由本地确定性代码执行，而不是交给大模型自行计算。

### 5. VelaClaw

项目扩展 `system.velaclaw`，用于连接 QuickApp 与 AI Agent，使 QuickApp 能够向 Agent 发起请求并接收消息，为 AI 页面与主动通知能力提供基础。

## 四、项目目录

```text
contest2026_149_luobuyu/
├── quickapp/
│   └── alive_guardian/       Are You OK? QuickApp 源码
├── logs/                     AI Coding 日志
├── contest2026_149_luobuyu.xml
├── openvela.xml
└── README.md
五、QuickApp

应用包名：

com.application.aliveguardian

主要页面：

Splash 页面
每日安全确认主页
健康详情页
AI 健康助手页

QuickApp 源码位于：

quickapp/alive_guardian/

比赛 manifest 将其映射到 openvela：

packages/apps/contest2026_149_alive_guardian
六、运行与验证环境
真机

硬件：

LCKFB Huangshan Pi
SF32LB52

真机已完成：

QuickApp 运行
每日确认逻辑
健康数据显示
心率、血氧、压力数据读取

Huangshan Pi 本身无 Wi-Fi，因此联网 AI 能力主要在 QEMU 环境进行验证。

QEMU

使用：

./build.sh vendor/openvela/boards/vela/configs/goldfish-arm64-v8a-ap/ --cmake -j8
./emulator.sh cmake_out/vela_goldfish-arm64-v8a-ap/

启动 AI Agent：

ai_agent

QEMU 环境完成了：

MiMo LLM 调用
AI Agent Tool 调用
VelaClaw 通信
30 秒 Alive Guardian 安全守护测试
72 小时安全守护重置
主动定时任务触发验证
七、AI-Native 设计

本项目将自然语言理解与安全关键逻辑进行分离：

用户自然语言
      ↓
AI Agent 意图识别
      ↓
Alive Guardian Tool
      ↓
本地状态与定时任务
      ↓
主动安全通知

LLM 负责理解用户意图，本地 C Tool 负责真正的状态修改和守护任务管理。

这样既保留了自然语言交互能力，又保证了安全守护逻辑的确定性。

八、AI Coding

项目开发过程中使用 Claude Code 等 AI Coding 工具辅助：

openvela 源码分析
QuickApp 开发
AI Agent Tool 与 Skill 设计
VelaClaw 接口调试
CMake / Ninja 编译错误分析
QEMU 与真机问题定位
HTTPS / TLS 问题调试
cron 与主动安全守护逻辑验证
项目文档整理

完整 AI Coding 日志见：

logs/
九、已验证软件环境
openvela：dev-ai-contest-2026
QuickApp：com.application.aliveguardian
AI Agent：openvela AI Agent
QEMU：goldfish-arm64-v8a-ap
真机：LCKFB Huangshan Pi / SF32LB52
LLM：MiMo OpenAI-compatible API
十、说明

本项目重点验证 openvela 在可穿戴 AI 硬件上的应用能力，包括 QuickApp、健康服务、AI Agent、Skill、自定义 Tool 和主动安全守护机制。
