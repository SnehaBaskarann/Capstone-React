import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function StaticExample() {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Question Library</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Add Question from Bulk Upload</p>
        </Modal.Body>
        <Modal.Body>
          <p>Add New Question</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default StaticExample;