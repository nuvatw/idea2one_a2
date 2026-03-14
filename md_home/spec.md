# 文件資訊

* **文件名稱**：Web Snake Game 前端技術規格（spec.md）
* **文件版本**：v1.0
* **文件狀態**：Draft
* **最後更新日期**：2026-03-14
* **文件目的**：定義 Web 貪吃蛇（Snake）遊戲 MVP 的前端實作規格，使前端工程師、QA 與 AI coding agent 能直接依據本文件開發與測試。
* **來源**：

  * Spot：做一個貪吃蛇打發時間
  * PRD：Web 貪吃蛇遊戲 PRD v1.0
* **參考依據**：

  * 官方 Next.js 文件（App Router 架構）
  * 官方 Vercel 部署文件

---

# 前言

## Spec 目的

本文件將 PRD 定義的產品需求轉換為可實作的技術規格，明確定義：

* 頁面與路由
* 元件結構
* 遊戲邏輯
* 狀態管理
* Mock Data
* 錯誤處理
* 測試掛鉤

目標是確保：

* 前端工程師可直接依規格實作
* QA 可依規格設計測試
* AI coding agent 可依規格自動生成程式碼

---

## 文件定位

本文件是：

**PRD → Engineering Implementation 的轉換文件**

其用途：

* 定義前端架構
* 定義遊戲邏輯
* 定義 UI / UX 行為
* 定義測試掛鉤

---

## 與 PRD 的關係

PRD：

* 定義產品需求
* 定義功能
* 定義使用者流程

Spec：

* 定義技術架構
* 定義元件
* 定義資料模型
* 定義狀態與邏輯

---

## 本文件適用範圍

適用於：

* 前端工程實作
* QA 測試
* AI coding agent
* Prototype MVP

不適用於：

* 視覺設計文件
* 遊戲設計延伸
* 商業版本規劃

---

# 開發範圍與限制

## 本次實作範圍

MVP 包含：

1. Start Screen
2. Snake Game
3. Score system
4. Food generation
5. Snake growth
6. Collision detection
7. Game Over screen
8. Restart
9. Keyboard control

---

## 不在本次範圍

以下功能不實作：

* 使用者登入
* 排行榜
* 雲端存分
* 多人模式
* 遊戲皮膚
* 音效
* 道具
* 關卡
* 手機觸控操作

---

## Prototype 限制

Prototype：

* 基本方塊 UI
* 無動畫
* 無美術
* Mock data
* 無持久化

---

## 風險提醒

可能風險：

* requestAnimationFrame / interval timing drift
* 鍵盤事件重複觸發
* React re-render 影響遊戲 loop

解法：

* 遊戲 loop 與 React state 分離
* 使用 `useRef` 儲存遊戲狀態

---

# 技術基準

| 技術         | 規格                   |
| ---------- | -------------------- |
| Framework  | Next.js (App Router) |
| Language   | TypeScript           |
| Styling    | Tailwind CSS         |
| Deployment | Vercel               |
| Git        | GitHub               |

---

## Next.js

使用：

App Router

目錄：

```
app/
```

---

## Rendering Strategy

遊戲頁面：

```
Client Component
```

原因：

* keyboard input
* animation
* game loop

---

## Vercel Deployment

環境：

* Preview
* Production

規則：

```
main branch → production
PR branch → preview
```

---

## Mock Data

所有遊戲資料：

```
前端記憶體
```

無 server。

---

## Demo Authentication

本專案：

```
無 auth
```

---

## Demo 級做法

以下為 prototype：

* 無 persistence
* 無 backend
* 無 auth
* local state only

正式產品未來需替換：

* leaderboard
* score storage

---

# 專案結構建議

```
app/
  page.tsx
  layout.tsx

components/
  GameBoard.tsx
  Snake.tsx
  Food.tsx
  ScoreBoard.tsx
  StartScreen.tsx
  GameOverScreen.tsx

lib/
  gameEngine.ts
  collision.ts
  food.ts
  direction.ts

types/
  game.ts

mocks/
  initialState.ts

tests/
  unit/
  e2e/
```

---

## 結構說明

### app/

Next.js App Router。

負責：

* routing
* page

---

### components/

UI 元件。

---

### lib/

遊戲邏輯。

原因：

