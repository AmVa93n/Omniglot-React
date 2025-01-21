import useAuth from "../../../hooks/useAuth";
import useDate from "../../../hooks/useDate";
import useFormat from "../../../hooks/useFormat";
import { Class } from "../../../types";
import './PendingRequest.css';

interface Props {
    cls: Class
    onAccept: () => void
    onDecline: () => void
    onWithdraw: () => void
    page: 'classes' | 'calendar'
}

function PendingRequest({ cls, onAccept, onDecline, onWithdraw, page }: Props) {
    const { user } = useAuth()
    const { formatDate } = useFormat();
    const { getEndTime } = useDate();

    return (
        <div className="pending-request" style={{flexDirection: page === 'calendar' ? 'column' : 'row'}}>
            <div className="pending-request-body">
                <h4>Pending Reschedule Request</h4>
                <div className="comparison">
                    <div className="pending-request-date-time old">
                        <span className='date'>{formatDate(cls.date)}</span>
                        <span className='time'>{cls.timeslot} - {getEndTime(cls.timeslot, cls.duration)}</span>
                    </div>
                    <span className="arrow">→</span>
                    <div className="pending-request-date-time">
                        <span className='date'>{formatDate(cls.reschedule.new_date)}</span>
                        <span className='time'>{cls.reschedule.new_timeslot} - {getEndTime(cls.reschedule.new_timeslot, cls.duration)}</span>
                    </div>
                </div>
            </div>
            
            <div className="pending-request-buttons" style={{flexDirection: page === 'classes' ? 'column' : 'row'}}>
            {cls.reschedule.initiator === user?._id && 
                <button className="withdraw-button" onClick={onWithdraw}>
                    <i className="bi bi-x-circle-fill"></i>Withdraw
                </button>
            }
            {cls.reschedule.initiator !== user?._id && <>
                <button className="accept-button" onClick={onAccept}>
                    <i className="bi bi-check-circle-fill"></i>Accept
                </button>
                <button className="decline-button" onClick={onDecline}>
                    <i className="bi bi-x-circle-fill"></i>Decline
                </button>
            </>}
            </div>
        </div>         
    );
}

export default PendingRequest;