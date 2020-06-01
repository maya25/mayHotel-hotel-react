// actions/index.js
import {
  SIGN_IN,
  SIGN_OUT,
  FATCH_CALLS,
  DELETE_CALL,
  HANDLE_CALL,
  CREATE_EVENT,
  FETCH_EVENTS,
  FETCH_RESERVATIONS,
  DELETE_EVENT,
  FETCH_SPA,
  ADD_THEREPIST,
  ADD_ROOMS,
  ADD_TABLES,
  ADD_MEALS
} from "./types";
import hotels from "../apis/hotels";
import history from "../history";

export const signIn = formValues => async dispatch => {
  const response = await hotels.post("/login", formValues);
  dispatch({ type: SIGN_IN, payload: response.data.data });
  localStorage.setItem("hotel_user", JSON.stringify(response.data.data));
  history.push("/");
};

export const signOut = () => async (dispatch, getState) => {
  const token = getState().auth.payload.token;
  await hotels.post(
    "/logout",
    {},
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  dispatch({ type: SIGN_OUT });
  localStorage.removeItem("hotel_user");
  history.push("/login");
};

export const fatchCalls = () => async (dispatch, getState) => {
  const hotel_id = getState().auth.payload.hotel._id;
  const response = await hotels.get(`/rooms/services/${hotel_id}`);
  dispatch({ type: FATCH_CALLS, payload: response.data.data });
};

export const handleCall = (type, id) => async dispatch => {
  const response = await hotels.put(`/rooms/services/${type}`, { call_id: id });
  dispatch({ type: HANDLE_CALL, payload: response.data.data })
}

export const deleteCall = (type, id) => async dispatch => {
  await hotels.delete(`/rooms/services/${type}`, { call_id: id });
  dispatch({ type: DELETE_CALL, payload: id })
}

export const createEvent = formValues => async (dispatch, getState) => {
  const token = getState().auth.payload.token;
  const response = await hotels.post(`/events`, formValues,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  dispatch({ type: CREATE_EVENT, payload: response.data.data });
}

export const fetchEvents = () => async (dispatch, getState) => {
  const hotel_id = getState().auth.payload.hotel._id;
  const response = await hotels.get(`/events/${hotel_id}`);
  dispatch({ type: FETCH_EVENTS, payload: response.data.data });
};

export const deleteEvent = id => async (dispatch, getState) => {
  const token = getState().auth.payload.token;
  await hotels.delete(`/events/${id}`, 
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  dispatch({ type: DELETE_EVENT, payload: id })
}

export const fetchReservations = event_id => async (dispatch, getState) => {
  const token = getState().auth.payload.token;
  const response = await hotels.get(`/events/reservations/${event_id}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  console.log(response)
  dispatch({ type: FETCH_RESERVATIONS, payload: response.data.data });
};

export const fetchSpa = date => async (dispatch, getState) => {
  const token = getState().auth.payload.token;
  const response = await hotels.get(`/spa/${date}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  dispatch({ type: FETCH_SPA, payload: response.data.data });
  history.push("/spa/appointments");
};

export const addTherepist = formValues => async (dispatch, getState) => {
  const token = getState().auth.payload.token;
  const response = await hotels.post(`/spa`, formValues,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  dispatch({ type: ADD_THEREPIST, payload: response.data.data });
}

export const addRooms = formValues => async (dispatch, getState) => {
  const token = getState().auth.payload.token;
  const response = await hotels.post(`/rooms`, formValues,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  dispatch({ type: ADD_ROOMS, payload: response.data.data });
}

export const addTables = formValues => async (dispatch, getState) => {
  const token = getState().auth.payload.token;
  console.log(formValues)
  const response = await hotels.post(`/tables`, formValues,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  dispatch({ type: ADD_TABLES, payload: response.data.data });
}

export const addMeals = formValues => async (dispatch, getState) => {
  const token = getState().auth.payload.token;
  const response = await hotels.post(`/meals`, formValues,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  dispatch({ type: ADD_MEALS, payload: response.data.data });
}