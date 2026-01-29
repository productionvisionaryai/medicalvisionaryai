import { PrismaConfig } from '@prisma/client'

const config: PrismaConfig = {
  client: {
    datasource: {
      url: process.env.DATABASE_URL,
      provider: 'postgresql'
    }
  }
}

export default config