import DatePickerOption from '@/components/common/DatePickerOption';
import CustomButton from '@/components/CustomButton';
import {authNavigations, colors, mainColors, screen} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useModal from '@/hooks/useModal';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {getDateWithSeperator} from '@/utils/date';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RadioButton} from 'react-native-paper';

type SignUpGoogleScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.SIGN_UP
>;

function SignUpGoogleScreen({route}: SignUpGoogleScreenProps) {
  const {authCode, userInfo} = route.params;
  const {signupMutation, loginGoogleMutation} = useAuth();
  const dateOption = useModal();
  const [gender, setGender] = useState('MAN');
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

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('@/assets/nerd_team1.png')}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoName}>{userInfo.name} 님,</Text>
        <Text style={styles.infoText}>{userInfo.email}</Text>
        <Text style={styles.infoText}>위 계정으로 로그인을 진행합니다.</Text>
        <Text style={styles.infoText}>
          구글로 최초 로그인시, 회원가입이 필요합니다.
        </Text>
        <Text style={styles.infoText}>아래 추가 정보를 입력해 주세요.</Text>
      </View>
      <Text style={styles.label}>성 별</Text>
      <RadioButton.Group
        onValueChange={newValue => setGender(newValue)}
        value={gender}>
        <View style={styles.radioContainer}>
          <View style={styles.radioItem}>
            <RadioButton value="MAN" color={mainColors.LIGHT_GREEN} />
            <Text>남자</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="WOMAN" color={mainColors.LIGHT_GREEN} />
            <Text>여자</Text>
          </View>
        </View>
      </RadioButton.Group>
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
  infoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: colors.GRAY_500,
    borderRadius: 3,
    padding: 10,
    gap: 10,
  },
  infoName: {
    fontSize: 18,
    marginBottom: 8,
  },
  infoText: {
    color: colors.GRAY_500,
    fontSize: 14,
    fontWeight: '600',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 18,
    marginBottom: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 50,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePicker: {
    width: '100%',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 30,
  },
});

export default SignUpGoogleScreen;
