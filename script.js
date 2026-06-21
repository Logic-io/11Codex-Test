const canvas = document.querySelector("#signalCanvas");
const dotContext = canvas ? canvas.getContext("2d", { alpha: true }) : null;
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
const primaryNav = document.querySelector(".nav-links");
const likeButton = document.querySelector(".like-button");
const decryptedTextItems = [...document.querySelectorAll("[data-decrypted-text]")];
const experienceCards = [...document.querySelectorAll(".experience-card")];
const packageOffer = document.querySelector(".package-offer");
const packageContactButton = document.querySelector(".package-link");
const packageContactInfo = document.querySelector("#package-contact-info");
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const LANGUAGE_KEY = "portfolio-language";
const LIKE_COUNT_KEY = "portfolio-like-count";
const supportedLanguages = ["en", "zh"];
const zhTranslations = {
  "HOME": "首页",
  "About": "关于",
  "Experience": "经历",
  "Skills": "技能",
  "Projects": "项目",
  "Contact": "联系",
  "Like this portfolio": "为这个作品集点赞",
  "Package": "套餐",
  "Want to build a website like this?": "想获得同款网页制作方法？",
  "Learn how to create a similar page, use AI techniques, add interactive effects, and deploy it online. Package price: $199 CAD.": "学习如何制作类似网页、使用 AI 技巧、加入动态特效，并完成上线部署。Package 价格：$199 CAD。",
  "Show contact methods": "展示联系方式",
  "Hide contact methods": "收起联系方式",
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
  "Apr 2025 - Jun 2026": "2025 年 4 月至 2026 年 6 月",
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
  "Researched North American rental markets and developed 200+ tailored property listings for 500+ total international student clients.": "研究北美租赁市场，为 500 多名国际学生客户制作 200 多个定制房源列表。",
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
  "Phone: 825-947-0506": "电话：825-947-0506",
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

Object.assign(zhTranslations, {
  "Yury Li": "Yury Li",
  "Yury Li | Marketing, Sales & AI Workflow Specialist": "Yury Li | 市场、销售与 AI 工作流专员",
  "Marketing / Sales / AI Workflow": "市场营销 / 销售 / AI 工作流",
  "Marketing, Sales & AI Workflow Specialist": "市场、销售与 AI 工作流专员",
  "I help retail and product-focused brands turn customer conversations into clearer sales communication, stronger product presentation, and practical marketing workflows.": "我帮助零售和产品型品牌，把真实客户沟通转化为更清晰的销售话术、更有说服力的产品呈现，以及更实用的营销工作流。",
  "Based in Alberta, Canada | English / Mandarin | Retail Technology | Product Communication | Workflow Tools": "加拿大阿尔伯塔 | 英语 / 普通话 | 零售科技 | 产品沟通 | 工作流工具",
  "Download Resume": "下载简历",
  "View My Work": "查看作品",
  "AI Workflows": "AI 工作流",
  "5+ years": "5 年以上",
  "Combined marketing, sales, and customer-facing experience.": "市场营销、销售与客户沟通相关综合经验。",
  "Bilingual communication for cross-cultural customer and team settings.": "适用于跨文化客户沟通与团队协作的英中双语能力。",
  "Retail + Product": "零售 + 产品",
  "Experience across retail technology, furniture, kitchen design, and financial products.": "覆盖零售科技、家具、厨房设计与金融产品的经验。",
  "200+ / 500+": "200+ / 500+",
  "200+ tailored property listings developed for 500+ total international student clients.": "为 500+ 名国际学生客户整理并制作 200+ 个定制房源方案。",
  "30%": "30%",
  "Average increase in inbound inquiries from digital marketing campaigns.": "数字营销活动带来的平均入站咨询增长。",
  "I am not only a salesperson and not only a marketing assistant. My strength is connecting the two: listening to real customer questions, understanding objections and comparison points, then turning that insight into clearer product communication and follow-up.": "我不只是销售，也不只是市场助理。我的优势在于把两者连接起来：倾听真实客户问题，理解顾虑和比较点，再把这些洞察转化为更清晰的产品沟通和后续跟进。",
  "Across retail technology, furniture, kitchen design, financial products, and housing support, I have worked close to the customer while also supporting content, campaigns, CRM updates, website improvements, and AI-assisted workflow ideas.": "在零售科技、家具、厨房设计、金融产品和住房支持等场景中，我既贴近客户一线，也参与内容、活动、CRM 更新、网站优化和 AI 辅助工作流构思。",
  "Turn product details, objections, and comparison points into customer-friendly language that supports confident buying decisions.": "将产品细节、客户顾虑和对比点转化为客户容易理解的语言，帮助客户更有信心地做购买决策。",
  "Coordinate social media, event, in-store, and brand materials so product stories stay consistent across customer touchpoints.": "协调社交媒体、活动、店内和品牌素材，让产品叙事在不同客户触点保持一致。",
  "Research customer needs, platform behavior, and competitive options to improve listings, content, positioning, and sales conversations.": "研究客户需求、平台行为和竞品选择，用于优化列表、内容、定位和销售沟通。",
  "Digital Workflow Tools": "数字工作流工具",
  "Use Canva, Shopify, Hootsuite, 20-20 Design, ERP systems, CRM workflows, and AI tools as practical business support systems.": "将 Canva、Shopify、Hootsuite、20-20 Design、ERP、CRM 工作流和 AI 工具作为实际业务支持系统使用。",
  "Core skills across marketing, customer consultation, retail technology, and workflow tools.": "覆盖市场营销、客户咨询、零售科技和工作流工具的核心能力。",
  "Marketing & Brand Communication": "市场与品牌沟通",
  "Retail Technology & Product Knowledge": "零售科技与产品知识",
  "Digital Tools & Workflow Systems": "数字工具与工作流系统",
  "Bilingual Communication": "双语沟通",
  "Objection Handling": "异议处理",
  "Dell Product Consultation": "Dell 产品咨询",
  "Laptops & Monitors": "笔记本与显示器",
  "Gaming PCs": "游戏电脑",
  "Furniture Solutions": "家具方案",
  "Kitchen Design": "厨房设计",
  "AI-Assisted Workflows": "AI 辅助工作流",
  "English": "英语",
  "Mandarin": "普通话",
  "Customer Education": "客户教育",
  "Team Communication": "团队沟通",
  "Selected work themes that show how I connect customer insight, product communication, and workflow thinking.": "精选项目主题，展示我如何连接客户洞察、产品沟通与工作流思维。",
  "Retail Technology & Product Consultation": "零售科技与产品咨询",
  "Sales & Marketing Workflow Systems": "销售与营销工作流系统",
  "Sales Follow-up Workflow Prototype": "销售跟进工作流原型",
  "Brand Communication & Event Execution": "品牌沟通与活动执行",
  "Let's connect if you are hiring for marketing, sales, retail technology, brand ambassador, or workflow-focused roles.": "如果你正在招聘市场、销售、零售科技、品牌大使或工作流相关岗位，欢迎联系我。",
  "I can support teams that need stronger product communication, content execution, customer consultation, or practical AI workflow ideas.": "我可以支持需要加强产品沟通、内容执行、客户咨询或实际 AI 工作流想法的团队。",
  "Project Overview": "项目概览",
  "Context": "背景",
  "Challenge": "挑战",
  "My Role": "我的角色",
  "Actions": "具体行动",
  "Tools / Skills": "工具 / 技能",
  "Outcome / Business Value": "结果 / 商业价值",
  "Visual Proof / Supporting Materials": "视觉证明 / 支持材料",
  "Selected supporting materials can be shared upon request.": "可根据需要提供精选支持材料。",
  "01": "01",
  "02": "02",
  "03": "03",
  "04": "04",
  "05": "05"
});

Object.assign(zhTranslations, {
  "A case study in translating technical product details into clear customer value during retail technology conversations.": "一个展示如何在零售科技沟通中将技术产品细节转化为清晰客户价值的案例。",
  "A case study in using visual judgment, product presentation, and customer needs analysis to make buying decisions easier.": "一个展示如何通过视觉判断、产品呈现和客户需求分析，让购买决策更容易的案例。",
  "A case study in campaign support, store event execution, product positioning, and customer engagement through Dell retail brand work.": "一个通过 Dell 零售品牌工作展示活动支持、门店活动执行、产品定位和客户互动的案例。",
  "A case study on customer-facing product explanation, needs analysis, product comparison, budget/value communication, and Dell retail consultation.": "一个关于客户产品解释、需求分析、产品比较、预算/价值沟通和 Dell 零售咨询的案例。",
  "A case study on Canva design, product presentation, furniture visuals, space planning, aesthetic judgment, and customer-facing visual advice.": "一个关于 Canva 设计、产品呈现、家具视觉、空间规划、审美判断和客户视觉建议的案例。",
  "A self-initiated workflow prototype showing how AI-assisted follow-up, customer stage tracking, FAQ support, and reporting can reduce repetitive sales admin.": "一个自主设计的工作流原型，展示 AI 辅助跟进、客户阶段追踪、FAQ 支持和报告如何减少重复销售行政工作。",
  "A case study on campaign support, store events, bilingual communication, customer psychology, and product positioning through Dell brand activation work.": "一个基于 Dell 品牌激活工作的案例，展示活动支持、门店活动、双语沟通、客户心理和产品定位。",
  "This project demonstrates how I approach customer-facing product explanation, needs analysis, product comparison, budget/value communication, and Dell retail technology consultation.": "该项目展示我如何处理面向客户的产品解释、需求分析、产品比较、预算/价值沟通和 Dell 零售科技咨询。",
  "Retail technology customers often compare laptops, monitors, gaming PCs, storage, display quality, performance, and price while trying to understand which option fits their real use case.": "零售科技客户通常会比较笔记本、显示器、游戏电脑、存储、显示质量、性能和价格，同时判断哪种选择最符合真实使用场景。",
  "The challenge is to simplify technical specifications without losing accuracy, while helping customers feel confident instead of overwhelmed by competing product options.": "挑战在于在不牺牲准确性的前提下简化技术规格，帮助客户建立信心，而不是被大量产品选项压倒。",
  "As a Dell Brand Ambassador in a Best Buy retail environment, I support product education, in-store consultation, team communication, customer feedback, and product comparison conversations.": "作为 Best Buy 零售环境中的 Dell 品牌大使，我支持产品教育、店内咨询、团队沟通、客户反馈和产品比较沟通。",
  "Asked customer questions about use case, performance needs, budget, timeline, and buying concerns.": "围绕使用场景、性能需求、预算、时间线和购买顾虑向客户提问。",
  "Explained laptops, monitors, gaming PCs, and technology solutions in plain customer-friendly language.": "用客户容易理解的语言解释笔记本、显示器、游戏电脑和科技解决方案。",
  "Compared specs, storage, display quality, performance, value, and practical fit.": "比较规格、存储、显示质量、性能、价值和实际匹配度。",
  "Collaborated with retail teams to support product knowledge, sales strategies, and Dell solution presentation.": "与零售团队协作，支持产品知识、销售策略和 Dell 方案呈现。",
  "Communicated customer feedback, traffic insights, product interest, and sales opportunities.": "沟通客户反馈、客流洞察、产品兴趣和销售机会。",
  "The business value is stronger product understanding, clearer customer conversations, better comparison support, and more confident retail purchase decisions.": "其商业价值在于提升产品理解、让客户沟通更清晰、加强比较支持，并帮助客户做出更有信心的零售购买决策。",
  "This project demonstrates my approach to Canva design, visual presentation, furniture product communication, space planning, and customer-facing recommendations.": "该项目展示我在 Canva 设计、视觉呈现、家具产品沟通、空间规划和客户建议方面的方法。",
  "Furniture and kitchen design customers often need help imagining how a product will fit their space, lifestyle, budget, and visual preference before they feel ready to buy.": "家具和厨房设计客户在购买前，通常需要帮助他们想象产品如何适配空间、生活方式、预算和视觉偏好。",
  "The challenge is to connect product aesthetics with practical use, helping customers compare options without turning the conversation into only price or style.": "挑战在于将产品美感与实际使用连接起来，帮助客户比较选择，而不是让沟通只停留在价格或风格上。",
  "I support product presentation, customer consultation, visual communication, and sales follow-up through store content, Canva materials, furniture recommendations, and design-focused explanations.": "我通过门店内容、Canva 素材、家具推荐和设计导向解释，支持产品呈现、客户咨询、视觉沟通和销售跟进。",
  "Created clean product photos, tags, and social media materials with Canva.": "使用 Canva 制作清晰的产品照片、标签和社交媒体素材。",
  "Applied aesthetic judgment to layout, color, spacing, product presentation, and brand consistency.": "将审美判断应用到版式、色彩、间距、产品呈现和品牌一致性中。",
  "Asked customers about room size, lifestyle needs, design preferences, budget, and buying motivation.": "了解客户房间尺寸、生活方式需求、设计偏好、预算和购买动机。",
  "Connected visual options with practical product advice and clear customer follow-up.": "将视觉选择与实际产品建议和清晰客户跟进连接起来。",
  "Used 20-20 Design experience from kitchen sales to support design-led product communication.": "运用厨房销售中的 20-20 Design 经验，支持设计导向的产品沟通。",
  "Visual Presentation": "视觉呈现",
  "Space Planning": "空间规划",
  "Furniture Consultation": "家具咨询",
  "Customer Follow-up": "客户跟进",
  "The value is stronger product presentation, clearer customer understanding, and a more consultative buying experience that connects design preference with practical purchase decisions.": "其价值在于更强的产品呈现、更清晰的客户理解，以及将设计偏好与实际购买决策连接起来的咨询式购买体验。",
  "Self-initiated workflow prototype based on real retail sales and customer consultation scenarios.": "基于真实零售销售和客户咨询场景的自主工作流原型。",
  "This prototype shows how customer inquiry capture, AI-assisted follow-up, customer stage classification, and weekly question summaries can improve sales organization without overcomplicating the workflow.": "该原型展示客户咨询记录、AI 辅助跟进、客户阶段分类和每周问题总结如何在不复杂化流程的情况下改善销售组织。",
  "Retail sales teams often handle repeated questions, incomplete customer notes, delayed follow-up, changing budgets, objections, and customers who prefer different communication styles or languages.": "零售销售团队常常需要处理重复问题、不完整客户记录、延迟跟进、预算变化、客户异议，以及偏好不同沟通方式或语言的客户。",
  "The challenge is to keep customer follow-up organized while reducing repetitive admin work, especially when conversations include product type, budget, timeline, objections, and language preference.": "挑战在于保持客户跟进有序，同时减少重复行政工作，尤其当沟通涉及产品类型、预算、时间线、异议和语言偏好时。",
  "I designed the workflow concept as a self-initiated prototype, using my retail sales and customer consultation experience to define the information flow, follow-up logic, and practical business use cases.": "我基于零售销售和客户咨询经验，自主设计该工作流概念，定义信息流、跟进逻辑和实际业务场景。",
  "Mapped customer inquiry fields: product type, budget, timeline, objections, preferred language, and next step.": "梳理客户咨询字段：产品类型、预算、时间线、异议、首选语言和下一步。",
  "Outlined AI-assisted follow-up message generation for clearer, more consistent customer communication.": "设计 AI 辅助跟进消息生成思路，让客户沟通更清晰、更一致。",
  "Defined simple customer stage classification such as new inquiry, comparing options, ready to buy, waiting, or follow-up needed.": "定义简单客户阶段分类，例如新咨询、比较选项、准备购买、等待中或需要跟进。",
  "Planned a weekly common-question summary to identify recurring customer concerns and content opportunities.": "规划每周常见问题总结，用于识别重复客户顾虑和内容机会。",
  "Outlined product FAQ and sales script support for repeated questions, objections, and product comparisons.": "为重复问题、客户异议和产品比较设计产品 FAQ 与销售话术支持。",
  "Structured the workflow as a simple spreadsheet or CRM-style system rather than a complex custom platform.": "将工作流设计为简单表格或 CRM 风格系统，而不是复杂的定制平台。",
  "AI-Assisted Writing": "AI 辅助写作",
  "CRM Thinking": "CRM 思维",
  "Spreadsheet Workflow": "表格工作流",
  "Customer Segmentation": "客户分层",
  "Sales Follow-up": "销售跟进",
  "Reporting": "报告",
  "FAQ Support": "FAQ 支持",
  "The expected value is clearer follow-up, better customer organization, faster access to common questions, stronger sales scripts, and less repetitive administrative work for customer-facing teams.": "预期价值包括更清晰的跟进、更好的客户整理、更快获取常见问题、更强的销售话术，以及减少客户一线团队的重复行政工作。"
});

Object.assign(zhTranslations, {
  "iFurniture": "iFurniture",
  "Funliving": "Funliving",
  "PC Financial": "PC Financial",
  "Retail Technology & Product Consultation | Yury Li": "零售科技与产品咨询 | Yury Li",
  "Sales Follow-up Workflow Prototype | Yury Li": "销售跟进工作流原型 | Yury Li",
  "Brand Communication & Event Execution | Yury Li": "品牌沟通与活动执行 | Yury Li",
  "Created Canva-based product photos, tags, and social media content to strengthen store visibility and product presentation.": "使用 Canva 制作产品图片、标签和社交媒体内容，提升门店可见度与产品呈现。",
  "Translated customer space, budget, lifestyle, and design preferences into practical furniture recommendations.": "将客户空间、预算、生活方式和设计偏好转化为实际家具推荐。",
  "Provided consultative sales, product guidance, and after-sale support to improve customer confidence and satisfaction.": "提供咨询式销售、产品建议和售后支持，提升客户信心与满意度。",
  "Managed returns, exchanges, customer inquiries, payments, and cash transactions through ERP systems.": "通过 ERP 系统处理退换货、客户咨询、付款和现金交易。",
  "Supported stock checks, price tags, store displays, unloading, restocking, and inventory accuracy for smoother store operations.": "支持库存检查、价签、店内陈列、卸货、补货和库存准确性，让门店运营更顺畅。",
  "Served as an in-store Dell product expert, translating technical specifications into clear customer value.": "作为店内 Dell 产品专家，将技术规格转化为清晰的客户价值。",
  "Guided customers through laptops, monitors, gaming PCs, and technology solutions based on needs, use cases, and budget.": "根据客户需求、使用场景和预算，介绍笔记本、显示器、游戏电脑和科技解决方案。",
  "Collaborated with Blue Shirt teams to strengthen product knowledge, sales strategies, and Dell solution planogram execution.": "与 Blue Shirt 团队协作，加强产品知识、销售策略和 Dell 方案陈列执行。",
  "Maintained current knowledge of product roadmaps, competitive trends, and market solutions for stronger consultation.": "持续了解产品路线图、竞争趋势和市场方案，以支持更有效的客户咨询。",
  "Communicated customer feedback, traffic insights, product interest, and sales opportunities to support retail execution.": "传递客户反馈、客流洞察、产品兴趣和销售机会，支持零售执行。",
  "Helped customers compare specs, storage, display quality, performance, value, and practical use cases.": "帮助客户比较规格、存储、显示质量、性能、价值和实际使用场景。",
  "Presented financial products through consultative, customer-focused conversations in a retail environment.": "在零售环境中通过以客户为中心的咨询式沟通介绍金融产品。",
  "Translated financial product details into accessible benefits and next steps for customers.": "将金融产品细节转化为客户容易理解的收益和下一步行动。",
  "Built B2B relationships with in-store management teams to support promotional visibility and cross-selling opportunities.": "与店内管理团队建立 B2B 关系，支持促销曝光和交叉销售机会。",
  "Coordinated marketing, sales, and client communication in a cross-cultural business environment.": "在跨文化商业环境中协调市场、销售和客户沟通。",
  "Created custom visual presentations and 3D kitchen renderings with 20-20 Design to support design-led sales conversations.": "使用 20-20 Design 创建定制视觉方案和 3D 厨房效果图，支持设计导向的销售沟通。",
  "Led a website redesign and integrated a Shopify chat system to improve customer experience and interaction efficiency.": "主导网站改版并整合 Shopify 聊天系统，提升客户体验和互动效率。",
  "Trained new associates on sales processes and design software best practices.": "培训新员工掌握销售流程和设计软件最佳实践。",
  "Managed social media strategy and online community engagement across brand platforms.": "管理品牌平台的社交媒体策略和线上社群互动。",
  "Developed customer and partner relationships to improve brand visibility and partnership opportunities.": "发展客户与合作伙伴关系，提升品牌可见度和合作机会。",
  "Supported sales execution through inventory management, order fulfillment, and logistics coordination.": "通过库存管理、订单履行和物流协调支持销售执行。",
  "Customer Needs Analysis": "客户需求分析",
  "Event Planning": "活动规划",
  "Product Positioning": "产品定位",
  "Team Activation": "团队激活",
  "This project demonstrates how I support brand communication through campaign concepting, visual materials, store team engagement, bilingual communication, and product-focused event execution.": "该项目展示我如何通过活动概念、视觉素材、门店团队互动、双语沟通和产品导向活动执行支持品牌沟通。",
  "In retail brand ambassador work, product knowledge is only one part of the job. Store teams and customers also need clear messaging, memorable touchpoints, and practical reasons to engage with the product story.": "在零售品牌大使工作中，产品知识只是其中一部分。门店团队和客户同样需要清晰信息、可记忆的触点，以及参与产品故事的实际理由。",
  "The challenge was to create a store activation that recognized retail performance, energized the team, and connected Dell product positioning with a memorable in-store experience.": "挑战是设计一个门店激活活动，既认可零售表现、激励团队，也将 Dell 产品定位与有记忆点的店内体验连接起来。",
  "I designed the campaign flyer and concept, planned the store winner boost setup, organized the activation materials, and supported team communication and training discussion around Dell customer engagement.": "我设计活动传单和概念，规划门店优胜激励布置，组织活动材料，并围绕 Dell 客户互动支持团队沟通和培训讨论。",
  "Designed the campaign flyer and visual concept for the Dell Store Winner Boost event 2026.": "为 Dell Store Winner Boost 2026 活动设计传单和视觉概念。",
  "Created an original sci-fi light-versus-dark theme with distinct wording, layout, and visual direction.": "创建原创的科幻光明/黑暗主题，并使用独立文案、版式和视觉方向。",
  "Organized light-side and dark-side refreshment categories for a memorable team activation moment.": "组织光明面和黑暗面补给分类，打造更有记忆点的团队激活时刻。",
  "Supported store winner recognition and team discussion around customer engagement.": "支持门店优胜表彰，以及围绕客户互动的团队讨论。",
  "Connected campaign materials with Dell product positioning and in-store communication.": "将活动素材与 Dell 产品定位和店内沟通连接起来。",
  "The value was a clearer and more memorable retail brand touchpoint that supported team recognition, training conversation, and Dell product engagement in the store environment.": "其价值在于打造更清晰、更有记忆点的零售品牌触点，支持团队认可、培训沟通和店内 Dell 产品互动。",
  "Existing materials from the Dell Store Winner Boost event are shown below.": "以下展示 Dell Store Winner Boost 活动的现有材料。"
});

Object.assign(zhTranslations, {
  "Marketing, sales, and customer-facing experience.": "市场营销、销售与客户沟通经验。",
  "Bilingual customer and team communication.": "双语客户与团队沟通。",
  "Cross-Industry": "跨行业经验",
  "Experience across technology, furniture, design, financial products, and housing services.": "拥有科技、家具、设计、金融产品与住房服务等跨行业经验。",
  "Customer Insight": "客户洞察",
  "Translate real customer needs into clearer communication, content, and recommendations.": "将真实客户需求转化为更清晰的沟通、内容与建议。",
  "Customer insight turned into clear communication and action.": "将客户洞察转化为清晰沟通与行动。",
  "I connect sales and marketing by turning customer questions, objections, and comparison points into clearer product communication, useful content, and better follow-up. My experience spans retail technology, furniture, kitchen design, financial products, housing support, and practical AI-assisted workflows.": "我连接销售与营销，将客户问题、顾虑和比较重点转化为更清晰的产品沟通、实用内容和有效跟进。我的经验涵盖零售科技、家具、厨房设计、金融产品、住房服务和实用的 AI 辅助工作流。",
  "Four practical strengths for customer-facing teams.": "面向客户团队的四项实用能力。",
  "Translate product details and objections into clear reasons to buy.": "将产品细节与客户顾虑转化为清晰的购买理由。",
  "Keep social, event, in-store, and brand materials consistent.": "保持社交媒体、活动、门店与品牌材料的一致性。",
  "Use customer and competitor insight to sharpen content and positioning.": "运用客户与竞品洞察优化内容和定位。",
  "Apply design, CRM, ERP, ecommerce, and AI tools to daily work.": "将设计、CRM、ERP、电商与 AI 工具应用于日常工作。",
  "Experience across sales, technology, business development, and marketing.": "涵盖销售、科技、业务拓展与市场营销的经验。",
  "Created Canva product visuals, tags, and social content to strengthen store presentation.": "使用 Canva 制作产品视觉、标签和社交内容，提升门店呈现。",
  "Turned customer space, budget, and style needs into practical furniture recommendations and after-sale support.": "根据客户空间、预算与风格需求提供实用家具建议和售后支持。",
  "Handled ERP transactions, returns, inquiries, stock checks, displays, and inventory support.": "处理 ERP 交易、退换货、客户咨询、库存检查、陈列与库存支持。",
  "Translated Dell specifications and product comparisons into clear customer value.": "将 Dell 产品规格与比较转化为清晰的客户价值。",
  "Recommended laptops, monitors, and gaming PCs around use case, performance, and budget.": "根据使用场景、性能与预算推荐笔记本、显示器和游戏电脑。",
  "Supported store teams with product knowledge, planogram execution, customer feedback, and sales insights.": "通过产品知识、陈列执行、客户反馈和销售洞察支持门店团队。",
  "Presented financial products through clear, consultative retail conversations.": "通过清晰的咨询式零售沟通介绍金融产品。",
  "Built store-management relationships that supported visibility and cross-selling.": "建立门店管理关系，支持产品曝光与交叉销售。",
  "Built property partnerships and coordinated cross-cultural marketing, sales, and client communication.": "建立房产合作关系，并协调跨文化营销、销售和客户沟通。",
  "Created visual presentations and 3D kitchen renderings with 20-20 Design.": "使用 20-20 Design 制作视觉方案和 3D 厨房效果图。",
  "Led a website redesign and added Shopify chat to improve customer interaction.": "主导网站改版并加入 Shopify 聊天功能，改善客户互动。",
  "Managed customer appointments, payments, recommendations, and associate training.": "管理客户预约、付款、产品建议和员工培训。",
  "Managed social content, community engagement, and partner relationships.": "管理社交内容、社群互动与合作伙伴关系。",
  "Launched marketing events that contributed to a 20% increase in new revenue streams.": "推出营销活动，推动新增收入来源增长 20%。",
  "Supported sales through inventory, fulfillment, logistics, and local delivery.": "通过库存、订单履行、物流和本地配送支持销售。",
  "Trained junior team members in assembly, quality control, and sales support.": "培训初级团队成员掌握组装、质量控制与销售支持。",
  "Core skills, grouped for quick scanning.": "核心技能，便于快速浏览。",
  "Sales & Product Consultation": "销售与产品咨询",
  "Digital Tools & Workflow Systems": "数字工具与工作流系统",
  "AI-Assisted Workflows": "AI 辅助工作流",
  "Communication": "沟通能力",
  "Selected work in product, design, workflow, and brand communication.": "产品、设计、工作流与品牌沟通精选项目。",
  "Turning technical comparisons into clear, customer-focused recommendations.": "将技术比较转化为清晰、以客户为中心的建议。",
  "Using Canva, space planning, and visual judgment to support buying decisions.": "运用 Canva、空间规划与视觉判断支持购买决策。",
  "An AI-assisted concept for follow-up, customer stages, FAQs, and reporting.": "用于跟进、客户阶段、常见问题和报告的 AI 辅助方案。",
  "Dell campaign materials and store activation designed to engage retail teams.": "用于提升零售团队参与度的 Dell 活动材料与门店激活。",
  "Hiring for marketing, sales, retail technology, or workflow roles?": "正在招聘市场、销售、零售科技或工作流相关岗位？",
  "Let's discuss how I can support your customer-facing team.": "欢迎交流我能如何支持您的客户团队。",
  "Marketing · Sales · AI Workflow": "市场营销 · 销售 · AI 工作流",
  "Overview": "概览",
  "Approach": "方法",
  "Business Value": "商业价值",
  "Supporting Materials": "支持材料",
  "Workflow": "工作流",
  "Expected Value": "预期价值",
  "Campaign Materials": "活动材料",
  "As a Dell Brand Ambassador in Best Buy, I help customers compare laptops, monitors, and gaming PCs by translating specifications, performance, and price into a clear recommendation for their real use case.": "作为 Best Buy 的 Dell 品牌大使，我将规格、性能和价格转化为符合实际使用场景的清晰建议，帮助客户比较笔记本、显示器和游戏电脑。",
  "Identify use case, performance needs, budget, timeline, and concerns.": "确认使用场景、性能需求、预算、时间和顾虑。",
  "Compare specifications, display, storage, value, and practical fit in plain language.": "用易懂语言比较规格、显示、存储、价值与实际匹配度。",
  "Share product knowledge and customer insights with retail teams.": "与零售团队分享产品知识和客户洞察。",
  "Clearer product understanding, easier comparisons, and more confident purchase decisions.": "让产品更易理解、比较更轻松，并支持更有信心的购买决策。",
  "I use Canva, space planning, product knowledge, and design-focused consultation to help furniture and kitchen customers connect style with space, lifestyle, budget, and practical use.": "我运用 Canva、空间规划、产品知识和设计咨询，帮助家具与厨房客户平衡风格、空间、生活方式、预算和实际用途。",
  "Create product photos, tags, and social materials with consistent visual presentation.": "制作视觉一致的产品图片、标签和社交媒体材料。",
  "Understand room size, lifestyle, design preference, budget, and buying motivation.": "了解房间尺寸、生活方式、设计偏好、预算和购买动机。",
  "Connect visual options with practical advice using Canva and 20-20 Design experience.": "结合 Canva 与 20-20 Design 经验，将视觉选择与实用建议连接起来。",
  "Stronger product presentation and a clearer buying experience that balances design preference with practical needs.": "提升产品呈现，并提供兼顾设计偏好与实际需求的清晰购买体验。",
  "I designed this self-initiated prototype from real retail scenarios. It organizes customer details, follow-up, sales stages, and recurring questions without requiring a complex custom platform.": "我根据真实零售场景自主设计了这一原型，无需复杂定制平台即可整理客户信息、跟进、销售阶段和重复问题。",
  "Capture product, budget, timeline, objections, language, and next step.": "记录产品、预算、时间、顾虑、语言和下一步。",
  "Generate consistent AI-assisted follow-up and classify each customer stage.": "生成一致的 AI 辅助跟进，并划分客户阶段。",
  "Summarize common questions to improve FAQs, sales scripts, and content.": "汇总常见问题，优化 FAQ、销售话术和内容。",
  "More consistent follow-up, better customer organization, stronger sales scripts, and less repetitive admin work.": "实现更一致的跟进、更有序的客户管理、更强的销售话术，并减少重复行政工作。",
  "I created a Dell store activation that combined campaign design, team recognition, product positioning, and training discussion in one memorable retail experience.": "我策划了一次 Dell 门店激活，将活动设计、团队表彰、产品定位和培训讨论融入一个有记忆点的零售体验。",
  "Designed the flyer and an original sci-fi light-versus-dark campaign concept.": "设计活动传单和原创科幻光明与黑暗主题。",
  "Planned themed activation materials and store-winner recognition.": "规划主题活动材料与门店优胜表彰。",
  "Connected the event to Dell product messaging and customer-engagement training.": "将活动与 Dell 产品信息及客户互动培训连接起来。",
  "A stronger retail brand touchpoint that supported team recognition, training, and Dell product engagement.": "打造更强的零售品牌触点，支持团队表彰、培训与 Dell 产品互动。"
});

Object.assign(zhTranslations, {
  "Applied AI": "AI 实际应用",
  "AI Tools & Workflow Architecture": "AI 工具与工作流架构",
  "Applying Gemini, ChatGPT, NotebookLM, and Codex across research, content, coding, and structured workflows.": "将 Gemini、ChatGPT、NotebookLM 与 Codex 应用于研究、内容、编程和结构化工作流。",
  "A practical approach to selecting and connecting AI tools for research, communication, coding, and repeatable work.": "以实用方式选择并连接 AI 工具，用于研究、沟通、编程和可重复工作。",
  "I use Gemini, ChatGPT, NotebookLM, and Codex as complementary tools rather than interchangeable chatbots. Each tool supports a defined stage, with clear inputs, reusable instructions, human review, and a practical final output.": "我将 Gemini、ChatGPT、NotebookLM 和 Codex 作为互补工具，而不是功能相同的聊天机器人。每个工具负责明确阶段，并配合清晰输入、可复用指令、人工审核和实际输出。",
  "Use Architecture": "使用架构",
  "Gemini: explore information, compare sources, and work with multimodal context.": "Gemini：探索信息、比较来源，并处理多模态上下文。",
  "ChatGPT: structure ideas, refine communication, and develop reusable prompts or content.": "ChatGPT：整理思路、优化沟通，并开发可复用提示词或内容。",
  "NotebookLM: organize source materials, generate grounded summaries, and trace insights back to references.": "NotebookLM：整理来源材料、生成基于资料的摘要，并将洞察追溯至参考来源。",
  "Codex: inspect files, edit code, test changes, and turn plans into working digital outputs.": "Codex：检查文件、编辑代码、测试修改，并将计划转化为可运行的数字成果。",
  "Workflow: define the goal, gather context, select the tool, review the result, and store reusable knowledge.": "工作流：明确目标、收集上下文、选择工具、审核结果，并沉淀可复用知识。",
  "Gemini": "Gemini",
  "ChatGPT": "ChatGPT",
  "NotebookLM": "NotebookLM",
  "Codex": "Codex",
  "Prompt Design": "提示词设计",
  "Context Design": "上下文设计",
  "Workflow Architecture": "工作流架构",
  "Human Review": "人工审核",
  "Faster research and execution, more consistent communication, less repetitive work, and a clearer path from idea to usable output.": "提升研究与执行速度，保持沟通一致性，减少重复工作，并建立从想法到可用成果的清晰路径。"
});

Object.assign(zhTranslations, {
  "Home": "首页",
  "Seasonal events, partner training, and client-sponsored activations designed to strengthen engagement.": "通过季节性活动、合作伙伴培训与客户赞助活动提升参与度。",
  "A case study in seasonal event planning, partner training, client-sponsored activations, product positioning, and customer engagement.": "关于季节性活动策划、合作伙伴培训、客户赞助活动、产品定位与客户互动的案例。",
  "I plan retail activations that combine campaign design, seasonal themes, partner engagement, product positioning, and practical training.": "我策划融合活动设计、季节主题、合作伙伴互动、产品定位与实用培训的零售活动。",
  "Supported a Mother's Day event that combined seasonal engagement with partner training.": "支持母亲节主题活动，将节日互动与合作伙伴培训相结合。",
  "Coordinated client-sponsored special-day events, aligning sponsor visibility with the audience experience.": "协调由客户赞助的特殊节日活动，在赞助方曝光与受众体验之间保持平衡。",
  "Partner Training": "合作伙伴培训",
  "Sponsor Coordination": "赞助协调",
  "Seasonal Activations": "季节性活动",
  "Stronger brand touchpoints, clearer partner understanding, and memorable events that balance audience value with sponsor goals.": "打造更强的品牌触点、提升合作伙伴理解，并创造兼顾受众价值与赞助目标的活动体验。",
  "Customer-Focused Strategy": "以客户为中心的策略",
  "Marketing, sales, retail technology, and AI workflow expertise.": "市场营销、销售、零售科技与 AI 工作流专业能力。",
  "For business inquiries and professional collaboration.": "欢迎业务咨询与专业合作。",
  "Using Canva, AI-assisted ideation, and audience personas for product, training, and event communication.": "运用 Canva、AI 辅助创意与受众画像进行产品、培训和活动沟通设计。",
  "A case study in using visual judgment, AI-assisted ideation, and audience needs to make products, training, and events easier to understand.": "运用视觉判断、AI 辅助创意与受众需求，让产品、培训和活动信息更易理解。",
  "I use Canva, AI-assisted ideation, audience personas, space planning, and product knowledge to create clearer visual communication for customers and partner teams.": "我运用 Canva、AI 辅助创意、受众画像、空间规划和产品知识，为客户与合作伙伴团队制作更清晰的视觉沟通内容。",
  "Use AI-assisted ideation and audience personas to design training materials and event flyers that help partner teams understand key messages.": "运用 AI 辅助创意与受众画像设计培训材料和活动传单，帮助合作伙伴团队理解关键信息。",
  "AI-Assisted Ideation": "AI 辅助创意",
  "Persona-Based Design": "受众画像设计",
  "Training & Event Flyers": "培训与活动传单",
  "Clearer product presentation, stronger partner understanding, and more accessible training and event communication.": "实现更清晰的产品呈现、更充分的合作伙伴理解，以及更易懂的培训与活动沟通。"
});

Object.assign(zhTranslations, {
  "Customer-facing marketing, sales, and AI workflows": "面向客户的市场、销售与 AI 工作流",
  "Customer insight, retail experience, and market research shape clearer content, stronger campaigns, and practical customer-focused marketing.": "客户洞察、零售经验和市场研究共同塑造更清晰的内容、更有力的营销活动，以及以客户为中心的实用营销方案。",
  "I help customers understand products faster, help teams explain value more clearly, and use practical AI tools to reduce repetitive marketing and sales work.": "我帮助客户更快理解产品，帮助团队更清楚地表达价值，并用实用 AI 工具减少重复的市场和销售工作。",
  "Market": "营销",
  "Explain": "解释",
  "Turn customer insight into content, campaigns, and brand communication.": "把客户洞察转化为内容、活动和品牌沟通。",
  "Turn product details into plain customer language.": "把产品细节转成客户听得懂的话。",
  "Sell": "销售",
  "Support better recommendations and follow-up.": "支持更准确的推荐与后续跟进。",
  "Improve": "优化",
  "Use AI and workflow tools for repeatable work.": "用 AI 和工作流工具处理可重复工作。",
  "What I do": "我做什么",
  "Make marketing messages clearer and more useful.": "让营销信息更清晰、更有实际价值。",
  "Make product value easier to understand.": "让产品价值更容易被理解。",
  "Who I help": "服务对象",
  "Retail teams, marketing teams, and customer-facing brands.": "零售团队、市场团队和面向客户的品牌。",
  "Customers, retail teams, and product-focused brands.": "客户、零售团队和产品型品牌。",
  "How I work": "工作方式",
  "Combine sales conversations, content, design, and AI tools.": "结合销售沟通、内容、设计与 AI 工具。",
  "Proof": "经验依据",
  "5+ years across retail, technology, design, and marketing.": "5 年以上零售、科技、设计与市场相关经验。",
  "A practical bridge between customers, products, and teams.": "连接客户、产品与团队的实用桥梁。",
  "I connect sales, marketing, and day-to-day operations. My work starts with real customer questions, then turns them into clearer marketing communication, useful content, stronger follow-up, and practical workflows.": "我连接销售、市场和日常运营。我的工作从真实客户问题出发，再转化为更清晰的营销沟通、有用内容、更好的跟进和实用工作流。",
  "I connect sales, marketing, and day-to-day operations. My work starts with real customer questions, then turns them into clearer product explanations, useful content, stronger follow-up, and practical workflows.": "我连接销售、市场和日常运营。我的工作从真实客户问题出发，再转化为更清晰的产品解释、有用内容、更好的跟进和实用工作流。",
  "Simple ways I create value.": "我创造价值的简单方式。",
  "Work experience that supports the same core skill: clear customer communication.": "所有经历都服务于同一个核心能力：清晰的客户沟通。",
  "Skills grouped by what they help accomplish.": "按实际用途归类的技能。",
  "Selected examples of product, design, workflow, and brand communication.": "产品、设计、工作流与品牌沟通的精选案例。",
  "Need stronger marketing communication or practical workflow support?": "需要更强的营销沟通或实用工作流支持？",
  "Need clearer product communication or practical workflow support?": "需要更清晰的产品沟通或实用工作流支持？",
  "Available for professional conversations around marketing, sales, retail technology, and AI-assisted workflows.": "欢迎围绕市场、销售、零售科技和 AI 辅助工作流进行专业交流。"
});

Object.assign(zhTranslations, {
  "Sectional Sofa — Product Presentation": "组合沙发 — 产品介绍",
  "Back to Portfolio": "返回作品集",
  "AI Product Presentation Demo": "AI 产品展示 Demo",
  "From One Image to a Complete Product Story": "从一张图片到完整产品故事",
  "A single product image becomes a structured presentation with product analysis, visual direction, AI-assisted scene development, benefit-led content, and final quality control.": "从一张产品图片出发，通过产品分析、视觉方向、AI 辅助场景构建、利益点内容与最终质检，形成结构完整的产品展示。",
  "Source image": "源图片",
  "Production stages": "制作阶段",
  "Complete showcase": "完整展示",
  "FINAL OUTPUT / PRODUCT PAGE": "最终输出 / 产品页面",
  "Process System": "流程系统",
  "Designed as a controlled production workflow": "以可控的专业制作流程完成",
  "Each stage has a clear input, AI-assisted operation, visual decision, and quality check. The goal is not simply to generate more images, but to create one consistent product story that is useful for customers.": "每个阶段都有明确的输入、AI 辅助操作、视觉决策与质量检查。目标不是简单生成更多图片，而是建立一个一致、对客户有用的产品故事。",
  "INPUT / VISUAL AUDIT": "输入 / 视觉审核",
  "Start with one product image": "从一张产品图片开始",
  "AI Vision Analysis": "AI 视觉分析",
  "SOURCE 01": "源素材 01",
  "Product signals extracted": "提取产品视觉信息",
  "Sectional silhouette": "组合沙发轮廓",
  "Forest green fabric": "森林绿面料",
  "Deep plush cushions": "深厚柔软坐垫",
  "Metal leg structure": "金属腿结构",
  "Chaise configuration": "贵妃位布局",
  "Premium comfort position": "高品质舒适定位",
  "The first pass separates visible facts from assumptions, creating a reliable base for prompts, copy, and scene direction.": "第一轮先区分可见事实与推测，为提示词、文案和场景方向建立可靠基础。",
  "STRUCTURE / CONSISTENCY": "结构 / 一致性",
  "Build the product identity lock": "建立产品身份锁定规则",
  "Prompt Architecture": "提示词架构",
  "FORM": "形态",
  "L-shaped sectional": "L 形组合沙发",
  "Preserve cushion count, chaise direction, arm shape, and overall proportions.": "保持坐垫数量、贵妃位方向、扶手形状与整体比例。",
  "MATERIAL": "材质",
  "Textured green upholstery": "纹理绿色面料",
  "Maintain the same fabric character, color depth, seams, and soft surface response.": "保持相同的面料特征、色彩深度、缝线和柔软表面质感。",
  "DETAIL": "细节",
  "Slim black metal legs": "纤细黑色金属腿",
  "Protect recognizable construction details across every generated angle and scene.": "在不同生成角度与场景中保持可识别的结构细节。",
  "CONSISTENCY RULE": "一致性规则",
  "DIRECTION / GENERATION": "方向 / 生成",
  "Create a coordinated scene system": "建立协调一致的场景系统",
  "Scene Generation": "场景生成",
  "Studio Hero": "影棚主视觉",
  "Clean product focus, soft daylight, premium retail composition.": "突出产品主体，采用柔和日光与高品质零售构图。",
  "Lifestyle Context": "生活方式场景",
  "Warm living space with realistic scale and coordinated interior styling.": "使用真实尺度、协调软装与温暖居住空间。",
  "Detail Studies": "细节特写",
  "Fabric, cushion, chaise, and leg close-ups with consistent lighting.": "以一致光线展示面料、坐垫、贵妃位与金属腿细节。",
  "LIGHT": "光线",
  "Soft natural": "柔和自然光",
  "PALETTE": "色彩",
  "Warm neutral + forest green": "暖中性色 + 森林绿",
  "CAMERA": "镜头",
  "Retail editorial": "零售编辑风格",
  "MOOD": "氛围",
  "Comfort + confidence": "舒适 + 可信",
  "CONTENT / HIERARCHY": "内容 / 层级",
  "Turn features into customer value": "将产品特点转化为客户价值",
  "Content Synthesis": "内容整合",
  "Product name + value statement": "产品名称 + 价值主张",
  "Establish the offer in one clear viewing moment.": "让客户第一眼清楚理解产品定位。",
  "Price + action": "价格 + 行动按钮",
  "Make the commercial next step easy to find.": "让客户快速找到下一步购买行动。",
  "Feature-to-benefit proof": "特点到利益点证明",
  "Connect construction details to comfort, durability, and style.": "把结构细节连接到舒适性、耐用性与风格价值。",
  "Lifestyle context": "生活方式场景",
  "Help customers imagine the product in a real environment.": "帮助客户想象产品在真实空间中的效果。",
  "Options + closing reason": "选项 + 最终购买理由",
  "Finish with product confidence and a concise purchase rationale.": "以产品信心和简洁购买理由完成展示。",
  "ASSEMBLY / QUALITY CONTROL": "整合 / 质量控制",
  "Review before final presentation": "最终展示前进行审核",
  "AI + Human QA": "AI + 人工质检",
  "PASS 01": "检查 01",
  "Product consistency": "产品一致性",
  "Shape, chaise position, cushions, legs, fabric, and color remain aligned.": "确认形态、贵妃位、坐垫、沙发腿、面料和颜色保持一致。",
  "PASS 02": "检查 02",
  "Visual credibility": "视觉可信度",
  "Lighting, shadows, room scale, contact points, and texture are reviewed.": "检查光线、阴影、空间尺度、接触点与材质纹理。",
  "PASS 03": "检查 03",
  "Content accuracy": "内容准确性",
  "Claims stay grounded in visible product details and the approved brief.": "所有产品描述都基于可见细节与确认后的需求。",
  "PASS 04": "检查 04",
  "Presentation flow": "展示流程",
  "Hierarchy guides the viewer from attention to understanding to action.": "通过信息层级引导客户从注意、理解到行动。",
  "Final Result": "最终成果",
  "One complete product presentation": "一套完整的产品展示",
  "The final layout combines sales structure, product storytelling, consistent imagery, and clear visual hierarchy in one customer-facing asset.": "最终版面把销售结构、产品故事、一致图像和清晰视觉层级整合为一份面向客户的完整素材。"
});

Object.assign(zhTranslations, {
  "Agent Prompt System": "Agent 提示词系统",
  "AGENTS.md / Operating Prompt": "AGENTS.md / 执行提示词",
  "A structured operating prompt that tells an AI agent how to interpret requests, control scope, make minimal changes, verify results, and stop at the correct point.": "一套结构化执行提示词，用于指导 AI Agent 理解请求、控制范围、进行最小改动、验证结果，并在正确节点停止。",
  "Why It Is Used": "为什么使用",
  "Reliable AI work needs operating boundaries": "可靠的 AI 工作需要明确执行边界",
  "Without clear operating instructions, an agent may inspect too much, change unrelated files, add unnecessary complexity, or continue after the requested result is complete. This prompt turns broad expectations into explicit execution rules.": "缺少明确执行指令时，Agent 可能检查过多内容、修改无关文件、增加不必要复杂度，或在目标完成后继续工作。这套提示词把宽泛要求转化为明确的执行规则。",
  "Prevents scope creep": "防止范围扩张",
  "Limits work to the latest explicit request and the files directly required to complete it.": "把工作限制在最新明确请求及完成任务直接需要的文件内。",
  "Reduces unnecessary diffs": "减少不必要改动",
  "Prioritizes surgical edits instead of broad rewrites, refactoring, or unrelated cleanup.": "优先采用精准修改，避免大范围重写、重构或无关清理。",
  "Makes decisions traceable": "让决策可追踪",
  "Connects every changed line to a specific requirement, making review faster and clearer.": "让每一处修改都对应具体需求，使审核更快速清晰。",
  "Creates predictable outcomes": "形成可预测结果",
  "Defines how to verify the result, report the change, and stop once the task is complete.": "明确如何验证结果、报告改动，并在任务完成后停止。",
  "Control Parameters": "控制参数",
  "Each rule controls a specific execution decision": "每条规则控制一项具体执行决策",
  "These are operational parameters rather than model-generation settings. They determine how the agent behaves around the work.": "这些是执行参数，而不是模型生成参数。它们决定 Agent 如何围绕任务开展工作。",
  "Parameter": "参数",
  "Configured value": "配置值",
  "Meaning and function": "意义与功能",
  "Resolves conflicts by placing the latest user request above host guidance, project conventions, and general judgment.": "发生冲突时，把用户最新请求置于主机指引、项目规范和一般判断之前。",
  "Prevents the agent from adding features, fixing adjacent issues, or expanding the task through assumptions.": "防止 Agent 自行添加功能、修复相邻问题或通过假设扩大任务范围。",
  "Allows only the files and sections required to understand and complete the requested change.": "只允许读取理解和完成当前改动所需的文件与区域。",
  "Keeps the implementation simple and preserves existing structure, naming, style, and functionality.": "保持实现简洁，并保留现有结构、命名、风格与功能。",
  "Avoids introducing packages or configuration changes unless the task explicitly requires them.": "除非任务明确要求，否则避免引入新依赖或配置改动。",
  "Matches the check to the change: manual review for copy, targeted checks for code, and focused proof for bugs.": "让验证方式匹配改动：文案采用人工检查，代码采用定向检查，错误修复采用针对性证明。",
  "Ends execution immediately after the requested outcome is achieved, preventing extra work.": "在请求结果完成后立即结束执行，避免额外工作。",
  "Reports changed files, the exact change, its purpose, and what still requires manual review.": "报告改动文件、具体变化、改动目的及仍需人工确认的内容。",
  "Execution Logic": "执行逻辑",
  "From request to verified result": "从请求到验证完成的结果",
  "The prompt creates a repeatable decision path instead of leaving each task to unstructured interpretation.": "这套提示词建立可重复的决策路径，避免每个任务都依赖无结构的临时判断。",
  "Request": "请求",
  "Identify the latest explicit outcome.": "识别最新明确目标。",
  "Interpret": "理解",
  "Resolve priority and choose the smallest safe reading.": "确定优先级并选择最小安全解释。",
  "Inspect": "检查",
  "Read only the directly related context.": "只读取直接相关的上下文。",
  "Change": "修改",
  "Make the minimum required implementation.": "完成最低必要实现。",
  "Verify": "验证",
  "Use one proportional, targeted check.": "执行一次与风险匹配的定向检查。",
  "Report": "报告",
  "State what changed and what to review.": "说明改动内容与需确认事项。",
  "Stop": "停止",
  "End when the requested result is complete.": "请求结果完成后结束。",
  "Strengths": "优势",
  "What the prompt improves": "这套提示词改善什么",
  "More focused implementation": "更聚焦的执行",
  "Smaller and safer changes": "更小、更安全的改动",
  "Faster human review": "更快的人工审核",
  "Clearer delivery reports": "更清晰的交付报告",
  "Consistent behavior across tasks": "跨任务保持一致行为",
  "Tradeoffs": "边界与取舍",
  "What it does not replace": "它不能替代什么",
  "Clear requirements from the user": "用户提供的清晰需求",
  "Project-specific technical documentation": "项目专属技术文档",
  "Tests for high-risk application logic": "针对高风险业务逻辑的测试",
  "Human judgment for ambiguous decisions": "面对模糊决策时的人工判断",
  "Exploratory work when broad discovery is required": "需要广泛发现时的探索性工作",
  "Practical Result": "实际结果",
  "A prompt that behaves like an operating contract": "像执行契约一样工作的提示词",
  "The value comes from translating general expectations into rules that can guide each inspection, edit, verification step, and final report.": "它的价值在于把一般期望转化为具体规则，从而指导每次检查、修改、验证和最终报告。"
});

Object.assign(zhTranslations, {
  "Visual Reverse Engineering": "视觉逆向工程",
  "AI Visual Reverse Engineering": "AI 视觉逆向工程",
  "From Image to Reusable Visual System": "从图像到可复用视觉系统",
  "A controlled method for reading an image, extracting its visual logic, simplifying structure and color, rebuilding material detail, and validating the result.": "一套受控方法，用于读取图像、提取视觉逻辑、简化结构与色彩、重建材质细节并验证结果。",
  "My Method & Philosophy": "我的方法与理念",
  "Deconstruct first. Rebuild with control.": "先解构，再有控制地重构",
  "The method separates a complex image into visual language, structure, color, and material before recombining them. Each stage solves one problem, making the final output easier to direct and evaluate.": "这套方法先把复杂图像拆分为视觉语言、结构、色彩与材质，再重新组合。每个阶段只解决一个问题，使最终结果更容易控制和评估。",
  "Observe": "观察",
  "Structure": "结构",
  "Color": "色彩",
  "Reconstruct": "重构",
  "PRINCIPLE 01": "原则 01",
  "PRINCIPLE 02": "原则 02",
  "PRINCIPLE 03": "原则 03",
  "PRINCIPLE 04": "原则 04",
  "Structure before decoration": "结构先于装饰",
  "Composition, silhouette, proportion, and spatial relationships are defined before texture and visual polish.": "先确定构图、轮廓、比例与空间关系，再处理纹理和视觉润色。",
  "Evidence before invention": "事实先于想象",
  "Visible facts are separated from assumptions so prompts remain grounded in the source image.": "把可见事实与推测分开，使提示词始终以原图为依据。",
  "Constraints improve consistency": "约束提升一致性",
  "Clear requirements for form, color, material, camera, and exclusions reduce random variation.": "明确形态、色彩、材质、镜头和排除项，可以减少随机偏差。",
  "AI assists; human judgment decides": "AI 辅助，人工判断决定",
  "AI accelerates analysis and iteration, while final accuracy, usability, and ethics remain human decisions.": "AI 加速分析与迭代，但最终准确性、可用性和伦理判断仍由人负责。",
  "How To Use It": "使用方法",
  "A six-stage visual reverse-engineering method": "六阶段视觉逆向工程方法",
  "The stages can be used independently, but the full sequence provides stronger control when an image must be studied, simplified, and rebuilt.": "各阶段可以单独使用，但当图像需要分析、简化和重构时，完整流程能提供更强控制。",
  "Upload and diagnose": "上传并诊断",
  "Confirm the subject, intended output, image quality, important details, and elements that must remain unchanged.": "确认主体、目标输出、图片质量、重要细节以及必须保持不变的元素。",
  "Reverse visual deconstruction": "逆向视觉解构",
  "Extract the core theme, composition, style, material, atmosphere, camera, and viewing angle as structured language.": "把核心主题、构图、风格、材质、氛围、镜头与视角提取为结构化语言。",
  "Extract the structural skeleton": "提取结构骨架",
  "Remove color and lighting distractions to study contours, internal divisions, proportion, and spatial logic.": "去除色彩与光影干扰，分析轮廓、内部区域、比例和空间逻辑。",
  "Build the flat-color map": "建立标准色稿",
  "Assign clean local colors to independent regions, strengthening hue and value separation without texture noise.": "为独立区域分配纯净固有色，加强色相与明度区分并去除纹理噪声。",
  "Reconstruct with precise language": "使用精准语言重构",
  "Combine the approved structure and palette with specific craft, material, lighting, lens, and quality terms.": "把确认后的结构和配色与具体工艺、材质、光线、镜头和质量词汇结合。",
  "Validate and refine": "验证并优化",
  "Compare structure, color, material, edge quality, and practical usability; revise only the failed dimension.": "比较结构、色彩、材质、边缘质量与实际可用性，只修改未通过的维度。",
  "Visual Prompt Parameters": "视觉提示词参数",
  "Every parameter has a specific job": "每个参数都有明确作用",
  "Professional prompts work through controlled information, not decorative vocabulary. Each parameter should influence a visible part of the result.": "专业提示词依靠受控信息，而不是华丽词汇。每个参数都应影响结果中可见的部分。",
  "01 / SUBJECT": "01 / 主体",
  "02 / STRUCTURE": "02 / 结构",
  "03 / STYLE": "03 / 风格",
  "04 / MATERIAL": "04 / 材质",
  "05 / LIGHT": "05 / 光线",
  "06 / CAMERA": "06 / 镜头",
  "07 / CONSTRAINT": "07 / 约束",
  "08 / OUTPUT": "08 / 输出",
  "Core subject": "核心主体",
  "Defines what must appear and which object carries the visual priority.": "定义必须出现的内容以及承担视觉重点的对象。",
  "Composition and form": "构图与形态",
  "Controls framing, silhouette, proportion, position, and relationships between elements.": "控制取景、轮廓、比例、位置以及元素之间的关系。",
  "Visual language": "视觉语言",
  "Sets the overall medium and finish without replacing structural instructions.": "设定整体媒介和完成效果，但不能替代结构指令。",
  "Craft and texture": "工艺与质感",
  "Uses precise material vocabulary to guide learned visual associations.": "使用精准材质词汇，引导模型匹配已学习的视觉关联。",
  "Lighting and atmosphere": "光线与氛围",
  "Determines readability, depth, highlights, shadow softness, and emotional tone.": "决定清晰度、空间深度、高光、阴影柔和度与情绪。",
  "Lens and viewpoint": "镜头与视角",
  "Controls perspective, detail scale, depth of field, and photographic credibility.": "控制透视、细节尺度、景深与摄影可信度。",
  "Consistency rules": "一致性规则",
  "States what must remain unchanged and which common generation errors to avoid.": "说明哪些内容必须保持不变，以及需要避免哪些常见生成错误。",
  "Delivery requirement": "交付要求",
  "Defines the practical finish, background, clarity, and intended downstream use.": "定义完成质量、背景、清晰度和后续实际用途。",
  "Practical Boundaries": "务实边界",
  "Strong prompts improve probability, not certainty": "强提示词提高成功率，而非提供确定性",
  "The workflow is a direction and iteration system. It does not recover an image's original hidden prompt or guarantee a perfect result in one generation.": "这套流程是一套方向控制与迭代系统。它无法恢复图像原始隐藏提示词，也不能保证一次生成就得到完美结果。",
  "Reverse prompts are approximations": "逆向提示词只是近似分析",
  "Vision-language analysis describes likely visual features; it cannot reveal the exact original generation process.": "视觉语言分析只能描述可能的视觉特征，无法揭示原始生成过程。",
  "Flat-color output is still a bitmap": "标准色稿仍然是位图",
  "It may look segmented, but it is not automatically a layered Photoshop file or editable vector artwork.": "它可能看起来像完成分区，但不会自动成为 Photoshop 分层文件或可编辑矢量图。",
  "Line art is not engineering geometry": "线稿不等于工程几何图",
  "Generated contours may contain gaps or distortions and require manual vector cleanup for fabrication.": "生成轮廓可能存在断点或变形，用于制作前仍需人工矢量清理。",
  "Specific terms guide, not guarantee": "专业词汇用于引导，而非保证",
  "Craft and material vocabulary improves direction, but results still require comparison and targeted iteration.": "工艺和材质词汇可以改善生成方向，但结果仍需比较与定向迭代。"
});

Object.assign(zhTranslations, {
  "Case 02 / Instant Camera": "案例 02 / 即时成像相机",
  "One product image, four controlled representations": "一张产品图，四种受控视觉表达",
  "The camera case applies the same method to an industrial product: lock the product identity first, then change only the representation layer from observation to structure, color, and final material.": "相机案例把同一方法应用于工业产品：先锁定产品身份，再只改变视觉表达层，从原始观察依次进入结构、色彩和最终材质。",
  "REFERENCE INPUT": "参考输入",
  "Original product image": "原始产品图片",
  "CONTROLLED OUTPUT": "受控输出",
  "Four-stage reverse-engineering result": "四阶段逆向工程结果",
  "Original observation": "原始观察",
  "Read the camera as evidence: off-white upper shell, black film base, central lens, left flash, violet viewfinder, colored controls, and a stepped side profile.": "把相机作为视觉证据进行读取：米白色上壳、黑色胶片底座、中央镜头、左侧闪光灯、紫色取景窗、彩色控制键和阶梯式侧面轮廓。",
  "Structural line drawing": "结构线稿",
  "Reduce the product to silhouette, lens rings, modular front controls, body divisions, base geometry, and perspective without material distraction.": "去除材质干扰，把产品简化为轮廓、镜头环、模块化前置控制区、机身分区、底座几何与透视关系。",
  "Standard color map": "标准色稿",
  "Assign clean local colors to each region so the off-white body, dark base, lens, viewfinder, and small accents remain visually separated.": "为每个区域分配纯净固有色，使米白机身、深色底座、镜头、取景窗和小面积强调色保持清晰分离。",
  "Commercial material reconstruction": "商业级材质重构",
  "Restore matte polymer, glossy lens glass, translucent plastic, controlled reflections, soft shadows, and premium product-lighting depth.": "恢复哑光聚合物、光泽镜片玻璃、半透明塑料、受控反射、柔和阴影与高品质产品灯光层次。",
  "Identity Lock": "身份锁定",
  "What must not change": "哪些内容不能改变",
  "Body proportions, lens diameter, flash and viewfinder placement, black base height, control locations, viewing angle, and the stepped right-side housing.": "机身比例、镜头直径、闪光灯与取景窗位置、黑色底座高度、控制键位置、观察角度及右侧阶梯式结构。",
  "Variable Layer": "可变层",
  "What is allowed to change": "哪些内容可以改变",
  "Rendering mode, edge treatment, texture detail, light response, background tone, and the amount of visual simplification at each stage.": "渲染方式、边缘处理、纹理细节、光线响应、背景色调以及各阶段的视觉简化程度。",
  "Prompt Logic": "提示词逻辑",
  "Why the sequence is stable": "为什么流程保持稳定",
  "Product geometry is repeated as a constraint in every stage. Only one visual dimension changes at a time, reducing uncontrolled redesign.": "每个阶段都重复产品几何约束，并且一次只改变一个视觉维度，从而减少不受控的产品重设计。",
  "Human Review": "人工审核",
  "What still needs validation": "哪些内容仍需验证",
  "Small controls, lens-ring count, transparent parts, edge continuity, brand text, and exact proportions require comparison with the source image.": "小型控制键、镜头环数量、透明部件、边缘连续性、品牌文字和精确比例仍需与原图进行对比。",
  "SUBJECT": "主体",
  "Instant camera": "即时成像相机",
  "Defines the product category and primary object.": "定义产品类别和主要对象。",
  "FORM": "形态",
  "Rectangular modular body": "矩形模块化机身",
  "Locks silhouette, proportions, and component placement.": "锁定轮廓、比例与部件位置。",
  "PALETTE": "配色",
  "Off-white + charcoal": "米白色 + 炭黑色",
  "Preserves the main color relationship and small accents.": "保持主要色彩关系与小面积强调色。",
  "MATERIAL": "材质",
  "Polymer + optical glass": "聚合物 + 光学玻璃",
  "Guides surface roughness, transparency, and reflections.": "指导表面粗糙度、透明度与反射效果。",
  "CAMERA": "镜头",
  "Front three-quarter view": "正面四分之三视角",
  "Maintains perspective and visible depth across stages.": "在各阶段保持一致透视与可见深度。",
  "CONSTRAINT": "约束",
  "No product redesign": "禁止产品重设计",
  "Prevents added controls, altered geometry, or inconsistent scale.": "防止增加控制键、改变几何结构或出现比例不一致。"
});

Object.assign(zhTranslations, {
  "Independent Stage Images": "独立阶段分图",
  "Compare each transformation separately": "分别对比每个转换阶段",
  "The composite explains the workflow at a glance. These individual images make structure, color, and environment changes easier to compare against the original.": "组合图用于快速说明整体流程，独立分图则便于把结构、色彩和环境变化分别与原图对比。",
  "01 / ORIGINAL": "01 / 原图",
  "Reference image": "参考原图",
  "The evidence source used to lock product shape, component placement, proportions, palette, and viewing angle.": "作为视觉证据来源，用于锁定产品形态、部件位置、比例、配色与观察角度。",
  "02 / STRUCTURE": "02 / 结构",
  "Material and color are removed so silhouette, body divisions, lens rings, controls, base geometry, and perspective can be inspected.": "移除材质与色彩，以便检查轮廓、机身分区、镜头环、控制键、底座几何和透视。",
  "03 / COLOR": "03 / 色彩",
  "Uniform local colors separate the off-white shell, charcoal base, black lens, violet viewfinder, and small accent controls.": "使用统一固有色，清晰区分米白机壳、炭黑底座、黑色镜头、紫色取景窗与小面积强调控制键。",
  "04 / NEW ENVIRONMENT": "04 / 新环境",
  "Space campaign scene": "太空主题商业场景",
  "The product identity remains stable while the environment changes to a lunar observation station with controlled orbital lighting.": "产品身份保持稳定，同时把环境改变为采用受控轨道光线的月面观景站。",
  "IDENTITY": "产品身份",
  "The product remains recognizable": "产品保持可识别",
  "The off-white shell, black base, lens diameter, flash, violet viewfinder, colored controls, and stepped side housing stay consistent.": "米白机壳、黑色底座、镜头直径、闪光灯、紫色取景窗、彩色控制键和阶梯式侧壳保持一致。",
  "CONTEXT": "环境语境",
  "Only the environment changes": "只改变展示环境",
  "The neutral studio becomes a lunar observation station with Earth, a moon horizon, window framing, and a brushed-metal platform.": "中性影棚被替换为月面观景站，并加入地球、月面地平线、舷窗结构与拉丝金属展台。",
  "LIGHT": "光线",
  "Space informs the material response": "太空环境决定材质光线响应",
  "Cool orbital light and a restrained warm rim light reveal the matte polymer, lens glass, translucent plastic, and metal surface.": "冷色轨道光与克制的暖色轮廓光共同呈现哑光聚合物、镜片玻璃、半透明塑料与金属表面。",
  "PURPOSE": "展示目的",
  "The setting creates a new product story": "环境建立新的产品故事",
  "The space environment shifts the camera from a catalog object to an aspirational technology campaign without redesigning the product.": "太空环境在不重设计产品的前提下，把相机从目录产品转变为具有想象力的科技主题广告。"
});

Object.assign(zhTranslations, {
  "Why Reverse Engineering?": "为什么使用视觉逆向工程？",
  "VISUAL SYSTEM / NOT HARDWARE": "视觉系统 / 非硬件拆解",
  "Turn one finished image into reusable rules.": "把一张成品图转化为可复用规则",
  "This is visual and prompt reverse engineering—not camera hardware teardown. It extracts structure, materials, lighting, angles, and prompt constraints.": "这是视觉与提示词逆向工程，不是拆解相机硬件。它提取结构、材质、灯光、角度和提示词约束。",
  "Make the style repeatable": "让风格可以复制",
  "Convert a good-looking image into a clear formula for composition, material, light, and hierarchy.": "把好看的图片转化为清晰的构图、材质、光线和信息层级公式。",
  "Generate at scale": "支持批量生成",
  "Reuse the same visual system across furniture, technology, e-commerce, ads, and landing pages.": "把同一视觉系统复用于家具、科技产品、电商、广告和落地页。",
  "Protect the product": "保护产品本体",
  "Lock shape, proportions, and controls while allowing background, lighting, and presentation to change.": "锁定形态、比例和控制部件，同时允许背景、光线和展示方式改变。",
  "Create design assets": "沉淀设计资产",
  "Turn one image into analysis, line art, color rules, material notes, prompts, and reusable templates.": "把一张图片转化为分析、线稿、色彩规则、材质说明、提示词和可复用模板。",
  "CORE RESULT": "核心结果",
  "Replace “make it premium” with rules AI and design systems can execute.": "把“做得高级一点”转化为 AI 和设计系统可以执行的规则。"
});

Object.assign(zhTranslations, {
  "Demo-N Visual DNA Model": "Demo-N 视觉 DNA 模型",
  "Break the reference into four layers before prompting.": "生成提示词前，先把参考图拆成四层",
  "Do not describe the whole image at once. Separate what defines the product from what can be transferred, replaced, or upgraded.": "不要一次描述整张图。先区分哪些内容定义产品，哪些内容可以迁移、替换或升级。",
  "Style DNA": "风格 DNA",
  "Scene DNA": "场景 DNA",
  "Composition DNA": "构图 DNA",
  "Product DNA": "产品 DNA",
  "UPGRADE": "升级",
  "REPLACE": "替换",
  "RETAIN / ADAPT": "保留 / 微调",
  "LOCK": "锁定",
  "Generation Rule": "生成规则",
  "RETAIN OR ADAPT": "保留或微调",
  "Keep identity, adjust presentation, change environment, and improve finish.": "保持产品身份，调整展示方式，替换环境，并升级最终质感。",
  "01 / LOCK": "01 / 锁定",
  "02 / ADAPT": "02 / 微调",
  "03 / REPLACE": "03 / 替换",
  "04 / UPGRADE": "04 / 升级",
  "Structure, proportions, color, material, functional parts, silhouette, and identifying features. Real products must remain fixed.": "产品的结构、比例、颜色、材质、功能部件、轮廓和识别特征。真实商品必须保持固定。",
  "Camera distance, viewpoint, placement, frame coverage, negative space, perspective, visual focus, and presentation method.": "镜头距离、视角、主体位置、画面占比、留白、透视、视觉重心和产品展示方式。",
  "Environment, floor, background, props, architecture, and atmosphere. This is the easiest layer to replace.": "产品所处的环境、地面、背景、道具、建筑元素和氛围。这是最容易替换的一层。",
  "Lighting, photography, color mood, material response, depth of field, clarity, and commercial or cinematic finish.": "光影系统、摄影质感、色彩情绪、材质表现、景深、清晰度以及商业广告感或电影感。",
  "CASE 02 / INSTANT CAMERA": "案例 02 / 即时成像相机",
  "Product locked · composition retained · studio replaced by lunar station · lighting upgraded for a technology campaign": "产品锁定 · 构图保留 · 摄影棚替换为月面观景站 · 光线升级为科技广告效果"
});

const titleTranslations = {
  "Yury Li / Yu Li | Marketing & Sales Specialist": "Yury Li / Yu Li | 市场营销与销售专员",
  "Customer Product Consultation | Yury Li": "客户产品咨询 | Yury Li",
  "Design & Visual Communication | Yury Li": "设计与视觉沟通 | Yury Li",
  "Sales & Marketing Automation | Yury Li": "销售与营销自动化 | Yury Li",
  "Brand & Content Positioning | Yury Li": "品牌与内容定位 | Yury Li"
};
Object.assign(titleTranslations, {
  "Yury Li | AI/Sales/Marketing": "Yury Li | AI/销售/市场营销",
  "Yury Li | Marketing, Sales & AI Workflow Specialist": "Yury Li | 市场、销售与 AI 工作流专员",
  "Retail Technology & Product Consultation | Yury Li": "零售科技与产品咨询 | Yury Li",
  "Sales Follow-up Workflow Prototype | Yury Li": "销售跟进工作流原型 | Yury Li",
  "Brand Communication & Event Execution | Yury Li": "品牌沟通与活动执行 | Yury Li",
  "AI Tools & Workflow Architecture | Yury Li": "AI 工具与工作流架构 | Yury Li",
  "AI Product Presentation Demo | Yury Li": "AI 产品展示 Demo | Yury Li",
  "Agent Prompt System Demo | Yury Li": "Agent 提示词系统 Demo | Yury Li",
  "AI Visual Reverse Engineering Demo | Yury Li": "AI 视觉逆向工程 Demo | Yury Li"
});

let width = 0;
let height = 0;
let dotFieldDots = [];
let dotFieldFrame = 0;
const dotFieldConfig = {
  dotRadius: 2,
  dotSpacing: 22,
  waveAmplitude: 2,
  gradientFrom: "rgba(66, 192, 194, 0.32)",
  gradientTo: "rgba(156, 94, 215, 0.28)"
};
let lastScrollY = window.scrollY;
let parallaxFrame = null;
let directionScrollY = window.scrollY;
let currentScrollDirection = "down";
let trueFocusTimer = null;

function isMobileHeader() {
  return window.matchMedia("(max-width: 780px)").matches;
}

function closeMobileMenu() {
  const menuButton = document.querySelector(".menu-toggle");
  if (!siteHeader || !menuButton) return;

  siteHeader.classList.remove("menu-open");
  siteHeader.querySelectorAll(".nav-demo[open]").forEach((dropdown) => dropdown.removeAttribute("open"));
  menuButton.setAttribute("aria-expanded", "false");
}

function createMobileMenu() {
  if (!siteHeader || !primaryNav || siteHeader.querySelector(".menu-toggle")) return;

  if (!primaryNav.id) primaryNav.id = "primary-navigation";

  const menuButton = document.createElement("button");
  menuButton.className = "menu-toggle";
  menuButton.type = "button";
  menuButton.setAttribute("aria-controls", primaryNav.id);
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Toggle navigation menu");
  menuButton.innerHTML = `
    <span class="menu-toggle-icon" aria-hidden="true"></span>
    <span>Menu</span>
  `;

  siteHeader.insertBefore(menuButton, primaryNav);

  menuButton.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("menu-open");
    siteHeader.classList.remove("is-hidden");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    if (!isOpen) {
      siteHeader.querySelectorAll(".nav-demo[open]").forEach((dropdown) => dropdown.removeAttribute("open"));
    }
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));
}

