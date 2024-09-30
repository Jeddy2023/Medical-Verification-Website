import React from "react";
import {AreaChart, Area, Tooltip, ResponsiveContainer} from 'recharts';
import './Metrics.css';

const data = [
    {
        view: 1000
    },
    {
        view: 1200
    },
    {
        view: 1500
    },
    {
        view: 1700
    },
    {
        view: 1900
    },
    {
        view: 2190
    },
    {
        view: 2490
    },
    {
        view: 2200
    },
    {
        view: 2380
    },
    {
        view: 1800
    }
]
const Metrics = () =>{
    return(
        <div className="topCard">
            <h3>Daily views</h3>
            <span>September 2021 - October 2021</span>
            <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorView" x1='0' y1="0" x2="0" y2="1">
                            <stop offset="30%" stopColor="#8884d8" stopOpacity={0.5}/>
                            <stop offset="75%" stopColor="#ff9bff81" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#ffffff" stopOpacity={0.3}/>
                        </linearGradient>
                    </defs>
                    <Tooltip/>
                    <Area type="monotone" dataKey="view" stroke="#8884d8" strokeWidth={2} strokeOpacity={2} fill="url(#colorView)"/>
                </AreaChart>
            </ResponsiveContainer>

        </div>
    )
}

export default Metrics