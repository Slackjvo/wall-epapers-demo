import React from 'react'

export default class SearchImages extends React.Component {
	constructor(props){
		super(props)
		this.handleKeyUp = this.handleKeyUp.bind(this) 
		this.intervalSearch = null
		this.lastSearch = ''

	}

	//Everytime we press a key, it'll wait 750ms and will checkout if the name in searchbox has changed, if so a call to our api will be made
	handleKeyUp(e){
		clearInterval(this.intervalSearch)
		this.intervalSearch = setInterval(() => {
			const nameSearched = e.target.value
			if(this.lastSearch !== nameSearched){
				clearInterval(this.intervalSearch)
				this.props.getWallpapers(true,(this.props.classDevice === 'desktop' ? false : true),nameSearched)
				this.lastSearch = nameSearched
			}
		}, 750);
	}

	render(){
		return(
			<div className="searchImages">
				<form>
					<input onKeyUp={this.handleKeyUp} type="text" id="imageFilter" />
				</form>
			</div>
		)
	}
}