function normalizeText(text) {
  return text.trim().replace(/\s+/g, " ");
}

function initDecryptedText() {
  if (!decryptedTextItems.length) return;

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+";

  decryptedTextItems.forEach((element) => {
    const text = element.dataset.decryptedText || normalizeText(element.textContent);
    const speed = 50;
    const maxIterations = 16;
    let iteration = 0;

    element.setAttribute("aria-label", text);

    if (motionQuery.matches) {
      element.textContent = text;
      return;
    }

    const interval = setInterval(() => {
      element.textContent = text
        .split("")
        .map((char) => {
          if (char === " ") return " ";
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join("");

      iteration += 1;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        element.textContent = text;
      }
    }, speed);
  });
}

function initExperienceCards() {
  experienceCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-expanded", "false");

    const toggleCard = () => {
      const isOpen = card.classList.toggle("is-open");
      card.setAttribute("aria-expanded", String(isOpen));
    };

    card.addEventListener("click", toggleCard);
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggleCard();
    });
  });
}

function updatePackageContactButton() {
  if (!packageContactButton || !packageContactInfo) return;

  const isOpen = !packageContactInfo.hidden;
  const english = isOpen ? "Hide contact methods" : "Show contact methods";
  packageContactButton.textContent = getCurrentLanguage() === "zh" ? zhTranslations[english] : english;
  packageContactButton.setAttribute("aria-expanded", String(isOpen));
}

