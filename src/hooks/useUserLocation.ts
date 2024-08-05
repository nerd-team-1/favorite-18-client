import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import useAppState from './useAppState';

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    // 권한허용을 안했을때를 대비한 초기값 설정
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const {isComeback} = useAppState();

  useEffect(() => {
    // 현재 위치를 담고있는 정보가 들어온다.
    Geolocation.getCurrentPosition(
      info => {
        // 경도 위도 Get
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        console.log(`여기 들어오니? ${latitude}, ${longitude}`);
        setIsUserLocationError(false);
      },
      () => {
        // 에러 처리
        setIsUserLocationError(true);
      },
      {
        // 옵션설정 영역
        enableHighAccuracy: true,
      },
    );
  }, [isComeback]);

  return {userLocation, isUserLocationError};
}

export default useUserLocation;
