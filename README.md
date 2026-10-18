# InterAct 網頁版
https://usc112520-coder.github.io/interact-web/
此資料夾可直接部署到 GitHub Pages，不需要 npm 安裝或編譯。

https://usc112520-coder.github.io/interact-web/?v=closing12#/presenter/new
講師端入口

https://usc112520-coder.github.io/interact-web/?v=closing12#/
學員端入口


## 部署

1. 將本資料夾內容放在 GitHub 儲存庫根目錄，讓 index.html 位於根目錄。
2. 儲存庫 Settings → Pages → Deploy from a branch → main → / (root) → Save。
3. 開啟 GitHub 顯示的網站網址，再點「講師端」。
4. 系統設定填入既有的 InterAct 管理金鑰，並將學員端網址設為此網站網址（含儲存庫路徑）。

## 後端

GitHub Pages 僅託管前端。互動、資料同步與 AI 仍需要原 Supabase 後端。
若建立場次出現「請使用 InterAct Windows App」，後端管理者需調整 create-session 的來源白名單，允許實際 GitHub Pages 網址；保留 INTERACT_OWNER_KEY 驗證，不可直接移除權限檢查。

config.js 僅含專案識別碼與公開 publishable key。管理金鑰、AI 私鑰及 service_role 不可提交到儲存庫。

原始授權與說明保留於 about。此版本由 Electron 的封裝產物轉換，尚未驗證 GitHub Pages 與真實課堂端到端操作。
