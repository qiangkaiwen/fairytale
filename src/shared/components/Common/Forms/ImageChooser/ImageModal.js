import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import { ImagesContainer } from "../../../../containers";

const ClickDiv = styled.button`
  font-weight: 700;
  width: 40%;
  font-size: 16px;
  color: black;
  background: white;
  border-style: solid;
  border-width: 2px;
  border-color: gray;
  cursor: pointer;
`;
const StyledModal = styled.div`
  z-index: 10;
  border-style: solid;
  border-color: #aeaca1;
  border-width: 3px;
  border-radius: 20px;
  margin-top: 25px;
  position: fixed;
  top: 0;
  width: 60%;
  height: 70%;
  overflow: auto;
  background: white;
`;

const StyledCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const StDiv = styled.div`
  margin: 5px;
  margin-bottom: 100px;
  display: flex;
  width: 240px;
  height: 240px;
  min-height: 240px;
  flex-direction: column;
`;

const StImg = styled.img`
  width: 180px;
  height: 180px;
`;

const Closespan = styled.span`
  color: red;
  float: right;
  font-size: 28px !important;
  font-weight: bold;
  :hover {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  :focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const StLazyLoad = styled(LazyLoad)``;
class ImageModal extends Component {
  state = {
    open: false
  };

  resolveCurrentImage = () => {
    const cImage = this.props.imagesState.images.find(image => image.id == this.props.currentImage);
    if (cImage) return `${cImage.name}| Valitse`;
    return "Ei kuvaa valittu | Valitse";
  };
  choose = id => () => {
    this.props.setFieldValue(this.props.name, id);
    this.setState({ open: false });
  };
  render() {
    return (
      <div>
        {this.state.open && (
          <StyledModal>
            <Closespan onClick={() => this.setState({ open: false })} className="close">
              &times;
            </Closespan>
            <h3>Valitse kuva</h3>
            <StyledCont>
              <StLazyLoad>
                <StDiv>
                  <StImg
                    alt="ei kuvaa"
                    src="https://placeholder.pics/svg/300/DEDEDE/555555/None"
                    onClick={this.choose(null)}
                  />
                  <div>Ei kuvaa</div>
                </StDiv>
              </StLazyLoad>
              {this.props.imagesState.images.map(image => (
                <StLazyLoad>
                  <StDiv>
                    <StImg alt={image.name} src={image.url} onClick={this.choose(image.id)} />
                    <div>{image.name}</div>
                  </StDiv>
                </StLazyLoad>
              ))}
            </StyledCont>
          </StyledModal>
        )}
        {!this.state.open && (
          <ClickDiv type="button" onClick={() => this.setState({ open: true })}>
            {this.resolveCurrentImage()}
          </ClickDiv>
        )}
      </div>
    );
  }
}

ImageModal.propTypes = {
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  currentImage: PropTypes.number,
  imagesState: PropTypes.shape({
    images: PropTypes.array
  }).isRequired
};

ImageModal.defaultProps = {
  currentImage: null
};

export default ImagesContainer(ImageModal);
