import React from 'react';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onClick } = this.props;

    return (
      <button
        type="button"
        aria-label="Save"
        className="icon-save"
        style={{
          height: 15,
          width: 10,
          borderRadius: '50%',
          boxSizing: 'border-box',
          outline: 'none',
          marginRight: '5px',
        }}
        onClick={onClick}
      />
    );
  }
}

export default Pagination;
