const closeMenu = (id) => {
    hide(get(id));
}

function openShop() {
    hide(get('upgradeGui'));
    unhide(get('shopGui'));

    // Unselect all shopCategory buttons
    const shopCategories = document.getElementsByClassName('shopCategory');
    for (let i = 0; i < shopCategories.length; i++) {
        const shopCategory = shopCategories[i];
        removeCSS(shopCategory, 'selected');
    }
    addCSS(shopCategories[0], 'selected');
}

function openUpgrade() {
    hide(get('shopGui'));
    unhide(get('upgradeGui'));
}

const openShopCategory = (selectedShopCategory) => {
    const shopCategories = document.getElementsByClassName('shopCategory');
    for (let i = 0; i < shopCategories.length; i++) {
        const shopCategory = shopCategories[i];
        removeCSS(shopCategory, 'selected');
    }
    addCSS(selectedShopCategory, 'selected');
}

