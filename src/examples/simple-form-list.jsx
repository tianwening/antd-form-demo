import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Space } from 'antd'
import { useUpdate } from 'ahooks'

const SimpleFormList = () => {
  const update = useUpdate()
  const [data, setData] = useState([])
  const [form] = Form.useForm()

  const onFinish = (params) => {
    console.log(params)
    setData(params)
  }

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      onFinish={onFinish}
    >
      <Row>
        <Col offset={8} span={8}>
          {data && JSON.stringify(data)}
        </Col>
      </Row>
      <Form.List
        name="list"
      >
        {
          (fields, { add, remove }) => {
            if (!fields.length) {
              add({
                password: '',
                confirmPassword: ''
              })
              update()
            }
            return fields.map(field => {
              return (
                <Space
                  style={{
                    width: '100%'
                  }}
                  key={field.key}
                  direction="vertical"
                >
                  <div >
                    <Form.Item
                      label="密码"
                      name={[field.name, 'password']}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="确认密码"
                      name={[field.name, 'confirmPassword']}
                      dependencies={[['list', field.name, 'password']]}
                      rules={[
                        {
                          validator: ((index) => (rule, value) => {
                            const namePath = ['list', index, 'password']
                            const password = form.getFieldValue(namePath)
                            if (password !== value) {
                              return Promise.reject(new Error("密码和确认密码不一致，请检查"))
                            }
                            return Promise.resolve()
                          })(field.name)
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <Space>
                    <Button onClick={() => {
                      add({
                        password: '',
                        confirmPassword: ''
                      })
                    }}>新增</Button>
                    <Button onClick={() => remove(field.name)}>删除</Button>
                  </Space>
                </Space>
              )
            })
          }
        }
      </Form.List>
      <Form.Item
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 8 }}
      >
        <Row>
          <Col offset={4}>
            <Button htmlType='submit'>提交</Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  )
};

export default SimpleFormList;
