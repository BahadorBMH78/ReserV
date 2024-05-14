"use client";
import { useState, useEffect, useRef } from "react";
import {
  ScheduleComponent,
  TimelineViews,
  TimelineMonth,
  EventRenderedArgs,
  Inject,
  ResourcesDirective,
  ResourceDirective,
  ViewsDirective,
  ViewDirective,
  DragAndDrop,
  Resize,
  View,
  NavigatingEventArgs,
  ActionEventArgs,
  Day,
} from "@syncfusion/ej2-react-schedule";
import { extend } from "@syncfusion/ej2-base";
import dataSource from "./datasource.json";
import moment from "moment-jalaali";
import "moment-timezone";

moment.loadPersian({ dialect: "persian-modern" });

const InlineEditing = () => {
  const [currentView, setCurrentView] = useState<View>("TimelineDay");
  const [selectedDate, setSelectedDate] = useState(
    new Date(moment().tz("Asia/Tehran").format())
  );
  const [events, setEvents] = useState<any>(
    extend(
      [],
      (dataSource as Record<string, any>).resourceData.concat(
        (dataSource as Record<string, any>).timelineResourceData
      ),
      null,
      true
    ) as Record<string, any>[]
  ); // Use an integer as key

  const scheduleRef = useRef<any>(null);

  useEffect(() => {
    const currentTime = new Date(moment().tz("Asia/Tehran").toDate());
    console.log(currentTime, "currentTime");
    setSelectedDate(currentTime);
    if (scheduleRef.current) {
      // Assuming you want to scroll to the current time
      const timeString = moment(currentTime).format("HH:mm");
      scheduleRef.current.scrollTo(timeString);
    }
  }, []);

  useEffect(() => {
    if (scheduleRef.current) {
      const currentTime = new Date(moment().tz("Asia/Tehran").toDate());
      // Format currentTime to "HH:mm" string
      const timeString = moment(currentTime).format("HH:mm");
      console.log(timeString, "timeString");
      scheduleRef.current.scrollTo(timeString);
    }
  }, [selectedDate, scheduleRef]);

  const workDays: number[] = [0, 1, 2, 3, 4, 5];
  const categoriesData: Record<string, any>[] = [
    { text: "Nancy", id: 1, groupId: 1, color: "#df5286" },
    { text: "Steven", id: 2, groupId: 1, color: "#7fa900" },
    { text: "Robert", id: 3, groupId: 2, color: "#ea7a57" },
    { text: "Smith", id: 4, groupId: 2, color: "#5978ee" },
    { text: "Michael", id: 5, groupId: 3, color: "#df5286" },
  ];

  const checkOverlap = (item1: any, item2: any) => {
    const event1Start = new Date(item1.StartTime);
    const event1End = new Date(item1.EndTime);
    const event2Start = new Date(item2.StartTime);
    const event2End = new Date(item2.EndTime);

    return (
      (event1Start < event2End && event1End > event2Start) ||
      (event2Start < event1End && event2End > event1Start)
    );
  };

  const onActionBegin = (args: ActionEventArgs) => {
    const { requestType, data }: any = args;
    const now = new Date(moment().tz("Asia/Tehran").toDate()); // Ensure conversion to Date
    let eventStart, eventEnd, resourceGroupId;

    switch (requestType) {
      case "eventCreate":
      case "eventChange":
      case "eventResize":
        eventStart = new Date(
          data[0]?.StartTime || data.startTime || data.StartTime
        );
        eventEnd = new Date(data[0]?.EndTime || data.endTime || data.EndTime);
        resourceGroupId = data[0]?.GroupId || data.GroupId || data.groupId;
        // Prevent operations on past events
        if (eventStart < now) {
          args.cancel = true;
          alert("Operations on past events are not allowed.");
          return;
        }

        if (data[0]) {
          let item1;
          let item2 = {
            StartTime: data[0].StartTime,
            EndTime: data[0].EndTime,
          };
          console.log(data[0], "data[0]");
          let flag;
          events.map((item: any) => {
            item1 = {
              StartTime: moment(item.StartTime).tz("Asia/Tehran").toDate(),
              EndTime: moment(item.EndTime).tz("Asia/Tehran").toDate(),
            };
            flag = checkOverlap(item1, item2);
            if (flag) {
              if (data[0].TaskId === item.TaskId) {
                console.log("ooooooooo");
                args.cancel = true;
                alert(
                  "This time slot is not available for the selected person."
                );
              }
            } else {
              console.log("asdasd");
            }
          });
        }

        // console.log(check, "check");
        // Check availability only within the same resource group
        if (
          !scheduleRef.current.isSlotAvailable(
            eventStart,
            eventEnd,
            resourceGroupId,
            data.Id
          )
        ) {
          let item1;
          let item2 = {
            StartTime: data.StartTime,
            EndTime: data.EndTime,
          };
          let flag;
          events.map((item: any) => {
            item1 = {
              StartTime: moment(item.StartTime).tz("Asia/Tehran").toDate(),
              EndTime: moment(item.EndTime).tz("Asia/Tehran").toDate(),
            };
            flag = checkOverlap(item1, item2);
            if (flag) {
              if (
                data.TaskId === item.TaskId &&
                data.Id !== item.Id &&
                requestType === "eventChange"
              ) {
                console.log(data, item);
                args.cancel = true;
                alert(
                  "This time slot is not available for the selected person."
                );
                return;
              }
            } else {
              console.log("asdasd");
              return;
            }
            return;
          });
          // console.log(resourceGroupId);
          // console.log("Slot not available for:", resourceGroupId);
          // args.cancel = true;
          // alert("This time slot is not available for the selected person.");
          // return;
        }
        break;

      default:
        break;
    }
  };

  const onEventRendered = (args: EventRenderedArgs): void => {
    const { data } = args;
    const now = new Date(moment().tz("Asia/Tehran").format());
    let eventStart = data.StartTime || data.startTime;
    console.log(args, "args");
    if (eventStart < now) {
      args.element.classList.add("e-event-disabled");
    }

    const categoryColor: string = data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (currentView === "Agenda") {
      (args.element.firstChild as HTMLElement).style.borderLeftColor =
        categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  };

  const onNavigating = (args: NavigatingEventArgs): void => {
    setCurrentView(args.currentView as View);
  };

  const eventTemplate = (props: any) => (
    <div>
      <div>{props.Subject}</div>
      <button onClick={() => deleteEvent(props.Id)}>Delete</button>
    </div>
  );

  const deleteEvent = (eventId: any) => {
    const newData = events.filter((item: any) => item.Id !== eventId);
    // setData(newData);
  };
  console.log(events, "data");
  return (
    <div className="schedule-control-section">
      <div className="col-lg-12 control-section">
        <div className="control-wrapper">
          <ScheduleComponent
            // key={refreshKey}
            className=""
            ref={scheduleRef}
            width="100%"
            height="500px"
            cssClass="inline-edit"
            workDays={workDays}
            currentView={currentView}
            allowInline={true}
            selectedDate={selectedDate}
            eventSettings={{ dataSource: events, template: eventTemplate }}
            group={{ resources: ["Categories"] }}
            eventRendered={onEventRendered}
            actionBegin={onActionBegin}
            navigating={onNavigating}
            timeScale={{ slotCount: 4 }} // Set time scale to 10 minutes
          >
            <ResourcesDirective>
              <ResourceDirective
                field="TaskId"
                title="Category"
                name="Categories"
                allowMultiple={true}
                dataSource={categoriesData}
                textField="text"
                idField="id"
                colorField="color"
              />
            </ResourcesDirective>
            <ViewsDirective>
              <ViewDirective option="TimelineDay" showTimeIndicator={true} />
            </ViewsDirective>
            <Inject services={[TimelineViews, Day, DragAndDrop, Resize]} />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  );
};

export default InlineEditing;
