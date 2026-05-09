import { reactive } from 'vue'

export const boards = [
  { id: 'story', zh: '剧情讨论区', en: 'Story Discussion' },
  { id: 'characters', zh: '角色心动区', en: 'Characters & Heartbeats' },
  { id: 'mechanics', zh: '游戏机制测评', en: 'Game Mechanics' },
  { id: 'recommend', zh: '新作推荐区', en: 'New Otome Games' },
  { id: 'creation', zh: '乙女创作分享', en: 'Otome Creation' },
  { id: 'feelings', zh: '心情共鸣区', en: 'Feelings & Sharing' },
  { id: 'female', zh: '女性向剧情推荐', en: 'Female-Oriented Stories' },
  { id: 'anti-trope', zh: '反套路乙女讨论', en: 'Anti-Trope Otome Discussion' },
]

const savedPosts = JSON.parse(localStorage.getItem('ht_posts') || '[]')
const savedComments = JSON.parse(localStorage.getItem('ht_comments') || '[]')

export const communityStore = reactive({
  posts: savedPosts,
  comments: savedComments,

  createPost(boardId, title, content, authorName, authorId) {
    const p = { id: Date.now().toString(36)+Math.random().toString(36).slice(2,6), boardId, title, content, authorName, authorId, createdAt: Date.now(), likes: 0, likedBy: [], commentCount: 0 }
    this.posts.unshift(p)
    this._savePosts()
    return p
  },

  addComment(postId, content, authorName, authorId) {
    const c = { id: Date.now().toString(36)+Math.random().toString(36).slice(2,6), postId, content, authorName, authorId, createdAt: Date.now() }
    this.comments.push(c)
    const p = this.posts.find(x => x.id === postId)
    if (p) p.commentCount++
    this._savePosts()
    this._saveComments()
    return c
  },

  toggleLike(postId, userId) {
    const p = this.posts.find(x => x.id === postId)
    if (!p || !userId) return
    if ((p.likedBy||[]).includes(userId)) {
      p.likedBy = p.likedBy.filter(id => id !== userId)
      p.likes = Math.max(0, p.likes - 1)
    } else {
      if (!p.likedBy) p.likedBy = []
      p.likedBy.push(userId)
      p.likes++
    }
    this._savePosts()
  },

  getFilteredPosts(boardId, sortBy = 'latest') {
    let r = this.posts.filter(p => p.boardId === boardId)
    if (sortBy === 'latest') r.sort((a,b) => b.createdAt - a.createdAt)
    else r.sort((a,b) => (b.likes+b.commentCount)-(a.likes+a.commentCount) || b.createdAt - a.createdAt)
    return r
  },

  getComments(postId) {
    return this.comments.filter(c => c.postId === postId).sort((a,b) => a.createdAt - b.createdAt)
  },

  getPost(id) { return this.posts.find(p => p.id === id) },

  _savePosts() { localStorage.setItem('ht_posts', JSON.stringify(this.posts)) },
  _saveComments() { localStorage.setItem('ht_comments', JSON.stringify(this.comments)) },
})

// Seed
if (communityStore.posts.length === 0) {
  const now = Date.now()
  const seeds = [
    { bid:'story', tZh:'大家最近在玩什么乙女游戏？', tEn:'What otome games are you playing lately?', cZh:'刚通关《月光航路》，结局太震撼了！想知道大家有什么类似推荐。', cEn:'Just finished "Moonlight Voyage" — the ending was so powerful! Any recommendations?', au:'鹿饮溪' },
    { bid:'characters', tZh:'聊聊你心中最心动的角色', tEn:'Who is your favorite character?', cZh:'外表冷酷内心温柔的类型永远戳我。姐妹们来分享你们的心动角色吧！', cEn:'Cold outside warm inside always gets me. Share your heartthrob characters!', au:'月下独白' },
    { bid:'feelings', tZh:'今天在游戏里被治愈了', tEn:'Healed by a game today', cZh:'打开游戏听到BGM的那一刻心情就平静了。乙女游戏是最棒的精神港湾。', cEn:'The moment I opened the game and heard the BGM, my heart calmed down.', au:'青黛' },
    { bid:'female', tZh:'推荐几部女性视角出色的作品', tEn:'Great female-perspective games', cZh:'真正以女性为主角、尊重女性视角的作品太珍贵了。来互相安利吧。', cEn:'Games that truly center on female perspectives are so precious. Let\'s share!', au:'拾光' },
    { bid:'anti-trope', tZh:'大家最想看到什么样的反套路剧情？', tEn:'What anti-trope stories do you want?', cZh:'不想再看傻白甜了！想要女主搞事业、男性角色做后盾的剧情！', cEn:'Tired of damsel in distress! Want heroines building careers with ML as support!', au:'织梦者' },
  ]
  seeds.forEach(s => {
    communityStore.posts.push({
      id: Date.now().toString(36)+Math.random().toString(36).slice(2,6),
      boardId: s.bid, title: s.tZh, titleEn: s.tEn,
      content: s.cZh, contentEn: s.cEn,
      authorName: s.au, authorId: 'seed',
      createdAt: now - Math.floor(Math.random()*86400000*3),
      likes: Math.floor(Math.random()*10), likedBy: [], commentCount: Math.floor(Math.random()*5),
    })
  })
  communityStore._savePosts()
}
