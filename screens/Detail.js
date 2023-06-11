import React , {useEffect} from 'react';
import styled from 'styled-components';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Poster from '../components/Poster';
import { LinearGradient } from 'expo-linear-gradient';
import { BLACK_COLOR } from '../colors';
import { useQuery } from 'react-query';
import { moviesAPI, tvAPI } from '../api';
import Loader from '../components/Loader';

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

`;
const BtnText = styled.Text`
    color:white;
    font-weight: 600;
    margin-bottom: 10px;
`;
const Data = styled.View`
    padding: 0 10px;
`

const Detail = ({
    navigation:{setOptions},
    route:{params},
    }) => {
        const {isLoading,data:movieData} = useQuery(
            ["movies", params.id], 
            moviesAPI.detail
            //query들을 원할 때 enable, disable 시킬 수 있음 -> { enabled : true or false}
            );
        useEffect(()=>{
            setOptions({
                title:  params.title
            })
        },[]);
       const data = movieData.data.movie;
       console.log(data);        
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
                {data.torrents.map((url) => (
                    <VideoBtn key={url.peers}>
                        <BtnText>
                            {url.date_uploaded}
                        </BtnText>
                    </VideoBtn>
                ))}
            </Data>
           
        </Container>
    )
}

export default Detail;