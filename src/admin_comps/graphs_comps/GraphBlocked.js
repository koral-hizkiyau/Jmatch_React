import React, { useEffect, useState } from 'react';
import CanvasjsReact from "../js/graphs_js/canvasjs.react";
import { doApiGet, apiUrl } from "../../services/apiService";

function GraphBlocked(props) {

    let [arApiData, setAr] = useState([])

    useEffect(() => {
        let urlBlocked = apiUrl + "/blockeds";
        doApiGet(urlBlocked)
            .then(data => {
                setAr(data)
            })
    }, [])


    let CanvasJS = CanvasjsReact.CanvasJS;
    let CanvasJSChart = CanvasjsReact.CanvasJSChart;
    let avg;

    let allUsers = props.users_ar.filter(item => item.block_status === false);

    if (allUsers.length === 0) {
        avg = 0;
    }
    else if (arApiData.length === 0) {
        avg = 100
    }
    else {
        avg = Math.round((((allUsers.length) / (allUsers.length + arApiData.length)) * 100));
    }
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        width: 400,
        height: 400,
        backgroundColor: "#f3f5f9",
        toolbar: {
            backgroundColor: "#f3f5f9",
        },
        title: {
            text: "Users / Blockeds",
            fontSize: 20
        },
        subtitles: [{
            text: avg + "% Positive",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            dataPoints: [
                { name: "Users", y: allUsers.length },
                { name: "Blockeds", y: arApiData.length },

            ]
        }]
    }

    return (
        <CanvasJSChart options={options} />
    )
}

export default GraphBlocked