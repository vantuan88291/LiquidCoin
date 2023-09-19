import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface PortfolioScreenProps extends AppStackScreenProps<"Portfolio"> {}

export const PortfolioScreen: FC<PortfolioScreenProps> = observer(function PortfolioScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
      <Header title={"portfolio"} />
      <Text text="portfolio" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
