import React from 'react';
import { useNavigate } from 'react-router-dom';

function GameDashboard() {
    let navigate = useNavigate();

    function navSingle() {
        navigate("/single-player");
    }

    function navBoard() {
        navigate("/leader-board");
    }

    function nav() {
        navigate("/multi-player");
    }

    return (
        <div className="container justify-content-center">
            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-7 col-sm-6">
                    <div className="card text-center p-5 shadow-lg bg-dark">
                    <h2 className="text-warning mb-4">Ready, Set, WHACK!</h2>
                        <div className="card-body">
                            <div className="d-flex flex-column gap-3">
                            <button onClick={navSingle} className="btn btn-danger fw-bold py-3">
                                Single Player
                            </button>
                            <button onClick={nav} className="btn btn-primary fw-bold py-3">
                                Multi Player
                            </button>
                            <button onClick={navBoard} className="btn btn-success fw-bold py-3">
                                Leader Board
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameDashboard;
