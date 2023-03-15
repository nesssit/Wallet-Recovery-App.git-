import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {FontAwesome5Icon} from 'react-native-vector-icons';

interface Account {
  address: string;
  privateKey: string;
}

const AccountScreen = (accounts: Account) => {
  console.log(accounts, 'accounts');

  const account = '0x51D3Ff1D169A12c496001825f8931c031B1257ac';
  const balance = 0.0022;

  return (
    <View style={styles.root}>
      <View style={styles.ethBalanceContainer}>
        <Text style={styles.balance}>{balance}ETH</Text>
      </View>
      <View style={styles.flexContainer}>
        <View>
          <Text>Account</Text>
          <Text style={styles.account}>{account}</Text>
        </View>
        <View>
          <FontAwesome5Icon size={24} icon="user" />
        </View>
      </View>
    </View>
  );
};
export default AccountScreen;

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
  account: {
    fontSize: 12,
  },
});
