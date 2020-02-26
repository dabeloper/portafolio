// @author DABELOPER
import React, { Component } from 'react';

class Feature extends Component {
    render() {
        return (
        <div className="image fit">
            <i onClick={() => { this.props.onClick(this.props.data);}}>
            <img src={ !this.props.data.img ? 'assets/images/' + this.props.data.title.replace(' ', '_') + '.png' : this.props.data.img } alt="" /></i>
        </div>
        );
    }

}

export default Feature;