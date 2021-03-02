import React from 'react'
import { Link } from 'react-router-dom'
import { SearchOutlined, StarTwoTone, UploadOutlined } from '@ant-design/icons'
import { Table, Input, Button, Form, Skeleton, message, notification, Upload } from 'antd'
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import { browserHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import { Popconfirm } from 'antd'
import axios from 'axios'
import get from 'lodash.get'
import { useHistory } from "react-router-dom";

const { form } = Form
const baseUrl = process.env.REACT_APP_BASE_URL
var searchInput
class UserAccess extends React.Component {
  

  state = {
    searchText: '',
    tableData: [],
    isContentLoading: true,
    props: {
      name: 'file',
      action: `${baseUrl}/users`,
      onChange(info) {
        console.log(info)
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          if (info.file.response.status === 'success') {
            message.success(`${info.file.name} file uploaded successfully`)
            window.location.reload()
          } else {
            for (let i = 0; i < info.file.response.message.length; i += 1) {
              notification.open({
                message: 'Error Occured',
                description: info.file.response.message[i],
                onClick: () => {
                  console.log('Notification Clicked!')
                },
              })
            }
          }
        } else if (info.file.status === 'error') {
          message.error('Please refresh the page and try again.')
        }
      },
    },
  }

  componentDidMount = () => {
    this.refreshPage()
  }

  refreshPage = () => {
    this.setState({ isContentLoading: true })
    axios({
        method: 'get',
        url: 'https://reqres.in/api/users',
      }).then(res => {
          if (res) {
            this.setState({ isContentLoading: false })
            this.setState({ tableData: res.data.data })
          } else {
            notification.open({
              message: 'Error Occured',
              description: 'No Data Loaded.Try Again!',
              onClick: () => {
                console.log('Notification Clicked!')
              },
            })
          }
        })
     
  }

  editexclusion = record => {
    localStorage.setItem('editing', true)
    localStorage.setItem('record', JSON.stringify(record))
    localStorage.setItem('record', JSON.stringify(record))
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node
          }}
          placeholder={`Search `}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      get(record, dataIndex)
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select())
      }
    },
    render: text => {
      if (text != null) {
        return (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        )
      } else return ''
    },
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm()
    this.setState({ searchText: selectedKeys[0] })
  }
  deleteRecord = delid => {
  
     
    axios({
      method: 'delete',
      url: `https://reqres.in/api/users/${delid}` ,
    }).then(res => {
          if (res.status==204) {
            notification.open({
              message: 'Deleted',
              description: 'Entry Deleted Successfully',
              onClick: () => {
                console.log('Notification Clicked!')
              },
            })
            this.refreshPage()
          } else {
            notification.open({
              message: 'Error Occured',
              description: 'Error!Try Again',
              onClick: () => {
                console.log('Notification Clicked!')
              },
            })
          }
        })
      
    
  }

  handleReset = clearFilters => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  editexclusion = record => {
    localStorage.setItem('editing', true)
    console.log(record)
    localStorage.setItem('record', JSON.stringify(record))
    this.props.history.push('/edit')
  }

  render() {
    const columns = [
    
      {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'firstName',
        sorter: (a, b) => a.first_name.localeCompare(b.first_name),

        ...this.getColumnSearchProps('first_name'),
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'lastName',
        sorter: (a, b) => a.last_name.localeCompare(b.last_name),

        ...this.getColumnSearchProps('last_name'),
      },
     
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),

        ...this.getColumnSearchProps('email'),
      },

      
      

      {
        title: '',
        dataIndex: 'updated',
        key: 'Action',
        render: (updated, key) => {
          return (
            <>
            
              <Button
                onClick={e => {this.editexclusion(key, e)

                 
                
                  
                 
                }
              }
               
              >
                <i className="fe fe-edit mr-2" />
                Edit
              </Button>
           
              &nbsp;
              <Popconfirm
                placement="topRight"
                title="Are you sure to delete this record?"
                onConfirm={() => this.deleteRecord(key.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button className="btn btn-sm btn-light mr-2">
                  <i className="fe fe-trash mr-2" />
                  Delete
                </Button>
              </Popconfirm>
            </>
          )
        },
      },
    ]

    const { tableData, isContentLoading } = this.state
    // if(!auth)
    // {
    //   return (
    //     <Redirect to = "/"></Redirect>
    //   )

   // }
   if(!localStorage.getItem('auth'))
  return (
    <Redirect to = "/"></Redirect>
  )
    return (
      <div>
        
        <div className="card">
          <Button style = {{marginBottom:"20px",marginRight:"20px"}} onClick = {()=> {
           this.props.history.push('/add')
          }}>ADD</Button>
          
          <div className="card-header card-header-flex">
           
            <div className="d-flex flex-column justify-content-center">
              {/* <Link to="/products/addUserAccess" className="btn btn-primary">
                ADD
              </Link> */}
            </div>
          </div>
          <div className="card-body">
            <div className="mb-4 kit__utils__table">
              <Skeleton active loading={isContentLoading}>
                <Form form={form} component={false}>
                  <Form.Item>
                    <Table
                      dataSource={tableData}
                      rowKey={record => record.userId}
                      columns={columns}
                    />
                  </Form.Item>
                </Form>
              </Skeleton>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserAccess)