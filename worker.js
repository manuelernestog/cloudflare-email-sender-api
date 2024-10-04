import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/send') {
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
      }

      const authHeader = request.headers.get('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response('Unauthorized', { status: 401 });
      }

      const token = authHeader.slice('Bearer '.length).trim();
      if (token !== env.AUTH_TOKEN) {
        return new Response('Forbidden', { status: 403 });
      }

      let data;
      try {
        data = await request.json();
      } catch (e) {
        return new Response('Bad Request: Invalid JSON', { status: 400 });
      }

      const { from, to, subject, html } = data;
      if (!from || !to || !subject || !html) {
        return new Response('Bad Request: Missing required fields', { status: 400 });
      }

      try {
        await sendEmail(env, from, to, subject, html);
        return new Response('Email sent successfully');
      } catch (e) {
        return new Response(`Internal Server Error: ${e.message}`, { status: 500 });
      }
    } else {
      return new Response('Endpoint not found', { status: 404 });
    }
  }
};

async function sendEmail(env, from, to, subject, html) {
  const msg = createMimeMessage();

  msg.setSender(from);
  msg.setRecipient(to);
  msg.setSubject(subject);
  msg.addMessage({
    contentType: 'text/html',
    data: html
  });

  const message = new EmailMessage(
    from,
    to,
    msg.asRaw()
  );

  await env.EMAIL.send(message);
}
