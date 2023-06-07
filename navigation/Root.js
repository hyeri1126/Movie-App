import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";

const Nav =  createNativeStackNavigator();

// Root : 두 개의 Navigator를 렌더링하는 하나의 Navigator
const Root = () => <Nav.Navigator screenOptions={{headerShown:false, presentation:"modal"}}>
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="Stack" component={Stack} />
</Nav.Navigator>;
export default Root;