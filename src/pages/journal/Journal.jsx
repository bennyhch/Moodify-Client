import React from "react";
import { useDispatch } from "react-redux";
import JournalCards from "../../components/journalCards/JournalCards";
import { getAllEvents } from "../../features/eventSlice";
import emojiItems from "../../data/emojiItems";

const Journal = () => {
  const dispatch = useDispatch();
  dispatch(getAllEvents());

  return (
    <>
      {emojiItems.map((emojiItem) => {
        return (
          <JournalCards
            key={emojiItem.id}
            emotion={emojiItem.emotions}
            imageSrc={emojiItem.imageSrc}
          />
        );
      })}
    </>
  );
};

export default Journal;
