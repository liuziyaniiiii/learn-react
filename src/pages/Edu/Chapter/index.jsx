import React, { Component } from 'react'
import List from './component/List'
import Search from './component/Search'



export default class Chapter extends Component {
    fullscreenRef = React.createRef();
    render() {
        return (
            <div ref={this.fullscreenRef} style={{backgroundColor:"#f5f5f5"}}>
                <Search/>
                <List fullscreenRef={this.fullscreenRef}/>
            </div>
        )
    }
}
