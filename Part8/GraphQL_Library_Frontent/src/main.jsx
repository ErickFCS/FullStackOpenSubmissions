import 'bootstrap/dist/css/bootstrap.css'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { setContext } from '@apollo/client/link/context'
import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library_user_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})
const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://localhost:4000' })
)
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
