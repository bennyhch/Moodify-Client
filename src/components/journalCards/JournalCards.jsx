import React from "react";
import moment from "moment";
import EventPieChart from "../charts/EventPieChart";
import styles from "./journalCards.module.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { openJournalModal } from "../../features/modal/modalSlice";
import { Tooltip } from "@mui/material";

const JournalCards = ({ emotion, imageSrc, setEmotionPie }) => {
  const { allEvent } = useSelector((store) => store.event);
  console.log("allevent", allEvent);
  const eventsByEmo = allEvent.filter((event) => event.emotions === emotion);
  console.log("eventsbyemo", eventsByEmo);
  const dispatch = useDispatch();

  const openModalHandler = () => {
    setEmotionPie(emotion);
    dispatch(openJournalModal());
  };
  return (
    <div className={styles.boxContainer}>
      <Tooltip title="CLICK ME!">
        <div className={styles.imgContainer} onClick={openModalHandler}>
          <img src={imageSrc} alt={`${emotion}-emoji`} />
          {/* <EventPieChart emotion={emotion} /> */}
        </div>
      </Tooltip>
      <div className={styles.emotionHeader}>{emotion}</div>

      {/* incident */}
      <div className={styles.accordionContainer}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Incident</Typography>
          </AccordionSummary>
          {eventsByEmo.map((el) => {
            return (
              <AccordionDetails key={el._id}>
                <Typography component={"div"}>
                  <div className={styles.textContainer}>
                    <div className={styles.entry}>{el.incident} </div>
                    <div className={styles.entryDate}>
                      {moment(el.timeOfEvent).format("MMMM Do YYYY, H:mm")}
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
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
            return (
              <AccordionDetails key={el._id}>
                <Typography component={"div"}>
                  <div className={styles.textContainer}>
                    <div className={styles.entry}>{el.thought} </div>
                    <div className={styles.entryDate}>
                      {moment(el.timeOfEvent).format("MMMM Do YYYY, H:mm")}
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
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
            return (
              <AccordionDetails key={el._id}>
                <Typography component={"div"}>
                  <div className={styles.textContainer}>
                    <div className={styles.entry}>{el.behavior} </div>
                    <div className={styles.entryDate}>
                      {moment(el.timeOfEvent).format("MMMM Do YYYY, h:mm:ss a")}
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default JournalCards;
