import React from "react";
import styled from "styled-components";
import Poster from "./Poster";


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
const Title = styled.Text`
    color: white;
    margin-top: 3px;
`

const HMedia = ({
    posterPath,
    title,
    summary,
    uploadData,
    rating,

}) => {
    return(
        <HorizontalMovie>
            <Poster path={posterPath}/>
            <HColumn>
                <Title style={{marginBottom:10}}>{title}</Title>
                <Release>
                    {new Date(uploadData.slice(0,10)).toLocaleDateString("ko", {
                        month:"long", day:"numeric", year:"numeric"
                    })}
                </Release>
                {summary.length > 140 ? 
                <Overview>{summary.slice(0,140)}...</Overview> :
                <Overview >{summary}</Overview>}
            
            </HColumn>
        </HorizontalMovie>

    )
}

export default HMedia;