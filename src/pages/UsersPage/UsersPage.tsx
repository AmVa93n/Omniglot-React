import { useEffect, useState } from "react";
import { searchFilters, User } from '../../types'
import { useLocation } from "react-router-dom";
import appService from "../../services/app.service";
import UserCard from "../../components/reusable/UserCard/UserCard";
import './UsersPage.css'
import SearchFilterPanel from "../../components/SearchFilterPanel/SearchFilterPanel";
import useFormat from "../../hooks/useFormat";
import useAuth from "../../hooks/useAuth";
import accountService from "../../services/account.service";

function UsersPage() {
    const [users, setUsers] = useState([] as User[]);
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;
    const [filters, setFilters] = useState<searchFilters>({ 
        username: '', 
        minAge: '',
        maxAge: '',
        country: '', 
        gender: '', 
        lang_learn: [],
        lang_teach: [],
    });
    const { getUserAge } = useFormat();
    const { user } = useAuth();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const queryParams = new URLSearchParams(location.search);
                const params = {
                    learn: queryParams.get('learn') || '', 
                    teach: queryParams.get('teach') || '',
                    professional: queryParams.get('professional') || '',
                }
                const data = await appService.getUsers(params);
                setUsers(data)
                
                // Set filters based on query params
                setFilters(prevFilters => ({
                    ...prevFilters,
                    learning: params.learn ? [params.learn] : [],
                    teaching: params.teach ? [params.teach] : [],
                }))

                // If user is logged in and no filters are set, set filters based on user data
                if (!params.learn && !params.teach && user) {
                    const userData = await accountService.getProfile();
                    setFilters(prevFilters => ({
                        ...prevFilters,
                        learning: userData?.lang_teach || [],
                        teaching: userData?.lang_learn || [],
                    }))
                }
                    
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUsers()
    }, [location.search, user]);

    function handleFilterChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    const filteredUsers = users.filter(user => 
        user.username.includes(filters.username) &&
        (filters.minAge === '' || getUserAge(user.birthdate) >= parseInt(filters.minAge)) &&
        (filters.maxAge === '' || getUserAge(user.birthdate) <= parseInt(filters.maxAge)) &&
        (!filters.country || user.country === filters.country) &&
        (!filters.gender || user.gender === filters.gender) &&
        (!filters.lang_learn.length || user.lang_learn.some(lang => filters.lang_learn.includes(lang))) &&
        (!filters.lang_teach.length || user.lang_teach.some(lang => filters.lang_teach.includes(lang)))
    );

    function handleNextPage() {
        setCurrentPage(prevPage => prevPage + 1);
    };

    function handlePrevPage() {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const pages = Math.ceil(filteredUsers.length / usersPerPage);
    const firstResult = filteredUsers.length ? indexOfFirstUser + 1 : 0;
    const lastResult = indexOfLastUser <= filteredUsers.length ? indexOfLastUser : filteredUsers.length;

    return (
        <div className="users-page">
            <SearchFilterPanel filters={filters} onFilterChange={handleFilterChange} setFilters={setFilters} />
            <div className="results-indicator">
                <span>Showing results {firstResult} - {lastResult} of {filteredUsers.length}</span>
            </div>
            <div className="users-container">
                {currentUsers.map(user => (
                    <UserCard key={user._id} user={user} />
                ))}
            </div>

            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                {Array.from({ length: pages }, (_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                ))}
                <button onClick={handleNextPage} disabled={indexOfLastUser >= filteredUsers.length}>Next</button>
            </div>
        </div>
    )
}

export default UsersPage