import { useEffect, useState } from "react"
import axios from 'axios'
import { apiBaseUrl } from '../const'

function Home() {
    const [apiReload, setApiReload] = useState(true)
    const [expenses, setExpenses] = useState([])
    const [totalMonthExpense, setTotalMonthExpense] = useState(0)
    const [monthExpenseLimitChange, setMonthExpenseLimitChange] = useState()
    const [limit, setLimit] = useState(0)

    // get from localstorage
    const userId = localStorage.getItem('userId')

    const [newExpense, setNewExpense] = useState(
        {
            category: 'food'
        }
    )

    const handleAddNewExpense = (e) => {
        const name = e.target.name
        const value = e.target.value
        setNewExpense(prevS => (
            {
                ...prevS,
                [name]: value
            }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newExpenseToSave = {
            ...newExpense,
            id: userId
        }
        axios.post(`${apiBaseUrl}/add-expense`, newExpenseToSave)
            .then(resp => {
                setApiReload(true)
                if (expenses.length === 0) {
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const hadleDelete = (id) => {
        axios.delete(`${apiBaseUrl}/delete-expense/${id}`)
            .then(resp => {
                setApiReload(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleMonthlyLimit = () => {
        axios.put(`${apiBaseUrl}/monthly-limt`, { limit: monthExpenseLimitChange, userId })
            .then(resp => {
                setLimit(monthExpenseLimitChange)
            })
            .catch(err => {
                setMonthExpenseLimitChange(0)
                console.log(err)
            })
    }

    useEffect(() => {
        if (apiReload) {
            axios.get(`${apiBaseUrl}/get-all-expenses/${userId}`)
                .then(resp => {
                    setExpenses(resp.data.listOfExpenses)
                    setTotalMonthExpense(resp.data.totalMonthExpense)
                    setLimit(resp.data.monthlylimit)
                    setApiReload(false)
                })
                .catch(err => {
                    console.log(err)
                    setExpenses([])
                    setTotalMonthExpense(0)
                })
        }
    }, [apiReload])
    return (
        <>
            <div className="container">
                <p className="logout-btn" onClick={()=>{localStorage.clear(), location.href='/login'}}>Logout</p>
                <h1>Expense Tracker</h1>
                <form id="expense-form" onSubmit={handleSubmit}>
                    <select name="category" onChange={handleAddNewExpense}>
                        <option value="food">Food</option>
                        <option value="petrol">Petrol</option>
                        <option value="other">Other</option>
                    </select>

                    <input
                        type="number"
                        id="expense-amount"
                        name="amount"
                        onChange={handleAddNewExpense}
                        placeholder="Amount" required />

                    <input
                        type="date"
                        id="expense-date"
                        name="date"
                        onChange={handleAddNewExpense}
                        placeholder="Date" required />

                    <button type="submit">
                        Add Expense
                    </button>
                </form>

                {(totalMonthExpense > limit) && <p className="text-center">Monthly expense exceed!</p>}

                <input type="number" value={monthExpenseLimitChange} placeholder="monthly expense limit" onChange={(e) => setMonthExpenseLimitChange(e.target.value)} />
                <button onClick={handleMonthlyLimit}>Set</button>
                <p></p>
                <span>Monthly Limit: {limit}</span>
                <p></p>
                <div className="expense-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="expense-list">
                            {
                                expenses.length > 0 && expenses?.map(row => {
                                    return (
                                        <tr key={row._id}>
                                            <td>{row.category}</td>
                                            <td>{row.amount}</td>
                                            <td>{row.date.split('T')[0]}</td>
                                            <td style={{ color: 'red', cursor: 'pointer' }} onClick={() => hadleDelete(row._id)}>Delete</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className="total-amount">
                        {expenses.length === 0 && <span id="total-amount">No data available</span>}
                        {expenses.length > 0 && <strong>Current Month Total: <span id="total-amount">{totalMonthExpense}</span></strong>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home