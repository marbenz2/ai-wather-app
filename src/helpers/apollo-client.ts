import { ApolloClient, InMemoryCache } from "@apollo/client";

import config from "../../stepzen/stepzen.config.json";
const endpoint = config.endpoint;

let SERVER_URI;

if (process.env.NODE_ENV === "development") {
  SERVER_URI = process.env.LOCAL_URL + endpoint;
} else {
  SERVER_URI = process.env.PUBLIC_URL + endpoint;
}

export const getClient = () => {
  const client = new ApolloClient({
    uri: SERVER_URI,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
    },
  });

  return client;
};
