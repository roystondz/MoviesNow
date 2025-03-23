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
      <Image source={images.bg} className="absolute w-full z-0"/>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={
      {
        minHeight:"100%",
        paddingBottom:10
      }
      }>
        <Image  source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto  "/>
        {
          moviesLoading?(
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-10 self-center"
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
              <Text className="text-xl text-white mb-3 font-bold">Trending Movies </Text>
              <FlatList
                horizontal
                
                data={trendingMovies}
                renderItem={({item,index})=>(
                  //<Text className="text-sm text-white">{item.title}</Text>
                  <TrendingCard movie={item} index={index} />
                )}
                className="mb-3 mt-3"
                keyExtractor={(item)=>item.id.toString()}
                showsHorizontalScrollIndicator={false}

              />
            </View>
          )}
          <>

          <Text className="text-white font-bold mt-5 mb-3 ">Latest Movies</Text>
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
          className="mt-2 pb-32"
          scrollEnabled={false}
          />
        </View>
        
          )}
        
        </ScrollView> 
    </View>
  );
}
