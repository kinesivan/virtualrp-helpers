import React, { Component } from "react";

import { ArrayField } from "../field";
import { Output } from "../output";

import { StateStorage } from "../stateStorage";
import { DefaultShopState } from "../../utils/states";

import { Field } from "../field";

class ShopFormatter extends Component {
    constructor(props) {
        super(props);
        this.state = DefaultShopState;

        this.handleItemsInput = this.handleItemsInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleFieldInput = this.handleFieldInput.bind(this);
        this.renderOutput = this.renderOutput.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.storageStateHandler = this.storageStateHandler.bind(this);
    }

    addItem() {
        const newItems = [
            ...this.state.items,
            { name: "", cost: "0", description: "" },
        ];
        this.setState({ items: newItems });
    }

    removeItem(key) {
        const newItems = this.state.items.concat();
        newItems.splice(key, 1);
        this.setState({ items: newItems });
    }

    handleItemsInput(index, name, value) {
        const newItems = this.state.items.map(
            (v, i) => (i === index ? { ...v, [name]: value } : v)
        );
        this.setState({ items: newItems });
    }

    handleFieldInput(n, v) {
        this.setState({ [n]: v });
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    renderOutput() {
        const largestCost = String(
            this.state.items.map((v) => v.cost).reduce((a, c) => Math.max(a, c))
        ).length;
        return (
            `\`\`\`fix\n` +
            `[SHOP] ${this.state.name}\`\`\`\n` +
            `\`\`\`ini\n` +
            this.state.items
                .concat()
                .sort((a, b) => b.cost - a.cost)
                .map(
                    (v, i) =>
                        `${`[${v.cost}g]`.padEnd(largestCost + 3, " ")} ${
                            v.name
                        }\n# ${v.description}`
                )
                .join("\n\n") +
            `\`\`\`\n` +
            `\`\`\`fix\n` +
            `[ YOU HAVE: ${this.state.coins}g ] = [ BUY ] [ CANCEL ]\`\`\``
        );
    }

    storageStateHandler(localState) {
        this.setState(localState);
    }

    render() {
        const output = this.renderOutput();
        return (
            <React.Fragment>
                <h2>Shop Formatter</h2>
                <StateStorage setState={this.storageStateHandler} parentState={this.state} name="shop" default={DefaultShopState} />
                <form>
                    <div className="form-row mb-2">
                        <div className="col">
                            <Field name="name" onChange={this.handleFieldInput} value={this.state.name} />
                        </div>
                        <div className="col">
                            <Field name="coins" onChange={this.handleFieldInput} value={this.state.coins} />
                        </div>
                    </div>
                    {this.state.items.map((v, i) => {
                        return (
                            <div className="form-row mb-2" key={i}>
                                <div className="col">
                                    { i === 0 && <label>Name</label> }
                                    <div className="input-group">
                                        { i !== 0 && (
                                            <div className="input-group-prepend">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => this.removeItem(i)}
                                                >
                                                    -
                                                </button>
                                            </div>
                                        )}
                                        <input type="text" placeholder="Name" className="form-control form-control-sm" name="name" value={this.state.items[i].name} onChange={(e) => this.handleItemsInput(i, "name", e.target.value)} />
                                    </div>
                                </div>
                                <div className="col">
                                    <ArrayField
                                        name="cost"
                                        index={i}
                                        onChange={this.handleItemsInput}
                                        value={this.state.items[i].cost}
                                        type="number"
                                        hideLabel={!(i === 0)}
                                    />
                                </div>
                                <div className="col">
                                    { i === 0 && <label>Description</label> }
                                    <div className="input-group">
                                        <input type="text" placeholder="Description" className="form-control form-control-sm" name="description" value={this.state.items[i].description} onChange={(e) => this.handleItemsInput(i, "description", e.target.value)} />
                                        <div className="input-group-append">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={this.addItem}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </form>
                <Output content={output} />
            </React.Fragment>
        );
    }
}

export { ShopFormatter };
