import React, {
	Component,
	View,
	TouchableOpacity,
	StyleSheet,
	Text,
	PropTypes
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from './base/Spinner';


class CommentUp extends Component {
	static propTypes = {
		pending: PropTypes.bool,
		disabled: PropTypes.bool,
		replyId: PropTypes.string,
		ups: PropTypes.array,
		userId: PropTypes.string
	};


	static defaultProps = {
		pending: false,
		disabled: false,
		ups: []
	};


	_onUpPress() {
		const {disabled, pending, upReply, replyId, userId, topicId} = this.props;
		if (disabled) {
			return window.alert('不能给自己点赞哦!')
		}
		if (pending) return;

		upReply({
			replyId,
			userId,
			topicId
		});
	}


	_isUped() {
		return this.props.ups.some(item=> {
			return item == this.props.userId
		})
	}


	_renderUpIcon() {
		if (this.props.pending) {
			return (
				<Spinner
					size='small'
					style={styles.loading}
				/>
			)
		}
		return (
			<Icon
				name={'thumbsup'}
				size={16}
				color={this._isUped() ? '#3498DB':'rgba(0,0,0,0.2)'}
				style={styles.upIcon}
			/>
		)
	}


	render() {
		const {ups} = this.props;
		let count = ups.length;
		return (
			<TouchableOpacity
				onPress={this._onUpPress.bind(this)}>
				<View style={this.props.style}>

					{this._renderUpIcon()}

					{count == 0 ? null : (<Text style={styles.text}>{count}</Text>)}
				</View>
			</TouchableOpacity>
		)
	}
}


const styles = StyleSheet.create({
	text: {
		paddingLeft: 7,
		fontSize: 12,
		color: 'rgba(0,0,0,0.2)',
		height: 12
	},
	loading: {
		height: 12,
		width: 16
	}
});


export default CommentUp;
