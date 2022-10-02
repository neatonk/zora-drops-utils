import React from 'react'
import {
  useDropsContractProvider,
  addIPFSGateway,
} from '@public-assembly/zora-drops-utils'

export function Thumbnail() {
  const { collectionData: data } = useDropsContractProvider()

  const src = React.useMemo(
    () =>
      data?.editionMetadata?.imageURI
        ? addIPFSGateway(data?.editionMetadata?.imageURI)
        : '',
    [data, data?.editionMetadata?.imageURI]
  )

  return (
    <div
      className={`drops-ui__thumbnail--wrapper relative aspect-square w-full overflow-hidden rounded-xl shadow-sm`}>
      <img
        className={`drops-ui__thumbnail--image absolute inset-0 object-cover`}
        src={src}
      />
    </div>
  )
}
