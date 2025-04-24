import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import ThemedText from '@/components/ThemedText';
import ThemedButton from '@/components/ThemedButton';
import useThemeColors from '@/hooks/useThemeColors';
import { useLoginWithOTP, useCurrentUser } from '@/hooks/useAuth';
import Logo from '@/components/Logo';

export default function VerifyScreen() {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const colors = useThemeColors();
  const loginWithOTP = useLoginWithOTP();
  const { refetch } = useCurrentUser();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleResendCode = () => {
    // Reset timer
    setTimer(60);
    // Resend OTP logic
    router.replace({
      pathname: '/auth/login',
    });
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6 && otp !== '111111') {
      Alert.alert('Invalid Code', 'Please enter a valid verification code.');
      return;
    }

    try {
      await loginWithOTP.mutateAsync({
        phoneNumber: phoneNumber || '',
        otp,
      });

      const { data: user } = await refetch();

      if (user) {
        // User already exists, go to home page
        router.replace('/');
      } else {
        // User doesn't exist, direct to registration
        router.replace({
          pathname: '/auth/register',
          params: { phoneNumber: phoneNumber || '' },
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid verification code. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.contentContainer}>
        <ThemedText variant="headline">Vérification</ThemedText>
        <ThemedText variant="sub" style={styles.subtitle}>
          Entrez le code à 6 chiffres envoyé au {'\n'}
          {phoneNumber}
        </ThemedText>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { borderColor: colors.primary }]}
            placeholder="Code à 6 chiffres"
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />
        </View>

        <ThemedButton
          text="Vérifier"
          variant="primary"
          onPress={handleVerifyOTP}
          disabled={
            (otp.length !== 6 && otp !== '111111') || loginWithOTP.isPending
          }
        />

        <View style={styles.resendContainer}>
          {timer > 0 ? (
            <ThemedText variant="sub">
              Renvoyer le code dans {timer} secondes
            </ThemedText>
          ) : (
            <ThemedButton
              text="Renvoyer le code"
              variant="primary2"
              onPress={handleResendCode}
            />
          )}
        </View>

        <View style={styles.devNote}>
          <ThemedText variant="sub">
            Note: En développement, vous pouvez utiliser le code: 111111
          </ThemedText>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 25,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 5,
  },
  resendContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  devNote: {
    marginTop: 30,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
  },
});
