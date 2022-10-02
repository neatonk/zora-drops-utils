import React from 'react'
import { DropsContractProvider } from '@public-assembly/zora-drops-utils'
import {
  Metadata,
  MintButton,
  MintQuantity,
  SalesInfo,
  Thumbnail,
  TxStatus,
} from './drop-components'

export function DropsMinter({
  collectionAddress,
  successCallback,
}: {
  collectionAddress?: string
  successCallback?: () => void
}) {
  const onSuccess = React.useCallback(() => {
    if (successCallback) {
      successCallback()
    }
  }, [])

  if (!collectionAddress) return null

  return (
    <DropsContractProvider
      collectionAddress={collectionAddress}
      onSuccessCallback={onSuccess}>
      <div
        className={`drops-ui__minter--wrapper border-1 grid grid-cols-3 gap-4 rounded-xl border border-solid p-4`}>
        <Thumbnail />
        <div className="drops-ui__minter--ui-wrapper col-span-2 flex h-full flex-col justify-between">
          <Metadata />
          <hr className="drops-ui__minter--separator my-2"></hr>
          <SalesInfo />
          <hr className="drops-ui__minter--separator my-2"></hr>
          <TxStatus />
          <div className="drops-ui__minter--form-wrapper grid grid-cols-2 gap-2">
            <MintButton />
            <MintQuantity />
          </div>
        </div>
      </div>
    </DropsContractProvider>
  )
}
