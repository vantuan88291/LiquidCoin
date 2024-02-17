import React from "react"
import {formatAmount} from "app/utils/utils";

export interface DataItemOrder {
  entry: any
  volume: any
  liquid?: any
  avg?: any
}
export const useData = () => {
  const [data, setData] = React.useState({
    entry: '',
    qty: '',
    leverage: 20,
    totalOrder: 5,
    isLong: false,
    tickSize: 3,
    nextPrecent: 25,
    risk: 0.2,
  })
  const [orders, setOrders] = React.useState<DataItemOrder[]>([])
  const setParam = (key, value) => {
    setData(arg => ({
      ...arg,
      [key]: value
    }))
    if (key === 'isLong') {
      data.isLong = value
    }
  }
  const calculateLiquid = (entry: number, vol: number) => {
    const cont = vol / entry
    let liquid = 0
    const psMargin = entry * (cont / +data.leverage)
    const mainMargin = entry * cont * 0.005
    if (data.isLong) {
      liquid = (mainMargin - psMargin + entry * cont) / cont
    } else {
      liquid = (entry * cont - mainMargin + psMargin) / cont
    }
    return formatAmount(liquid, data.tickSize)
  }
  const calculateEntryPrice = (data: DataItemOrder[]) => {
    const sumEntry = data.reduce((sum, item) => {
      return sum + (item.entry * (item.volume / item.entry))
    }, 0)
    const sumCont = data.reduce((sum, item) => {
      return sum + (item.volume / item.entry)
    }, 0)
    return sumEntry / sumCont
  }
  const calculateEntry = (liquid: number) => {
    if (data.isLong) {
      return +formatAmount(liquid + (liquid * (+data.risk/100)), data.tickSize)
    }
    return +formatAmount(liquid - (liquid * (+data.risk/100)), data.tickSize)
  }
  const getNextVolume = (vol: number) => {
    return +formatAmount(vol + (vol * (data.nextPrecent / 100)))
  }
  const calculateOrders = () => {
    const listOrders = []
    const firstOrder = {
      entry: +data.entry,
      volume: +data.qty,
      avg: +data.entry,
      liquid: +formatAmount(+calculateLiquid(+data.entry, +data.qty), data.tickSize),
    }
    listOrders.push(firstOrder)
    for (let i = 1; i < data.totalOrder; i++) {
      if (i === 1) {
        const avgPr = calculateEntryPrice([firstOrder, {
          entry: calculateEntry(+firstOrder.liquid),
          volume: getNextVolume(firstOrder.volume),
        }])
        listOrders.push({
          entry: calculateEntry(+firstOrder.liquid),
          volume: getNextVolume(firstOrder.volume),
          avg: avgPr,
          liquid: +formatAmount(+calculateLiquid(avgPr, getNextVolume(firstOrder.volume) + firstOrder.volume), data.tickSize),
        })
      } else {
        const entryAvgItem = calculateEntryPrice([...listOrders, {
          entry: calculateEntry(+listOrders[listOrders.length - 1].liquid),
          volume: getNextVolume(+listOrders[listOrders.length - 1].volume),
        }])
        const liquidItem = calculateLiquid(entryAvgItem, listOrders.reduce((sum, item) => sum + item.volume, 0))
        const itemNewOrder = {
          entry: calculateEntry(+listOrders[listOrders.length - 1].liquid),
          volume: getNextVolume(+listOrders[listOrders.length - 1].volume),
          liquid: +formatAmount(+liquidItem, data.tickSize),
          avg: entryAvgItem,
        }
        listOrders.push(itemNewOrder)
      }
    }
    setOrders(listOrders)
  }
  return {
    data,
    setParam,
    isValid: data.entry > 0 && data.qty > 0 && data.leverage >= 1 && data.totalOrder >= 2 && data.totalOrder < 11,
    orders,
    calculateOrders,
  }
}
