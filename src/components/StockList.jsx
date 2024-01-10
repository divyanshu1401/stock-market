import { useState, useEffect } from "react"
import finnhub from "../apis/finnhub"
import { BsFillCaretDownFill } from "react-icons/bs"
import { BsFillCaretUpFill } from "react-icons/bs"
import { useGlobalContext } from "../context"
import { useNavigate } from "react-router-dom";

export const StockList = () => {

    let navigate = useNavigate()

    const [stock, setStock] = useState([])
    const { watchList, setWatchList, deleteStock } = useGlobalContext();

    useEffect(() => {
        const fetchData = async () => {

            try {
                const responses = await Promise.all(watchList.map((item) => {
                    return finnhub.get('/quote', {
                        params: {
                            symbol: item
                        }
                    })
                }
                ))
                const data = responses.map((resp) => {
                    return {
                        data: resp.data,
                        symbol: resp.config.params.symbol
                    }
                })
                setStock(data)

            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [watchList])

    const changeColor = (val) => {
        return val > 0 ? "success" : "danger"
    }
    const renderIcon = (val) => {
        return val > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
    }

    const handleStockSelect = (symbol) => {
        navigate(`/detail/${symbol}`)
    }

    return (
        <div>
            <table className="table table-hover mt-5">
                <thead style={{ color: "rgb(79,89,102" }}>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Last</th>
                        <th scope="col">Chg</th>
                        <th scope="col">Chg%</th>
                        <th scope="col">High</th>
                        <th scope="col">Low</th>
                        <th scope="col">Open</th>
                        <th scope="col">Pclose</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.map((stockData) => {
                        return (
                            <tr className="table-row" key={stockData.symbol} onClick={() => handleStockSelect(stockData.symbol)} style={{ cursor: "pointer" }}>
                                <th scope="row">{stockData.symbol}</th>
                                <td>{stockData.data.c}</td>
                                <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d}{renderIcon(stockData.data.d)}</td>
                                <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp}{renderIcon(stockData.data.dp)}</td>
                                <td>{stockData.data.h}</td>
                                <td>{stockData.data.l}</td>
                                <td>{stockData.data.o}</td>
                                <td>{stockData.data.pc}
                                    <button className="btn btn-danger btn-sm ml-3 d-inline-block delete-button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            deleteStock(stockData.symbol)
                                        }}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    )
}