import { colors } from "app/theme"
import { Text } from "app/components"
import { TextStyle, View, ViewStyle } from "react-native"
import React from "react"
import { DataItemOrder } from "app/screens/liquid/useData"
import { formattedCurrency } from "app/utils/utils"

export const ItemOrder = ({
  item,
  index,
  lev,
  tickSize,
}: {
  item: DataItemOrder
  index: number
  lev: number
  tickSize: number
}) => {
  const renderRow = (title, value, color = colors.text) => (
    <View style={$row}>
      <Text text={title} />
      <Text style={[$value, { color }]} preset="bold" text={value} />
    </View>
  )
  return (
    <View style={$root}>
      <Text style={$lbl} preset="subheading" text={`${index + 1}.`} />
      <View style={$flex}>
        {renderRow(`New Entry:`, `${formattedCurrency(item.entry)} USDT`)}
        {renderRow(`New Volume:`, `${formattedCurrency(item.volume)} USDT`)}
        {renderRow(
          `Estimated margin:`,
          `${formattedCurrency(item.volume / lev, tickSize)} USDT`,
          colors.palette.secondary400,
        )}
        {renderRow(
          `Liquid Price:`,
          `${formattedCurrency(+item.liquid + item.liquid * (0.09353 / 100), tickSize)} USDT`,
          colors.palette.angry500,
        )}
        {renderRow(
          `Entry after DCA:`,
          `${formattedCurrency(item?.avg, tickSize)} USDT`,
          colors.palette.secondary400,
        )}
      </View>
    </View>
  )
}
const $root: ViewStyle = {
  flexDirection: "row",
  backgroundColor: colors.palette.neutral900,
  padding: 6,
  borderRadius: 8,
  alignItems: "flex-start",
  marginTop: 10,
}

const $lbl: TextStyle = {
  marginRight: 10,
}
const $value: TextStyle = {
  flex: 1,
  textAlign: "right",
}

const $flex: ViewStyle = { flex: 1 }

const $row: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 5,
  paddingVertical: 2,
}
