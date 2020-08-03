import React from "react";
import styles from "./App.module.css";
import moment from "moment";



export default function Content ({data}) {
    return(
        <div className={styles.container}>
            <span>{moment(data.date).format('LL')}</span>
            <img src={data.url} alt=""/>
            <div className={styles.title}>
                <span>{data.title}</span>
                <span>Image Credit & Copyright: <a href={data.copyright}>{data.copyright}</a></span>
            </div>
            <div className={styles.text}>
                <p><span>Explanation:</span> {data.explanation}</p>
            </div>
        </div>
    )
}