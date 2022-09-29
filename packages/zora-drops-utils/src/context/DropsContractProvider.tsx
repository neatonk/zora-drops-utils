import React from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import zoraDropsABI from '@zoralabs/nft-drop-contracts/dist/artifacts/ERC721Drop.sol/ERC721Drop.json'
import { ethers } from 'ethers'
import { useSWRDrop } from '../hooks'

const DEFAULT_MINT_QUANTITY = {
  name: '1',
  queryValue: 1,
}

export type DropsContractProps = {
  children?: React.ReactNode
  collectionAddress?: string
}

export type DropsContractReturnTypes = {
  purchase?: () => void
  setMintQuantity?: React.ChangeEventHandler<HTMLInputElement>
  collectionData?: any
  collectionAddress?: string
  totalPrice?: {
    raw: string | number
    pretty: string | number
  }
  mintQuantity?: {
    name: string
    queryValue: number
  }
  errors: {
    unpredictableGasLimit: boolean
    insufficientFunds: boolean
  }
  purchaseLimit?: {
    maxAmount?: number
    pastAmount?: boolean
  }
  inventory?: {
    totalSupply?: number
    totalSold?: number
    prettyInventory?: string
  }
}

const DropsContractContext = React.createContext<DropsContractReturnTypes>({
  purchase: () => {},
  setMintQuantity: undefined,
  collectionData: undefined,
  collectionAddress: undefined,
  totalPrice: undefined,
  mintQuantity: DEFAULT_MINT_QUANTITY,
  errors: {
    unpredictableGasLimit: false,
    insufficientFunds: false,
  },
  purchaseLimit: {
    maxAmount: undefined,
    pastAmount: undefined,
  },
  inventory: {
    totalSupply: undefined,
    totalSold: undefined,
    prettyInventory: undefined,
  },
})

export function useDropsContractProvider() {
  return React.useContext(DropsContractContext)
}

export function DropsContractProvider({
  children,
  collectionAddress,
}: DropsContractProps) {
  const { data: collectionData } = useSWRDrop({ contractAddress: collectionAddress })

  const [mintQuantity, setMintQuantity] = React.useState(DEFAULT_MINT_QUANTITY)

  const handleUpdateMintQuantity = React.useCallback(
    (event: any) => {
      setMintQuantity({
        name: event?.target?.value,
        queryValue: parseInt(event?.target?.value),
      })
      console.log(mintQuantity.queryValue)
    },
    [mintQuantity, setMintQuantity]
  )

  const totalPurchasePrice = React.useMemo(() => {
    try {
      const publicSalePriceNumber = Number(collectionData?.salesConfig?.publicSalePrice)
      const total = String(mintQuantity.queryValue * publicSalePriceNumber)
      return total
    } catch (err) {
      console.error(err)
    }
  }, [collectionData, collectionData?.salesConfig?.publicSalePrice, mintQuantity])

  const { config, error } = usePrepareContractWrite({
    addressOrName: collectionAddress,
    contractInterface: zoraDropsABI.abi,
    functionName: 'purchase',
    args: [mintQuantity.queryValue],
    overrides: {
      value: totalPurchasePrice,
    },
  })

  const insufficientFunds = React.useMemo(() => {
    if (error) {
      /* @ts-ignore */
      return error.code === 'INSUFFICIENT_FUNDS'
    }
  }, [error])

  const unpredictableGasLimit = React.useMemo(() => {
    if (error) {
      /* @ts-ignore */
      return error.code === 'UNPREDICTABLE_GAS_LIMIT'
    }
  }, [error])

  const purchaseLimit = React.useMemo(() => {
    const maxPerAddress = collectionData?.salesConfig?.maxSalePurchasePerAddress || 1
    return {
      maxAmount: maxPerAddress,
      pastAmount: mintQuantity.queryValue > Number(maxPerAddress),
    }
  }, [collectionData, mintQuantity])

  const inventory = React.useMemo(() => {
    return {
      totalSupply: collectionData?.maxSupply,
      totalSold: collectionData?.totalMinted,
      prettyInventory: `${collectionData?.totalMinted} / ${collectionData?.maxSupply}`,
    }
  }, [collectionData, mintQuantity])

  const prettyPurchasePrice = React.useMemo(() => {
    try {
      return totalPurchasePrice ? ethers.utils.formatUnits(totalPurchasePrice) : ''
    } catch (err) {
      console.error(err)
    }
  }, [totalPurchasePrice])

  const { write: purchase } = useContractWrite(config)

  return (
    <DropsContractContext.Provider
      value={{
        purchase,
        mintQuantity,
        setMintQuantity: handleUpdateMintQuantity,
        collectionData,
        totalPrice: {
          raw: totalPurchasePrice,
          pretty: prettyPurchasePrice,
        },
        collectionAddress: collectionAddress,
        errors: {
          insufficientFunds: insufficientFunds,
          unpredictableGasLimit: unpredictableGasLimit,
        },
        purchaseLimit,
        inventory,
      }}>
      {children}
    </DropsContractContext.Provider>
  )
}
