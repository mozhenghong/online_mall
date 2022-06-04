import { action, makeObservable, runInAction, observable } from 'mobx';
import { placeOrder } from '@/api/order';

class OrderStore {
    constructor() {
        makeObservable(this);
    }

    @action
    placeOrder = async (data: any) => {
        let res = await placeOrder(data);
        return res;
    };
}

export default new OrderStore();
