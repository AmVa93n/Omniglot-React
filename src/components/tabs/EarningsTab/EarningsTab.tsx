import { useContext } from "react";
import { AccountContext } from "../../../context/account.context";
import "./EarningsTab.css";

function EarningsTab() {
    const { profile, transactions } = useContext(AccountContext)

    return (
        <div className="earnings-tab">
            <div className="stripe">
                <span>Stripe account ID: <span className="stripe-id">{profile.stripeAccountId}</span></span>
            </div>
            <div className="earnings-table-container">
                <table className="earnings-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Offer</th>
                            <th>Student</th>
                            <th>Amount</th>
                            <th>Class</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.time}</td>
                            <td>{transaction.offer.name}</td>
                            <td>{transaction.student.username}</td>
                            <td>{transaction.amount} $</td>
                            <td>{transaction.class}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EarningsTab;