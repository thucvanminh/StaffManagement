/* frontend/src/app/componeents/assets/EmployeePanel.js */

import Link from 'next/link';
import './EmployeePanel.css';

export default function EmployeePanel() {
    return (
        <div className="employee-panel-container">
            <aside className="sidebar">
                <div className="sidebar-logo">TH</div>
                <nav className="sidebar-menu">
                    <ul>
                        <li className="menu-item active">Overview</li>
                        <li className="menu-item">Attendance</li>
                        <li className="menu-item">Business Trip</li>
                        <li className="menu-item">Leave</li>
                        <li className="menu-item">Resign</li>
                        <li className="menu-item">Settings</li>
                        <li className="menu-item">Report</li>
                        <li className="menu-item logout">Logout</li>
                    </ul>
                </nav>
            </aside>
            <main className="main-content">
                <header className="content-header">
                    <h1>Employee Panel</h1>
                    <div className="profile-section">
                        <span>ABC</span>
                        <img
                            src="https://via.placeholder.com/30"
                            alt="Profile"
                            className="profile-avatar"
                        />
                    </div>
                </header>
                <div className="dashboard">
                    <section className="notices">
                        <h2>Notice</h2>
                        <ul className="notices-list">
                            <li>
                                <span>05 Jan</span> Annual Retreat - Announcement concerning the public holidays...{' '}
                                <a href="#">Details</a>
                            </li>
                            <li>
                                <span>05 Jan</span> Annual Retreat - Announcement concerning the public holidays...{' '}
                                <a href="#">Details</a>
                            </li>
                            <li>
                                <span>05 Jan</span> Annual Retreat - Announcement concerning the public holidays...{' '}
                                <a href="#">Details</a>
                            </li>
                        </ul>
                    </section>
                    <section className="calendar">
                        <h2>Personal Calendar</h2>
                        <div className="calendar-widget">
                            <span>December 2024</span>
                            <table className="calendar-table">
                                <thead>
                                    <tr>
                                        <th>Sun</th>
                                        <th>Mon</th>
                                        <th>Tue</th>
                                        <th>Wed</th>
                                        <th>Thu</th>
                                        <th>Fri</th>
                                        <th>Sat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>1</td>
                                        <td>2</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>5</td>
                                        <td>6</td>
                                        <td>7</td>
                                        <td>8</td>
                                        <td>9</td>
                                        <td>10</td>
                                    </tr>
                                    <tr>
                                        <td>11</td>
                                        <td>12</td>
                                        <td>13</td>
                                        <td>14</td>
                                        <td>15</td>
                                        <td>16</td>
                                        <td>17</td>
                                    </tr>
                                    <tr>
                                        <td>18</td>
                                        <td>19</td>
                                        <td>20</td>
                                        <td>21</td>
                                        <td>22</td>
                                        <td>23</td>
                                        <td>24</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}



