import React, { Component } from "react";

import { Field } from "../field";
import { Output } from "../output";

import { StateStorage } from "../stateStorage";
import { DefaultQuestState } from "../../utils/states";

class QuestFormatter extends Component {
    constructor(props) {
        super(props);
        this.state = DefaultQuestState;

        this.handleInput = this.handleInput.bind(this);
        this.handleContentInput = this.handleContentInput.bind(this);
        this.renderOutput = this.renderOutput.bind(this);
        this.storageStateHandler = this.storageStateHandler.bind(this);
    }

    handleInput(n, v) {
        this.setState({ [n]: v });
    }

    handleContentInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    renderOutput() {
        return (
            `\`\`\`fix\n` +
            `[QUEST] ${this.state.name}\`\`\`\n` +
            `\`\`\`diff\n` +
            `${this.state.content}\n\n` +
            `+++ Objective — ${this.state.objective}\n` +
            `+++ Location  — ${this.state.location}\n` +
            `!!! Rewards   — ${this.state.rewards}\`\`\`\n` +
            `\`\`\`fix\n` +
            `[ DIFFICULTY: ${
                this.state.difficulty
            } ] = [ ACCEPT ] [ DECLINE ]\`\`\``
        );
    }

    storageStateHandler(localState) {
        this.setState(localState);
    }

    render() {
        const output = this.renderOutput();
        return (
            <React.Fragment>
                <h2>Quest Formatter</h2>
                <StateStorage setState={this.storageStateHandler} parentState={this.state} name="quest" default={DefaultQuestState} />
                <p className="mb-2">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://www.fantasynamegenerators.com/quest-descriptions.php"
                    >
                        Helpful utility for generating quest descriptions
                    </a>
                </p>
                <form>
                    <div className="form-row mb-2">
                        <div className="col">
                            <Field
                                name="name"
                                onChange={this.handleInput}
                                value={this.state.name}
                            />
                        </div>
                        <div className="col">
                            <Field
                                name="objective"
                                onChange={this.handleInput}
                                value={this.state.objective}
                            />
                        </div>
                        <div className="col">
                            <Field
                                name="location"
                                onChange={this.handleInput}
                                value={this.state.location}
                            />
                        </div>
                    </div>
                    <div className="form-row mb-2">
                        <div className="col">
                            <label>Content</label>
                            <textarea
                                className="form-control"
                                name="content"
                                rows="4"
                                onChange={this.handleContentInput}
                                value={this.state.content}
                                placeholder="Content"
                            />
                        </div>
                    </div>
                    <div className="form-row mb-2">
                        <div className="col">
                            <Field name="rewards" onChange={this.handleInput} />
                        </div>
                        <div className="col-md-3">
                            <label>Difficulty</label>
                            <select
                                className="custom-select form-control-sm"
                                name="difficulty"
                                value={this.state.difficulty}
                                onChange={this.handleContentInput}
                            >
                                <option value="PAINLESS">Painless</option>
                                <option value="EASY">Easy</option>
                                <option value="NORMAL">Normal</option>
                                <option value="HARD">Hard</option>
                                <option value="CHALLENGING">Challenging</option>
                            </select>
                        </div>
                    </div>
                </form>
                <Output content={output} />
            </React.Fragment>
        );
    }
}

export { QuestFormatter };
