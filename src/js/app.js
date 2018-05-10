import UI from './ui';
import Ad from './ad';

if (ALTERNATIVE_TEMPLATE) {
  require(`../css/alternative.css`);
} else {
  require(`../css/main.css`);
}

const DIOInt = (function (data) {
  'use strict';
  
  UI.killDefaultDragDrop();
  Ad.create(data);
});

if (MARKETPLACE) {
  // Production Assets (Can't be compiled with webpack. Should paste to already built js.)
  
  // images: [
  //   "[[{"type":"banner","width":320,"height":480}]]",
  //   "[[{"type":"banner","width":320,"height":480}]]",
  //   "[[{"type":"banner","width":320,"height":480}]]"
  // ],
  //   title: "[[{"type":"title"}]]",
  //   rating: "[[{"type":"rating"}]]",
  //   thumbnail: "[[{"type":"thumbnail"}]]"
  DIOInt({
    images: [],
    title: '',
    rating: '',
    thumbnail: ''
  });
} else if (DEVELOPMENT) {
  DIOInt({
    images: [
      'http://wallpaperstock.net/banner-peak_wallpapers_27665_320x480.jpg',
      'http://wallpaperstock.net/banner-peak_wallpapers_27665_320x480.jpg',
      'http://wallpaperstock.net/banner-peak_wallpapers_27665_320x480.jpg'
    ],
    title: 'Jetpack Joyride!',
    rating: 5,
    thumbnail: 'https://halfbrick.helpshift.com/improxy?url=http%3A%2F%2Fis1.mzstatic.com%2Fimage%2Fthumb%2FPurple71%2Fv4%2Fe8%2F3d%2F81%2Fe83d813b-1e5a-623f-0438-185a5aef6321%2Fsource%2F512x512bb.jpg&size=200x200'
  });
}


module.exports = DIOInt;