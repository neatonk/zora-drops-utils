import { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import { DropsRequestProps } from '../typings'
import { useSWRDropsRequest } from '../hooks'

export type DropsContextProps = {
  children?: ReactNode
}

export type DropsContextReturnTypes = {
  contractAddress?: string
  data?: any /* DAIN TODO - spec data return typings */
  error?: any
  isLoading?: boolean
  isValidAddress?: boolean
}

const DropsContext = createContext<DropsContextReturnTypes>({
  contractAddress: undefined,
  data: null,
  error: undefined,
  isLoading: undefined,
  isValidAddress: undefined,
})

export function useDropsContextProvider() {
  return useContext(DropsContext)
}

export function DropsContextProvider({
  children,
  contractAddress,
  networkId = '1',
}: DropsContextProps & DropsRequestProps) {
  const { data, error, isLoading, isValidAddress } = useSWRDropsRequest({
    contractAddress: contractAddress,
    networkId: networkId,
  })

  return (
    <DropsContext.Provider
      value={{
        contractAddress,
        data,
        error,
        isLoading,
        isValidAddress,
      }}>
      {children}
    </DropsContext.Provider>
  )
}