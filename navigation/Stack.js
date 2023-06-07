import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { View, Text, TouchableOpacity } from 'react-native';

const ScreenOne = ({navigation : {navigate}}) => (
    <TouchableOpacity onPress={() => navigate("Two")}>
        <Text>go to Two</Text>
    </TouchableOpacity>
);

const ScreenTwo = ({navigation : {navigate}}) =>(
    <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>go to Three</Text>
</TouchableOpacity> 
)
const ScreenThree = ({navigation:{ navigate}}) => (
    <TouchableOpacity onPress={()=> navigate("Tabs", {screen:"Search"})}>
        <Text>Go to search</Text>
    </TouchableOpacity>
)

const NativeStack = createNativeStackNavigator();


const Stack = () => {

    return(
        <NativeStack.Navigator screenOptions={{
            headerTintColor:"orange",
            presentation:"modal",
            animation:"slide_from_right",
        }}>
            <NativeStack.Screen name='One' component={ScreenOne} />
            <NativeStack.Screen name='Two' component={ScreenTwo} />
            <NativeStack.Screen name='Three' component={ScreenThree} />
        </NativeStack.Navigator>
    )
}

export default Stack;