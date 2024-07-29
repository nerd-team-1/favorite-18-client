import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useState} from 'react';
import Config from 'react-native-config';
import useAuth from './queries/useAuth';
import {useNavigation} from '@react-navigation/native';
import {authNavigations} from '@/constants';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';

type Navigation = StackNavigationProp<AuthStackParamList>;

interface useLoginGoogleProps {
  error: string | null;
  isInProgress: boolean;
  signIn: () => Promise<void>;
}

function useLoginGoogle(): useLoginGoogleProps {
  const navigation = useNavigation<Navigation>();
  const {loginGoogleMutation} = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  const signIn = async () => {
    setIsInProgress(true);
    try {
      GoogleSignin.configure({
        webClientId: Config.GOOGLE_WEB_CLIENT_ID,
        offlineAccess: true,
        scopes: ['profile', 'email'],
      });

      await GoogleSignin.hasPlayServices();
      const {idToken: authCode, user: userInfo} = await GoogleSignin.signIn();

      if (!authCode) {
        throw new Error('idToken is null');
      }

      loginGoogleMutation.mutate(
        {authCode, userInfo},
        {
          onError: (err: any) => {
            if (err.response?.status === 400) {
              navigation.navigate(authNavigations.SIGN_UP, {
                authCode,
                userInfo,
              });
            }
          },
        },
      );
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
    } finally {
      setIsInProgress(false);
    }
  };

  return {error, isInProgress, signIn};
}

export default useLoginGoogle;
