import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import polygon from "../apis/polygon"
import { StockChart } from "../components/StockChart"
import { useGlobalContext } from "../context"
import { StockData } from "../components/StockData"

export const StockDetailPage = () => {

    
    const [chartData, setChartData] = useState()
    const { symbol } = useParams()

    const formatData = (data) => {
        const resp = data.map((item) => {
            return ({
                x: item.t,
                y: item.c
            })
        })
        return resp
    }
    useEffect(() => {
        let today = new Date();
        let oneYear = new Date();
        oneYear.setDate(today.getDate() - 100);
        oneYear = oneYear.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');

        let oneWeek = new Date();
        oneWeek.setDate(today.getDate() - 7);
        oneWeek = oneWeek.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');

        today = today.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
        const fetchData = async () => {
            try {
                let responses = await Promise.all([polygon.get(`${symbol}/range/1/day/${oneYear}/${today}`),
                polygon.get(`${symbol}/range/1/day/${oneWeek}/${today}`)
                ])
                setChartData(
                    {
                        week: formatData(responses[1].data.results),
                        year: formatData(responses[0].data.results)
                    }
                )
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [symbol])
    return (
        <div>
            {chartData && (
            <div>
                <StockChart chartData = {chartData} symbol = {symbol}/>
            </div>)}
            <StockData symbol = {symbol}/>
        </div>
    )
}