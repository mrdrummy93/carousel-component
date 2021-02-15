import React from "react";

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {onClick} = this.props

        return (
            <button
                style={{
                    height: 15,
                    width: 10,
                    borderRadius: '50%',
                    boxSizing: 'border-box',
                    outline: 'none',
                    marginRight: '5px',
                }}
                onClick={onClick}> </button>
        )
    }

}


export default Pagination