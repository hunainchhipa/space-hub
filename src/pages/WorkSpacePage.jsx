import React from "react";
import WorkspaceCard from "../components/WorkspaceCard";
import { Checkbox, DatePicker, Space } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
const { RangePicker } = DatePicker;
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const onDateChange = (time, timeString) => {
  console.log(time, timeString);
};

const onOk = (value) => {
  console.log("onOk: ", value);
};

const WorkSpacePage = () => {
  const { control, handleSubmit } = useForm();

  const facilities = [
    {
      id: 1,
      label: "High-Speed Internet",
    },
    {
      id: 2,
      label: "Printing and Scanning",
    },
    {
      id: 3,
      label: "Private Offices and Meeting Rooms",
    },
    {
      id: 4,
      label: "Open Workspaces",
    },
    {
      id: 5,
      label: "Ergonomic Furniture",
    },
  ];

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <>
      <div className="container body-otr mb-4">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <h6 className="title">Select Filters</h6>
                    <label htmlFor="date" className="form-label">
                      Select Date
                    </label>
                    <div className="datepicker-otr">
                      <Space direction="vertical" size={12}>
                        <Controller
                          name="dateRange"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              // showTime={{
                              //   format: "HH:mm",
                              // }}
                              format="YYYY-MM-DD"
                              className="form-control"
                              onChange={(value, dateString) => {
                                field.onChange(value);
                                console.log("Selected Time: ", value);
                                console.log(
                                  "Formatted Selected Time: ",
                                  dateString
                                );
                              }}
                              onOk={onOk}
                            />
                          )}
                        />
                      </Space>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="time" className="form-label">
                      Select Time Slot
                    </label>
                    <div className="datepicker-otr">
                      <Controller
                        name="timeSlot"
                        control={control}
                        defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                        render={({ field }) => (
                          <TimePicker.RangePicker
                            onChange={(value) => {
                              field.onChange(value);
                              onDateChange(value, timeString);
                              console.log("Selected Time Slot: ", value);
                            }}
                            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <p className="mb-2">Facilities</p>
                  {facilities?.map((facility) => {
                    return (
                      <div key={facility?.id} className="mb-3">
                        <div className="form-check">
                          <Controller
                            name={`facility_${facility?.id}`}
                            control={control}
                            render={({ field }) => (
                              <Checkbox
                                className="form-check-input"
                                checked={field.value}
                                onChange={field.onChange}
                                id={`flexCheck${facility?.id}`}
                              />
                            )}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`flexCheck${facility?.id}`}
                          >
                            {facility?.label}
                          </label>
                        </div>
                      </div>
                    );
                  })}

                  <div className="text-end">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-9 mt-3 mt-md-0">
            <WorkspaceCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkSpacePage;
