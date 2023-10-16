import React, { useState } from 'react';

import shopItems from './shopItems';
import utils from '../utils';


const ShopModal = (props) => {
    const[selectedShopCategory, setSelectedShopCategory] = useState(shopItems[0]);

    const headers = shopItems.map((item, index) => {
        return (
            <button
                className="shopCategory"
                key={index}
                onClick={() => setSelectedShopCategory(item)}
            >
                {item.name}
            </button>
        );
    });

    const displayItems = selectedShopCategory.items.map((item, index) => {
        // TODO: WE CAN DO BETTER WITH ALT TEXT
        return (
            <div className="itemContainer" key={index}>
                <div className="itemHighlights">
                    <img className="itemImage" src="../../../art/sprites/moniter.png" height="50" width="50" alt={"PICTURE"}/>
                    <span className="item itemName">{item.name}</span>
                    <span className="item">${item.price}</span>
                </div>
                <span className="item">{item.description}</span>
            </div>        
        );
    });

    return (
        <div className="modalGui">
            <div className="modalHeader">
                <h2 className="centerText">Shop</h2>
                <button id="closeButton" onClick={() => utils.closeMenu('shopGui')}>X</button>        
            </div>
    
            <span id="tabsCont">
                {headers}
            </span>
            <div id="itemsBox">
                {displayItems}
            </div>
        </div>
    );
};


export default ShopModal;
