import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JournalCards from "../../components/journalCards/JournalCards";
import { getAllEvents } from "../../features/eventSlice";
import emojiItems from "../../data/emojiItems";
import styles from "./journal.module.css";
import JournalModal from "../../components/journalCards/JournalModal";

const Journal = () => {
  const [emotionPie, setEmotionPie] = useState("happy");
  const { isJournalModalOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  dispatch(getAllEvents());

  return (
    <>
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
    </>
  );
};

export default Journal;