function initPackageContact() {
  if (!packageOffer || !packageContactButton || !packageContactInfo) return;

  const togglePackageContact = () => {
    packageContactInfo.hidden = !packageContactInfo.hidden;
    updatePackageContactButton();
  };

  packageContactButton.addEventListener("click", (event) => {
    event.stopPropagation();
    togglePackageContact();
  });

  packageOffer.addEventListener("click", (event) => {
    if (event.target.closest(".package-contact-info")) return;
    togglePackageContact();
  });

  updatePackageContactButton();
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

function renderHeroTitleFocus(language) {
  const title = document.querySelector(".hero-title.true-focus");
  if (!title) return;

  const words = language === "zh"
    ? ["AI", "销售", "市场营销"]
    : ["AI", "Sales", "Marketing"];

  title.setAttribute(
    "aria-label",
    language === "zh" ? "AI 销售 市场营销" : "AI Sales Marketing"
  );
  title.innerHTML = `${words.map((word, index) => (
    `<span class="focus-word${index === 0 ? " active" : ""}">${word}</span>`
  )).join("")}<span class="focus-frame" aria-hidden="true"><span class="corner top-left"></span><span class="corner top-right"></span><span class="corner bottom-left"></span><span class="corner bottom-right"></span></span>`;
}

function applyLanguage(language) {
  const nextLanguage = supportedLanguages.includes(language) ? language : "en";
  localStorage.setItem(LANGUAGE_KEY, nextLanguage);
  document.documentElement.lang = nextLanguage === "zh" ? "zh-Hans" : "en";
  renderHeroTitleFocus(nextLanguage);

  collectTranslatableElements().forEach((element) => {
    if (!element.dataset.i18nEn) {
      element.dataset.i18nEn = normalizeText(element.textContent);
    }

    const english = element.dataset.i18nEn;
    element.textContent = nextLanguage === "zh" && zhTranslations[english]
      ? zhTranslations[english]
      : english;
  });
  updatePackageContactButton();

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

  initTrueFocus();
}

function initLanguageSwitcher() {
  createLanguageSwitcher();
  document.querySelectorAll("[data-lang-button]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.langButton));
  });
  applyLanguage(getSavedLanguage());
}

