import { FC, Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../../store";
import { Loader as LoaderProvider } from "../Loader";
import { Router } from "../Router";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../ApolloClient/client";

interface IProps {}

export const Root: FC<IProps> = (): JSX.Element => {
  return (
    <Suspense fallback="loading">
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <LoaderProvider>
              <Router />
            </LoaderProvider>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </Suspense>
  );
};