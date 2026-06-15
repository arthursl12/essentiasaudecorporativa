import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, role, numCollaborators, contact } = req.body;

  if (!name || !company || !contact) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  const html = `
    <h2>Novo Lead - Essentia Saúde Corporativa</h2>
    <p><strong>Nome:</strong> ${name}</p>
    <p><strong>Empresa:</strong> ${company}</p>
    <p><strong>Cargo:</strong> ${role || 'Não informado'}</p>
    <p><strong>Colaboradores:</strong> ${numCollaborators}</p>
    <p><strong>Contato:</strong> ${contact}</p>
    <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
  `;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Essentia', email: 'noreply@essentia.com.br' },
        to: [
          { email: 'bhruna.azevedo@hotmail.com' },
          { email: 'arthursoutolima@gmail.com' },
        ],
        subject: `Novo lead: ${name} - ${company}`,
        htmlContent: html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Falha ao enviar email');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Brevo error:', error);
    return res.status(500).json({ error: 'Falha ao enviar email' });
  }
}