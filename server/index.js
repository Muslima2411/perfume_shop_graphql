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
    getAllPerfumes(gender: Gender!): [PerfumeProduct]
  }
`;

const resolvers = {
  Query: {
    getAllPerfumes: async (_, { gender }) => {
      console.log("Gender:", gender);
      try {
        const perfumes = await query.getAll({ gender });
        return perfumes;
      } catch (error) {
        console.error("Error fetching perfumes:", error);
        throw new Error("Failed to fetch perfumes");
      }
    },
  },

  PerfumeProduct: {
    perfume: (parent, args) => {
      const size = args.size;
      console.log("Perfume:", parent.perfume[size]);
      return parent.perfume[size];
    },
    eauDeParfume: (parent, args) => {
      const size = args.size;
      console.log("Eau De Parfum:", parent.eauDeParfume[size]);
      return parent.eauDeParfume[size];
    },
    toitlette: (parent, args) => {
      const size = args.size;
      console.log("Toilette:", parent.toitlette[size]);
      return parent.toitlette[size];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);