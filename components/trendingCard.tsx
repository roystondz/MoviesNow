import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
//import {MaskedView} from '@react-native-masked-view/masked-view'
import { images } from '@/constants/images'

const TrendingCard = ({movie:{movie_id,poster_path,title},index}:TrendingCardProps,posurl:string) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
        <TouchableOpacity className='w-32 relative  ml-5'>
            <Image source={{uri:poster_path? `https://image.tmdb.org/t/p/w500${poster_path}`:'https://placehold.co/600x400/1a1a1a/ffffff.png'}}
             className='h-48 w-32 rounded-lg ' resizeMode='cover'/>
             <View className='absolute bottom-9 -left-3.5 px-[-1] py-1 rounded-full'>
                
                     
                    <Text className='text-white text-6xl font-bold'>{index+1}</Text>
                 
            </View>
            <View >
                    <Text className='text-sm font-bold mt-2 text-light-200' numberOfLines={2}>
                        {title}
                    </Text>
            </View>
        </TouchableOpacity>
        
    </Link>
  )
}

export default TrendingCard