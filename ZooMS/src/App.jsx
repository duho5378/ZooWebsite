
import './App.css'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Employee from './components/Employee'
import Department from './components/Department'
import Profile from './components/Profile'
import AddDepartment from './components/AddDepartment'
import AddEmployee from './components/AddEmployee'
import EditEmployee from './components/EditEmployee'
import Entrance from './components/Entrance'
import EmployeeLogin from './components/EmployeeLogin'
import EmployeeDashboard from './components/EmployeeDashboard'
import PrivateRoute from './components/PrivateRoute'
import AssignWork from './components/AssignWork'
import AddAssignWork from './components/AddAssignWork'
import EditAssignWork from './components/EditAssignWork'
import Site from './components/Site'
import Infrastructure from './components/Infrastructure'
import AddInfrastructure from './components/AddInfrastructure'
import EditInfrastructure from './components/EditInfrastructure'
import Animal from './components/Animal'
import AddAnimal from './components/AddAnimal'
import EditAnimal from './components/EditAnimal'
import AddSpecies from './components/AddSpecies'
import Zoo from './components/Zoo'
import AddZoo from './components/AddZoo'
import Food from './components/Food'
import AddFood from './components/AddFood'
import EditFood from './components/EditFood'
import BuyFood from './components/BuyFood'
import AddBuyFood from './components/AddBuyFood'
import EditBuyFood from './components/EditBuyFood'
import MedicalHistory from './components/MedicalHistory'
import AddMedicalHistory from './components/AddMedicalHistory'
import EditMedicalHistory from './components/EditMedicalHistory'
import Species from './components/Species'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/entrance' element={<Entrance />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/employee_login' element={<EmployeeLogin />}></Route>
      <Route path='/employee_dashboard/:id' element={<EmployeeDashboard />}></Route>
      <Route path='/edit_employee/:id' element={<EditEmployee />}></Route>

      <Route path='/department' element={<Department />}></Route>
      <Route path='/add_department' element={<AddDepartment />}></Route>
      <Route path='/add_employee' element={<AddEmployee />}></Route>
      <Route path='/edit_employee/:id' element={<EditEmployee />}></Route>

      <Route path='/assign_work/' element={<AssignWork />}></Route>
      <Route path='/add_assign_work/' element={<AddAssignWork />}></Route>
      <Route path='/edit_assign_work/:id' element={<EditAssignWork />}></Route>

      <Route path='/site' element={<Site />}></Route>
      <Route path='/infrastructure' element={<Infrastructure />}></Route>
      <Route path='/add_infrastructure/' element={<AddInfrastructure />}></Route>
      <Route path='/edit_infrastructure/:id' element={<EditInfrastructure />}></Route>

      <Route path='/animal' element={<Animal />}></Route>
      <Route path='/add_animal/' element={<AddAnimal />}></Route>
      <Route path='/edit_animal/:id' element={<EditAnimal />}></Route>

      <Route path='/species' element={<Species />}></Route>
      <Route path='/add_species/' element={<AddSpecies />}></Route>

      <Route path='/zoo' element={<Zoo />}></Route>
      <Route path='/add_zoo' element={<AddZoo />}></Route>

      <Route path='/food' element={<Food />}></Route>
      <Route path='/add_food' element={<AddFood />}></Route>
      <Route path='/edit_food/:id' element={<EditFood />}></Route>

      <Route path='/buy_food' element={<BuyFood />}></Route>
      <Route path='/add_buy_food' element={<AddBuyFood />}></Route>
      <Route path='/edit_buy_food/:id' element={<EditBuyFood />}></Route>

      <Route path='/medical_history' element={<MedicalHistory />}></Route>
      <Route path='/add_medical_history' element={<AddMedicalHistory />}></Route>
      <Route path='/edit_medical_history/:id' element={<EditMedicalHistory />}></Route>

      <Route path='/dashboard' element={
        <PrivateRoute >
          <Dashboard />
        </PrivateRoute>
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/department' element={<Department />}></Route>
        <Route path='/dashboard/profile' element={<Profile />}></Route>
        <Route path='/dashboard/add_department' element={<AddDepartment />}></Route>

        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>

        <Route path='/dashboard/assign_work/' element={<AssignWork />}></Route>
        <Route path='/dashboard/add_assign_work/' element={<AddAssignWork />}></Route>
        <Route path='/dashboard/edit_assign_work/:id' element={<EditAssignWork />}></Route>

        <Route path='/dashboard/site' element={<Site />}></Route>
        <Route path='/dashboard/infrastructure' element={<Infrastructure />}></Route>
        <Route path='/dashboard/add_infrastructure/' element={<AddInfrastructure />}></Route>
        <Route path='/dashboard/edit_infrastructure/:id' element={<EditInfrastructure />}></Route>

        <Route path='/dashboard/animal' element={<Animal />}></Route>
        <Route path='/dashboard/add_animal/' element={<AddAnimal />}></Route>
        <Route path='/dashboard/edit_animal/:id' element={<EditAnimal />}></Route>

        <Route path='/dashboard/species' element={<Species />}></Route>
        <Route path='/dashboard/add_species/' element={<AddSpecies />}></Route>

        <Route path='/dashboard/zoo' element={<Zoo />}></Route>
        <Route path='/dashboard/add_zoo' element={<AddZoo />}></Route>


        <Route path='/dashboard/food' element={<Food />}></Route>
        <Route path='/dashboard/add_food' element={<AddFood />}></Route>
        <Route path='/dashboard/edit_food/:id' element={<EditFood />}></Route>

        <Route path='/dashboard/buy_food' element={<BuyFood />}></Route>
        <Route path='/dashboard/add_buy_food' element={<AddBuyFood />}></Route>
        <Route path='/dashboard/edit_buy_food/:id' element={<EditBuyFood />}></Route>

        <Route path='/dashboard/medical_history' element={<MedicalHistory />}></Route>
        <Route path='/dashboard/add_medical_history' element={<AddMedicalHistory />}></Route>
        <Route path='/dashboard/edit_medical_history/:id' element={<EditMedicalHistory />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
export default App
