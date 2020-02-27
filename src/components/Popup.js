// @author DABELOPER
import React, { Component } from 'react';

class Popup extends Component {

    constructor() {
        super();
        this.onClose = this.onClose.bind(this);
        this.state = {
            background : "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixid=eyJhcHBfaWQiOjEyMDd9",
            images: [ 
                "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixid=eyJhcHBfaWQiOjEyMDd9",
                "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixid=eyJhcHBfaWQiOjEyMDd9",

                "https://images.unsplash.com/photo-1506784242126-2a0b0b89c56a" , 
                "https://images.unsplash.com/photo-1491317002516-6356a658b3e8",
                "https://images.unsplash.com/photo-1536953199170-18706ab6a430",
                "https://images.unsplash.com/photo-1550592704-e397856b4d00",
                "https://images.unsplash.com/photo-1541140911322-98afe66ea6da",
                "https://images.unsplash.com/photo-1568819297129-80fd50360f8e",
                "https://images.unsplash.com/photo-1569360556894-15dca0c6ff1a",
                "https://images.unsplash.com/photo-1532072983668-720aad098512",
                "https://images.unsplash.com/photo-1532073101218-8c90e03fbe68",
                "https://images.unsplash.com/photo-1570290994418-0bc5a1051564",
                "https://images.unsplash.com/photo-1580750174234-f1b4c065669a",

                "https://images.unsplash.com/photo-1518976024611-28bf4b48222e",
                "https://images.unsplash.com/photo-1550432163-9cb326104944",
                "https://images.unsplash.com/photo-1525475711852-ed23365b4d11",
                "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
                "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07",
                "https://images.unsplash.com/photo-1534137667199-675a46e143f3",
                "https://images.unsplash.com/photo-1542903660-eedba2cda473",
                "https://images.unsplash.com/photo-1468070454955-c5b6932bd08d",
                "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
                "https://images.unsplash.com/photo-1535551951406-a19828b0a76b",
                "https://images.unsplash.com/photo-1536148935331-408321065b18",
                "https://images.unsplash.com/photo-1579403124614-197f69d8187b",
                "https://images.unsplash.com/photo-1511376777868-611b54f68947?ixid=eyJhcHBfaWQiOjEyMDd9",
                "https://images.unsplash.com/photo-1579412690850-bd41cd0af397?ixid=eyJhcHBfaWQiOjF9",
                "https://images.unsplash.com/photo-1577020828291-46505cede76d?ixid=eyJhcHBfaWQiOjEyMDd9"
            ]
        }
    }

    onClose() {
        this.props.onClose();
        // this.setState({
        //     background: this.state.images[Math.floor(Math.random() * this.state.images.length)]
        //   });
    }

    render() {
        return (
            <div id="popup-container">
                <div data-pop="anvil" id="popup" className={this.props.control}>
                    <div className="card">
                        <div className="card__image-container">
                            <img className="card__image" src={this.state.background} alt=""/>
                            
                            <i id="popupclose" className="info fa fa-times-circle " onClick={this.onClose} />
                        </div>
                        
                        <svg className="card__svg" viewBox="0 0 800 500">

                            <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333"/>
                            <path className="card__line" d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" strokeWidth="3" fill="transparent"/>
                        </svg>
                        
                        <div className="card__content">
                            <h1 className="card__title"> { this.props.feature.title } </h1>
                            <p> { this.props.feature.description } </p>
                        </div>
                    </div>
                </div>
                <div id="overlay" className={this.props.control} onClick={this.onClose}></div>
            </div>
        );
    }

}

export default Popup;