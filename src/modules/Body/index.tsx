import React from 'react';
import {Dimensions, View} from 'react-native';
import {fetchLatestBlockchainCoins} from '../../packages/apis/rest';
import {AIScreen, AccountScreen, HomeScreen, StakingScreen} from '../../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AIIcon, AccountIcon, HomeIcon, StakingIcon} from '../Icons';

interface AppBodyChildrenInterface {
  children: React.ReactNode;
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppBody: React.FC<AppBodyChildrenInterface> = ({children}: AppBodyChildrenInterface) => {
  const HomeScreenTab: React.FC = () => {
    return (
      <Tab.Navigator screenOptions={{headerStyle: {backgroundColor: '#09090b'}}}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: () => <HomeIcon color="white" />,
            headerShown: false,
            tabBarStyle: {backgroundColor: '#09090b'},
          }}
        />
        <Tab.Screen
          name="StakingScreen"
          component={StakingScreen}
          options={{
            tabBarIcon: () => <StakingIcon color="white" />,
            headerShown: false,
            tabBarStyle: {backgroundColor: '#09090b'},
          }}
        />
        <Tab.Screen
          name="AIScreen"
          component={AIScreen}
          options={{
            tabBarIcon: () => <AIIcon color="white" />,
            headerShown: false,
            tabBarStyle: {backgroundColor: '#09090b'},
          }}
        />
        <Tab.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            tabBarIcon: () => <AccountIcon color="white" />,
            headerShown: false,
            tabBarStyle: {backgroundColor: '#09090b'},
          }}
        />
      </Tab.Navigator>
    );
  };

  fetchLatestBlockchainCoins();

  console.log('app body');
  return <View style={{height: Dimensions.get('window').height}}>{children}</View>;
};

export default AppBody;
