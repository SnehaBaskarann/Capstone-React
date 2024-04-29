// import './styles/style.css'
import logo from './images/Relevantz.png'
export default function Navbar() {
    return (
        <nav class="navbar navbar-expand-sm ">
            <div class="container-fluid">
                <a class="navbar-brand" href="#"><img src={logo} className='w-50' /></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#"><i class="bi bi-search text-light"></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#"><i class="bi bi-plus-lg text-light"></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#"><i class="bi bi-bell text-light"></i></a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link" href="#"><i class="bi bi-person-circle text-light"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
