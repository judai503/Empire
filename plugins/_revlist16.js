let handler = async (m, { text, conn }) => {
  if (!m.isGroup) return m.reply('⚠️ Este comando solo funciona en grupos.');
  if (!text) return m.reply(`⚠️ Uso correcto:\n.revlist11 <emoji>\n\nEjemplo:\n.revlist11 🥀`);

  const emoji = text.trim().split(/ +/)[0];
  const metadata = await conn.groupMetadata(m.chat);
  const groupName = metadata.subject;

  const participants = metadata.participants.filter(p => !p.admin);
  const admins = metadata.participants.filter(p => p.admin);

  if (participants.length === 0)
    return m.reply("⚠️ No hay integrantes para listar.");

  // Lista de integrantes con el nuevo formato
  const listaIntegrantes = participants
    .map(p => `┃${emoji}┃@${(p.id || '').split('@')[0]} 🔋🕰️🚑🫂🧸🚫`)
    .join('\n');

  const listaAdmins = admins
    .map(a => `@${(a.id || '').split('@')[0]}`)
    .join('\n');

  const mensaje = `
*Lista de revisión (${groupName})*

*Al día 🔋*
*No al día 🪫*
*Permiso 🚑*
*Entrega tarde 🕰️*
*Nuevos 🧸*
*Reingreso 🫂*

⧉━━━━━━━${emoji}━━━━━━━⧉
*🔋 Al día 🔋*

${listaIntegrantes}

⧉━━━━━━━${emoji}━━━━━━━⧉
*🪫 No al día 🪫*

⧉━━━━━━━${emoji}━━━━━━━⧉
*🚑 Permiso 🚑*

⧉━━━━━━━${emoji}━━━━━━━⧉
*🕰️ Entrega tarde 🕰️*

⧉━━━━━━━${emoji}━━━━━━━⧉
*🧸 Nuevos 🧸*

⧉━━━━━━━${emoji}━━━━━━━⧉
*🫂 Reingreso 🫂*

⧉━━━━━━━${emoji}━━━━━━━⧉
*👑 Administración 👑*

${listaAdmins}

${emoji} = Definido por usuario
`;

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

handler.command = /^revlist16$/i;
handler.tags = ['herramientas'];
handler.help = ['revlist16 <emoji>'];

export default handler;