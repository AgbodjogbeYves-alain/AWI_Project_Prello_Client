import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Title} from "../pages/Utils/Utils";
import CardOptions from "./CardOptions";
import {callAddCommentCard, callEditCard, callRemoveCard} from "../../actions/CardActions";
import CheckListDropdown from '../pages/Board/CheckListDropdown';
import Checklist from '../pages/Board/Checklist';
import MemberAdd from './MemberAdd';
import {ProfilePicture} from "./ProfilePicture";


class ModalEditCard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            idList: this.props.idList,
            idBoard: this.props.idBoard,
            cardTitle: this.props.card.cardTitle,
            newComment: "",
            modalDisplayed: null,
            newDescription: ''
        };

        this.titleToInput = this.titleToInput.bind(this)
        this.inputToTitle = this.inputToTitle.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this)
        this.handleChangeStatus = this.handleChangeStatus.bind(this)
        this.unorarchive = this.unorarchive.bind(this)
        this.renderDeleteButton = this.renderDeleteButton.bind(this)
        this.handleDeleteCard = this.handleDeleteCard.bind(this)
    }

    inputToTitle = (event) =>{
        event.preventDefault();
        const input = document.getElementById('title'+this.props.card._id);
        this.updateCardName(input.value);
        const title = document.createElement("h3");
        title.innerHTML = input.value;
        title.style= "padding:8px";
        title.id = 'title'+this.props.card._id;
        title.onclick = this.titleToInput;
        input.parentNode.replaceChild(title, input);
    }

    titleToInput = (event) =>{
        event.preventDefault();
        const title = document.getElementById('title'+this.props.card._id);
        const input = document.createElement("input");
        input.value = title.innerText;
        input.style = "font-size: 40px;padding: 8px"
        input.id = 'title'+this.props.card._id;
        input.onblur = this.inputToTitle;
        input.className = "form-control w-100";
        title.parentNode.replaceChild(input, title);
        input.focus();
    }


    updateCardName(value) {
        let newCard = this.props.card
        newCard.cardTitle = value
        callEditCard(this.state.idBoard,this.state.idList,newCard)
    }

    handleAddComment = (event) => {
        event.preventDefault();
        if(this.state.newComment!=''){
            let newComment = {
                commentContent: this.state.newComment,
                userId: this.props.user._id
            }

            let newCard = this.props.card
            newCard.cardComments.push(newComment)
            callAddCommentCard(this.state.idBoard,this.state.idList,newCard)

        }else{
            //Alert comment must not be empty
        }

    };

    handleAddDescription = (event) => {
        event.preventDefault()
        let newCard  = this.props.card
        if(this.state.newDescription != ""){
            newCard.cardDescription = this.state.newDescription
            callEditCard(this.state.idBoard,this.state.idList,newCard)
            /*this.setState({
                card: newCard
            })*/

        }else{
            //Alert description must not be empty
        }
    }

    handleChangeStatus = (event) => {
        event.preventDefault()
        let newCard = this.props.card
        newCard.isArchived = !this.props.card.isArchived
        callEditCard(this.state.idBoard,this.state.idList,newCard)
        let child = document.getElementsByClassName("modal-backdrop fade show")[0]
        child.parentNode.removeChild(child);
    }

    renderDeadLine(){
        if(this.props.card.cardDeadline){
            return <span><i className="ni ni-time-alarm"/>{this.props.card.cardDeadline}</span>
        }
    }

    unorarchive(){
        if(this.props.card.isArchived){
            return <li><button type="button" className="btn btn-secondary cardButtonEdit" onClick={this.handleChangeStatus}>Unarchived</button></li>
        }else{
            return <li><button type="button" className="btn btn-secondary cardButtonEdit" onClick={this.handleChangeStatus}>Archived</button></li>
        }
    }

    renderDeleteButton(){

           return <li><button type="button" className="btn btn-secondary cardButtonEdit" onClick={this.handleDeleteCard}> Delete </button></li>

    }

    handleDeleteCard = (event) => {
        event.preventDefault()
        callRemoveCard(this.state.idBoard,this.state.idList,this.props.card._id)
        let child = document.getElementsByClassName("modal-backdrop fade show")[0]
        child.parentNode.removeChild(child);
    }

    renderChecklists() {
        let checklists = this.props.checklists.filter((checklist) => this.props.card.cardChecklists.includes(checklist._id));
        return(
            <div className="checklists">
                {checklists && checklists.map((c, i) =>
                    <Checklist key={i} checklistId={c._id}/>
                )}
            </div>
        )
    }

    renderLabels(){
        let cardLabels = this.props.labels.filter((label) => this.props.card.cardLabels.includes(label._id) );
        return cardLabels.map((label, i) => {
            return <span key={i} className="badge badge-pill badge-default" style={{background: label.labelColor}}>{label.labelName}</span>
        })
    }

    renderUsers(){
        let users = this.props.users
        if(!users.includes(this.props.user)){
            users.push(this.props.user)
        }

        return this.props.users.map((user, i) => {
            if(this.props.card.cardUsers && this.props.card.cardUsers.includes(user._id)){
                return (<div className={"profileInModalEdit"}><ProfilePicture key={i} user={user} size={"sm"}/></div>)
            }
        })
    }


    render(){
        return (
            <div className="modal fade modalCard" id={"card-modal" + this.props.card._id} tabIndex="-1" role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                    <div className="modal-content modalContentCard">

                        <div className="modal-header">
                            <Title id={'title'+this.props.card._id} onClick={this.titleToInput}>{this.props.card.cardTitle}</Title>

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>

                            <div className="userForCard">
                                <span><i className="ni ni-single-02"/></span>
                                {this.renderUsers()}
                            </div>
                        </div>

                        <div className="modal-body modalContentCard">
                            <div className="labelForCard">
                                <span><i className="ni ni-tag"/></span>

                                {this.renderLabels()}

                            </div>



                            <div className={"deadLineDiv"}>
                                {this.renderDeadLine()}
                            </div>
                            <div className="formCardModal">
                                <form role="form" onSubmit={(e) => e.preventDefault()}>
                                    <div className="form-group mb-3">
                                        <div>
                                            <div id={"descriptionDiv"}>
                                                <span> Description </span>
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Add description"
                                                    type="text"
                                                    onChange={(e) => this.setState({
                                                        newDescription: e.target.value
                                                    })}>{this.props.card.cardDescription}</textarea>
                                                <button type="button" className="btn btn-success cardButtonEdit" onClick={this.handleAddDescription}>Add</button>

                                            </div>

                                        </div>
                                    </div>
                                </form>

                                {this.renderChecklists()}

                                <form role="form" onSubmit={(e) => e.preventDefault()}>
                                    <div className="form-group mb-3">
                                        <div id={"commentDiv"}>
                                            <span> Add comment </span>

                                            <textarea
                                                className="form-control"
                                                placeholder="Add Comment"
                                                type="text"
                                                onChange={(e) => this.setState({
                                                    newComment: e.target.value
                                                })}/>
                                            <button type="button" className="btn btn-success cardButtonEdit" onClick={this.handleAddComment}>Add</button>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <div className="input-group input-group-alternative">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"/>
                                            </div>
                                            <div id={"listComment"}>
                                                <span> Comment list </span>
                                                {this.props.card.cardComments.map((comment) => {
                                                    return <div className={"divComment"}><span><i className="ni ni-chat-round"/>{"  " + comment.commentContent}</span></div>

                                                })
                                                }
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={'cardactiondiv'}>
                                <span> Action </span>
                                <ul className={'actionUl'}>
                                    {this.unorarchive()}
                                    {this.renderDeleteButton()}
                                    <li>
                                        <button className="btn btn-secondary cardButtonEdit "
                                                onClick={() => this.setState({
                                                    modalDisplayed: this.state.modalDisplayed === "members" ? null : "members"
                                                })}>
                                            Members
                                        </button>
                                        {this.state.modalDisplayed === "members" ?
                                            <MemberAdd function="members" card={this.props.card} idList={this.state.idList} idBoard={this.state.idBoard}/> : ""                                        }

                                    </li>
                                    <li>
                                        <button className="btn btn-secondary cardButtonEdit"
                                                onClick={() => this.setState({
                                                    modalDisplayed: this.state.modalDisplayed === "labels" ? null : "labels"
                                                })}>Labels</button>
                                        {this.state.modalDisplayed === "labels" ?
                                            <CardOptions function="labels" card={this.props.card} idList={this.state.idList} idBoard={this.state.idBoard}/> : ""
                                        }
                                    </li>
                                    <li>
                                        <button
                                            className="btn btn-secondary cardButtonEdit"
                                            onClick={() => this.setState({
                                                modalDisplayed: this.state.modalDisplayed === "checklist" ? null : "checklist"
                                            })}
                                        >
                                            CheckList
                                        </button>
                                        {this.state.modalDisplayed === "checklist" ?
                                            <CheckListDropdown card={this.props.card}/> : ""
                                        }
                                    </li>
                                    <li>
                                        <button className="btn btn-secondary cardButtonEdit "
                                                onClick={() => this.setState({
                                                    modalDisplayed: this.state.modalDisplayed === "deadline" ? null : "deadline"
                                                })}>Deadline</button>

                                        {this.state.modalDisplayed === "deadline" ?
                                            <CardOptions function="deadline" card={this.props.card} idList={this.state.idList} idBoard={this.state.idBoard}/> : ""
                                        }
                                    </li>

                                </ul>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

const mapStateToProps = state => ({
    user: state.user,
    users: state.users,
    labels: state.labels,
    checklists: state.checklists
});

export default connect(mapStateToProps)(ModalEditCard);



