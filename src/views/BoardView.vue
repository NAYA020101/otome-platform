<template>
  <div class="pg">
    <div class="pg-bc">
      <router-link to="/community" class="pg-bcl">{{ locale==='zh'?'社区':'Community' }}</router-link>
      <span class="pg-bs">/</span>
      <span class="pg-bcc">{{ boardTitle }}</span>
    </div>

    <div class="pg-h">
      <h1 class="pg-t">{{ boardTitle }}</h1>
      <p class="pg-s">{{ boardDesc }}</p>
    </div>

    <div class="btool">
      <div class="stabs"><button :class="['stab',{active:sort==='latest'}]" @click="sort='latest'">{{ locale==='zh'?'最新':'Latest' }}</button><button :class="['stab',{active:sort==='popular'}]" @click="sort='popular'">{{ locale==='zh'?'热门':'Popular' }}</button></div>
      <button class="btn-p bp" @click="showForm=true">{{ locale==='zh'?'+ 发帖':'+ New Post' }}</button>
    </div>

    <div v-if="showForm" class="pf">
      <h3 class="pft">{{ locale==='zh'?'发布新帖':'New Post' }}</h3>
      <div class="fld"><input v-model="postTitle" :placeholder="locale==='zh'?'标题':'Title'" maxlength="60" /></div>
      <div class="fld"><textarea v-model="postContent" :placeholder="locale==='zh'?'写下你的想法……（自动过滤不文明用语）':'Share your thoughts... (auto-filter)'" rows="5"></textarea></div>
      <p v-if="postErr" class="pw">{{ postErr }}</p>
      <p v-if="postOk" class="pn">{{ postOk }}</p>
      <div class="fa"><button class="btn-s" @click="showForm=false;postErr='';postOk=''">{{ locale==='zh'?'取消':'Cancel' }}</button><button class="btn-p" @click="submitPost">{{ locale==='zh'?'发布':'Post' }}</button></div>
    </div>

    <div v-if="posts.length===0" class="empty"><div class="ei">✧</div><p>{{ locale==='zh'?'还没有帖子，来发起第一个话题吧 🌸':'No posts yet. Start the first topic 🌸' }}</p></div>
    <div v-else class="pl">
      <article v-for="p in posts" :key="p.id" class="pc" @click="openPost(p.id)">
        <h3 class="pc-t">{{ dispTitle(p) }}</h3>
        <div class="pc-m"><span class="pc-au">{{ p.authorName }}</span><span>{{ timeAgo(p.createdAt) }}</span></div>
        <p class="pc-e">{{ excerpt(p) }}</p>
        <div class="pc-f"><span>♥ {{ p.likes||0 }}</span><span>💬 {{ p.commentCount||0 }}</span></div>
      </article>
    </div>

    <!-- Post detail modal -->
    <Teleport to="body">
      <div v-if="detailPost" class="mm" @click.self="detailPost=null">
        <div class="mp dmp">
          <button class="mc" @click="detailPost=null">✕</button>
          <article class="dp">
            <h3 class="dp-t">{{ dispTitle(detailPost) }}</h3>
            <div class="dp-m"><span class="dp-au">{{ detailPost.authorName }}</span><span>{{ timeAgo(detailPost.createdAt) }}</span></div>
            <p class="dp-c">{{ dispContent(detailPost) }}</p>
            <div class="dp-a">
              <button :class="['lb',{liked:(detailPost.likedBy||[]).includes(userStore.currentUser?.id)}]" @click="communityStore.toggleLike(detailPost.id,userStore.currentUser?.id)">
                <span class="h">{{ (detailPost.likedBy||[]).includes(userStore.currentUser?.id)?'♥':'♡' }}</span><span>{{ detailPost.likes||0 }}</span>
              </button>
              <span class="dp-cc">💬 {{ detailPost.commentCount||0 }}</span>
            </div>
          </article>
          <div class="cs">
            <h4 class="cs-t">{{ locale==='zh'?'回应':'Comments' }} ({{ postComments.length }})</h4>
            <div v-if="postComments.length===0" class="cs-e">{{ locale==='zh'?'还没有回应，来说点什么吧 🌸':'No comments yet. Share your thoughts 🌸' }}</div>
            <div v-for="c in postComments" :key="c.id" class="ci">
              <div class="ci-a">{{ c.authorName[0]?.toUpperCase()||'?' }}</div>
              <div class="ci-b"><div class="ci-h"><span class="ci-n">{{ c.authorName }}</span><span class="ci-t">{{ timeAgo(c.createdAt) }}</span></div><p class="ci-x">{{ c.content }}</p></div>
            </div>
            <div v-if="userStore.currentUser" class="cf">
              <textarea v-model="commentText" :placeholder="locale==='zh'?'写下你的回应……（自动过滤）':'Write your response... (auto-filter)'" rows="2"></textarea>
              <p v-if="cErr" class="pw">{{ cErr }}</p>
              <p v-if="cOk" class="pn">{{ cOk }}</p>
              <div class="cs-b"><button class="btn-p" @click="submitComment(detailPost.id)">{{ locale==='zh'?'发送':'Send' }}</button></div>
            </div>
            <div v-else class="cs-l">{{ locale==='zh'?'登录后即可参与讨论 🌷':'Log in to join 🌷' }}</div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, inject, watch } from 'vue'
