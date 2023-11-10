import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({

  uri: "https://p2gzwutmec.eu-central-1.awsapprunner.com/graphql/",

});

export const client = new ApolloClient({

  cache: new InMemoryCache(),

  link: ApolloLink.from([httpLink]),

});