import React, { useEffect } from "react";
import Box from "./Box";
import PageHeading from "./PageHeading";
import RouteList from "./RouteList";
import CreateEvent from "./CreateEvent";
import EventList from "./EventList";
import ReservationList from "./ReservationList";
import { Route } from 'react-router-dom';

const pageLinks = [
  {
    title: "הוסף אירוע",
    component: CreateEvent,
    path: "/event/create"
  },
  {
    title: "אירועי המלון",
    component: EventList,
    path: "/event/all"
  }
];

const nestedRoutes = pageLinks.map(link => ({
  path: link.path,
  component: link.component
}));

const EventView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <PageHeading title="אירועים" links={pageLinks} />
      <Box className="reception-view" content>
        <RouteList routes={nestedRoutes} />
      </Box>
      <Route path="/event/reservations" component={ReservationList} />
    </>
  );
};

export default EventView;
