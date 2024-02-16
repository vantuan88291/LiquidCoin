import {observer} from "mobx-react-lite"
import React, {FC} from "react"
import {ScrollView, TextStyle, View, ViewStyle} from "react-native"
import {
  Button,
  Screen,
  Text, TextField, Toggle,
} from "app/components"
import {AppStackScreenProps} from "../navigators"
import {colors} from "../theme"
import {ItemOrder} from "app/screens/ItemOrder";
import {useData} from "app/screens/useData";

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {
}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const {data, setParam, isValid, calculateOrders, orders} = useData()
  const ref = React.useRef(null)
  const renderOrder = (item, index) => <ItemOrder
    lev={+data.leverage}
    tickSize={data.tickSize}
    item={item}
    index={index}
    key={`${index}`}/>
  const onSubmit = () => {
    calculateOrders()
    setTimeout(() => {
      ref.current?.scrollTo({y: 500})
    }, 500)
  }
  return (
    <Screen safeAreaEdges={['top', 'bottom']} preset='fixed' style={$container}>
      <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
        <View>
          <Text preset='subheading' text={'Calculate entry price'}/>
          <View>
            <Toggle
              onPress={async () => {
                await setParam('isLong', !data.isLong)
                if (isValid) {
                  onSubmit()
                }
              }}
              value={data.isLong}
              containerStyle={$bottomContainer}
              label={'Long'}
              helper={'(Choose Long or Short, default is Short)'} />
            <TextField
              value={`${data.entry}`}
              onChangeText={text => setParam('entry', text)}
              containerStyle={$bottomContainer}
              keyboardType='numbers-and-punctuation'
              label={'Entry'}
            />
            <TextField
              value={`${data.qty}`}
              onChangeText={text => setParam('qty', text)}
              containerStyle={$bottomContainer}
              keyboardType='numbers-and-punctuation'
              label={'Quantity (include leverage)'}
            />
            <TextField
              value={`${data.leverage}`}
              onChangeText={text => setParam('leverage', text)}
              containerStyle={$bottomContainer}
              keyboardType='numbers-and-punctuation'
              label={'leverage (Eg: 20)'}
            />
            <TextField
              value={`${data.tickSize}`}
              onChangeText={text => setParam('tickSize', text)}
              containerStyle={$bottomContainer}
              keyboardType='numbers-and-punctuation'
              label={'Tick size(decimal number of coin)'}
            />
            <TextField
              value={`${data.nextPrecent}`}
              onChangeText={text => setParam('nextPrecent', text)}
              containerStyle={$bottomContainer}
              keyboardType='numbers-and-punctuation'
              label={'Percent of next order (%)'}
            />
            <TextField
              value={`${data.risk}`}
              onChangeText={text => setParam('risk', text)}
              containerStyle={$bottomContainer}
              keyboardType='numbers-and-punctuation'
              label={'Ratio risk of next volume'}
            />
            <TextField
              value={`${data.totalOrder}`}
              onChangeText={text => setParam('totalOrder', text)}
              containerStyle={$bottomContainer}
              keyboardType='numbers-and-punctuation'
              label={'Total generate orders'}
            />
            <Button disabledStyle={$btn}
                    disabledTextStyle={$lblDisable}
                    disabled={!isValid}
                    onPress={onSubmit}
                    style={$bottomContainer}
                    preset='filled'
                    text={'Calculate'}/>
          </View>
          {!!orders.length && <View style={$bottomFt}>
            <Text style={$bottomContainer} preset='subheading' text={`Result for ${data.isLong ? 'Long' : 'Short'}: `}/>
            {orders.map(renderOrder)}
          </View>}
        </View>
      </ScrollView>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  padding: 10,
}
const $bottomContainer: ViewStyle = {
  marginTop: 8,
}
const $bottomFt: ViewStyle = {
  paddingBottom: 2,
}
const $btn: ViewStyle = {
  backgroundColor: colors.palette.overlay20
}
const $lblDisable: TextStyle = {
  color: colors.palette.neutral500
}
