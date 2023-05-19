import React, {useState} from 'react';
import {View, Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {ethers} from 'ethers';
import Web3 from 'web3';
import {INFURA_URI} from '@env';
import {useSelector, useDispatch} from 'react-redux';
import {addActiveWallet, addWallet} from '../../redux/slice';
import {AddIcon} from '../../modules/Icons';
import {useNavigation} from '@react-navigation/native';
import {Toast} from '../../modules';

interface WalletInterface {
  walletAddress: string;
  balance: string;
}
interface activeWalletInterface {
  walletAddress: string;
  balance: string;
}
interface selectorData {
  wallet: WalletInterface[];
  activeWallet: activeWalletInterface;
}
const AccountScreen: React.FC = () => {
  const [balanceTotal, setBalanceTotal] = useState<number>(0);
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>();
  const data: selectorData = useSelector((state: {reducer: selectorData}) => state.reducer);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeWallet, setActiveWallet] = useState<WalletInterface>();
  const [wallets, setWallets] = useState<WalletInterface[]>(data?.wallet[0]);
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const createWallet = () => {
    setLoading(true);
    const wallet = ethers.Wallet.createRandom();
    setAddress(wallet?.address);
    getBalances(wallet.address);
  };

  const getBalances = async (walletAddress: string) => {
    const web3 = new Web3(INFURA_URI);
    const ethBalance = await web3.eth.getBalance(walletAddress);
    setBalance(Web3.utils.fromWei(ethBalance, 'ether'));
    let finalWallets: WalletInterface[] = [];
    if (wallets !== undefined) {
      finalWallets = [...wallets, {walletAddress, balance: ethBalance}];
    }
    setWallets(finalWallets);
    dispatch(addWallet(finalWallets));
  };

  console.log(data.activeWallet);
  const calculateTotalBalance = React.useCallback(() => {
    let total = 0;
    if (data.wallet !== undefined) {
      data?.wallet?.forEach(item => (total = total + Number(item?.balance)));
    }
    setBalanceTotal(total);
  }, [data?.wallet]);

  const openActiveWalletAccount = (wallet: WalletInterface) => {
    dispatch(addActiveWallet(wallet));
    setActiveWallet(wallet);
    navigation.navigate('Home');
  };

  React.useEffect(() => {
    calculateTotalBalance();
  }, [calculateTotalBalance]);
  return (
    <View style={styles.root}>
      <Toast visible={visible} setVisible={setVisible} label="Wallet created successfully" />
      <View style={styles.header}>
        <Text style={styles.heading}>Wallets</Text>
        <TouchableOpacity onPress={createWallet}>
          {loading ? <ActivityIndicator size={14} color="" /> : <AddIcon color="white" />}
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.titleText}>SUMMARY</Text>
      </View>
      {data?.wallet?.length > 0 && (
        <View style={styles.balanceContainer}>
          <Text style={styles.totalBalanceText}>${' ' + balanceTotal}</Text>
          {Number(balance) > 0 && <Text style={styles.priceText}>{balance}</Text>}
          <Text style={styles.date}>-- Today</Text>
        </View>
      )}
      <View>
        <Text style={styles.titleText}>CONNECTED WALLETS</Text>
      </View>
      {data?.wallet !== undefined && data?.wallet?.length > 0 ? (
        data?.wallet?.map((item: WalletInterface) => (
          <View key={item.walletAddress}>
            <TouchableOpacity
              style={styles.walletContainer}
              onPress={() => openActiveWalletAccount(item)}>
              {data.activeWallet.walletAddress === item.walletAddress ? (
                <View style={styles.activeWallet} />
              ) : (
                <View style={styles.inActiveWallet} />
              )}
              <View>
                <Text style={styles.balanceText}>${' ' + item.balance} USD </Text>
                <Text style={styles.addressText}>{item.walletAddress}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
          </View>
        ))
      ) : (
        <View style={styles.emptyWalletContainer}>
          <Text style={styles.emptyWalletIndicationText}>No wallets found, create new wallet</Text>
        </View>
      )}
    </View>
  );
};
export default AccountScreen;

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.9,
    color: 'white',
    position: 'relative',
    backgroundColor: '#09090b',
  },
  heading: {
    color: 'white',
    textAlign: 'center',
    padding: 10,
    fontSize: 10,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#09090b',
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  titleText: {
    fontSize: 10,
    backgroundColor: '#27272a',
    padding: 10,
    color: 'white',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  addressText: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: '300',
  },
  balanceText: {
    fontSize: 18,
    color: 'white',
  },
  walletContainer: {
    padding: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  totalBalanceText: {
    fontSize: 24,
    color: 'white',
    margin: 10,
    fontWeight: '700',
  },
  date: {
    color: 'white',
    marginHorizontal: 10,
  },
  balanceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    display: 'flex',
  },
  activeWallet: {
    width: 2,
    height: 2,
    backgroundColor: '#3b82f6',
    padding: 3,
    borderRadius: 100,
    marginHorizontal: 10,
  },
  inActiveWallet: {
    width: 2,
    height: 2,
    backgroundColor: 'transparent',
    padding: 3,
    borderRadius: 100,
    marginHorizontal: 10,
  },
  divider: {
    borderBottomColor: '#262626',
    borderBottomWidth: 1,
  },
  emptyWalletContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    padding: 10,
  },
  emptyWalletIndicationText: {
    color: 'white',
    fontSize: 12,
  },
});
