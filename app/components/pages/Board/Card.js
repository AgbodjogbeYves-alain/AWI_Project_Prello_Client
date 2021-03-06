import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {ContainerC} from "../Utils/Utils";
import { connect } from 'react-redux';
import ModalEditCard from "../../partials/ModalEditCard";
import {ProfilePicture} from "../../partials/ProfilePicture";

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            board: this.props.board,
        }
    }

    getCompletedPourcent(){
        const checklists = this.props.checklists.filter((checklist) => this.props.card.cardChecklists.includes(checklist._id));

        let totalItems = checklists.map((checklist) => checklist.checklistItems.length)
        .reduce(((acc, val) => acc + val),0)

        if(totalItems == 0) return 100;

        let numCheckedItems = checklists.map((checklist) => checklist.checklistItems.filter((i) => i.itemChecked).length)
        .reduce(((acc, val) => acc + val),0)

        return 100*numCheckedItems/totalItems;
    }

    hasChecklist(){
        return this.props.card.cardChecklists.length !== 0;
    }

    renderLabels(){
        let cardLabels = this.props.labels.filter((label) => this.props.card.cardLabels.includes(label._id) );
        return cardLabels.map((label,i) => {
            return <span className="badge badge-pill badge-default" key={i} style={{background: label.labelColor}}>{label.labelName}</span>
        })
    }

    renderUsers(){
        let users = this.props.users
        if(!users.includes(this.props.user)){
            users.push(this.props.user)
        }

        return users.map((user, i) => {
            if(this.props.card.cardUsers && this.props.card.cardUsers.includes(user._id)){
                return (<div className="d-inline-block" style={{marginRight: "5px"}}><ProfilePicture key={i} user={user} size={"sm"}/></div>)
            }
        })
    }

    render() {
        return (
            <div>
            <Draggable draggableId={this.props.card._id} index={this.props.index}>
                {(provided) =>
                    <ContainerC {...provided.draggableProps}
                               {...provided.dragHandleProps}
                               ref={provided.innerRef}
                                data-toggle="modal" data-target={"#card-modal"+this.props.card._id}>
                        {this.props.card.cardTitle}

                        <div className={"profilInCardDiv"}>{this.renderUsers()}</div>
                        {this.hasChecklist() ?
                            <div className="progress card-progress">
                                <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                    style={{"width": this.getCompletedPourcent() + "%"}}>
                                </div>
                            </div> : ""
                        }

                        <div className={"cardLabelsDiv"}>
                            {this.renderLabels()}
                        </div>
                    </ContainerC>}
            </Draggable>
            <ModalEditCard card={this.props.card} idBoard={this.state.board._id} idList={this.props.idList}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    labels: state.labels,
    users: state.users,
    checklists: state.checklists
});

export default connect(mapStateToProps)(Card);
