import React from 'react'

//Components
import WallEpapers from './Wall-Epapers'

export default class SearchImages extends React.Component {
	constructor(props){
		super(props)
		this.handleKeyUp = this.handleKeyUp.bind(this) 
		this.intervalSearch = null
		this.state = {
			nameSearched:'',
			lastSearch: ''
		}

	}

	//Everytime we press a key, it'll wait 750ms and will checkout if the name in searchbox has changed, if so a call to our api will be made
	handleKeyUp(e){
		clearInterval(this.intervalSearch)
		this.intervalSearch = setInterval(() => {
			const nameSearched = e.target.value
			if(this.state.lastSearch !== nameSearched){
				this.setState({nameSearched:nameSearched,lastSearch:nameSearched})
				clearInterval(this.intervalSearch)
			}
		}, 750);
	}

	render(){
		return(
			<React.Fragment>
				<div className="searchImages">
					<form>
						<input onKeyUp={this.handleKeyUp} type="text" id="imageFilter" />
					</form>
				</div>
				<WallEpapers mode={"normal"} classDevice={this.props.classDevice} nameSearched={this.state.nameSearched} />
			</React.Fragment>
		)
	}
}