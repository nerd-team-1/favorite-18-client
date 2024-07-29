import {colors} from '@/constants';
import {UserInfo} from '@/types/common';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface WelcomeMessageProps {
  userInfo: UserInfo;
}

function WelcomeMessage({userInfo}: WelcomeMessageProps) {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.infoName}>{userInfo.name} 님,</Text>
      <Text style={styles.infoText}>{userInfo.email}</Text>
      <Text style={styles.infoText}>위 계정으로 로그인을 진행합니다.</Text>
      <Text style={styles.infoText}>
        구글로 최초 로그인시, 회원가입이 필요합니다.
      </Text>
      <Text style={styles.infoText}>아래 추가 정보를 입력해 주세요.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});

export default WelcomeMessage;
