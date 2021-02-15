import React from 'react';
import {hot} from 'react-hot-loader';
import Pagination from './Components/Pagination';


class App extends React.Component {
    constructor(props) {
        super(props);

        fool()

        this.state = {
            position: 0,
            page: 0,
            animated: false,
            isDown: false,
            draggable: true,
        }

        this.colors = [];
        for (let i = 0; i < 10; i++) {
            this.colors.push(`rgb(${
                Math.floor(Math.random() * 256)
            }, ${
                Math.floor(Math.random() * 256)
            }, ${
                Math.floor(Math.random() * 256)
            })`)
        }
        this.timeout = null;
    }


    renderArr = () => {
        const arr = []
        const {width = 400} = this.props
        for (let i = 0; i < 10; i++) {
            arr.push(
                <div style={{
                    width,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: "flex",
                }} key={i}>
                    <div style={{width: 200, height: 400, backgroundColor: this.colors[i]}}>
                        <div>{i}</div>
                    </div>
                </div>
            )
        }
        return arr;
    }

    renderChild = () => {
        const {width = 200} = this.props;
        const {page, position, animated} = this.state;
        return (
            <div style={{
                display: "flex",
                flexDirection: 'row',
                transform: `translate(${-position}px, ${0}px)`,
                marginLeft: page * width,
                transition: animated ? 'all 300ms 0ms' : '',
            }}>
                {this.renderArr()}
            </div>
        )
    }

    pointerStart = (xPosition) => {
        if (this.state.draggable) {
            this.setState({startPointerPosition: xPosition, animated: false})
        }
    }
    pointerMove = (xPosition) => {
        const {width = 200} = this.props;
        const position = this.state.startPointerPosition - xPosition

        if (
            this.state.startPointerPosition
            && this.state.draggable
            && Math.abs(position) <= width
        ) {
            if (
                (this.state.page === 0 && position <= 0)
                || (Math.abs(this.state.page) === (this.colors.length - 1) && position >= 0)
            ) {
                return
            }
            this.setState({position});
        }
    }

    pointerEnd = () => {
        if (this.state.startPointerPosition && this.state.draggable) {
            this.setState({startPointerPosition: null, animated: true});
            let page = this.state.page;

            if (this.state.position < -40 && page < 0) {
                this.setState({position: -200, draggable: false});
                page += 1;
            } else if (this.state.position > 40 && page > -9) {
                this.setState({position: 200, draggable: false});
                page -= 1;
            } else {
                this.setState({position: 0, draggable: false})
            }

            setTimeout(() => {
                this.setState({position: 0, page, animated: false, draggable: true})
            }, 300)
        }
    }

    onTouchStart = (e) => this.pointerStart(e.touches[0].pageX)

    onMouseDown = (e) => this.pointerStart(e.pageX)

    onTouchMove = (e) => this.pointerMove(e.touches[0].pageX)

    onMouseMove = (e) => {
        e.preventDefault();
        this.pointerMove(e.pageX);
    }

    onClickLeft = () =>
    {this.setState((prevState) => ({
        page: Math.abs(prevState.page + 1) > this.colors.length - 10 ? prevState.page : prevState.page + 1,
        animated: true
    }))}

    onClickRight = () =>
    {this.setState((prevState) => ({
        page: Math.abs(prevState.page - 1) >= this.colors.length ? prevState.page : prevState.page - 1,
        animated: true
    }))}

    onClick = (i) => () => {
        this.setState({page: -i, animated: true})}




    render() {
        const {width = 200} = this.props;

        const dots = [];
        for (let i = 1; i <= this.colors.length; i++) {
            dots.push(i)
        }

        return (
            <>
                <div className={'wrapper'} style={{
                    flexDirection: 'row',
                    display: 'inline-flex',
                    margin: '0px auto',
                    border: '1px solid black',
                    offset: '10px',
                    width: '100%',
                    justifyContent: 'space-evenly',
                }}>
                    <button onClick={this.onClickLeft}>❮</button>
                    <div
                        onTouchStart={this.onTouchStart}
                        onTouchMove={this.onTouchMove}
                        onTouchEnd={this.pointerEnd}
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.pointerEnd}
                        onMouseMove={this.onMouseMove}
                    >
                        <div style={{
                            margin: '40px',
                            flexShrink: '0',
                            outline: '5px solid black',
                            flex: '1',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            width
                        }}>
                            {this.renderChild()}
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        position: 'absolute',
                        top: '460px',
                    }}>
                        {dots.map((item, i) =>(
                            <Pagination key={i} onClick={this.onClick(i)} />
                        ))}
                    </div>
                    <button onClick={this.onClickRight}>❯</button>
                </div>
            </>
        )
    }
}

export default hot(module)(App);
