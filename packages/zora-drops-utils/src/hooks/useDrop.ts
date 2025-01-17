import React from 'react'
import { EDITION_QUERY, dropsFetcher } from '../data'
import { DropsRequestProps } from '../typings'
import { useValidAddress } from './useValidAddress'

export function useDrop({ contractAddress, networkId = '1' }: DropsRequestProps) {
  const [data, setData] = React.useState<any>(undefined)
  const [error, setError] = React.useState<any>(undefined)
  const [isLoading, setIsLoading] = React.useState(true)

  const isValidAddress = useValidAddress(contractAddress)

  React.useEffect(() => {
    setData(undefined)
    setIsLoading(true)

    async function getDropsData() {
      await dropsFetcher(networkId, contractAddress, EDITION_QUERY)
        .then((res) => {
          setData(res)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error)
          setIsLoading(false)
          console.error(error)
        })
    }

    getDropsData()
  }, [contractAddress])

  return {
    data: data,
    error: error,
    isLoading,
    isValidAddress,
  }
}
