import React from 'react';
import CanvasjsReact from "../js/graphs_js/canvasjs.react";
import "../css/graphs.css";

function GraphAdmin(props){
    let CanvasJS = CanvasjsReact.CanvasJS;
    let CanvasJSChart = CanvasjsReact.CanvasJSChart;

let regularUsers = props.users_ar.filter(item => item.vip.vip === false && item.block_status === false)
let allUsers = props.users_ar.filter(item => item.block_status === false);
let VipUsers = props.vip_ar.filter(item => item.block_status === false)

    const addSymbols = (e) => {
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);

        if (order > suffixes.length - 1)
            order = suffixes.length - 1;

        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", 
        width:400,
        height:400,
        backgroundColor:"#f3f5f9",
        toolbar:{
            backgroundColor:"#f3f5f9",
        },
        title: {
            text: "Numbers of users/admins",
            fontSize:20
        },
        axisY: {
            title: "Number of Users",
            labelFormatter: addSymbols
        },
        axisX: {
            title: "All Users",
            labelAngle: 0
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "All Users", y: allUsers.length},
                { label: "Regular Users", y: regularUsers.length},
                { label: "Vip", y: VipUsers.length},
                { label: "Admins", y: props.admins_ar.length},
                { label: "Blockeds", y: props.usersBlock_ar.length}

            ]
        }]
    }



    return(
         <CanvasJSChart options={options} />
    )
}

export default GraphAdmin