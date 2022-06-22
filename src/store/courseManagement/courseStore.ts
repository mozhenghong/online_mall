import { action, makeObservable, runInAction, observable } from 'mobx';
import { getCourseList, getCourseDetail, updateCourse, addCourse, deleteCourse, CourseListParams, CourseData } from '@/api/course'

class CourseStore {
    constructor() {
        makeObservable(this);
    }
    @observable courseList = [];
    @observable courseTotal = 0;
    @observable courseDetail: any = {};
    @observable search:string = ''

    @action
    getCourseList = async (params: CourseListParams) => {
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
            this.courseDetail = data.data
        })
        return data.data
    };
    @action
    updateCourse = async (id: number, params: CourseData) => {
        let data = await updateCourse(id, params);
        return data;
    };
    @action
    addCourse = async (params: CourseData) => {
        let data = await addCourse(params);
        return data;
    };
    @action
    deleteCourse = async (id: number) => {
        let data = await deleteCourse(id);
        return data;
    };

    @action
    setSearch =  (params: string) => {
        runInAction(() => {
            this.search = params
        })
    };
}

export default new CourseStore();
