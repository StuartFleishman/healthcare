import { combineReducers } from "redux";

const coachState = {
  id: 0,
  name: "",
  password: "",
  gender: "",
  dateOfBirth: "",
  mobileNumber: "",
  speciality: ""
}

const bookingState = {
  bookings: [{
    appointmentDate: "",
    slot: "",
    coachId: 0,
    userId: 0,
    id: 0
  }]
}

const userState = {
  id: 0,
  name: "",
  password: "",
  gender: "",
  dateOfBirth: "",
  email: "",
  mobileNumber: "",
  pinCodde: 0,
  city: "",
  state: "",
  country: ""
}

const logInState = {
  id: 0,
  isAuthenticated: false,
  username: "",
  isCoach: false,
  loginFailed: false,
  gender: "",
  myBookings: [],
  mobileNumber: 0,
  speciality: "",
  dateOfBirth: "",
  city: "",
  state: "",
  country: "",
  pinCode: 0,
  email: ""
}

const bookingReducer = (state = bookingState, action) => {
  console.log("bookingId", action.id)
  switch(action.type) {
    case "ADD_BOOKING":
      return {...state,
        bookings: state.bookings.concat(action.payload) 
        // appointmentDate: action.booking.appointmentDate,
        // slot: action.booking.slot,
        // coachId: action.booking.coachId,
        // userId: action.booking.userId,
      }
    case 'UPDATE_BOOKING': {
      const book = state.bookings.map(b => b.id == action.payload)
      return {    
        ...state,    
        bookings: state.bookings.map(    
            (booking) => booking.id === action.payload ? {...booking, appointmentDate: book.appointmentDate ,slot: book.slot}    
                                    : booking)    
    } 
    }
    case 'DELETE_BOOKING': {
      return {    
        ...state,    
        bookings: state.bookings.filter(booking => booking.id !== action.payload)    
    };  
    }
    
    default:
      return state;

  }
}

const userReducer = (state = userState, action) => {
  switch(action.type) {
    case "ADD_USER":
      return {...state, 
        name: action.user.name,
        password: action.user.password,
        gender: action.user.gender,
        dateOfBirth: action.user.dateOfBirth,
        email: action.user.email,
        mobileNumber: action.user.mobileNumber,
        pinCodde: action.user.pinCodde,
        city: action.user.city,
        state: action.user.state,
        country: action.user.country
      }
    
    default:
      return state;

  }
}

const coachReducer = (state = coachState, action) => {
    switch(action.type) {
      case "ADD_COACH":
        console.log("incoach", action.coach.name)
        return {...state, 
          name: action.coach.name,
          password: action.coach.password,
          gender: action.coach.gender,
          dateOfBirth: action.coach.dateOfBirth,
          mobileNumber: action.coach.mobileNumber,
          speciality: action.coach.speciality
        }
      
      default:
        return state;

    }
}

const loginReducer = (state = logInState, action) => {
  switch(action.type) {
      
      case 'LOGIN':
          return {
              ...state,
              isAuthenticated: action.isAuthenticated,
              loginFailed: action.loginFailed,
              username: action.username,
              id: action.id,
              isCoach: action.isCoach,
              gender: action.gender,
              myBookings: action.myBookings,
              mobileNumber: action.mobileNumber,
              speciality: action.speciality,
              dateOfBirth: action.dateOfBirth,
              city: action.city,
              state: action.state,
              country: action.country,
              pinCode: action.pinCode,
              email: action.email
          }
      case 'LOGOUT':
          return {
              ...state,
              ...logInState
          }
      default:
          return state;
  }
}

export const reducer = combineReducers({
  login: loginReducer,
  coach: coachReducer,
  user: userReducer,
  booking: bookingReducer
});


