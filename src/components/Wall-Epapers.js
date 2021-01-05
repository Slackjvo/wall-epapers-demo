import React from 'react'
import axios from 'axios'

//Components
import Images from './Images'

export default class WallEpapers extends React.Component{
	constructor(props){
		super(props)
		this.getWallpapers = this.getWallpapers.bind(this)
		this.getRandomWallpapers = this.getRandomWallpapers.bind(this)
		this.state = {
			images: [],
			totalPages: 0,
			results: -1,
			page: -1,
			loadingImagesGif: false
		}
	}

	//Function to call to our api to get the images by name
	async getWallpapers(firstTime=true,mobile=false){
		if(firstTime)	await this.setState({page:-1,images:[],totalPages:0})
		await this.setState({page:this.state.page+1, loadingImagesGif: true})
		try{
			if(this.props.nameSearched !== '' || !firstTime && this.state.page <= this.state.totalPages){
				const res = await axios.post(`/api/images/filter`, {name:this.props.nameSearched,page:this.state.page,mobile:mobile})
				const {results,images} = {...await res.data}
				console.log(results)
				console.log(firstTime)
				if(firstTime) await this.setState({totalPages:Math.ceil(results/36)-1, results:results})
				if(images.length>0) {
					const imagesArray = images.map(image => ({id:image.id,url:image.url,thumbUrl:image.thumb,width:image.width.toString(),height:image.height.toString()}))
					this.setState({images: [...this.state.images, ...imagesArray]})
				}
			}
		}catch(err){
			console.log(err)
		}
		this.setState({loadingImagesGif: false})
	}

	//Function to call to our api to get random images
	async getRandomWallpapers(mobile=false){
		this.setState({loadingImagesGif: true})
		try{
			const res = await axios.post(`/api/images/random`, {mobile:mobile})
			const images = await res.data
			if(images.length>0) {
				const imagesArray = images.map(image => ({id:image.id,url:image.url,thumbUrl:image.thumb,width:image.width.toString(),height:image.height.toString()}))
				this.setState({images: [...this.state.images, ...imagesArray]})
			}
		}catch(err){
			console.log(err)
		}
		this.setState({loadingImagesGif: false})
	}

	componentDidMount() {
		if(this.props.mode === 'random')	this.getRandomWallpapers((this.props.classDevice === 'desktop' ? false : true))
	}

	componentDidUpdate(prevProps) {
		if((prevProps.mode !== 'random' && prevProps.mode == this.props.mode) && prevProps.nameSearched !== this.props.nameSearched){
			this.getWallpapers(true,(this.props.classDevice === 'desktop' ? false : true))
		}
	}

	render() {
		return(
			<div>
				<Images mode={this.props.mode} images={this.state.images} getWallpapers={this.getWallpapers} results={this.state.results} classDevice={this.props.classDevice} />
				<img className={`loading ${(this.state.loadingImagesGif ? '' : 'hide')}`} src="/img/loading.gif" />
			</div>
		)
	}
}