


export const moviesAPI = { 
    getNowPlaying: () => 
    fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=4&sort_by=year"
    ).then((res)=>res.json()), 
    getUpComing: () => 
    fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=6&sort_by=year"
    ).then((res)=>res.json()),
    getTrending: () => 
    fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=2&sort_by=year"
    ).then((res)=>res.json()),
    search: ({queryKey}) => {
        const [,query] = queryKey;
        return fetch(
            `https://yts.mx/api/v2/list_movies.json?query_term=${query}`
        ).then((res)=>res.json())
    }
};

export const tvAPI = {
    trending: () => 
    fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=2&sort_by=year"
    ).then((res)=>res.json()),

    airingToday: () => 
    fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=5&sort_by=year"
    ).then((res)=>res.json()),

    topRated: () => 
    fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=3&sort_by=year"
    ).then((res)=>res.json()),
};