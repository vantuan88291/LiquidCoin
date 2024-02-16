import {colors} from "app/theme";
import {Text} from "app/components";
import {TextStyle, View, ViewStyle} from "react-native";
import React from "react";
import {DataItemOrder} from "app/screens/useData";
import {formatAmount} from "app/utils/utils";

export const ItemOrder = ({
                            item,
                            index,
                            lev,
                            tickSize
                          }: { item: DataItemOrder; index: number, lev: number, tickSize: number }) => {
    const renderRow = (title, value) => (
        <View style={$row}>
            <Text text={title}/>
            <Text preset='bold' text={value}/>
        </View>
    )
  return (
    <View style={$root}>
      <Text style={$lbl} preset='subheading' text={`${index + 1}.`}/>
      <View style={$flex}>
          {renderRow(`New Entry:`, `${item.entry} USDT`)}
          {renderRow(`New Volume:`, `${item.volume} USDT`)}
          {renderRow(`Estimated margin:`, `${formatAmount(item.volume / lev, tickSize)} USDT`)}
          {renderRow(`Liquid Price:`, `${formatAmount(+item.liquid + (item.liquid * (0.09353 / 100)), tickSize)} USDT`)}
          {renderRow(`Entry after DCA:`, `${formatAmount(item?.avg, tickSize)} USDT`)}
      </View>
    </View>
  )
}
const $root: ViewStyle = {
  flexDirection: 'row',
  backgroundColor: colors.palette.secondary100,
  padding: 6,
  borderRadius: 8,
  alignItems: 'flex-start',
  marginTop: 10,
}

const $lbl: TextStyle = {
  marginRight: 10,
}

const $flex: ViewStyle = {flex: 1}

const $row: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 2
}
