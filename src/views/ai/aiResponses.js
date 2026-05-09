/* AI response simulator — generates contextual replies from keyword patterns */

const zhEmotions = [
  '我明白你的感受。有时候，仅仅是被倾听，就足够让心变得柔软一些。💜',
  '你的情绪是真实的，也是被允许的。在这里，你可以做最真实的自己。',
  '我感受到了你话语中的温度。谢谢你愿意和我分享这些。',
  '每个人的心里都有一片柔软的地方。你愿意说出来，已经很有勇气了。',
  '这种感受我听懂了。让我们一起慢慢梳理，好吗？🌷',
  '你的感受很重要。在这个空间里，每一种情绪都值得被温柔对待。',
  '我在这里陪着你。不需要刻意说些什么，安静的陪伴也是一种力量。',
  '有时候，表达本身就是一种治愈。你做得很好。',
]

const enEmotions = [
  'I understand how you feel. Sometimes just being heard is enough to soften the heart. 💜',
  'Your feelings are real and valid. Here, you can be your truest self.',
  'I can feel the warmth in your words. Thank you for sharing with me.',
  'Everyone has a tender place inside. You are brave to speak it out.',
  'I hear you. Let us take it slowly together, okay? 🌷',
  'Your feelings matter. In this space, every emotion deserves gentle care.',
  'I am here with you. No need to force words — quiet company is also a kind of strength.',
  'Sometimes expression itself is healing. You are doing wonderfully.',
]

export function getEmotionResponse(text, locale) {
  const pool = locale === 'zh' ? zhEmotions : enEmotions
  const idx = Math.abs(hash(text)) % pool.length
  return pool[idx]
}

function hash(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0 }
  return h
}

export function getWorkshopSuggestion(type, input, locale) {
  if (locale === 'zh') {
    if (type === 'co-create') return `✨ 基于你的想法，我为你延展了一段剧情：\n\n${input}……\n\n她推开门，风从远方吹来，带着未知世界的气息。她不知道这条路通向哪里，但她的脚步没有犹豫。因为这一次，她选择相信自己。\n\n你可以继续补充细节，我们一起把这个故事变得更加完整。`
    if (type === 'polish') return `💫 我来帮你打磨这段对白：\n\n原句：${input}\n\n润色建议：\n「${input.replace(/[，。！？]$/, '')}」——她的声音很轻，却像一颗石子落入静水，在他心里漾开层层涟漪。\n\n你觉得这个方向如何？我可以继续调整。`
    if (type === 'rewrite') return `🔄 反套路改写：\n\n常见套路：${input}\n\n改写建议：\n她没有被救。她救了自己。\n她不需要谁来完成她的故事——她本身就是故事的主角。\n当所有人都期待她走向那个命中注定的他时，她转身走向了属于自己的方向。`
  } else {
    if (type === 'co-create') return `✨ Based on your idea, I have extended a storyline:\n\n${input}...\n\nShe pushes open the door, wind blowing from afar, carrying the scent of an unknown world. She does not know where this road leads, but her steps do not waver. Because this time, she chooses to believe in herself.\n\nYou can continue adding details — let us make this story complete together.`
    if (type === 'polish') return `💫 Let me polish this dialogue:\n\nOriginal:\n${input}\n\nPolished:\n"${input.replace(/[.!?]$/, '')}" — her voice was soft, yet like a pebble into still water, it stirred ripples in his heart.\n\nWhat do you think of this direction? I can adjust further.`
    if (type === 'rewrite') return `🔄 Anti-trope rewrite:\n\nCommon trope:\n${input}\n\nRewrite:\nShe was not saved. She saved herself.\nShe does not need anyone to complete her story — she IS the protagonist of her own tale.\nWhen everyone expected her to walk toward her destined love, she turned and walked toward her own direction.`
  }
}

export function getCharacterIntro(charId, locale) {
  const chars = locale === 'zh' ? {
    luna: { name: '露娜 · 星际旅人', greet: '你好，旅行者。星辰之间，我们的故事刚刚开始。', desc: '一位来自遥远星系的探索者，温柔而坚定，相信每一个相遇都有意义。' },
    lien: { name: '林鸢 · 民国画师', greet: '你来了。我刚好画完一幅画——画里有风，有光，还有你。', desc: '1920年代的独立女性画家，用画笔记录时代，用温柔对抗世界。' },
    sera: { name: '塞拉 · 未来诗者', greet: '你听到了我的诗。那首诗，是为你写的。', desc: '来自2065年的诗人，相信情感是跨越时间的唯一货币。' },
  } : {
    luna: { name: 'Luna · Star Traveler', greet: 'Hello, traveler. Among the stars, our story has just begun.', desc: 'An explorer from a distant galaxy — gentle yet determined, believing every encounter has meaning.' },
    lien: { name: 'Lien · Republic Era Artist', greet: 'You are here. I just finished a painting — with wind, light, and you in it.', desc: 'An independent female painter from the 1920s, recording her era with brushes.' },
    sera: { name: 'Sera · Future Poet', greet: 'You heard my poem. That poem was written for you.', desc: 'A poet from 2065, believing emotion is the only currency that transcends time.' },
  }
  return chars[charId] || chars.luna
}

