import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {song} from '../Modal/Data';

const List = ({navigation}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Home', {itemId: item.id})}>
      <View style={{height: 50, marginLeft: 8, marginTop: 3, marginRight: 20}}>
        <Image
          source={{uri: item.artwork}}
          style={{width: 50, height: '100%', borderRadius: 5}}
        />
      </View>
      <Text style={{fontSize: 20}}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor="orange" />
      <FlatList
        data={song}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },

  item: {
    height: 60,
    borderWidth: 0.01,
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    elevation: 3,
    flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default List;