import { useRouter } from 'vue-router'
import { boards, communityStore } from '../stores/communityStore.js'
import { userStore } from '../stores/userStore.js'
import { filterText, hasBadWords, filterWarn, filterNotice } from '../utils/wordFilter.js'

const props = defineProps({ boardId: String })
const t = inject('t')
const locale = inject('locale')
const router = useRouter()

const sort = ref('latest')
const showForm = ref(false)
const postTitle = ref('')
const postContent = ref('')
const postErr = ref('')
const postOk = ref('')
const detailPost = ref(null)
const commentText = ref('')
const cErr = ref('')
const cOk = ref('')

const board = computed(() => boards.find(b => b.id === props.boardId))
const boardTitle = computed(() => locale.value==='zh' ? board.value?.zh||'' : board.value?.en||'')
const boardDesc = computed(() => {
  const ds = { story:{zh:'讨论你喜欢的乙女游戏剧情，分享感动与思考',en:'Discuss otome game stories'}, characters:{zh:'分享你心动的角色，聊聊那些让你难忘的瞬间',en:'Share your beloved characters'}, mechanics:{zh:'评测游戏系统、UI、玩法，为姐妹们排雷',en:'Review game systems and UI'}, recommend:{zh:'推荐值得一玩的新作，互相安利优质乙女游戏',en:'Recommend new otome games'}, creation:{zh:'发布你的乙女同人创作、插画、同人小说',en:'Share your otome fan works'}, feelings:{zh:'分享日常心情，这里是温暖的情感树洞',en:'Share your daily feelings'}, female:{zh:'推荐真正以女性为主角、尊重女性视角的优秀作品',en:'Recommend female-centered works'}, 'anti-trope':{zh:'讨论反套路剧情、女性主义叙事、打破刻板印象',en:'Discuss anti-trope narratives'} }
  const d = ds[props.boardId]; return d ? (locale.value==='zh'?d.zh:d.en) : ''
})
const posts = computed(() => communityStore.getFilteredPosts(props.boardId, sort.value))
const postComments = computed(() => detailPost.value ? communityStore.getComments(detailPost.value.id) : [])

watch(board, (b) => { if (!b) router.push('/community') }, { immediate: true })

function dispTitle(p) { return locale.value==='en'&&p.titleEn ? p.titleEn : p.title }
function dispContent(p) { return locale.value==='en'&&p.contentEn ? p.contentEn : p.content }
function excerpt(p) { const t=dispContent(p); return t.length>120 ? t.slice(0,120)+'…' : t }
function timeAgo(ts) { const d=Date.now()-ts;const m=Math.floor(d/60000);if(m<1)return locale.value==='zh'?'刚刚':'just now';if(m<60)return m+(locale.value==='zh'?'分钟前':'m ago');const h=Math.floor(m/60);if(h<24)return h+(locale.value==='zh'?'小时前':'h ago');return Math.floor(h/24)+(locale.value==='zh'?'天前':'d ago') }

