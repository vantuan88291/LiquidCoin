import { colors } from "../../theme"
import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import React from "react"
import { ItemMarketProps } from "../../models/Market.props"

interface ItemCoinProps {
  item: ItemMarketProps
}

export const ItemCoin = (props: ItemCoinProps) => {
  const { item } = props
  return (
    <View style={$container}>
      <View style={$rowCoin}>
        <Image
          style={$imgCoin}
          source={{
            uri: `https://tokenize-dev.com/assets/images/currency-logos/${item?.marketCurrency?.toLowerCase()}.png`,
          }}
        />
        <View>
          <Text
            size="sm"
            color={colors.palette.neutral800}
            preset="heading"
            text={item?.marketName}
          />
          <Text
            preset="formLabel"
            color={colors.palette.greyText}
            text={item?.marketCurrencyLong}
          />
        </View>
      </View>
      <View style={$rowPrice}>
        <Text
          size="sm"
          color={colors.palette.neutral800}
          preset="heading"
          text={`$${item?.lastPrice || "0"}`}
        />
        <Text
          preset="formLabel"
          color={item?.isReduce ? colors.palette.red : colors.palette.green}
          text={item?.percent}
        />
      </View>
    </View>
  )
}
const $container: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  padding: 15,
  flexDirection: "row",
  marginVertical: 6,
  borderRadius: 8,
  justifyContent: "space-between",
}
const $rowCoin: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $imgCoin: ImageStyle = {
  width: 38,
  height: 38,
  resizeMode: "contain",
  marginRight: 10,
}
const $rowPrice: ImageStyle = {
  alignItems: "flex-end",
}
