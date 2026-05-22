import { reactive } from 'vue'

const storedUsers = JSON.parse(localStorage.getItem('ht_users') || '[]')
const storedCurrent = JSON.parse(localStorage.getItem('ht_current') || 'null')

export const userStore = reactive({
  users: storedUsers,
  currentUser: storedCurrent,

  loginByPhone(phone) {
    let u = this.users.find(x => x.phone === phone)
    if (!u) {
      u = { id: Date.now().toString(36)+Math.random().toString(36).slice(2,6), name: '用户'+phone.slice(-4), phone, createdAt: Date.now() }
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

  _save() { localStorage.setItem('ht_users', JSON.stringify(this.users)) },
})
