import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {reducer} from './slice';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  // storage: AsyncStorage,
  key: 'root',
};
const rootReducer = combineReducers({
  reducer,
});

// export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: rootReducer,
});
export const persistor = persistStore(store);
