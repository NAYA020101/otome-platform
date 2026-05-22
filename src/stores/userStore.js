import { reactive } from 'vue'

const storedUsers = JSON.parse(localStorage.getItem('ht_users') || '[]')
const storedCurrent = JSON.parse(localStorage.getItem('ht_current') || 'null')

export const userStore = reactive({
  users: storedUsers,
  currentUser: storedCurrent,

  loginByPhone(phone) {
    let u = this.users.find(x => x.phone === phone)
    if (!u) {
      u = { id: Date.now().toString(36)+Math.random().toString(36).slice(2,6), name: '用户'+phone.slice(-4), phone, avatar: null, bio: '', createdAt: Date.now() }
      this.users.push(u)
      this._save()
    }
    this.currentUser = { ...u }
    localStorage.setItem('ht_current', JSON.stringify(this.currentUser))
    return { ok: true }
  },

  logout() {
    this.currentUser = null
    localStorage.removeItem('ht_current')
  },

  updateProfile({ name, avatar, bio }) {
    if (!this.currentUser) return
    if (name !== undefined) this.currentUser.name = name
    if (avatar !== undefined) this.currentUser.avatar = avatar
    if (bio !== undefined) this.currentUser.bio = bio
    const u = this.users.find(x => x.id === this.currentUser.id)
    if (u) {
      if (name !== undefined) u.name = name
      if (avatar !== undefined) u.avatar = avatar
      if (bio !== undefined) u.bio = bio
    }
    this._save()
    localStorage.setItem('ht_current', JSON.stringify(this.currentUser))
  },

  _save() { localStorage.setItem('ht_users', JSON.stringify(this.users)) },
})