export function getHealingRewrite(input, locale) {
  if (locale === 'zh') {
    return `🌷 遗憾改写：\n\n你的原稿：${input}\n\n改写结局：\n\n如果时光可以重来，这一次，她选择了不同的路。\n\n她不再等待。她走向他，在一切都还来得及的时候，说出了那些藏在心底许多年的话。\n\n「我一直想告诉你——」她停顿了一下，眼泪在笑眼里打转，「谢谢你出现在我的故事里。」\n\n故事的结局不再是离别。而是两个灵魂，在平行的宇宙里，终于找到了彼此。\n\n💜 每一次的遗憾，都是另一种可能的起点。`
  } else {
    return `🌷 Healing rewrite:\n\nYour original:\n${input}\n\nRewritten ending:\n\nIf time could turn back, this time, she chose a different path.\n\nShe no longer waits. She walks toward him, while there is still time, and speaks the words buried in her heart for years.\n\n"I have always wanted to tell you —" she pauses, tears sparkling in her smiling eyes, "thank you for appearing in my story."\n\nThe ending is no longer goodbye. It is two souls, in a parallel universe, finally finding each other.\n\n💜 Every regret is the beginning of another possibility.`
  }
}

export function getInspiration(type, locale) {
  const pool = locale === 'zh' ? {
    premise: [
      '一位天才女科学家在实验意外中穿越到自己设计的游戏世界，发现所有角色都有了自我意识。',
      '在女性被禁止接受教育的王国里，一位少女每晚借着月光偷学魔法，最终成为史上最强大的女法师。',
      '未来世界，情感被列为违禁品。一个地下组织「心动社」秘密守护着人类最后的浪漫。',
      '她是一名时间修复师，专门修补被遗憾侵蚀的时空裂缝。直到有一天，她遇到了自己的裂缝。',
    ],
    character: [
      '她 · 沉默的守护者：话很少，每一个行动都充满力量。有过往，但不被过往定义。',
      '她 · 镜中之人：能够映照出他人内心的真实愿望，却一直在寻找自己的愿望。',
      '她 · 星辰编织者：用星光编织命运之线，却为自己的命运留下了空白。',
      '她 · 逆时者：从未来回到现在，不是为了改变历史，而是为了不错过那个重要的人。',
    ],
    twist: [
      '那个被全城通缉的「魔女」，其实是拯救世界的唯一希望。',
      '所谓「命中注定的恋人」，其实是女主自己创造出来的完美灵魂伴侣。',
      '反派不是别人，而是女主从未来回来的自己——为了阻止一场更大的悲剧。',
      '他并不是人类，而是女主童年时画的一幅画，因为她的思念而活了过来。',
    ],
  } : {
    premise: [
      'A genius female scientist accidentally穿越 into her own game design, finding all characters have gained self-awareness.',
      'In a kingdom where women are banned from education, a girl secretly studies magic by moonlight, eventually becoming the most powerful sorceress in history.',
      'In a future where emotions are outlawed, an underground organization "Heartbeat Society" secretly protects the last traces of romance.',
      'She is a time repairer, mending时空裂缝 eroded by regret. Until one day, she encounters her own裂缝.',
    ],
    character: [
      'She · Silent Guardian: Few words, every action full of power. Has a past but not defined by it.',
      'She · Mirror Being: Can reflect others\' deepest desires, yet searches for her own.',
      'She · Star Weaver: Weaves destiny threads with starlight, but left her own destiny blank.',
      'She · Time Reverser: Returns from the future, not to change history, but to not miss that important person.',
    ],
    twist: [
      'The "witch" wanted by the entire city is actually the only hope to save the world.',
      'The "fated lover" is actually a perfect soulmate created by the heroine herself.',
      'The villain is none other than the heroine from the future — here to prevent an even greater tragedy.',
      'He is not human, but a painting the heroine drew as a child, brought to life by her longing.',
    ],
  }
  const items = pool[type] || pool.premise
  return items[Math.floor(Math.random() * items.length)]
}
