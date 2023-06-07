import React from "react";
import styled from "styled-components";

const Image = styled.Image`
    width: 120px;
    height: 160px;
    border-radius: 8px;
`

const Poster = ({path}) =>{
    return(
        <Image source={{uri:path}}></Image>
    )
}

export default Poster;