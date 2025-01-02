import { useContext } from "react"
import { rescheduleRequest, Class } from "../types"
import { AuthContext } from "../context/auth.context"
import accountService from '../services/account.service'
import { formatDate } from "../utils"
import { ClassContext } from "../context/class.context"

function PendingRequest({ cls, reschedule }: { cls: Class, reschedule: rescheduleRequest}) {
    const { user } = useContext(AuthContext)
    const { setManagedClass } = useContext(ClassContext)

    async function handleAccept() {
        try {
            const updatedClass = await accountService.acceptReschedule(cls._id)
            setManagedClass(prev => {
                if (!prev) return prev; // Narrowing for safety
                const { reschedule, date, timeslot } = updatedClass
                return {...prev, reschedule, date, timeslot}
            })
        } catch (error) {
            alert(error)
        }
    }

    async function handleDecline() {
        try {
            const updatedClass = await accountService.declineReschedule(cls._id)
            setManagedClass(prev => {
                if (!prev) return prev; // Narrowing for safety
                return {...prev, reschedule: updatedClass.reschedule}
            })
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="p-1 bg-warning">
            <p className="m-0">Pending reschedule request</p>
            <h6><span className="date">{formatDate(reschedule.new_date)}</span>, {reschedule.new_timeslot}</h6>
            {reschedule.initiator !== user?._id &&
                <div className="d-flex justify-content-center">
                    <button className="btn btn-sm btn-success mx-1" style={{fontSize: 'smaller'}} onClick={handleAccept}>
                        <i className="bi bi-check-circle-fill me-2"></i>Accept
                    </button>
                    <button className="btn btn-sm btn-danger mx-1" style={{fontSize: 'smaller'}} onClick={handleDecline}>
                        <i className="bi bi-x-circle-fill me-2"></i>Decline
                    </button>
                </div>}
        </div>         
    )
}

export default PendingRequest