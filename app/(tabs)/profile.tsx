import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const profile = () => {
  return (
    <View className='bg-primary flex-1 px-10 '>
          <View className='flex justify-center items-center flex-1 flex-col gap-5'>
            <Image source={icons.person} style={{ width: 40, height: 40, tintColor: '#fff' }} />
            <Text className='text-grey-500 '>Profile</Text>
          </View>
        </View>
  )
}

export default profile

const styles = StyleSheet.create({})