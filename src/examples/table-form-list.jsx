import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Space } from 'antd'
import { useEffect } from 'react';
import classnames from 'classnames'

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

const TableFormList = () => {
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
      <div
        className={classnames(['ant-table-wrapper'])}
      >
        <div
          className={classnames(['ant-table', 'ant-table-bordered'])}
        >
          <div
            className={classnames(['ant-table-container'])}
          >
            <div
              className={classnames(['ant-table-content'])}
            >
              <table>
                <thead className={classnames(['ant-table-thead'])}>
                  <tr>
                    <th className={classnames(['ant-table-cell'])}>名字</th>
                    <th className={classnames(['ant-table-cell'])}>密码</th>
                    <th className={classnames(['ant-table-cell'])}>确认密码</th>
                    <th className={classnames(['ant-table-cell'])}>操作</th>
                  </tr>
                </thead>
                <tbody className={classnames(['ant-table-tbody'])}>
                  <Form.List
                    name={OUTER_FORM_LIST_NAME}
                  >
                    {
                      (outerFields, { add: addOuter }) => {
                        return outerFields.map((outerField, { add }) => {
                          return (
                            <Form.List
                              key={outerField.key}
                              name={[outerField.name, INNER_FORM_LIST_NAME]}
                            >
                              {
                                (fields, { add }) => {
                                  return fields.map((field, index) => (
                                    <tr key={field.key}>
                                      {index === 0 && <td className={classnames(['ant-table-cell'])} rowSpan={fields.length || 1}>
                                        <Form.Item
                                          noStyle
                                          shouldUpdate
                                        >
                                          {
                                            ({ getFieldValue, setFields }) => {
                                              const namePath = [OUTER_FORM_LIST_NAME, outerField.name, 'name']
                                              const value = getFieldValue(namePath)
                                              return <Input value={value} onChange={
                                                (e) => {
                                                  setFields([
                                                    {
                                                      name: namePath,
                                                      value: e?.target?.value
                                                    }
                                                  ])
                                                }
                                              } />
                                            }
                                          }
                                        </Form.Item>
                                      </td>}
                                      <td className={classnames(['ant-table-cell'])}>
                                        <Form.Item
                                          name={[field.name, 'password']}
                                        >
                                          <Input />
                                        </Form.Item>
                                      </td>
                                      <td className={classnames(['ant-table-cell'])}>
                                        <Form.Item
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
                                      </td>
                                      <td className={classnames(['ant-table-cell'])}>
                                        <Space>
                                          {
                                            fields.length < 5 && field.name === fields.length - 1 && <Button type="primary" onClick={() => {
                                              add({
                                                password: '',
                                                confirmPassword: ''
                                              })
                                            }}>新增</Button>
                                          }
                                          {
                                            fields.length > 1 && <Button danger onClick={() => {
                                              add({
                                                password: '',
                                                confirmPassword: ''
                                              })
                                            }}>删除</Button>
                                          }

                                        </Space>
                                      </td>
                                    </tr>
                                  ))
                                }
                              }
                            </Form.List>
                          )
                        })
                      }
                    }
                  </Form.List>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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

export default TableFormList;
