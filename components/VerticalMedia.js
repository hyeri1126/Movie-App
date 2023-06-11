import React from "react";
import styled from "styled-components";
import Rating from "./Rating";
import Poster from "./Poster";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const Movie = styled.View`
    align-items: center;
`
const Title = styled.Text`
    color: white;
    margin-top: 3px;
`
const VMedia = ({
    posterImage,
    title,
    rating,
    allData,
}) => {
    const navigation = useNavigation();
    const goToDetail=() => {
        navigation.navigate("Stack", {
            screen:"Detail", 
            params:{
               ...allData,
            },
        });
    }
    return(
        <TouchableOpacity onPress={goToDetail}>
             <Movie>
                <Poster path={posterImage}/>
                <Title>
                    {title.slice(0,13)}
                    {title.length > 13 ? "..." : null}
                </Title>
                <Rating rating={rating} />
            </Movie>
        </TouchableOpacity>
       
    )

}

export default VMedia;