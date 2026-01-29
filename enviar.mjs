import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

const templateDraAdriana = (lead) => `
<!DOCTYPE html>
<html>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; max-width: 500px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
    <div style="border: 1px solid #e2e8f0; border-radius: 24px; padding: 35px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); text-align: center;">
        
        <h2 style="color: #0f172a; font-size: 22px; margin-bottom: 15px; font-weight: 700;">Estimada Dra. Adriana Hernández,</h2>
        
        <p style="font-size: 16px; color: #475569; line-height: 1.6; margin-bottom: 25px;">
            En <strong>Visionary AI Labs</strong> admiramos la proyección internacional de su marca <em>Adriana H. Cirugía y Estética</em>. Queremos proponerle una <strong>Agenda Autónoma</strong> diseñada para pacientes globales.
        </p>

        <div style="margin: 30px 0; background-color: #f8fafc; padding: 25px; border-radius: 20px; border: 2px dashed #334155;">
            <p style="font-size: 12px; font-weight: bold; color: #334155; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1.5px;">Acceso Digital Prototipo</p>
            
            <a href="https://medical2.visionaryai.lat/" target="_blank" style="cursor:pointer; display:inline-block; text-decoration: none;">
                <img src="https://storage2.me-qr.com/qr/303006365.png?v=1769547227" alt="QR Dra. Adriana Hernández" style="width: 190px; height: 190px; border-radius: 12px; border: 6px solid white; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
            </a>
            
            <p style="font-size: 15px; color: #1e293b; margin-top: 18px; font-weight: 600; margin-bottom: 10px;">
                "Toque para experimentar la agilidad de su próxima Agenda Inteligente"
            </p>
            
            <a href="https://medical2.visionaryai.lat/" target="_blank" style="color: #2563eb; font-size: 14px; font-weight: bold; text-decoration: underline;">
                Ver Demo de Agenda Autónoma →
            </a>
        </div>

        <p style="font-size: 18px; color: #0f172a; font-weight: bold; line-height: 1.4; margin-bottom: 20px;">
            ¿Le gustaría que sus pacientes agenden valoraciones automáticamente, sin importar la zona horaria, y aseguren su cita mediante depósitos de reserva digitales?
        </p>

        <p style="font-size: 15px; color: #64748b; line-height: 1.6;">
            Sincronizamos su consulta con una plataforma habilitada para pagos globales (Bitcoin Lightning/Blink), profesionalizando cada reserva y eliminando las barreras administrativas internacionales.
        </p>

        <div style="margin-top: 35px;">
            <a href="https://wa.me/584120676453" style="background: #0f172a; color: white; padding: 16px 35px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; font-size: 15px;">
                💬 Contactar a Mary Alviarez
            </a>
        </div>
    </div>
</body>
</html>
`;

async function enviar() {
    const lead = { 
        name: 'Dra. Adriana Hernández', 
        email: 'adrianahcirugiayestetica@gmail.com' 
    };

    try {
        const { data, error } = await resend.emails.send({
            from: 'Mary Alviarez | Visionary AI <mary@medical.visionaryai.lat>',
            to: [lead.email],
            bcc: ['maryalviarez6@gmail.com'],
            subject: `🚀 Gestión Inteligente para Adriana H. Cirugía y Estética - Dra. Adriana Hernández`,
            html: templateDraAdriana(lead)
        });

        if (error) console.error("❌ ERROR:", error.message);
        else console.log(`✅ ENVIADO A: ${lead.email}`);
    } catch (err) {
        console.error("💥 FALLO:", err.message);
    }
}

enviar();