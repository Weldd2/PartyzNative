import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import ThemedText from '@/components/ThemedText';
import ThemedButton from '@/components/ThemedButton';
import useThemeColors from '@/hooks/useThemeColors';
import { useRegisterUser } from '@/hooks/useAuth';
import Logo from '@/components/Logo';
import { IconSymbol } from '@/components/IconSymbol';

export default function RegisterScreen() {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const colors = useThemeColors();
  const registerUser = useRegisterUser();

  const isFormValid = firstname.trim().length > 0 && lastname.trim().length > 0;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0]);
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser.mutateAsync({
        phoneNumber: phoneNumber || '',
        firstname,
        lastname,
        profilePicture: profilePicture
          ? {
              uri: profilePicture.uri,
              name: 'profile-picture.jpg',
              type: 'image/jpeg',
            }
          : undefined,
      });

      // Registration successful, navigate to home
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.contentContainer}>
        <ThemedText variant="headline">Créer votre compte</ThemedText>
        <ThemedText variant="sub" style={styles.subtitle}>
          Complétez votre profil pour continuer
        </ThemedText>

        <TouchableOpacity onPress={pickImage} style={styles.photoContainer}>
          {profilePicture ? (
            <Image
              source={{ uri: profilePicture.uri }}
              style={styles.profileImage}
            />
          ) : (
            <View
              style={[styles.photoPlaceholder, { borderColor: colors.primary }]}
            >
              <IconSymbol name="star" size={30} color={colors.primary} />
              <ThemedText style={styles.photoText}>Photo de profil</ThemedText>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { borderColor: colors.primary }]}
              placeholder="Prénom"
              value={firstname}
              onChangeText={setFirstname}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { borderColor: colors.primary }]}
              placeholder="Nom"
              value={lastname}
              onChangeText={setLastname}
              autoCapitalize="words"
            />
          </View>
        </View>

        <ThemedButton
          text="Créer mon compte"
          variant="primary"
          onPress={handleRegister}
          disabled={!isFormValid || registerUser.isPending}
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
  photoContainer: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    marginTop: 8,
    textAlign: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  inputsContainer: {
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
});
