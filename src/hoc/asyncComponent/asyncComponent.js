import React, { Component } from 'react'

const asyncComponent = (importComponent) => { //importComponent should be a func ref
   return class extends Component {
       state = {
           component: null //will be set to the dynamically loaded component (importComponent)
       }

       componentDidMount () {
           importComponent()
               .then(cmp => {
                   this.setState({component: cmp.default}); //load the actual component to use
               });
       }

       render () {
           const C = this.state.component;  
           return C ? <C {...this.props} /> : null // if C hasn't been resolved yet
       }
   }
}

export default asyncComponent;
