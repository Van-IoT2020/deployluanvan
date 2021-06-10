import React from 'react';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';
import Content from '../Content/Content';
class Home extends React.Component {
    render() {
        return (
            <div style={{overflow:"hidden", width:"100vw"}}>
                <Menu />
                <Carousels />
                <Header onSearch={this.props.onSearch} />
                <Content/>
                <span> </span>
                <Footer />
            </div>
        );
        
    }
}

export default Home;
