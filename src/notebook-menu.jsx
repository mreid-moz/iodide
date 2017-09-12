import React from 'react'
import { Button, ButtonToolbar, ToggleButtonGroup, ToggleButton, Label, DropdownButton, MenuItem } from 'react-bootstrap'

/*

save
save as
load
new notebook

*/

function stateIsValid(state) {
	// TODO - fill this out and figure out if everything is in order.
	return state !== undefined // for now ...
}

class NotebookMenu extends React.Component {
	constructor(props) {
		super(props)
	}

	selectMenuItem(menuItem, evt) {
		if (menuItem=='saveNotebook') this.props.actions.saveNotebook()
		if (menuItem=='deleteNotebook') this.props.actions.deleteNotebook(this.props.currentTitle)
		if (menuItem=='exportNotebook') this.props.actions.exportNotebook()
		if (menuItem=='importNotebook') document.getElementById('import-notebook').click()//triggers notebookFileImport
	}

	loadNotebook(notebookName) {
		this.props.actions.loadNotebook(notebookName)
	}

	notebookFileImport(evt) {
		var fn = evt.target.files[0]
		var reader = new FileReader()
		reader.onload = (result) => {
			var newState
			try {
				newState = JSON.parse(result.target.result)	
			} catch(e) {
				console.error(e)
			}
			
			if (stateIsValid(newState)) {
				this.props.actions.importNotebook(newState)
			}
			
		}
		reader.readAsText(fn)
	}

	render() {
		var notebookNames = Object.keys(localStorage).map((n)=> {
			return <MenuItem eventKey={n} key={n} id={n}> {n} </MenuItem>
		})
		if (notebookNames.length) {
			notebookNames = <DropdownButton onSelect={this.loadNotebook.bind(this)} bsSize="xsmall" title='Notebooks' id='load-notebook'> {notebookNames} </DropdownButton>
		}
		return (
			<div className='notebook-actions'>
			    <input id='import-notebook' 
			    	name='file'
			    	type='file' style={{display:'none'}} onChange={this.notebookFileImport.bind(this)} 
			    />
          		<a id='export-anchor' style={{display:'none'}} ></a>
				<ButtonToolbar>
					<DropdownButton bsSize="xsmall" id='main-menu' bsStyle='default' title="Menu" onSelect={this.selectMenuItem.bind(this)} >
						<MenuItem   eventKey={"saveNotebook"} >Save Notebook</MenuItem>
						<MenuItem   eventKey={"deleteNotebook"} >Delete Notebook</MenuItem>
						<MenuItem   eventKey={"importNotebook"} >Import Notebook</MenuItem>
						<MenuItem   eventKey={"exportNotebook"} >Export Notebook</MenuItem>
						<MenuItem   eventKey={'new'} >New Notebook</MenuItem>
					</ DropdownButton>
						{notebookNames}
				</ButtonToolbar>
			</div>
		)
	}
}

export default NotebookMenu