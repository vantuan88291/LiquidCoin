import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Screen, Text } from "app/components"
import { AppStackScreenProps } from "../navigators"
import { colors } from "../theme"
import { Liquid } from "./liquid"
import Swiper from "./swiper"
import { Entry } from "./entry"
interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const [position, setPosition] = React.useState(0)
  const ref = React.useRef(null)
  const setTab = (tab) => () => {
    setPosition(tab)
    if (tab === 0) {
      ref?.current?.scrollBy(-1, true)
    } else {
      ref?.current?.scrollBy(tab, true)
    }
  }
  return (
    <Screen
      statusBarStyle="light"
      safeAreaEdges={["top", "bottom"]}
      preset="fixed"
      style={$container}
    >
      <View style={$wrap}>
        <View style={$row}>
          <TouchableOpacity
            onPress={setTab(0)}
            style={[$button, position === 0 && { borderBottomWidth: 2 }]}
          >
            <Text text={"Calculate Liquid"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={setTab(1)}
            style={[$button, position === 1 && { borderBottomWidth: 2 }]}
          >
            <Text text={"Avg Entry"} />
          </TouchableOpacity>
        </View>
        <Swiper
          onIndexChanged={(index) => setPosition(index)}
          ref={ref}
          loop={false}
          showsPagination={false}
        >
          <Liquid />
          <Entry />
        </Swiper>
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
const $wrap: ViewStyle = {
  width: "100%",
  height: "100%",
}
const $row: ViewStyle = {
  flexDirection: "row",
}

const $button: ViewStyle = {
  flex: 1,
  padding: 10,
  alignItems: "center",
  borderColor: colors.palette.secondary100,
}
