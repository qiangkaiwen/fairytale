import React, { Component } from "react";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import styled from "styled-components";
import { UserContainer, AppsContainer, ImagesContainer } from "../../containers";
import { deleteImage } from "../../lib/apiClients/AppClient";
import { NotificationManager } from "react-notifications";

const StyledCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const StDiv = styled.div`
  margin: 1%;
  margin-bottom: 100px;
  display: flex;
  width: 30%;
  height: 30%;
  flex-direction: column;
  position: relative;
`;

const StImg = styled.img`
  width: 100%;
  height: 100%;
`;

const StImgDelete = styled.img`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 30px;
`;

const StLazyLoad = styled(LazyLoad)``;

class ImageGrid extends Component {
  componentDidMount() {
    const { token } = this.props.userState;
    const appId = this.resolveAppId();
    const { handlePoll } = this.props.imagesActions;
    handlePoll(token, appId);
  }

  resolveAppId = () => {
    const { active, apps } = this.props.appsState;
    return active ? active.id : apps[0].id;
  };

  handleDelete = async (imageId) => {
    if (confirm('Are you sure?')) {
      try {
        const { userState } = this.props;
        const { token } = userState;
        const appId = this.resolveAppId();
        
        await deleteImage(token, appId, imageId);
        NotificationManager.success("Päivitetty");

        const { handlePoll } = this.props.imagesActions;
        handlePoll(token, appId);
      } catch (error) {
        console.log(error);
        NotificationManager.error("Päivitys epäonnistui");
      }
    }
  };

  render() {
    return (
      <StyledCont>
        {this.props.imagesState.images.map(image => (
          <StLazyLoad>
            <StDiv key={image.url}>
              <StImgDelete src='assets/delete.png' onClick={()=>this.handleDelete(image.id)}/>
              <StImg alt={image.name} src={image.url} />
              <div>{image.name}</div>
            </StDiv>
          </StLazyLoad>
        ))}
      </StyledCont>
    );
  }
}

ImageGrid.propTypes = {
  appsState: PropTypes.shape({
    apps: PropTypes.array,
    active: PropTypes.object
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  imagesState: PropTypes.shape({
    app: PropTypes.number,
    images: PropTypes.array
  }).isRequired,
  imagesActions: PropTypes.shape({
    handlePoll: PropTypes.func
  }).isRequired
};

export default ImagesContainer(AppsContainer(UserContainer(ImageGrid)));
