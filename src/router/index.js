import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/community',
    name: 'community',
    component: () => import('../views/CommunityView.vue'),
  },
  {
    path: '/community/:boardId',
    name: 'board',
    component: () => import('../views/BoardView.vue'),
    props: true,
  },
  {
    path: '/ai',
    name: 'ai-hub',
    component: () => import('../views/ai/AiHubView.vue'),
  },
  {
    path: '/ai/emotion',
    name: 'ai-emotion',
    component: () => import('../views/ai/AiEmotionView.vue'),
  },
  {
    path: '/ai/workshop',
    name: 'ai-workshop',
    component: () => import('../views/ai/AiWorkshopView.vue'),
  },
  {
    path: '/ai/character',
    name: 'ai-character',
    component: () => import('../views/ai/AiCharacterView.vue'),
  },
  {
    path: '/ai/healing',
    name: 'ai-healing',
    component: () => import('../views/ai/AiHealingView.vue'),
  },
  {
    path: '/ai/inspiration',
    name: 'ai-inspiration',
    component: () => import('../views/ai/AiInspirationView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
