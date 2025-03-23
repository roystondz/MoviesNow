import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import MovieCard from '@/components/movieCard'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/searchbar'

const search = () => {
  const [searchQuery,setSearchQuery] = useState('');

  const {data:movies,loading:moviesLoading,error:moviesError,refetch:loadMovies,reset} = useFetch(()=>
    fetchMovies({query:searchQuery},),false
    )
    
    useEffect(()=>{
      const timeOut = setTimeout(
        async()=>{
          if(searchQuery.trim())
            {
              await loadMovies();
            }else{
              reset();
            }
        },500
      ) 

      return ()=>clearTimeout(timeOut);
    },[searchQuery]);

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='w-full z-0 absolute flex-1' resizeMode='cover' />
      <FlatList
        data={movies}
        renderItem={({item})=>
        <MovieCard
          {...item}
        />
        } 
        keyExtractor={(item)=>item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent:"center",
          gap:16,
          marginVertical:16
        }}
        contentContainerStyle={{
          paddingBottom:100
        }}
        ListHeaderComponent={
          <>
            <View className='justify-center flex-row w-full mt-20 items-center'>
              <Image source={icons.logo} className='w-12 h-10  '/>
            </View>
            <View className='my-5 text-white'>
                <SearchBar
                  placeholder='Search Movies ...'
                  value={searchQuery}
                  onChangeText={(text:string)=>setSearchQuery(text)}
                  
                />
                {moviesLoading &&(
                  <ActivityIndicator size="large" color="#0000ff" className='my-3'/>
                )}
                {moviesError &&(
                  <Text className='text-red-500 px-5 my-3 '>Error:{moviesError.message}</Text>
                )}
                {
                  !moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
                    <Text className='text-xl text-white font-bold mt-10'>
                      Search results for 
                      <Text className='text-accent'> {searchQuery}</Text>
                      <Text></Text>
                    </Text>
                  )
                }
            </View>
          </>
        }
        ListEmptyComponent={() => (
          !moviesLoading && !moviesError && (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim() ? 'No Movies were found' : 'Search for a movie'}
              </Text>
            </View>
          )
        )}
      />
    </View>
  )
}

export default search

const styles = StyleSheet.create({})