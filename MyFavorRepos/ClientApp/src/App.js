import React, { Component } from 'react';
 
import './custom.css'
import Search from './Search.js';
import TblShuttle from './TblShuttle.js';

export default class App extends Component {
  
render () {
    return (
       
            <div className="layui-container">
                <div className="layui-row" style={{ minHeight: 20 }}>
                    <div className="layui-row" style={{ lineHeight: 4 }}>
                        <span> My Favor Repos</span>
                    </div>
                    <Search />
                </div>
                <TblShuttle />
            </div>
      
    );
  }
}
