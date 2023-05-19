import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Account {
  address: string;
  balance: string;
  privateKey: string;
}

const AccountsList: React.FC<Account[]> = accounts => {
  return (
    <View>
      <View>
        <View style={styles.listHeader}>
          <Text style={{color: 'white'}}>Address</Text>
          <Text style={{color: 'white'}}>Balance</Text>
        </View>
        {accounts &&
          accounts?.map((item: Account) => (
            <View key={item.address} style={styles.accountList}>
              <Text numberOfLines={1}>{item.address.slice(0, 20)}...</Text>
              <Text numberOfLines={1}>{item.balance}</Text>
            </View>
          ))}
        <Text style={styles.caption}>Private keys are stored in keychains stores</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  ethBalanceContainer: {
    backgroundColor: '#EEEEEE',
    height: 100,
    color: 'black',
    width: '98%',
    marginVertical: 10,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    alignSelf: 'center',
  },
  caption: {
    alignSelf: 'center',
    marginVertical: 4,
    fontSize: 10,
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
export default AccountsList;
