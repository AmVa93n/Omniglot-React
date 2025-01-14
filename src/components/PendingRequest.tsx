import { useContext } from "react"
import { rescheduleRequest, Class } from "../types"
import accountService from '../services/account.service'
import { ClassContext } from "../context/class.context"
import useFormat from "../hooks/useFormat"
import useAuth from "../hooks/useAuth"

interface Props {
    cls: Class
    reschedule: rescheduleRequest
}

function PendingRequest({ cls, reschedule }: Props) {
    const { user } = useAuth()
    const { setManagedClass } = useContext(ClassContext)
    const { formatDate } = useFormat()

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
        <div className="pending-request">
            <span>Pending reschedule request</span>
            <span className="date">{formatDate(reschedule.new_date)}</span>, {reschedule.new_timeslot}
            {reschedule.initiator !== user?._id &&
                <div className="pending-request-buttons">
                    <button className="accept-button" onClick={handleAccept}>
                        <i className="bi bi-check-circle-fill"></i>Accept
                    </button>
                    <button className="decline-button" onClick={handleDecline}>
                        <i className="bi bi-x-circle-fill"></i>Decline
                    </button>
                </div>}
        </div>         
    )
}

export default PendingRequest