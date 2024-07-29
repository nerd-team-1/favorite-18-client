import CustomButton from '@/components/CustomButton';
import CustomInputField from '@/components/CustomInputField';
import {colors, mainColors} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import {validateEditProfile} from '@/utils';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type EditProfileScreenProps = StackScreenProps<SettingStackParamList>;

function EditProfileScreen({}: EditProfileScreenProps) {
  const {getProfileQuery, profileMutation} = useAuth();
  const {data} = getProfileQuery.data || {};
  const editProfile = useForm({
    initialValue: {nickname: data?.nickname ?? ''},
    validate: validateEditProfile,
  });

  const handleUpdateNickname = () => {
    profileMutation.mutate(
      {...editProfile.values},
      {
        onSuccess: () => {
          getProfileQuery.refetch();
          editProfile.values.nickname = '';
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Pressable style={[styles.imageContainer, styles.emptyImageContainer]}>
          {data?.thumbnail ? (
            <>
              <Image
                source={{
                  uri: `${data?.thumbnail}`,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </>
          ) : (
            <Ionicons name="person" size={30} color={colors.GRAY_500} />
          )}
        </Pressable>
        <View style={styles.profileTextContainer}>
          <Text style={[styles.profileText, styles.profileNameText]}>
            {data?.nickname ? data?.nickname : data?.name}
          </Text>
          <Text style={styles.profileText}>{data?.email}</Text>
        </View>
      </View>

      <View style={styles.infoField}>
        <Text style={styles.infoHeader}>닉네임</Text>
        <View style={styles.updateField}>
          <CustomInputField
            {...editProfile.getTextInputProps('nickname')}
            error={editProfile.errors.nickname}
            touched={editProfile.touched.nickname}
            placeholder="변경할 닉네임을 입력해주세요."
            style={styles.updateFieldInput}
          />
          <CustomButton
            label="변경"
            size={'small'}
            onPress={handleUpdateNickname}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GRAY_200,
    borderRadius: 50,
    borderWidth: 1,
  },
  profileTextContainer: {
    alignItems: 'center',
    marginTop: 10,
    gap: 5,
  },
  profileNameText: {
    color: mainColors.LIGHT_GREEN,
    fontWeight: 'bold',
    fontSize: 18,
  },
  profileText: {
    color: colors.GRAY_200,
  },
  infoField: {
    paddingHorizontal: 15,
  },
  infoHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.GRAY_200,
    marginBottom: 10,
  },
  updateField: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  updateFieldInput: {
    color: colors.WHITE,
  },
});

export default EditProfileScreen;
