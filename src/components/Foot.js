// @author DABELOPER
import React, { Component } from 'react';

class Foot extends Component {
    render () {
        return (
			<footer id="footer">
				<a href="/#" className="info fa fa-info-circle"><span>Acerca</span></a>
				<div className="inner">
					<div className="content">
						<h3>Un poco sobre mi</h3>
						<p>	Quizá mi interes por la tecnología provino de los videojuegos, el auge del internet, mi curiosidad o una causalidad... como sea, trato de leer mucho para enterarme; 
							como dato interesante, la palabra tecnología se desglosa en <b>logos</b> y <b>tecno</b>, la cual proviene del 
							griego τέχνη cuya traduccion es tecnica, arte o destreza (que loco, cierto!?), de allí mi creencia a que el desarrollo de aplicaciones es un arte, 
							y como en todo buen arte, el artista se tomara su tiempo para su obra maestra.
						</p>
					</div>
					<div className="copyright">
						<p>
							Por ultimo, quisiera contar que soy un aventurero, fotografo aficionado y autodidacta, lo que me ha llevado a trabajar muchos proyectos en solitario y me ha ido bien, 
							pero tambien he tenido la oportunidad de trabajar con super equipos y nos ha ido super bien, en conclusión, 
							solo soy un poco de todo lo que he encontrado en mi camino y caminar es mi pasión...
						</p>
                        {/*<!-- <h3>Contáctame</h3> --> */}
						<ul className="icons">
							<li><a href="https://twitter.com/dabeloper" rel="noopener noreferrer" target="_blank" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
							<li><a href="https://facebook.com/dabeloper" rel="noopener noreferrer" target="_blank" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
							<li><a href="https://instagram.com/dabeloper" rel="noopener noreferrer" target="_blank" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
							<li><a href="https://github.com/dabeloper" rel="noopener noreferrer" target="_blank" className="icon fa-github"><span className="label">Github</span></a></li>
							<li><a href="mailto:dabeloper@gmail.com" rel="noopener noreferrer" target="_blank" className="icon fa-at"><span className="label">Mail</span></a></li>
						</ul>
						&copy; DABELOPER. 
						<span style={{color: '#ff786a'}}>	Diseño: <a style={{color: '#ff786a'}} href="https://templated.co" rel="noopener noreferrer" target="_blank" >TEMPLATED</a>. 	</span>
					</div>
				</div>
			</footer>
        );
    }
}

export default Foot;