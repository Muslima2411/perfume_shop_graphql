import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { query } from "./db.js";

const typeDefs = `#graphql
  type PerfumeProduct {
    id: ID
    brandName: String
    productName: String
    gender: String
    perfume(size: String!): PerfumeDetails
    eauDeParfume(size: String!): PerfumeDetails
    toitlette(size: String!): PerfumeDetails
  }

  enum Gender {
    male 
    female
  }

  type PerfumeDetails {
    size: String
    price: String
    qty: Int
  }

  type Query {
    getAllPerfumes: [PerfumeProduct]
  }
`;

const resolvers = {
  Query: {
    getAllPerfumes: () => query.getAll(),
  },

  PerfumeProduct: {
    perfume: (parent, args) => {
      const size = args.size;
      console.log("Perfume:", parent.perfume[size]); 
      return parent.perfume?.[size] || null;
    },
    eauDeParfume: (parent, args) => {
      const size = args.size;
      console.log("Eau De Parfum:", parent.eauDeParfume[size]);  
      return parent.eauDeParfume?.[size] || null;
    },
    toitlette: (parent, args) => {
      const size = args.size;
      console.log("Toilette:", parent.toitlette[size]);  
      return parent.toitlette?.[size] || null;
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
