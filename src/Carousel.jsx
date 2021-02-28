import React from 'react';
import Pagination from './Pagination';
import RenderCarousel from './styled/RenderCarousel';
// import RenderChild from './styled/RenderChild';
import Childrens from './styled/Childrens';
import CarouselWrapper from './styled/CarouselWrapper';
// import ElementWrapper from './styled/ElementWrapper';
import Element from './styled/Element';
import ElementWrapper from './styled/ElementWrapper';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 0,
      page: 0,
      animated: false,
      draggable: true,
      width: 200,
    };

    this.colors = [];
    for (let i = 0; i < 10; i += 1) {
      this.colors.push(`rgb(${
        Math.floor(Math.random() * 256)
      }, ${
        Math.floor(Math.random() * 256)
      }, ${
        Math.floor(Math.random() * 256)
      })`);
    }
    this.timeout = null;
  }

    renderCarousel = () => {
      const arr = [];
      for (let i = 0; i < 10; i += 1) {
        arr.push(
          <RenderCarousel
            key={i}
          >
            <Childrens
              color={this.colors[i]}
            >
              <div>{i}</div>
            </Childrens>
          </RenderCarousel>,
        );
      }
      return arr;
    }

    renderChild = () => {
      const {
        page, animated, position, width,
      } = this.state;
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            transform: `translate(${-position}px, ${0}px)`,
            marginLeft: -page * width,
            transition: animated ? 'all 300ms 0ms' : '',
          }}
        >
          {this.renderCarousel()}
        </div>
      );
    }

    pointerStart = (xPosition) => {
      const { draggable } = this.state;
      if (draggable) {
        this.setState({ startPointerPosition: xPosition, animated: false });
      }
    }

    pointerMove = (xPosition) => {
      const {
        startPointerPosition, draggable, page, width,
      } = this.state;
      const position = startPointerPosition - xPosition;

      if (
        startPointerPosition
            && draggable
            && position <= width
      ) {
        if ((page === 0 && position <= 0) || (page === (this.colors.length - 1) && position >= 0)) {
          return;
        }
        this.setState({ position });
      }
    }

    pointerEnd = () => {
      const {
        startPointerPosition, draggable, position, width,
      } = this.state;
      if (startPointerPosition && draggable) {
        this.setState({ startPointerPosition: null, animated: true });
        let { page } = this.state;
        const swipe = 40;

        if (position < -swipe) {
          this.setState({ position: -width, draggable: false });
          page--;
        } else if (position > swipe) {
          this.setState({ position: width, draggable: false });
          page++;
        } else {
          this.setState({ position: 0, draggable: false });
        }

        setTimeout(() => {
          this.setState({
            position: 0, page, animated: false, draggable: true,
          });
        }, 300);
      }
    }

    onTouchStart = (e) => this.pointerStart(e.touches[0].pageX)

    onMouseDown = (e) => this.pointerStart(e.pageX)

    onTouchMove = (e) => this.pointerMove(e.touches[0].pageX)

    onMouseMove = (e) => {
      e.preventDefault();
      this.pointerMove(e.pageX);
    }

    onClickLeft = () => {
      this.setState((prevState) => {
        const canChangePage = prevState.page > 0;
        if (!canChangePage) return null;

        return {
          page: prevState.page - 1,
          animated: true,
        };
      });
    }

    onClickRight = () => {
      this.setState((prevState) => {
        const canChangePage = prevState.page < this.colors.length - 1;
        if (!canChangePage) return null;

        return {
          page: prevState.page + 1,
          animated: true,
        };
      });
    }

    onPaginationClick = (i) => () => {
      this.setState({ page: i, animated: true });
    }

    render() {
      const { width } = this.state;

      const dots = [];
      for (let i = 1; i <= this.colors.length; i += 1) {
        dots.push(i);
      }

      return (
        <>
          <CarouselWrapper
            role="button"
            tabIndex={0}
            onTouchEnd={this.pointerEnd}
            onMouseUp={this.pointerEnd}
          >
            <button type="button" onClick={this.onClickLeft}>❮</button>
            <div
              role="button"
              tabIndex={0}
              onTouchStart={this.onTouchStart}
              onMouseDown={this.onMouseDown}
              onTouchMove={this.onTouchMove}
              onMouseMove={this.onMouseMove}
            >
              <ElementWrapper width={width}>
                {this.renderChild()}
              </ElementWrapper>
            </div>
            <Element>
              {dots.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Pagination key={i} onClick={this.onPaginationClick(i)} />
              ))}
            </Element>
            <button type="button" onClick={this.onClickRight}>❯</button>
          </CarouselWrapper>
        </>
      );
    }
}

export default Carousel;