function setupScrollAnimations() {
  const revealSelectors = [
    ".hero-copy",
    ".hero-panel",
    ".proof-strip article",
    ".section-heading",
    ".profile-card",
    ".education-card",
    ".value-card",
    ".experience-card",
    ".skill-card",
    ".project-card",
    ".contact-section",
    ".detail-back",
    ".detail-copy",
    ".detail-visual",
    ".detail-card",
    ".campaign-feature",
    ".real-photos figure"
  ];
  const revealItems = [...document.querySelectorAll(revealSelectors.join(","))]
    .filter((element, index, list) => list.indexOf(element) === index);

  revealItems.forEach((element, index) => {
    const localIndex = [...(element.parentElement ? element.parentElement.children : [])].indexOf(element);
    const stagger = Math.max(0, localIndex) % 6;
    element.classList.add("scroll-reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(stagger * 78, 390)}ms`);

    if (element.matches(".hero-copy, .detail-copy, .section-heading")) {
      element.classList.add("reveal-soft");
    }

    if (element.matches(".hero-copy, .profile-card, .detail-copy")) {
      element.classList.add("reveal-left");
    }

    if (element.matches(".hero-panel, .education-card, .detail-visual")) {
      element.classList.add("reveal-right");
    }

    if (index < 2) {
      element.style.setProperty("--reveal-delay", "80ms");
    }
  });

  document.querySelectorAll(".hero-panel, .detail-visual, .project-visual, .campaign-flyer").forEach((element, index) => {
    element.dataset.scrollParallax = index % 2 === 0 ? "0.045" : "0.03";
  });

  if (motionQuery.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  revealItems.forEach((element) => updateRevealPositionState(element));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        entry.target.classList.remove("is-above", "is-below");
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "-8% 0px -10% 0px",
    threshold: [0, 0.12, 0.28]
  });

  revealItems.forEach((element) => observer.observe(element));
}

