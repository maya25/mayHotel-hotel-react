import React, { useState, useCallback } from "react";
import { RoomApi } from "../apis/api";
import Loader from "react-loader";
import Box from "./Box";
import Form from "./Form";
import FormField from "./FormField";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import SiteModal from "./SiteModal";
import { generateNormalizedArray } from "../helpers";
import Select from "./Select";
import DatePicker from "react-datepicker";
import moment from "moment";

const initialForm = {
  user_id: "",
  room_num: "",
  guest_amount: 1,
  startdate: new Date(),
  enddate: moment(new Date())
    .add(1, "days")
    .toDate()
};

const Checkin = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [modal, setModal] = useState({
    title: "צ'ק אין",
    text: "",
    show: false
  });

  const setInputValue = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = useCallback(() => {
    const shouldSubmit = window.confirm("האם ברצונך להמשיך?");
    if (!shouldSubmit) return;
    (async () => {
      try {
        setLoading(true);
        const { user_id, room_num, enddate, startdate, guest_amount } = form;
        await RoomApi.checkin(
          room_num,
          user_id,
          guest_amount,
          startdate,
          enddate
        );
        setForm(initialForm);
        setModal({
          ...modal,
          text: "צ'ק אין בוצע בהצלחה!",
          show: true
        });
      } catch (e) {
        setModal({
          ...modal,
          text: "שגיאה. וודא שהפרטים נכונים ושהחדר פנוי",
          show: true
        });
      }
      setLoading(false);
    })();
  }, [form]);

  return (
    <Box style={{ maxWidth: "400px" }}>
      <Form onSubmit={handleSubmit}>
        <FormField title="ת.ז אורח">
          <Input
            type="text"
            value={form.user_id}
            onChange={setInputValue}
            name="user_id"
            placeholder="הזן מס' ת.ז אורח"
            required
          />
        </FormField>
        <FormField title="מספר חדר">
          <Input
            type="text"
            value={form.room_num}
            onChange={setInputValue}
            name="room_num"
            placeholder="הזן מס' חדר"
            required
          />
        </FormField>
        <FormField title="כמות אורחים">
          <Select
            items={generateNormalizedArray(4)}
            value={form.guest_amount || 1}
            onChange={setInputValue}
            name="guest_amount"
          />
        </FormField>
        <FormField title="תאריך כניסה">
          <DatePicker
            minDate={new Date()}
            placeholderText="בחר תאריך כניסה"
            required
            selected={form.startdate}
            onChange={date =>
              setForm({
                ...form,
                startdate: date
              })
            }
          />
        </FormField>
        <FormField title="תאריך יציאה">
          <DatePicker
            minDate={moment(new Date())
              .add(1, "days")
              .toDate()}
            placeholderText="בחר תאריך יציאה"
            required
            selected={form.enddate}
            onChange={date =>
              setForm({
                ...form,
                enddate: date
              })
            }
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

export default Checkin;
