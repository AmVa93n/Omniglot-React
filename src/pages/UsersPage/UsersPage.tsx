import { useEffect, useState } from "react";
import { User } from '../../types'
import { useParams } from "react-router-dom";
import appService from "../../services/app.service";
import UserCard from "../../components/UserCard/UserCard";
import './UsersPage.css'

function UsersPage() {
    const [users, setUsers] = useState([] as User[])
    const { matchType, userType, langId } = useParams()
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;

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

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const pages = Math.ceil(users.length / usersPerPage);

    return (
        <div className="users-page">
            <div className="results-indicator">
                <span>Showing results {indexOfFirstUser + 1} - {indexOfLastUser <= users.length ? indexOfLastUser : users.length} of {users.length}</span>
            </div>
            <div className="users-container">
                {currentUsers.map(user => (
                    <UserCard key={user._id} user={user} matchType={matchType || ''} />
                ))}
            </div>

            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                {Array.from({ length: pages }, (_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                ))}
                <button onClick={handleNextPage} disabled={indexOfLastUser >= users.length}>Next</button>
            </div>
        </div>
    )
}

export default UsersPage