function updateRevealPositionState(element) {
  const rect = element.getBoundingClientRect();
  const isAbove = rect.bottom < window.innerHeight * 0.22;
  const isBelow = rect.top > window.innerHeight * 0.78;

  element.classList.toggle("is-above", isAbove);
  element.classList.toggle("is-below", !isAbove && isBelow);

  if (!isAbove && !isBelow && rect.top < window.innerHeight && rect.bottom > 0) {
    element.classList.add("is-visible");
    element.classList.remove("is-above", "is-below");
  }
}

function updateScrollDirection() {
  const nextScrollY = Math.max(window.scrollY, 0);
  const delta = nextScrollY - directionScrollY;

  if (Math.abs(delta) < 4) return;

  currentScrollDirection = delta > 0 ? "down" : "up";
  document.body.classList.toggle("scrolling-down", currentScrollDirection === "down");
  document.body.classList.toggle("scrolling-up", currentScrollDirection === "up");
  directionScrollY = nextScrollY;

  if (motionQuery.matches) return;

  document.querySelectorAll(".scroll-reveal:not(.is-visible)").forEach((element) => {
    updateRevealPositionState(element);
  });
}

function updateScrollParallax() {
  parallaxFrame = null;

  if (motionQuery.matches) return;

  const viewportCenter = window.innerHeight * 0.5;
  document.querySelectorAll("[data-scroll-parallax]").forEach((element) => {
    const speed = Number(element.dataset.scrollParallax) || 0.035;
    const rect = element.getBoundingClientRect();
    const elementCenter = rect.top + rect.height * 0.5;
    const shift = Math.max(-34, Math.min(34, (viewportCenter - elementCenter) * speed));
    element.style.setProperty("--scroll-shift", `${shift.toFixed(2)}px`);
  });
}

