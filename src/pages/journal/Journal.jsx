import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JournalCards from "../../components/journalCards/JournalCards";
import { getAllEvents } from "../../features/eventSlice";
import emojiItems from "../../data/emojiItems";
import styles from "./journal.module.css";
import JournalModal from "../../components/journalCards/JournalModal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Tooltip } from "@mui/material";
import { openAddEntryModal } from "../../features/modal/modalSlice";
import EventModal from "../../components/events/EventModal";

const Journal = () => {
  const dispatch = useDispatch();
  const { isAddEntryModalOpen } = useSelector((store) => store.modal);
  const [emotionPie, setEmotionPie] = useState("happy");
  const { isJournalModalOpen } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch, isAddEntryModalOpen]);

  const openModalHandler = () => {
    dispatch(openAddEntryModal());
  };

  return (
    <div className={styles.journalPageContainer}>
      {isJournalModalOpen && <JournalModal emotionPie={emotionPie} />}
      <div className={styles.journalContainer}>
        {emojiItems.map((emojiItem) => {
          return (
            <JournalCards
              key={emojiItem.id}
              emotion={emojiItem.emotions}
              imageSrc={emojiItem.imageSrc}
              setEmotionPie={setEmotionPie}
            />
          );
        })}
      </div>
      {isAddEntryModalOpen && <EventModal />}
      <Tooltip title="Add Entry">
        <AddCircleOutlineIcon
          className={styles.addIcon}
          sx={{ fontSize: 45 }}
          onClick={openModalHandler}
        />
      </Tooltip>
    </div>
  );
};

export default Journal;
