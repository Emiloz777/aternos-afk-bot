// === Aternos AFK Bot (cracked serwery) ===
const mineflayer = require('mineflayer')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// === Ustawienia serwera Minecraft ===
const HOST = process.env.MC_HOST || 'Vexpvp.aternos.me' // adres serwera
const PORT_MC = process.env.MC_PORT || 18891                // port serwera
const USERNAME = process.env.MC_USER || 'afkzone_0'             // nick bota
const PASSWORD = process.env.MC_PASS || null                 // jeśli masz AuthMe

// === Serwer HTTP keepalive (żeby Render nie usypiał) ===
app.get('/', (req, res) => res.send('✅ Bot działa 24/7'))
app.listen(PORT, () => console.log(`[WEB] HTTP działa na porcie ${PORT}`))

// === Funkcja tworząca bota ===
function createBot() {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT_MC,
    username: USERNAME,
    version: '1.21.10' // <-- wersja Minecraft serwera
  })

  bot.on('spawn', () => {
    console.log(`[BOT] Zalogowano jako ${USERNAME}`)
    
    if (PASSWORD) {
      setTimeout(() => {
        bot.chat(`/login ${PASSWORD}`)
        console.log('[BOT] Wysłano /login')
      }, 2000)
    }

    // Prosty AFK - obrót co 5 minut, żeby bot nie został wyrzucony
    setInterval(() => {
      bot.look(Math.random() * 360, 0)
    }, 5 * 60 * 1000)
  })

  bot.on('end', () => {
    console.log('[BOT] Rozłączony — restart za 10s...')
    setTimeout(createBot, 10000)
  })

  bot.on('error', err => {
    console.log('[BOT] Błąd:', err.message)
  })
}

// Uruchamiamy bota
createBot()

