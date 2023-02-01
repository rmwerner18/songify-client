import React from 'react';

class SongNameForm extends React.Component {
  state = {
    value: '',
  };

  changeHandler = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <form
        className='song-name'
        onSubmit={(e) => this.props.submitHandler(e, this.state.value)}
      >
        <p>Please give your masterpiece a name</p>
        <div className='song-name-input'>
          <input
            type='text'
            name='songname'
            onChange={this.changeHandler}
            value={this.state.value}
          />
          <input type='submit' />
        </div>
      </form>
    );
  }
}

export default SongNameForm;
