// @author DABELOPER
import React, { Component } from 'react';

class Head extends Component {
    render () {
        return (
			<header id="header">
				<div className="inner">
					<div className="content">
						<h1>DABELOPER</h1>
						<h2>Bienvenido a mi portafolio, conoce mis cualidades .</h2>
						<a href="/#" className="button big alt"><span>Comencemos</span></a>
					</div>
					<a href="/#" className="button hidden"><span>Comencemos</span></a>
				</div>
			</header>
        );
    }
}

export default Head;