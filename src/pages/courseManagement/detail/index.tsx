import React, { FC, useState, useEffect } from "react";
import { Button, Popconfirm, message, Modal, Spin } from "antd";
import "./index.scss";
import { useStores } from '@/store';
import { observer } from 'mobx-react';
import AddCourse from '../components/addCourse';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { placeOrderResult } from '@/api/order';
import { CourseItem } from '@/api/course';
import { VideoCameraAddOutlined } from '@ant-design/icons';

const initDetail = {
  id: 0,
  name: '',
  teacherName: '',
  teacherDescription: '',
  description: '',
  price: '',
  videoList: []
}


const CourseDetail: FC<{}> = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  let store = useStores();
  const { courseStore, orderStore } = store;
  const { getCourseDetail, deleteCourse } = courseStore;
  const { placeOrder } = orderStore;
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [detail, setDetail] = useState<CourseItem>(initDetail);

  const getTableDetail = () => {
    getCourseDetail(Number(id)).then((res) => {
      setDetail(res)
    })
  }

  useEffect(() => {
    getTableDetail()
  }, [])

  return (
    <div className="course-management-detail">
      <div className="course-management-detail-content">
        <div className="course-management-detail-title" >
          <div>
            {detail.name}
          </div>
          <div className="course-management-detail-title-button" >
            <Button style={{ marginRight: 20 }} onClick={() => { setCurrentId(detail.id); setIsEdit(true); setVisible(true); }} type="primary">更新课程</Button>
            <Popconfirm
              title="您确定要删除此课程吗？"
              onConfirm={() => {
                deleteCourse(detail.id).then(res => {
                  message.success('删除成功')
                  navigate(`courseManagement`)
                })
              }}
              okText="确定"
              cancelText="取消"
            >
              <Button type="primary" style={{ marginRight: 20 }} >删除</Button>
            </Popconfirm>
            {detail.price && <Button onClick={() => {
              placeOrder(detail.id).then(({ data }: { data: placeOrderResult }) => {
                setIsModalVisible(true)
                setOrderId(data.id)
                let newWindow = window.open('about:blank')
                newWindow?.document.write(data.formComponentHtml)
                newWindow?.focus()
              })
            }} type="primary">{`￥ ${(Number(detail.price) / 100).toFixed(2)} `}购买</Button>}
          </div>
        </div>
        <div className="course-management-detail-description" >
          <div className="course-management-detail-description-item">
            课程简介: {detail.description}
          </div>
          <div className="course-management-detail-description-item">
            教师姓名: {detail.teacherName}
          </div>
          <div className="course-management-detail-description-item">
            教师简介: {detail.teacherDescription}
          </div>
          <div className="course-management-detail-description-item">
            视频列表：
          </div>
        </div>

        <div className="course-management-detail-video">
          {detail.videoList && detail.videoList.map((item, index: number) => (
            <div className="course-management-detail-video-item">
              <VideoCameraAddOutlined style={{ marginRight: 10 }} />
              {index + 1}
              {' '}
              {item.name}
            </div>
          ))}

        </div>
        <AddCourse
          visible={visible}
          isEdit={isEdit}
          currentId={currentId}
          onSuccess={(isSuccess: number) => {

          }}
          onChangeVisible={(visible: boolean) => {
            setVisible(visible);
          }} />

        <Modal title="下单结果" visible={isModalVisible} okText="已支付" cancelText="支付失败" onOk={() => navigate(`orderManagement/detail?id=${orderId}`)} onCancel={() => setIsModalVisible(false)}>
          <Spin>
            订单生成中...
          </Spin>
        </Modal>
      </div>
    </div>
  );
};

export default observer(CourseDetail);
