// créditos y creador de código: El Tio Judai ✨
// Adaptado por xzzys26 🥷🏽

const thumb = 'https://files.catbox.moe/41kll3.jpg' // nueva imagen

let handler = async (m, { conn }) => {
  try {
    await m.react('⚡️')

    const uptime = clockString(process.uptime() * 1000)
    const modo = global.opts?.self ? 'Ⓟⓥ Privado' : 'Ⓟ Público'

    const menu = `
╭━━━〔 👑 *MENU* 👑 〕━━━⬣
┃ ❒ *Nombre*: *ASOCIACIÓN EMPIRE*
┃ ❒ *Creador*: *EL TIO JUDAI*
┃ ❒ *Estado*: *Ⓟ Público*
┃ ❒ *Uptime*: *00:00:00*
┃ ❒ *Premium*: *0*
┃ ❒ *Versión*: *10.5.0*
╰━━━━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 ⚡️ *ADMINISTRACIÓN* ⚡️ 〕━━━⬣

* Welcome 
💬 *Activa y desactivar las bienvenidas cuando ingresa alguien*

* Antilink
💬 *Borra automáticamente los links de WhatsApp y elimina al usuario que los manda*

* Modoadmin
💬 *Solo los admis pueden usar el bot*

* .todos
💬 *ETIQUETA A TODOS LOS INTEGRANTES* 

* .invocar 
💬 *ETIQUETA A TODOS LOS INTEGRANTES* 

* .emotag + emoji
💬 *Personaliza el emoji que sale al lado al poner .todos*

* .setemoji + emoji
💬 *Personaliza el emoji que sale al lado al poner .todos*

* Delemoji
💬 *Elimina el emoji personalizado que elegimos con emotag poniéndolos aletorios como eran de defecto.*

* .n / hidetag/ Tag/ notify
💬 *Notifica a todos los integrantes ya sea imágenes, texto, audio o videos*

* Kick + @user
💬 *Elimina a un integrante solo etiquetandolos*

* .darpoder + @user 
💬 *Sube a administrador al que se etiqueta*

* .daradmin+ @user 
💬 *Sube a administrador al que se etiqueta*

* .quitarpoder + @user 
💬 *Quita  administrador al que se etiqueta*

* .quitaradmin + @user 
💬 *Quita al que se etiqueta*

* .mute + @user
💬 *Elimina automáticamente los mensajes de el usuario etiquetado*

╭━━━〔 📃 *SOCIEDAD* 📃 〕━━━⬣

📄.Revlist + emoji
* *Crea una lista de revisión semanal ideal para sociedades*

📄.Revlist1 + emoji
* *Crea una lista de revisión semanal ideal para sociedades*

📄.Revlist2 + emoji
* *Crea una lista de revisión semanal ideal para sociedades*

📄.Revlist3 + emoji
* *Crea una lista de revisión semanal ideal para sociedades*

📄.Revlist4 + emoji
* *Crea una lista de revisión semanal ideal para sociedades*

📄.Revlist5 + emoji
* *Crea una lista de revisión semanal ideal para sociedades*

📄.Revlist6 + emoji
* *Crea una lista de revisión semanal ideal para sociedades*

📄.Revlist7 + emoji
* *Crea una lista de revisión semanal ideal para sociedades*

📄.Revlist8 + emoji
* *Crea una lista de revisión semanal ideal para sociedades*

📄.Revlist9 + emoji
* *Crea una lista de revisión semanal ideal para sociedades*

📄.Revlist10 + emoji
* *Crea una lista de revisión semanal ideal para sociedades*

📄.Revlist11+ emoji
* *Crea una lista de revisión diaria ideal para sociedades*

📄.Revlist12 + emoji
* *Crea una lista de revisión diaria ideal para sociedades*

📄.Revlist13 + emoji
* *Crea una lista de revisión diaria ideal para sociedades*

📄.Revlist14 + emoji
* *Crea una lista de revisión diaria ideal para sociedades*

📄.Revlist15 + emoji
* *Crea una lista de revisión diaria ideal para sociedades*

╭━━━〔 🪖 *FREE FIRE* 🪖 〕━━━⬣

*  .4vs4
🔫 *Genera listas para un 4 vs 4 con sus diferencias horarias*

*  .6vs6
🔫 *Genera listas para un 6 vs 6 con sus diferencias horarias*

*  .8 vs 8
🔫 *Genera listas para un 8 vs 8  con sus diferencias horarias*

*  .12 vs 12
🔫 *Genera listas para un 12 vs 12 con sus diferencias horarias*

*  .16 vs 16
🔫 *Genera listas para un 16 vs 16 con sus diferencias horarias*

*  .20 vs 20
🔫 *Genera listas para un 20 vs 20 con sus diferencias horarias*

*  .24vs 24
🔫 *Genera listas para un 24 vs 24 con sus diferencias horarias*

╭━━━〔 📱 *Entretenimiento* 📱 〕━━━⬣

* .Play + nombre de cancion
🪩 *Descarga una canción y la manda en formato de audio*

* .Tiktok + url
🪩 *Descarga un video sin marca de agua de esta plataforma*

* .Fb + url
🪩 *Descarga un video sin marca de agua de facebook*

╭━━━〔 🫟 *Herramientas* 🫟 〕━━━⬣

* .S + img
🎨 *Hace sticker a la imagen a la cual respondas con este comando*

* .Qc + texto
🎨 *Crea un sticker con el texto que escribas*

* Qc2 + texto 
🎨 *Crea un sticker con el texto que escribas*

* Toimg + Stickers
 🎨 *Hace imagen al sticker al cual respondes*

* Whatmusic + audio
🎨 *Busca el titulo de la canción a la cual respondes*

* Toaudio + video
🎨 *Convierte el video en autio*

╭━━━〔 💸 *Ventas* 💸 〕━━━⬣

* .Setpago+ texto o imagen 
💴 *Crea tú forma de pago y la almacena de forma individual por grupo en el bot* 

* .Pago
💴 *Muestra la informacion  guardada de su .set*

* .Setpago2+ texto o imagen 
💴 *Crea tú forma de pago y la almacena de forma individual por grupo en el bot* 

* .Pago2
💴 *Muestra la informacion  guardada de su .set*

* .Setdiamantes texto o imagen 
💴 *Crea tú forma de pago y la almacena de forma individual por grupo en el bot* 

* . Diamantes 
💴 *Muestra la informacion  guardada de su .set*

* .Setroblox texto o imagen 
💴 *Crea tú forma de pago y la almacena de forma individual por grupo en el bot* 
* .Roblox
💴 *Muestra la informacion  guardada de su .set*

* .Setplataformas texto o imagen 
💴 *Crea tú forma de pago y la almacena de forma individual por grupo en el bot* 

* .Plataformas
💴 *Muestra la informacion  guardada de su .set*

* .Setfiltro texto o imagen 
💴 *Crea tú forma de pago y la almacena de forma individual por grupo en el bot* 

* .Filtros
💴 *Muestra la informacion  guardada de su .set*

* .Setpavos texto o imagen 
💴 *Crea tú forma de pago y la almacena de forma individual por grupo en el bot* 

* .Pavos
💴 *Muestra la informacion  guardada de su .set*


> 👑 Powered by El Tio Judai en tiktok🥷🏽
    `.trim()

    await conn.sendMessage(m.chat, {
      text: menu,
      contextInfo: {
        externalAdReply: {
          title: '👑 MENÚ PRINCIPAL 👑',
          body: 'ASOCIACIÓN EMPIRE',
          thumbnailUrl: thumb, // aquí está la nueva imagen
          sourceUrl: '',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    await m.react('✅')

  } catch (e) {
    console.error(e)
    await m.reply('❌ Ocurrió un error al mostrar el menú.')
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'allmenu']
handler.register = true

export default handler

// Función para uptime
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}