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

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'prettycalculators@gmail.com',
        subject: `New message from ${name}`,
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
        `,
    })

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
}

export const config = { path: '/api/contact' }
