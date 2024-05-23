import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/zooHomePage/HomePage';
import AnimalPage from './components/zooAnimalPage/AnimalPage';
import AnimalsDetail from './components/zooAnimalsDetail/AnimalsDetail';
import TicketsPage from './components/zooTicketPage/TicketsPage';
import LogInPage from './components/zooLogInPage/LogInPage';
import RegisterPage from './components/zooLogInPage/RegisterPage';
import ZooAccountPage from './components/zooLogInPage/ZooAccountPage';
import TicketsType from './components/zooTicketPage/TicketsType';
import TicketsDiscount from './components/zooTicketPage/TicketsDiscount';
import TicketsCheckList from './components/zooTicketPage/TicketsCheckList';
import TicketsFinish from './components/zooTicketPage/TicketsFinish';
import Admin from './components/zooAdminPage/Admin';
import ZooNews from './components/zooNewsPage/ZooNews';
import ZooNewsPage from './components/zooNewsPage/ZooNewsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/animals" element={<AnimalPage />} />
        <Route path="/animals/:id" element={<AnimalsDetail />} />
        <Route path="/tickets" element={<TicketsPage/>} />
        <Route path="/tickets/type/:date" element={<TicketsType/>} />
        <Route path="/tickets/type/discount" element={<TicketsDiscount/>} />
        <Route path="/tickets/type/discount/checkList" element={<TicketsCheckList/>} />
        <Route path="/tickets/type/discount/checkList/finish" element={<TicketsFinish/>} />
        <Route path="/news" element={<ZooNews/>}/>
        <Route path="/news/list" element={<ZooNewsPage/>}/>
        <Route path="/logins" element={<LogInPage/>} />
        <Route path="/logins/register" element={<RegisterPage/>} />
        <Route path="/account" element={<ZooAccountPage/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
