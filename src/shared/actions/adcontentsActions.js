import { Actions } from "../reducers/AdcontentsReducer";
import { getAdcontents, getImages } from "../lib/apiClients/AppClient";

const poll = (adcontents, app) => ({
  type: Actions.POLL,
  adcontents,
  app
});

export const handlePoll = (token, appId) => async dispatch => {
  const { images } = await getImages(token, appId);
  const { adcontents } = await getAdcontents(token, appId, images);
  var adcontents_with_preview = adcontents.map(adcontent => addPreviewImage(adcontent, images));
  dispatch(poll(adcontents_with_preview, appId));
};

const addPreviewImage = (adcontent, images) => {
  
  // if (adcontent.video && adcontent.video.includes('youtube.com')) {
  //   var video_id = adcontent.video.split('embed/')[1];
  //   if (video_id) {
  //     var ampersandPosition = video_id.indexOf('&');
  //     if(ampersandPosition != -1) {
  //       video_id = video_id.substring(0, ampersandPosition);
  //     }
  //     adcontent.preview_url = 'https://img.youtube.com/vi/' + video_id + '/hqdefault.jpg';
  //     return adcontent;
  //   }
  // }

  if (adcontent.image) {
    const cImage = images.find(image => image.id == adcontent.image);
    if (cImage) {
      adcontent.preview_url = cImage.url;
    }
  }

  return adcontent;
}