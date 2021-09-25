import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FlexList } from "../../components";
import { ImagesContainer } from "../../containers";
import ButtonUpdateForm from "./ButtonUpdateForm";

const StyledButton = styled.button`
  width: 100%;
  flex-direction: row;
  display: flex;
`;

const StDiv = styled.div`
  width: 80%;
  text-align: left;
`;

const StImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

class ButtonList extends Component {
  state = {
    button: null
  };

  resolveSource = button => {
    const img = this.props.imagesState.images.find(image => image.id === button.button.logo);
    if (img) return img.url;
    return "";
  };

  renderItem = button => (
    <StyledButton
      key={button.button.background.id}
      onClick={() => this.setState({ button })}
      style={{
        color: button.button.textColor,
        borderStyle: "solid",
        boxShadow: button.button.shadow ? "7px 8px 14px 1px black" : null,
        opacity: button.button.background.backgroundOpacity,
        background: button.button.background.backgroundColor,
        fontSize: "19px",
        borderColor: button.button.border.color,
        borderWidth: button.button.border.width,
        borderRadius: button.button.border.radius
      }}
    >
      <StImg alt={button.title} src={this.resolveSource(button)} />
      <StDiv>
        <span>{button.button.titles.find(t => t.language === "fi").text}</span>
      </StDiv>
    </StyledButton>
  );
  render() {
    if (this.props.buttons.length === 0) return <div>Ei nappuloita</div>;
    const sortedButtons = this.props.buttons.sort((aTab, bTab) => aTab.order - bTab.order);
    return (
      <div>
        {this.state.button && (
          <ButtonUpdateForm
            close={() => this.setState({ button: null })}
            app={this.props.app}
            button={this.state.button}
            updateHomeScreen={this.props.updateHomeScreen}
          />
        )}
        <FlexList itemResolver={this.renderItem} data={sortedButtons} />
      </div>
    );
  }
}

ButtonList.propTypes = {
  app: PropTypes.number.isRequired,
  updateHomeScreen: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object),
  imagesState: PropTypes.shape({
    images: PropTypes.array
  }).isRequired
};

ButtonList.defaultProps = {
  buttons: []
};

export default ImagesContainer(ButtonList);
