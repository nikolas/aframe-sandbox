class App {
    constructor() {
        this.state = {
            video: 'videoTravel'
        };

        this.videoSelectors = [
            'videoTravel',
            'videoLoc'
        ];
    }

    hideInactiveVideos() {
        const me = this;
        this.videoSelectors.forEach(function(s) {
            if (s !== me.state.video) {
                pauseVideo(s);
                hideVideo(s);
            }
        });
    }

    playVideo(selector) {
        const video = document.getElementById(selector);
        const vidSphere = document.getElementById(selector + '-sphere');

        if (video) {
            video.play();
        }

        if (vidSphere) {
            vidSphere.setAttribute('visible', true);
        }
    }

    pauseVideo(selector) {
        const video = document.getElementById(selector);

        if (video) {
            video.pause();
        }
    }

    hideVideo(selector) {
        const vidSphere = document.getElementById(selector + '-sphere');            if (vidSphere) {
            vidSphere.setAttribute('visible', false);
        }
    }

    init() {
        const me = this;

        AFRAME.registerComponent('menu', {
            init: function() {
            }
        });

        AFRAME.registerComponent('hotspot1', {
            init: function() {
                console.log('hi!');
                this.el.addEventListener('click', function() {
                    console.log('click!');

                });
            }
        });

        AFRAME.registerComponent('travelVideo', {
            init: function() {
                console.log('travelVid init!');

                this.el.addEventListener('click', function() {
                    console.log('travelVideo click!');
                    // 1. play new video

                    // 2. show hotspot
                });
            }
        });

        document.addEventListener('DOMContentLoaded', function(event) {
            const vrButton = document.querySelector('.a-enter-vr');
            console.log('vrButton', vrButton);
            if (vrButton) {
                vrButton.remove();
            }

            const travelVid = document.getElementById('videoTravel');
            const locVid = document.getElementById('videoLocation');
            //video.play();

            document.getElementById('play-button')
                .addEventListener('click', function() {
                    me.playVideo(me.state.video);
                });

            document.getElementById('pause-button')
                .addEventListener('click', function() {
                    me.pauseVideo(me.state.video);
                });

            document.getElementById('location-button')
                .addEventListener('click', function() {
                    travelVid.pause();

                    me.state.video = 'videoLocation';
                    me.playVideo(me.state.video);
                });
        });
    }
}

const app = new App();
app.init();
