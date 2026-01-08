let handler = async (m, { args, conn }) => {
  if (!m.isGroup) return m.reply('⚠️ Este comando solo funciona en grupos.');

  // Emoji elegido o por defecto
  const emoji = args[0] || '🍑';

  const metadata = await conn.groupMetadata(m.chat);
  const groupName = metadata.subject;

  // Participantes
  const admins = metadata.participants.filter(p => p.admin || p.isAdmin || p.isSuperAdmin);
  const users = metadata.participants.filter(p => !p.admin && !p.isAdmin && !p.isSuperAdmin);

  // Lista de usuarios (todos en "al día" como tu plantilla)
  let listaUsuarios = '';
  users.forEach(p => {
    listaUsuarios += `┃🏆💤⛑️💢👤♻️┃ @${p.id.split('@')[0]} ${emoji}\n`;
  });

  // Lista admins
  const listaAdmins = admins.map(p => `📢 @${p.id.split('@')[0]}`).join('\n');

  // Texto final
  let texto = `
${emoji} *lista de revisión (${groupName})* ${emoji}

*Al día 🏆*
*Entrega tarde 💤*
*No al día 💢*
*Permiso ⛑️*
*Ingreso 👤*
*Reingreso ♻️*


⌁⚡⌁━━━━━━${emoji}━━━━━━⌁⚡⌁
             *🏆Al día 🏆*

${listaUsuarios.trim()}

⌁⚡⌁━━━━━━${emoji}━━━━━━⌁⚡⌁
       *💤Entrega tarde 💤*

⌁⚡⌁━━━━━━${emoji}━━━━━━⌁⚡⌁
          *💢No al día 💢*

⌁⚡⌁━━━━━━${emoji}━━━━━━⌁⚡⌁
        *⛑️Permiso ⛑️*

⌁⚡⌁━━━━━━${emoji}━━━━━━⌁⚡⌁
          *👤Ingreso 👤*

⌁⚡⌁━━━━━━${emoji}━━━━━━⌁⚡⌁
          *♻️Reingreso ♻️*

⌁⚡⌁━━━━━━${emoji}━━━━━━⌁⚡⌁
${listaAdmins}
`.trim();

  await conn.sendMessage(
    m.chat,
    { text: texto, mentions: [...users.map(u => u.id), ...admins.map(a => a.id)] },
    { quoted: m }
  );
};

handler.command = /^revlist11$/i;
handler.tags = ['herramientas'];
handler.help = ['revlist11 <emoji>'];

export default handler;