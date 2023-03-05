import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import React, {useRef, useEffect, useState, useCallback} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

// import { song } from '../Modal/Data';

export const song = [
  {
    title: 'Death Bed',
    artist: 'Powfu',
    artwork: 'https://samplesongs.netlify.app/album-arts/death-bed.jpg',
    url: 'https://samplesongs.netlify.app/Death%20Bed.mp3',
    id: '1',
  },
  {
    title: 'Bad Liar',
    artist: 'Imagine Dragons',
    artwork: 'https://samplesongs.netlify.app/album-arts/bad-liar.jpg',
    url: 'https://samplesongs.netlify.app/Bad%20Liar.mp3',
    id: '2',
  },
  {
    title: 'Faded',
    artist: 'Alan Walker',
    artwork: 'https://samplesongs.netlify.app/album-arts/faded.jpg',
    url: 'https://samplesongs.netlify.app/Faded.mp3',
    id: '3',
  },
  {
    title: 'Hate Me',
    artist: 'Ellie Goulding',
    artwork: 'https://samplesongs.netlify.app/album-arts/hate-me.jpg',
    url: 'https://samplesongs.netlify.app/Hate%20Me.mp3',
    id: '4',
  },
  {
    title: 'Solo',
    artist: 'Clean Bandit',
    artwork: 'https://samplesongs.netlify.app/album-arts/solo.jpg',
    url: 'https://samplesongs.netlify.app/Solo.mp3',
    id: '5',
  },
  {
    title: 'Without Me',
    artist: 'Halsey',
    artwork: 'https://samplesongs.netlify.app/album-arts/without-me.jpg',
    url: 'https://samplesongs.netlify.app/Without%20Me.mp3',
    id: '6',
  },
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();

    TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],

      // Capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
  } catch (error) {
    console.log(error);
  }

  await TrackPlayer.add(song);
};

const togglePlayback = async playbackState => {
  const CurrentTrack = await TrackPlayer.getCurrentTrack();

  if (CurrentTrack !== null) {
    if (playbackState == State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  }
};

const Music = () => {
  const playbackState = usePlaybackState();
  const progress =useProgress();

  const scrollX = useRef(new Animated.Value(0)).current;
  const [songtitle, setsongtitle] = useState(0);
  const songslider = useRef(null);

  useEffect(() => {
    changesong();
  }, [songtitle]);
  const changesong = async () => {
    await TrackPlayer.skip(songtitle);
   
  };

  useEffect(() => {
    if (playbackState === 'idle') {
      setupPlayer();
    }

    scrollX.addListener(({value}) => {
      // console.log('scrollx', scrollX);
      setsongtitle(Math.round(value / windowWidth));
      //  console.log(Math.round(value/windowWidth))

      return () => {
        scrollX.removeAllListeners();
      };
    });
  }, [scrollX]);

  const skipToprev = async () => {
    songslider.current.scrollToOffset({
      offset: (songtitle - 1) * windowWidth,
    });
    await TrackPlayer.skipToPrevious();
  };

  const skipToNext = async () => {
    songslider.current.scrollToOffset({
      offset: (songtitle + 1) * windowWidth,
    });
    await TrackPlayer.skipToNext();
  };

  const RenderSong = React.memo(({item}) => {
    return (
      <Animated.View style={styles.view1}>
        <View style={styles.render}>
          <Image
            source={{
              uri: item.artwork,
            }}
            style={{width: '100%', height: '100%', borderRadius: 10}}
          />
        </View>
      </Animated.View>
    );
  });

  const renderItem = ({item}) => {
    return <RenderSong item={item} />;
  };

  const handleScroll = useCallback(
    Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
      useNativeDriver: true,
    }),
    [],
  );

  console.log(progress)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.maincontainer}>
        <View style={{width: windowWidth}}>
          <Animated.FlatList
            ref={songslider}
            data={song}
            renderItem={renderItem}
            keyExtractor={el => el.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={handleScroll}
          />
        </View>

        <View>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: '700',
              marginTop: 10,
            }}>
            {song[songtitle].title}
          </Text>
          <Text style={{alignSelf: 'center'}}>{song[songtitle].artist}</Text>
        </View>
        <View style={{width: '90%'}}>
          <Slider
            style={styles.progreeslider}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#D369"
            minimumTrackTintColor="#D369"
            maximumTrackTintColor="#ffff"
            onSlidingComplete={() => {}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '95%',
              alignSelf: 'center',
            }}>
            <Text>{Math.floor(progress.position/60)+ ':'+Math.round((progress.position - Math.floor(progress.position)) * 60)}</Text>
            <Text>{Math.floor(progress.duration/60)+ ':'+Math.round((progress.duration - Math.floor(progress.duration)) * 60)}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={skipToprev}>
              <Ionicons name="play-skip-back-outline" size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
              <Ionicons
                name={
                  playbackState === State.Playing
                    ? 'pause-circle'
                    : 'play-circle'
                }
                size={45}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={skipToNext}>
              <Ionicons name="play-skip-forward-outline" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          }}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="repeat" size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal-outline" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Music;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffa30a',
  },
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: 'white',
    height: 50,
    justifyContent: 'center',
  },
  progreeslider: {
    width: '100%',
    height: 30,
  },
  render: {
    width: windowWidth - 50,
    height: windowWidth - 50,
    borderWidth: 0.4,
    borderRadius: 10,
    elevation: 20,
  },
  view1: {
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
