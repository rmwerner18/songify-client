export const userLikesSong = (props) => {
    return props.song.likes.find(like => like.user_id === props.user.id)
}