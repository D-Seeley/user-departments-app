import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

/*
class DefaultView extends Component {
    constructor () {
        super()
        this.state = {
            content = null
        }
    }

    async componentDidMount() {
       const users = await axios.get('/api/dimension')
       this.state.content = users;

    }

    render() {
        return (<p>{this.state.content}</p>)
        
    }
}
*/

class Main extends Component {
    constructor() {
        super();
        this.state = {
            selected: "hi, all",
            content: ""
        }

    }

    async componentDidMount() {
        const content = await axios.get('/api/dimension')
            .then(dimensions => dimensions.data.map((dimension) => dimension.dimension))
        this.setState({ content: content, })
    }

    render() {
        return ( 
            <div>
                <h1>Which Dimension Are They In</h1>
                <p>{this.state.content}</p>
            </div>
        )
    }
}


ReactDOM.render(<Main />, document.getElementById('app'))

//Build Views in React
//Set state of selected
//Assign View to render output based on selection