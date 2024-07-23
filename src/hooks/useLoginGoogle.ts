import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useEffect, useState} from 'react';

interface UserInfo {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}

interface useLoginGoogleProps {
  authCode: string | null;
  userInfo: UserInfo | null;
  error: string | null;
  signIn: () => Promise<void>;
}

function useLoginGoogle(): useLoginGoogleProps {
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      GoogleSignin.configure({
        webClientId:
          '624808506702-hl2jol6l510v1qo465nrp23s2pr20g4i.apps.googleusercontent.com',
        offlineAccess: true,
        scopes: ['profile', 'email'],
      });
    } catch (configError) {
      setError('Google Sign-In 구성 중 오류가 발생했습니다.');
    }
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken, user} = await GoogleSignin.signIn();
      setAuthCode(idToken);
      setUserInfo(user);
      setError(null);
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        setError('로그인이 취소되었습니다.');
      } else if (err.code === statusCodes.IN_PROGRESS) {
        setError('로그인이 진행 중입니다.');
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError('Play 서비스가 사용 불가능합니다.');
      } else {
        setError('로그인에 실패했습니다.');
      }
    }
  };

  return {authCode, userInfo, error, signIn};
}

export default useLoginGoogle;
