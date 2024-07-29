import WelcomeMessage from '@/components/auth/WelcomeMessage';
import DatePickerOption from '@/components/common/DatePickerOption';
import RadioButtonGroup from '@/components/common/RadioButtonGroup';
import CustomButton from '@/components/CustomButton';
import {authNavigations, screen} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useModal from '@/hooks/useModal';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {getDateWithSeperator} from '@/utils/date';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

type SignUpGoogleScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.SIGN_UP
>;

function SignUpGoogleScreen({route, navigation}: SignUpGoogleScreenProps) {
  const {authCode, userInfo} = route.params;
  const {signupMutation, loginGoogleMutation} = useAuth();
  const dateOption = useModal();
  const [gender, setGender] = useState('MAN');
  const genderOptions = [
    {label: '남자', value: 'MAN'},
    {label: '여자', value: 'WOMAN'},
  ];
  const [dateOfBirth, setDateOfBirth] = useState(new Date(2000, 0, 1));
  const [isPicked, setIsPicked] = useState(false);
  const isFormValid = gender && isPicked;

  const handleChangeDate = (pickedDate: Date) => {
    setDateOfBirth(pickedDate);
  };

  const handleConfirmDate = () => {
    setIsPicked(true);
    dateOption.hide();
  };

  const handleSubmit = () => {
    signupMutation.mutate(
      {birth: getDateWithSeperator(dateOfBirth), gender, userInfo},
      {
        onSuccess: () => loginGoogleMutation.mutate({authCode, userInfo}),
      },
    );
  };

  const handleCancelSubmit = async () => {
    await GoogleSignin.signOut();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('@/assets/nerd_team1.png')}
        />
      </View>
      <WelcomeMessage userInfo={userInfo} />
      <Text style={styles.label}>성 별</Text>
      <RadioButtonGroup
        options={genderOptions}
        selectedValue={gender}
        onValueChange={setGender}
      />
      <Text style={styles.label}>생년월일</Text>
      <CustomButton
        variant="outlined"
        size="large"
        label={isPicked ? getDateWithSeperator(dateOfBirth, '. ') : '날짜 선택'}
        onPress={dateOption.show}
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          label="가입하기"
          disabled={!isFormValid}
          onPress={handleSubmit}
        />
        <CustomButton
          label="취소하기"
          variant="cancel"
          onPress={handleCancelSubmit}
        />
      </View>

      <DatePickerOption
        date={dateOfBirth}
        isVisible={dateOption.isVisible}
        onChangeDate={handleChangeDate}
        onConfirmDate={handleConfirmDate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 0.4,
    width: screen.WIDTH / 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 18,
    marginBottom: 8,
  },
  datePicker: {
    width: '100%',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 30,
    gap: 10,
  },
});

export default SignUpGoogleScreen;
