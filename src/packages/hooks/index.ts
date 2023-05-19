import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Credentials {
  username: string;
  password: string;
}
export const saveCredentialInKeyChain = async (credentials: Credentials) => {
  await Keychain.setGenericPassword(credentials.username, credentials.password);
};

export const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Data stored successfully.');
  } catch (error) {
    console.log('Error storing data:', error);
  }
};

export const retrieveData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Retrieved data:', value);
    } else {
      console.log('Data not found.');
    }
  } catch (error) {
    console.log('Error retrieving data:', error);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data removed successfully.');
  } catch (error) {
    console.log('Error removing data:', error);
  }
};
