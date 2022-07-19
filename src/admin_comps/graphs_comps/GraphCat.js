import React, { useEffect, useState } from 'react';
import CanvasjsReact from "../js/graphs_js/canvasjs.react";
import { doApiGet, apiUrl } from "../../services/apiService";

function GraphCat() {

    let [arApiData, setAr] = useState([])

    useEffect(() => {
        let urlAds = apiUrl + "/ads";

        doApiGet(urlAds)
            .then(data => {
                let temp_ar = data.map(item => {
                    let obj = {}
                    obj.label = item.category;
                    obj.y = 1;
                    return obj;
                })

                let arr = []; 
                //עושה רשימה של הקטגוריות שיש          
                for (let index = 0; index < temp_ar.length; index++) {                  
                    if (!(arr.includes(temp_ar[index].label))) {
                        arr.push(temp_ar[index].label);      
                    }  
                }
                
                //מכניסה אותם לתוך אובייקט
                 let _ar = arr.map(item => {
                    let obj = {}
                    obj.label = item;
                    obj.y = 0;
                    return obj;
                })
                
                for (let index = 0; index < _ar.length; index++) {
                    for (let j = 0; j < temp_ar.length; j++) {
                        if(_ar[index].label === temp_ar[j].label){                            
                            _ar[index].y++;
                        }
                    }
                }
                

                setAr(_ar)

            })
    }, [])

    let CanvasJS = CanvasjsReact.CanvasJS;
    let CanvasJSChart = CanvasjsReact.CanvasJSChart;



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
        width: 400,
        height: 400,
        backgroundColor:"#f3f5f9",
        toolbar:{
            backgroundColor:"#f3f5f9",
        },
        title: {
            text: "Number of posts by categories",
            fontSize: 20
        },
        axisY: {
            labelFormatter: addSymbols,
            scaleBreaks: {
                autoCalculate: true
            }
        },
        axisX: {
            title: "All Users",
            labelAngle: 0
        },
        data: [{
            type: "pie",
            indexLabel: "{label} - {y}",
            dataPoints: arApiData
        }]
    }

    return (
        <CanvasJSChart options={options} />
    )
}

export default GraphCat