import { WAMessageStubType } from '@whiskeysockets/baileys'

function formatFecha(date = new Date()) {
    return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}

async function generarBienvenida({ userIds, groupMetadata, chat }) {
    const mentions = userIds
    const usernames = userIds.map(u => `@${u.split('@')[0]}`).join(' ')

    // 📌 Texto central (setwelcome > descripción > nada)
    let reglasTexto = null

    if (chat?.setwelcome) {
        reglasTexto = chat.setwelcome.trim()
    } else if (groupMetadata?.desc) {
        reglasTexto = groupMetadata.desc.trim()
    }

    // 🔇 Si no hay nada, no mandar mensaje
    if (!reglasTexto) return null

    const groupName = groupMetadata.subject || 'este grupo'
    const total = groupMetadata.participants?.length || 0
    const fecha = formatFecha()

    const caption = `
╭┈┈┈┈┈┈┈┈┈┈┈┈┈≫
┊🍂 𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝@ ${usernames}
┊🍁 A ${groupName}
┊🍂 𝐈𝐧𝐜𝐫𝐞𝐢𝐛𝐥𝐞 𝐀𝐡𝐨𝐫𝐚 𝐬𝐨𝐦𝐨𝐬 ${total}.
┊🍁 𝐅𝐞𝐜𝐡𝐚 » ${fecha}
┊🍓 ╭┈┈┈┈┈┈┈┈┈┈┈┈┈
┊📌𝙍𝙚𝙘𝙪𝙚𝙧𝙙𝙖 𝙇𝙚𝙚𝙧 𝙇𝙖𝙨 𝙍𝙚𝙜𝙡𝙖𝙨 :3
┊📝 👋🏻 Reglas:
${reglasTexto}
┊ > *BOT PROPIEDAD DE _EMPIRE BOT_ (RECUERDA QUE NO SOMOS GREMIO, NI AFILIADOS A ELLOS) SOMOS UN PROYECTO GRATIS E INDEPENDIENTE PARA SOCIEDADES*
╰──────────────────🍒
*Version 1.0*
╰┈┈┈┈┈┈┈┈┈┈┈┈┈≫
*©2026 • Powered by El Tío Judai*
╰┈┈┈┈┈┈┈┈┈┈┈┈┈≫
    `.trim()

    return { caption, mentions }
}

let handler = m => m

handler.before = async function (m, { conn, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return !0

    const chat = global.db.data.chats[m.chat]

    // 🔐 Control bot principal
    if (chat.primaryBot && conn.user.jid !== chat.primaryBot) throw !1

    // 🔔 Bienvenida activada
    if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
        let userIds = []

        if (Array.isArray(m.messageStubParameters))
            userIds = m.messageStubParameters
        else if (typeof m.messageStubParameters === 'string')
            userIds = [m.messageStubParameters]

        if (!userIds.length) return !0

        const data = await generarBienvenida({
            userIds,
            groupMetadata,
            chat
        })

        if (!data) return !0 // 🔇 silencio total

        await conn.sendMessage(
            m.chat,
            {
                text: data.caption,
                contextInfo: { mentionedJid: data.mentions }
            },
            { quoted: null }
        )
    }

    return !0
}

export { generarBienvenida }
export default handler