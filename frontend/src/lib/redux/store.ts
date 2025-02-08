import { configureStore } from '@reduxjs/toolkit'
import communityReducer from './features/communitySlice'
import { challengeApi } from './features/challengeApi'
import { submissionApi } from './features/submissionApi'
import { statsApi } from './features/statsApi'

export const makeStore = () => {
  return configureStore({
    reducer: {
      community: communityReducer,
      [challengeApi.reducerPath]: challengeApi.reducer,
      [submissionApi.reducerPath]: submissionApi.reducer,
      [statsApi.reducerPath]: statsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        challengeApi.middleware,
        submissionApi.middleware,
        statsApi.middleware
      ),
    devTools: process.env.NODE_ENV !== 'production',
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'] 