import * as Keychain from "react-native-keychain";

interface Credentials {
  username: string;
  password: string;
}
export const saveCredentialInKeyChain = async (credentials: Credentials) => {
  await Keychain.setGenericPassword(credentials.username, credentials.password);
};
