import {PexelsAPI} from '../service';

type PexelsVideoOrientation = 'large' | 'medium' | 'small';
type PexelsVideoSize = 'large' | 'medium' | 'small';
type PexelsVideoLocale =
  | 'en-US'
  | 'pt-BR'
  | 'es-ES'
  | 'ca-ES'
  | 'de-DE'
  | 'it-IT'
  | 'fr-FR'
  | 'sv-SE'
  | 'id-ID'
  | 'pl-PL'
  | 'ja-JP'
  | 'zh-TW'
  | 'zh-CN'
  | 'ko-KR'
  | 'th-TH'
  | 'nl-NL'
  | 'hu-HU'
  | 'vi-VN'
  | 'cs-CZ'
  | 'da-DK'
  | 'fi-FI'
  | 'uk-UA'
  | 'el-GR'
  | 'ro-RO'
  | 'nb-NO'
  | 'sk-SK'
  | 'tr-TR'
  | 'ru-RU';

type PexelsRequest = {
  query: string;
  orientation?: PexelsVideoOrientation;
  size?: PexelsVideoSize;
  locale?: PexelsVideoLocale;
  page?: number;
  per_page?: number;
};

type PexelsRequestKeys = keyof PexelsRequest;

type PexelsVideoFile = {
  id: number;
  quality: string;
  file_type: string;
  width: number;
  height: number;
  link: string;
};

type PexelsVideoPicture = {
  id: number;
  picture: string;
  nr: number;
};

export type PexelsVideo = {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  duration: number;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: Array<PexelsVideoFile>;
  video_pictures: Array<PexelsVideoPicture>;
};

type PexelsVideoSearchResponse = {
  page: number;
  per_page: number;
  total_results: number;
  url: string;
  videos: Array<PexelsVideo>;
};

function getURI(params: PexelsRequest) {
  let URI = `search?`;

  Object.keys(params).forEach(key => {
    const value = params[key as PexelsRequestKeys];

    if (params[key as PexelsRequestKeys]) {
      URI += `&${key}=${value}`;
    }
  });

  return URI;
}

export function usePexelsAPI() {
  async function get({per_page, ...rest}: PexelsRequest) {
    const values = {...rest, per_page: per_page ? per_page : 1};
    const URI = getURI(values);

    const {data} = await PexelsAPI.get<PexelsVideoSearchResponse>(URI);

    return data.videos;
  }

  return {get};
}
