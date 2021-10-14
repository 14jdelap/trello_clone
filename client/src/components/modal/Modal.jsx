import React, { useEffect, useState } from "react";
import ModalHeader from "./ModalHeader"
import ModalBody from "./ModalBody"
import ModalAside from "./ModalAside"
import { Link } from "react-router-dom";
import { useSelector, useStore } from "react-redux";
import { useDispatch } from "react-redux";
import { getCard } from "../../actions/CardActions";


const Modal = (props) => {
  const dispatch = useDispatch();

  const mockCard = {
    title: "Example card title",
    listTitle: "This is the list title",
    labels: ["yellow", "orange", "blue"],
    dueDate: "Aug 4 at 10:42 AM",
    description: "This is just an example description for the card"
  }

  const [ card, setCard ] = useState(null);
  const cards = useSelector(state => state.cards);

  useEffect(() => {
    const cardId = props.match.params.id;
    let selectedCard = cards.find(card => card._id === cardId);
    if (selectedCard === undefined) {
      dispatch(getCard(cardId, setCard));
      // Conseguir card
      // Set state del card con el valor del card del servidor
      // Conseguir card's list del servidor y set el valor de la lista
      // Conseguir card's board del servidor y set el valor de la board
    } else {
      setCard(selectedCard);
    }
  }, [])

  if (card === null) {
    return <div id="modal-container"></div>
  }

  return (
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <Link to={`/boards/${card.boardId}`}>
          <i className="x-icon icon close-modal"></i>
        </Link>
        {/* Pasar valor de titulo de lista! */}
        <ModalHeader listId={card.listId} card={card}/>
        <ModalBody card={card}/>
        <ModalAside />
      </div>
    </div>
  );
};

export default Modal;
