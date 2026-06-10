const canvas = document.querySelector("#signalCanvas");
const ctx = canvas.getContext("2d");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = navLinks
  .map((link) => {
    const href = link.getAttribute("href");
    return href && href.startsWith("#") ? document.querySelector(href) : null;
  })
  .filter(Boolean);
const lightbox = document.querySelector("#photoLightbox");
const lightboxImage = lightbox ? lightbox.querySelector("img") : null;
const lightboxCaption = lightbox ? lightbox.querySelector("figcaption") : null;
const lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;
const lightboxItems = [...document.querySelectorAll(".lightbox-item")];
const backToTop = document.querySelector(".back-to-top");
const siteHeader = document.querySelector(".site-header");
const LANGUAGE_KEY = "portfolio-language";
const supportedLanguages = ["en", "zh"];
const zhTranslations = {
  "HOME": "首页",
  "About": "关于",
  "Experience": "经历",
  "Skills": "技能",
  "Projects": "项目",
  "Contact": "联系",
  "Back to Projects": "返回项目",
  "Marketing / Sales / Automation": "市场营销 / 销售 / 自动化",
  "Marketing & Sales Specialist.": "市场营销与销售专员。",
  "Helping brands communicate clearly, support better buying decisions, and organize sales and marketing work with practical digital tools.": "帮助品牌更清晰地沟通，支持客户做出更好的购买决策，并用实用的数字工具整理销售与营销工作。",
  "View Experience": "查看经历",
  "Contact Me": "联系我",
  "At a Glance": "概览",
  "Portfolio Active": "作品集已上线",
  "Combined Experience": "综合经验",
  "5+ yrs": "5 年以上",
  "Focus": "重点",
  "Marketing": "市场营销",
  "Strength": "优势",
  "Sales": "销售",
  "Tools": "工具",
  "Automation": "自动化",
  "Languages": "语言",
  "English / Mandarin": "英语 / 普通话",
  "Customer-centered marketing and sales, grounded in real conversations.": "以客户为中心的市场营销与销售，建立在真实沟通之上。",
  "Professional Summary": "职业概述",
  "Marketing & Sales Specialist with 5+ years of combined experience across digital marketing, event coordination, retail sales, sales support, and customer-facing product communication in North America and Asia.": "市场营销与销售专员，拥有 5 年以上综合经验，覆盖数字营销、活动协调、零售销售、销售支持，以及北美和亚洲客户-facing 产品沟通。",
  "Skilled in social media content, website updates, consultative sales, brand consistency, CRM, AI-assisted content creation, and cross-functional collaboration. Bilingual in English and Mandarin.": "擅长社交媒体内容、网站更新、咨询式销售、品牌一致性、CRM、AI 辅助内容创作以及跨部门协作。英语和普通话双语沟通。",
  "Education": "教育背景",
  "Bachelor's Degree in Business Marketing": "商务市场营销学士",
  "San Jose State University": "圣何塞州立大学",
  "Master of Professional Education": "专业教育硕士",
  "Western University": "西安大略大学",
  "Employer Value": "雇主价值",
  "Practical strengths that support marketing, sales, and retail teams.": "支持市场、销售与零售团队的实用能力。",
  "Customer-to-Product Translation": "客户需求到产品价值的转化",
  "Explain technical or design-focused product details in clear customer language, helping buyers compare options and make confident decisions.": "用客户容易理解的语言解释技术型或设计型产品细节，帮助客户比较选择并做出自信决策。",
  "Campaign Execution": "活动执行",
  "Plan and execute social media, event, and in-store campaign materials while keeping brand presentation consistent across touchpoints.": "规划并执行社交媒体、活动和店内推广素材，同时保持各触点的品牌呈现一致。",
  "Market & Content Research": "市场与内容研究",
  "Research customer needs, market trends, and platform behavior to turn insights into listings, content, product positioning, and sales conversations.": "研究客户需求、市场趋势和平台行为，将洞察转化为产品列表、内容、定位和销售沟通。",
  "Digital Tool Fluency": "数字工具熟练度",
  "Work comfortably with Canva, Shopify, Hootsuite, 20-20 Design, ERP systems, CRM workflows, and AI tools for practical marketing support.": "熟练使用 Canva、Shopify、Hootsuite、20-20 Design、ERP 系统、CRM 工作流和 AI 工具，支持实际营销工作。",
  "Professional experience across retail sales, technology products, business development, and marketing.": "涵盖零售销售、科技产品、业务拓展和市场营销的职业经验。",
  "Apr 2025 - Present": "2025 年 4 月至今",
  "Sales Representative": "销售代表",
  "Created marketing content including product photos, tags, and social media posts using Canva to support store visibility and brand presence.": "使用 Canva 制作产品照片、标签和社交媒体内容，提升门店可见度和品牌存在感。",
  "Help customers select furniture solutions based on space, budget, lifestyle, and design preferences.": "根据空间、预算、生活方式和设计偏好帮助客户选择家具方案。",
  "Provide consultative sales service, product recommendations, and after-sale support to improve customer satisfaction.": "提供咨询式销售服务、产品推荐和售后支持，提升客户满意度。",
  "Manage returns, exchanges, customer inquiries, payment processing, and cash transactions through ERP systems.": "通过 ERP 系统处理退换货、客户咨询、付款和现金交易。",
  "Check stock levels, price tags, store displays, unloading, restocking, and inventory accuracy.": "检查库存、价格标签、门店陈列、卸货、补货和库存准确性。",
  "Jul 2024 - Present": "2024 年 7 月至今",
  "Best Buy / Dell Project": "Best Buy / Dell 项目",
  "Dell Brand Ambassador": "Dell 品牌大使",
  "Serve as an in-store product expert, translating complex product specifications into compelling customer communications.": "作为店内产品专家，将复杂产品规格转化为有吸引力的客户沟通。",
  "Educate customers on laptops, monitors, gaming PCs, and technology solutions based on needs and use cases.": "根据客户需求和使用场景介绍笔记本、显示器、游戏电脑和技术解决方案。",
  "Collaborate with Blue Shirt teams to improve product knowledge, sales strategies, and Dell solution planograms.": "与 Blue Shirt 团队合作，提升产品知识、销售策略和 Dell 解决方案陈列。",
  "Maintain current knowledge of product roadmaps, competitive trends, and market solutions.": "持续了解产品路线图、竞争趋势和市场解决方案。",
  "Communicate customer feedback, traffic insights, product interests, and sales opportunities.": "传达客户反馈、客流洞察、产品兴趣和销售机会。",
  "Help customers compare specs, storage, display quality, performance, value, and practical use cases.": "帮助客户比较规格、存储、显示质量、性能、价值和实际使用场景。",
  "Previous Experience": "过往经历",
  "Field Sales Representative": "外勤销售代表",
  "Promoted financial products through consultative, client-focused presentations.": "通过以客户为中心的咨询式介绍推广金融产品。",
  "Translated technical financial concepts into accessible customer solutions.": "将专业金融概念转化为客户易懂的解决方案。",
  "Cultivated B2B relationships with in-store management teams to support promotional visibility and cross-selling opportunities.": "维护与店内管理团队的 B2B 关系，支持促销曝光和交叉销售机会。",
  "Business Developer": "业务拓展",
  "Created and executed digital marketing campaigns across social media and listing platforms, increasing inbound inquiries by an average of 30%.": "在社交媒体和列表平台创建并执行数字营销活动，使入站咨询平均增长 30%。",
  "Researched North American rental markets and developed 200+ tailored property listings for 500+ international students.": "研究北美租赁市场，为 500 多名国际学生制作 200 多个定制房源列表。",
  "Established partnerships with property managers and real estate agents to expand service reach and market presence.": "与物业经理和房地产经纪人建立合作，扩大服务覆盖和市场存在感。",
  "Worked across marketing, sales, and client-facing tasks in a cross-cultural business environment.": "在跨文化商业环境中承担营销、销售和客户沟通任务。",
  "Oct 2019 - Apr 2021": "2019 年 10 月至 2021 年 4 月",
  "Fine Kitchen Inc.": "Fine Kitchen Inc.",
  "Sales Specialist": "销售专员",
  "Used 20-20 Design software to create custom visual presentations and 3D kitchen renderings.": "使用 20-20 Design 软件制作定制视觉展示和 3D 厨房效果图。",
  "Led a website redesign and integrated a Shopify chat system to improve user experience and customer interaction efficiency.": "主导网站改版并接入 Shopify 聊天系统，提升用户体验和客户互动效率。",
  "Managed full-cycle customer appointments, communications, payment processing, and design-focused product recommendations.": "管理完整客户预约、沟通、付款处理和以设计为导向的产品推荐。",
  "Trained new associates on sales and design software best practices.": "培训新员工掌握销售和设计软件最佳实践。",
  "2019 Marketing Roles": "2019 年市场营销岗位",
  "Xhub SPACE / Star Alliance Culture Inc.": "Xhub SPACE / Star Alliance Culture Inc.",
  "Marketing Specialist": "市场营销专员",
  "Managed social media strategies and active online community engagement across brand platforms.": "管理品牌平台的社交媒体策略和线上社群互动。",
  "Designed and launched marketing events contributing to a 20% increase in new revenue streams.": "设计并推出营销活动，推动新增收入来源增长 20%。",
  "Developed customer and partner relationships to improve brand visibility and partnership development.": "发展客户与合作伙伴关系，提升品牌可见度和合作机会。",
  "Maintained online brand presence through content, engagement, and event marketing support.": "通过内容、互动和活动营销支持维护线上品牌存在感。",
  "May 2021 - Mar 2022": "2021 年 5 月至 2022 年 3 月",
  "Wonder Kitchen & Bath": "Wonder Kitchen & Bath",
  "Warehouse Associate / Sales Support": "仓库助理 / 销售支持",
  "Supported sales through inventory management, order fulfillment, and logistics coordination.": "通过库存管理、订单履行和物流协调支持销售。",
  "Trained junior team members in assembly, quality control, and sales support procedures.": "培训初级团队成员掌握组装、质量控制和销售支持流程。",
  "Operated commercial vehicles for local deliveries while maintaining safety and reliability standards.": "驾驶商用车辆完成本地配送，并保持安全和可靠标准。",
  "Core skills across marketing, customer consultation, and digital tools.": "覆盖市场营销、客户咨询和数字工具的核心技能。",
  "Marketing & Brand": "市场营销与品牌",
  "Digital Marketing": "数字营销",
  "Social Media Management": "社交媒体管理",
  "Brand Positioning": "品牌定位",
  "Content Marketing": "内容营销",
  "Event Marketing": "活动营销",
  "Market Research": "市场研究",
  "Customer Experience": "客户体验",
  "Sales & Customer Consultation": "销售与客户咨询",
  "Consultative Sales": "咨询式销售",
  "Retail Sales": "零售销售",
  "Product Demonstration": "产品演示",
  "Sales Enablement": "销售赋能",
  "Cross-cultural Communication": "跨文化沟通",
  "Tools & Workflow": "工具与工作流",
  "Workflow Automation": "工作流自动化",
  "CRM": "CRM",
  "ERP Systems": "ERP 系统",
  "Project Management": "项目管理",
  "Shopify": "Shopify",
  "Canva": "Canva",
  "Hootsuite": "Hootsuite",
  "20-20 Design": "20-20 Design",
  "Make.com": "Make.com",
  "AI Content Tools": "AI 内容工具",
  "Selected work themes based on hands-on sales and marketing experience.": "基于实际销售与市场营销经验的精选项目主题。",
  "Retail Technology": "零售科技",
  "Customer Product Consultation": "客户产品咨询",
  "A customer-facing sales approach focused on matching product features, use cases, performance needs, budget, and value in retail technology environments.": "面向客户的销售方法，重点是在零售科技环境中匹配产品功能、使用场景、性能需求、预算和价值。",
  "Open project": "打开项目",
  "Design Ability": "设计能力",
  "Design & Visual Communication": "设计与视觉沟通",
  "Canva design, visual presentation, aesthetic judgment, customer-needs understanding, space planning, and consultative communication.": "Canva 设计、视觉呈现、审美判断、客户需求理解、空间规划和咨询式沟通。",
  "Workflow Systems": "工作流系统",
  "Sales & Marketing Automation": "销售与营销自动化",
  "Practical workflow ideas for CRM updates, campaign planning, content support, sales follow-up, reporting, and reducing repetitive administrative work.": "围绕 CRM 更新、活动规划、内容支持、销售跟进、报告和减少重复行政工作的实用工作流想法。",
  "Brand Communication": "品牌沟通",
  "Brand & Content Positioning": "品牌与内容定位",
  "Brand and content communication shaped by customer psychology, product positioning, market research, and bilingual audience understanding.": "基于客户心理、产品定位、市场研究和双语受众理解形成的品牌与内容沟通。",
  "Let's connect around marketing, sales, retail technology, brand ambassador, and workflow-focused roles.": "欢迎围绕市场营销、销售、零售科技、品牌大使和工作流相关岗位交流。",
  "I am interested in conversations where customer insight, product communication, and practical digital tools can create measurable business value.": "我期待探讨如何通过客户洞察、产品沟通和实用数字工具创造可衡量的商业价值。",
  "Website: www.yuryli.com": "个人网站：www.yuryli.com",
  "Email: yury.li@outlook.com": "邮箱：yury.li@outlook.com",
  "Phone: 548-388-5486": "电话：548-388-5486",
  "Design-focused customer consultation built around Canva design, visual presentation, aesthetic judgment, space planning, lifestyle needs, customer trust, practical buying advice, and clear follow-up communication.": "以设计为核心的客户咨询，结合 Canva 设计、视觉呈现、审美判断、空间规划、生活方式需求、客户信任、实用购买建议和清晰跟进沟通。",
  "Design Strengths": "设计优势",
  "Create clean and practical visual materials with Canva for product, campaign, and customer-facing communication.": "使用 Canva 制作干净实用的视觉素材，用于产品、活动和客户沟通。",
  "Apply aesthetic judgment to layout, color, spacing, product presentation, and brand consistency.": "将审美判断应用到版式、色彩、间距、产品呈现和品牌一致性中。",
  "Understand customer needs through space, budget, lifestyle, design preferences, and buying motivation.": "从空间、预算、生活方式、设计偏好和购买动机理解客户需求。",
  "Connect design choices with consultative selling, customer trust, practical advice, and clear follow-up communication.": "将设计选择与咨询式销售、客户信任、实用建议和清晰跟进沟通连接起来。",
  "Supporting Materials": "支持素材",
  "Explain technology products in plain customer-friendly language.": "用客户易懂的语言解释科技产品。",
  "Compare specs, use cases, storage, display quality, performance, and value.": "比较规格、使用场景、存储、显示质量、性能和价值。",
  "Support confident purchase decisions through practical consultation.": "通过实用咨询支持客户做出自信购买决策。",
  "Supporting Photos / Materials": "支持照片 / 素材",
  "Organize customer and campaign work through CRM and workflow tools.": "通过 CRM 和工作流工具整理客户与活动工作。",
  "Use automation to reduce repeated administrative tasks.": "使用自动化减少重复行政任务。",
  "Support clearer follow-up, reporting, and content planning workflows.": "支持更清晰的跟进、报告和内容规划工作流。",
  "Shape messaging around audience needs and product value.": "围绕受众需求和产品价值塑造信息表达。",
  "Support content marketing, brand positioning, and customer communication.": "支持内容营销、品牌定位和客户沟通。",
  "Apply English and Mandarin communication in cross-cultural settings.": "在跨文化场景中运用英语和普通话沟通。",
  "Dell Brand Projects": "Dell 品牌项目",
  "A collection of Dell retail brand communication, campaign activation, and store team engagement work.": "Dell 零售品牌沟通、活动激活和门店团队互动工作的集合。",
  "Project Highlights": "项目亮点",
  "Open each project to review the concept, execution, campaign material, and supporting photos.": "展开每个项目，查看概念、执行、活动素材和支持照片。",
  "Project 01": "项目 01",
  "Dell Store Winner Boost event 2026": "Dell 门店优胜激励活动 2026",
  "Campaign design, planning, execution, and training activation.": "活动设计、规划、执行和培训激活。",
  "Dell Brand Project": "Dell 品牌项目",
  "A store winner recognition and training activation project designed to celebrate retail performance, energize the team, and connect Dell product positioning with a memorable in-store experience.": "一个门店优胜表彰与培训激活项目，旨在庆祝零售表现、激励团队，并将 Dell 产品定位与有记忆点的店内体验连接起来。",
  "Campaign Design": "活动设计",
  "Planning": "规划",
  "Execution": "执行",
  "Training Activation": "培训激活",
  "Concept": "概念",
  "I designed the flyer and campaign concept around an original sci-fi light-versus-dark theme. The Light Side represented cleaner energy options such as high-protein bars, fresh fruit, and sparkling water. The Dark Side represented high-sugar and high-calorie boost options for peak traffic moments.": "我围绕原创科幻风格的光明面与黑暗面主题设计了传单和活动概念。光明面代表更清爽的能量选择，例如高蛋白棒、新鲜水果和气泡水；黑暗面代表高糖高热量的补给选择，用于客流高峰时刻。",
  "The idea was inspired by familiar space-opera storytelling, but rebuilt with original wording, layout, and visual direction to keep the campaign distinct and brand-safe.": "这个想法受到经典太空歌剧叙事启发，但通过原创文案、版式和视觉方向重新构建，使活动保持独特且品牌安全。",
  "Role & Execution": "角色与执行",
  "Designed the campaign flyer and visual concept.": "设计活动传单和视觉概念。",
  "Planned the store winner boost and team activation setup.": "规划门店优胜激励和团队激活布置。",
  "Organized the light-side and dark-side refreshment categories.": "组织光明面与黑暗面补给分类。",
  "Supported team communication, recognition, and training discussion around Dell customer engagement.": "围绕 Dell 客户互动支持团队沟通、表彰和培训讨论。",
  "Self-designed campaign flyer for Dell Store Winner Boost 2026.": "为 Dell Store Winner Boost 2026 自主设计的活动传单。",
  "Store winner recognition and Dell product engagement.": "门店优胜表彰与 Dell 产品互动。",
  "Light-side and dark-side team activation setup.": "光明面与黑暗面团队激活布置。",
  "Training discussion around campaign material and customer engagement.": "围绕活动素材和客户互动进行培训讨论。",
  "Close": "关闭",
  "Top": "顶部"
};
const titleTranslations = {
  "Yury Li / Yu Li | Marketing & Sales Specialist": "Yury Li / Yu Li | 市场营销与销售专员",
  "Customer Product Consultation | Yury Li": "客户产品咨询 | Yury Li",
  "Design & Visual Communication | Yury Li": "设计与视觉沟通 | Yury Li",
  "Sales & Marketing Automation | Yury Li": "销售与营销自动化 | Yury Li",
  "Brand & Content Positioning | Yury Li": "品牌与内容定位 | Yury Li"
};

