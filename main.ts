import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.ts";
import { MongoClient } from "mongodb";
import { FlightModel } from "./type.ts";
import { startStandaloneServer} from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts"

const MONGO_URL = "mongodb+srv://agarciar37:<db_password>@cluster0.nv27ans.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGO_URL){
  throw new Error("Please provide a MONGO_URL");
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();

console.info("Connected to MongoDB");

const mongoDB = mongoClient.db("flights");
const FlightCollection = mongoDB.collection<FlightModel>("flights");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  context: async () => ({ FlightCollection }),
})

console.info(`Server ready at ${url}`);
