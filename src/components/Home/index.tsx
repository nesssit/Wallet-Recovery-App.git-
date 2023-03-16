import React, {useState} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {Button, TextInput, Portal, Modal} from 'react-native-paper';
import {saveCredentialInKeyChain} from '../../packages/hooks';
import {AccountsList} from '../../modules';
import {mnemonicToSeedSync} from 'bip39';
import hdKey from 'ethereumjs-wallet/src/hdkey';
import Web3 from 'web3';
import {INFURA_URI} from '@env';
interface Account {
  address: string;
  privateKey: string;
  balance: string;
}

const HomeScreen: React.FC = () => {
  const [phrase, setPhrase] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const handleInputChange = (value: string) => {
    setPhrase(value);
  };

  const handleSubmit = () => {
    const seedPhase = phrase.split(' ');
    if (seedPhase.length === 12) {
      setLoading(true);
      setError('');
      getPrivateKey();
    } else {
      setLoading(false);
      setError('Invalid Seed, 12 words are required');
    }
  };

  const getPrivateKey = async () => {
    const seedBuffer = await mnemonicToSeedSync(phrase);
    if (seedBuffer) {
      const root = hdKey.fromMasterSeed(seedBuffer);
      let wallet_hdpath = "m/44'/60'/0'/0/";
      let walletAccounts: Account[] = [];
      const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URI));
      for (let i = 0; i < 10; i++) {
        let wallet = root.derivePath(wallet_hdpath + i).getWallet();
        let address = '0x' + wallet.getAddress().toString('hex');
        const ethBalance = await web3.eth.getBalance(address);
        const etherBalance = await web3.utils.fromWei(ethBalance, 'ether');
        let privateKey = wallet.getPrivateKey().toString('hex');
        saveCredentialInKeyChain({username: address, password: privateKey});
        walletAccounts.push({address: address, privateKey: privateKey, balance: etherBalance});
      }
      setAccounts(walletAccounts);
      setVisible(true);
      setLoading(false);
    } else {
      setError('Invalid mnemonic phrase');
      setLoading(false);
    }
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
        label="Enter 12 word phrase separated by space"
        error={error ? true : false}
        style={styles.seedInput}
        textColor="black"
        onChangeText={handleInputChange}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        onPress={handleSubmit}
        mode="contained"
        loading={loading}
        buttonColor="black"
        style={styles.submitButton}>
        {loading ? 'Fetching balance' : 'Generate Keys'}
      </Button>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => {
            setVisible(false);
            setPhrase('');
          }}
          contentContainerStyle={styles.modalContainerStyle}>
          <AccountsList accounts={accounts} />
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
  modalContainerStyle: {
    backgroundColor: 'white',
    padding: 20,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'scroll',
  },
});