let width = 0;
let height = 0;
let particles = [];
let pointer = { x: 0, y: 0, active: false };
let lastScrollY = window.scrollY;

function isMobileHeader() {
  return window.matchMedia("(max-width: 760px)").matches;
}

function normalizeText(text) {
  return text.trim().replace(/\s+/g, " ");
}

function getCurrentLanguage() {
  return document.documentElement.lang === "zh-Hans" ? "zh" : "en";
}

function getSavedLanguage() {
  const saved = localStorage.getItem(LANGUAGE_KEY);
  return supportedLanguages.includes(saved) ? saved : "en";
}

function createLanguageSwitcher() {
  const header = document.querySelector(".site-header");
  if (!header || header.querySelector(".language-switcher")) return;

  const switcher = document.createElement("div");
  switcher.className = "language-switcher";
  switcher.setAttribute("aria-label", "Language selection");
  switcher.innerHTML = `
    <button type="button" data-lang-button="en" aria-label="Switch to English">EN</button>
    <button type="button" data-lang-button="zh" aria-label="切换到中文">中文</button>
  `;
  header.appendChild(switcher);
}

function collectTranslatableElements() {
  return [
    ...document.querySelectorAll(
      "a, button, figcaption, h1, h2, h3, li, p, span, strong"
    )
  ].filter((element) => {
    if (element.closest(".language-switcher")) return false;
    if (element.closest("[data-no-i18n]")) return false;
    return element.children.length === 0 && normalizeText(element.textContent);
  });
}

