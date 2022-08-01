import React from "react";
import moment from "moment";
import EventPieChart from "../charts/EventPieChart";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";

const JournalCards = ({ emotion, imageSrc }) => {
  const { allEvent } = useSelector((store) => store.event);
  console.log("allevent", allEvent);
  const eventsByEmo = allEvent.filter((event) => event.emotions === emotion);
  console.log("eventsbyemo", eventsByEmo);

  return (
    <div>
      <p>{emotion}</p>
      <img src={imageSrc} alt={`${emotion}-emoji`} />

      <EventPieChart emotion={emotion} />

      {/* incident */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Incident</Typography>
        </AccordionSummary>
        {eventsByEmo.map((el) => {
          const { incident, timeOfEvent, _id } = el;
          return (
            <div key={_id}>
              <AccordionDetails>
                <Typography component={"div"}>
                  <div>{incident} </div>
                  <div>
                    {moment(timeOfEvent).format("MMMM Do YYYY, h:mm:ss a")}
                  </div>
                </Typography>
              </AccordionDetails>
            </div>
          );
        })}
      </Accordion>
      {/* thought */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Thought</Typography>
        </AccordionSummary>
        {eventsByEmo.map((el) => {
          const { thought, timeOfEvent, _id } = el;
          return (
            <div key={_id}>
              <AccordionDetails>
                <Typography component={"div"}>
                  <div>{thought} </div>
                  <div>
                    {moment(timeOfEvent).format("MMMM Do YYYY, h:mm:ss a")}
                  </div>
                </Typography>
              </AccordionDetails>
            </div>
          );
        })}
      </Accordion>
      {/* behavior */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Behavior</Typography>
        </AccordionSummary>
        {eventsByEmo.map((el) => {
          const { behavior, timeOfEvent, _id } = el;
          return (
            <div key={_id}>
              <AccordionDetails>
                <Typography component={"div"}>
                  <div>{behavior} </div>
                  <div>
                    {moment(timeOfEvent).format("MMMM Do YYYY, h:mm:ss a")}
                  </div>
                </Typography>
              </AccordionDetails>
            </div>
          );
        })}
      </Accordion>
    </div>
  );
};

export default JournalCards;
