import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './DevTeam.css'

class DevTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      active: this.props.active,
      direction: ''
    };
    this.rightClick = this.moveRight.bind(this);
    this.leftClick = this.moveLeft.bind(this);
  }

  generateItems() {
    var items = [];
    var level;
    console.log(this.state.active);
    for (var i = this.state.active - 2; i < this.state.active + 3; i++) {
      var index = i;
      if (i < 0) {
        index = this.state.items.length + i;
      } else if (i >= this.state.items.length) {
        index = i % this.state.items.length;
      }
      level = this.state.active - i;
      items.push(<Item key={index} id={this.state.items[index]} level={level} />);
    }
    return items;
  }

  moveLeft() {
    var newActive = this.state.active;
    newActive--;
    this.setState({
      active: newActive < 0 ? this.state.items.length - 1 : newActive,
      direction: 'left'
    });
  }

  moveRight() {
    var newActive = this.state.active;
    this.setState({
      active: (newActive + 1) % this.state.items.length,
      direction: 'right'
    });
  }

  render() {
    return (
      <div id="carousel" className="noselect">
        <div className="arrow arrow-left" onClick={this.leftClick}>
          <i className="fi-arrow-left"></i>
        </div>
        <TransitionGroup className={this.state.direction}>
          {this.generateItems()}
        </TransitionGroup>
        <div className="arrow arrow-right" onClick={this.rightClick}>
          <i className="fi-arrow-right"></i>
        </div>
      </div>
    );
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: this.props.level
    };
  }

  render() {
    const className = 'item level' + this.props.level;
    const { id } = this.props;
    return (
      <div className={className}
           style={{
             backgroundImage: `url(${id.img})`,
             backgroundSize: 'cover',
             backgroundRepeat: 'no-repeat',
             backgroundPosition: 'center center'
           }}>
        <div className="carousel__text">
          <h3>{id.name}</h3>
          <p>{id.role}</p>
        </div>
      </div>
    );
  }
}

const members = [
  {
    name: 'Seydina Mouhamed Al-Hamine NDIAYE',
    role: 'Chef du developpement Back-End',
    img: '/img/Alhamine.png'
  },
  {
    name: 'Abdoulaye GAYE',
    role: 'Chef de Projet du portail-web L2i',
    img: '/img/Laye.png'
  },
  {
    name: 'Cheikh Mbacké COLY',
    role: 'Chef du developpement Front-End',
    img: '/img/CMC.jpg'
  },
  {
    name: 'Ousmane NDIEGUENE',
    role: 'Developpeur Back-End',
    img: '/img/Mirfou.png'
  },
  {
    name: 'El Abdou DRAME',
    role: 'Developpeur Front-End',
    img: '/img/Eadarak.png'
  },
  {
    name: 'Souleymane DIAGNE',
    role: 'Developpeur Front-End',
    img: '/img/Jules.png'
  },
  {
    name: 'Mouhamed DIAGNE',
    role: 'Developpeur Front-End',
    img: '/img/MhDiagne.png'
  }
];

const DevTeamComponent = () => {
  return <DevTeam items={members} active={0} />;
};

export default DevTeamComponent;
