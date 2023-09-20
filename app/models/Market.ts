import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { DataMarket, DataMarketProps } from "./Market.props"
import { api } from "../services/api"
import { withRootStore } from "./helpers/widthRootStore"

/**
 * Model description here for TypeScript hints.
 */
export const MarketModel = types
  .model("Market")
  .extend(withRootStore)
  .props({
    data: types.optional(types.array(DataMarket), []),
    positionSelected: 0,
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get listCoins() {
      if (self.positionSelected < self.data.length) {
        return self.data[self.positionSelected]?.list || []
      }
      return []
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setData(data: DataMarketProps) {
      self.data.replace(data)
    },
    setPosition(position: number) {
      self.positionSelected = position
    },
  }))
  .actions((self) => ({
    getMarkets: flow(function* () {
      self.setPosition(0)
      self.rootStore.authenticationStore.setLoading(true)
      const result = yield api.getMarkets()
      if (result.kind === "ok") {
        const resultSum = yield api.getSum()
        if (resultSum.kind === "ok") {
          self.setData(
            (result.data?.data || []).map((item) => ({
              ...item,
              list: item.list.map((it) => {
                const itemCoin = resultSum.data?.data.find((coin) => coin.market === it?.marketName)
                if (itemCoin) {
                  const lastPrice = itemCoin.lastPrice || 0
                  const isReduce = itemCoin.prevPrice
                    ? itemCoin.lastPrice - itemCoin.prevPrice < 0
                    : true
                  const per =
                    Math.round(
                      ((itemCoin.lastPrice || 0) / (itemCoin.prevPrice || 1) - 1) * 100 * 100,
                    ) / 100
                  const percent = isReduce ? `${per}%↓` : `+${per}%↑`
                  return {
                    ...it,
                    lastPrice,
                    isReduce,
                    percent,
                  }
                }
                return it
              }),
            })),
          )
        } else {
          self.setData(result.data?.data || [])
        }
      }
      self.rootStore.authenticationStore.setLoading(false)
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Market extends Instance<typeof MarketModel> {}

export interface MarketSnapshotOut extends SnapshotOut<typeof MarketModel> {}

export interface MarketSnapshotIn extends SnapshotIn<typeof MarketModel> {}

export const createMarketDefaultModel = () => types.optional(MarketModel, {})
