import { colors } from "../../theme"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import React from "react"
import { useEntryContext } from "./useData"
import { formattedCurrency } from "../../utils/utils"

export const Result = () => {
  const { totalVolume, avgEntry, tickSize, liquidLong, liquidShort } = useEntryContext()
  return (
    <View>
      <View style={$container}>
        <View style={$row}>
          <Text text={"Agv entry:"} />
          <Text preset="bold" style={$lbl} text={`${formattedCurrency(avgEntry, tickSize)} USDT`} />
        </View>
        <View style={$row}>
          <Text text={"Volume:"} />
          <Text
            preset="bold"
            style={$lbl}
            text={`${formattedCurrency(totalVolume, tickSize)} USDT`}
          />
        </View>
      </View>
      <View style={$container}>
        <View style={$row}>
          <Text text={"Liquid Long:"} />
          <Text
            preset="bold"
            style={$long}
            text={`${formattedCurrency(liquidLong, tickSize)} USDT`}
          />
        </View>
        <View style={$row}>
          <Text text={"Liquid Short:"} />
          <Text
            preset="bold"
            style={$short}
            text={`${formattedCurrency(liquidShort, tickSize)} USDT`}
          />
        </View>
      </View>
    </View>
  )
}
const $container: ViewStyle = {
  backgroundColor: colors.palette.neutral900,
  padding: 6,
  borderRadius: 8,
  marginVertical: 10,
}
const $row: ViewStyle = {
  flexDirection: "row",
  marginBottom: 4,
}
const $lbl: TextStyle = { flex: 1, textAlign: "right" }
const $long: TextStyle = { flex: 1, textAlign: "right", color: colors.palette.green }
const $short: TextStyle = { flex: 1, textAlign: "right", color: colors.palette.red }
