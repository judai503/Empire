let handler = async (m, { text, conn }) => {
  if (!m.isGroup) return m.reply('⚠️ Este comando solo funciona en grupos.');
  if (!text) return m.reply(`⚠️ Uso correcto:\n.revlist14 <emoji>\n\nEjemplo:\n.revlist14 🐢`);

  const emoji = text.trim().split(/ +/)[0];
  const metadata = await conn.groupMetadata(m.chat);
  const groupName = metadata.subject;

  // Separar participantes y admins
  const participants = metadata.participants.filter(p => !p.admin);
  const admins = metadata.participants.filter(p => p.admin);

  if (participants.length === 0)
    return m.reply("⚠️ No hay participantes para listar.");

  // Lista de integrantes y admins
  const listaIntegrantes = participants
    .map(p => `${emoji}| @${(p.id || '').split('@')[0]} 💯⏱️🆕🅿️❌♻️`)
    .join('\n');

  const listaAdmins = admins
    .map(a => `${emoji}| @${(a.id || '').split('@')[0]}`)
    .join('\n');

  // Mensaje final con formato decorativo
  const mensaje = `
*📋𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐑𝐄𝐕𝐈𝐒𝐈𝐎́𝐍 "${groupName.toUpperCase()}"*

*💯𝐀𝐋 𝐃𝐈́𝐀*
*❌𝐍𝐎 𝐄𝐒𝐓Á𝐍 𝐀𝐋 𝐃𝐈́𝐀*
*♻️𝐕𝐔𝐄𝐋𝐕𝐄𝐍 𝐃𝐄 𝐏𝐄𝐑𝐌𝐈𝐒𝐎*
*🅿️𝐏𝐄𝐑𝐌𝐈𝐒𝐎𝐒*
*⏱️𝐄𝐍𝐓𝐑𝐄𝐆𝐀𝐍 𝐌Á𝐒 𝐓𝐀𝐑𝐃𝐄*
*🆕𝐏𝐄𝐑𝐒𝐎𝐍𝐈𝐓𝐀𝐒 𝐍𝐔𝐄𝐕𝐀𝐒*

•——————•°•${emoji}•°•——————•
*💯𝐀𝐋 𝐃𝐈́𝐀*
${listaIntegrantes}
•——————•°•${emoji}•°•——————•
*⏱️𝐄𝐍𝐓𝐑𝐄𝐆𝐀 𝐓𝐀𝐑𝐃𝐄*

•——————•°•${emoji}•°•——————•
*🅿️𝐏𝐄𝐑𝐌𝐈𝐒𝐎*

•——————•°•${emoji}•°•——————•
*❌𝐍𝐎 𝐀𝐋 𝐃𝐈́𝐀*

•——————•°•${emoji}•°•——————•
*♻️𝐕𝐔𝐄𝐋𝐕𝐄𝐍 𝐃𝐄 𝐏𝐄𝐑𝐌𝐈𝐒𝐎*

•——————•°•${emoji}•°•——————•
**🆕𝐏𝐄𝐑𝐒𝐎𝐍𝐈𝐓𝐀𝐒 𝐍𝐔𝐄𝐕𝐀𝐒*

•——————•°•${emoji}•°•——————•
*✨𝐀𝐃𝐌𝐈𝐒✨*
${listaAdmins}
`;

  // Enviar mensaje con menciones
  await conn.sendMessage(
    m.chat,
    {
      text: mensaje,
      mentions: [
        ...participants.map(p => p.id),
        ...admins.map(a => a.id)
      ]
    },
    { quoted: m }
  );
};

handler.command = /^revlist14$/i;
handler.tags = ['herramientas'];
handler.help = ['revlist14 <emoji>'];

export default handler;