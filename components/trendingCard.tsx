import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
//import {MaskedView} from '@react-native-masked-view/masked-view'
import { images } from '@/constants/images'

const TrendingCard = ({movie:{id,poster_path,title},index}:TrendingCardProps) => {
  return (
    <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className='relative w-32 ml-5'>
            <Image source={{uri:poster_path? `https://image.tmdb.org/t/p/w500${poster_path}`:'https://placehold.co/600x400/1a1a1a/ffffff.png'}}
             className='w-32 h-48 rounded-lg ' resizeMode='cover'/>
             <View className='absolute bottom-9 -left-3.5 px-[-1] py-1 rounded-full'>
                
                     
                    <Text className='text-6xl font-bold text-white'>{index+1}</Text>
                 
            </View>
            <View >
                    <Text className='mt-2 text-sm font-bold text-light-200' numberOfLines={2}>
                        {title}
                    </Text>
            </View>
        </TouchableOpacity>
        
    </Link>
  )
}

export default TrendingCard