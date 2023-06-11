import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.ScrollView`

`
const SearchBar = styled.TextInput`
    background-color: white;
    padding: 10px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 20px auto;
`
const Search = () => {
    const [query, setQuery] = useState("");
    const onChangeText = (text) => setQuery(text);
    const onSubmit = () => {
        if(query === ""){
            return;
        }
        alert("searh")
    }
    return(
        <Container>
            <SearchBar 
                placeholder='Search for Movie or TV Show update'
                placeholderTextColor="grey"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            />
        </Container>
    )
}

export default Search;