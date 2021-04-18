import React from 'react';
import Header from '../Header/Header';
class Home extends React.Component {
    render() {
        return (
            <>
                <Header/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Hello</div>
                                <div className="card-body">Toi la gi day</div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default Home;
