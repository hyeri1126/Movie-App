import React from "react";
import styled from "styled-components";

const Text = styled.Text`
    color: rgba(255, 255, 255, 0.8);
    font-size: 10px;
`

const Rating = ({rating}) => {
    return(
        <Text>⭐: {rating}/10</Text>
    )

}

export default Rating;