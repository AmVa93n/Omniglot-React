import { useContext } from "react";
import { AccountContext } from "../../context/account.context";

function EarningsTab() {
    const { profile, transactions } = useContext(AccountContext)

    return (
        <div className="earnings-tab">
            <div className="stripe">
                <span>Stripe account ID: <span className="stripe-id">{profile.stripeAccountId}</span></span>
            </div>
            <div className="earnings-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Transaction Date and Time</th>
                            <th>Amount</th>
                            <th>Balance</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map(transaction => (
                        <tr>
                            <td>{transaction.date}</td>
                            <td>+ {transaction.amount} {transaction.currency}</td>
                            <td>{transaction.balance} {transaction.currency}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EarningsTab;