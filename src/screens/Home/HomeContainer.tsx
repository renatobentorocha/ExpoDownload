import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {PexelsVideo, usePexelsAPI} from '../../hooks/usePexelsAPI';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import { useFileDownload } from '../../hooks/useFileDownload';
import { DownloadProgressData, DownloadResumable, FileSystemNetworkTaskProgressCallback } from 'expo-file-system';
import { VideoPlayer } from '../../components/VideoPlayer';



export function HomeContainer() {
  const pexelsAPI = usePexelsAPI();
  const fileDownload = useFileDownload();

  const [video, setVideo] = useState<Array<PexelsVideo>>([]);
  const [percentage, setPercentage] = useState(0);
  const [downloadResult, setDownloadResult] = useState<DownloadResumable>();
  const [downloadEndWith, setDownloadEndWith] = useState<"SUCCESS" | "ERROR" | "IDLE">();
  
  useEffect(() => {
    const getVideos = async () => {
      const values = await pexelsAPI.get({query: 'Nature', size: 'large'});
      setVideo(values);
    };

    getVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onProgress(res: DownloadProgressData) {
    setPercentage(Math.round((res.totalBytesWritten / res.totalBytesExpectedToWrite) * 100));
  }

  function handleDownloadPress(id: number) {
    const selected = video.find(v => v.id === id);
    const videosfiles = selected?.video_files.find(
      v => v.width === selected.width && v.height === selected.height,
    );

    if (videosfiles) {
      const result = fileDownload.retrive(
        videosfiles.id.toString() + '.' + videosfiles.file_type.split('/')[1],
        videosfiles.link,
        onProgress,
        (v:"SUCCESS" | "ERROR" | "IDLE") => setDownloadEndWith(v)
      );

      setDownloadResult(result);
    }
  }

  const renderVideo = useCallback(
    (v: PexelsVideo) => {
      return (
        <View key={v.id}>
          <Image
            source={{
              uri: v.image,
            }}
            style={{height: 200}}
          />
          <Pressable
            onPress={() => handleDownloadPress(v.id)}
            style={{
              backgroundColor: '#84371d',
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
              Download
            </Text>
          </Pressable>
          <Pressable    
            onPress={() => downloadResult && fileDownload.pause(downloadResult)}
            style={{
              backgroundColor: '#423734',
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
              Stop
            </Text>
          </Pressable>
          <Pressable    
            onPress={() => downloadResult && fileDownload.resume(downloadResult)}
            style={{
              backgroundColor: '#2b88b7',
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
              Resume
            </Text>
          </Pressable>
        </View>
      );
    },
    [handleDownloadPress, downloadResult],
  );

  const Memoized = useMemo(() => {
    return video.map(v => renderVideo(v));
  }, [renderVideo, video]);

  return (
    <View style={[StyleSheet.absoluteFill]}>
      {Memoized}
      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{percentage}%</Text>        
      </View>
      {downloadEndWith === "SUCCESS" && <VideoPlayer uri={"file:///Users/renatorocha/Library/Developer/CoreSimulator/Devices/944E3D2B-18ED-4AC4-84A6-9C074B8B9084/data/Containers/Data/Application/36DC13E4-7D04-4C1A-AC3E-B965899A2E34/Documents/ExponentExperienceData/%2540renatob.rocha%252FExpoDownload/368798.mp4"}/>}
      {/* <VideoPlayer uri={"https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}/> */}
    </View>
  );
}
