import React, { Component } from "react";

import hash from "object-hash";

class StateStorage extends Component {
    constructor(props) {
        super(props);
        this.state = { currentPresetName: "", presets: [] };
        this.clearState = this.clearState.bind(this);
        this.savePreset = this.savePreset.bind(this);
        this.loadPresets = this.loadPresets.bind(this);
        this.loadPreset = this.loadPreset.bind(this);
        this.deletePreset = this.deletePreset.bind(this);
    }

    componentDidMount() {
        this.loadPresets();
    }

    loadPresets() {
        const presets = JSON.parse(
            window.localStorage.getItem(this.props.name)
        );
        this.setState({ presets: presets ? presets : [] });
    }

    savePreset() {
        if (!this.state.currentPresetName) {
            alert("No name specified");
            return;
        }
        const data = this.props.parentState;
        let currentPresets = this.state.presets;
        const existingPreset = currentPresets.findIndex(
            (v) => v.name === this.state.currentPresetName
        );
        if (existingPreset >= 0) {
            currentPresets[existingPreset] = {
                ...currentPresets[existingPreset],
                data,
            };
        } else {
            currentPresets.push({ name: this.state.currentPresetName, data });
        }
        this.setState({ presets: currentPresets });
        window.localStorage.setItem(
            this.props.name,
            JSON.stringify(this.state.presets)
        );
        alert(`Saved Preset ${this.state.currentPresetName}`);
    }

    loadPreset(name) {
        const preset = this.state.presets.find((v) => v.name === name);
        if (preset) {
            this.props.setState(preset.data);
            this.setState({ currentPresetName: name });
            alert(`Loaded Preset ${name}`);
        } else {
            alert("Couldn't find preset");
        }
    }

    deletePreset() {
        this.loadPresets();
        if (!this.state.currentPresetName) {
            alert("No preset specified");
            return;
        }
        const presetIndex = this.state.presets.findIndex(
            (v) => v.name === this.state.currentPresetName
        );
        if (presetIndex >= 0) {
            const currentPresets = this.state.presets;
            currentPresets.splice(presetIndex, 1);
            this.setState({ presets: currentPresets });
            window.localStorage.setItem(
                this.props.name,
                JSON.stringify(this.state.presets)
            );
            alert(`Deleted Preset ${this.state.currentPresetName}`);
        } else {
            alert("Couldn't find preset");
        }
    }

    hashStateString() {
        const hashed = hash(this.props.parentState);
        return hashed;
    }

    clearState() {
        this.props.setState(this.props.default);
        alert("Cleared");
    }

    render() {
        return (
            <div className="btn-toolbar justify-content-between mb-2">
                <div className="input-group input-group-sm">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Preset Name"
                        value={this.state.currentPresetName}
                        onChange={(e) =>
                            this.setState({ currentPresetName: e.target.value })
                        }
                    />
                    <div className="input-group-append">
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={this.savePreset}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary dropdown-toggle"
                            data-toggle="dropdown"
                            style={{ borderRadius: 0 }}
                        >
                            Load
                        </button>
                        <div className="dropdown-menu">
                            {this.state.presets.length ? (
                                this.state.presets.map((v, i) => (
                                    <a
                                        className="dropdown-item"
                                        key={i}
                                        onClick={() => this.loadPreset(v.name)}
                                    >
                                        {v.name}
                                    </a>
                                ))
                            ) : (
                                <span className="dropdown-item-text">
                                    No saved entries
                                </span>
                            )}
                        </div>
                        <button type="button" className="btn btn-outline-danger" style={{ borderLeft: 0 }} onClick={this.deletePreset}>Delete</button>
                    </div>
                </div>
                <div className="input-group input-group-sm">
                    <input type="text" className="form-control" style={{ fontFamily: "monospace" }} readOnly />
                    <div className="input-group-append">
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={this.clearState}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export { StateStorage };
