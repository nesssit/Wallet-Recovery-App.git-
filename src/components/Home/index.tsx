import React, {useState} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {Button, TextInput, Portal, Modal} from 'react-native-paper';
import {mnemonicToSeedSync} from 'bip39';
import hdKey from 'ethereumjs-wallet/src/hdkey';
import * as Keychain from 'react-native-keychain';
import ethers from 'ethers';

interface Account {
  address: string;
  privateKey: string;
}
const HomeScreen: React.FC = () => {
  const [phrase, setPhrase] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const handleInputChange = (value: string) => {
    setPhrase(value);
  };

  const handleSavePrivateKey = async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const username = 'Akshay';
  };

  const handleSubmit = () => {
    const seedPhase = phrase.split(' ');
    createPrivateKey();
    // if (seedPhase.length === 12) {
    //   setError('');
    // } else {
    //   setError('Invalid Seed, 12 words are required');
    // }
  };

  const createPrivateKey = async () => {
    const recoverySeed: string =
      'hire royal wait combine embark honey arm switch under what gallery pattern';
    const seedBuffer = await mnemonicToSeedSync(recoverySeed);
    const root = hdKey.fromMasterSeed(seedBuffer);
    let wallet_hdpath = "m/44'/60'/0'/0/";
    let walletAccounts = [];
    for (let i = 0; i < 10; i++) {
      let wallet = root.derivePath(wallet_hdpath + i).getWallet();
      let address = '0x' + wallet.getAddress().toString('hex');
      let privateKey = wallet.getPrivateKey().toString('hex');
      walletAccounts.push({address: address, privateKey: privateKey});
    }
    setAccounts(walletAccounts);
    setVisible(true);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Enter 12 words mnemonic phrase</Text>
      <TextInput
        mode="outlined"
        outlineColor="black"
        placeholder="Enter seed phrase"
        value={phrase}
        multiline
        error={error ? true : false}
        style={styles.seedInput}
        textColor="black"
        onChangeText={handleInputChange}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        onPress={handleSubmit}
        mode="contained"
        buttonColor="black"
        style={styles.submitButton}>
        Generate Key
      </Button>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalContainerStyle}>
          <View>
            <View style={styles.listHeader}>
              <Text></Text>
              <Text style={{color: 'white'}}>Address</Text>
              <Text style={{color: 'white'}}>Private Key</Text>
            </View>
            {accounts.map((item: Account, index: number) => (
              <View key={item.address} style={styles.accountList}>
                <Text>{index + 1}</Text>
                <Text numberOfLines={1}>{item.address.slice(0, 10)}...</Text>
                <Text numberOfLines={1}>{item.privateKey.slice(0, 10)}...</Text>
              </View>
            ))}
          </View>
        </Modal>
      </Portal>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.9,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  error: {
    color: 'red',
    margin: 10,
  },
  seedInput: {
    width: '90%',
    margin: 10,
  },
  submitButton: {
    width: '90%',
    margin: 10,
  },
  text: {
    marginVertical: 10,
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    margin: 10,
  },
  ethBalanceContainer: {
    backgroundColor: 'orange',
    height: 180,
    color: 'black',
    width: Dimensions.get('screen').width,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balance: {
    fontSize: 40,
  },
  accountList: {
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 2,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
  },
  modalContainerStyle: {
    backgroundColor: 'white',
    padding: 20,
    width: '98%',
    borderRadius: 10,
    overflow: 'scroll',
  },
  listHeader: {
    padding: 8,
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 2,
    borderRadius: 4,
  },
});
