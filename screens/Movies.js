import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, Button} from 'react-native';
import { Dimensions } from "react-native";
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';



const Container = styled.ScrollView`
    background-color: ${props => props.theme.mainBgColor};
`;

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const { height:SCREEN_HEIGHT } = Dimensions.get("window"); 
// const SCREEN_HEIGHT = Dimensions.get("window").height; -> 위에랑 같은 방식

const Movies = ({navigation:{navigate}}) => {
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([])
    const getNowPlaying = async () => {
        // const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year")
        // const { data } = await response.json();
        const {data} = await (
            await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year")
            ).json();
        console.log("movie data",data.movies);
        setNowPlaying(data.movies);
        setLoading(false);
    }
    useEffect(()=>{
        getNowPlaying();
    },[])
    return loading ? (
        <Loader>
           <ActivityIndicator  />
        </Loader>
    ) : (
      <Container>
        <Swiper 
            loop 
            timeout={3} 
            controlsEnabled={false}
            containerStyle={{ width:"100%", height: SCREEN_HEIGHT/4 }}
        >
           {nowPlaying.map(movie => (
           
           ))}
        </Swiper>
      </Container>
    )
}


export default Movies;