'use client'

import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from './store'

const store = makeStore()

export function ReduxProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>
} 