避免 React re-render。

---

### types/

TypeScript 型別。

---

### mocks/

遊戲初始資料。

---

### tests/

測試。

---

# 路由與頁面規格

## Route

```
/
```

唯一頁面。

---

# 頁面規格

## /

### 目的

遊戲入口。

---

### 使用者

一般玩家。

---

### When

使用者進入網站。

---

### What

顯示：

* Start Screen
* Game Screen
* Game Over

---

### Where

畫面中央。

---

### 頁面區塊

```
GameContainer
 ├ StartScreen
 ├ GameBoard
 └ GameOverScreen
```

---

### 導頁規則

狀態控制：

```
gameState
```

| state    | 畫面           |
| -------- | ------------ |
| idle     | start screen |
| playing  | game         |
| gameover | game over    |

---

### 未授權

不適用。

---

# Server / Client 邊界

## Server Components

* layout
* page

---

## Client Components

* GameBoard
* Snake
* Food
* GameOver
* StartScreen

---

## Client State

遊戲狀態：

```
useState
useRef
```

---

## 避免 client 化

UI wrapper 仍為 server component。

---

# 畫面區塊與元件規格

## StartScreen

### 用途

顯示開始畫面。

---

### 顯示內容

* Title
* Start Button
* Instructions

---

### props

```
onStart(): void
```

---

### 狀態

無。

---

## GameBoard

### 用途

遊戲主畫面。

---

### 顯示

* Snake
* Food
* Grid

---

### props

```
snake: Position[]
food: Position
```

---

### 狀態

無。

---

## ScoreBoard

### 顯示

```
Score: X
```

---

### props

```
score: number
```

---

## GameOverScreen

### 顯示

* Game Over
* Score
* Restart button

---

### props

```
score: number
onRestart(): void
```

---

# 資料與 Mock Data 規格

## Snake

```
type Position = {
 x:number
 y:number
}
```

---

## Snake 初始

```
[
 {x:10,y:10},
 {x:9,y:10},
 {x:8,y:10}
]
```

---

## Food

```
{ x:number, y:number }
```

---

## Score

```
number
```

---

## Grid

```
20 x 20
```

---

## Game Tick

```
200ms
```

---

## 狀態更新

邏輯：

```
move snake
check food
check collision
render
```

---

# 驗證 / 權限 / Session Flow

不適用。

---

# 狀態與互動規格

## Keyboard

支援：

```
ArrowUp
ArrowDown
ArrowLeft
ArrowRight
```

---

## 禁止反向

```
Right → Left
Left → Right
Up → Down
Down → Up
```

---

## 同時按鍵

最後輸入優先。

---

# RWD / UX / Accessibility 規格

## Mobile first

最低：

```
320px
```

---

## Board

保持正方形。

---

## 按鈕

最小：

```
44px
```

---

## 可讀性

Score font：

```
text-xl
```

---

# 錯誤與例外處理

## 空資料

若 snake 為空：

```
reset game
```

---

## Food on snake

重新生成。

---

## Timeout

無。

---

## Collision

牆：

```
x <0
x>=20
y<0
y>=20
```

---

## Self collision

```
snake.includes(head)
```

---

# 測試掛鉤需求

## Unit Test

* snake movement
* collision detection
* food generation

---

## Integration Test

* eat food flow
* score update

---

## E2E

* start game
* play game
* game over
* restart

---

## Manual QA

* keyboard responsiveness
* mobile layout

---

# 部署與環境規格（高層）

## GitHub Repo

單一 repo。

---

## Branch

```
main
feature/*
```

---

## Vercel

自動部署。

---

## CI/CD

最低要求：

* build success
* lint pass

---

# 不做事項

本版不做：

* 音效
* 手機觸控
* leaderboard
* user account
* persistence
* skin system

---

# 假設與待確認事項

1. Board cell size 未定。
2. Snake render 方式（div vs canvas）。
3. Victory 條件是否需要。
4. Game speed 是否固定。

---

# 給 Build / Test 的交接備註

## Build 限制

不可自行加入：

* multiplayer
* leaderboard
* mobile controls

---

## Implementation 決策

需先確認：

* canvas 或 DOM grid

---

## Testing 必須覆蓋

* snake movement
* food spawn
* collision
* restart flow
