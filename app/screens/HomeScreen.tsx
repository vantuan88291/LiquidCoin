import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Button } from "app/components"
import { useStores } from "../models"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const { authenticationStore } = useStores()

  return (
    <Screen style={$root} preset="fixed">
      <Header title={"Home"} />
      <Button onPress={authenticationStore.logout} tx="common.logOut" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
