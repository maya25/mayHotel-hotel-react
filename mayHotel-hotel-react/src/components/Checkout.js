import React, { useState, useEffect, useCallback } from "react";
import { RoomApi } from "../apis/api";
import Loader from "react-loader";
import { Switch } from "@material-ui/core";
import UserRoomData from "./UserRoomData";
import Box from "./Box";
import Form from "./Form";
import FormField from "./FormField";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import SiteModal from "./SiteModal";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [roomNum, setRoomNum] = useState("");
  const [modal, setModal] = useState({
    title: "צ'ק אאוט",
    text: "",
    show: false
  });

  const handleSubmit = useCallback(() => {
    const shouldSubmit = window.confirm("האם ברצונך להמשיך?");
    if (!shouldSubmit) return;
    (async () => {
      try {
        setLoading(true);
        await RoomApi.checkout(roomNum);
        setModal({
          ...modal,
          text: "צ'ק אאוט בוצע בהצלחה!",
          show: true
        });
      } catch (e) {
        setModal({
          ...modal,
          text: "שגיאה. חדר פנוי או לא קיים",
          show: true
        });
      }
      setRoomNum("");
      setLoading(false);
    })();
  }, [roomNum]);

  return (
    <Box style={{ maxWidth: "400px" }}>
      <Form onSubmit={handleSubmit}>
        <FormField title="מספר חדר">
          <Input
            type="text"
            value={roomNum}
            onChange={event => setRoomNum(event.target.value)}
            placeholder="הזן מספר חדר"
            required
          />
        </FormField>
        <Loader loaded={!loading}>
          <SubmitButton>אישור</SubmitButton>
        </Loader>
      </Form>
      <SiteModal
        open={modal.show}
        title={modal.title}
        text={modal.text}
        onClose={() => {
          setModal({
            ...modal,
            show: false
          });
        }}
      />
    </Box>
  );
};

export default Checkout;
