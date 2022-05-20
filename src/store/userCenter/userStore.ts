import { action, makeObservable, runInAction, observable } from 'mobx';
import { login, logout } from '@/api'

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
      localStorage.setItem('userName', 'xxxx')
    });
  };

  @action
  logout = async () => {
    let data = await logout();
    runInAction(() => {
    });
  };
}

export default new UserStore();
