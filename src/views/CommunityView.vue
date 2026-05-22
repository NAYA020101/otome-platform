<template>
  <div class="pg">
    <div class="pg-h reveal">
      <h2 class="pg-t">{{ t('communityTitle') }}</h2>
      <p class="pg-s">{{ t('communitySubtitle') }}</p>
    </div>

    <div class="bd-grid reveal-s">
      <router-link v-for="b in boards" :key="b.id" :to="'/community/'+b.id" class="bd-c">
        <div class="bd-ic" :class="'bdi-'+b.id"></div>
        <h3 class="bd-n">{{ locale==='zh'?b.zh:b.en }}</h3>
        <p class="bd-d">{{ descs[b.id]?.[locale==='zh'?'zh':'en'] || '' }}</p>
      </router-link>
    </div>

    <!-- ====== RECENT POSTS ====== -->
    <div class="posts-sxn reveal">
      <h3 class="posts-title">{{ locale==='zh' ? '最近讨论' : 'Recent Discussions' }}</h3>

      <div v-if="posts.length === 0" class="posts-empty">
        {{ locale==='zh' ? '还没有讨论帖，成为第一个发言的人吧' : 'No posts yet. Be the first to share!' }}
      </div>

      <div v-for="post in posts" :key="post.id" class="post-item">
        <div class="post-h">
          <span class="post-badge">{{ post.boardName }}</span>
          <span class="post-time">{{ post.time }}</span>
        </div>
        <h4 class="post-t">{{ post.title }}</h4>
        <p class="post-body">{{ post.body }}</p>
        <div class="post-author">
          <span class="post-avatar">{{ post.author[0] }}</span>
          <span class="post-name">{{ post.author }}</span>
        </div>

        <!-- Replies -->
        <div class="replies" :class="{ open: post.showReplies }">
          <button class="replies-toggle" @click="post.showReplies = !post.showReplies">
            {{ post.showReplies
              ? (locale==='zh' ? '收起回复' : 'Hide replies')
              : (locale==='zh' ? post.replies.length + ' 条回复' : post.replies.length + ' replies') }}
          </button>
          <div v-if="post.showReplies" class="replies-list">
            <div v-for="(reply, ri) in post.replies" :key="ri" class="reply-item">
              <span class="reply-avatar">{{ reply.author[0] }}</span>
              <div class="reply-bd">
                <span class="reply-name">{{ reply.author }}</span>
                <span class="reply-time">{{ reply.time }}</span>
                <p class="reply-text">{{ reply.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Reply form -->
        <div v-if="userStore.currentUser" class="reply-form">
          <input v-model="post.newReply" :placeholder="locale==='zh' ? '写下你的回复…' : 'Write a reply...'"
            class="reply-input" @keyup.enter="addReply(post)" />
          <button class="reply-btn" @click="addReply(post)">{{ locale==='zh' ? '回复' : 'Reply' }}</button>
        </div>
        <div v-else class="reply-login" @click="userStore.showAuthModal = true">
          {{ locale==='zh' ? '登录后可以参与讨论' : 'Log in to join the discussion' }}
        </div>
      </div>
    </div>

    <div class="pg-b reveal">
      <router-link to="/" class="pg-bl">&larr; {{ locale==='zh'?'返回首页':'Back Home' }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { boards } from '../stores/communityStore.js'
import { userStore } from '../stores/userStore.js'

const t = inject('t')
const locale = inject('locale')

const descs = {
  story: { zh: '讨论你喜欢的乙女游戏剧情，分享感动与思考', en: 'Discuss otome game stories, share feelings and thoughts' },
  characters: { zh: '分享你心动的角色，聊聊那些让你难忘的瞬间', en: 'Share your beloved characters and unforgettable moments' },
  mechanics: { zh: '评测游戏系统、UI、玩法，为姐妹们排雷', en: 'Review game systems, UI, gameplay' },
  recommend: { zh: '推荐值得一玩的新作，互相安利优质乙女游戏', en: 'Recommend new otome games worth playing' },
  creation: { zh: '发布你的乙女同人创作、插画、同人小说', en: 'Share your otome fan works and illustrations' },
  feelings: { zh: '分享日常心情，这里是温暖的情感树洞', en: 'Share your daily feelings — a warm emotional haven' },
  female: { zh: '推荐真正以女性为主角、尊重女性视角的优秀作品', en: 'Recommend works that center female perspectives' },
  'anti-trope': { zh: '讨论反套路剧情、女性主义叙事、打破刻板印象', en: 'Discuss anti-trope plots, feminist narratives' },
}

const posts = ref([
  {
    id: 1, boardName: '剧情讨论', title: '《恋与制作人》凌肖线剧情分析',
    body: '最近重新推了凌肖的剧情线，发现很多之前没注意到的细节。他在主线中的每次出场其实都有深意，不只是表面上的「酷哥」人设。特别是在第七章结尾那个回眸…',
    author: '鹿饮溪', time: '2026.05.20', showReplies: false, newReply: '',
    replies: [
      { author: '月下独白', time: '2026.05.20', text: '同意！凌肖的剧情埋了很多伏笔，尤其是他和主角的互动方式，和其他男主完全不同的感觉。' },
      { author: '青黛', time: '2026.05.21', text: '我也是凌肖推！最喜欢他那种刀子嘴豆腐心的设定，第九章的剧情直接看哭了。' },
    ],
  },
  {
    id: 2, boardName: '角色讨论', title: '大家最喜欢哪部作品的男主设定？',
    body: '玩了不少乙女游戏，想听听大家心目中塑造得最好的男主。我个人觉得《未定事件簿》的左然很戳我，成熟稳重又带点笨拙的反差萌。',
    author: '弦音', time: '2026.05.18', showReplies: false, newReply: '',
    replies: [
      { author: '青黛', time: '2026.05.18', text: '左然确实是天花板级别的！不过我个人更吃《光与夜之恋》里齐司礼那种傲娇毒舌型哈哈哈。' },
      { author: 'Deer Creek', time: '2026.05.19', text: '大家说的我都同意，但我提一个比较冷门的——《时空中的绘旅人》的叶瑄，那种温柔又疏离的感觉太绝了。' },
    ],
  },
  {
    id: 3, boardName: '游戏推荐', title: '推荐几款冷门但质量很高的乙女游戏',
    body: '玩了很多大热作品后想换换口味，整理了几款知名度不高但剧情、画面都在线的乙女游戏，姐妹们可以参考一下～',
    author: '月下独白', time: '2026.05.15', showReplies: false, newReply: '',
    replies: [
      { author: '鹿饮溪', time: '2026.05.15', text: '求推荐！正好最近游戏荒，市面上的大热作品基本都玩过了。' },
      { author: '弦音', time: '2026.05.16', text: '推荐《剑为君》！虽然是老游戏但剧情真的很扎实。' },
    ],
  },
])

const boardNames = {}
boards.forEach(b => { boardNames[b.id] = b })

function addReply(post) {
  if (!post.newReply || !post.newReply.trim()) return
  if (!userStore.currentUser) return
  post.replies.push({
    author: userStore.currentUser.name,
    time: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
    text: post.newReply.trim(),
  })
  post.newReply = ''
  post.showReplies = true
}

onMounted(() => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
  document.querySelectorAll('.reveal-s > *').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.pg{max-width:960px;margin:0 auto;padding:120px 20px 80px}
.pg-h{text-align:center;margin-bottom:56px}
.pg-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(24px,3vw,32px);font-weight:600;color:var(--tx);letter-spacing:2px;margin-bottom:12px}
.en .pg-t{font-family:'Playfair Display','Noto Serif SC',serif}
.pg-s{font-size:14px;color:var(--ts);letter-spacing:.5px;max-width:440px;margin:0 auto;line-height:1.8}
.bd-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bd);margin-bottom:60px}
.bd-c{background:var(--bg);padding:32px 24px;transition:all var(--tr);text-align:center;display:block}
.bd-c:hover{background:var(--cw)}
.bd-ic{width:40px;height:40px;margin:0 auto 14px;position:relative}
.bd-ic::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:16px;height:16px;background:var(--ts);mask-size:contain;-webkit-mask-size:contain;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat}
.bdi-story::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'/%3E%3Cpath d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'/%3E%3Cpath d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'/%3E%3C/svg%3E")}
.bdi-characters::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/%3E%3C/svg%3E")}
.bdi-mechanics::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='2' y='3' width='20' height='14' rx='2' ry='2'/%3E%3Cline x1='8' y1='21' x2='16' y2='21'/%3E%3Cline x1='12' y1='17' x2='12' y2='21'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='2' y='3' width='20' height='14' rx='2' ry='2'/%3E%3Cline x1='8' y1='21' x2='16' y2='21'/%3E%3Cline x1='12' y1='17' x2='12' y2='21'/%3E%3C/svg%3E")}
.bdi-recommend::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpolygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpolygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/%3E%3C/svg%3E")}
.bdi-creation::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E")}
.bdi-feelings::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E")}
.bdi-female::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M12 5v14'/%3E%3Cpath d='M8 9l4-4 4 4'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M12 5v14'/%3E%3Cpath d='M8 9l4-4 4 4'/%3E%3C/svg%3E")}
.bdi-anti-trope::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M16 8l-8 8'/%3E%3Cpath d='M8 8l8 8'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M16 8l-8 8'/%3E%3Cpath d='M8 8l8 8'/%3E%3Csvg%3E")}
.bd-n{font-family:'Noto Serif SC','Playfair Display',serif;font-size:15px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:8px}
.bd-d{font-size:12px;color:var(--ts);line-height:1.6;letter-spacing:.3px}

