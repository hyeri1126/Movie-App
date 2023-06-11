import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import Rating from "./Rating";
import { useNavigation } from "@react-navigation/native";

const BgImg = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
`;
const Title = styled.Text`
    color: white;
    font-weight: 500;
`
const PosterView = styled.View`
   
`

const Wrapper = styled.View`
    flex-direction:row;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Column = styled.View`
   width: 50%;
   margin-left: 20px;
`
const OverView = styled.Text`
    color: rgba(255,255,255,0.6);
    margin-top: 10px;
    font-weight: 500;
`;



const Slide = ({
    background_image,
    medium_cover_image,
    title,
    rating,
    summary,
    allData,
}) => {
    const navigation = useNavigation();
    const goToDetail=() => {
        navigation.navigate("Stack", {
            screen:"Detail" , 
            params:{
                ...allData,
            },
        });
    }
    return(
        <TouchableWithoutFeedback onPress={goToDetail}>
            <View style={{flex:1}}>
                <BgImg source={{uri:background_image}}></BgImg>
                <PosterView >
                    <Wrapper>
                        <Poster path={medium_cover_image} />
                        <Column>
                            <Title>{title}</Title>
                            <Rating rating={rating} />
                            <OverView>{summary.slice(0,90)}...</OverView>
                        </Column>
                    </Wrapper>
                </PosterView>
            </View>
        </TouchableWithoutFeedback>

    )
}

export default Slide;