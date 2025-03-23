import { Image, ScrollView, StyleSheet, Text, TouchableNativeFeedbackBase, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams, useRouter } from 'expo-router'
import useFetch from '@/services/useFetch';
import { fetchMovieDeatils } from '@/services/api';
import { icons } from '@/constants/icons';

interface MovieInfoProps{
  label:string;
  value?:string|number|null;

}

const MovieInfo = ({label,value}:MovieInfoProps)=>{
  return(
    <View className='flex-col items-start justify-center mt-5'
    > 
      <Text className='text-light-200 font-normal text-sm'>{label}</Text>
      <Text className='text-light-100 font-bold mt-2 text-sm'>{value || 'N/A'}</Text>

    </View>
  );
}

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

          <View className='flex-col items-start justify-center mt-5 px-5 '>
            <Text className='text-white font-bold text-xl'>{movie?.title}</Text>

            <View className='flex-row items-center gap-x-1 mt-2'>
            <Text className='text-light-200 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
            <Text className='text-light-200 text-sm'>{movie?.runtime}m</Text>
            </View>
            <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
              <Image source={icons.star} className='size-4'/>
              <Text className='text-white font-bold text-sm'>{Math.round(movie?.vote_average ?? 0)}/10</Text>
              <Text className='text-sm text-light-200'>({movie?.vote_count} votes)</Text>
            </View>

            <MovieInfo label='Overview' value={movie?.overview}/>  
            <MovieInfo label='Genres' value={movie?.genres?.map((g)=>g.name).join(' - ')}/>

            <View className='flex flex-row justify-between w-1/2'>
              <MovieInfo label='Budget' value={`$${(movie?.budget ?? 0) / 1_000_000} million`}/>
              <MovieInfo label='Revenue' value={`$${Math.round(movie?.revenue ?? 0)/ 1_000_000}`}/>
            </View>
              <MovieInfo label='Production Companies' value={movie?.production_companies.map((p)=>p.name).join(' - ') ||  'N/A'}/>
             </View>
        </View>
      </ScrollView>

      <TouchableOpacity className='h-16 absolute left-0 right-0 bottom-5 bg-accent rounded-lg mx-5 py-3/5 flex flex-row items-center justify-center z-40' onPress={router.back}>
        <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor="#fff"/>
        <Text className='text-white text-base font-semibold'>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails
