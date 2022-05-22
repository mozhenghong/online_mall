import { action, makeObservable, runInAction, observable } from 'mobx';
import { login, logout, register, getUserList } from '@/api'

class UserStore {
  constructor() {
    makeObservable(this);
  }
  @observable userList = [];
  @observable userTotal  = 0;

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

  @action
  getUserList = async (params: any) => {
    let data:any = await getUserList(params);
    runInAction(() => {
      this.userList = data.data
      this.userTotal = data.totalPage
    })
    return data;
  };
}

export default new UserStore();
