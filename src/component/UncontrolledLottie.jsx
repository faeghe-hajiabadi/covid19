    // UncontrolledLottie.jsx
import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from '../animations/loading.json';

class UncontrolledLottie extends Component {

 
  render(){
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
      }
    };
    const heightTotal = this.props.size ? this.props.size.height : '';
    return(
      <div>
        <Lottie style={{height:heightTotal}} options={defaultOptions}
              height={200}
              width={200}
        />
      </div>
    )
  }
}

export default UncontrolledLottie