import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, role, numCollaborators, whatsapp, email } = req.body;

  if (!name || !company || !whatsapp) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  const html = `
    <h2>Novo Lead - Essentia Saúde Corporativa</h2>
    <p><strong>Nome:</strong> ${name}</p>
    <p><strong>Empresa:</strong> ${company}</p>
    <p><strong>Cargo:</strong> ${role || 'Não informado'}</p>
    <p><strong>Colaboradores:</strong> ${numCollaborators}</p>
    <p><strong>WhatsApp:</strong> ${whatsapp}</p>
    <p><strong>E-mail:</strong> ${email || 'Não informado'}</p>
    <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
  `;

  // Defensive validation: Check if BREVO_API_KEY is configured
  const brevoApiKey = process.env.BREVO_API_KEY;
  if (!brevoApiKey) {
    console.error('BREVO_API_KEY not found in environment variables');
    return res.status(500).json({ error: 'Configuração de email ausente: BREVO_API_KEY não definida' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Arthur (da Essentia Saúde Corporativa)', email: 'essentiamarketingsocialmedia@gmail.com' },
        to: [
          { email: 'bhruna.azevedo@hotmail.com' },
          { email: 'bhrunaazevedo@outlook.com' },
          { email: 'arthursoutolima@gmail.com' },
        ],
        subject: `Novo lead: ${name} - ${company}`,
        htmlContent: html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Falha ao enviar email (${response.status})`);
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Brevo error:', error);
    return res.status(500).json({ error: error.message || 'Falha ao enviar email' });
  }
}