import {LatLng} from 'react-native-maps';
import kakaoLocationInstance from '../kakaoAxios';
import kakaoEndPoints from '../kakaoApiEndPoints';
import Config from 'react-native-config';

const getLocalSurround = async (
  location: LatLng,
): Promise<SurroundResponse> => {
  const {latitude, longitude} = location;
  const radius = 10000; // 10KM
  const query = '노래방';
  const {data} = await kakaoLocationInstance.get(
    `${kakaoEndPoints.fetchLocalSearch}?query=${query}&x=${longitude}&y=${latitude}&radius=${radius}`,
    {
      headers: {
        Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
      },
    },
  );
  return data;
};

export default getLocalSurround;