function submitPost() {
  postErr.value='';postOk.value=''
  if(!userStore.currentUser){postErr.value=locale.value==='zh'?'请先登录后再发布 🌸':'Please log in first 🌸';return}
  const raw=postContent.value
  if(hasBadWords(postTitle.value)||hasBadWords(raw)){postErr.value=filterWarn(locale.value);return}
  const f=filterText(raw)
  if(f!==raw) postOk.value=filterNotice(locale.value)
  communityStore.createPost(props.boardId, filterText(postTitle.value), f, userStore.currentUser.name, userStore.currentUser.id)
  postTitle.value='';postContent.value='';showForm.value=false
  setTimeout(()=>{postOk.value=''},3000)
}
function openPost(id) { detailPost.value=communityStore.getPost(id); commentText.value='';cErr.value='';cOk.value='' }
function submitComment(postId) {
  cErr.value='';cOk.value=''
  const raw=commentText.value;if(!raw.trim())return
  if(hasBadWords(raw)){cErr.value=filterWarn(locale.value);return}
  const f=filterText(raw)
  if(f!==raw) cOk.value=filterNotice(locale.value)
  communityStore.addComment(postId, f, userStore.currentUser.name, userStore.currentUser.id)
  commentText.value='';setTimeout(()=>{cOk.value=''},3000)
}
</script>

<style scoped>
.pg{max-width:960px;margin:0 auto;padding:120px 20px 80px}
.pg-bc{font-size:13px;color:var(--tm);margin-bottom:28px;letter-spacing:.3px}
.pg-bcl{color:var(--ts);transition:color .3s}.pg-bcl:hover{color:var(--tx)}
.pg-bs{margin:0 10px;color:var(--bd)}.pg-bcc{color:var(--tx);font-weight:500}
.pg-h{margin-bottom:40px;text-align:center}
.pg-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(26px,3.5vw,34px);font-weight:600;color:var(--tx);letter-spacing:1.5px;margin-bottom:12px}
.en .pg-t{font-family:'Playfair Display','Noto Serif SC',serif}
.pg-s{font-size:14px;color:var(--ts);letter-spacing:.5px;max-width:460px;margin:0 auto;line-height:1.7}
.btool{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:28px}
.stabs{display:flex;gap:4px;background:var(--bg);border-radius:10px;padding:3px}
.stab{padding:7px 18px;border:none;border-radius:8px;background:transparent;font-size:13px;color:var(--ts);cursor:pointer;transition:all .3s;font-family:inherit}
.stab.active{background:#fff;color:var(--tx);box-shadow:0 1px 4px rgba(92,74,90,.08)}
.bp{padding:10px 24px;font-size:13px}
.pf{background:var(--cw);border-radius:20px;padding:28px;box-shadow:var(--ss);margin-bottom:28px;border:1px solid var(--bd)}
.pft{font-family:'Noto Serif SC','Playfair Display',serif;font-size:17px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:18px}
.fld{margin-bottom:14px}
.fld input,.fld textarea{width:100%;padding:14px 16px;border:1.5px solid var(--bd);border-radius:12px;font-size:14px;font-family:inherit;color:var(--tx);background:var(--bg);outline:none;transition:border-color .3s;box-sizing:border-box}
.fld input:focus,.fld textarea:focus{border-color:var(--p)}
.fld input::placeholder,.fld textarea::placeholder{color:var(--tm)}
.fld textarea{resize:vertical;min-height:100px;line-height:1.7}
.pw{font-size:13px;color:#C4A0A0;margin-bottom:12px;line-height:1.6}
.pn{font-size:12px;color:var(--p);margin-bottom:12px}
.fa{display:flex;gap:12px;justify-content:flex-end;margin-top:4px}
.fa .btn-s,.fa .btn-p{padding:10px 28px;font-size:13px}
.empty{text-align:center;padding:60px 20px}
.ei{font-size:36px;color:var(--p);margin-bottom:16px}
.empty p{color:var(--tm);font-size:14px}
.pl{display:flex;flex-direction:column;gap:12px}
.pc{background:var(--cw);border-radius:20px;padding:24px 28px;box-shadow:var(--ss);cursor:pointer;transition:all var(--tr);border:1px solid transparent}
.pc:hover{transform:translateY(-4px);box-shadow:var(--sm);border-color:var(--bd)}
.pc-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:17px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:4px;line-height:1.4}
.en .pc-t{font-family:'Playfair Display','Noto Serif SC',serif}
.pc-m{display:flex;gap:14px;font-size:12px;color:var(--tm);margin-bottom:10px}
.pc-au{color:var(--ts);font-weight:500}
.pc-e{font-size:14px;color:var(--ts);line-height:1.7;letter-spacing:.3px;margin-bottom:12px}
.pc-f{display:flex;gap:18px;font-size:13px;color:var(--tm)}
.mm{position:fixed;inset:0;background:rgba(92,74,90,.35);backdrop-filter:blur(6px);display:flex;align-items:flex-start;justify-content:center;z-index:200;padding:60px 20px;overflow-y:auto;animation:fI .3s ease}
@keyframes fI{from{opacity:0}to{opacity:1}}
.mp{background:#fff;border-radius:20px;width:100%;max-width:600px;padding:36px 32px;position:relative;box-shadow:0 24px 64px rgba(92,74,90,.12);animation:sU .35s}
.dmp{max-height:85vh;overflow-y:auto}
@keyframes sU{from{opacity:0;transform:translateY(24px)scale(.97)}to{opacity:1;transform:translateY(0)scale(1)}}
.mc{position:absolute;top:16px;right:20px;font-size:18px;color:var(--tm);background:none;border:none;cursor:pointer;padding:4px;line-height:1;z-index:2;transition:color .3s}
.mc:hover{color:var(--tx)}
.dp{padding-bottom:24px;border-bottom:1px solid var(--bd);margin-bottom:24px}
.dp-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:21px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:10px;line-height:1.4}
.en .dp-t{font-family:'Playfair Display','Noto Serif SC',serif}
.dp-m{display:flex;gap:16px;font-size:13px;color:var(--tm);margin-bottom:20px}
.dp-au{color:var(--ts);font-weight:500}
.dp-c{font-size:15px;line-height:1.8;color:var(--tx);letter-spacing:.3px;margin-bottom:20px;white-space:pre-wrap}
.dp-a{display:flex;gap:20px;align-items:center}
.lb{display:flex;align-items:center;gap:6px;background:none;border:none;font-size:14px;color:var(--tm);cursor:pointer;transition:all .3s;font-family:inherit}
.lb:hover{color:#E8B4B4}.lb.liked{color:#E8B4B4}.h{font-size:18px}
.dp-cc{font-size:14px;color:var(--tm)}
.cs{margin-top:0}
.cs-t{font-size:15px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:20px}
.cs-e{text-align:center;color:var(--tm);font-size:14px;padding:24px 0}
.ci{display:flex;gap:14px;padding:16px 0;border-bottom:1px solid var(--bd)}
.ci:last-child{border-bottom:none}
.ci-a{width:36px;height:36px;border-radius:50%;background:var(--p);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;flex-shrink:0}
.ci-b{flex:1;min-width:0}
.ci-h{display:flex;gap:12px;align-items:center;margin-bottom:4px}
.ci-n{font-size:13px;font-weight:500;color:var(--tx)}
.ci-t{font-size:11px;color:var(--tm)}
.ci-x{font-size:14px;color:var(--tx);line-height:1.6;letter-spacing:.3px;white-space:pre-wrap}
.cf{margin-top:20px}
.cf textarea{width:100%;padding:14px 16px;border:1.5px solid var(--bd);border-radius:12px;font-size:14px;color:var(--tx);background:var(--bg);outline:none;transition:border-color .3s;resize:vertical;box-sizing:border-box;font-family:inherit}
.cf textarea:focus{border-color:var(--p)}
.cf textarea::placeholder{color:var(--tm)}
.cs-b{text-align:right;margin-top:12px}
.cs-b .btn-p{padding:10px 28px;font-size:13px}
.cs-l{text-align:center;color:var(--tm);font-size:14px;margin-top:24px;padding:16px 0}
@media(max-width:640px){
  .pg{padding:100px 16px 60px}
  .btool{flex-direction:column;align-items:stretch}
  .stabs{align-self:flex-start}
  .bp{width:100%}
  .pf{padding:20px}
  .pc{padding:18px 20px}
  .mp{padding:28px 20px}
}
</style>
