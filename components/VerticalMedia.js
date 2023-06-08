import React from "react";
import styled from "styled-components";
import Rating from "./Rating";
import Poster from "./Poster";

const Movie = styled.View`
    margin-right: 10px;
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
}) => {
    return(
        <Movie>
            <Poster path={posterImage}/>
            <Title>
                {title.slice(0,13)}
                {title.length > 13 ? "..." : null}
            </Title>
            <Rating rating={rating} />
        </Movie>
    )

}

export default VMedia;