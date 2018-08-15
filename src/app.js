import React, { Component } from "react";

import { CharacterFormatter } from "./components/formatters/character";
import { ShopFormatter } from "./components/formatters/shop";
import { QuestFormatter } from "./components/formatters/quest";
import { InventoryFormatter } from "./components/formatters/inventory";

class App extends Component {
    render() {
        return (
            <div>
                <CharacterFormatter />
                <ShopFormatter />
                <QuestFormatter />
                <InventoryFormatter />
            </div>
        );
    }
}

export { App };
