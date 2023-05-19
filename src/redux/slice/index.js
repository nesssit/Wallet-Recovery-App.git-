import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  wallet: [
    {
      walletAddress: 'zxcvbnm',
      balance: 100,
    },
    {
      walletAddress: 'asdfghjkl',
      balance: 300,
    },
    {
      walletAddress: 'qwertyuiop',
      balance: 400,
    },
  ],
  activeWallet: {
    walletAddress: 'zxcvbnm',
    balance: 100,
  },
};
const walletSlice = createSlice({
  name: 'userWallet',
  initialState,
  reducers: {
    addWallet: (state, action) => {
      return {...state, wallet: action.payload};
    },
    addActiveWallet: (state, action) => {
      return {...state, activeWallet: action.payload};
    },
  },
});
export const {addWallet, addActiveWallet} = walletSlice.actions;
export const reducer = walletSlice.reducer;
