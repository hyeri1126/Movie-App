import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { moviesAPI } from '../api';
import Loader from "../components/Loader"
import HList from '../components/HList';

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
    const {isLoading, data, refetch:searchMovies} = useQuery(
        ["searchMovies", query],
        moviesAPI.search,{
            enabled:false,
        })
    const onChangeText = (text) => setQuery(text);
    const onSubmit = () => {
        if(query === ""){
            return;
        }
        //query가 사용자들이 search 버튼을 누를 때까지 실행되지 않도록 하기. 
        searchMovies();
    }
    console.log(isLoading, data)
    return(
        <Container>
            <SearchBar 
                placeholder='Search for Movie or TV Show'
                placeholderTextColor="grey"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            />
            {isLoading ? <Loader /> : null}
            {data ? (
                <HList title="Movie Results" data={data.data.movies} /> 
            )  : null}
        </Container>
    )
}

export default Search;