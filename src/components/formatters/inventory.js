import React, { Component } from "react";

import _ from "underscore";
import { Field, ArrayField } from "../field";
import { Output } from "../output";

import { StateStorage } from "../stateStorage";
import { DefaultInventoryState } from "../../utils/states";

class InventoryFormatter extends Component {
    constructor(props) {
        super(props);
        this.state = DefaultInventoryState;

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.handleItemsInput = this.handleItemsInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.renderOutput = this.renderOutput.bind(this);
        this.storageStateHandler = this.storageStateHandler.bind(this);
    }

    addItem() {
        const newItems = [
            ...this.state.items,
            { amount: "", type: "", name: "", description: "", active: false },
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

    handleInput(n, v) {
        this.setState({ [n]: v });
    }

    storageStateHandler(localState) {
        this.setState(localState);
    }

    renderOutput() {
        const stateItems = this.state.items.concat();
        let activeItems = stateItems.filter((v) => v.active === "true").map((v) => { v.type = v.type.toUpperCase(); return v; });
        let regularItems = stateItems.filter((v) => v.active !== "true").map((v) => { v.type = v.type.toUpperCase(); return v; });
        activeItems = _.sortBy(activeItems, "name");
        regularItems = _.sortBy(regularItems, "name");
        activeItems = _.sortBy(activeItems, "type");
        regularItems = _.sortBy(regularItems, "type");
        const items = activeItems.concat(regularItems);
        const largestAmount = String(
            items.map((v) => v.amount).reduce((a, c) => Math.max(a, c))
        ).length;
        const largestType = items
            .map((v) => v.type)
            .reduce((a, c) => (a.length > c.length ? a : c)).length;
        return (
            `\`\`\`fix\n` +
            `[INVENTORY] ${this.state.name}\n` +
            `\`\`\`\n` +
            `\`\`\`md\n` +
            items
                .map(
                    (v) =>
                        `${v.active === "true" ? "#" : "*"} ${`[x${
                            v.amount
                        }]`.padEnd(
                            largestAmount + 3,
                            " "
                        )} ${`[${v.type.toUpperCase()}]`.padEnd(
                            largestType + 3,
                            " "
                        )} ${v.name}\n> ${v.description || "No description"}`
                )
                .join("\n\n") +
            `\`\`\``
        );
    }

    render() {
        const output = this.renderOutput();
        return (
            <React.Fragment>
                <h2>Inventory Formatter</h2>
                <StateStorage setState={this.storageStateHandler} parentState={this.state} name="inventory" default={DefaultInventoryState}/>
                <form>
                    <div className="form-row mb-2">
                        <div className="col">
                            <Field name="name" onChange={this.handleInput} value={this.state.name} />
                        </div>
                    </div>
                    {this.state.items.map((v, i) => (
                        <div className="form-row mb-2" key={i}>
                            <div className="col-md-1">
                                { i === 0 && <label>Amount</label> }
                                <div className="input-group">
                                    {i !== 0 && (
                                        <div className="input-group-prepend">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    this.removeItem(i)
                                                }
                                            >
                                                -
                                            </button>
                                        </div>
                                    )}
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        placeholder="#"
                                        value={this.state.items[i].amount}
                                        onChange={(e) =>
                                            this.handleItemsInput(
                                                i,
                                                "amount",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <ArrayField
                                    name="type"
                                    index={i}
                                    value={this.state.items[i].type}
                                    onChange={this.handleItemsInput}
                                    hideLabel={!(i === 0)}
                                />
                            </div>
                            <div className="col-md-3">
                                <ArrayField
                                    name="name"
                                    index={i}
                                    value={this.state.items[i].name}
                                    onChange={this.handleItemsInput}
                                    hideLabel={!(i === 0)}
                                />
                            </div>
                            <div className="col">
                                <ArrayField
                                    name="description"
                                    index={i}
                                    value={this.state.items[i].description}
                                    onChange={this.handleItemsInput}
                                    hideLabel={!(i === 0)}
                                />
                            </div>
                            <div className="col-md-auto">
                                { i === 0 && <label>Active</label> }
                                <div className="input-group">
                                    <select
                                        className="custom-select form-control-sm"
                                        name="active"
                                        value={this.state.items[i].active}
                                        onChange={(e) => {
                                            this.handleItemsInput(
                                                i,
                                                "active",
                                                e.target.value
                                            );
                                        }}
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
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
                    ))}
                </form>
                <Output content={output} />
            </React.Fragment>
        );
    }
}

export { InventoryFormatter };
