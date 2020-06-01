import React, { useEffect } from "react";
import Box from "./Box";
import PageHeading from "./PageHeading";
import RouteList from "./RouteList";
import AddRooms from "./AddRooms";
import AddMeals from "./AddMeals";
import AddTables from "./AddTables";

const pageLinks = [
  {
    title: "הוספת חדרים",
    component: AddRooms,
    path: "/hotel/rooms"
  },
  {
    title: "הוספת ארוחות",
    component: AddMeals,
    path: "/hotel/meals"
  },
  {
    title: "הוספת שולחנות",
    component: AddTables,
    path: "/hotel/tables"
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
      <PageHeading title="בניית מלון" links={pageLinks} />
      <Box className="reception-view" content>
        <RouteList routes={nestedRoutes} />
      </Box>
    </>
  );
};

export default EventView;
