import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import { View, Text, useColorScheme} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from '../colors';
import Stack from './Stack';

const Tab = createBottomTabNavigator();

// Tab.Screen의 name은 네비게이션 상단에 뜨는 이름임

const Tabs = () => {
    const isDark = useColorScheme() === "dark";
    // console.log(isDark);
    return(
        <Tab.Navigator 
          sceneContainerStyle={{
            backgroundColor :isDark ? "white" : BLACK_COLOR,
          }} 
          screenOptions={{
            tabBarStyle:{
                backgroundColor : isDark ? "white" : BLACK_COLOR,
            },
            tabBarActiveTintColor: isDark ? BLACK_COLOR : YELLOW_COLOR,
            tabBarInactiveTintColor: isDark ? LIGHT_GREY : DARK_GREY,
            headerStyle:{
                backgroundColor : isDark ? "white" : BLACK_COLOR,
            },
            headerTitleStyle : {
                color: isDark? BLACK_COLOR : "white" ,
            },
            tabBarLabelStyle : {
                marginTop: -3,
                fontSize:12,
                fontWeight:"600",
            },
          }} >
            <Tab.Screen name="Movies" component={Movies} options={{
                tabBarIcon:({focused, color, size}) => {
                    console.log(focused, color, size);
                    return <Ionicons name="film-outline" color={color} size={size} />
                }
            }} />
            <Tab.Screen name="TV" component={Tv} options={{
                tabBarIcon:({focused, color, size}) => {
                    console.log(focused, color, size);
                    return <Ionicons name="tv-outline" color={color} size={size} />
                }
            }}/>
            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon:({focused, color, size}) => {
                    console.log(focused, color, size);
                    return <Ionicons name="search-outline" color={color} size={size} />
                }
            }} />
        </Tab.Navigator>
    )
}

export default Tabs;