class App {
    constructor() {
        this.state = {
            activeVid: 'videoTravel'
        };
    }

    init() {
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

            const video = document.getElementById('videoTravel');
            const locVid = document.getElementById('videoLocation');
            //video.play();

            document.getElementById('play-button')
                .addEventListener('click', function() {
                    video.play();
                });

            document.getElementById('pause-button')
                .addEventListener('click', function() {
                    video.pause();
                    locVid.pause();
                });

            document.getElementById('location-button')
                .addEventListener('click', function() {
                    video.pause();

                    locVid.play();
                });
        });
    }
}

const app = new App();
app.init();
