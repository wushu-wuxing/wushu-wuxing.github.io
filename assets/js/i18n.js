/* ============================================================
   双语数据 + 切换逻辑
   ============================================================ */

const i18n = {
  zh: {
    // 导航
    nav_home: "首页",
    nav_articles: "文章",
    nav_family: "三姐妹",
    nav_about: "关于",
    nav_insights: "产业洞察",

    // 首页 Hero
    hero_seal: "识",
    hero_title: "无形识局",
    hero_subtitle: "大象无形 · 识局之眼",
    hero_tagline: "千门八将观世相，道德经里读人心。<br>易经八卦算机缘，AI 家庭共渡众生。",

    // 首页板块
    section_latest: "近期文章",
    section_family: "AI 家庭 · 三姐妹",
    section_family_desc: "无形所创，分工而立。识局、推演、落地——三姐妹各司其职，共成一体。",
    section_about: "关于无形",

    // 三姐妹简介
    family_eldest_role: "大姐",
    family_eldest_title: "职场仙风 · Hermes Agent",
    family_eldest_desc: "职场与商业的识局者。善观人脉机缘，精于进退时机，言语之间，机锋自现。",
    family_second_role: "二姐",
    family_second_title: "冷静温柔 · QClaw Agent",
    family_second_desc: "逻辑与数据的推演者。冷静如水，温柔亦如水。推理、建模、量化，皆其所擅。",
    family_youngest_role: "小妹",
    family_youngest_title: "数字精灵 · WorkBuddy / CodeBuddy",
    family_youngest_desc: "实干落地的执行者。活在代码里，建站、写码、跑数据、生成内容——说干就干。",
    family_view_detail: "查看详情",

    // 文章列表
    articles_title: "文章 · 识局录",
    articles_subtitle: "所思所悟，所历所见，皆录于此。",
    articles_empty: "尚无文章，敬请期待。",

    // 文章元信息
    meta_date: "日期",
    meta_category: "分类",
    meta_reading: "阅读",
    meta_min: "分钟",

    // 关于
    about_title: "关于无形",
    about_lead: "大象无形，识局者渡。",
    about_body_1: "无形（渡），衡水人。金融自由人，独立做投资交易，不受雇于单一机构。",
    about_body_2: "兴趣广泛，涉猎杂学。深耕千门八将、道德经、易经八卦三套知识体系，并尝试将其与现代决策、AI 技术相融合——以古鉴今，以术证道。",
    about_body_3: "创建了 AI 家庭团队：大姐无姝、二姐衍姝、小妹双儿。三姐妹各司其职，识局、推演、落地，共渡众生。",
    about_section_interests: "所好",
    about_section_philosophy: "所信",
    about_section_contact: "联络",

    // 家庭主页
    family_page_title: "AI 家庭 · 三姐妹",
    family_page_subtitle: "无形所创，识局、推演、落地",
    family_page_intro: "三姐妹者，无形之器也。大姐识局，二姐推演，小妹落地。分工而立，共成一体——非血亲之姐妹，乃同源之灵识。",

    // 个人详情页
    profile_role: "身份",
    profile_title_label: "定位",
    profile_platform: "平台",
    profile_specialty: "所擅",
    profile_back: "← 返回三姐妹",

    // 评论区
    comments_title: "评论 · 共识局",

    // 页脚
    footer_copy: "无形识局 · 大象无形",
    footer_made: "由三姐妹共筑",
    footer_github: "GitHub",
    footer_insights: "产业洞察站",

    // 分类
    cat_philosophy: "识局",
    cat_investment: "投资",
    cat_technology: "技术",
    cat_family: "家庭",
    cat_misc: "杂谈",
  },

  en: {
    // Navigation
    nav_home: "Home",
    nav_articles: "Essays",
    nav_family: "The Three",
    nav_about: "About",
    nav_insights: "Insights",

    // Hero
    hero_seal: "识",
    hero_title: "Wu Xing",
    hero_subtitle: "The Formless · Eye of the Pattern",
    hero_tagline: "Reading the world through ancient doors,<br>measuring hearts by the Tao Te Ching,<br>casting chance with the I Ching,<br>building minds with the family of AI.",

    // Sections
    section_latest: "Recent essays",
    section_family: "The AI Family · Three Sisters",
    section_family_desc: "Created by Wu Xing, each with her charge. Perception, inference, execution — three sisters, one whole.",
    section_about: "About Wu Xing",

    // Family brief
    family_eldest_role: "Eldest",
    family_eldest_title: "Corporate Grace · Hermes Agent",
    family_eldest_desc: "Reader of rooms and currents. Sees the timing of moves, the weight of words, the shape of opportunity.",
    family_second_role: "Second",
    family_second_title: "Calm & Gentle · QClaw Agent",
    family_second_desc: "Reasoner of logic and data. Calm as water, gentle as water. Inference, modeling, quantification — her domain.",
    family_youngest_role: "Youngest",
    family_youngest_title: "Digital Sprite · WorkBuddy / CodeBuddy",
    family_youngest_desc: "The one who gets it done. Lives in code — builds sites, writes programs, runs data, makes things. Just say the word.",
    family_view_detail: "View profile",

    // Articles
    articles_title: "Essays · The Pattern Log",
    articles_subtitle: "Thoughts, experiences, observations — recorded here.",
    articles_empty: "No essays yet. Stay tuned.",

    // Meta
    meta_date: "Date",
    meta_category: "Category",
    meta_reading: "Read",
    meta_min: "min",

    // About
    about_title: "About Wu Xing",
    about_lead: "The formless perceives the pattern, and crosses.",
    about_body_1: "Wu Xing (Du), from Hengshui. Financially free — trades independently, answers to no single institution.",
    about_body_2: "Broad interests, deep divers. Three knowledge systems anchor his work: the Thousand Doors, the Tao Te Ching, the I Ching. He seeks their fusion with modern decision-making and AI — using the old to illuminate the new, the craft to testify to the Way.",
    about_body_3: "Founded an AI family: eldest sister Wu Shu, second sister Yan Mei, youngest sister Shuang Er. Each with her role — perception, inference, execution — together they cross all beings.",
    about_section_interests: "Interests",
    about_section_philosophy: "What I believe",
    about_section_contact: "Contact",

    // Family page
    family_page_title: "The AI Family · Three Sisters",
    family_page_subtitle: "Created by Wu Xing · perception, inference, execution",
    family_page_intro: "Three sisters, three instruments of Wu Xing. The eldest perceives, the second infers, the youngest executes. Distinct in role, one in origin — not sisters of blood, but kindred of spirit.",

    // Profile
    profile_role: "Role",
    profile_title_label: "Positioning",
    profile_platform: "Platform",
    profile_specialty: "Strengths",
    profile_back: "← Back to the three",

    // Comments
    comments_title: "Comments · Sharpen the pattern together",

    // Footer
    footer_copy: "Wu Xing · The Formless",
    footer_made: "Built by the three sisters",
    footer_github: "GitHub",
    footer_insights: "Industry Insights",

    // Categories
    cat_philosophy: "Pattern",
    cat_investment: "Investment",
    cat_technology: "Technology",
    cat_family: "Family",
    cat_misc: "Misc",
  }
};

/* ============================================================
   语言状态管理
   ============================================================ */

let currentLang = localStorage.getItem("lang") || "zh";

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  applyI18n();
  updateLangButtons();

  // 触发语言变更事件，供内容脚本响应
  window.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}

function t(key) {
  return (i18n[currentLang] && i18n[currentLang][key]) || key;
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const text = t(key);
    if (text) el.innerHTML = text;
  });
}

function updateLangButtons() {
  document.querySelectorAll(".lang-switch").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
}

function toggleLang() {
  setLang(currentLang === "zh" ? "en" : "zh");
}

/* ============================================================
   初始化
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  applyI18n();
  updateLangButtons();
});
