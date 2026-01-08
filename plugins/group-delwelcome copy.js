let handler = async (m, { isAdmin }) => {
    if (!m.isGroup) return
    if (!isAdmin) return m.reply('❌ Solo admins.')

    const chat = global.db.data.chats[m.chat]

    if (!chat.setwelcome)
        return m.reply('⚠️ No hay welcome personalizado.')

    delete chat.setwelcome
    m.reply('🗑️ Welcome eliminado. Se usará la descripción si existe.')
}

handler.command = ['delwelcome']
handler.group = true
handler.admin = true

export default handler