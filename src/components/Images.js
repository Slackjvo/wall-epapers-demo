import React from 'react'
import Modal from 'react-modal'
import Image from './Image'

export default class Images extends React.Component{
	constructor(props){
		super(props)
		this.handleOpenModal = this.handleOpenModal.bind(this)
		this.handleCloseModal = this.handleCloseModal.bind(this)
		this.nextImage = this.nextImage.bind(this)
		this.prevImage = this.prevImage.bind(this)
		this.checkKey = this.checkKey.bind(this)
		this.state = {
			showModal: false,
			selectedImage: {num: 0, url: '', width:'0',height:'0'},
			loadingImage: true
		}
	}

	handleOpenModal(url) {
		let i = this.props.images.findIndex(image => {
			if(image.url === url) return image
		})
		this.setState({ showModal: true, selectedImage:{num:i+1,url:url,width:this.props.images[i].width,height:this.props.images[i].height}})
		window.addEventListener('keydown', this.checkKey)
	}
	  
	handleCloseModal () {
		this.setState({ showModal: false })
		window.removeEventListener('keydown', this.checkKey)
	}

	checkKey(e){
		if (e.keyCode == '37') 	this.prevImage()
		else if (e.keyCode == '39')	this.nextImage()
	}
	
	prevImage(){
		let i = this.props.images.findIndex(image => {
			if(image.url === this.state.selectedImage.url) return image
		})
		i = (i === 0 ? this.props.images.length-1 : i-1)
		if(i >=0) this.setState({loadingImage:true, selectedImage:{num: i+1,url:this.props.images[i].url,width:this.props.images[i].width,height:this.props.images[i].height}})
	}

	nextImage(){
		let i = this.props.images.findIndex(image => {
			if(image.url === this.state.selectedImage.url) return image
		})
		i = (i+1 === this.props.images.length ? 0 : i+1)
		if(i >=0) this.setState({loadingImage:true, selectedImage:{num: i+1,url:this.props.images[i].url,width:this.props.images[i].width,height:this.props.images[i].height}})
	}

	render(){
		return(
			<section className={`images ${this.props.classDevice}`}>
				{(this.props.results >= 0 ? <span className="imagesFound">{this.props.results.toString()} Images Found</span>: '')}
				<Modal 
					isOpen={this.state.showModal}
					contentLabel="fullImage"
					onRequestClose={this.handleCloseModal}
					className={`galleryViewer ${this.props.classDevice}`}
					overlayClassName="backgroundImage"
					shouldCloseOnOverlayClick={true}
				>
					<span className="numImage">{`${this.state.selectedImage.num} of ${this.props.images.length}`}</span>
					<span className="infoImage">{`${this.state.selectedImage.width}px \u00A0 x \u00A0 ${this.state.selectedImage.height}px`}</span>
					<img onClick={this.prevImage} onKeyDown={this.checkKey} className={`back ${this.props.classDevice}`} src="/img/next.png" />
					<img onLoad={() => {this.setState({loadingImage:false})}} className={`fullImage ${(this.state.loadingImage ? 'hide' : '')}`} src={this.state.selectedImage.url} />
					<img onClick={this.nextImage} onKeyDown={this.checkKey} className={`next ${this.props.classDevice}`} src="/img/next.png" />
				</Modal>
				{this.props.images.map((image,i) => <Image key={image.id} mode={this.props.mode} getWallpapers={this.props.getWallpapers} openFullImage={this.handleOpenModal} loadImages={(this.props.images.length - 8 === i ? true : false)} classDevice={this.props.classDevice} numImage={i} thumbUrl={image.thumbUrl} url={image.url} />)}
			</section>
		)
	}
}