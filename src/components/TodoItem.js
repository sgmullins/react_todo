import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class TodoItem extends Component {
	getStyle = () => {
		return {
			background: '#f4f4f4',
			padding: '10px',
			borderBottom: '1px #ccc dotted',
			textDecoration: this.props.todo.completed ? 'line-through' : 'none'
		}
	}

	render() {
		//Dectructuring this.props.todo so that we can just use short hand title and id
		const { id, title } = this.props.todo
		return (
			// one way to apply style is through a function which allows dynamic changes
			<div style={this.getStyle()}>

				<p>
					<input type="checkbox" onChange={this.props.markComplete.bind(this, id)} />
					{title}
					<button style={btnStyle} onClick={this.props.delTodo.bind(this, id)}>X</button>
				</p>
			</div>
		)
	}
}

//PropTypes
TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
	markComplete: PropTypes.func.isRequired,
	delTodo: PropTypes.func.isRequired
}

const btnStyle = {
	background: 'red',
	color: 'white',
	border: 'none',
	padding: '5px 9px',
	borderRadius: '50%',
	cursor: 'pointer',
	float: 'right'
}

export default TodoItem;
