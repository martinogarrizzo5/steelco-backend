# Steelco Monitoring Backend With Backoffice

### If you want to run the project in production mode:

1. Install Node.js and npm
2. Setup your db as specified in the prisma/schema.prisma file without the navigation properties
3. Setup the following environment variables on your server:

```python
NODE_ENV="production"
DATABASE_URL="your-sql-server-db-connection-string"
JWT_SECRET="your-super-secret-password"
ACCESS_TOKEN_EXPIRATION="15m"
REFRESH_TOKEN_EXPIRATION="30d"
```

4. Execute "npm run install-dev" to install all packages
5. Execute "npm run build" to create a build with backend and backoffice together
6. Execute "npm run start" to run the project"

### If you want to run the project in development mode:

1. Install Node.js and npm
2. Setup your db as specified in the prisma/schema.prisma file without the navigation properties
3. Setup .env file with the following variables:

```python
NODE_ENV="development"
DATABASE_URL="your-sql-server-db-connection-string"
JWT_SECRET="your-super-secret-password"
ACCESS_TOKEN_EXPIRATION="15m"
REFRESH_TOKEN_EXPIRATION="30d"

# second little database used by Prisma in some dev commands
SHADOW_DATABASE_URL="your-other-sql-server-db-connection-string"
```

4. Execute "npm run install-dev" to install all packages
5. Execute "npm run dev" to execute the Node.js API
   on port 5000 and React Dev Server on port 3000
