/* =============================================================
   她叙 · Her Tale — 不文明用语过滤
   ============================================================= */
const badWords = [
  'fuck','fucking','motherfucker','shit','bullshit','asshole','bitch',
  'bastard',' damn ','crap','dick','whore','slut','porn','porno',
  'suck my','kiss my ass','screw you',
  '傻逼','傻b','傻Ｂ','煞笔','沙比',
  '操你妈','草你妈','艹你妈','操你','草你',
  '草泥马','去你妈的','去你吗的',
  '尼玛','你妈','tmlgb','tmd','tnnd','cnm','nmsl',
  '他妈','他妈的','特么','去死','去死吧','死吧',
  '滚蛋','给老子滚','滚你妈','垃圾','废物','废柴',
  '白痴','脑残','智障','低能','贱人','婊子','骚货',
  '贱货','色情','黄色','约炮','暴力','杀人','自杀',
  '强奸','强暴','恶心','不要脸',
]

export function filterText(text) {
  if (!text) return text
  let r = text
  for (const w of badWords) {
    try { r = r.replace(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'),m=>'*'.repeat(m.length)) } catch {}
  }
  return r
}

export function hasBadWords(text) {
  if (!text) return false
  const l = text.toLowerCase()
  return badWords.some(w => l.includes(w.toLowerCase()))
}

export const filterWarn = (locale) => locale === 'zh'
  ? '💜 这是一个温暖友好的空间。请用温柔尊重的语言表达你的想法。'
  : '💜 This is a warm, friendly space. Please express with kindness and respect.'

export const filterNotice = (locale) => locale === 'zh'
  ? '🌷 你的内容已自动过滤不合规词汇。'
  : '🌷 Your content has been auto-filtered.'
