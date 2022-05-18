import { action, makeObservable, runInAction } from 'mobx';
import request from '@/api';

class UserStore {
  constructor() {
    makeObservable(this);
  }

  @action
  login = request.user
  .userInfo({data: ''})
  .then(res => {
    // do something...
  });
}

export default new UserStore();
