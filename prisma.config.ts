const config = {
  client: {
    datasource: {
      url: process.env.DATABASE_URL,
      provider: 'postgresql'
    }
  }
}

export default config