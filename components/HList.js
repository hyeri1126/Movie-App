import React from "react";
import styled from "styled-components";
import { FlatList } from "react-native";
import VMedia from "./VerticalMedia";

const ListContainer = styled.View`
    margin-bottom: 20px;
`
const ListTitle = styled.Text`
    color: white;
    font-size: 16px;
    margin-left: 15px;
    font-weight: 500;
    margin-bottom: 20px;
`
export const HListSeperator = styled.View`
    width: 13px;
`

const HList = ({title, data}) => {
    return (
        <ListContainer>
            <ListTitle>{title}</ListTitle>
            <FlatList 
                    contentContainerStyle={{paddingHorizontal:13}}
                    horizontal
                    ItemSeparatorComponent={HListSeperator}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item)=>item.id+""}
                    data={data}
                    renderItem={({item}) => 
                        <VMedia 
                            posterImage={item.medium_cover_image}
                            title={item.title}
                            rating={item.rating}
                        />
                    }
                />
        </ListContainer>
        
    )
}

export default HList;