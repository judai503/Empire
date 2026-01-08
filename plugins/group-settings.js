let handler = async (m, { conn, command }) => {

    let isClose = {
        // Abrir
        'grupoabrir': 'not_announcement',
        'abrirgrupo': 'not_announcement',
        'abrir': 'not_announcement',

        // Cerrar
        'cerrar': 'announcement',
        'cerrargrupo': 'announcement',
        'grupocerrar': 'announcement',
    }[command.toLowerCase()]

    if (!isClose) return

    await conn.groupSettingUpdate(m.chat, isClose)

    if (isClose === 'not_announcement') {
        // Grupo abierto ✨
        m.reply(
`🔓✨ *Grupo abierto*  
¡Pueden escribir ahora! 💬😄`
        )

    } else if (isClose === 'announcement') {
        // Grupo cerrado 🌙
        m.reply(
`🔒🌙 *Grupo cerrado*  
Solo admins pueden hablar. 👮‍♂️✨`
        )
    }
}

handler.help = ['grupoabrir', 'abrirgrupo', 'abrir', 'cerrar', 'cerrargrupo', 'grupocerrar']
handler.tags = ['grupo']
handler.command = ['grupoabrir', 'abrirgrupo', 'abrir', 'cerrar', 'cerrargrupo', 'grupocerrar']
handler.admin = true
handler.botAdmin = true

export default handler