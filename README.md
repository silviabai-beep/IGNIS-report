# IGNIS ERP - Daily Report Form

中文 / English / ไทย 三语同版客户每日更新报告网页模板。

## 功能 / Features / ฟังก์ชัน

- 在线填写每日人力报表 / Fill daily workforce report online / กรอกรายงานกำลังคนออนไลน์
- 自动计算出勤率 / Auto attendance rate calculation / คำนวณอัตราการเข้างานอัตโนมัติ
- 入职、离职、请假、库存表格 / Joiner, resignation, leave, inventory tables / ตารางพนักงานใหม่ ลาออก ลางาน และสต็อก
- 浏览器本地保存 / Save in browser localStorage / บันทึกในเบราว์เซอร์
- 导出 JSON / Export JSON / ส่งออก JSON
- 打印或另存为 PDF / Print or save as PDF / พิมพ์หรือบันทึกเป็น PDF

## GitHub Pages 部署

1. 新建 GitHub 仓库
2. 上传 `index.html`, `styles.css`, `app.js`, `README.md`
3. 进入 Settings → Pages
4. Source 选择 `Deploy from a branch`
5. Branch 选择 `main` 和 `/root`
6. 保存后等待 GitHub Pages 生成网址

## 说明

当前版本是纯前端版本，数据保存在单个浏览器内。
如果要多人共用、数据库库存管理、账号登录、权限和后台报表，需要再连接 Firebase / Supabase / Google Sheets / 自建数据库。
