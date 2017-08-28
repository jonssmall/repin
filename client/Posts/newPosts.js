'use strict';
import React from 'react';
import service from '../service';

class NewPostContainer extends React.Component {
  constructor(props) {
    super(props);        
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      url: '',
      description: ''
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  handleUpdate(event) {    
    const nextState = this.state;
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  };
  handleSubmit() {        
    //console.log(this.state);
    service.newPost(this.state, res => {
      this.props.addHandler(res);      
    });
  };
  render() {         
    const buttonAttrs = {
      disabled: !(this.state.url && this.state.description),      
      onClick: this.handleSubmit
    };  
    return (
      <div>
        <div>          
          <input type="text" placeholder="Url" name="url" value={this.state.url} onChange={this.handleUpdate} />
        </div>
        <div>          
          <input type="text" placeholder="Description" name="description" value={this.state.description} onChange={this.handleUpdate} />
        </div>        
        <button {...buttonAttrs}>New Post</button>            
      </div>
    )
  };
};

export default NewPostContainer;