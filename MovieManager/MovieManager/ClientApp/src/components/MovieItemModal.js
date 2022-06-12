import React, { Component } from 'react';
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter } from 'reactstrap';

export class MovieItemModal extends Component {

    render() {
        const { cancelEdit, isEditing, movieInView } = this.props;
        return (
            <div>
                <Modal toggle={() => cancelEdit()} isOpen={isEditing}>
                    <div className=" modal-header">
                        <h5 className=" modal-title" id="exampleModalLabel">
                            {movieInView?.title}
                        </h5>
                        <button
                            aria-label="Close"
                            className=" close"
                            type="button"
                            onClick={() => cancelEdit()}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <form onSubmit={this.validateForm}>
                        <ModalBody>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    defaultValue={movieInView ? movieInView.title : ""}
                                    placeholder="Title of the movie"
                                    required
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="secondary"
                                type="button"
                                onClick={() => cancelEdit()}
                            >
                                Close
                            </Button>
                            <Button color="primary" type="submit">
                                Save changes
                            </Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div >
        );
    }
    validateForm = (e) => {
        e.preventDefault();
        const movie = {
            "objectId": this.props.movieInView.objectId ?? null,
            "title": e.target.title.value
        }
        this.props.formSubmit(movie);
      }
}
