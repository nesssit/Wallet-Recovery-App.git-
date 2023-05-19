import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AIScreen, AccountScreen, HomeScreen, StakingScreen} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {QueryClientProvider, QueryClient} from 'react-query';
import {AIIcon, AccountIcon, HomeIcon, StakingIcon} from './src/modules/Icons';
import {Provider as ReduxProvider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  const queryClient = new QueryClient();

  const HomeScreenTab: React.FC = () => {
    return (
      <Tab.Navigator screenOptions={{headerStyle: {backgroundColor: '#09090b'}}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={options => {
            const isActive = options.navigation.isFocused();
            return {
              tabBarIcon: () => <HomeIcon color={isActive ? '#3b82f6' : 'white'} />,
              headerShown: false,
              tabBarStyle: {backgroundColor: '#09090b'},
            };
          }}
        />
        <Tab.Screen
          name="Staking"
          component={StakingScreen}
          options={options => {
            const isActive = options.navigation.isFocused();
            return {
              tabBarIcon: () => <StakingIcon color={isActive ? '#3b82f6' : 'white'} />,
              headerShown: false,
              tabBarStyle: {backgroundColor: '#09090b'},
            };
          }}
        />
        <Tab.Screen
          name="AI"
          component={AIScreen}
          options={options => {
            const isActive = options.navigation.isFocused();
            return {
              tabBarIcon: () => <AIIcon color={isActive ? '#3b82f6' : 'white'} />,
              headerShown: false,
              tabBarStyle: {backgroundColor: '#09090b'},
            };
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={options => {
            const isActive = options.navigation.isFocused();
            return {
              tabBarIcon: () => <AccountIcon color={isActive ? '#3b82f6' : 'white'} />,
              headerShown: false,
              tabBarStyle: {backgroundColor: '#09090b'},
            };
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          {/* <PersistGate persistor={persistor} loading={null}> */}
          <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
              <Stack.Screen
                name="HomeScreenTab"
                component={HomeScreenTab}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
          {/* </PersistGate> */}
        </ReduxProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
};

export default App;
