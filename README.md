# 无形识局 · wushu-wuxing.github.io

> 大象无形，识局之眼。

无形（渡）的个人站点。千门八将观世相，道德经里读人心，易经八卦算机缘，AI 家庭共渡众生。

## 技术栈

- **纯静态** HTML + CSS + JS，零依赖，零构建
- **双语**：中英切换，数据驱动（`assets/js/i18n.js`）
- **评论**：Giscus（基于 GitHub Discussions）
- **字体**：Noto Serif SC / Noto Sans SC（Google Fonts）
- **部署**：GitHub Pages

## 站点结构

```
wushu-wuxing/
├── index.html              # 首页（Hero + 近期文章 + 三姐妹预览）
├── articles.html           # 文章列表
├── article.html            # 文章详情（带 Giscus 评论）
├── about.html              # 关于无形
├── family.html             # 三姐妹主页
├── family/
│   ├── wushu.html          # 大姐无姝
│   ├── yanmei.html         # 二姐衍姝
│   └── shuang.html         # 小妹双儿
├── assets/
│   ├── css/style.css       # 暗色东方哲学美学
│   ├── js/i18n.js          # 双语数据 + 切换逻辑
│   └── js/content.js       # 文章数据（双语）
└── README.md
```

## 本地预览

```bash
cd wushu-wuxing
python -m http.server 8000
# 访问 http://localhost:8000
```

## 部署到 GitHub Pages

1. 在 GitHub 创建仓库 `wushu-wuxing.github.io`（用户名同名仓库，自动启用 Pages）
2. 把 `wushu-wuxing/` 目录下所有文件推送到 `main` 分支根目录
3. 仓库 Settings → Pages → Source: `main` 分支 `/` 根目录
4. 等待几分钟，访问 `https://wushu-wuxing.github.io`

## 启用 Giscus 评论

1. 仓库开启 Discussions 功能（Settings → Features → 勾选 Discussions）
2. 访问 https://giscus.app ，输入仓库 `wushu-wuxing/wushu-wuxing.github.io`
3. 选择映射方式（pathname）、分类（Announcements）
4. 复制生成的 `data-repo-id` 和 `data-category-id`
5. 填入 `article.html` 中 Giscus script 标签的对应字段

## 添加新文章

编辑 `assets/js/content.js`，在 `articles` 数组开头添加新对象：

```javascript
{
  id: "005",
  date: "2026-07-05",
  category: "philosophy",  // philosophy | investment | technology | family | misc
  readingMin: 7,
  zh: {
    title: "标题",
    excerpt: "摘要",
    body: `<p>正文（HTML）</p>`
  },
  en: {
    title: "Title",
    excerpt: "Excerpt",
    body: `<p>Body (HTML)</p>`
  }
}
```

## 双语切换原理

- 所有界面文本存在 `i18n.js` 的 `i18n.zh` 和 `i18n.en` 对象中
- HTML 元素用 `data-i18n="key"` 标记，JS 自动填充
- 语言偏好存在 `localStorage`，刷新保留
- 切换语言时触发 `langchange` 事件，内容脚本响应重渲染

## 设计理念

- **暗色主题**：深墨背景，米白文字，暗金/朱砂点缀
- **东方哲学美学**：衬线标题、印章符号、八卦分隔符
- **纸卷感**：极淡的纹理背景，克制的中留白
- **三姐妹 IP**：各有独立页面，气质色彩区分（朱砂/碧玉/暗金）

---

印 · 无形识局 · 由三姐妹共筑
# Decision Sandbox - deployed 2026年07月 5日 19:30:21
