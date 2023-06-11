import React , {useEffect} from 'react';
import styled from 'styled-components/native';
import {View, Text, Dimensions, StyleSheet, Linking, TouchableOpacity, Share, Platform} from 'react-native';
import Poster from '../components/Poster';
import { LinearGradient } from 'expo-linear-gradient';
import { BLACK_COLOR } from '../colors';
import { useQuery } from 'react-query';
import { moviesAPI, tvAPI } from '../api';
import Loader from '../components/Loader';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const { height:SCREEN_HEIGHT } = Dimensions.get("window"); 

const Container = styled.ScrollView`
     background-color: ${props => props.theme.mainBgColor};
`
const Header = styled.View`
    height: ${SCREEN_HEIGHT/4}px;
    justify-content: flex-end;
    padding: 0px 20px;
`
const Background = styled.Image`
`
const Column = styled.View`
    flex-direction: row;
`
const Title = styled.Text`
    color: white;
    font-size: 30px;
    font-weight: 500;
    align-self: flex-end;
    width: 70%;
    margin-left:15px;
`
const Overview = styled.Text`
    color:  ${props => props.theme.textColor};
    margin:20px 0;
`
const VideoBtn = styled.TouchableOpacity`
    flex-direction: row;
`;
const BtnText = styled.Text`
    color:white;
    font-weight: 600;
    margin-bottom: 10px;
    margin-left: 15px;
    width: 70%;
`;
// const goToDetail=() => {
//     navigation.navigate("Stack", {
//         screen:"Detail" , 
//         params:{
//             title,
//         },
//     });
// }
const Data = styled.View`
    padding: 0 20px;
`

const Detail = ({
    navigation:{setOptions},
    route:{params}
    }) => {
    const ShareMedia =async() => {
      
        await Share.share({
            url:params.url,
            message:params.description_intro,
            title:params.title
        })
    }
    const ShareButton = () => (
        <TouchableOpacity onPress={ShareMedia}>
            <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
    );
    console.log("params는?", params);
    const {isLoading,data:movieData} = useQuery(
        ["movies", params.id], 
        moviesAPI.detail
    );
    console.log("isLoading상태는?", isLoading);
    console.log("data는?",movieData);
    useEffect(()=>{
        setOptions({
            title: params.title,
            headerRight: () => <ShareButton />
        })
    },[]);
    const openLink = async() => {
        const baseUrl=params.url;
        await Linking.openURL(baseUrl);
    }
    // const allData=params.allData;
    //    const movieDetailData = movieData.data.movie;
    //console.log(data);        
    // console.log(data.data.movie.torrents)
    return(
        <Container>
            <Header>
                <Background 
                    style={StyleSheet.absoluteFill} 
                    source={{uri:params.background_image}}
                />
                 <LinearGradient 
                    colors={["transparent", BLACK_COLOR]} 
                    style={StyleSheet.absoluteFill} 
                />
                <Column>
                    <Poster path={params.medium_cover_image} />
                    <Title>{params.title_long}</Title>
                </Column>
                
            </Header>
            <Data>
                <Overview>{params.summary}</Overview>
                {isLoading ? <Loader/> : null}
                {/* //API에서 받아온 data를 인식하지 못함. 이미 Detail Screen에 있으면 API 정보에 접근이 가능한데 Screen으로 이동할 때는 api 정보를 받지 못함 */}
                {/* {data.data.movie.torrents.map((torrent) => (
                    <VideoBtn key={torrent.peers}>
                        <MaterialCommunityIcons name="movie-play-outline" size={24} color="white" />
                        <BtnText>{torrent.url}</BtnText>
                    </VideoBtn>
                ))} */}
              
                <VideoBtn onPress={()=>openLink(params.id)}>
                    <MaterialCommunityIcons name="movie-play-outline" size={24} color="white" />
                    <BtnText>URL to watching movie</BtnText>
                </VideoBtn>
              
            </Data>
          

           
        </Container>
    )
}

export default Detail;