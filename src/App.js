import React,{useRef,useState,useEffect,Fragment} from 'react';
import datacsv from './data.csv'
import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  format
} from 'd3';

import './App.css';

const App = ()=>
{

 const svgRef = useRef(null);
 const [data,setData]=useState(0)

    const [width,setWidth] = useState()
    const [height,setHeight] = useState()

    const svg = select(svgRef.current)
         const render =(data)=>{
            const xValue = d=> d.population
            const yValue=d=>d.country
             const margin={top:20,right:20,bottom:20,left:100}
             const innerWidth = width-margin.left-margin.right
             const innerHeight = height-margin.top-margin.bottom
            const xScale = scaleLinear()
                .domain([0,max(data,d=>d.population)])
                .range([0,innerWidth]);

            const yScale=scaleBand()
                .domain(data.map(d=>d.country))
                .range([0,innerHeight])
                .padding(0.1)

            const g = svg.append('g')
                .attr('transform',`translate(${margin.left},${margin.top})`)
             const xAxisTickFormat =number=>
                 format('.3s')(number)
                     .replace('G','B');
            const xAxis = axisBottom(xScale)
                .tickFormat(xAxisTickFormat)
                      g.append('g').call(xAxis)
                .attr('transform',`translate(0,${innerHeight})`)
             g.append('g').call(axisLeft(yScale));

            g.selectAll('rect').data(data)
                .enter().append('rect')
                .attr('y',d=>yScale(yValue(d)))
                .attr('width',d=>xScale(xValue(d)))
                .attr('height',yScale.bandwidth());
 }

 const loadCsv=(datacsv)=>
 {
      csv(datacsv).then((data)=>{
            data.forEach(d=>{
                d.population = +d.population*1000
                    })
            render(data)

                                })
 }
         useEffect(()=>{
           setHeight(svgRef.current.height.baseVal.value)
           setWidth(svgRef.current.width.baseVal.value)
    },[])


console.log(data)
          return (
   <>
        <svg ref={svgRef} height={'500'} width={'980'}></svg>
       {loadCsv(datacsv)}


     
    </>

)

}


export default App;
 
