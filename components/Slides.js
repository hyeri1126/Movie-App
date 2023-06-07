import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";


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
const Poster = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 8px;
`
const Wrapper = styled.View`
    flex-direction:row;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const TitleView = styled.View`
    width: 50%;
`;
const Column = styled.View`
   width: 50%;
   margin-left: 18px;
`
const OverView = styled.Text`
    color: rgba(255,255,255,0.6);
    margin-top: 10px;
    font-weight: 500;
`;
const Votes = styled.Text`
    color: rgba(255,255,128,0.8);
    font-size: 10px;
    font-weight: 500;
`;


const Slide = () => {
    return(
        <View style={{flex:1}}>
            <BgImg source={{uri:movie.background_image}}></BgImg>
            <PosterView >
                <Wrapper>
                    <Poster source={{uri:movie.medium_cover_image}}></Poster>
                    <Column>
                        <Title>{movie.title}</Title>
                        <Votes>평점 : {movie.rating}</Votes>
                        <OverView>{movie.summary.slice(0,90)}...</OverView>
                    </Column>
                </Wrapper>
            </PosterView>
        </View>
    )
}

export default Slide;