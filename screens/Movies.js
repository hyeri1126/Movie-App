import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, Button, ScrollView} from 'react-native';
import { Dimensions } from "react-native";
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import Slide from '../components/Slides';
import Poster from '../components/Poster';



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

const ListTitle = styled.Text`
    color: white;
    font-size: 16px;
    margin-left: 15px;
    font-weight: 500;
    margin-bottom: 20px;
`
const TrendingScroll = styled.ScrollView`
   
`
const Movie = styled.View`
    margin-right: 10px;
    align-items: center;
`
const Title = styled.Text`
    color: white;
    margin-top: 3px;
`
const Votes = styled.Text`
    color: rgba(255, 255, 255, 0.8);
    font-size: 10px;
`
const ListContainer = styled.View`
    margin-bottom: 20px;
`
const CommingSoonTitle= styled(ListTitle)`
    
`
const HorizontalMovie = styled.View`
    padding: 0px 15px;
    flex-direction: row;
    margin-bottom: 30px;
    width: 80%;
`
const HColumn = styled.View`
    margin-left: 15px;
    width: 80%;
`
const Overview = styled.Text`
    color: white;
    opacity:0.7;
  
`
const Release = styled.Text`
    color: white;
    font-size: 11px;
    margin-bottom: 10px;
`
const Movies = ({navigation:{navigate}}) => {
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([])
    const [upComing, setUpcoming] = useState([])
    const [trending, setTrending] = useState([])
    const getNowPlaying = async () => {
        // const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year")
        // const { data } = await response.json();
        const {data} = await (
            await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year")
        ).json();
        setNowPlaying(data.movies);
    };
    const getUpComing = async () => {
        const {data} = await (
            await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=6&sort_by=year")
        ).json();
        setUpcoming(data.movies)
    };
    const getTrending = async() => {
        const {data} = await (
            await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=3&sort_by=year")
        ).json();
        setTrending(data.movies)
    }
    const getData = async () => {
        await Promise.all([getTrending(), getNowPlaying(), getUpComing()])
        setLoading(false);
    };
    useEffect(()=>{
        getData()
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
            containerStyle={{ marginBottom:20, width:"100%", height: SCREEN_HEIGHT/4 }}
        >
           {nowPlaying.map(movie => (
            <Slide key={movie.id}
                background_image={movie.background_image}
                medium_cover_image={movie.medium_cover_image}
                title={movie.title}
                rating={movie.rating}
                summary={movie.summary}
            />
           ))}
        </Swiper>
        <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll 
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{paddingLeft:13}}
            >
                {trending.slice(0,15).map(movie => (
                    <Movie key={movie.id}>
                        <Poster path={movie.medium_cover_image}/>
                        <Title>
                            {movie.title.slice(0,13)}
                            {movie.title.length > 13 ? "..." : null}
                        </Title>
                        <Votes>rating: {movie.rating}/10</Votes>
                    </Movie>
                ))}
            </TrendingScroll>
        </ListContainer>
        <CommingSoonTitle>Comming Soon</CommingSoonTitle>
        {upComing.slice(1,20).map(movie => (
            <HorizontalMovie key={movie.id}>
                <Poster path={movie.medium_cover_image}/>
                <HColumn>
                    <Title style={{marginBottom:10}}>{movie.title}</Title>
                    <Release>
                        {new Date(movie.date_uploaded.slice(0,10)).toLocaleDateString("ko", {
                            month:"long", day:"numeric", year:"numeric"
                        })}
                    </Release>
                    {movie.summary.length > 140 ? 
                    <Overview>{movie.summary.slice(0,140)}...</Overview> :
                    <Overview >{movie.summary}</Overview>}
                 
                </HColumn>
            </HorizontalMovie>
        ))}
      </Container>
    )
}


export default Movies;