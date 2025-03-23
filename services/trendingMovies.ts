export const TMDB_CONFIG ={
    BASE_URL :"https://api.themoviedb.org/3",
    API_KEY :process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers:{
        accept:"application/json",
        Authorization:`Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchTrendingMovies =async()=>{
    const endpoint = `${TMDB_CONFIG.BASE_URL}/trending/movie/day?language=en-US`

    const response = await fetch(endpoint,{
        method:'GET',
        headers:TMDB_CONFIG.headers
    })
    if(!response.ok){
        throw new Error()
    }
    const data = await response.json()
    
    return data;
}


