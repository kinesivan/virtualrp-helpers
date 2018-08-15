import React, { Component } from "react";

class Output extends Component {
    lengthStatus(length) {
        if (length < 500) { return "badge"; }
        if (length >= 500 && length < 1000) { return "badge badge-secondary" }
        if (length >= 1000 && length < 1500) { return "badge badge-warning" }
        if (length >= 1500 && length < 2000) { return "badge badge-danger"; }
        return "badge badge-dark";
        
    }
    render() {
        return (
            <React.Fragment>
                <div className="card">
                    <textarea className="card-body output" rows="6" value={this.props.content} readOnly>
                    </textarea>
                </div>
                <span className={this.lengthStatus(this.props.content.length) + " mb-3"}>{this.props.content.length} / 2000</span>
            </React.Fragment>
        );
    }
}

export { Output };
