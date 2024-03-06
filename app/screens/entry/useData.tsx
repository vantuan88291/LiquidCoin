import React, { createContext, useContext, useState } from "react"
import { calculateEntryPrice } from "../liquid/useData"
import { formatAmount } from "../../utils/utils"

export const EntryContext = createContext({})

export const useEntryContext = () => useContext(EntryContext)
export const EntryProvider = ({ children }) => {
  const [render, setRender] = useState(false)
  const [tickSize, setTickSize] = useState(3)
  const [leverage, setLeverage] = useState(20)
  const [data, setData] = useState([
    {
      entry: "",
      volume: "",
    },
  ])
  const avgEntry = calculateEntryPrice(data.filter((item) => item.volume && item.entry))
  const avgVolume = data
    .filter((item) => item.volume && item.entry)
    .reduce((sum, item) => {
      return sum + +item.volume
    }, 0)
  const addMoreEntry = () => {
    data.push({
      entry: "",
      volume: "",
    })
    setRender((arg) => !arg)
  }
  const removeEntry = (index) => {
    if (data.length > 1) {
      setData(data.filter((item, i) => index !== i))
    }
  }
  const onchangeInput = (index, key, value) => {
    data[index][key] = value
    setRender((arg) => !arg)
  }
  const calculateLiquid = (entry: number, vol: number, isLong: boolean) => {
    const cont = vol / entry
    let liquid = 0
    const psMargin = entry * (cont / +(leverage || 1))
    const mainMargin = entry * cont * 0.005
    if (isLong) {
      liquid = (mainMargin - psMargin + entry * cont) / cont
    } else {
      liquid = (entry * cont - mainMargin + psMargin) / cont
    }
    return formatAmount(liquid, +tickSize)
  }
  const liquidLong = calculateLiquid(avgEntry, avgVolume, true)
  const liquidShort = calculateLiquid(avgEntry, avgVolume, false)
  return (
    <EntryContext.Provider
      value={{
        data,
        removeEntry,
        addMoreEntry,
        onchangeInput,
        totalVolume: avgVolume,
        avgEntry,
        tickSize,
        setTickSize,
        leverage,
        setLeverage,
        liquidLong: liquidLong + liquidLong * (0.09353 / 100),
        liquidShort: liquidShort + liquidLong * (0.09353 / 100),
      }}
    >
      {children}
    </EntryContext.Provider>
  )
}

export const withEntryContext = (Component) =>
  function ComponentProvidedByEntryContext({ ...props }) {
    return (
      <EntryProvider>
        <EntryContext.Consumer>
          {(context) => <Component {...props} {...context} />}
        </EntryContext.Consumer>
      </EntryProvider>
    )
  }
