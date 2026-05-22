<template>
  <div class="pg">
    <div class="pg-bc reveal">
      <router-link to="/" class="pg-bcl">{{ t('navHome') }}</router-link><span class="pg-bs">/</span><span class="pg-bcc">{{ t('navAbout') }}</span>
    </div>

    <div class="ab-header reveal">
      <div class="ab-brand">
        <span class="ab-brand-zh">她叙</span>
        <span class="ab-brand-en">Her Tale</span>
      </div>
      <div class="baroque-divider">✦ ✦ ✦</div>
      <p class="ab-intro">{{ locale==='zh' ? '一场专属于女性的浪漫叙事栖居地' : 'A romantic narrative haven for women' }}</p>
    </div>

    <div class="ab-body reveal">
      <p>{{ locale==='zh' ? '世间万千心动，皆可落笔成叙。本平台以"女性叙事、浪漫创作、温柔共生"为核心，聚焦乙女文化与原创故事创作，为每一位热爱心动剧情、偏爱温柔叙事的创作者与爱好者，打造一片纯粹、自由、治愈的文字天地与同好角落。' : 'Every heartbeat can become a story. This platform centers on feminine narrative, romantic creation, and gentle coexistence.' }}</p>
      <p>{{ locale==='zh' ? '在这里，你可以翻阅全网优质乙女游戏世界观、人物设定与剧情篇章，邂逅跨越次元的心动与温柔。我们收录各类经典与新晋乙女作品，梳理细腻剧情脉络与人物魅力，让每一份被打动的情愫都有处可寻，每一场难忘的邂逅都被妥善珍藏。' : 'Here you can explore otome game worlds, characters, and stories from across the web. Every emotion has a place to be found.' }}</p>
      <p>{{ locale==='zh' ? '不止于阅览，更在于创造。她叙鼓励每一位心怀灵感的创作者自由落笔，记录遐想、续写剧情、原创故事、描摹心动。不必拘泥框架，无需受限规则，所有温柔的思绪、浪漫的想象、私人的情愫，都可以在此生根、绽放、被看见。每一段文字，都是独属于你的专属叙事。' : 'Beyond reading, we celebrate creation. Every gentle thought and romantic imagination can take root and bloom here.' }}</p>
      <div class="baroque-divider">✦ ✦ ✦</div>
      <p class="ab-quote">{{ locale==='zh' ? '以她之名，叙她所想。愿你在此，读尽世间温柔，写尽心中浪漫，与同频之人相伴，岁岁叙心动，字字皆深情。' : 'In her name, tell her stories. May you find all tenderness and romance here.' }}</p>
    </div>

    <div class="ab-vision reveal">
      <h2 class="ab-section-t">{{ locale==='zh' ? '核心理念' : 'Our Vision' }}</h2>
      <div class="vision-grid">
        <div class="vision-card">
          <div class="vision-icon">◈</div>
          <h3>{{ locale==='zh' ? '女性叙事' : 'Feminine Narrative' }}</h3>
          <p>{{ locale==='zh' ? '以女性视角为出发点，尊重每一种声音。女性的视角，本身就是最动人的笔触。' : 'Centering women\'s perspectives. Every voice deserves to be heard.' }}</p>
        </div>
        <div class="vision-card">
          <div class="vision-icon">✦</div>
          <h3>{{ locale==='zh' ? '浪漫创作' : 'Romantic Creation' }}</h3>
          <p>{{ locale==='zh' ? '鼓励自由创作，不必拘泥框架。所有温柔的思绪与浪漫的想象，都可以在此绽放。' : 'Encouraging free creation. All tender thoughts can bloom here.' }}</p>
        </div>
        <div class="vision-card">
          <div class="vision-icon">♢</div>
          <h3>{{ locale==='zh' ? '温柔共生' : 'Gentle Community' }}</h3>
          <p>{{ locale==='zh' ? '构建温柔友善的同好社区，让每一位热爱故事的人都能找到归属。' : 'Building a gentle community where every story lover belongs.' }}</p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats reveal">
      <div class="stat-item"><span class="stat-n">217</span><span class="stat-l">{{ locale==='zh' ? '作品收录' : 'Games' }}</span></div>
      <div class="stat-item"><span class="stat-n">1,483</span><span class="stat-l">{{ locale==='zh' ? '角色收录' : 'Characters' }}</span></div>
      <div class="stat-item"><span class="stat-n">523</span><span class="stat-l">{{ locale==='zh' ? '情绪标签' : 'Emotions' }}</span></div>
      <div class="stat-item"><span class="stat-n">89</span><span class="stat-l">{{ locale==='zh' ? '活跃创作者' : 'Creators' }}</span></div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const t = inject('t');const locale = inject('locale')
