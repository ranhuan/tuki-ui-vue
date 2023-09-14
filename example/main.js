import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import tuki from '../src'


const app = createApp(App)

app.use(tuki)
app.mount('#app')
