import { reactive } from 'vue'

const storedUsers = JSON.parse(localStorage.getItem('ht_users') || '[]')
const storedCurrent = JSON.parse(localStorage.getItem('ht_current') || 'null')

export const userStore = reactive({
  users: storedUsers,
  currentUser: storedCurrent,

  register(name, pw) {
    const n = name.trim()
    if (n.length < 2) return { ok: false, msg: { zh: '用户名至少2个字符', en: 'Username needs at least 2 characters' } }
    if (pw.length < 4) return { ok: false, msg: { zh: '密码至少4个字符', en: 'Password needs at least 4 characters' } }
    if (this.users.find(u => u.name === n)) return { ok: false, msg: { zh: '该用户名已被注册', en: 'Username already exists' } }
    const u = { id: Date.now().toString(36)+Math.random().toString(36).slice(2,6), name: n, password: pw, avatar: null, bio: '', createdAt: Date.now() }
    this.users.push(u)
    this._save()
    return { ok: true }
  },

  login(name, pw) {
    const u = this.users.find(x => x.name === name && x.password === pw)
    if (!u) return { ok: false, msg: { zh: '用户名或密码错误', en: 'Invalid username or password' } }
    this.currentUser = { ...u }
    localStorage.setItem('ht_current', JSON.stringify(this.currentUser))
    return { ok: true }
  },

  logout() {
    this.currentUser = null
    localStorage.removeItem('ht_current')
  },

  updateAvatar(dataUrl) {
    if (!this.currentUser) return
    this.currentUser.avatar = dataUrl
    const u = this.users.find(x => x.id === this.currentUser.id)
    if (u) u.avatar = dataUrl
    this._save()
    localStorage.setItem('ht_current', JSON.stringify(this.currentUser))
  },

  updateBio(bio) {
    if (!this.currentUser) return
    this.currentUser.bio = bio
    const u = this.users.find(x => x.id === this.currentUser.id)
    if (u) u.bio = bio
    this._save()
    localStorage.setItem('ht_current', JSON.stringify(this.currentUser))
  },

  _save() { localStorage.setItem('ht_users', JSON.stringify(this.users)) },
})
