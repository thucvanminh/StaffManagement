import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Notice from '../components/Notice/Notice';
import Calendar from '../components/Calendar/Calendar';
import ActivityFeed from '../components/ActivityFeed/ActivityFeed';
import Meetings from '../components/Meetings/Meetings';

export default function Overview() {
    return (
        <div className="container">
            <Header />
            <Sidebar />
            <div className="content">
                <Notice />
                <Calendar />
                <ActivityFeed />
                <Meetings />
            </div>
        </div>
    );
}