import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function DashboardNav(props) {

    let { token } = props

    const navigate = useNavigate()

    useEffect(() => {
        if (token === null) {
            navigate("/", { replace: true })
        }
    })

    async function handleLogout() {
        localStorage.jwtSession = null 
        window.location.reload()
    }

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
                        onClick={handleLogout}
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