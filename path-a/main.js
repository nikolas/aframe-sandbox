AFRAME.registerSystem('video', {
    schema: {
        activeVideo: {type: 'string', default: 'videoTravel'}
    },
    init: function() {
    }
});

AFRAME.registerComponent('video', {
    schema: {
        src: {type: 'string', default: ''}
    },
    init: function() {
        if (this.system.data.activeVideo === this.data.src) {
            this.el.object3D.visible = true;
        } else {
            this.el.object3D.visible = false;
        }
    }
});

AFRAME.registerComponent('hotspot1', {
    init: function() {
        this.el.addEventListener('click', function() {
            console.log('click!');
        });
    }
});

AFRAME.registerComponent('play-button', {
    init: function() {
        console.log('play button component');
        this.el.addEventListener('click', function() {
            console.log('click!');
        });
    }
});

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
            vidSphere.object3D.visible = true;
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
            vidSphere.object3D.visible = false;
        }
    }

    init() {
        const me = this;

        document.addEventListener('DOMContentLoaded', function(event) {
            const vrButton = document.querySelector('.a-enter-vr');
            console.log('vrButton', vrButton);
            if (vrButton) {
                vrButton.remove();
            }

            const travelVid = document.getElementById('videoTravel');
            const locVid = document.getElementById('videoLocation');

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
