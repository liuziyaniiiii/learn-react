import React, { Component } from 'react'
import List from './component/List'
import Search from './component/Search'



export default class Chapter extends Component {
    render() {
        return (
            <div>
                <Search/>
                <List/>
            </div>
        )
    }
}
