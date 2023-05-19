import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {CameraIcon} from '../Icons';
// import {CameraScreen} from '../index';

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

const Navbar: React.FC = ({}) => {
  const navigation = useNavigation();
  const data: selectorData = useSelector((state: any) => state.reducer);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Account')}>
        <Avatar.Text size={24} label="P" color="coral" />
      </TouchableOpacity>
      <Text style={styles.addressText}>{data.activeWallet?.walletAddress}</Text>
      <TouchableOpacity onPress={() => setIsCameraOpen(true)}>
        <CameraIcon />
      </TouchableOpacity>
      {/* <CameraScreen isCameraOpen={isCameraOpen} setIsCameraOpen={setIsCameraOpen} />  */}
    </View>
  );
};
export default Navbar;

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.9,
    backgroundColor: '#09090b',
    color: 'white',
  },
  navbar: {
    backgroundColor: '#09090b',
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  date: {
    color: 'white',
    marginHorizontal: 10,
  },
  symbol: {
    color: 'white',
    marginRight: 20,
  },
  coinName: {
    color: 'white',
  },
  text: {
    color: 'white',
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    color: 'white',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'right',
  },
  header: {
    padding: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#27272a',
    borderBottomWidth: 1,
  },
  increasePrecentageChange: {
    color: '#86efac',
    textAlign: 'right',
    fontSize: 10,
  },
  decreasePrecentageChange: {
    color: '#fda4af',
    textAlign: 'right',
    fontSize: 10,
  },
  addressText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '300',
  },
  balanceText: {
    fontSize: 24,
    color: 'white',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginHorizontal: 10,
  },
  coinCardContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#27272a',
    borderWidth: 1,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  postCard: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 10,
  },
  postTitle: {
    color: 'white',
    fontWeight: '500',
  },
  subtitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '300',
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
