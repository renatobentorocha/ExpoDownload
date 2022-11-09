import * as FileSystem from "expo-file-system";
import { DownloadProgressData, DownloadResumable, FileSystemNetworkTaskProgressCallback } from "expo-file-system";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useFileDownload() {
  function retrive(
    fileName: string, 
    uri: string, 
    progress: FileSystemNetworkTaskProgressCallback<DownloadProgressData>,
    end: (v:"SUCCESS" | "ERROR" | "IDLE") => void) {
    const downloadResumable = FileSystem.createDownloadResumable(
      uri,
      `${FileSystem.documentDirectory}${fileName}`,
      {},
      progress
    );

    download(downloadResumable, end);

    return downloadResumable;
  }

  async function download(downloadResumable: DownloadResumable, end: (v:"SUCCESS" | "ERROR" | "IDLE") => void){
    try {
      const result = await downloadResumable.downloadAsync();

      if (result === undefined) {
        throw new Error("Download undefined exception");        
      }

      end("SUCCESS")
    } catch (e) {
      end("ERROR")
      console.error(e);
    }
  }

  async function pause(downloadResumable: DownloadResumable){
    try {
      await downloadResumable.pauseAsync();
      
      console.log('Paused download operation, saving for future retrieval');
      AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()));
    } catch (e) {
      console.error(e);
    }
  }
  
  async function resume(downloadResumable: DownloadResumable){
    try {
      const result = await downloadResumable.resumeAsync();

      if(result === undefined) {
        throw new Error("Resume download undefined exception");        
      }
    } catch (e) {
      console.error(e);
    }
  }

  return {
    retrive,
    pause, 
    resume
  };
}