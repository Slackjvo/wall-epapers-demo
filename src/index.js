import React from 'react'
import { render } from 'react-dom'
import Modal from 'react-modal'

//Components
import WallEpapers from './components/Wall-Epapers'

Modal.setAppElement(document.querySelector('.app'))
const app = document.querySelector('.app')
render(<WallEpapers mode={"normal"} classDevice={app.dataset.device} />, app)