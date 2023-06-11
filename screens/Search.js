import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';

const Container = styled.ScrollViw`

`
const SearchBar = styled.TextInput`
    background-color: white;
    padding:10px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 10px auto;
`
const Search = () => {
    const [query,setQuery] = useState("");
    const onChangeText = (text) => setQuery(text)
    console.log(query)
    return(
        <Container>
            <SearchBar 
                placeholder="Search for Movie or TV Show"
                placehloderTextColor="grey"
                returnKeyLabel="search"
                onChange={onChangeText}
            />
       
        </Container>
    )
}

export default Search;