import React from 'react';

function Icon(props) {
  return (
    <a href="#" onClick={props.method} className="icon">
      <img className="icon-image" src={`../${props.image}`} alt={`${props.name} Icon Image`} />
      <h2 className="name">{props.name}</h2>
    </a>
  );
}

export default Icon;
