import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PexelsVideo, usePexelsAPI } from "../../hooks/usePexelsAPI";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useFileDownload } from "../../hooks/useFileDownload";
import { DownloadProgressData, DownloadResumable } from "expo-file-system";
import { VideoPlayer } from "../../components/VideoPlayer";
import { AntDesign } from "@expo/vector-icons";
import { HomeContainerContent } from "./HomeContainerContent";

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
      const sorted = selected?.video_files.sort(
        (a, b) => a.width * a.height - b.width * b.height
      );

      if (sorted) {
        const videoFile = sorted[0];
        const result = fileDownload.retrive(
          videoFile.id.toString() + "." + videoFile.file_type.split("/")[1],
          videoFile.link,
          onProgress,
          (v: "SUCCESS" | "ERROR" | "IDLE") => setDownloadEndWith(v)
        );

        setDownloadResult(result);
      }
    },
    [fileDownload, video]
  );

  const handlePause = useCallback(() => {
    if (downloadResult) {
      fileDownload.pause(downloadResult);
    }
  }, [downloadResult, fileDownload]);

  const handleResume = useCallback(() => {
    if (downloadResult) {
      fileDownload.resume(downloadResult);
    }
  }, [downloadResult, fileDownload]);

  const render = useCallback(
    (v: PexelsVideo) => {
      return (
        <HomeContainerContent
          key={`${v.id}`}
          video={v}
          onStart={handleDownloadPress}
          onPause={handlePause}
          onResume={handleResume}
        />
      );
    },
    [handleDownloadPress, handlePause, handleResume]
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
