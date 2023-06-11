import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { tvAPI } from '../api';
import Loader from '../components/Loader';
import HList from '../components/HList';

const Tv = () => {
    const queryClinet = useQueryClient();
    // const [refreshing, setRefreshing] = useState(false)
    const {isLoading:todayLoading, data:todayData, isRefetching:todayRefetching} = useQuery(
        ["tv", "today"], 
        tvAPI.airingToday
    );
    const {isLoading:topLoading, data:topData, isRefetching:topRefetching} = useQuery(
        ["tv", "top"], 
        tvAPI.topRated
    );
    const {isLoading:trendingLoading, data:trendingData, isRefetching:trendingRefetching} = useQuery(
        ["tv", "trending"], 
        tvAPI.trending
    );
    const loading = todayLoading || topLoading || trendingLoading;
    const refreshing = todayRefetching || topRefetching || trendingRefetching;
    console.log(refreshing)
    const onRefresh = () => {
        queryClinet.refetchQueries(["tv"]);
    }
    if(loading){
        return <Loader />
    }
    return(
       <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} 
        contentContainerStyle={{paddingVertical:20}}>
            <HList 
                title="Trending TV"
                data={trendingData.data.movies}
            />
            <HList 
                title="Airing Today"
                data={todayData.data.movies}
            />
            <HList 
                title="Top Rated TV"
                data={topData.data.movies}
            />
       </ScrollView>
    )
}

export default Tv;