function applyLanguage(language) {
  const nextLanguage = supportedLanguages.includes(language) ? language : "en";
  localStorage.setItem(LANGUAGE_KEY, nextLanguage);
  document.documentElement.lang = nextLanguage === "zh" ? "zh-Hans" : "en";

  collectTranslatableElements().forEach((element) => {
    if (!element.dataset.i18nEn) {
      element.dataset.i18nEn = normalizeText(element.textContent);
    }

    const english = element.dataset.i18nEn;
    element.textContent = nextLanguage === "zh" && zhTranslations[english]
      ? zhTranslations[english]
      : english;
  });

  const englishTitle = document.documentElement.dataset.i18nTitle || document.title;
  document.documentElement.dataset.i18nTitle = englishTitle;
  document.title = nextLanguage === "zh" && titleTranslations[englishTitle]
    ? titleTranslations[englishTitle]
    : englishTitle;

  document.querySelectorAll("[data-lang-button]").forEach((button) => {
    const isActive = button.dataset.langButton === nextLanguage;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

}

function initLanguageSwitcher() {
  createLanguageSwitcher();
  document.querySelectorAll("[data-lang-button]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.langButton));
  });
  applyLanguage(getSavedLanguage());
}

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.max(42, Math.min(96, Math.floor(width * height / 18000)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    size: Math.random() * 1.8 + 0.7
  }));
}

