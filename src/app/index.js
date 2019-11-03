import React from 'react';
import Weather from '@c';


export default class App extends React.Component{
    render(){
        return (
            <div className="container d-flex justify-content-center">
              <Weather />
            </div>
        );
    }
}
