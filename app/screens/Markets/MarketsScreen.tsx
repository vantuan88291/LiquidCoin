import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  FlatList,
  ListRenderItem,
  View,
  RefreshControl,
  ActivityIndicator,
} from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Header } from "app/components"
import { useStores } from "../../models"
import { DataMarketProps, ItemMarketProps } from "../../models/Market.props"
import { colors } from "../../theme"
import { ItemCoin } from "./ItemCoin"
import { ItemList } from "./ItemList"

interface MarketsScreenProps extends AppStackScreenProps<"Markets"> {}

export const MarketsScreen: FC<MarketsScreenProps> = observer(function MarketsScreen() {
  const { market, authenticationStore } = useStores()
  const ref = React.useRef(null)
  React.useEffect(() => {
    market.getMarkets()
  }, [])
  const scrollTop = () => {
    ref.current?.scrollToOffset({ animated: true, offset: 0 })
  }
  const renderTitleItem: ListRenderItem<DataMarketProps> = ({ item, index }) => (
    <ItemList scrollTop={scrollTop} index={index} item={item} />
  )
  const renderItem: ListRenderItem<ItemMarketProps> = ({ item }) => <ItemCoin item={item} />
  return (
    <View style={$root}>
      <Header titleTx={"menu.market"} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={$listTitle}
        keyExtractor={(item) => item.title}
        horizontal
        data={market.data}
        extraData={market.data.length}
        renderItem={renderTitleItem}
      />
      <FlatList
        ref={ref}
        refreshControl={
          <RefreshControl refreshing={authenticationStore.loading} onRefresh={market.getMarkets} />
        }
        removeClippedSubviews
        initialNumToRender={11}
        keyExtractor={(item) => item.id + ""}
        contentContainerStyle={$listItem}
        data={market.listCoins}
        extraData={market.listCoins.length}
        renderItem={renderItem}
      />
      {authenticationStore.loading && !market.data.length && (
        <ActivityIndicator style={$loading} size="large" color={colors.text} />
      )}
    </View>
  )
})

const $root: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
}
const $listTitle: ViewStyle = {
  paddingHorizontal: 20,
}
const $listItem: ViewStyle = {
  paddingHorizontal: 10,
  paddingVertical: 10,
}
const $loading: ViewStyle = {
  position: "absolute",
  top: 200,
  alignSelf: "center",
}
