import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
    email: string,
    token: string,
) {

    const confirmLink = `http://localhost:3000/new-verification?token=${token}`

    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <orenodesukouichi@gmail.com>',
            to: email,
            subject: 'Hello world',
            html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`
        });

        if (error) {
            return Response.json({ error });
        }

        return Response.json({ data });
    } catch (error) {
        return Response.json({ error });
    }
}