//Modal image
import React from "react";
import Modal from "@material-ui/core/Modal";

export default function SimpleModal(props) {
  const { classes, handleImageClose, isModalOpen, modalImageUrl } = props;

  const body = (
    <div className={classes.paper} onClick={handleImageClose}>
      <img className={classes.imgView} src={modalImageUrl} alt="" />
    </div>
  );
  return (
    <Modal
      open={isModalOpen}
      onClose={handleImageClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      disableAutoFocus
    >
      {body}
    </Modal>
  );
}
