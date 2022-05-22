import React from 'react';
import userStore from './userManagement/userStore';

const store = {
  userStore,
};

const storesContext = React.createContext({ ...store });
export const useStores = () => React.useContext(storesContext);

export const rootStore = { ...store };