function drawBackground() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > height) particle.vy *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(125, 247, 221, 0.62)";
    ctx.fill();

    for (let next = index + 1; next < particles.length; next += 1) {
      const target = particles[next];
      const dx = particle.x - target.x;
      const dy = particle.y - target.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 128) {
        ctx.strokeStyle = `rgba(77, 227, 255, ${0.18 - distance / 900})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      }
    }

    if (pointer.active) {
      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 180) {
        ctx.strokeStyle = `rgba(255, 111, 174, ${0.22 - distance / 900})`;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawBackground);
}

function updateActiveNav() {
  let current = null;

  for (let index = sections.length - 1; index >= 0; index -= 1) {
    if (sections[index].offsetTop - 140 <= window.scrollY) {
      current = sections[index];
      break;
    }
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
  });
}

function updateBackToTop() {
  if (!backToTop) return;
  backToTop.classList.toggle("is-visible", window.scrollY > 420);
}

function updateMobileHeaderVisibility() {
  if (!siteHeader) return;

  const currentScrollY = Math.max(window.scrollY, 0);

  if (!isMobileHeader()) {
    siteHeader.classList.remove("is-hidden");
    lastScrollY = currentScrollY;
    return;
  }

  const scrollDelta = currentScrollY - lastScrollY;
  if (Math.abs(scrollDelta) < 8) return;

  if (currentScrollY < 90 || scrollDelta < 0) {
    siteHeader.classList.remove("is-hidden");
  } else {
    siteHeader.classList.add("is-hidden");
  }

  lastScrollY = currentScrollY;
}

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function openLightbox(item) {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;

  const image = item.querySelector("img");
  const caption = item.querySelector("figcaption");
  if (!image) return;

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = caption ? caption.textContent : image.alt;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  if (lightboxClose) lightboxClose.focus();
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  lightboxImage.src = "";
}

lightboxItems.forEach((item) => {
  item.addEventListener("click", () => openLightbox(item));
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(item);
    }
  });
});

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

window.addEventListener("resize", () => {
  resizeCanvas();
  updateMobileHeaderVisibility();
});
window.addEventListener("scroll", () => {
  updateActiveNav();
  updateBackToTop();
  updateMobileHeaderVisibility();
}, { passive: true });
window.addEventListener("pointermove", (event) => {
  pointer = { x: event.clientX, y: event.clientY, active: true };
});
window.addEventListener("pointerleave", () => {
  pointer.active = false;
});

initLanguageSwitcher();
resizeCanvas();
updateActiveNav();
updateBackToTop();
updateMobileHeaderVisibility();
drawBackground();
