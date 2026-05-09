<template>
  <Teleport to="body">
    <div v-if="userStore.showProfile && userStore.currentUser" class="mm" @click.self="userStore.showProfile = false">
      <div class="mp pp">
        <button class="mc" @click="userStore.showProfile = false">✕</button>
        <div class="paw"><div class="pab"><img v-if="userStore.currentUser.avatar" :src="userStore.currentUser.avatar" alt="" /><span v-else class="pap">{{ userStore.currentUser.name[0]?.toUpperCase()||'?' }}</span><label class="pau"><input type="file" accept="image/*" @change="onUpload" /><span>{{ locale==='zh'?'更换':'Edit' }}</span></label></div><h3 class="pn">{{ userStore.currentUser.name }}</h3></div>
        <div class="pfb"><label>{{ locale==='zh'?'个人签名':'Bio' }}</label><textarea v-model="bio" :placeholder="locale==='zh'?'写一句温柔的话介绍一下自己吧 🌷':'Write something gentle about yourself 🌷'" rows="3" @blur="userStore.updateBio(bio)"></textarea></div>
        <div class="pmt"><span>{{ locale==='zh'?'加入于':'Joined' }}: {{ new Date(userStore.currentUser.createdAt).toISOString().slice(0,10) }}</span></div>
        <button class="blo" @click="userStore.logout(); userStore.showProfile=false">{{ locale==='zh'?'退出登录':'Log Out' }}</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, inject } from 'vue'
import { userStore } from '../stores/userStore.js'

const locale = inject('locale')
const bio = ref(userStore.currentUser?.bio||'')

function onUpload(e){
  const file=e.target.files?.[0];if(!file)return
  const r=new FileReader()
  r.onload=ev=>userStore.updateAvatar(ev.target.result)
  r.readAsDataURL(file)
}
</script>

<style scoped>
.mm{position:fixed;inset:0;background:rgba(74,68,83,.35);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:200;padding:20px;animation:fI .3s ease}
@keyframes fI{from{opacity:0}to{opacity:1}}
.mp{background:#fff;border-radius:20px;width:100%;max-width:400px;padding:40px 32px;position:relative;box-shadow:0 24px 64px rgba(74,68,83,.12);animation:sU .35s cubic-bezier(.25,.46,.45,.94)}
@keyframes sU{from{opacity:0;transform:translateY(24px)scale(.97)}to{opacity:1;transform:translateY(0)scale(1)}}
.mc{position:absolute;top:16px;right:20px;font-size:18px;color:var(--tm);background:none;border:none;cursor:pointer;transition:color .3s;padding:4px;line-height:1}
.mc:hover{color:var(--tx)}
.paw{text-align:center;margin-bottom:28px}
.pab{position:relative;width:80px;height:80px;margin:0 auto 12px}
.pab img{width:100%;height:100%;border-radius:50%;object-fit:cover}
.pap{display:flex;align-items:center;justify-content:center;width:100%;height:100%;border-radius:50%;background:var(--p);color:#fff;font-size:28px;font-weight:600;font-family:'Playfair Display',serif}
.pau{position:absolute;bottom:0;right:-4px;background:var(--tx);color:#fff;border-radius:20px;padding:3px 10px;font-size:11px;cursor:pointer;transition:background .3s}
.pau:hover{background:#5C5568}
.pau input{display:none}
.pn{font-family:'Noto Serif SC','Playfair Display',serif;font-size:20px;font-weight:600;color:var(--tx);letter-spacing:1px}
.pfb{margin-bottom:20px}
.pfb label{display:block;font-size:12px;font-weight:500;color:var(--ts);letter-spacing:1px;text-transform:uppercase;margin-bottom:8px}
.pfb textarea{width:100%;padding:12px 14px;border:1.5px solid var(--bd);border-radius:12px;font-size:14px;font-family:inherit;color:var(--tx);background:var(--bg);resize:vertical;outline:none;transition:border-color .3s;box-sizing:border-box}
.pfb textarea:focus{border-color:var(--p)}
.pfb textarea::placeholder{color:var(--tm)}
.pmt{text-align:center;font-size:12px;color:var(--tm);margin-bottom:24px}
.blo{width:100%;padding:12px;border:1.5px solid var(--bd);border-radius:12px;background:transparent;color:var(--ts);font-size:14px;font-family:inherit;cursor:pointer;transition:all .3s;letter-spacing:.5px}
.blo:hover{border-color:var(--r);color:var(--r)}
</style>
