import React from "react";
import {BarChart,Bar,XAxis,Tooltip,ResponsiveContainer} from 'recharts';

const data = [
    {
        name: "Mo",
        productDelivered:4000,
        productFinished:2400,
    },
    {
        name: "Tu",
        productDelivered:3000,
        productFinished:1390,
    },
    {
        name: "We",
        productDelivered:2000,
        productFinished:9800,
    },
    {
        name: "Th",
        productDelivered:2780,
        productFinished:2400,
    },
    {
        name: "Fr",
        productDelivered:1890,
        productFinished:4800,
    },
    {
        name: "Sa",
        productDelivered:2390,
        productFinished:3800,
    },
    {
        name: "Su",
        productDelivered:3490,
        productFinished:4300,
    },
]
const Activity = () => {
    return(
        <div className="userActivity topCard">
            <h3>Daily views</h3>
            <span>September 2021 - October 2021</span>
            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={data}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false}/>
                    <Tooltip/>
                    <Bar dataKey="productDelivered" stackId="a" fill="#4361ee" />
                    <Bar radius={[7, 7, 7, 0]} dataKey="productFinished" stackId="a" fill="#48bfe3" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Activity