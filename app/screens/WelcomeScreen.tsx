import {observer} from "mobx-react-lite"
import React, {FC} from "react"
import {
    LayoutAnimation, Platform,
    ScrollView,
    TextStyle,
    TouchableOpacity, UIManager,
    View,
    ViewStyle
} from "react-native"
import {
    Button, Icon,
    Screen,
    Text, TextField, Toggle,
} from "app/components"
import {AppStackScreenProps} from "../navigators"
import {colors} from "../theme"
import {ItemOrder} from "app/screens/ItemOrder";
import {useData} from "app/screens/useData";

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {
}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
    const {data, setParam, isValid, calculateOrders, orders} = useData()
    const [show, setShow] = React.useState(false)
    const ref = React.useRef(null)
    const renderOrder = (item, index) => <ItemOrder
        lev={+data.leverage}
        tickSize={data.tickSize}
        item={item}
        index={index}
        key={`${index}`}/>
    const onSubmit = () => {
        calculateOrders()
        if (show) {
            setTimeout(() => {
                ref.current?.scrollTo({y: 500})
            }, 500)
        }
    }
    const setAdvan = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShow(arg => !arg)
    }
    return (
        <Screen statusBarStyle='light' safeAreaEdges={['top', 'bottom']} preset='fixed' style={$container}>
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
                            helper={'(Choose Long or Short, default is Short)'}/>
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
                        <TouchableOpacity onPress={setAdvan} style={$btnAdv}>
                            <Text style={$flex} preset={'formLabel'}
                                  text={`Setting: x${data.leverage}, next ${data.nextPrecent}%, ${data.risk}% risk, total: ${data.totalOrder}`}/>
                            <Icon color={colors.text} style={{
                                transform: [{rotate: show ? '180deg' : '0deg'}],
                            }} size={15} icon='down'/>
                        </TouchableOpacity>
                        {show && <View>
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
                                maxLength={2}
                                keyboardType='numbers-and-punctuation'
                                label={'Total generate orders(min 2, max 10)'}
                            />
                        </View>}
                        <Button disabledStyle={$btn}
                                disabledTextStyle={$lblDisable}
                                disabled={!isValid}
                                onPress={onSubmit}
                                style={$bottomContainer}
                                preset='reversed'
                                text={'Calculate'}/>
                    </View>
                    {!!orders.length && <View style={$bottomFt}>
                        <Text style={$bottomContainer} preset='subheading'
                              text={`Result for ${data.isLong ? 'Long' : 'Short'}: `}/>
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
const $btnAdv: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10
}
const $lblDisable: TextStyle = {
    color: colors.palette.neutral500
}
const $flex: TextStyle = {
    flex: 1
}
