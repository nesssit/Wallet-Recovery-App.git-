import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Avatar} from 'react-native-paper';
import {fetchLatestBlockchainCoins, fetchLatestPosts} from '../../packages/apis/rest';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {Navbar} from '../../modules';
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

const HomeScreen: React.FC = ({}) => {
  const navigation = useNavigation();
  const [latestBlockchains, setLatestBlockchains] = useState();
  const [latestPosts, setLatestPosts] = useState();
  const {data: blockhainQueryData, isLoading: isLoadingBlockchains} = useQuery(
    ['latestBlockchains'],
    async () => {
      const response = await fetchLatestBlockchainCoins();
      setLatestBlockchains(response.data);
      return response.data;
    },
  );

  function getRandomColorHex() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      color += letters[randomIndex];
    }

    return color;
  }
  const data: selectorData = useSelector((state: any) => state.reducer);

  const fetchLatestBlockhains = async () => {
    const posts = await fetchLatestPosts();
    setLatestPosts(posts.data);
  };
  React.useEffect(() => {
    fetchLatestBlockhains();
  }, []);

  return (
    <View>
      <Navbar />
      <ScrollView style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.balanceText}>$ {data.activeWallet?.balance} USD</Text>
          <Text style={styles.date}>-- Today</Text>
        </View>
        <Text style={styles.text}>Latest Blockchains</Text>
        {isLoadingBlockchains ? (
          <Text style={styles.text}>Fetching data...</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {blockhainQueryData !== undefined &&
              blockhainQueryData?.map(item => {
                return (
                  <View key={item.id} style={styles.coinCardContainer}>
                    <View style={{marginHorizontal: 10}}>
                      <Avatar.Text
                        size={28}
                        style={{backgroundColor: getRandomColorHex()}}
                        label={item?.symbol?.toUpperCase().substring(0, 1)}
                        color="white"
                      />
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={styles.symbol}>{item?.symbol?.toUpperCase()}</Text>
                      {/* <Text style={styles.coinName}>{item?.name}</Text> */}
                    </View>
                    <View style={{flex: 2}}>
                      <Text style={styles.price}>
                        {Number(item?.quote['USD']?.price).toFixed(2)} USDT
                      </Text>
                      {Number(item.quote['USD']?.percent_change_1h) > 0 ? (
                        <Text style={styles.increasePrecentageChange}>
                          {item.quote['USD']?.percent_change_1h}%
                        </Text>
                      ) : (
                        <Text style={styles.decreasePrecentageChange}>
                          {item.quote['USD']?.percent_change_1h}%
                        </Text>
                      )}
                    </View>
                  </View>
                );
              })}
          </ScrollView>
        )}
        <Text style={styles.text}>Latest Posts</Text>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {latestPosts !== undefined &&
            latestPosts?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.postCard}
                  onPress={() => {
                    Linking.openURL(item.source_url);
                  }}>
                  <Text style={styles.postTitle}>{item.title}</Text>
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
                  {item?.cover && <Image source={{uri: item?.cover}} />}
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </ScrollView>
    </View>
  );
};
export default HomeScreen;

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
