import { action, makeObservable, runInAction, observable } from 'mobx';
import { login, logout, register, getUserList, getUserDetail, updateUser } from '@/api/user'

class UserStore {
  constructor() {
    makeObservable(this);
  }
  @observable userList = [];
  @observable userTotal = 0;
  @observable userDetail: any = {};

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
    let data: any = await getUserList(params);
    runInAction(() => {
      this.userList = data.data
      this.userTotal = data.total
    })
    return data;
  };
  @action
  getUserDetail = async (id: number) => {
    let data: any = await getUserDetail(id);
    let detail = data.data
    runInAction(() => {
      let rolesId: any = []
      data.data && data.data.roles.map((item: any) => rolesId.push(item.name))
      this.userDetail = { ...data.data, rolesId }
      detail = { ...detail, rolesId }
    })
    return detail
  };
  @action
  updateUser = async (params: any) => {
    let data = await updateUser(params);
    return data;
  };

}

export default new UserStore();
