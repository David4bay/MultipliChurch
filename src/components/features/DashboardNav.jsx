import { Link, Navigate } from "react-router-dom";

// function decodeToken(token) {
//     try { return JSON.parse(atob(token.split(".")[1])) } catch { return null }
// }

function DashboardNav(props) {

    let { setToken } = props

    // if (!token) return <Navigate to="/" replace />

    // const decoded = decodeToken(token)

    // if (decoded === null) return <Navigate to="/" replace />

    return (
            <nav className="user__nav">
                <ul className="nav__welcome">
                    <h1 className="nav__title">Welcome!</h1>
                </ul>
                <ul className="nav__links">
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>  
                    <li>
                        <button
                        type="button"
                        onClick={() => setToken(null)}
                        className="nav__logout"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
    )
}

export default DashboardNav;