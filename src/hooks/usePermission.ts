import {alerts, RESULTS} from '@/constants';
import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {
  check,
  Permission,
  PERMISSIONS,
  request,
} from 'react-native-permissions';

type PermissionType = 'AUDIO' | 'READ_AUDIO';
type PermissionOS = {
  [key in PermissionType]: Permission;
};

const androidPermissions: PermissionOS = {
  AUDIO: PERMISSIONS.ANDROID.RECORD_AUDIO,
  READ_AUDIO: PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
};

const iosPermissions: PermissionOS = {
  AUDIO: PERMISSIONS.IOS.MICROPHONE,
  READ_AUDIO: PERMISSIONS.IOS.MICROPHONE,
};

function usePermission(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid ? androidPermissions : iosPermissions;

      const checked = await check(permissionOS[type]);
      //   console.log(type, checked);

      const showPermissionAlert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
          [
            {
              text: '설정하기',
              onPress: () => Linking.openSettings(),
            },
            {
              text: '취소',
              style: 'cancel',
            },
          ],
        );
      };

      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionAlert();
            // const result = await request(permissionOS[type]);
            return;
          }
          await request(permissionOS[type]);

          break;
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAlert();

          break;
        default:
          break;
      }
    })();
  });
}

export default usePermission;
