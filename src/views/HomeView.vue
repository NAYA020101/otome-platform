<template>
  <div class="page">
    <!-- ====== HERO ====== -->
    <section id="hero" class="hz">
      <div class="hz-inner reveal">
        <span class="hz-label">{{ t('heroBrand') }}</span>
        <h1 class="hz-title">{{ t('heroTitle') }}</h1>
        <p class="hz-sub">{{ t('heroSubtitle') }}</p>
        <button class="btn-p" @click="scrollTo('#stories')">{{ t('heroCTA') }}</button>
      </div>
    </section>

    <!-- ====== STORIES ====== -->
    <section id="stories" class="sxn">
      <div class="sxn-h reveal">
        <h2 class="sxn-t">{{ t('storiesTitle') }}</h2>
        <p class="sxn-st">{{ t('storiesSubtitle') }}</p>
      </div>
      <div class="sc-grid reveal-s">
        <article v-for="(s,i) in [{k:'storyCard1'},{k:'storyCard2'},{k:'storyCard3'}]" :key="s.k" class="sc">
          <div class="sc-im" :class="'im-'+(i+1)"><span class="sc-tag">{{ t(s.k+'Tag') }}</span></div>
          <div class="sc-bd">
            <h3 class="sc-t">{{ t(s.k+'Title') }}</h3>
            <p class="sc-au">{{ t(s.k+'Author') }}</p>
            <p class="sc-d">{{ t(s.k+'Desc') }}</p>
            <a href="#" class="sc-lk" @click.prevent>{{ t('storyMore') }}</a>
          </div>
        </article>
      </div>
    </section>

    <!-- ====== CREATOR — 3D Desktop PSP Scene ====== -->
    <section id="creator" class="sxn creator">
      <div class="sxn-h reveal">
        <h2 class="sxn-t">{{ t('creatorTitle') }}</h2>
        <p class="sxn-st">{{ t('creatorSubtitle') }}</p>
      </div>

      <!-- Desktop scene -->
      <div class="desktop-scene reveal">
        <!-- Back wall -->
        <div class="desk-wall"></div>

        <!-- Decorative items -->
        <div class="deco deco-folder">
          <div class="folder-body"><div class="folder-tab"></div></div>
        </div>
        <div class="deco deco-cup">
          <div class="cup-body"><div class="cup-handle"></div><div class="cup-steam s1"></div><div class="cup-steam s2"></div></div>
        </div>
        <div class="deco deco-sticker"></div>

        <!-- PSP Console -->
        <div class="psp">
          <!-- Speaker -->
          <div class="psp-spk"><span></span><span></span><span></span></div>

          <!-- Screen bezel -->
          <div class="psp-bezel">
            <div class="psp-screen">
              <!-- Retro window -->
              <div class="win">
                <div class="win-bar">
                  <div class="win-dots"><span></span><span></span><span></span></div>
                  <div class="win-nav">
                    <button v-for="(tab,i) in tabs" :key="i"
                      :class="['win-link',{active:activeTab===i}]"
                      @click="activeTab=i; pspIdx=i"
                    >{{ t(tab.key) }}</button>
                  </div>
                  <div class="win-spacer"></div>
                </div>
                <div class="win-body">
                  <!-- Panel: Personal Intro -->
                  <div v-if="activeTab===0" class="win-panel">
                    <h4 class="win-tt">{{ t(panels[0].titleKey) }}</h4>
                    <p class="win-tx">{{ t(panels[0].descKey) }}</p>
                    <div class="win-tags">
                      <span v-for="tag in ['#叙事设计','#乙女游戏','#女性主义','#共创平台']" :key="tag">{{ tag }}</span>
                    </div>
                  </div>
                  <!-- Panel: Projects -->
                  <div v-if="activeTab===1" class="win-panel">
                    <h4 class="win-tt">{{ t(panels[1].titleKey) }}</h4>
                    <div class="win-projects">
                      <div v-for="(proj,i) in projects" :key="i" class="win-proj">
                        <div class="proj-icon" :class="'pj-'+i"></div>
                        <div>
                          <h5>{{ proj[locale==='zh'?'zh':'en'] }}</h5>
                          <p>{{ proj[locale==='zh'?'dZh':'dEn'] }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Panel: Skills -->
                  <div v-if="activeTab===2" class="win-panel">
                    <h4 class="win-tt">{{ t(panels[2].titleKey) }}</h4>
                    <div class="win-skills">
                      <div v-for="(sk,i) in skills" :key="i" class="win-skill">
                        <div class="skill-icon" :class="'sk-'+i"></div>
                        <span>{{ sk[locale==='zh'?'zh':'en'] }}</span>
                      </div>
                    </div>
                  </div>
                  <!-- Panel: Contact -->
                  <div v-if="activeTab===3" class="win-panel">
                    <h4 class="win-tt">{{ t(panels[3].titleKey) }}</h4>
                    <p class="win-tx">{{ t(panels[3].descKey) }}</p>
                    <div class="win-contact">
                      <button class="btn-s" @click="scrollTo('#stories')">{{ t('creatorCTA') }}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Brand + Dots -->
          <div class="psp-mid">
            <div class="psp-dots"><span v-for="i in 4" :key="i" :class="{active:activeTab===i-1}" @click="activeTab=i-1;pspIdx=i-1"></span></div>
            <span class="psp-brand">Ta・Xu</span>
          </div>

          <!-- Controls -->
          <div class="psp-ctrl">
            <div class="psp-dpad"><span></span><span></span><span></span><span></span><span></span></div>
            <div class="psp-acts">
              <span class="pbtn triangle">△</span>
              <span class="pbtn circle">○</span>
              <span class="pbtn cross">✕</span>
              <span class="pbtn square">□</span>
            </div>
          </div>
        </div>

        <!-- Table surface -->
        <div class="desk-table"></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
const t = inject('t')
const locale = inject('locale')

const pspScroller = ref(null)
const pspIdx = ref(0)
const activeTab = ref(0)

const tabs = [
  { key: 'creator1Title' },
  { key: 'creator2Title' },
  { key: 'creator3Title' },
  { key: 'creator4Title' },
]

const panels = [
  { titleKey: 'creator1Title', descKey: 'creator1Desc' },
  { titleKey: 'creator2Title', descKey: 'creator2Desc' },
  { titleKey: 'creator3Title', descKey: 'creator3Desc' },
  { titleKey: 'creator4Title', descKey: 'creator4Desc' },
]

const projects = [
  { zh: '月光航线', en: 'Moonlight Voyage', dZh: '反套路星际乙女剧情，女主船长 x 星际海盗', dEn: 'Anti-trope space otome — captain heroine × space pirate' },
  { zh: '她的王朝', en: 'Her Dynasty', dZh: '古风权谋乙女，她不是公主，是执棋之人', dEn: 'Historical strategy otome — she is no princess, she plays the game' },
  { zh: '不存在的恋人', en: 'The Lover Who Never Was', dZh: 'AI × 人类的治愈系反套路情感实验', dEn: 'Healing anti-trope romance experiment: AI × human' },
]

const skills = [
  { zh: '叙事架构', en: 'Narrative Design' },
  { zh: '角色塑造', en: 'Characterization' },
  { zh: '世界观搭建', en: 'Worldbuilding' },
  { zh: '对白写作', en: 'Dialogue Writing' },
  { zh: '互动叙事', en: 'Interactive Story' },
  { zh: '情感设计', en: 'Emotional Design' },
]

function scrollTo(href) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function pspScroll(dir) {
  if (!pspScroller.value) return
  const cards = pspScroller.value.querySelector('.psp-scroll')
  if (!cards) return
  const w = cards.querySelector('.psp-card')?.offsetWidth || 220
  const gap = 16
  const step = w + gap
  let target = pspScroller.value.scrollLeft + step * dir
  target = Math.max(0, Math.min(target, cards.scrollWidth - pspScroller.value.clientWidth))
  pspScroller.value.scrollTo({ left: target, behavior: 'smooth' })
  updatePspIdx()
}

function pspOnScroll() {
  updatePspIdx()
}

function updatePspIdx() {
  if (!pspScroller.value) return
  const scrollLeft = pspScroller.value.scrollLeft
  const w = pspScroller.value.querySelector('.psp-card')?.offsetWidth || 220
  const gap = 16
  const step = w + gap
  pspIdx.value = Math.round(scrollLeft / step)
}

function pspGo(idx) {
  if (!pspScroller.value) return
  const w = pspScroller.value.querySelector('.psp-card')?.offsetWidth || 220
  const gap = 16
  pspScroller.value.scrollTo({ left: idx * (w + gap), behavior: 'smooth' })
  pspIdx.value = idx
}

onMounted(() => {
  if (window.location.hash) {
    setTimeout(() => {
      const el = document.querySelector(window.location.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
  document.querySelectorAll('.reveal-s > *').forEach(el => ro.observe(el))
})
</script>

<style scoped>
/* ====== PAGE LAYOUT ====== */
.page{max-width:960px;margin:0 auto;padding:0 20px}

/* ====== HERO ====== */
.hz{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:140px 0 80px}
.hz-inner{text-align:center;max-width:660px;width:100%}
.hz-label{display:inline-block;font-family:'Playfair Display',serif;font-size:12px;font-weight:400;color:var(--p2);letter-spacing:4px;text-transform:uppercase;margin-bottom:20px}
.en .hz-label{font-style:italic}
.hz-title{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(34px,5.5vw,60px);font-weight:700;color:var(--tx);line-height:1.25;letter-spacing:2px;margin-bottom:24px}
.en .hz-title{font-family:'Playfair Display','Noto Serif SC',serif}
.hz-sub{font-size:clamp(15px,2vw,18px);color:var(--ts);line-height:1.8;letter-spacing:.5px;margin-bottom:36px;max-width:520px;margin-left:auto;margin-right:auto}

/* ====== SECTIONS COMMON ====== */
.sxn{padding:100px 0 120px}
.sxn-h{text-align:center;margin-bottom:56px}
.sxn-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(26px,3.5vw,34px);font-weight:600;color:var(--tx);letter-spacing:1.5px;margin-bottom:14px}
.en .sxn-t{font-family:'Playfair Display','Noto Serif SC',serif}
.sxn-st{font-size:14px;color:var(--ts);letter-spacing:.5px;max-width:440px;margin:0 auto;line-height:1.8}
.sxn-c{text-align:center;margin-top:40px}

/* ====== STORIES ====== */
.sc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.sc{background:var(--cw);border-radius:20px;overflow:hidden;transition:all var(--tr);box-shadow:var(--ss);cursor:pointer}
.sc:hover{transform:translateY(-5px);box-shadow:var(--sm)}
.sc-im{height:180px;display:flex;align-items:flex-start;padding:18px;position:relative}
.im-1{background:linear-gradient(135deg,#FDE8E8,var(--p))}
.im-2{background:linear-gradient(135deg,#FCE8F0,var(--pp))}
.im-3{background:linear-gradient(135deg,#FDE8DC,#F5D6D6)}
.sc-tag{font-size:11px;font-weight:500;letter-spacing:.8px;color:var(--ts);background:rgba(255,255,255,.75);backdrop-filter:blur(4px);padding:5px 14px;border-radius:20px;z-index:1}
.sc-bd{padding:22px 24px 24px}
.sc-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:18px;font-weight:600;color:var(--tx);letter-spacing:1px;margin-bottom:4px}
.en .sc-t{font-family:'Playfair Display','Noto Serif SC',serif}
.sc-au{font-size:13px;color:var(--tm);letter-spacing:.5px;margin-bottom:12px}
.sc-d{font-size:14px;color:var(--ts);line-height:1.7;letter-spacing:.3px;margin-bottom:18px}
.sc-lk{font-size:13px;font-weight:500;color:var(--tx);letter-spacing:.5px;transition:all .3s}
.sc-lk:hover{color:var(--p2);letter-spacing:1.5px}

/* ====== CREATOR — 3D Desktop PSP Scene ====== */
.creator{padding-bottom:100px}
.desktop-scene{
  position:relative;
  max-width:620px;margin:0 auto;
  padding:40px 20px 60px;
  display:flex;flex-direction:column;align-items:center;
}

/* Wall background */
.desk-wall{
  position:absolute;top:0;left:0;right:0;height:60%;
  background:linear-gradient(180deg,#F7F0ED 0%,#FAF5F2 100%);
  border-radius:24px 24px 0 0;z-index:0;
}

/* Table surface */
.desk-table{
  position:absolute;bottom:0;left:-10%;right:-10%;height:45%;
  background:linear-gradient(180deg,#F0E8E4 0%,#E8DED8 100%);
  border-radius:50% 50% 0 0;
  box-shadow:inset 0 8px 20px rgba(180,150,140,.15);
  z-index:0;
  transform:perspective(600px) rotateX(2deg);
}

/* Decorative items */
.deco{position:absolute;z-index:1;pointer-events:none}
.deco-folder{top:20%;left:5%;animation:breathe 6s ease-in-out infinite}
.folder-body{width:36px;height:28px;background:linear-gradient(135deg,#F0D8DC,#E8C8CE);border-radius:4px 8px 8px 8px;position:relative;box-shadow:0 2px 8px rgba(180,140,140,.15)}
.folder-tab{position:absolute;top:-6px;left:4px;width:16px;height:8px;background:#E8C8CE;border-radius:4px 4px 0 0}
.deco-cup{top:15%;right:6%;animation:breathe 7s ease-in-out infinite 1s}
.cup-body{width:28px;height:24px;background:linear-gradient(135deg,#F5E4E0,#EDD4D0);border-radius:2px 2px 10px 10px;position:relative;box-shadow:0 2px 8px rgba(180,140,140,.12)}
.cup-handle{position:absolute;right:-8px;top:4px;width:8px;height:12px;border:2px solid #EDD4D0;border-left:none;border-radius:0 6px 6px 0;opacity:.6}
.cup-steam{position:absolute;top:-10px;width:2px;height:8px;background:rgba(180,150,140,.2);border-radius:1px;animation:steam 3s ease-in-out infinite}
.cup-steam.s1{left:6px;animation-delay:0s}
.cup-steam.s2{left:16px;animation-delay:1.5s}
@keyframes steam{0%,100%{opacity:0;transform:translateY(0) scaleX(1)}50%{opacity:.6;transform:translateY(-6px) scaleX(.5)}}
.deco-sticker{top:45%;left:3%;width:24px;height:24px;background:linear-gradient(135deg,rgba(232,213,232,.5),rgba(245,214,214,.5));border-radius:50%;animation:breathe 8s ease-in-out infinite .5s;box-shadow:0 1px 4px rgba(180,140,140,.1)}

/* PSP Console — floating 3D */
.psp{
  position:relative;z-index:2;
  width:100%;max-width:480px;
  background:linear-gradient(150deg,#FDDFE5 0%,#F7CCD4 35%,#F0C0CA 70%,#EBB8C4 100%);
  border-radius:36px 36px 32px 32px;
  padding:20px 20px 16px;
  box-shadow:
    0 30px 80px rgba(200,150,160,.3),
    0 10px 30px rgba(200,150,160,.2),
    inset 0 1px 0 rgba(255,255,255,.5),
    inset 0 -2px 0 rgba(180,120,130,.12);
  animation:breathe 6s ease-in-out infinite;
  transform-origin:center bottom;
}
@keyframes breathe{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-6px)}
}
.psp::before{
  content:'';position:absolute;top:0;left:6%;right:6%;height:40px;
  background:linear-gradient(180deg,rgba(255,255,255,.25),transparent);
  border-radius:36px 36px 50% 50%;pointer-events:none;
}

/* Speaker */
.psp-spk{display:flex;justify-content:center;gap:5px;padding:0 0 12px;position:relative;z-index:1}
.psp-spk span{width:16px;height:2.5px;background:rgba(255,255,255,.3);border-radius:2px}

/* Bezel */
.psp-bezel{
  background:linear-gradient(135deg,#3A2E38,#2A2028);
  border-radius:16px;padding:10px;
  box-shadow:inset 0 3px 12px rgba(0,0,0,.4);
}

/* Screen */
.psp-screen{background:#FFF8F5;border-radius:10px;height:260px;overflow:hidden;position:relative}

/* ====== Retro Window ====== */
.win{display:flex;flex-direction:column;height:100%}
.win-bar{
  display:flex;align-items:center;gap:6px;
  padding:6px 10px;
  background:linear-gradient(180deg,#F5E8E4,#EDE0DC);
  border-bottom:1px solid rgba(180,150,140,.15);
}
.win-dots{display:flex;gap:4px;flex-shrink:0}
.win-dots span{width:8px;height:8px;border-radius:50%}
.win-dots span:nth-child(1){background:#F5A0A0}
.win-dots span:nth-child(2){background:#F0D080}
.win-dots span:nth-child(3){background:#A0D0A0}
.win-nav{display:flex;gap:2px;overflow-x:auto;flex:1;justify-content:center;padding:0 4px}
.win-nav::-webkit-scrollbar{height:0}
.win-link{
  padding:3px 10px;border:none;border-radius:6px;
  font-size:10px;font-weight:500;letter-spacing:.3px;
  color:var(--ts);background:transparent;
  cursor:pointer;transition:all .3s;white-space:nowrap;font-family:inherit
}
.win-link:hover{color:var(--tx);background:rgba(180,150,140,.08)}
.win-link.active{color:var(--tx);background:rgba(255,255,255,.7);box-shadow:0 1px 3px rgba(0,0,0,.06)}
.win-spacer{width:8px;flex-shrink:0}

/* Window body */
.win-body{flex:1;overflow-y:auto;padding:14px 16px}
.win-body::-webkit-scrollbar{width:3px}
.win-body::-webkit-scrollbar-thumb{background:var(--p);border-radius:2px}
.win-panel{animation:fadeIn .3s}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.win-tt{font-family:'Noto Serif SC','Playfair Display',serif;font-size:14px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:8px}
.en .win-tt{font-family:'Playfair Display','Noto Serif SC',serif}
.win-tx{font-size:12px;color:var(--ts);line-height:1.7;letter-spacing:.3px;margin-bottom:12px}
.win-tags{display:flex;flex-wrap:wrap;gap:6px}
.win-tags span{font-size:10px;padding:4px 10px;background:rgba(245,214,214,.2);border-radius:12px;color:var(--ts);letter-spacing:.3px}

/* Projects */
.win-projects{display:flex;flex-direction:column;gap:8px}
.win-proj{display:flex;gap:10px;align-items:center;padding:8px 10px;background:var(--bg);border-radius:10px;transition:box-shadow .3s}
.win-proj:hover{box-shadow:0 2px 8px rgba(154,120,140,.08)}
.proj-icon{width:32px;height:32px;border-radius:8px;flex-shrink:0;position:relative}
.proj-icon::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:14px;height:14px;background:var(--tx);mask-size:contain;-webkit-mask-size:contain;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat}
.pj-0{background:linear-gradient(135deg,rgba(245,214,214,.3),rgba(232,213,232,.3))}.pj-0::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M2 12h20'/%3E%3Cpath d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M2 12h20'/%3E%3Cpath d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'/%3E%3C/svg%3E")}
.pj-1{background:linear-gradient(135deg,rgba(232,213,232,.3),rgba(245,214,214,.3))}.pj-1::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5z'/%3E%3Cpath d='M2 17l10 5 10-5'/%3E%3Cpath d='M2 12l10 5 10-5'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5z'/%3E%3Cpath d='M2 17l10 5 10-5'/%3E%3Cpath d='M2 12l10 5 10-5'/%3E%3C/svg%3E")}
.pj-2{background:linear-gradient(135deg,rgba(245,214,214,.3),rgba(232,213,232,.3))}.pj-2::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E")}
.win-proj h5{font-size:12px;font-weight:600;color:var(--tx);letter-spacing:.3px;margin-bottom:2px}
.win-proj p{font-size:10px;color:var(--ts);line-height:1.4;letter-spacing:.2px}

/* Skills */
.win-skills{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}
.win-skill{display:flex;align-items:center;gap:8px;padding:8px 10px;background:var(--bg);border-radius:10px;font-size:11px;color:var(--tx);transition:box-shadow .3s}
.win-skill:hover{box-shadow:0 2px 8px rgba(154,120,140,.08)}
.skill-icon{width:24px;height:24px;border-radius:6px;flex-shrink:0;position:relative}
.skill-icon::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:12px;height:12px;background:var(--ts);mask-size:contain;-webkit-mask-size:contain;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat}
.sk-0{background:rgba(245,214,214,.2)}.sk-0::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E")}
.sk-1{background:rgba(232,213,232,.2)}.sk-1::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E")}
.sk-2{background:rgba(245,214,214,.2)}.sk-2::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M2 12h20'/%3E%3Cpath d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M2 12h20'/%3E%3Cpath d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'/%3E%3C/svg%3E")}
.sk-3{background:rgba(232,213,232,.2)}.sk-3::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E")}
.sk-4{background:rgba(245,214,214,.2)}.sk-4::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpolygon points='12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2'/%3E%3Cline x1='12' y1='22' x2='12' y2='15.5'/%3E%3Cpolyline points='22 8.5 12 15.5 2 8.5'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpolygon points='12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2'/%3E%3Cline x1='12' y1='22' x2='12' y2='15.5'/%3E%3Cpolyline points='22 8.5 12 15.5 2 8.5'/%3E%3C/svg%3E")}
.sk-5{background:rgba(232,213,232,.2)}.sk-5::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3C/svg%3E")}

/* Contact */
.win-contact{text-align:center;padding:8px 0}
.win-contact .btn-s{padding:10px 28px;font-size:12px}

/* PSP middle area */
.psp-mid{display:flex;align-items:center;justify-content:space-between;padding:8px 8px 6px;position:relative;z-index:1}
.psp-dots{display:flex;gap:5px}
.psp-dots span{width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.3);cursor:pointer;transition:all .3s}
.psp-dots span.active{background:rgba(255,255,255,.7);width:14px;border-radius:3px}
.psp-brand{font-family:'Playfair Display',serif;font-size:9px;color:rgba(255,255,255,.45);letter-spacing:4px;text-transform:uppercase}

/* Controls */
.psp-ctrl{display:flex;align-items:center;justify-content:space-between;padding:4px 4px 0;position:relative;z-index:1}
.psp-dpad{display:grid;grid-template-columns:repeat(3,14px);grid-template-rows:repeat(3,14px);gap:2px}
.psp-dpad span{background:rgba(255,255,255,.22);border-radius:4px}
.psp-dpad span:nth-child(2){grid-column:2;grid-row:1}
.psp-dpad span:nth-child(5){grid-column:2;grid-row:2;background:rgba(255,255,255,.32)}
.psp-dpad span:nth-child(4){grid-column:1;grid-row:2}
.psp-dpad span:nth-child(6){grid-column:3;grid-row:2}
.psp-dpad span:nth-child(8){grid-column:2;grid-row:3}
.psp-acts{display:grid;grid-template-columns:28px 28px;grid-template-rows:28px 28px;gap:3px;align-items:center;justify-items:center}
.pbtn{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;font-family:'Inter',sans-serif}
.pbtn.triangle{grid-column:2;grid-row:1;background:rgba(255,255,255,.18);color:rgba(255,255,255,.5)}
.pbtn.circle{grid-column:2;grid-row:2;background:rgba(255,255,255,.12);color:rgba(255,255,255,.4)}
.pbtn.cross{grid-column:1;grid-row:2;background:rgba(255,255,255,.18);color:rgba(255,255,255,.5)}
.pbtn.square{grid-column:1;grid-row:1;background:rgba(255,255,255,.12);color:rgba(255,255,255,.4)}

/* ====== RESPONSIVE ====== */

/* ====== RESPONSIVE ====== */
@media(max-width:768px){
  .sc-grid{grid-template-columns:1fr;gap:20px}
  .desktop-scene{padding:20px 12px 40px}
  .psp{max-width:100%;border-radius:28px;padding:16px 14px 12px}
  .psp-screen{height:220px}
  .psp-bezel{border-radius:12px;padding:8px}
  .win-bar{padding:4px 8px;gap:4px}
  .win-link{font-size:9px;padding:2px 8px}
  .win-body{padding:10px 12px}
  .deco{transform:scale(.7)}
  .deco-folder{top:10%;left:2%}
  .deco-cup{top:8%;right:2%}
}
@media(max-width:640px){
  .hz{padding:120px 0 60px}
  .sxn{padding:64px 0 80px}
  .sc-im{height:150px}
  .desktop-scene{padding:12px 8px 30px}
  .psp{border-radius:24px;padding:14px 10px 10px}
  .psp-screen{height:200px}
  .win-link{font-size:8px;padding:2px 6px}
  .win-tt{font-size:13px}
  .win-tx{font-size:11px}
  .psp-spk span{width:12px}
  .psp-dpad{grid-template-columns:repeat(3,11px);grid-template-rows:repeat(3,11px)}
  .pbtn{width:20px;height:20px;font-size:10px}
  .psp-acts{grid-template-columns:24px 24px;grid-template-rows:24px 24px}
  .win-skills{grid-template-columns:1fr}
  .deco{display:none}
}
</style>
