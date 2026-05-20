import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async (req) => {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 })
    }

    const params = new URLSearchParams(await req.text())
    const name    = params.get('name')?.trim()
    const email   = params.get('email')?.trim()
    const message = params.get('message')?.trim()

    if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
    }

    if (name.length > 100 || email.length > 200 || message.length > 5000) {
        return new Response(JSON.stringify({ error: 'Input too long' }), { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 })
    }

    const escape = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'prettycalculators@gmail.com',
        subject: `New message from ${escape(name)}`,
        html: `
            <p><strong>Name:</strong> ${escape(name)}</p>
            <p><strong>Email:</strong> ${escape(email)}</p>
            <p><strong>Message:</strong><br>${escape(message).replace(/\n/g, '<br>')}</p>
        `,
    })

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
}

export const config = { path: '/api/contact' }
