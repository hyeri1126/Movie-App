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
import { moviesAPI } from '../api';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import Loader from '../components/Loader';
import HList from '../components/HList';



const Container = styled.FlatList`
    background-color: ${props => props.theme.mainBgColor};
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
const VSeperator = styled.View`
    width: 13px;
`
const HSeperator = styled.View`
    height: 30px;
`
//Movie 컴포넌트 START
const Movies = () => {
    const queryClinet = useQueryClient();
    const {
        isLoading:nowPlayingLoading, 
        data:nowPlayingData, 
        isRefetching:isRefetchingNowPlaying,
    } = useQuery(["movies","nowPlaying"], moviesAPI.getNowPlaying)
    const {
        isLoading:upComingLoading, 
        data:upComingData, 
        isRefetching:isRefetchingUpComing,
    } = useQuery(["movies","upComing"], moviesAPI.getUpComing)
    const {
        isLoading:trendingLoading, 
        data:trendingData, 
        isRefetching:isRefetchingTrending,
    } = useQuery(["movies","trending"], moviesAPI.getTrending)
  
    const onRefresh = async () => {
        queryClinet.refetchQueries(["movies"]);
    };
    const renderVMeida = ({item}) => (
        <VMedia 
            posterImage={item.medium_cover_image}
            title={item.title}
            rating={item.rating}
        />
    )
    const renderHMedia = ({item}) => (
        <HMedia 
            posterPath={item.medium_cover_image}
            title={item.title}
            summary={item.summary}
            uploadData={item.date_uploaded}
            rating={item.rating}
        />
    )
    const moviekeyExtractor = (item)=>item.id + "";
    const loading = nowPlayingLoading || upComingLoading || trendingLoading;
    const refreshing = isRefetchingNowPlaying || isRefetchingUpComing || isRefetchingTrending;
  
    // Movie RETURN
    return loading ? (
      <Loader />
    ) : (
      <Container
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListHeaderComponent={<>
            <Swiper 
                loop 
                timeout={3} 
                controlsEnabled={false}
                containerStyle={{ marginBottom:20, width:"100%", height: SCREEN_HEIGHT/4 }}
            >
            {nowPlayingData.data.movies.map((movie) => (
                <Slide key={movie.id}
                    background_image={movie.background_image}
                    medium_cover_image={movie.medium_cover_image}
                    title={movie.title}
                    rating={movie.rating}
                    summary={movie.summary}
                />
            ))}
            </Swiper>
            <HList 
                title="Trending Movies"
                data={trendingData.data.movies}
            />
            {/* <ListContainer>
                <ListTitle>Trending Movies</ListTitle>
                <FlatList 
                    data={trendingData.data.movies}
                    horizontal
                    keyExtractor={moviekeyExtractor}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal:13}}
                    ItemSeparatorComponent={VSeperator}
                    renderItem={renderVMeida}
                />
            </ListContainer> */}
            <CommingSoonTitle>Comming Soon</CommingSoonTitle>
        </>}
        data={upComingData.data.movies}
        keyExtractor={moviekeyExtractor}
        ItemSeparatorComponent={HSeperator}
        renderItem={renderHMedia}

      />
    )
}


export default Movies;