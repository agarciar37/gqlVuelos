export const schema = `#graphql
    type Flight {
        id : ID!
        origin: String!
        destination: String!
        timeDate: String!
    }

    type Query {
        flights: [Flight!]!
        flight(id: ID!): Flight
    }

    type Mutation {
        addFlight(origin: String!, destination: String!, timeDate: String!): Flight!
    }
`;