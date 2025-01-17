export {
  EDITIONS_STYLE_CONTRACT_METADATA,
  EDITION_QUERY,
  dropsFetcher,
  dropsArrayFetcher,
} from './data'

export { DROPS_SUBGRAPH_URLS, returnDropEndpoint } from './constants'

export { useDrop, useSWRDrop, useDropsArray, useSWRDropsArray } from './hooks'

export {
  DropContextProvider,
  useDropContextProvider,
  DropsContextProvider,
  useDropsContextProvider,
  DropsContractProvider,
  useDropsContractProvider,
} from './context'

export { addIPFSGateway } from './lib/addIPFSGateway'

export type { DropsRequestProps, DropsArrayRequestProps, MetaDataProps } from './typings'

/**
 * Components
 */

import {
  Metadata,
  MetadataCreator,
  MetadataName,
  MetadataDescription,
  MintButton,
  MintQuantity,
  SalesInfo,
  CollectionAddress,
  MaxQuantity,
  Inventory,
  TotalPrice,
  SalesTiming,
  SaleActiveAlert,
  SaleEndedAlert,
  Thumbnail,
  VideoRenderer,
  AudioRenderer,
  TxStatus,
  EtherscanLink,
} from './components/drop-components'

export const DropsComponents = {
  Metadata,
  MetadataCreator,
  MetadataName,
  MetadataDescription,
  MintButton,
  MintQuantity,
  SalesInfo,
  CollectionAddress,
  MaxQuantity,
  Inventory,
  TotalPrice,
  SalesTiming,
  SaleActiveAlert,
  SaleEndedAlert,
  Thumbnail,
  TxStatus,
  EtherscanLink,
  VideoRenderer,
  AudioRenderer,
}

export { DropsMinter } from './components/DropsMinter'
