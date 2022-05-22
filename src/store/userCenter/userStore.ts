import { action, makeObservable, runInAction, observable } from 'mobx';
import { login, logout, register } from '@/api'

class UserStore {
  constructor() {
    makeObservable(this);
  }
  @observable userName = '';

  @action
  login = async (params: any) => {
    let data: any = await login(params);
    runInAction(() => {
      localStorage.setItem('userName', data.data.username)
    });
    return data;
  };

  @action
  logout = async () => {
    let data = await logout();
    return data;
  };

  @action
  register = async (params: any) => {
    let data = await register(params);
    return data;
  };
}

export default new UserStore();
