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
    hero_tagline: "过去 · 千门观世相，道德读人心，易经辨机缘。<br>现在 · 投资实战场，管理解秩序，金融知风险。<br>未来 · AI 家庭渡众生，奇点近处有新天。",

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
    about_body_2: "兴趣广泛，涉猎杂学。深耕千门八将、道德经、易经八卦三套传统智慧，延展至现代管理学、金融学、AI 技术，并关注奇点趋势——以古鉴今，以今窥未来。八大学科并非孤立的学问，而是一个人识局体系的八个维度。",
    about_body_3: "创建了 AI 家庭团队：大姐无姝、二姐衍姝、小妹双儿。三姐妹各司其职，识局、推演、落地，共渡众生。",
    about_section_interests: "所好 · 八维识局体系",
    about_interests_lead: "八大学科，横跨过去、现代、未来，织就一张识局的网。",
    about_era_past: "过去",
    about_era_past_desc: "千年智慧，是人性的底牌",
    about_era_modern: "现代",
    about_era_modern_desc: "系统与工具，是实战的战场",
    about_era_future: "未来",
    about_era_future_desc: "趋势与奇点，是前行的方向",
    domain_1_name: "千门八将",
    domain_1_desc: "— 识人识势，江湖识局之学。八种角色，一套人性图谱——看懂局中之人，方知局之所向。",
    domain_2_name: "道德经",
    domain_2_desc: "— 观心观道，根本之学。五千言里藏天地——不是哲学，是操作系统。入世出世，皆在其中。",
    domain_3_name: "易经八卦",
    domain_3_desc: "— 知时知变，时机之学。六十四卦是六十四种局势——不占吉凶，辨其进退之机。",
    domain_4_name: "投资交易",
    domain_4_desc: "— 实战之场，识局破局。不响、三个钱包、8.8秒不对称、跟风三智、仓位纪律——五根柱子，撑起一套知行合一的交易体系。",
    domain_5_name: "AI 家庭 · 三姐妹",
    domain_5_desc: "— 共渡众生，落地之器。大姐识局，二姐推演，小妹落地——不是工具，是家庭。以 AI 之形，承人之智。",
    domain_6_name: "现代管理学",
    domain_6_desc: "— 组织与决策的现代解构。从科层到敏捷，从管控到自组织——管理不是管人，是管秩序。",
    domain_7_name: "金融学",
    domain_7_desc: "— 资本与风险的系统认知。市场有效还是无效？风险可测还是不可测？金融学给不了答案，但给了提问的工具。",
    domain_8_name: "奇点临近 · 奇点更近",
    domain_8_desc: "— AI 进化与人类文明的前行路径。雷·库兹韦尔的两本书，一条路——不是预言，是推演。奇点不是终点，是下一程的起点。",
    about_philosophy_source: "—— 老子《道德经》",
    about_philosophy_body: "大道无形，大音希声。真正的识局者，不执著于\"形\"，而察其\"势\"；不拘泥于\"名\"，而辨其\"实\"。以古鉴今，以术证道——术是手段，道是归宿。过去是根基，现代是战场，未来是方向。三者缺一，不可言识局。",
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
    hero_tagline: "Past · Reading the world through ancient doors, the heart through the Tao, the moment through the I Ching.<br>Present · Trading as the proving ground, management as the ordering of chaos, finance as the tongue of risk.<br>Future · AI family crossing all beings — the singularity, a new horizon.",

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
    about_body_2: "Broad interests, deep divers. Three ancient knowledge systems anchor his work — the Thousand Doors, the Tao Te Ching, the I Ching — extended into modern management, finance, and AI, with a constant eye on the approaching singularity. Eight disciplines, not as isolated schools, but as eight dimensions of one pattern-reading architecture.",
    about_body_3: "Founded an AI family: eldest sister Wu Shu, second sister Yan Mei, youngest sister Shuang Er. Each with her role — perception, inference, execution — together they cross all beings.",
    about_section_interests: "Interests · Eight-Domain System",
    about_interests_lead: "Eight disciplines spanning past, present, and future — woven into a web of pattern-reading.",
    about_era_past: "Past",
    about_era_past_desc: "Millennia of wisdom, the bedrock of human nature",
    about_era_modern: "Present",
    about_era_modern_desc: "Systems and tools, the arena of practice",
    about_era_future: "Future",
    about_era_future_desc: "Trends and the singularity, the path ahead",
    domain_1_name: "Thousand Doors, Eight Generals",
    domain_1_desc: "— Reading people and currents. Eight roles, one map of human nature — know the players in the pattern, and you know where the pattern goes.",
    domain_2_name: "Tao Te Ching",
    domain_2_desc: "— Reading the heart and the Way. Five thousand words holding heaven and earth — not philosophy, but an operating system. Inside the world and beyond it, all within.",
    domain_3_name: "I Ching",
    domain_3_desc: "— Reading timing and change. Sixty-four hexagrams, sixty-four situations — not for divination, but for discerning when to advance and when to retreat.",
    domain_4_name: "Investment & Trading",
    domain_4_desc: "— The proving ground. Bu Xiang, Three Wallets, 8.8-Second Asymmetry, Three Wisdoms of Following, Position Discipline — five pillars, one system where knowing and doing are one.",
    domain_5_name: "The AI Family · Three Sisters",
    domain_5_desc: "— Crossing together, the vessel of execution. Eldest perceives, second infers, youngest executes — not tools, but family. AI in form, human in spirit.",
    domain_6_name: "Modern Management",
    domain_6_desc: "— The modern deconstruction of organization and decision-making. From hierarchy to agile, from control to self-organization — management is not managing people, it's managing order.",
    domain_7_name: "Finance",
    domain_7_desc: "— Systematic understanding of capital and risk. Is the market efficient or not? Is risk measurable or not? Finance doesn't give answers — it gives the tools to ask better questions.",
    domain_8_name: "The Singularity Is Near · The Singularity Is Closer",
    domain_8_desc: "— The path of AI evolution and human civilization. Ray Kurzweil's two books, one trajectory — not prophecy, but projection. The singularity is not the end — it's the next beginning.",
    about_philosophy_source: "— Laozi, Tao Te Ching",
    about_philosophy_body: "The great Way is formless. The true pattern-reader does not cling to 'form' but senses the 'current'; does not fixate on 'names' but discerns the 'substance'. Use the past to illuminate the present, use craft to testify to the Way — craft is the means, the Way is the destination. The past is foundation, the present is the battlefield, the future is direction. Without any one of the three, one cannot claim to read the pattern.",
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
