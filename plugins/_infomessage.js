import WAMessageStubType from '@whiskeysockets/baileys'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

const lidCache = new Map()
const handler = m => m

handler.before = async function (m, { conn, participants }) {
    if (!m.messageStubType || !m.isGroup) return

    const chat = global.db.data.chats[m.chat]
    if (!chat?.detect) return

    const primaryBot = chat.primaryBot
    if (primaryBot && conn.user.jid !== primaryBot) throw false

    const users = m.messageStubParameters?.[0]
    const usuario = await resolveLidToRealJid(m.sender, conn, m.chat)
    const groupAdmins = participants.filter(p => p.admin)

    const mentionsBase = [usuario, ...groupAdmins.map(v => v.id)]

    // ───── MENSAJES ─────
    const nombre = `╭━〔✦ NOMBRE DEL GRUPO CAMBIADO ✦〕━╮
┃ > @${usuario.split('@')[0]} ha cambiado el nombre del grupo.
┃ > Nuevo nombre: *${m.messageStubParameters[0]}*
╰━━━━━━━━━━━━╯`

    const foto = `╭━〔✦ IMAGEN DEL GRUPO CAMBIADA ✦〕━╮
┃ > Acción hecha por: @${usuario.split('@')[0]}
╰━━━━━━━━━━━━╯`

    const edit = `╭━〔✦ CONFIGURACIÓN DEL GRUPO ✦〕━╮
┃ > @${usuario.split('@')[0]} ha permitido que ${
        m.messageStubParameters[0] === 'on' ? 'solo admins' : 'todos'
    } puedan configurar el grupo.
╰━━━━━━━━━━━━╯`

    const newlink = `╭━〔✦ ENLACE DEL GRUPO RESTABLECIDO ✦〕━╮
┃ > Acción hecha por: @${usuario.split('@')[0]}
╰━━━━━━━━━━━━╯`

    const status = `╭━〔✦ ESTADO DEL GRUPO ✦〕━╮
┃ > El grupo fue ${
        m.messageStubParameters[0] === 'on' ? '*cerrado*' : '*abierto*'
    } por @${usuario.split('@')[0]}
┃ > Ahora ${
        m.messageStubParameters[0] === 'on' ? '*solo admins*' : '*todos*'
    } pueden enviar mensajes.
╰━━━━━━━━━━━━╯`

    const admingp = `╭━〔✦ NUEVO ADMIN ✦〕━╮
┃ > @${users?.split('@')[0]} ahora es admin del grupo.
┃ > Acción hecha por: @${usuario.split('@')[0]}
╰━━━━━━━━━━━━╯`

    const noadmingp = `╭━〔✦ ADMIN REMOVIDO ✦〕━╮
┃ > @${users?.split('@')[0]} ya no es admin del grupo.
┃ > Acción hecha por: @${usuario.split('@')[0]}
╰━━━━━━━━━━━━╯`

    // ───── LIMPIEZA DE SESIONES (evitar undefined) ─────
    if (m.messageStubType === 2 && chat.detect) {
        const uniqid = m.chat.split('@')[0]
        const sessionPath = `./${sessions}/`
        for (const file of await fs.promises.readdir(sessionPath)) {
            if (file.includes(uniqid)) {
                await fs.promises.unlink(path.join(sessionPath, file))
                console.log(
                    `${chalk.yellow.bold('✎ Delete!')} ${chalk.greenBright(file)}`
                )
            }
        }
    }

    // ───── ENVÍO DE MENSAJES ─────
    switch (m.messageStubType) {

        case 21:
            await conn.sendMessage(m.chat, {
                text: nombre,
                contextInfo: { mentionedJid: mentionsBase }
            })
        break

        case 22: // ya NO envía imagen
            await conn.sendMessage(m.chat, {
                text: foto,
                contextInfo: { mentionedJid: mentionsBase }
            })
        break

        case 23:
            await conn.sendMessage(m.chat, {
                text: newlink,
                contextInfo: { mentionedJid: mentionsBase }
            })
        break

        case 25:
            await conn.sendMessage(m.chat, {
                text: edit,
                contextInfo: { mentionedJid: mentionsBase }
            })
        break

        case 26:
            await conn.sendMessage(m.chat, {
                text: status,
                contextInfo: { mentionedJid: mentionsBase }
            })
        break

        case 29:
            await conn.sendMessage(m.chat, {
                text: admingp,
                contextInfo: {
                    mentionedJid: [usuario, users, ...groupAdmins.map(v => v.id)].filter(Boolean)
                }
            })
        break

        case 30:
            await conn.sendMessage(m.chat, {
                text: noadmingp,
                contextInfo: {
                    mentionedJid: [usuario, users, ...groupAdmins.map(v => v.id)].filter(Boolean)
                }
            })
        break

        default:
            if (m.messageStubType !== 2) {
                console.log({
                    stub: m.messageStubType,
                    params: m.messageStubParameters,
                    type: WAMessageStubType[m.messageStubType]
                })
            }
    }
}

export default handler

// ───── RESOLVER LID → JID REAL ─────
async function resolveLidToRealJid(lid, conn, groupChatId) {
    const jid = lid?.toString()
    if (!jid?.endsWith('@lid') || !groupChatId?.endsWith('@g.us')) {
        return jid.includes('@') ? jid : `${jid}@s.whatsapp.net`
    }

    if (lidCache.has(jid)) return lidCache.get(jid)

    try {
        const metadata = await conn.groupMetadata(groupChatId)
        for (const p of metadata.participants) {
            const wa = await conn.onWhatsApp(p.id)
            if (wa?.[0]?.lid === jid) {
                lidCache.set(jid, p.id)
                return p.id
            }
        }
    } catch {}

    lidCache.set(jid, jid)
    return jid
}
