import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import ThemedText from '@/components/ThemedText';
import ThemedButton from '@/components/ThemedButton';
import useThemeColors from '@/hooks/useThemeColors';
import { useGenerateOTP } from '@/hooks/useAuth';
import Logo from '@/components/Logo';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const colors = useThemeColors();
  const generateOTP = useGenerateOTP();

  // Simple validation for phone number
  const validatePhoneNumber = (number: string) => {
    // Basic validation for French phone numbers (starts with +33 or 0 followed by 9 digits)
    const regex = /^(\+33|0)[1-9]([-. ]?[0-9]{2}){4}$/;
    setIsValid(regex.test(number));
  };

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
    validatePhoneNumber(text);
  };

  const handleSubmit = async () => {
    try {
      // Format phone number to ensure it starts with +33
      let formattedNumber = phoneNumber;
      if (phoneNumber.startsWith('0')) {
        formattedNumber = '+33' + phoneNumber.substring(1);
        console.log(formattedNumber);
      }

      await generateOTP.mutateAsync({ phoneNumber: formattedNumber });
      // Navigate to OTP verification screen with the phone number
      router.push({
        pathname: '/auth/verify',
        params: { phoneNumber: formattedNumber },
      });
    } catch (error) {
      Alert.alert(
        'Error',
        'Unable to send verification code. Please try again.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.contentContainer}>
        <ThemedText variant="headline">Se connecter</ThemedText>
        <ThemedText variant="sub" style={styles.subtitle}>
          Saisissez votre numéro de téléphone pour recevoir un code de
          vérification
        </ThemedText>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { borderColor: colors.primary }]}
            placeholder="Numéro de téléphone"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            autoComplete="tel"
          />
        </View>

        <ThemedButton
          text="Recevoir un code"
          variant="primary"
          onPress={handleSubmit}
          style={{ opacity: isValid ? 1 : 0.5 }}
          disabled={!isValid || generateOTP.isPending}
        />
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
  },
});
