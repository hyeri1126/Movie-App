import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, RefreshControl, FlatList} from 'react-native';
import { Dimensions } from "react-native";
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import Slide from '../components/Slides';
import Poster from '../components/Poster';
import Rating from '../components/Rating';
import VMedia from '../components/VerticalMedia';
import HMedia from '../components/HorizontalMedia';



const Container = styled.FlatList`
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

const ListContainer = styled.View`
    margin-bottom: 20px;
`
const CommingSoonTitle= styled(ListTitle)`
    
`

const Movies = ({navigation:{navigate}}) => {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false)
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
            await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=2&sort_by=year")
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
    const onRefresh = async () => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
    }

    return loading ? (
        <Loader>
           <ActivityIndicator  />
        </Loader>
    ) : (
      <Container
        ListHeaderComponent={<>
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
                <FlatList 
                    data={trending}
                    horizontal
                    keyExtractor={(item)=>item.id + ""}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal:13}}
                    ItemSeparatorComponent={() => 
                        <View style={{width:13}} />
                    }
                    renderItem={({item}) => 
                        <VMedia 
                            posterImage={item.medium_cover_image}
                            title={item.title}
                            rating={item.rating}
                        />
                    }
                />
            </ListContainer>
            <CommingSoonTitle>Comming Soon</CommingSoonTitle>
        </>}
        data={upComing}
        keyExtractor={(item)=>item.id+""}
        ItemSeparatorComponent={() => <View style={{height:30}} />}
        renderItem={({item}) => 
            <HMedia 
                posterPath={item.medium_cover_image}
                title={item.title}
                summary={item.summary}
                uploadData={item.date_uploaded}
                rating={item.rating}
            />
        }

      />
    )
}


export default Movies;