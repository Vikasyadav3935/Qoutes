import { View, Text,StyleSheet,SafeAreaView ,StatusBar} from 'react-native'
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Music from './Music';

const Home = () => {
  return (
    <View style={{flex:1}}>
     <StatusBar barStyle={'default'} backgroundColor='orange' />
      <Music/>
    </View>
  )
}

export default Home;

const styles=StyleSheet.create({
 
  
})