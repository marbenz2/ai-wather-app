import { ApolloClient, InMemoryCache } from "@apollo/client";

import config from "../../stepzen/stepzen.config.json";
const endpoint = config.endpoint;

let API_URI;

if (process.env.NODE_ENV === "development") {
  API_URI = process.env.LOCAL_URL + endpoint;
} else {
  API_URI = process.env.PUBLIC_URL + endpoint + "__graphql";
}

export const getClient = () => {
  const client = new ApolloClient({
    uri: API_URI,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
    },
  });

  return client;
};
