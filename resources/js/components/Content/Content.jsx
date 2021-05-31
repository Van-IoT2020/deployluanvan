import React from 'react';
import Products from '../Products/Products';
class Content extends React.Component {
    render() {
        var products=[
            {
                id: 1,
                name: 'Đầm nữ',
                price: '150000 VND',
                image: './images/imageCrs/dam.jpg',
                status: true
            },
            {
                id: 2,
                name: 'Chân váy công chúa',
                price: '200000 VND',
                image: './images/imageCrs/dam.jpg',
                status: true
            },
            {
                id: 3,
                name: 'Áo sơ mi công sở',
                price: '400000 VND',
                image: './images/imageCrs/dam.jpg',
                status: true
            },
            {
                id: 4,
                name: 'Áo kiểu',
                price: '250000 VND',
                image: './images/imageCrs/dam.jpg',
                status: true
            }
        ];
        let elements=products.map((product, index) => {
            return <div key={index} className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <Products
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                </div>
        });
        return (
            <div className="row">
                {elements}
            </div> 
        );
    }
}

export default Content;
