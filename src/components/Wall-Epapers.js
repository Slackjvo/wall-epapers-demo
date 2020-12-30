import React from 'react'
import axios from 'axios'

//Components
import Images from './Images'
import SearchImages from './SearchImages'

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
			nameSearched: '',
			loadingImagesGif: false
		}
	}

	//Function to call to our api to get the images by name
	async getWallpapers(firstTime=true,mobile=false,nameSearched=''){
		if(firstTime)	this.setState({page:-1,images:[],nameSearched:nameSearched,totalPages:0})
		this.setState({page:this.state.page+1, loadingImagesGif: true})
		try{
			if(this.state.nameSearched !== '' || !firstime && this.state.page <= this.state.totalPages){
				const res = await axios.post(`/api/images/filter`, {name:this.state.nameSearched,page:this.state.page,mobile:mobile})
				const {results,images} = {...await res.data}
				if(firstTime) this.setState({totalPages:Math.ceil(results/36)-1, results:results})
				if(images.length>0) {
					const imagesArray = images.map(image => ({id:image.id,url:image.url,thumbUrl:image.thumb}))
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
				const imagesArray = images.map(image => ({id:image.id,url:image.url,thumbUrl:image.thumb}))
				this.setState({images: [...this.state.images, ...imagesArray]})
			}
		}catch(err){
			console.log(err)
		}
		this.setState({loadingImagesGif: false})
	}

	componentDidMount() {
		if(this.props.mode === 'random'){
			this.getRandomWallpapers((this.props.classDevice === 'desktop' ? false : true))
		}
	}

	render() {
		return(
			<React.Fragment>
				{this.props.mode === 'normal' &&
					<SearchImages getWallpapers={this.getWallpapers} classDevice={this.props.classDevice} />
				}
				<Images mode={this.props.mode} images={this.state.images} getWallpapers={this.getWallpapers} results={this.state.results} classDevice={this.props.classDevice} />
				<img className={`loading ${(this.state.loadingImagesGif ? '' : 'hide')}`} src="/img/loading.gif" />
			</React.Fragment>
		)
	}
}