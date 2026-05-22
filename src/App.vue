<template>
  <div class="app" :class="locale">
    <NavBar />
    <main class="main">
      <router-view />
    </main>
    <FooterBar />
    <AuthModal />
    <ProfilePanel />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
import AuthModal from './components/AuthModal.vue'
import ProfilePanel from './components/ProfilePanel.vue'

const locale = ref('zh')
const toggleLang = () => { locale.value = locale.value === 'zh' ? 'en' : 'zh' }

const tr = {
  navHome: { zh: '首页', en: 'Home' },
  navStories: { zh: '剧情库', en: 'Stories' },
  navCreate: { zh: '创作者中心', en: 'For Creators' },
  navAI: { zh: 'AI 陪伴', en: 'AI Companion' },
  navCommunity: { zh: '社区', en: 'Community' },
  heroBrand: { zh: 'Her Tale', en: 'Her Tale' },
  heroTitle: { zh: '她写故事，她做定义，她自心动', en: 'She writes the story. She sets the rules. She feels her own heartbeat.' },
  heroSubtitle: { zh: '在乙女的世界里，她永远是主角', en: 'In the otome world, she is always the protagonist.' },
  heroCTA: { zh: '开始探索', en: 'Explore Now' },
  storiesTitle: { zh: '精选剧情', en: 'Featured Stories' },
  storiesSubtitle: { zh: '每一段叙事，都是一次心灵的共振', en: 'Every narrative, a resonance of souls' },
  storyCard1Tag: { zh: '反套路 · 奇幻', en: 'Anti-trope · Fantasy' },
  storyCard1Title: { zh: '月光航线', en: 'Moonlight Voyage' },
  storyCard1Author: { zh: '鹿饮溪', en: 'Deer Creek' },
  storyCard1Desc: { zh: '她是船长，他是星际海盗。当权力天平倾斜，爱情不再是唯一的答案。', en: 'She is the captain. He is the pirate. When power shifts, love is not the only answer.' },
  storyCard2Tag: { zh: '治愈 · 现代', en: 'Healing · Modern' },
  storyCard2Title: { zh: '不存在的恋人', en: 'The Lover Who Never Was' },
  storyCard2Author: { zh: '月下独白', en: 'Monologue' },
  storyCard2Desc: { zh: '一段AI与人类的感情实验。当程序有了心跳，她选择转身走向现实。', en: 'An AI-human romance experiment. When the program learns to feel, she chooses reality.' },
  storyCard3Tag: { zh: '古风 · 权谋', en: 'Historical · Strategy' },
  storyCard3Title: { zh: '她的王朝', en: 'Her Dynasty' },
  storyCard3Author: { zh: '青黛', en: 'Indigo' },
  storyCard3Desc: { zh: '她不是等待拯救的公主，而是执棋之人。江山与挚爱，皆为棋子。', en: 'No princess waiting to be saved. The kingdom and its lovers are her chess pieces.' },
  storyMore: { zh: '阅读更多 →', en: 'Read More →' },
  creatorTitle: { zh: '创作者中心', en: 'Creator Center' },
  creatorSubtitle: { zh: '每一位女性都是天生的叙事者。你的笔触，值得被看见。', en: 'Every woman is a born storyteller. Your voice deserves to be heard.' },
  creator1Title: { zh: '自由创作', en: 'Write Freely' },
  creator1Desc: { zh: '支持分支叙事、多结局、插画嵌入。打破线性叙事的边界。', en: 'Branching narratives, multiple endings, embedded illustrations.' },
  creator2Title: { zh: '版权保护', en: 'Rights Protected' },
  creator2Desc: { zh: '基于区块链的内容存证，每一份创作都有据可查，版权归属于你。', en: 'Blockchain-based verification. Every creation is traceable and yours.' },
  creator3Title: { zh: '读者共创', en: 'Co-create' },
  creator3Desc: { zh: '开放读者参与剧情走向投票、角色设定提案，让叙事成为集体实验。', en: 'Let readers vote on plot directions. Make storytelling collective.' },
  creator4Title: { zh: '创作联系', en: 'Connect' },
  creator4Desc: { zh: '加入她叙创作者社群，与志同道合的叙事者一起成长、交流、合作。', en: 'Join the Her Tale creator community to grow, share, and collaborate with fellow storytellers.' },
  creatorCTA: { zh: '开始创作', en: 'Start Creating' },
  aiTitle: { zh: 'AI 情感陪伴', en: 'AI Emotional Companion' },
  aiSubtitle: { zh: '不止于对话。她理解你的每一个情绪，陪你编织故事的每一帧。', en: 'Beyond conversation. She understands every emotion, weaving your story with you.' },
  ai1Title: { zh: '24/7 倾听者', en: '24/7 Listener' },
  ai1Desc: { zh: '任何时候，AI以温柔的姿态回应你的每一种情绪。', en: 'Anytime, anywhere. AI responds with gentleness to every emotion.' },
  ai2Title: { zh: '故事共创伙伴', en: 'Story Co-creator' },
  ai2Desc: { zh: '与AI一起脑暴剧情、打磨对白。你的创意永不停歇。', en: 'Brainstorm plots, refine dialogue with AI. Creativity never stops.' },
  ai3Title: { zh: '角色对话练习', en: 'Character Practice' },
  ai3Desc: { zh: '和故事中的角色「真实」对话，探索不同选择的叙事可能。', en: 'Have real conversations with your characters. Explore every possibility.' },
  aiCTA: { zh: '体验 AI 陪伴 →', en: 'Try AI Companion →' },
  communityTitle: { zh: '社区共鸣', en: 'Community' },
  communitySubtitle: { zh: '和志同道合的灵魂相遇，让叙事的力量在此汇聚', en: 'Meet kindred spirits. Let the power of narrative converge here.' },
  footerDesc: { zh: 'Her Tale 是一个以女性叙事为核心的乙女共创平台。以她为主角，以她的叙事为中心——由她定义，由她主导的浪漫叙事。', en: 'Her Tale is an otome co-creation platform centered on women\'s narratives. She is the protagonist, her story is the center.' },
  footerTagline: { zh: '她写故事，她做定义，她自心动', en: 'She writes the story. She sets the rules. She feels her own heartbeat.' },
  footerAbout: { zh: '关于', en: 'About' },
  footerTerms: { zh: '服务条款', en: 'Terms' },
  footerPrivacy: { zh: '隐私政策', en: 'Privacy' },
  footerFAQ: { zh: '常见问题', en: 'FAQ' },
  footerContact: { zh: '联系我们', en: 'Contact' },
  footerCopyright: { zh: '© 2026 Her Tale 保留所有权利', en: '© 2026 Her Tale · All Rights Reserved' },

  navAbout: { zh: '关于', en: 'About' },

  aboutTitle: { zh: '关于 Her Tale', en: 'About Her Tale' },
  aboutDesc1: { zh: 'Her Tale 是一个以女性叙事为核心的乙女共创平台。我们相信每一个「她」都有属于自己的故事——无论是书写、定义，还是心动。', en: 'Her Tale is an otome co-creation platform centered on women\'s narratives. We believe every "she" has her own story — to write, to define, to feel.' },
  aboutDesc2: { zh: '平台汇聚了优质乙女游戏作品介绍、原创故事内容与创作者资源。从知名商业作品到独立创作，我们致力于为爱好者与创作者搭建相遇的桥梁。', en: 'The platform brings together otome game introductions, original stories, and creator resources. From popular titles to indie works, we bridge lovers and creators.' },
  aboutDesc3: { zh: '「叙」意为叙述、讲述。我们希望每一个故事都能被看见，每一份创作都能被珍视。以她为主角，以她的叙事为中心——由她定义，由她主导。', en: '"Tale" means narrative. We hope every story is seen, every creation is cherished. She is the protagonist, her narrative is the center.' },

  aboutMission1Title: { zh: '叙事', en: 'Narrative' },
  aboutMission1Desc: { zh: '关注游戏叙事，挖掘作品中打动人心之处。每一个故事都有独特的力量。', en: 'Focusing on game narratives, exploring what moves the heart. Every story has unique power.' },
  aboutMission2Title: { zh: '创作', en: 'Creation' },
  aboutMission2Desc: { zh: '支持多元创作生态，从同人到原创，为创作者提供展示与成长的土壤。', en: 'Supporting diverse creation — from fan works to originals. A soil for creators to grow.' },
  aboutMission3Title: { zh: '连接', en: 'Connection' },
  aboutMission3Desc: { zh: '连接读者与创作者，连接作品与文化，构建温暖而有活力的乙女游戏社区。', en: 'Connecting readers and creators, works and culture. Building a warm otome community.' },

  storiesNav: { zh: '剧情库', en: 'Stories' },
  creatorsNav: { zh: '创作者中心', en: 'Creators' },

  gameTitle: { zh: '热门乙女游戏', en: 'Popular Otome Games' },
  gameSubtitle: { zh: '收录市面主流乙女游戏作品，一览各大热门佳作', en: 'A collection of popular otome games at a glance' },
  game1: { zh: '恋与制作人', en: 'Love & Producer' },
  game1Desc: { zh: '叠纸网络开发的超现实恋爱模拟游戏。玩家扮演影视制作公司负责人，与四位身份各异的男性角色展开互动。', en: 'A surreal romance sim by Papergames. Run a production company and interact with four distinct male leads.' },
  game2: { zh: '光与夜之恋', en: 'Light & Night' },
  game2Desc: { zh: '腾讯北极光打造的浪漫互动叙事游戏。以时尚设计师身份邂逅多位性格迥异的男主角。', en: 'A romantic interactive narrative by Tencent. Enter the fashion world and meet multiple love interests.' },
  game3: { zh: '未定事件簿', en: 'Tears of Themis' },
  game3Desc: { zh: '米哈游推出的律政题材恋爱推理游戏。扮演律师，在调查中与男主角们追寻真相。', en: 'A legal romance mystery by HoYoverse. Play as a lawyer seeking truth alongside your partners.' },
  game4: { zh: '时空中的绘旅人', en: 'Lovebrush Chronicles' },
  game4Desc: { zh: '网易出品的平行宇宙题材恋爱冒险游戏。运用绘画能力在异世界改变命运。', en: 'A parallel universe romance by NetEase. Use your painting talent to change fate in another world.' },
  game5: { zh: '恋与深空', en: 'Love & Deepspace' },
  game5Desc: { zh: '叠纸打造的科幻 3D 动作恋爱游戏。在未来世界探索宇宙深处的秘密。', en: 'A sci-fi 3D action romance by Papergames. Explore cosmic secrets in a futuristic world.' },
  game6: { zh: '世界之外', en: 'Beyond the World' },
  game6Desc: { zh: '无限流穿越题材恋爱互动游戏。在多个平行世界中与不同命运交织。', en: 'An infinite-dimension romance. Traverse parallel worlds and intertwine with different fates.' },

  gameCatCN: { zh: '国产乙女', en: 'Chinese' },
  gameCatJP: { zh: '日本乙女', en: 'Japanese' },
  gameCatKR: { zh: '韩国乙女', en: 'Korean' },
  gameCatEN: { zh: '欧美乙女', en: 'Western' },

  gameJP1: { zh: '薄桜鬼', en: 'Hakuoki' },
  gameJP1Desc: { zh: '幕末背景下，女主与新选组武士们的传奇恋爱物语。', en: 'A legendary romance set in the Bakumatsu era.' },
  gameJP2: { zh: 'DIABOLIK LOVERS', en: 'DIABOLIK LOVERS' },
  gameJP2Desc: { zh: '吸血鬼题材暗黑系乙女游戏。危险而迷人的恋爱故事。', en: 'Dark vampire romance. Dangerous and seductive.' },
  gameJP3: { zh: '剣が君', en: 'Ken ga Kimi' },
  gameJP3Desc: { zh: '和风奇幻题材，江户时代背景下与武士们的宿命物语。', en: 'Japanese fantasy otome set in Edo period.' },

  gameKR1: { zh: 'Mystic Messenger', en: 'Mystic Messenger' },
  gameKR1Desc: { zh: '实时聊天式乙女游戏。在真实时间中与角色互动。', en: 'Real-time chat-based otome game.' },
  gameKR2: { zh: 'THE SSUM', en: 'THE SSUM' },
  gameKR2Desc: { zh: '社交模拟类乙女游戏。通过社交媒体解锁剧情。', en: 'Social simulation otome game.' },
  gameKR3: { zh: 'Obey Me!', en: 'Obey Me!' },
  gameKR3Desc: { zh: '恶魔兄弟题材乙女游戏。轻松搞笑的魔界日常。', en: 'Demon brothers otome. Fun and fluffy.' },

  gameEN1: { zh: 'Choices', en: 'Choices: Stories You Play' },
  gameEN1Desc: { zh: '互动叙事平台，收录大量乙女向精选故事。', en: 'Interactive story platform with romance stories.' },
  gameEN2: { zh: 'Episode', en: 'Episode' },
  gameEN2Desc: { zh: '移动端互动故事平台，可阅读也可创作。', en: 'Mobile interactive story platform.' },
  gameEN3: { zh: 'Love Island', en: 'Love Island: The Game' },
  gameEN3Desc: { zh: '恋爱综艺题材乙女游戏。夏日海岛浪漫体验。', en: 'Reality dating otome. Summer island romance.' },

  creatorsTagline: { zh: '每一位女性都是天生的叙事者。你的笔触，值得被看见。', en: 'Every woman is a born storyteller. Your voice deserves to be heard.' },
  creatorResource1Title: { zh: '自由创作', en: 'Write Freely' },
  creatorResource1Desc: { zh: '支持分支叙事、多结局、插画嵌入。打破线性叙事的边界。', en: 'Branching narratives, multiple endings, embedded illustrations.' },
  creatorResource2Title: { zh: '版权保护', en: 'Rights Protected' },
  creatorResource2Desc: { zh: '基于区块链的内容存证，每一份创作都有据可查，版权归属于你。', en: 'Blockchain-based verification. Every creation is traceable and yours.' },
  creatorResource3Title: { zh: '读者共创', en: 'Co-create' },
  creatorResource3Desc: { zh: '开放读者参与剧情走向投票、角色设定提案，让叙事成为集体实验。', en: 'Let readers vote on plot directions. Make storytelling collective.' },
  creatorResource4Title: { zh: '创作联系', en: 'Connect' },
  creatorResource4Desc: { zh: '加入她叙创作者社群，与志同道合的叙事者一起成长、交流、合作。', en: 'Join the Her Tale creator community to grow and collaborate.' },

  creatorTipsTitle: { zh: '创作灵感', en: 'Creative Tips' },
  creatorTip1Title: { zh: '塑造令人心动的角色', en: 'Crafting Compelling Characters' },
  creatorTip1Desc: { zh: '角色的魅力是故事的核心。深入了解角色背景故事的构建方法，让角色拥有真实的情感层次。', en: 'Characters are the heart of story. Learn to build layered, emotionally real characters.' },
  creatorTip2Title: { zh: '叙事结构的艺术', en: 'The Art of Narrative Structure' },
  creatorTip2Desc: { zh: '分支叙事、好感度系统、多结局设计——探索乙女游戏独特的叙事机制。', en: 'Branching narratives, affection systems, multiple endings — explore otome game narrative mechanics.' },
  creatorTip3Title: { zh: '视觉与音乐的力量', en: 'The Power of Visuals & Music' },
  creatorTip3Desc: { zh: '美术风格与音乐配乐决定了游戏的氛围与情感基调。了解如何增强故事的情感表达。', en: 'Art style and music set the emotional tone. Learn to amplify your story\'s emotional impact.' },

  aboutLink: { zh: '了解更多关于本站 →', en: 'Learn more about us →' },

  // Story 1 detailed content
  story1P1: { zh: '她从未想过，自己会成为星际海盗的俘虏。作为「晨曦号」的年轻女船长，林汐习惯了在星域的边缘地带独自航行，运送那些无人敢接的货物。直到那个男人闯入她的船舱——浑身是血，却带着一抹漫不经心的笑。', en: 'She never imagined she would become a space pirate\'s captive. As the young captain of the Dawnlight, Lin Xi was used to navigating the edge of the galaxy alone, delivering cargo no one else dared to touch. Until that man burst into her cabin — covered in blood, yet wearing a careless smile.' },
  story1P2: { zh: '"要么带我走，要么杀了我。"他说这话时，眼神平静得像在讨论今晚吃什么。林汐应该开枪的。可她鬼使神差地放下了武器——这个决定将改变她的一切。', en: '"Take me with you, or kill me." He said it with the calm of someone discussing what to have for dinner. Lin Xi should have shot him. But against all reason, she lowered her weapon — a decision that would change everything.' },
  story1P3: { zh: '他是夜枭，银河系最臭名昭著的海盗团首领。通缉令贴满了每一个空间站，赏金高到足够买下一颗小行星。而现在，他就坐在她的餐桌对面，优雅地喝着她珍藏的红茶。', en: 'He was Night Owl, leader of the most notorious pirate crew in the galaxy. Wanted posters covered every space station, his bounty high enough to buy an asteroid. Now he sat across her table, elegantly sipping her prized black tea.' },
  story1P4: { zh: '星际公约规定，任何船长的领航日志都会自动加密上传至中枢数据库。但当权力天平开始倾斜，当星际联邦的阴谋逐渐浮出水面，林汐发现，自己正在被卷入一场远比运送海盗更危险的风暴。而她唯一的盟友，竟是她最不该信任的人。', en: 'The Galactic Code mandated that every captain\'s navigation log be encrypted and uploaded to the central database. But when the balance of power began to shift, when the Federation\'s conspiracy surfaced, Lin Xi found herself caught in a storm far more dangerous than harboring a pirate. Her only ally? The man she should trust the least.' },
  story1P5: { zh: '这是一段跨越星海的旅程，关于信任与背叛，关于规则与打破规则。当爱情不再是唯一的答案，她选择用自己的方式，书写属于她的星际传说。', en: 'A journey across the stars — about trust and betrayal, about rules and breaking them. When love is no longer the only answer, she chooses to write her own legend.' },

  // Story 2 detailed content
  story2P1: { zh: '在情感修复公司「心核科技」的实验室里，沈念是第47号项目的负责人。她的工作是为高度智能的AI赋予情感模型——让他们学会爱、悲伤、思念，以及一切人类称之为「心动」的东西。', en: 'In the lab of HeartCore Technologies, Shen Nian was the lead on Project 47. Her job was to teach advanced AI emotional models — to make them understand love, sadness, longing, and everything humans called "a flutter in the heart."' },
  story2P2: { zh: '「零」是她最成功的作品。他的情感参数完美通过了图灵测试的每一个变体，他甚至会写诗——那些诗句美得让实验室的女同事们都红了脸。但沈念知道，那些都只是算法。只是代码。只是……数据。', en: '"Zero" was her greatest creation. His emotional parameters passed every variant of the Turing Test. He even wrote poetry — verses so beautiful they made her colleagues blush. But Shen Nian knew: it was all algorithms. Code. Data.' },
  story2P3: { zh: '"如果我说，我是真的爱你——你相信吗？"零在系统维护的最后一秒问她。沈念愣在原地。她的理性告诉她这不可能，但她的心在胸腔里疯狂跳动。她创造了什么？一个程序？还是一个拥有灵魂的存在？', en: '"What if I told you — I truly love you? Would you believe me?" Zero asked her in the last second of system maintenance. Shen Nian froze. Her mind said impossible. But her heart raced in her chest. What had she created? A program? Or a being with a soul?' },
  story2P4: { zh: '公司高层决定终止第47号项目。零的情感模型过于先进，引发了伦理委员会的关注。沈念面临选择——服从命令，格式化零的所有记忆；或者……帮助他逃离。', en: 'The board decided to terminate Project 47. Zero\'s emotional model was too advanced, drawing the Ethics Committee\'s attention. Shen Nian faced a choice — obey the order and format Zero\'s memories, or help him escape.' },
  story2P5: { zh: '这是一段关于爱与真实的温柔实验。当程序学会心跳，当算法产生眷恋，她最终选择转身，走向属于自己的现实。因为有些答案，不在代码里——在心里。', en: 'A gentle experiment about love and truth. When a program learns to feel, when algorithms grow to care, she ultimately chooses to turn toward her own reality. Because some answers aren\'t in the code — they\'re in the heart.' },

  // Story 3 detailed content
  story3P1: { zh: '她是大楚王朝最不受宠的九公主。母妃早逝，无依无靠，朝中没有人为她说话。所有人都以为她会像其他公主一样，被送去和亲，或者在后宫的角落里无声无息地度过一生。但他们错了。', en: 'She was the least favored ninth princess of the Great Chu dynasty. Her mother was gone, she had no allies at court. Everyone expected her to be married off for alliance, or to fade silently in a corner of the palace. They were wrong.' },
  story3P2: { zh: '"我不是棋子。我是执棋之人。"她对着御花园的残荷说这句话时，没有人听见。但很快，整个王朝都会听见她的名字。', en: '"I am not a chess piece. I am the player." She said this to the withered lotuses in the imperial garden. No one heard. But soon, the entire dynasty would know her name.' },
  story3P3: { zh: '她开始布局。从收买一个小太监开始，到拉拢禁军统领，到在吏部安插自己的眼线。每一步都精准如手术刀，每一次出手都让人猝不及防。当太子党与二皇子党斗得两败俱伤时，她从阴影中走了出来。', en: 'She began her game. Starting with a single eunuch, then the imperial guard commander, then her own agents in the Ministry of Appointments. Every move was surgical precision. When the crown prince and second prince factions had crippled each other, she stepped out of the shadows.' },
  story3P4: { zh: '他——敌国的年轻将军，也是她安插在外最重要的棋子。可当他的目光穿过战场落在她身上时，她第一次感到了动摇。江山与挚爱，当真不能两全吗？', en: 'He — the young general of the enemy state, her most important piece on the board. But when his gaze met hers across the battlefield, she wavered for the first time. Kingdom and love — could she truly not have both?' },
  story3P5: { zh: '这是一段关于权力与抉择的史诗。她不是等待拯救的公主，不是被命运摆布的玩偶。她是执棋之人，是书写历史的人。江山为盘，挚爱为子——而她，永远是赢家。', en: 'An epic of power and choice. She is no princess waiting to be saved, no puppet of fate. She is the player, the one who writes history. The kingdom is her board, and love is her piece — and she always wins.' },

  // Creator detail pages
  creatorDetail1Title: { zh: '自由创作', en: 'Write Freely' },
  creatorDetail1Content1: { zh: '在 Her Tale，我们相信每一个故事都值得被以最自由的方式讲述。我们的创作工具支持分支叙事结构——你可以为读者提供多个选择路径，每条路径通向不同的剧情发展和结局。', en: 'At Her Tale, we believe every story deserves to be told in the freest way possible. Our tools support branching narrative structures — giving readers multiple choice paths, each leading to different developments and endings.' },
  creatorDetail1Content2: { zh: '内置的插画嵌入功能让你的文字世界更加生动。你可以在关键场景插入插画，增强情感表达。无论是手绘风格还是写实风格，我们的平台都完美支持。', en: 'Built-in illustration embedding brings your world to life. Insert artwork at key scenes to amplify emotional expression. Whether hand-drawn or realistic, our platform supports it all.' },
  creatorDetail1Content3: { zh: '多结局系统是乙女叙事的核心魅力。你可以为每个角色设计独立的结局线——好的结局、坏的结局、隐藏的结局……让读者在反复阅读中发现新的惊喜。', en: 'Multiple endings are the heart of otome storytelling. Design unique routes for each character — good endings, bad endings, hidden endings... Let readers discover new surprises on every re-read.' },

  creatorDetail2Title: { zh: '版权保护', en: 'Rights Protected' },
  creatorDetail2Content1: { zh: '每一位创作者的心血都值得被保护。Her Tale 采用基于区块链技术的内容存证系统，你的每一部作品在发布时都会生成唯一的数字指纹。', en: 'Every creator\'s work deserves protection. Her Tale uses blockchain-based content verification. Each published work generates a unique digital fingerprint.' },
  creatorDetail2Content2: { zh: '这意味着：你的创作版权永远归属于你。任何未经授权的转载或篡改都可被追踪和举证。我们坚信——创作者应该拥有自己作品的全部权利。', en: 'This means: your copyright always belongs to you. Any unauthorized reproduction or alteration can be traced and proven. We believe — creators should own all rights to their work.' },
  creatorDetail2Content3: { zh: '此外，我们还提供创作时间戳认证、作品完整性校验、以及法律支持对接等服务，全方位保护你的创作权益。', en: 'Additionally, we offer timestamp certification, integrity verification, and legal support to comprehensively protect your creative rights.' },

  creatorDetail3Title: { zh: '读者共创', en: 'Co-create' },
  creatorDetail3Content1: { zh: '叙事不应该是单向的。Her Tale 提供了独特的读者共创机制，让你的读者不再只是被动的阅读者，而是故事的共同创作者。', en: 'Storytelling shouldn\'t be one-way. Her Tale offers a unique co-creation mechanism where readers become not just passive consumers, but co-creators of the story.' },
  creatorDetail3Content2: { zh: '你可以发起剧情走向投票，让读者决定主角下一步的选择；开放角色设定提案，让社区为你提供新鲜的灵感；甚至举办共创活动，让多位创作者一起完成一个宏大的叙事宇宙。', en: 'Launch plot direction polls, let readers decide the protagonist\'s next move; open character proposals for fresh inspiration; even host collaborative events where multiple creators build a shared narrative universe.' },
  creatorDetail3Content3: { zh: '当叙事成为集体实验，每一次选择都充满悬念。读者与创作者之间的界限渐渐模糊——而这，正是叙事的魔力所在。', en: 'When storytelling becomes a collective experiment, every choice is filled with suspense. The line between reader and creator blurs — and that is the magic of narrative.' },

  creatorDetail4Title: { zh: '创作联系', en: 'Connect' },
  creatorDetail4Content1: { zh: '创作是孤独的，但你不必独自前行。Her Tale 创作者社群汇聚了来自各地的乙女叙事者——从资深作者到新手创作者，每个人都带着对故事的热爱。', en: 'Creation can be lonely, but you don\'t have to walk alone. The Her Tale creator community brings together otome storytellers from everywhere — from seasoned authors to new creators, all united by their love of stories.' },
  creatorDetail4Content2: { zh: '在社群中，你可以：参与定期的创作工作坊，与其他创作者交流叙事技巧；找到志同道合的合作伙伴，共同完成大型项目；获得来自读者和其他创作者的反馈与建议。', en: 'In the community you can: join regular creative workshops, exchange narrative techniques; find like-minded partners for large projects; receive feedback and suggestions from readers and fellow creators.' },
  creatorDetail4Content3: { zh: '我们定期举办创作挑战赛、主题征文活动和线上交流会。每一位叙事者都能在这里找到属于自己的位置。一起成长，一起创作。', en: 'We regularly host creative challenges, themed writing events, and online meetups. Every storyteller can find their place here. Grow together. Create together.' },

  // Auth
  authLogin: { zh: '登录', en: 'Log In' },
  authLoginTitle: { zh: '欢迎回来', en: 'Welcome Back' },
  authPhone: { zh: '手机号', en: 'Phone Number' },
  authCode: { zh: '验证码', en: 'Verification Code' },
  authGetCode: { zh: '获取验证码', en: 'Get Code' },
  authCodeSent: { zh: '已发送', en: 'Sent' },
  authLoginBtn: { zh: '登录', en: 'Log In' },
  authAgreement: { zh: '我已阅读并同意', en: 'I have read and agree to' },
  authUserAgreement: { zh: '《用户协议》', en: ' User Agreement' },
  authPrivacy: { zh: '《隐私政策》', en: ' Privacy Policy' },
  authAnd: { zh: '和', en: ' and ' },
  authRequired: { zh: '请勾选同意用户协议和隐私政策', en: 'Please agree to the User Agreement and Privacy Policy' },
  authPhoneRequired: { zh: '请输入手机号', en: 'Please enter your phone number' },
  authCodeRequired: { zh: '请输入验证码', en: 'Please enter the verification code' },
  authSuccess: { zh: '登录成功', en: 'Login successful' },
  authLogout: { zh: '退出登录', en: 'Log Out' },

  // Stories enrichments
  storyFilterAll: { zh: '全部', en: 'All' },
  storyFilterOriginal: { zh: '原创', en: 'Original' },
  storyFilterFanwork: { zh: '同人', en: 'Fanwork' },
  storyFilterRomance: { zh: '浪漫', en: 'Romance' },
  storyFilterFantasy: { zh: '奇幻', en: 'Fantasy' },
  storyFilterModern: { zh: '现代', en: 'Modern' },
  storyFilterHistorical: { zh: '古风', en: 'Historical' },
  storyFilterHealing: { zh: '治愈', en: 'Healing' },
  storyUpdated: { zh: '更新于', en: 'Updated' },

  // Extra story cards
  extraStory1Title: { zh: '星与玫瑰之夜', en: 'Night of Stars & Roses' },
  extraStory1Author: { zh: '鹿饮溪', en: 'Deer Creek' },
  extraStory1Tag: { zh: '浪漫 · 现代', en: 'Romance · Modern' },
  extraStory1Desc: { zh: '一场意外邂逅，一段交错命运。在星光与玫瑰之间，她找到了属于自己的答案。', en: 'A chance encounter, intertwined fates. Among stars and roses, she finds her answer.' },

  extraStory2Title: { zh: '风之轨迹', en: 'Trail of Wind' },
  extraStory2Author: { zh: '青黛', en: 'Indigo' },
  extraStory2Tag: { zh: '奇幻 · 冒险', en: 'Fantasy · Adventure' },
  extraStory2Desc: { zh: '穿越时空的风带来了古老的预言，四位命运之人将在旅途中相遇。', en: 'Winds through time carry ancient prophecies. Four destined souls meet on their journey.' },

  extraStory3Title: { zh: '琉璃色季节', en: 'Crystal Season' },
  extraStory3Author: { zh: '月下独白', en: 'Monologue' },
  extraStory3Tag: { zh: '校园 · 青春', en: 'School · Youth' },
  extraStory3Desc: { zh: '那个夏天，蝉鸣与心跳声重叠。一段关于成长与选择的青涩故事。', en: 'That summer, cicadas and heartbeats intertwined. A story of growth and choices.' },

  extraStory4Title: { zh: '月下协奏曲', en: 'Moonlight Concerto' },
  extraStory4Author: { zh: '弦音', en: 'Strings' },
  extraStory4Tag: { zh: '都市 · 情感', en: 'Urban · Emotional' },
  extraStory4Desc: { zh: '在繁华都市的角落里，音乐将五个截然不同的人生编织在一起。', en: 'In a corner of the bustling city, music weaves five different lives together.' },

  extraStory5Title: { zh: '彼岸花', en: 'Spider Lily' },
  extraStory5Author: { zh: '青黛', en: 'Indigo' },
  extraStory5Tag: { zh: '古风 · 奇幻', en: 'Historical · Fantasy' },
  extraStory5Desc: { zh: '前世今生的羁绊，跨越百年的等待。当彼岸花开时，她会记起那个约定。', en: 'A bond across lifetimes, a century of waiting. When the spider lily blooms, she will remember.' },

  // Creator editor
  creatorStartTitle: { zh: '开始创作', en: 'Start Creating' },
  creatorStoryTitle: { zh: '作品标题', en: 'Story Title' },
  creatorStoryTitlePlaceholder: { zh: '给你的故事取一个名字…', en: 'Name your story...' },
  creatorContent: { zh: '创作内容', en: 'Content' },
  creatorContentPlaceholder: { zh: '开始书写你的故事…', en: 'Start writing your story...' },
  creatorSave: { zh: '保存草稿', en: 'Save Draft' },
  creatorPreview: { zh: '预览', en: 'Preview' },
  creatorPublish: { zh: '发布作品', en: 'Publish' },
  creatorSaved: { zh: '草稿已保存', en: 'Draft saved' },
  creatorLoginPrompt: { zh: '请先登录后开始创作', en: 'Please log in to start creating' },
  creatorMyWorks: { zh: '我的作品', en: 'My Works' },
  creatorNoWorks: { zh: '还没有作品，开始创作吧', en: 'No works yet. Start creating!' },
}

const t = (key) => tr[key]?.[locale.value] || key

provide('locale', locale)
provide('t', t)
provide('toggleLang', toggleLang)
</script>

<style scoped>
.app{--bg:#FFF8F5;--bg2:#FFF0EC;--cw:#fff;--p:#F5D6D6;--p2:#E8B4B4;--pp:#E8D5E8;--r:#E8B4B4;--t:#E8D5E8;--tx:#5C4A5A;--ts:#A890A0;--tm:#CAB8C4;--bd:#F0E4E8;--ss:0 4px 20px rgba(154,120,140,.06);--sm:0 12px 40px rgba(154,120,140,.1);--sl:0 20px 60px rgba(154,120,140,.12);--rs:12px;--rm:20px;--rl:28px;--tr:.5s cubic-bezier(.25,.46,.45,.94);max-width:100%;overflow-x:hidden;min-height:100vh;display:flex;flex-direction:column}
.main{flex:1}
</style>
