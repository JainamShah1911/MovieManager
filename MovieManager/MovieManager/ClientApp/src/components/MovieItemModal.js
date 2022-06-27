import React, { Component } from 'react';
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter } from 'reactstrap';

export class MovieItemModal extends Component {

    render() {
        const { cancelEdit, isEditing, movieInView } = this.props;
        return (
            <div>
                <Modal toggle={() => cancelEdit()} isOpen={isEditing}>
                    <div className=" modal-header">
                        <h5 className=" modal-title" id="modal-title">
                            {movieInView?.title ? "Edit" : "Create"}
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
                                <Label for="year">Year</Label>
                                <Input
                                    type="number"
                                    name="year"
                                    defaultValue={movieInView ? movieInView.year : ""}
                                    placeholder="Movie release year"
                                    required max={new Date().getFullYear()+1}
                                />
                                <Label for="rating">Rating (0-5)</Label>
                                <Input
                                    type="number"
                                    name="rating"
                                    defaultValue={movieInView ? movieInView.rating : 0}
                                    placeholder="Movie rating"
                                    required max={5}
                                />
                                <Label for="image">Poster Image</Label>
                                <Input
                                    type="text"
                                    name="image"
                                    defaultValue={movieInView ? movieInView.image : ""}
                                    placeholder="Poster image"
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
            "title": e.target.title.value,
            "year": e.target.year.value,
            "rating": e.target.rating.value,
            "image": e.target.image.value
        }
        this.props.formSubmit(movie);
    }
}