function requestScrollParallaxUpdate() {
  if (parallaxFrame !== null) return;
  parallaxFrame = requestAnimationFrame(updateScrollParallax);
}

function resizeCanvas() {
  if (!canvas || !dotContext) return;

  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  dotContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  buildDotField();
}

function buildDotField() {
  const step = dotFieldConfig.dotRadius + dotFieldConfig.dotSpacing;
  const cols = Math.max(1, Math.floor(width / step));
  const rows = Math.max(1, Math.floor(height / step));
  const padX = (width % step) / 2;
  const padY = (height % step) / 2;
  const dots = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const ax = padX + col * step + step / 2;
      const ay = padY + row * step + step / 2;
      dots.push({ ax, ay, sx: ax, sy: ay });
    }
  }

  dotFieldDots = dots;
}

function drawBackground() {
  if (!dotContext || !width || !height) return;

  dotFieldFrame += 1;
  dotContext.clearRect(0, 0, width, height);

  const gradient = dotContext.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, dotFieldConfig.gradientFrom);
  gradient.addColorStop(1, dotFieldConfig.gradientTo);
  dotContext.fillStyle = gradient;
  dotContext.beginPath();

  const radius = dotFieldConfig.dotRadius / 2;
  const time = dotFieldFrame * 0.02;

  dotFieldDots.forEach((dot) => {
    dot.sx += (dot.ax - dot.sx) * 0.1;
    dot.sy += (dot.ay - dot.sy) * 0.1;

    const drawX = dot.sx + Math.cos(dot.ay * 0.03 + time * 0.7) * dotFieldConfig.waveAmplitude * 0.5;
    const drawY = dot.sy + Math.sin(dot.ax * 0.03 + time) * dotFieldConfig.waveAmplitude;
    dotContext.moveTo(drawX + radius, drawY);
    dotContext.arc(drawX, drawY, radius, 0, Math.PI * 2);
  });

  dotContext.fill();

  if (!motionQuery.matches) {
    requestAnimationFrame(drawBackground);
  }
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

