import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface WalletsScreenProps extends AppStackScreenProps<"Wallets"> {}

export const WalletsScreen: FC<WalletsScreenProps> = observer(function WalletsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
      <Header title={"wallets"} />
      <Text text="wallets" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
