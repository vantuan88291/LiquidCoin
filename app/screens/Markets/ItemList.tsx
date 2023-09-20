import { Button, Text } from "../../components"
import { colors } from "../../theme"
import React from "react"
import { DataMarketProps } from "../../models/Market.props"
import { ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"

interface ItemListProps {
  item: DataMarketProps
  index: number
  scrollTop(): void
}
export const ItemList = observer((props: ItemListProps) => {
  const { market } = useStores()
  const onSetIndex = () => {
    market.setPosition(props.index)
    props?.scrollTop()
  }
  return (
    <Button
      onPress={onSetIndex}
      preset="normal"
      style={[
        $btnTitle,
        {
          backgroundColor:
            market.positionSelected === props.index
              ? colors.palette.blueSelected
              : colors.palette.blueUnSelected,
        },
      ]}
    >
      <Text
        preset={"bold"}
        text={props.item.title}
        color={
          market.positionSelected === props.index
            ? colors.palette.neutral100
            : colors.palette.greyText
        }
      />
    </Button>
  )
})

const $btnTitle: ViewStyle = {
  paddingHorizontal: 25,
  marginRight: 10,
  borderRadius: 6,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 15,
}
