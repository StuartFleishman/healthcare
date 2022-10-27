import React from 'react';
import styles from './UserHome.module.css';
import Navigation from '../Navigation/Navigation';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Form,Button,Image,Row,Col } from 'react-bootstrap';
import { postAppointment } from '../../actions/action';
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom'
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const UserHome = () => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  
  const [isLoading,setLoading] = useState(true);
  const [coaches,setCoaches] = useState([]);
  const [user,setUser] = useState([]);
  const [coachId,setCoachId] = useState(0);
  const [coachChosen,setCoachChosen] = useState(false);
  const [appDate,setAppDate] = useState("");
  const [appTime,setAppTime] = useState("");
  const [appointmentSet,setAppointmentSet] = useState(false);
  const [appDateMsg, setDateMsg] = useState("")
  const [selected, setSelected] = useState(true)
  
  

  useEffect(() => {
    axios.get('http://localhost:8080/coaches')
    .then((response) => {
      setCoaches(response.data);
      setLoading(false);
    })
    axios.get(`http://localhost:8080/users/${state.login.id}`)
    .then((response) => {
      setUser(response.data);
    })
  },[]);

  useEffect(() => {
    checkBothSelected()
  },[appDate,appTime])

  const checkBothSelected = () => {
    if(appDate && appTime !== "") {
      setSelected(false)
    }
  }
  
  const getAppointment = (id) => {
    setCoachChosen(true);
    setCoachId(id);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!validateAppointment()) {
      dispatch(postAppointment(appDate,coachId,state.login.id,appTime))
      setAppointmentSet(true)
    }
  }

  const validateAppointment = () => {
    let flag = false
    const date = new Date();
    const sevenDays = date.setDate(date.getDate() + 7);
    const timeStamp = new Date().getTime();
    const yesterdayTime = timeStamp - 24*60*60*1000;
    
    const appointmentDate = new Date(appDate)
    if(appointmentDate > sevenDays || appointmentDate < yesterdayTime) {
      setDateMsg("Appointment Date should up any upcoming 7 days")
      flag = true
    } else {
      setDateMsg("")
      flag = false
    }

    if(appTime == "") {
      setAppTime("Required")
      flag = true
    } else {
      setAppTime("")
      flag = false
    }

    return flag
     
  }


  const resetPage = () => {
    setAppointmentSet(false);
    setCoachChosen(false);
  } 

  if(isLoading) {
    return <div className = "container">Loading....</div>
  }

  if(appointmentSet) {
    return( 
      <>
      <Navigation/>
      <div className = "container bg-dark mt-5  pt-1 text-white"
        style = {{"width": "30%", "text-align": "center", "borderRadius": "3%"}}>
        <h5 className = "mt-5">Your appointment is scheduled successfully!</h5>
        <Button variant="info" className = "my-3"
          onClick = {resetPage}
          style = {{"width": "50%"}} className = "mt-5 mb-3 text-white">
        <BsFillArrowLeftSquareFill style={{"margin":"10%"}}></BsFillArrowLeftSquareFill>
            Go Back
        </Button>
       
      </div>
    </>
    )
  }

  if(coachChosen) {
    return (
      <>
        <Navigation/>
        <div className = "container bg-dark text-white mt-5 p-3"
          style = {{"width": "40%", "borderRadius": "2.5%"}}>
            <Image src = "assets\Images\Notepad_icon.svg.png"
              style = {{"maxWidth": "7.5%"}}
              className = "ms-5 mt-0"/>
          <h2 style = {{"display": "inline"}}
            className = "ms-5 mt-5">Proceed with your Appointment</h2>  
          <Form className = "mt-3" onSubmit = {handleSubmit}>
            <Form.Group onChange = {event => setAppDate(event.target.value)}>
              <Form.Label>Date of Appointment</Form.Label>
              <Form.Control
                name = "appointmentDate"
                required
                type = "date"
                id = "appointmentDate"
              />
            </Form.Group>
            <Form.Group className = "mt-3" onChange = {event => setAppTime(event.target.value)}>
              <Form.Label>Preferred time slot</Form.Label><br/>
              <Form.Check
                required
                inline
                type = "radio"
                label = "9 AM to 10 AM"
                value = "9 AM to 10 AM"
              />
              <Form.Check
                required
                inline
                type = "radio"
                label = "10 AM to 11 AM"
                value = "9 AM to 10 AM"
              />
              <Form.Check
                required
                inline
                type = "radio"
                label = "11 AM to 12 PM"
                value = "9 AM to 10 AM"
              />
              <Form.Check
                required
                inline
                type = "radio"
                label = "2 PM to 3 PM"
                value = "9 AM to 10 AM"
              />
              <Form.Check
                required
                inline
                type = "radio"
                label = "3 PM to 4 PM"
                value = "9 AM to 10 AM"
              />
              <Form.Check
                required
                inline
                type = "radio"
                label = "4 PM to 5 PM"
                value = "9 AM to 10 AM"
              />
            </Form.Group>
            <Button disabled={selected} className = "mt-3 mb-5" variant = "success" type = "submit">Confirm your Appointment</Button>
            <p class="text-danger">{appDateMsg}</p>
          </Form>  
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation/>
      <div className = "d-flex justify-content-center m-auto flex-wrap"
            style = {{"width": "80%"}}>
        {coaches.map((coach) => {
          return (
            <div className = "flex-fill p-3 mx-4 my-4 bg-light"
              style = {{"width": "30.75%", "maxWidth": "30.75%", "borderRadius": "3%"}}>
                <Row>
                  <Col>
                    {coach.gender === "M" ? 
                      <Image className = "my-3 ms-3" roundedCircle src = "assets\Images\male.png"/> :
                      <Image className = "my-3 ms-3" roundedCircle src = "assets/Images/female.png"/> 
                    }
                  </Col>
                  <Col className = "me-5">
                    <h2>{coach.name}</h2>
                    <h3>Coach Id: {coach.id}</h3>
                    <p>Mobile Number: {coach.mobileNumber}</p>
                    <p>Speciality: {coach.speciality}</p>
                    <Button onClick={ () => getAppointment(coach.id)}>Book an Appointment</Button>
                  </Col>
                </Row>
            </div>
          )
        })}
      </div>
      
    </>
  );
  
}

export default UserHome;