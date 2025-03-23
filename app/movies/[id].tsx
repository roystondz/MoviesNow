import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFetch from '@/services/useFetch';
import { fetchMovieDeatils } from '@/services/api';



const MovieDetails = () => {

  const { id } = useLocalSearchParams();

  const {data:movie,loading}= useFetch(()=>fetchMovieDeatils(id as string))

  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{
        paddingBottom:80
      }}>
        <View>
          <Image source={{
            uri:`https://image.tmdb.org/t/p/w500${movie?.poster_path}` 
          }} className='w-full h-[550px]' resizeMode='cover'/>
        </View>
      </ScrollView>
    </View>
  )
}

export default MovieDetails
