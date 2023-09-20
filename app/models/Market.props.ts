import { Instance, types } from "mobx-state-tree"

export const ItemMarket = types.model({
  id: types.maybeNull(types.number),
  marketId: types.maybeNull(types.string),
  marketName: types.maybeNull(types.string),
  baseCurrency: types.maybeNull(types.string),
  marketCurrency: types.maybeNull(types.string),
  marketCurrencyLong: types.maybeNull(types.string),
  ceiling: types.maybeNull(types.string),
  floor: types.maybeNull(types.string),
  tradingStatus: types.maybeNull(types.string),
  baseCurrencyTruncate: types.maybeNull(types.number),
  priceTruncate: types.maybeNull(types.number),
  quoteCurrencyTruncate: types.maybeNull(types.number),
  lastPrice: types.maybeNull(types.number),
  isReduce: types.maybeNull(types.boolean),
  percent: types.maybeNull(types.string),
})

type ItemMarketType = Instance<typeof ItemMarket>
export interface ItemMarketProps extends ItemMarketType {}

export const DataMarket = types.model({
  title: types.maybeNull(types.string),
  list: types.optional(types.array(ItemMarket), []),
})

type DataMarketType = Instance<typeof DataMarket>
export interface DataMarketProps extends DataMarketType {}
