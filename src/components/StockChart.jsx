import { useState } from 'react'
import Chart from 'react-apexcharts'
export const StockChart = ({ chartData, symbol }) => {
    const { week, year } = chartData
    const [timeRange, setTimeRange] = useState(week)


    const determineColor = () => {
        const lastValueOfStock = (timeRange).slice(-1)[0]["y"]
        const firstValueofStock = (timeRange)[0]["y"]
        return (lastValueOfStock - firstValueofStock < 0 ? ["#ed3419"] : ["#26C281"])
    }
    const options = {
        colors: determineColor(),
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px"
            }
        },
        chart: {
            id: "Stock Data",
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type: "datetime"
        }
    }


    let series = [{
        name: symbol,
        data: timeRange
    }]

    const renderButtonSelect = (button) => {
        const classes = "btn m-1 "
        if (button === timeRange){
            return classes + "btn-primary"
        }
        else{
            return classes + "btn-outline-primary"
        }
    }

    return <div className='mt-5 p-4 shadow-sm bg-white'>
        <Chart options={options} series={series} type='area' width="100%" />
        <div>
            <button className={renderButtonSelect(week)} onClick={() => setTimeRange(week)}>
                week
            </button>
            <button className={renderButtonSelect(year)} onClick={() => setTimeRange(year)}>
                year
            </button>
        </div>
    </div>

} 