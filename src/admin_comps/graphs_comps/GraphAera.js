import React, { useEffect, useState } from 'react';
import { doApiGet, apiUrl } from '../../services/apiService';
import CanvasjsReact from "../js/graphs_js/canvasjs.react";

function GraphAera(props) {

    let [arCities, setArCities] = useState([])

    useEffect(() => {
        let urlCities = apiUrl + "/cities";
        doApiGet(urlCities)
            .then(data => {
                setArCities(data);
            })
    }, [])

    let allUser = props.users_ar.filter(item => item.block_status===false);
    
    // מחשב כמות אנשים לפי איזורים ולפי גבר או אישה
    let citesCount = allUser.map(item => {
            return { "area": item.city }    
    })

    let arrr = []

    for(let i=0 ; i<citesCount.length; i++){
        for(let j=0 ; j<arCities.length; j++){
           if (citesCount[i].area === arCities[j].city_name) { 
              arrr.push({ "area": arCities[j].area }) 
              break;
           }
        } 
    }

    let south = { count: 0 };
    let center = { count: 0 };
    let north = { count: 0 };

    for (let index = 0; index < arrr.length; index++) {
        if (arrr[index].area === "south") south.count++;
        else if (arrr[index].area === "center") center.count++;
        else if (arrr[index].area === "north") north.count++;
    }
    let CanvasJS = CanvasjsReact.CanvasJS;
    let CanvasJSChart = CanvasjsReact.CanvasJSChart;


    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light3",
        width: 400,
        height: 400,
        backgroundColor: "#f3f5f9",
        toolbar: {
            backgroundColor: "#f3f5f9",
        },
        title: {
            text: "Number of users in each area",
            fontSize: 20
        },
        axisY: {
            includeZero: true,
            title: "Number of users",
        },
        axisX: {
            title: "Areas",
            labelAngle: 0
        },
        data: [{
            type: "column",
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: [
                { label: "South", y: south.count },
                { label: "Center", y: center.count },
                { label: "North", y: north.count }
            ]
        }]
    }
    return (
        <CanvasJSChart options={options} />

    )
}

export default GraphAera