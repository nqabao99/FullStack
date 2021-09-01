import { UserResolver } from './resolvers/user';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { Post } from './entities/Post';
import { User } from './entities/User';
import { HelloResolver } from './resolvers/hello';
require ('dotenv').config()


const main = async() => {
    await createConnection({
        type: 'postgres',
        database: 'reddit',
        username: process.env.DB_USERNAME_DEV,
        password: process.env.DB_PASSWORD_DEV,
        logging: true,
        synchronize: true,
        entities: [User, Post]
    })

    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({resolvers: [HelloResolver, UserResolver], validate: false})
    })

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: false})

    const PORT = process.env.PORT || 4000

    app.listen(PORT, ()=> console.log(`server started on port ${PORT} . GraphQl server started on locahost:${PORT}${apolloServer.graphqlPath}`))
}

main().catch(error => console.log(error))