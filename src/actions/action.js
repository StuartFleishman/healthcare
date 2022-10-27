import axios from 'axios';

function addCoach(coach) {
  return {type: "ADD_COACH", coach}
}

function addUser(user) {
  return {type: "ADD_USER", user}
}

function addBooking(booking) {
  return {type: "ADD_BOOKING", booking}
}

function deleteBooking(id) {
  return {type:"DELETE_BOOKING", id}
}

function updateBooking(id) {
  return {type:"UPDATE_BOOKING", id}
}

export function userRegisterAction(data) {
  
    return dispatch => {
        let newUser = { 
            "name":data.userName,
            "password": data.userPassword,
            "gender":data.userGender,
            "dateOfBirth":data.userDOB,
            "email": data.userEmail,
            "mobileNumber": data.userPhoneNum,
            "pinCode": data.userZip,
            "city": data.userCity,
            "state": data.userState,
            "country": data.userCountry
        }
        
        axios(`http://localhost:8080/users`, {
            method: 'POST',
            crossdomain: true,
            data: newUser,
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(dispatch(addUser(newUser)))
        .catch(err => console.log(err));
    }
}

export function coachRegisterAction(data) {
    return dispatch => {
        let newCoach = {
            "name": data.coachName,
            "password": data.coachPassword,
            "gender": data.coachGender,
            "dateOfBirth": data.coachDOB,
            "mobileNumber": data.coachPhoneNum,
            "speciality": data.coachSpec
        }
        console.log("coachRegisterAction newCoach: ",newCoach);
        axios(`http://localhost:8080/coaches`, {
            method: 'POST',
            crossdomain: true,
            data: newCoach,
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(dispatch(addCoach(newCoach)))
        .catch(err => console.log(err));
    }
}

export function getNewCoachId(data) {
    return dispatch => {
        axios.get('http://localhost:8080/coaches')
        .then((response) => {
            let value = response.data;
            let result = value.find(val =>  val.name === data.name &&
                                            val.password === data.password)
            if(result)
                dispatch(loginMe(true,false,result.name,result.id,true,result.gender));
            else
                dispatch(loginMe(false,true));
        })
    }
}

export function getNewUserId(data) {
    return dispatch => {
        axios.get('http://localhost:8080/users')
        .then((response) => {
            let value = response.data;
            let result = value.find(val =>  val.name === data.name &&
                                            val.password === data.password)
            if(result)
                dispatch(loginMe(true,false,result.name,result.id,false,result.gender));
            else
                dispatch(loginMe(false,true));
        })
    }
}



export function userLoginAction(data) {
  return dispatch => {
      axios.get('http://localhost:8080/users')
      .then((response) => {
          let value = response.data
          let result = value.find(val => val.id  === parseInt(data.userId) && val.password === data.userPassword)
          if(result) {
              axios.get('http://localhost:8080/bookings')
              .then((response) => {
                  let allBookings = response.data;
                  let myBookings = allBookings.filter(val => val.userId === parseInt(data.userId))
                  dispatch(loginMe(true,false,result.name,result.id,false,result.gender,myBookings,result.mobileNumber,result.speciality,result.dateOfBirth))
              })
              
          }
          else
              dispatch(loginMe(false,true));
      })
  }
}

export function coachLoginAction(data) {
    return dispatch => {
        axios.get('http://localhost:8080/coaches')
        .then((response) => {
            let value = response.data
            let result = value.find(val => val.id  === parseInt(data.coachId) && val.password === data.coachPassword)
            if(result) {
                axios.get('http://localhost:8080/bookings')
                .then((response) => {
                    let allBookings = response.data;
                    let myBookings = allBookings.filter(val => val.coachId === parseInt(data.coachId))
                    dispatch(loginMe(true,false,result.name,result.id,true,result.gender,myBookings,result.mobileNumber,result.speciality,result.dateOfBirth))
                })
                
            }
            else
                dispatch(loginMe(false,true));
        })
    }
}

export const postAppointment = (appointmentDate,coachId,userId,slotTime) => {
  return dispatch => {
      let newAppointment = {
        "appointmentDate": appointmentDate,
        "coachId": coachId,
        "userId": userId,
        "slot": slotTime
      }
      console.log(newAppointment);
      axios('http://localhost:8080/bookings', {
        method: 'POST',
        crossdomain: true,
        data: newAppointment,
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(dispatch(addBooking(newAppointment)))
      .catch(err => console.log(err));
    }
}

export const editAppointment = (bookingId, appointmentDate, coachId, userId, slotTime) => {
  return dispatch => {
    axios('http://localhost:8080/bookings/' + bookingId, {
      method: 'PUT',
      crossdomain: true,
      data: {
              "appointmentDate": appointmentDate,
              "slot": slotTime,
              "coachId": coachId,
              "userId": userId
            }, 
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(dispatch(updateBooking(bookingId)))
    .catch(err => console.log(err));
  }
}

export const cancelAppointment = (id) => {
   return dispatch => { 
  
  axios.delete('http://localhost:8080/bookings/' + id)
  .then(() => {
    dispatch(deleteBooking(id))
  })
  .catch(err => console.log(err));
}
}

export function loginMe(isAuthenticated,loginFailed,username,id,isCoach,gender,myBookings,mobileNumber,speciality,dateOfBirth,city,state,country,pinCode,email) {
    return {
        type: 'LOGIN',
        isAuthenticated: isAuthenticated,
        loginFailed: loginFailed,
        username: username,
        id: id,
        isCoach: isCoach,
        gender: gender,
        myBookings: myBookings,
        mobileNumber: mobileNumber,
        speciality: speciality,
        dateOfBirth: dateOfBirth,
        city: city,
        state: state,
        country: country,
        pinCode: pinCode,
        email: email
    }
}

export function logout() {
    return dispatch=> {
        dispatch(logoutMe());
    }
}

export function logoutMe() {
    return {
        type: 'LOGOUT'
    }
}