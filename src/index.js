import React from 'react'
import { render } from 'react-dom'
import Modal from 'react-modal'

//Components
import SearchImages from './components/SearchImages'
Modal.setAppElement(document.querySelector('.app'))
const app = document.querySelector('.app')
render(<SearchImages classDevice={app.dataset.device} />, app)