onMounted(() => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.pg{max-width:720px;margin:0 auto;padding:100px 20px 70px}
.pg-bc{font-size:12px;color:var(--tm);margin-bottom:36px;letter-spacing:.3px}
.pg-bcl{color:var(--ts);transition:color .3s}.pg-bcl:hover{color:var(--tx)}
.pg-bs{margin:0 10px;color:var(--bd)}.pg-bcc{color:var(--tx);font-weight:500}

.ab-header{text-align:center;margin-bottom:48px}
.ab-brand{margin-bottom:12px}
.ab-brand-zh{font-family:'Noto Serif SC',serif;font-size:40px;font-weight:700;color:var(--tx);letter-spacing:8px;display:block;margin-bottom:4px}
.ab-brand-en{font-family:'Georgia',serif;font-size:15px;font-style:italic;color:var(--gold);letter-spacing:4px}
.ab-intro{font-size:15px;color:var(--ts);line-height:1.8;letter-spacing:.5px;max-width:480px;margin:0 auto;font-style:italic}

.ab-body{max-width:600px;margin:0 auto}
.ab-body p{font-size:14px;color:var(--ts);line-height:2.1;letter-spacing:.5px;margin-bottom:20px;text-indent:2em}
.ab-quote{font-family:'Noto Serif SC','Georgia',serif;font-size:15px;color:var(--accent);line-height:2.1;letter-spacing:.5px;text-indent:2em;font-style:italic;padding-top:8px}

.ab-vision{margin-top:60px}
.ab-section-t{font-family:'Noto Serif SC','Georgia',serif;font-size:18px;font-weight:600;color:var(--tx);text-align:center;letter-spacing:2px;margin-bottom:28px;padding-bottom:12px;border-bottom:1px solid var(--gold)}
.vision-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.vision-card{background:var(--cw);padding:32px 24px;text-align:center;transition:all var(--tr);border:1px solid var(--bd)}.vision-card:hover{border-color:var(--gold);box-shadow:var(--sm);transform:translateY(-2px)}
.vision-icon{font-size:24px;color:var(--gold);margin-bottom:14px;display:block}
.vision-card h3{font-family:'Noto Serif SC','Georgia',serif;font-size:15px;font-weight:600;color:var(--tx);letter-spacing:1px;margin-bottom:10px}
.vision-card p{font-size:12px;color:var(--ts);line-height:1.7;letter-spacing:.3px}

.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bd);margin-top:60px}
.stat-item{background:var(--bg);padding:20px 12px;text-align:center;transition:all var(--tr)}.stat-item:hover{background:var(--cw);border:1px solid var(--gold);margin:-1px}
.stat-n{display:block;font-family:'Georgia',serif;font-size:26px;font-weight:400;color:var(--accent);letter-spacing:1px;margin-bottom:3px}
.stat-l{font-size:11px;color:var(--tm);letter-spacing:2px;text-transform:uppercase}

@media(max-width:768px){
  .pg{padding:85px 16px 50px}.vision-grid{grid-template-columns:1fr}.stats{grid-template-columns:repeat(2,1fr)}.ab-brand-zh{font-size:32px}
}
@media(max-width:640px){
  .ab-body p{font-size:13px}.vision-card{padding:24px 18px}
}
</style>
