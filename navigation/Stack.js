import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { View, Text, TouchableOpacity } from 'react-native';
import Detail from '../screens/Detail';

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
            headerStyle:{
                backgroundColor: "#222f3e"
            },
            headerTitleStyle:{
                color:"white"
    
            },
            
        }}>
            <NativeStack.Screen name="Detail" component={Detail} />
          
        </NativeStack.Navigator>
    )
}

export default Stack;