import { action, makeObservable, runInAction, observable } from 'mobx';
import request from '@/api';

class UserStore {
  constructor() {
    makeObservable(this);
  }
  @observable userName = '';

  @action
  setName = () =>{
    runInAction(() => {
      this.userName = 'xxx'
    })
  }

  // @action
  // login = request.user
  // .userInfo({data: ''})
  // .then(res => {
  //   // do something...
  // });
}

export default new UserStore();