/* Posts */
.posts-sxn{margin-bottom:48px}
.posts-title{font-size:16px;font-weight:500;color:var(--tx);margin-bottom:24px;letter-spacing:.5px;padding-bottom:12px;border-bottom:1px solid var(--bd)}
.posts-empty{text-align:center;padding:40px;color:var(--tm);font-size:13px;background:var(--bg);border:1px solid var(--bd)}
.post-item{background:var(--cw);padding:24px;margin-bottom:16px;border:1px solid var(--bd);transition:border-color .3s}
.post-item:hover{border-color:var(--tm)}
.post-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.post-badge{font-size:10px;padding:3px 10px;background:var(--t);color:var(--ts);letter-spacing:.5px}
.post-time{font-size:11px;color:var(--tm)}
.post-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:15px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:8px}
.post-body{font-size:13px;color:var(--ts);line-height:1.7;margin-bottom:12px}
.post-author{display:flex;align-items:center;gap:6px;margin-bottom:12px}
.post-avatar{width:22px;height:22px;background:var(--t);color:var(--ts);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:500}
.post-name{font-size:12px;color:var(--tm)}

/* Replies */
.replies{margin-bottom:12px}
.replies-toggle{background:none;border:none;font-size:12px;color:var(--ts);cursor:pointer;font-family:inherit;padding:4px 0;transition:color .3s}
.replies-toggle:hover{color:var(--tx)}
.replies-list{margin-top:10px;padding-left:12px;border-left:2px solid var(--bd)}
.reply-item{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--bg2)}
.reply-item:last-child{border-bottom:none}
.reply-avatar{width:24px;height:24px;background:var(--bg2);color:var(--ts);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:500;flex-shrink:0}
.reply-bd{flex:1}
.reply-name{font-size:12px;font-weight:500;color:var(--tx);margin-right:8px}
.reply-time{font-size:10px;color:var(--tm)}
.reply-text{font-size:13px;color:var(--ts);line-height:1.6;margin-top:4px}

/* Reply form */
.reply-form{display:flex;gap:8px}
.reply-input{flex:1;padding:8px 12px;border:1px solid var(--bd);font-size:12px;font-family:inherit;color:var(--tx);background:var(--bg);outline:none;transition:border-color .3s;min-width:0}
.reply-input:focus{border-color:var(--ts)}
.reply-btn{padding:8px 16px;background:var(--tx);color:#fff;border:none;font-size:11px;cursor:pointer;font-family:inherit;transition:background .3s;white-space:nowrap}
.reply-btn:hover{background:#4A3A36}
.reply-login{font-size:12px;color:var(--tm);cursor:pointer;padding:6px 0;transition:color .3s}
.reply-login:hover{color:var(--tx)}

.pg-b{text-align:center;margin-top:48px}
.pg-bl{font-size:14px;color:var(--ts);letter-spacing:.5px;transition:color .3s}
.pg-bl:hover{color:var(--tx)}
@media(max-width:968px){.bd-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.pg{padding:100px 16px 60px}.bd-grid{grid-template-columns:1fr}.bd-c{padding:24px 18px}.post-item{padding:18px}}
</style>
