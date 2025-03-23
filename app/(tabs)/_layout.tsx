import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

// Ensure that images.home exists in the images object

const TabIcon = ({focused,icon,title}:any) =>{
   if(focused){
    return(
        <ImageBackground
                        source={images.highlight}
                        className='flex flex-row w-full flex-1 min-w-[90px] min-h-10 mt-4 justify-center items-center rounded-full'
                    >
                        <Image source={icon} tintColor="#151312" className='size-5'/>
                        <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
                    </ImageBackground>
    );
   }
   return (
    <View className='size-full justify-center items-center mt-4 rounded-full'>
        <Image source={icon} tintColor="#A8B5DB" className='size-5'/>
    </View>
   );
}
 
const _layout = () => {
  return (
    <Tabs screenOptions={
        {
            tabBarShowLabel:false,
            tabBarItemStyle:{
                width:'100%',
                height:'100%',
                justifyContent:'center',
                alignItems:'center'

            },
            tabBarStyle:{
                backgroundColor:'#0f0D23',
                borderRadius:50,
                marginHorizontal:5,
                marginBottom:26,
                overflow:'hidden',
                height:53,
                position:'absolute',
                borderWidth:1,
                borderColor:'#0f0d23',
                paddingHorizontal:10
            }
        }
    }>
        <Tabs.Screen
            name='index'
            options={{
                title:"home",
                headerShown:false,
                tabBarIcon:({focused})=>{
                    return (
                        <TabIcon
                        title="Home"
                        focused={focused}
                        icon={icons.home}
                        />
                    );
                }
            }}
            
        />
        <Tabs.Screen
            name='search'
            options={{
                title:"Search",
                headerShown:false,
                tabBarIcon:({focused})=>{
                    return (
                        <TabIcon
                        title="Search"
                        focused={focused}
                        icon={icons.search}
                        />
                    );
                }
            }}
            
        />
        <Tabs.Screen
            name='saved'
            options={{
                title:"Saved",
                headerShown:false,
                tabBarIcon:({focused})=>{
                    return (
                        <TabIcon
                        title="Save"
                        focused={focused}
                        icon={icons.save}
                        />
                    );
                }
            }}
            
        />
        <Tabs.Screen
            name='profile'
            options={{
                title:"Profile",
                headerShown:false,
                tabBarIcon:({focused})=>{
                    return (
                        <TabIcon
                        title="Profile"
                        focused={focused}
                        icon={icons.person}
                        />
                    );
                }
            }}
            
        />
    </Tabs>
  )
}

export default _layout