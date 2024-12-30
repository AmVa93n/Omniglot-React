import { useState, useEffect } from "react";
import accountService from "../services/account.service";
import { transaction } from "../types";

function WalletPage() {
    const [accountId, setAccountId] = useState<string>("");
    const [transactions, setTransactions] = useState<transaction[]>([]);

    useEffect(()=> {
        async function fetchWallet() {
            try {
                const { accountId, transactions } = await accountService.getWallet()
                setAccountId(accountId)
                setTransactions(transactions)
            } catch (error) {
                console.log(error)
            }
        }

        fetchWallet()
    }, [])

    return (
        <>
            <h3 className="center my-3">My Wallet</h3>

            <h6 className="center">Stripe account ID: <span className="fw-normal bg-light rounded px-1">{accountId}</span></h6>
            <div className="content-box" style={{width: '60%'}}>
                <table className="table table-hover table-bordered mb-0 center">
                    <thead className="table-light">
                        <tr>
                            <th className="fw-bold" style={{width: '33%'}}>Transaction Date and Time</th>
                            <th className="fw-bold" style={{width: '33%'}}>Amount</th>
                            <th className="fw-bold" style={{width: '33%'}}>Balance</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map(transaction => (
                        <tr>
                            <td>{transaction.date}</td>
                            <td><span className="bg-success text-white py-1 px-2 rounded-pill">+ {transaction.amount} {transaction.currency}</span></td>
                            <td>{transaction.balance} {transaction.currency}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default WalletPage;