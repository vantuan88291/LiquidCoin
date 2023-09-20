import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface MoreScreenProps extends AppStackScreenProps<"More"> {}

export const MoreScreen: FC<MoreScreenProps> = observer(function MoreScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
      <Header title={"more"} />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