function initLikeButton() {
  if (!likeButton) return;

  const countElement = likeButton.querySelector(".like-count");
  let count = 0;

  try {
    count = Number.parseInt(localStorage.getItem(LIKE_COUNT_KEY) || "0", 10);
  } catch (error) {
    count = 0;
  }

  function renderLike() {
    likeButton.classList.toggle("is-liked", count > 0);
    likeButton.setAttribute("aria-pressed", String(count > 0));
    if (countElement) countElement.textContent = String(count);
  }

  likeButton.addEventListener("click", () => {
    count += 1;

    try {
      localStorage.setItem(LIKE_COUNT_KEY, String(count));
    } catch (error) {
      // Keep the button usable when mobile privacy settings block local storage.
    }

    renderLike();
  });

  renderLike();
}

function initTrueFocus() {
  const focusContainer = document.querySelector(".true-focus");
  if (!focusContainer) return;

  const words = [...focusContainer.querySelectorAll(".focus-word")];
  if (!words.length) return;
  if (trueFocusTimer !== null) {
    window.clearInterval(trueFocusTimer);
  }

  let activeIndex = 0;

  function updateFocusFrame() {
    const activeWord = words[activeIndex];
    const parentRect = focusContainer.getBoundingClientRect();
    const activeRect = activeWord.getBoundingClientRect();

    focusContainer.style.setProperty("--focus-x", `${activeRect.left - parentRect.left}px`);
    focusContainer.style.setProperty("--focus-y", `${activeRect.top - parentRect.top}px`);
    focusContainer.style.setProperty("--focus-width", `${activeRect.width}px`);
    focusContainer.style.setProperty("--focus-height", `${activeRect.height}px`);

    words.forEach((word, index) => {
      word.classList.toggle("active", index === activeIndex);
    });
  }

  updateFocusFrame();

  trueFocusTimer = window.setInterval(() => {
    activeIndex = (activeIndex + 1) % words.length;
    updateFocusFrame();
  }, 1500);

  window.addEventListener("resize", updateFocusFrame);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateFocusFrame);
  }
}

