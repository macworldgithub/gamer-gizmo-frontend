import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adSlice from "./Slicer/AddSlice";
import currencySlice from "./Slicer/CurrencySlice";
import sellForMeSlice from "./Slicer/SellForMeSlice";
import ThemeSlice from "./Slicer/ThemeSlice";
import loginSlice from "./Slicer/LoginSlice";
import storage from "redux-persist/lib/storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const combinedReducers = combineReducers({
  SellForMe: sellForMeSlice.reducer,
  Ad: adSlice.reducer,
  Currency: currencySlice.reducer, // Add more reducers here as needed
  Theme: ThemeSlice.reducer,
  user: loginSlice,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const makeConfiguredStore = () =>
  configureStore({
    reducer: combinedReducers,
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });
    // @ts-expect-error: dil kar raha
    store.__persistor = persistStore(store);
    return store;
  }
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
