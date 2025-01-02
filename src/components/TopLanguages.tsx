import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import appService from '../services/app.service';
import Language from './Language';

function TopLanguages() {
    const [stats, setStats] = useState({
        teach: [] as statListItem[],
        learn: [] as statListItem[],
    })

    interface statListItem {
        name: string
        amount: number
    }

    useEffect(()=> {
        async function fetchStats() {
            try {
                const data = await appService.getLanguageStats()
                setStats(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchStats()
    }, [])

    return (
        <div id="statistics" className="row g-0 py-3">
            <h2 className="center px-0">Most popular languages</h2>
            
            <div className="col-auto mx-auto">
                <h4 className="mx-auto" style={{width: 'fit-content'}}>Teaching</h4>
                <ul className="list-group">
                    {stats.teach.map(lang => (
                        <Link key={lang.name} to={'/users/teachers/' + lang.name} className="text-decoration-none">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <Language code={lang.name} />
                                <span className="badge bg-primary rounded-pill ms-5">{lang.amount} Users</span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            
            <div className="col-auto mx-auto">
                <h4 className="mx-auto" style={{width: 'fit-content'}}>Learning</h4>
                <ul className="list-group">
                    {stats.learn.map(lang => (
                        <Link key={lang.name} to={'/users/learners/' + lang.name} className="text-decoration-none">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <Language code={lang.name} />
                                <span className="badge bg-primary rounded-pill ms-5">{lang.amount} Users</span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TopLanguages;