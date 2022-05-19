import { action, makeObservable, runInAction, observable } from 'mobx';
import { login } from '@/api'

class UserStore {
  constructor() {
    makeObservable(this);
  }
  @observable userName = '';

  @action
  login = async (params: any) => {
    let data = await login(params);
    runInAction(() => {
      this.userName = 'xxx'
    });
  };
}

export default new UserStore();
