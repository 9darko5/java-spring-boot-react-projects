import {Modal, Button} from 'react-bootstrap'

const ModalComponent = ({ show, handleClose, title, body, footer, size, centered }) => {
  return (
    <Modal show={show} onHide={handleClose} size={size} centered={centered}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {footer ? footer : (
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
