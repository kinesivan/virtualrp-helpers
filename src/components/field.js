import React, { Component } from "react";

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

class ArrayField extends Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        console.log(props);
    }

    handleInput(e) {
        this.props.onChange(this.props.index, this.props.name, e.target.value);
    }

    render() {
        return (
            <React.Fragment>
                {!this.props.hideLabel && (
                    <label
                        htmlFor=""
                        className={
                            this.props.type === "checkbox"
                                ? "form-check-label"
                                : ""
                        }
                    >
                        {capitalize(this.props.name)}
                    </label>
                )}
                <input
                    type={this.props.type || "text"}
                    className={
                        this.props.type === "checkbox"
                            ? "form-check-input"
                            : "form-control form-control-sm"
                    }
                    placeholder={capitalize(this.props.name)}
                    onChange={this.handleInput}
                    value={this.props.value}
                />
            </React.Fragment>
        );
    }
}

class Field extends Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        this.props.onChange(this.props.name, e.target.value);
    }

    render() {
        return (
            <React.Fragment>
                {!this.props.hideLabel && (
                    <label htmlFor="">{capitalize(this.props.name)}</label>
                )}
                <input
                    type={this.props.type || "text"}
                    className={
                        this.props.type === "checkbox"
                            ? "form-check-input"
                            : "form-control form-control-sm"
                    }
                    placeholder={capitalize(this.props.name)}
                    onChange={this.handleInput}
                    value={this.props.value}
                />
            </React.Fragment>
        );
    }
}

export { ArrayField, Field };
