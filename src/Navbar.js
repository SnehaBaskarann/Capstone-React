// // import './styles/style.css'
// import logo from './images/Relevantz.png'
// export default function NavbarTop() {
//     return (
//         <nav class="NavbarTop NavbarTop-expand-sm ">
//             <div class="container-fluid">
//                 <a class="NavbarTop-brand" href="#"><img src={logo} className='w-50' /></a>
//                 <button class="NavbarTop-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbarTop">
//                     <span class="NavbarTop-toggler-icon"></span>
//                 </button>
//                 <div class="collapse NavbarTop-collapse justify-content-end" id="collapsibleNavbarTop">
//                     <ul class="NavbarTop-nav">
//                         <li class="nav-item">
//                             <a class="nav-link" href="#"><i class="bi bi-search text-light"></i></a>
//                         </li>
//                         <li class="nav-item">
//                             <a class="nav-link" href="#"><i class="bi bi-plus-lg text-light"></i></a>
//                         </li>
//                         <li class="nav-item">
//                             <a class="nav-link" href="#"><i class="bi bi-bell text-light"></i></a>
//                         </li>
//                         <li class="nav-item dropdown">
//                             <a class="nav-link" href="#"><i class="bi bi-person-circle text-light"></i></a>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     )
// }

// import React, { useState } from 'react'
// import Relevantz from './images/Relevantz.png'
// import { FaBars, FaBookOpenReader } from "react-icons/fa6";
// import { FaSearch, FaUserGraduate, FaHome, FaChartBar } from "react-icons/fa";
// import {BootstrapNavbar } from 'react-bootstrap';
// import './Navbar.css'

// export default function Navbar(){
// const [showReportDropdown, setShowReportDropdown] = useState(false);
//   const handlePageChange = (page) => {
//     setActivePage(page);
//     if (!showSideNav) {
//       setShowSideNav(true);
//     }
//     if (page === 'reports') {
//       setShowReportDropdown(!showReportDropdown);
//     }
//     if (showReportDropdown) setShowReportDropdown(!showReportDropdown);
//   };
//   const handleChange = e => {
//     setSearchTerm(e.target.value);
//   };
//   const toggleSideNav = () => {
//     setShowSideNav(!showSideNav);
//   }; 

// return(
//     <div className="dashboard">
//     <div className='top-nav'>
//       <button className="menu-btn" onClick={toggleSideNav}>
//         <FaBars />
//       </button>
//       <div className='nav-img'>
//         <Image src={Relevantz} fluid />
//       </div>

//       <div className="user-info">
//         <FaSearch className='search-icon' />
//         <input
//           onChange={handleChange}
//           type="search"
//           placeholder="Search..."
//           value={searchTerm}
//           className='search-box'
//         />

//       </div>

//     </div>
//     <div className={`side-nav ${showSideNav ? 'open' : ''}`}>
//       <ul>
//         <li className={activePage === 'home' ? 'active' : ''} onClick={() => handlePageChange('home')}>
//           <FaHome className='icon' /> {/* Icon for Home */}
//           {showSideNav && <span>Home</span>}
//         </li>
//         <li className={activePage === 'course' ? 'active' : ''} onClick={() => handlePageChange('course')}>
//           <FaBookOpenReader className='icon' /> {/* Icon for Submit Request */}
//           {showSideNav && <span>Course</span>}
//         </li>
//         <li
//           className={activePage === 'learner' ? 'active' : ''}
//           onClick={() => handlePageChange('learner')}
//         >
//           <FaUserGraduate className='icon' /> {/* Icon for Tracking */}
//           {showSideNav && <span>Learner</span>}
//         </li>
//         <li className='reports' onClick={() => handlePageChange('reports')}>
//           <FaChartBar className='icon' />
//           {showSideNav && <span>Reports</span>}


//         </li>
//       </ul>
//       <ul className={`submenu ${showReportDropdown ? 'open' : ''}`}>
//         <li onClick={() => setActivePage('learnerreport')}> Learner Report</li>
//         <li onClick={() => setActivePage('coursereport')}>Course Report</li>
//         <li onClick={() => setActivePage('enroll')}>Enrollment Report</li>
//         <li onClick={() => setActivePage('quiz')}>Quiz Report</li>
//       </ul>
//     </div>
//     </div>
// )}