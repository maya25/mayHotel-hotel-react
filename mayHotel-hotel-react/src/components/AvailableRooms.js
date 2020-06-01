import React, { useState, useEffect, useCallback } from "react";
import ReactTable from "react-table";
import {Icon} from 'semantic-ui-react'
import { RoomApi } from "../apis/api";
import Loader from "react-loader";
import { Switch } from "@material-ui/core";
import UserRoomData from "./UserRoomData";
import Box from "./Box";

const columns = [
  {
    Header: "מספר חדר",
    accessor: "number"
  },
  {
    Header: "כמות אכלוס",
    accessor: "capacity"
  },
  {
    Header: "ניקיון",
    accessor: "clean",
    Cell: props => {
      if(props.row.clean){
        return <Icon name='checkmark' color='green'></Icon>
      }else{
        return <Icon name='times' color='red'></Icon>
      }
      // return <Switch checked={props.row.clean} color="primary" />;
    }
  }
].reverse();

const AvailableRooms = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    (async () => {
      const result = await RoomApi.getAllAvailable();
      const _data = result.data.data.map(room => ({
        number: room.number,
        capacity: room.capacity,
        clean: room.room_service.clean.is_handle,
        available: !Boolean(room.user)
      }));
      if (cancel) return;
      setData(_data);
      setLoading(false);
    })();

    return () => {
      cancel = true;
    };
  }, []);

  return (
    <Loader loaded={!loading}>
      <ReactTable
        columns={columns}
        data={data}
        minRows={1}
      />
    </Loader>
  );
};

export default AvailableRooms;
