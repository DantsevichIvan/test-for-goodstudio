import React, {useEffect, useState} from 'react';
import styles from './App.module.css'
import {Button, DatePicker, Form} from "antd";
import axios from 'axios'
import moment from "moment";
import 'antd/dist/antd.css';
import Content from "./Content";


export default function App() {
    const [data, setDate] = useState(null)
    useEffect(() => {
        async function fetchData() {
            try {
                let APodDate = localStorage.getItem('date')
                if (!!APodDate) {
                    let response = await axios.get(`https://api.nasa.gov/planetary/apod?date=${APodDate}&api_key=vNa879Y6sVjEvsjjreeH5dFAPSwq99j5QYvV1LiA`)
                    saveDate(response)
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])
    const saveDate = (data) => {
        setDate(data.data)
    }
    const getDateAPod = (APod) => {
        async function getAPod(APodDate) {
            try {
                let dateNow = moment().format('YYYY-MM-DD')
                let currentDate = moment(APodDate).format('YYYY-MM-DD')
                if (currentDate !== dateNow) {
                    localStorage.setItem('date', APodDate)
                }else {
                    localStorage.clear()
                }
                const response = await axios.get(`https://api.nasa.gov/planetary/apod?date=${APodDate}&api_key=vNa879Y6sVjEvsjjreeH5dFAPSwq99j5QYvV1LiA`)
                saveDate(response)
            } catch (e) {
                console.log(e)
            }
        }

        getAPod(APod)
    }
    const onFinish = values => {
        const APod = moment(values.date._d).format('YYYY-MM-DD');
        getDateAPod(APod)
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={styles.app}>
            <div className={styles.header}>
                <span>Astronomy Picture of the Day</span>
            </div>
            <div className={styles.form}>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Date!',
                            },
                        ]}
                    >
                        <DatePicker placeholder="select date"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            {!!data?  <Content data={data}/>: null}
        </div>
    );
}
