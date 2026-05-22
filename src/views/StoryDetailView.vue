<template>
  <div class="pg">
    <div class="pg-bc reveal">
      <router-link to="/" class="pg-bcl">{{ t('navHome') }}</router-link>
      <span class="pg-bs">/</span>
      <router-link to="/stories" class="pg-bcl">{{ t('navStories') }}</router-link>
      <span class="pg-bs">/</span>
      <span class="pg-bcc">{{ t(story.titleKey) }}</span>
    </div>

    <article class="story-article">
      <div class="story-header reveal">
        <span class="story-tag">{{ t(story.tagKey) }}</span>
        <h1 class="story-title">{{ t(story.titleKey) }}</h1>
        <p class="story-author">{{ t(story.authorKey) }}</p>
      </div>

      <div class="story-cover reveal" :class="'scv-'+id"></div>

      <div class="story-body reveal">
        <p v-for="(p, i) in story.paragraphs" :key="i" class="story-p">{{ t(p) }}</p>
      </div>
    </article>
  </div>
</template>

<script setup>
import { inject, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const t = inject('t')

const props = defineProps({ id: String })
const router = useRouter()

const stories = {
  '1': {
    titleKey: 'storyCard1Title',
    tagKey: 'storyCard1Tag',
    authorKey: 'storyCard1Author',
    paragraphs: ['story1P1', 'story1P2', 'story1P3', 'story1P4', 'story1P5'],
  },
  '2': {
    titleKey: 'storyCard2Title',
    tagKey: 'storyCard2Tag',
    authorKey: 'storyCard2Author',
    paragraphs: ['story2P1', 'story2P2', 'story2P3', 'story2P4', 'story2P5'],
  },
  '3': {
    titleKey: 'storyCard3Title',
    tagKey: 'storyCard3Tag',
    authorKey: 'storyCard3Author',
    paragraphs: ['story3P1', 'story3P2', 'story3P3', 'story3P4', 'story3P5'],
  },
}

const story = computed(() => {
  const s = stories[props.id]
  if (!s) {
    router.replace('/stories')
    return stories['1']
  }
  return s
})

onMounted(() => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.pg{max-width:720px;margin:0 auto;padding:120px 20px 100px}
.pg-bc{font-size:13px;color:var(--tm);margin-bottom:40px;letter-spacing:.3px}
.pg-bcl{color:var(--ts);transition:color .3s}.pg-bcl:hover{color:var(--tx)}
.pg-bs{margin:0 10px;color:var(--bd)}.pg-bcc{color:var(--tx);font-weight:500}

.story-header{text-align:center;margin-bottom:40px}
.story-tag{display:inline-block;font-size:11px;font-weight:500;color:var(--ts);letter-spacing:1.5px;background:var(--bg2);padding:6px 18px;border-radius:20px;margin-bottom:20px}
.story-title{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(28px,4vw,38px);font-weight:700;color:var(--tx);letter-spacing:2px;line-height:1.3;margin-bottom:12px}
.en .story-title{font-family:'Playfair Display','Noto Serif SC',serif}
.story-author{font-size:14px;color:var(--tm);letter-spacing:.5px}

.story-cover{height:240px;border-radius:20px;margin-bottom:48px;display:flex;align-items:center;justify-content:center}
.scv-1{background:linear-gradient(135deg,#1a1a2e,#16213e,#0f3460);position:relative;overflow:hidden}
.scv-1::after{content:'✦';position:absolute;font-size:80px;color:rgba(255,255,255,.06);top:50%;left:50%;transform:translate(-50%,-50%)}
.scv-2{background:linear-gradient(135deg,#2d1b3d,#442b5a,#5c3d7a);position:relative;overflow:hidden}
.scv-2::after{content:'♡';position:absolute;font-size:80px;color:rgba(255,255,255,.06);top:50%;left:50%;transform:translate(-50%,-50%)}
.scv-3{background:linear-gradient(135deg,#3d1b1b,#5a2b2b,#7a3d3d);position:relative;overflow:hidden}
.scv-3::after{content:'♛';position:absolute;font-size:80px;color:rgba(255,255,255,.06);top:50%;left:50%;transform:translate(-50%,-50%)}

.story-body{max-width:600px;margin:0 auto}
.story-p{font-size:15px;color:var(--ts);line-height:2.1;letter-spacing:.5px;margin-bottom:24px;text-indent:2em}

@media(max-width:640px){
  .pg{padding:100px 16px 60px}
  .story-p{font-size:14px}
  .story-cover{height:180px}
}
</style>
