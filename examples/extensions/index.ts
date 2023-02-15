import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Container } from "typedi";
import { buildSchema } from "type-graphql";
import { ExampleResolver } from "./resolver";
import { Context } from "./context.type";
import { LoggerMiddleware } from "./logger.middleware";

async function bootstrap() {
  // Build TypeGraphQL executable schema
  const schema = await buildSchema({
    // Array of resolvers
    resolvers: [ExampleResolver],
    // IOC container
    container: Container,
    // Global middleware
    globalMiddlewares: [LoggerMiddleware],
  });

  // Create GraphQL server
  const server = new ApolloServer<Context>({
    schema,
  });

  // Start server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    // Provide context
    context: async () => ({
      // Example user
      user: {
        id: 123,
        name: "Sample user",
      },
    }),
  });
  console.log(`GraphQL server ready at ${url}`);
}

bootstrap();
