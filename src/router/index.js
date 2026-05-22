import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/stories',
    name: 'stories',
    component: () => import('../views/StoriesView.vue'),
  },
  {
    path: '/creators',
    name: 'creators',
    component: () => import('../views/CreatorsView.vue'),
  },
  {
    path: '/stories/:id',
    name: 'story-detail',
    component: () => import('../views/StoryDetailView.vue'),
    props: true,
  },
  {
    path: '/creators/:id',
    name: 'creator-detail',
    component: () => import('../views/CreatorDetailView.vue'),
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
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
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
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
