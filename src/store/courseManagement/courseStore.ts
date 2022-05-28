import { action, makeObservable, runInAction, observable } from 'mobx';
import { getCourseList, getCourseDetail, updateCourse, addCourse, deleteCourse } from '@/api/course'

class CourseStore {
    constructor() {
        makeObservable(this);
    }
    @observable courseList = [];
    @observable courseTotal = 0;
    @observable userDetail: any = {};

    @action
    getCourseList = async (params: any) => {
        let data: any = await getCourseList(params);
        runInAction(() => {
            this.courseList = data.data
            this.courseTotal = data.total
        })
        return data;
    };
    @action
    getCourseDetail = async (id: number) => {
        let data: any = await getCourseDetail(id);
        runInAction(() => {
            this.userDetail = data.data
        })
        return data.data
    };
    @action
    updateCourse = async (id: number, params: any) => {
        let data = await updateCourse(id, params);
        return data;
    };
    @action
    addCourse = async (params: any) => {
        let data = await addCourse(params);
        return data;
    };
    @action
    deleteCourse = async (id: number) => {
        let data = await deleteCourse(id);
        return data;
    };
}

export default new CourseStore();