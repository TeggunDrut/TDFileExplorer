import React from 'react';
import ShopModal from '../../components/ShopModal/ShopModal';

const topLeftButtons = (
    <>
        <div id="shopCont">
            <button id="shopBtn" className="mediumButton" onclick="openShop()">Shop</button>
        </div>
        <div id="upgradesCont">
            <button id="upgradesBtn" className="mediumButton" onclick="openUpgrade()">Upgrades</button>
        </div>
    </>
);

const topRightButtons = (
    <>
        <div id="cashMoneyCont" className="mediumButton">Money: 200</div>
        <div id="expCount" className="mediumButton">EXP: 0</div>
        { /* <div id="buyPremiumCont"></div> Middle bottom */ }
    </>
);

const Game = () => {
    return (
        <>
            { topLeftButtons }
            { topRightButtons }
            
            <div id="shopGui" className="modalContainer hidden">
                <ShopModal />
            </div>

            <div id="upgradeGui" className="modalContainer hidden">
                <div className="modalGui">
                    <div className="modalHeader">
                        <h2 className="centerText">Upgrade</h2>
                        <button id="closeButton" onclick="closeMenu('upgradeGui')">X</button>
                    </div>

                    <div id="upgradeBox" height="100px"></div>
                </div>
            </div>
        </>
    );
};

export default Game;
