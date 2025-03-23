import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

const MovieCard = ({id,poster_path,title,release_date,vote_average}:Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className='w-[30%]'>
            <Image source={{uri:poster_path? `https://image.tmdb.org/t/p/w500${poster_path}`:'https://placehold.co/600x400/1a1a1a/ffffff.png'}}
                className='w-full h-52 rounded-lg'
                resizeMode='cover'
            />
            <Text className='text-sm font-bold text-white' numberOfLines={1}>{title}</Text>
            <View >
                <Image source={icons.star} className='size-4'></Image>
                <Text className='text-white text-sm'>{Math.round(vote_average/2)}</Text>
            </View>
            <View className='flex-row items-center justify-between'>
                <Text className='text-xs text-white font-medium'>{release_date?.split('-')[0]}</Text>
            </View>
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard