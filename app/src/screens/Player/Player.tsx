
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import TrackPlayer, { Event, useTrackPlayerEvents } from 'react-native-track-player';

const tracks = [];

function Player(): JSX.Element {

  const [playerSetup, setPlayerSetup] = useState(false);
  const [trackTitle, setTrackTitle] = useState('No track playing');
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRunning, setTimeRunning] = useState(0);
  const timeRunningRef = useRef(timeRunning);

  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
        const newTime = timeRunning + 1;
        setTimeRunning(newTime);
        timeRunningRef.current = newTime;
      }, 1000);
    }
  }, [isPlaying, timeRunning]);

  const loadTrackPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(tracks);
  };

  useEffect(() => {
    // Load the track player
    setPlayerSetup(true);
    if (!playerSetup) loadTrackPlayer();
  }, [playerSetup]);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const title = track?.title;
      setTrackTitle(title ? title : 'No title');
    }
  });

  return (
    <View style={styles.playerContainer}>
      <View style={styles.artworkContainer}>
        <Text style={styles.artworkText}>{trackTitle}</Text>
        <Text style={styles.artworkTextSmall}>{
          timeRunning > 60 ? `${Math.floor(timeRunning / 60)} : ${timeRunning % 60 < 10 ? `0${timeRunning % 60}` : timeRunning % 60}` :
            timeRunning
        }</Text>
      </View>
      <View style={styles.playButtonContainer}>
        <TouchableHighlight style={styles.playButtonIconContainer}>
          <Text style={styles.playButtonText}>{`<`}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.playButtonIconContainer}
          onPress={() => {
            if (isPlaying) {
              // Pause track
              TrackPlayer.pause();
            } else {
              // Play track
              TrackPlayer.play();
            }
            setIsPlaying(!isPlaying);
          }}
        >
          <Text style={styles.playButtonText}>{isPlaying ? `| |` : `▶`}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.playButtonIconContainer}>
          <Text style={styles.playButtonText}>{`>`}</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artworkContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
  },
  artworkText: {
    color: 'rgb(255,255,255)',
    fontSize: 30,
    marginBottom: 10,
  },
  artworkTextSmall: {
    color: 'rgb(255,255,255)',
  },
  playButtonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  playButtonIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    color: 'rgb(255,255,255)',
    fontSize: 40,
  },
});

export default Player;
