import React from 'react';
import userStore from './userManagement/userStore';
import courseStore from './courseManagement/courseStore';
import orderStore from './orderManagement/orderStore';

const store = {
  userStore,
  courseStore,
  orderStore
};

const storesContext = React.createContext({ ...store });
export const useStores = () => React.useContext(storesContext);

export const rootStore = { ...store };