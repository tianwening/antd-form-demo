import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Space } from 'antd'
import { useUpdate } from 'ahooks'
import { useEffect } from 'react';

const OUTER_FORM_LIST_NAME = 'outer'
const INNER_FORM_LIST_NAME = 'inner'

// 大概长这个结构
// {
//   outer: [
//     {
//       name: '',
//       inner: [
//         {
//           password: '',
//           confirmPassword: ''
//         }
//       ]
//     }
//   ]
// }

const NestedFormList = () => {
  const update = useUpdate()
  const [data, setData] = useState([])
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      [OUTER_FORM_LIST_NAME]: [
        {
          name: '',
          [INNER_FORM_LIST_NAME]: [
            {
              password: '',
              confirmPassword: ''
            }
          ]
        }
      ]
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFinish = (params) => {
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
          {data && JSON.stringify(data, null, 4)}
        </Col>
      </Row>
      <Form.List
        name={OUTER_FORM_LIST_NAME}
      >
        {
          (outerFields, { add: addOuter }) => {
            return outerFields.map((outerField, { add }) => {
              return (
                <Space
                  key={outerField.name}
                  style={{
                    width: '100%'
                  }}
                  direction="vertical"
                >
                  <Form.Item
                    label="外层的名字"
                    name={[outerField.name, 'name']}
                  >
                    <Input />
                  </Form.Item>
                  <Form.List
                    name={[outerField.name, INNER_FORM_LIST_NAME]}
                  >
                    {
                      (fields, { add }) => {
                        return fields.map(field => (
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
                                dependencies={[[OUTER_FORM_LIST_NAME, outerField.name, INNER_FORM_LIST_NAME, field.name, 'password']]}
                                rules={[
                                  {
                                    validator: ((pIndex, index) => (rule, value) => {
                                      const namePath = [OUTER_FORM_LIST_NAME, pIndex, INNER_FORM_LIST_NAME, index, 'password']
                                      const password = form.getFieldValue(namePath)
                                      console.log(password, value)
                                      if (password !== value) {
                                        return Promise.reject(new Error("密码和确认密码不一致，请检查"))
                                      }
                                      return Promise.resolve()
                                    })(outerField.name, field.name)
                                  }
                                ]}
                              >
                                <Input />
                              </Form.Item>
                            </div>
                            <Button type="dashed" onClick={() => {
                              add({
                                password: '',
                                confirmPassword: ''
                              })
                            }}>里层的新增</Button>
                          </Space>
                        ))
                      }
                    }
                  </Form.List>
                  <Button type="primary" onClick={() => {
                    addOuter({
                      name: '',
                      [INNER_FORM_LIST_NAME]: [
                        {
                          password: '',
                          confirmPassword: ''
                        }
                      ]
                    })
                    // update()
                  }}>外层的新增</Button>
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

export default NestedFormList;
