import React from 'react';
import Pagination from './Pagination';
import CarouselWrapper from './styled/CarouselWrapper';
import Element from './styled/Element';
import ElementWrapper from './styled/ElementWrapper';
import RenderChild from './styled/RenderChild';
import Button from './styled/Button';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    const { children } = props;

    this.state = {
      position: 0,
      page: 0,
      animated: false,
      draggable: true,
      elementsCount: children.length,
    };
    this.timeout = null;
  }

    renderChild = () => {
      const {
        page, animated, position, elementsCount,
      } = this.state;
      const { width, children } = this.props;
      return (
        <ElementWrapper width={width}>
          <RenderChild
            position={position}
            elementMargin={-page * width}
            animated={animated}
            width={width * elementsCount}
          >
            {children}
          </RenderChild>
        </ElementWrapper>
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
        startPointerPosition, draggable, page, elementsCount,
      } = this.state;
      const { width } = this.props;
      const position = startPointerPosition - xPosition;

      if (
        startPointerPosition
            && draggable
            && position <= width
      ) {
        if ((page === 0 && position <= 0)
          || (page === (elementsCount - 1) && position >= 0)) {
          return;
        }
        this.setState({ position });
      }
    }

    pointerEnd = () => {
      const {
        startPointerPosition, draggable, position,
      } = this.state;
      const { width, swipe } = this.props;
      if (startPointerPosition && draggable) {
        this.setState({ startPointerPosition: null, animated: true });
        let { page } = this.state;

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
        const canChangePage = prevState.page < prevState.elementsCount - 1;
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
      const { elementsCount } = this.state;

      const dots = [];
      for (let i = 1; i <= elementsCount; i += 1) {
        dots.push(i);
      }

      return (
        <CarouselWrapper
          role="button"
          tabIndex={0}
          onTouchEnd={this.pointerEnd}
          onMouseUp={this.pointerEnd}
        >
          <Button type="button" onClick={this.onClickLeft}>❮</Button>
          <div
            style={{ outline: 'none' }}
            role="button"
            tabIndex={0}
            onTouchStart={this.onTouchStart}
            onMouseDown={this.onMouseDown}
            onTouchMove={this.onTouchMove}
            onMouseMove={this.onMouseMove}
          >
            {this.renderChild()}
          </div>
          <Element>
            {dots.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Pagination key={i} onClick={this.onPaginationClick(i)} />
            ))}
          </Element>
          <Button type="button" onClick={this.onClickRight}>❯</Button>
        </CarouselWrapper>
      );
    }
}

export default Carousel;
