import { action, makeObservable, runInAction, observable } from 'mobx';
import request from '@/api';

class UserStore {
  constructor() {
    makeObservable(this);
  }
  @observable userName = '';

  @action
  login = () =>{
    runInAction(() => {
      this.userName = 'xxx'
    })
  }
  // login = request.user
  // .userInfo({data: ''})
  // .then(res => {
  //   // do something...
  // });
}

export default new UserStore();
