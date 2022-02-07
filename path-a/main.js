class App {
    constructor() {
        this.state = {
            video: 'videoTravel'
        };
    }

    playActiveVideo() {
        const video = document.getElementById(this.state.video);
        if (video) {
            video.play();
        }
    }

    pauseActiveVideo() {
        const video = document.getElementById(this.state.video);
        if (video) {
            video.pause();
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
                    me.state.video = 'videoTravel';
                    me.playActiveVideo();
                });

            document.getElementById('pause-button')
                .addEventListener('click', function() {
                    me.pauseActiveVideo();
                });

            document.getElementById('location-button')
                .addEventListener('click', function() {
                    travelVid.pause();

                    me.state.video = 'videoLocation';
                    me.playActiveVideo();
                });
        });
    }
}

const app = new App();
app.init();
