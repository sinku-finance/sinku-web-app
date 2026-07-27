export const WELCOME_SUBJECT = "Estás na lista de espera do Sinku"

export function welcomeEmailHtml(baseUrl: string): string {
	return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Bem-vindo ao Sinku</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f5f5f5; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
    u + #body a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
    @media screen {
      .btn-primary:hover { background-color: #1FAD66 !important; }
      .footer-link:hover { color: #26D97F !important; }
    }
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .email-content { padding: 32px 24px !important; }
      .hero-title { font-size: 28px !important; line-height: 1.15 !important; }
      .hero-subtitle { font-size: 15px !important; }
      .card-image { width: 100% !important; height: auto !important; }
    }
  </style>
</head>
<body id="body" style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="display: none; font-size: 1px; color: #f5f5f5; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Sempre quiseste um Revolut ou MB Way no teu país? Nós também. Estás na lista de espera do Sinku — em breve, sem cartões recusados e sem taxas absurdas.
    &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
  </div>
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="560" class="email-container" style="max-width: 560px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="background-color: #26D97F; height: 4px; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>
          <tr>
            <td align="center" style="padding: 40px 40px 0 40px;">
              <img src="${baseUrl}/logo.png" alt="Sinku" width="120" style="display: block; width: 120px; height: auto;">
            </td>
          </tr>
          <tr>
            <td class="email-content" style="padding: 40px 48px 16px 48px;">
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #666666;">Olá &#x1F44B;</p>
              <h1 class="hero-title" style="margin: 0 0 16px 0; font-size: 32px; font-weight: 700; line-height: 1.15; color: #111111; letter-spacing: -0.03em;">Estás na lista.</h1>
              <p class="hero-subtitle" style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.65; color: #555555;">Enviar dinheiro para casa não devia custar tanto. Receber de um cliente no estrangeiro não devia demorar dias. Pagar uma subscrição online não devia ser um problema.</p>
              <p class="hero-subtitle" style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.65; color: #555555;">Sempre quiseste ter um Revolut ou MB Way no teu país? Nós também — por isso criámos o <strong style="color: #111111;">Sinku</strong>. Um cartão internacional e app financeira feita a pensar em quem vive em Cabo Verde, Angola e toda a PALOP, onde quer que estejas.</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr><td style="padding: 0 0 32px 0;"><div style="height: 1px; background-color: #eeeeee;"></div></td></tr>
              </table>
              <p style="margin: 0 0 20px 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #26D97F;">O que está a chegar</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px;">
                <tr>
                  <td width="40" valign="top" style="padding-right: 14px;"><div style="width: 40px; height: 40px; background-color: #E6F9F0; border-radius: 10px; text-align: center; line-height: 40px; font-size: 18px;">&#x1F4B8;</div></td>
                  <td valign="top">
                    <p style="margin: 0 0 2px 0; font-size: 15px; font-weight: 600; color: #111111;">Envia dinheiro para casa</p>
                    <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #777777;">Com câmbio real, sem taxas escondidas e sem intermediários. O teu dinheiro chega inteiro.</p>
                  </td>
                </tr>
              </table>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px;">
                <tr>
                  <td width="40" valign="top" style="padding-right: 14px;"><div style="width: 40px; height: 40px; background-color: #E6F9F0; border-radius: 10px; text-align: center; line-height: 40px; font-size: 18px;">&#x1F4B3;</div></td>
                  <td valign="top">
                    <p style="margin: 0 0 2px 0; font-size: 15px; font-weight: 600; color: #111111;">Paga e subscreve o que quiseres</p>
                    <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #777777;">Mastercard internacional que funciona em todo o lado — Netflix, Spotify, compras online. Sem cartões recusados.</p>
                  </td>
                </tr>
              </table>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 32px;">
                <tr>
                  <td width="40" valign="top" style="padding-right: 14px;"><div style="width: 40px; height: 40px; background-color: #E6F9F0; border-radius: 10px; text-align: center; line-height: 40px; font-size: 18px;">&#x1F30D;</div></td>
                  <td valign="top">
                    <p style="margin: 0 0 2px 0; font-size: 15px; font-weight: 600; color: #111111;">Recebe como freelancer</p>
                    <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #777777;">Clientes no estrangeiro? Recebe pagamentos na hora sem esperar dias nem pagar taxas absurdas.</p>
                  </td>
                </tr>
              </table>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding: 0 0 12px 0;">
                    <a href="${baseUrl}" class="btn-primary" style="display: inline-block; padding: 14px 36px; background-color: #26D97F; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 12px; letter-spacing: -0.01em;">Visitar Sinku</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 24px 0 8px 0; font-size: 14px; font-weight: 600; color: #111111; text-align: center;">Conheces alguém que precisa do Sinku?</p>
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.5; color: #888888; text-align: center;">Partilha a lista de espera com amigos e família — quanto mais, melhor.</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding: 0 0 8px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 0 6px;">
                          <a href="https://wa.me/?text=Conhece%20o%20Sinku%20%E2%80%94%20cart%C3%A3o%20internacional%20e%20transfer%C3%AAncias%20baratas%3A%20${baseUrl}%2Fwaitlist" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #25D366; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 10px;">WhatsApp</a>
                        </td>
                        <td style="padding: 0 6px;">
                          <a href="https://www.instagram.com/sinku.finance/" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #E1306C; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 10px;">Instagram</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 48px 0 48px;">
              <img src="${baseUrl}/cards/card-in-hands.png" alt="Cartão Sinku" class="card-image" width="464" style="display: block; width: 100%; max-width: 464px; height: auto; margin: 0 auto;">
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 48px 24px 48px; border-top: none;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding: 0 0 16px 0; font-size: 13px; line-height: 1.6; color: #999999;">
                    <a href="${baseUrl}" class="footer-link" style="color: #999999; text-decoration: none;">Website</a>
                    &nbsp;&nbsp;·&nbsp;&nbsp;
                    <a href="${baseUrl}/legal/privacy" class="footer-link" style="color: #999999; text-decoration: none;">Privacidade</a>
                    &nbsp;&nbsp;·&nbsp;&nbsp;
                    <a href="${baseUrl}/legal/terms-of-service" class="footer-link" style="color: #999999; text-decoration: none;">Termos</a>
                  </td>
                </tr>
              </table>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="font-size: 12px; line-height: 1.6; color: #bbbbbb;">
                    &copy; 2026 MORABI, SOCIEDADE UNIPESSOAL LDA. Todos os direitos reservados.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
