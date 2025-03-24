import SearchBar from "@/components/searchbar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/movieCard";
import { fetchTrendingMovies } from "@/services/trendingMovies";
import { useEffect, useState } from "react";
import TrendingCard from "@/components/trendingCard";

export default function Index() {
  const router = useRouter();

    const {data:movies,loading:moviesLoading,error:moviesError} = useFetch(()=>
    fetchMovies({query:''})
    )

    const [trendingMovies,setTrendingMovies]=useState();

    useEffect(() => {
      // Fetch trending movies when the component mounts
      fetchTrendingMovies()
        .then((data) => {
          data.results = data.results.slice(0, 10); // Limit to the top 10 movies
          setTrendingMovies(data.results);
        })
        .catch((error) => {
          console.error("Error fetching trending movies:", error);
        });
    }, []);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full"/>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={
      {
        minHeight:"100%",
        paddingBottom:10
      }
      }>
        <Image  source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5 "/>
        {
          moviesLoading?(
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="self-center mt-10"
            />
          ):moviesError?(
            <Text>Error:{moviesError.message}</Text>
          ):(
            <View className="flex-1 mt-5">
          <SearchBar
          onPress={
            ()=>router.push("/search")
          }
          placeholder="Search for a movie"
          />
          {trendingMovies&&(
            <View>
              <Text className="mb-3 text-xl font-bold text-white">Trending Movies </Text>
              <FlatList
                horizontal
                
                data={trendingMovies}
                renderItem={({item,index})=>(
                  //<Text className="text-sm text-white">{item.title}</Text>
                  <TrendingCard movie={item} index={index} />
                )}
                className="mt-3 mb-3"
                keyExtractor={(item)=>item.id.toString()}
                showsHorizontalScrollIndicator={false}

              />
            </View>
          )}
          <>

          <Text className="mt-5 mb-3 font-bold text-white ">Latest Movies</Text>
          </>
          <FlatList
          data={movies}
          renderItem={({item})=>(
            <MovieCard
            {...item}
            />
          )}
          keyExtractor={(item)=>item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent:"flex-start",
            gap:20,
            marginBottom:10,
            paddingRight:5
          }}
          className="pb-32 mt-2"
          scrollEnabled={false}
          />
        </View>
        
          )}
        
        </ScrollView> 
    </View>
  )
}
