import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import asteroid from '../../../../../common/asteroid';

class Board extends Component {

    constructor(props) {
        super(props);

        this.handleRemoveBoard = this.handleRemoveBoard.bind(this);
    }

    handleRemoveBoard(e){
        e.preventDefault();
        if(confirm("Are you sure to delete this board ?")){
            asteroid.call("boards.removeBoard", this.props.board._id).then(() => {alert("The board is delete")}).catch((error) => {alert(error.reason)})
        }
    }
    render(){
        let board = this.props.board;
        let imageUrl = "https://res.cloudinary.com/dxdyg7b5b/image/upload/c_thumb,w_300/"+ board.boardBackground +".png"
        return(
            <div to={"/board/"+ board._id} className="col-3 board-card">
                <Link
                    to={"/board/"+ board._id}
                    className="card card-stats mb-4 mb-lg-0"
                    style={{backgroundImage: "url('"+ imageUrl +"')"}}
                >
                    <div className="card-body">
                        <h6>{board.boardTitle}</h6>
                        <div className="dropdown float-right d-none">
                            <div className="btn-link btn-sm" data-toggle="dropdown" href="#" role="button" onClick={(e) => e.preventDefault()}>
                                <i className="ni ni-settings-gear-65 ni-lg"></i>
                            </div>
                            <div className="dropdown-menu">
                                <div className="dropdown-item"
                                    data-toggle="modal"
                                    data-target={"#board-modal" + board._id}
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <i className="ni ni-settings"></i>
                                    Edit
                                </div>
                                <div className="dropdown-item" onClick={(e) => this.handleRemoveBoard(e)}>
                                    <i className="ni ni-fat-remove"></i>
                                    Remove
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(Board);


