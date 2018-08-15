import React, { Component } from "react";

import { Output } from "../output";
import { calcMod } from "../../utils/modifier";

import { StateStorage } from "../stateStorage";
import { DefaultCharacterState } from "../../utils/states";

class CharacterFormatter extends Component {
    constructor(props) {
        super(props);
        this.state = DefaultCharacterState;
        this.renderOutput = this.renderOutput.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.storageStateHandler = this.storageStateHandler.bind(this);
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    renderOutput(state) {
        return (
            `\`\`\`css\n` +
            `${state.name} — ${state.class} — HP ${state.hp}/${state.maxHp}\n` +
            `LEVEL ${state.level} — EXP ${state.exp} — GOLD ${
                state.gold
            }\n\n` +
            `STR ${state.str && state.str.padStart(2, "0")} [${state.str &&
                calcMod(state.str)}] ` +
            `DEX ${state.dex && state.dex.padStart(2, "0")} [${state.dex &&
                calcMod(state.dex)}] ` +
            `CON ${state.con && state.con.padStart(2, "0")} [${state.con &&
                calcMod(state.con)}]\n` +
            `INT ${state.int && state.int.padStart(2, "0")} [${state.int &&
                calcMod(state.int)}] ` +
            `WIS ${state.wis && state.wis.padStart(2, "0")} [${state.wis &&
                calcMod(state.wis)}] ` +
            `CHA ${state.cha && state.cha.padStart(2, "0")} [${state.cha &&
                calcMod(state.cha)}]\n\n` +
            `DAMAGE: [ ${this.state.damage} ]\`\`\``
        );
    }

    storageStateHandler(localState) {
        this.setState(localState);
    }

    render() {
        const output = this.renderOutput(this.state);
        return (
            <React.Fragment>
                <h2>Character Formatter</h2>
                <StateStorage setState={this.storageStateHandler} parentState={this.state} name="character" default={DefaultCharacterState}/>
                <form>
                    <div className="form-row mb-2">
                        <div className="col">
                            <label htmlFor="">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                onChange={this.handleInput}
                                value={this.state.name}
                                name="name"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Class</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Class"
                                onChange={this.handleInput}
                                value={this.state.class}
                                name="class"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">HP</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="HP"
                                onChange={this.handleInput}
                                value={this.state.hp}
                                name="hp"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Max HP</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Max HP"
                                onChange={this.handleInput}
                                value={this.state.maxHp}
                                name="maxHp"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Level</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Level"
                                onChange={this.handleInput}
                                value={this.state.level}
                                name="level"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">EXP</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="EXP"
                                onChange={this.handleInput}
                                value={this.state.exp}
                                name="exp"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Gold</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Gold"
                                onChange={this.handleInput}
                                value={this.state.gold}
                                name="gold"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Damage</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Damage"
                                onChange={this.handleInput}
                                value={this.state.damage}
                                name="damage"
                            />
                        </div>
                    </div>
                    <div className="form-row mb-2">
                        <div className="col">
                            <label htmlFor="">STR</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="STR"
                                onChange={this.handleInput}
                                value={this.state.str}
                                name="str"
                                min="0"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">DEX</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="DEX"
                                onChange={this.handleInput}
                                value={this.state.dex}
                                name="dex"
                                min="0"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">CON</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="CON"
                                onChange={this.handleInput}
                                value={this.state.con}
                                name="con"
                                min="0"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">INT</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="INT"
                                onChange={this.handleInput}
                                value={this.state.int}
                                name="int"
                                min="0"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">WIS</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="WIS"
                                onChange={this.handleInput}
                                value={this.state.wis}
                                name="wis"
                                min="0"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">CHA</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="CHA"
                                onChange={this.handleInput}
                                value={this.state.cha}
                                name="cha"
                                min="0"
                            />
                        </div>
                    </div>
                </form>
                <Output content={output} />
            </React.Fragment>
        );
    }
}

export { CharacterFormatter };
