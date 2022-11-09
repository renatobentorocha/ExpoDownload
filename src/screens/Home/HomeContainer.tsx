import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PexelsVideo, usePexelsAPI } from "../../hooks/usePexelsAPI";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFileDownload } from "../../hooks/useFileDownload";
import { DownloadProgressData, DownloadResumable } from "expo-file-system";
import { VideoPlayer } from "../../components/VideoPlayer";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { DownloadButtonAction } from "../../components/DownloadButtonAction/DownloadButtonAction";

type ProgressProps = PropsWithChildren;

function Progress({ children }: ProgressProps) {
  return <View style={styles.progress}>{children}</View>;
}

export function HomeContainer() {
  const pexelsAPI = usePexelsAPI();
  const fileDownload = useFileDownload();

  const [video, setVideo] = useState<Array<PexelsVideo>>([]);
  const [percentage, setPercentage] = useState(0);
  const [downloadResult, setDownloadResult] = useState<DownloadResumable>();
  const [downloadEndWith, setDownloadEndWith] = useState<
    "SUCCESS" | "ERROR" | "IDLE"
  >();

  useEffect(() => {
    const getVideos = async () => {
      const values = await pexelsAPI.get({ query: "Nature", size: "large" });
      setVideo(values);
    };

    getVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onProgress(res: DownloadProgressData) {
    setPercentage(
      Math.round((res.totalBytesWritten / res.totalBytesExpectedToWrite) * 100)
    );
  }

  const handleDownloadPress = useCallback(
    (id: number) => {
      const selected = video.find((v) => v.id === id);
      const videosfiles = selected?.video_files.find(
        (v) => v.width === selected.width && v.height === selected.height
      );

      if (videosfiles) {
        const result = fileDownload.retrive(
          videosfiles.id.toString() + "." + videosfiles.file_type.split("/")[1],
          videosfiles.link,
          onProgress,
          (v: "SUCCESS" | "ERROR" | "IDLE") => setDownloadEndWith(v)
        );

        setDownloadResult(result);
      }
    },
    [fileDownload, video]
  );

  const render = useCallback(
    (v: PexelsVideo) => {
      return (
        <View style={styles.image} key={`${v.id}`}>
          <Image source={{ uri: v.image }} style={styles.image} />
          <View style={styles.actions}>
            <DownloadButtonAction onPress={() => handleDownloadPress(v.id)}>
              <AntDesign name="download" size={24} color="white" />
            </DownloadButtonAction>
            <DownloadButtonAction
              onPress={() =>
                downloadResult && fileDownload.pause(downloadResult)
              }
            >
              <AntDesign name="pause" size={24} color="white" />
            </DownloadButtonAction>
            <DownloadButtonAction
              onPress={() =>
                downloadResult && fileDownload.resume(downloadResult)
              }
            >
              <Entypo name="controller-play" size={24} color="white" />
            </DownloadButtonAction>
          </View>
        </View>
      );
    },
    [downloadResult, fileDownload, handleDownloadPress]
  );

  const Memoized = useMemo(() => {
    return video.map((v) => render(v));
  }, [render, video]);

  function downloadEnd() {
    return downloadEndWith === "SUCCESS";
  }

  return downloadEnd() && !!downloadResult ? (
    <View style={styles.videoWrapper}>
      <VideoPlayer uri={downloadResult.fileUri} />
      <Pressable onPress={() => setDownloadEndWith("IDLE")}>
        <AntDesign name="closecircle" size={24} color="black" />
      </Pressable>
    </View>
  ) : (
    <View style={styles.contentContainer}>
      {Memoized}
      <Progress>
        <Text style={styles.progressText}>{percentage}%</Text>
      </Progress>
    </View>
  );
}

const styles = StyleSheet.create({
  videoWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  actions: {
    height: 90,
    marginTop: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f6ebfe",
  },
  progress: {
    position: "absolute",
  },
  progressText: {
    fontSize: 46,
    fontWeight: "bold",
    color: "white",
  },
});
