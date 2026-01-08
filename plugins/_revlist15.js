let handler = async (m, { text, conn }) => {
  if (!m.isGroup) return m.reply('⚠️ 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.');
  if (!text) return m.reply(`⚠️ 𝐔𝐬𝐨 𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐨:\n.revlist15 <emoji>\n\n𝐄𝐣𝐞𝐦𝐩𝐥𝐨:\n.revlist15 🍒`);

  const emoji = text.trim().split(/ +/)[0];
  const metadata = await conn.groupMetadata(m.chat);
  const groupName = metadata.subject;

  const participants = metadata.participants.filter(p => !p.admin);
  const admins = metadata.participants.filter(p => p.admin);

  if (participants.length === 0)
    return m.reply("⚠️ 𝐍𝐨 𝐡𝐚𝐲 𝐢𝐧𝐭𝐞𝐠𝐫𝐚𝐧𝐭𝐞𝐬 𝐩𝐚𝐫𝐚 𝐥𝐢𝐬𝐭𝐚𝐫.");

  const listaIntegrantes = participants
    .map(p => `[${emoji}] @${(p.id || '').split('@')[0]} 🟢🟠🔵⚪🔴`)
    .join('\n');

  const listaAdmins = admins
    .map(a => `[${emoji}] @${(a.id || '').split('@')[0]}`)
    .join('\n');

  const mensaje = `
📋𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐑𝐄𝐕𝐈𝐒𝐈𝐎́𝐍 *${groupName}*

*𝐀𝐋 𝐃𝐈́𝐀 = 🟢*
*𝐏𝐄𝐑𝐌𝐈𝐒𝐎𝐒 = 🔵*
*𝐍𝐎 𝐀𝐋 𝐃𝐈́𝐀 = 🔴*
*𝐄𝐍𝐓𝐑𝐄𝐆𝐀 𝐓𝐀𝐑𝐃𝐄 = 🟠*
*𝐍𝐔𝐄𝐕𝐎𝐒 = ⚪*

🟢★·.·´¯·.·★  🟢  ★·.·´¯·.·★🟢
            🟢 *𝐀𝐋 𝐃𝐈́𝐀* 🟢
${listaIntegrantes}

🟠★·.·´¯·.·★  🟠 ★·.·´¯·.·★🟠
       🟠 *𝐄𝐍𝐓𝐑𝐄𝐆𝐀 𝐓𝐀𝐑𝐃𝐄* 🟠


🔵★·.·´¯·.·★  🔵  ★·.·´¯·.·★🔵
         🔵 *𝐏𝐄𝐑𝐌𝐈𝐒𝐎𝐒* 🔵


⚪★·.·´¯·.·★  ⚪  ★·.·´¯·.·★⚪
            ⚪ *𝐍𝐔𝐄𝐕𝐎𝐒* ⚪


🔴★·.·´¯·.·★  🔴  ★·.·´¯·.·★🔴
         🔴 *𝐍𝐎 𝐀𝐋 𝐃𝐈́𝐀* 🔴


⚫★·.·´¯·.·★  ⚫  ★·.·´¯·.·★⚫
        ⚫ *𝐀𝐃𝐌𝐈𝐒* ⚫
${listaAdmins}
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

handler.command = /^revlist15$/i;
handler.tags = ['herramientas'];
handler.help = ['revlist15 <emoji>'];

export default handler;