function initImageLightbox() {
  const page = document.querySelector(".visual-method-page");
  if (!page) return;

  const sourceImages = [...page.querySelectorAll("main img[data-full-src]")];
  if (!sourceImages.length) return;

  const dialog = document.createElement("dialog");
  dialog.className = "image-lightbox";
  dialog.setAttribute("aria-label", "4K image viewer");
  dialog.innerHTML = `
    <div class="image-lightbox-toolbar">
      <button type="button" data-lightbox-action="minus" aria-label="Zoom out">−</button>
      <span data-lightbox-scale>100%</span>
      <button type="button" data-lightbox-action="plus" aria-label="Zoom in">+</button>
      <button type="button" data-lightbox-action="fit" aria-label="Fit image">↔</button>
      <button type="button" data-lightbox-action="close" aria-label="Close image viewer">×</button>
    </div>
    <div class="image-lightbox-viewport">
      <img alt="">
    </div>
  `;
  document.body.append(dialog);

  const fullImage = dialog.querySelector("img");
  const viewport = dialog.querySelector(".image-lightbox-viewport");
  const scaleLabel = dialog.querySelector("[data-lightbox-scale]");
  let scale = 1;

  const applyScale = () => {
    fullImage.style.width = `min(${92 * scale}vw, ${1800 * scale}px)`;
    scaleLabel.textContent = `${Math.round(scale * 100)}%`;
  };

  const closeViewer = () => {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    fullImage.removeAttribute("src");
  };

  const openViewer = (sourceImage) => {
    scale = 1;
    fullImage.src = sourceImage.dataset.fullSrc;
    fullImage.alt = sourceImage.alt;
    applyScale();
    viewport.scrollTo(0, 0);
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  };

  sourceImages.forEach((sourceImage) => {
    sourceImage.classList.add("zoomable-image");
    sourceImage.tabIndex = 0;
    sourceImage.setAttribute("role", "button");
    sourceImage.setAttribute("aria-label", `${sourceImage.alt}. Open 4K image viewer.`);
    sourceImage.addEventListener("click", () => openViewer(sourceImage));
    sourceImage.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openViewer(sourceImage);
    });
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeViewer();
  });
  dialog.addEventListener("close", () => fullImage.removeAttribute("src"));

  dialog.querySelector("[data-lightbox-action='close']").addEventListener("click", closeViewer);
  dialog.querySelector("[data-lightbox-action='minus']").addEventListener("click", () => {
    scale = Math.max(0.6, scale - 0.2);
    applyScale();
  });
  dialog.querySelector("[data-lightbox-action='plus']").addEventListener("click", () => {
    scale = Math.min(2, scale + 0.2);
    applyScale();
  });
  dialog.querySelector("[data-lightbox-action='fit']").addEventListener("click", () => {
    scale = 1;
    applyScale();
    viewport.scrollTo(0, 0);
  });
}

function initMobileFolds() {
  const folds = [...document.querySelectorAll(".visual-method-page .mobile-fold")];
  if (!folds.length) return;

  const mobileQuery = window.matchMedia("(max-width: 780px)");
  const syncFolds = () => {
    folds.forEach((fold) => {
      fold.open = !mobileQuery.matches;
    });
  };

  syncFolds();
  mobileQuery.addEventListener("change", syncFolds);
}

function updateMobileHeaderVisibility() {
  if (!siteHeader) return;

  const currentScrollY = Math.max(window.scrollY, 0);

  if (!isMobileHeader()) {
    closeMobileMenu();
  }

  if (siteHeader.classList.contains("menu-open")) {
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
  if (event.key === "Escape") {
    closeLightbox();
    closeMobileMenu();
  }
});

window.addEventListener("resize", () => {
  resizeCanvas();
  updateMobileHeaderVisibility();
  requestScrollParallaxUpdate();
});
window.addEventListener("scroll", () => {
  updateScrollDirection();
  updateActiveNav();
  updateBackToTop();
  updateMobileHeaderVisibility();
  requestScrollParallaxUpdate();
}, { passive: true });
createMobileMenu();
initLanguageSwitcher();
initDecryptedText();
initExperienceCards();
initPackageContact();
initLikeButton();
initTrueFocus();
initImageLightbox();
initMobileFolds();
document.body.classList.add("scrolling-down");
setupScrollAnimations();
resizeCanvas();
updateActiveNav();
updateBackToTop();
updateMobileHeaderVisibility();
requestScrollParallaxUpdate();
drawBackground();
