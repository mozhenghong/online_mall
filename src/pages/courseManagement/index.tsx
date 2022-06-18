import React, { FC, useState, useEffect } from "react";
import "./index.scss";
import { useStores } from '@/store';
import { observer } from 'mobx-react';
import { BasePage } from '@/api/interface';
import { useNavigate } from 'react-router-dom';
import { CourseItem } from '@/api/course';
import CoverSrc from '@/assets/layout/cover.jpeg';

const initPageInfo = { pageNum: 1, pageSize: 10 };

const CourseManagement: FC<{}> = () => {
  const { courseStore: { getCourseList, courseList, search } } = useStores();
  const navigate = useNavigate();
  const [pageInfo, setPageInfo] = useState<BasePage>(initPageInfo);

  const getTableList = async () => {
    await getCourseList({ ...pageInfo, search });
  }

  useEffect(() => {
    getTableList();
  }, [pageInfo, search])

  return (
    <div className="course-management">
      <div className="course-management-body">
        {
          courseList.map((item: CourseItem) => (
            <div className="course-management-body-item" onClick={() => {
              navigate(`detail?id=${item.id}`)
            }}>
              <img src={CoverSrc} alt="" className="course-management-body-item-cover" />
              <div className="course-management-body-item-title">
                {item.name}
              </div>
              <div className="course-management-body-item-teacher">
                教学方：{item.teacherName}
              </div>
              <div className="course-management-body-item-price">
                {item.price ? `￥ ${(Number(item.price) / 100).toFixed(2)}` : '免费'}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default observer(CourseManagement);
