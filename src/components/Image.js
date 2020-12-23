import React from 'react'
export default class Image extends React.Component{
	constructor(props){
		super(props)
		this.isImageIntoView = this.isImageIntoView.bind(this)
	}

	isImageIntoView() {
		if(!this.imgElement) return ''
		const rect = this.imgElement.getBoundingClientRect()
		const elemTop = rect.top
		const elemBottom = rect.bottom
		// Only completely visibe elements return true:
		// const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
		// Partially visible elements return true:
		const isVisible = elemTop < window.innerHeight && elemBottom >= 0
		if(isVisible){
			window.removeEventListener('scroll', this.isImageIntoView)
			this.props.getWallpapers(false,(this.props.classDevice === 'desktop' ? false : true))
		}
	}

	componentDidMount() {
		if(this.props.loadImages && this.props.mode === 'normal')	window.addEventListener('scroll', this.isImageIntoView)
	}

	render(){
		return(
			<img onClick={() => this.props.openFullImage(this.props.url)} ref={ (imgElement) => { this.imgElement = imgElement } } className={`image ${this.props.classDevice}`} src={this.props.thumbUrl} data-url={this.props.url} />
		)
	}
}