import { useEffect, useState } from "react";
import { User } from '../types'
import { useParams } from "react-router-dom";
import appService from "../services/app.service";
import UserCard from "../components/UserCard";

function UsersPage() {
    const [users, setUsers] = useState([] as User[])
    const { matchType, userType, langId } = useParams()

    useEffect(() => {
        async function fetchUsers() {
            let data
            try {
              if (matchType) {
                data = await appService.getMatches(matchType);
              } 
              if (userType && langId) {
                if (userType === 'learners') {
                    data = await appService.getLearners(langId);
                } else {
                    data = await appService.getTeachers(langId);
                }
              }
              setUsers(data)
            } catch (error) {
              console.error('Error fetching data in component:', error);
            }
        }

        fetchUsers()
    }, [matchType, userType, langId])

    return (
        <>
            <h4 className="center my-3">{users.length} matches found</h4>
            <div className="d-flex flex-wrap mx-auto gap-3" style={{width: '92%'}}>
                {users.map(user => (
                    <UserCard key={user._id} user={user} matchType={matchType || ''} />
                ))}
            </div>
        </>
    )
}

export default UsersPage