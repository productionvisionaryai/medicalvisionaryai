# Visionary Ai medical intelligence portal

**Helena AI** is a Next.js-based medical AI assistant designed for specialized medicine streaming intelligence, featuring AI-powered medical analysis via Groq's Llama 3.3 70B model. and dr 7 AI APi service

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Groq API key ([Get one here](https://console.groq.com))
- Resend API key ([Get one here](https://resend.com)) - Optional for email features

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd helena-clean
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your API keys
   GROQ_API_KEY=your_groq_api_key_here
   RESEND_API_KEY=your_resend_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Configuration

All configuration is managed through environment variables. See `.env.example` for the complete list of required and optional variables.

### Required Variables

```bash
GROQ_API_KEY=your_groq_api_key_here    # Required for AI functionality
```

### Optional Variables

```bash
RESEND_API_KEY=your_resend_api_key_here  # For email features
CONTACT_PHONE=+52-56-16-73-74-67         # Contact information
WHATSAPP_NUMBER=525616737467
CONTACT_EMAIL=aisynths@visionaryai.lat
```

See [`.env.example`](.env.example) for all available configuration options.

## 🏗️ Project Structure

```
helena-clean/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes (Edge functions)
│   │   │   └── medical-chat/  # Medical AI endpoint
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   ├── ModernChat/   # AI chat interface
│   │   ├── MedicalHero.tsx
│   │   └── WhatsAppFab.tsx
│   ├── lib/              # Utilities & configuration
│   │   ├── config.ts     # Centralized configuration
│   │   ├── cors-config.ts # CORS security
│   │   └── db.ts         # Database utilities
│   └── middleware.ts     # Security middleware
├── .env.example          # Environment template
├── .gitignore
└── package.json
```

## 🔒 Security Features

- **Environment-based configuration** - No hardcoded credentials
- **CORS protection** - Whitelist-based origin validation
- **Security headers** - CSP, HSTS, XSS protection
- **API key validation** - Runtime checks for required keys
- **Edge runtime** - Optimized performance and security

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables in project settings

3. **Configure environment variables**
   Add all variables from `.env.example` in Vercel dashboard:
   - Settings → Environment Variables
   - Add `GROQ_API_KEY` and other required variables

4. **Deploy**
   Vercel will automatically deploy on push

### Environment-Specific Configuration

```bash
# Production
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://medical.visionaryai.lat
ALLOWED_ORIGINS=https://medical.visionaryai.lat,https://www.medical.visionaryai.lat

# Staging
NODE_ENV=staging
NEXT_PUBLIC_APP_URL=https://staging.medical.visionaryai.lat
ALLOWED_ORIGINS=https://staging.medical.visionaryai.lat
```

## 🔑 API Key Rotation

For production deployments, rotate API keys regularly:

1. **Generate new API key** in provider dashboard (Groq/Resend)
2. **Update environment variables** in Vercel/hosting platform
3. **Redeploy application**
4. **Revoke old API key** after confirming new key works

**Recommended rotation schedule:**
- Production API keys: Every 90 days
- Development API keys: Every 180 days
- Immediately if compromised

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📧 Email Configuration (Optional)

The application includes email functionality via Resend for lead capture:

```bash
# Configure in .env
RESEND_API_KEY=your_key_here
EMAIL_FROM_ADDRESS=pavel@medical.visionaryai.lat
EMAIL_FROM_NAME=Helena AI
EMAIL_TO_DEFAULT=your_email@example.com
```

To send test email:
```bash
node enviar.mjs
```

## 🛡️ Security Best Practices

1. **Never commit `.env` files** - They're gitignored by default
2. **Use environment variables** - Access via `config` module
3. **Rotate API keys regularly** - Follow rotation schedule
4. **Monitor API usage** - Check for unusual patterns
5. **Use HTTPS in production** - Enforced by middleware

## 📝 License

Private - Visionary AI Labs

## 🤝 Support

For technical support or questions:
- Email: aisynths@visionaryai.lat
- WhatsApp: +52-56-16-73-74-67
medical.visionaryai.lat

---

**Built with:**
- Next.js 16
- React 19
- Groq AI (Llama 3.3 70B)
- Tailwind CSS 4
- Framer Motion
