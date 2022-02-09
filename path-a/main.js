/**
 * Based loosely on a-frame's "camera" system.
 */
AFRAME.registerSystem('video', {
    schema: {
        activeVideo: {type: 'string', default: 'videoTravel'}
    },

    init: function() {
        this.activeVideoEl = null;
        this.activeVideoEl = document.createElement('a-entity');
        this.activeVideoEl.setAttribute('camera', {
            activeVideo: this.data.activeVideo
        });

        const me = this;

        this.videoSelectors = [
            'videoTravel',
            'videoLoc'
        ];

        // Attach to the video UI button events. Note that these are
        // outside of the <a-scene>.
        document.getElementById('play-button')
            .addEventListener('click', function() {
                console.log('play');
                me.playVideo();
            });

        document.getElementById('pause-button')
            .addEventListener('click', function() {
                console.log('pause');
                me.pauseVideo();
            });

        document.getElementById('location-button')
            .addEventListener('click', function() {
                me.pauseVideo();

                me.setActiveVideo('videoLocation');

                me.playVideo();
            });
    },

    getActiveVideo: function() {
        console.log(this.sceneEl);
        const videoEls = this.sceneEl.querySelectorAll(
            'a-videosphere, [videosphere]');
        console.log('getActiveVideo', videoEls);
        for (let i = 0; i < videoEls.length; i++) {
            let videoEl = videoEls[i];
            if (videoEl && videoEl.components.video.data.active) {
                console.log('found active video', videoEl);
                return videoEl.components.video.data.src;
            }
        }

        return null;
    },

    // play active video
    playVideo: function() {
        console.log('system playVideo');
        const activeVideo = this.getActiveVideo();
        const video = document.getElementById(activeVideo);
        const vidSphere = document.getElementById(activeVideo + '-sphere');
        console.log('v', activeVideo, video, vidSphere);

        if (vidSphere) {
            vidSphere.object3D.visible = true;
        }

        if (video) {
            video.play();
        }
    },

    pauseVideo: function() {
        const activeVideo = this.getActiveVideo();
        const video = document.getElementById(activeVideo);

        if (video) {
            video.pause();
        }
    },

    /**
     * Set active video/videosphere.
     * Stops and hides all other videos in the scene.
     */
    setActiveVideo: function(activeVideoSrc) {
        const videoEls = this.sceneEl.querySelectorAll(
            'a-videosphere, [videosphere]');
        for (let i = 0; i < videoEls.length; i++) {
            videoEl = videoEls[i];

            if (videoEl.src === activeVideoSrc) {
                continue;
            }
            console.log('disabling video', videoEl);
            videoEl.setAttribute('active', false);
            videoEl.pause();
        }
    }
});

/**
 * Based loosely on a-frame's "camera" component.
 */
AFRAME.registerComponent('video', {
    schema: {
        src: {type: 'string', default: ''},
        active: {type: 'boolean', default: false}
    },
    init: function() {
        if (this.data.active) {
            console.log('im active!', this);
            this.el.object3D.visible = true;
        } else {
            this.el.object3D.visible = false;
        }
    },
    update: function (oldData) {
        const data = this.data;

        // No change
        if (oldData && oldData.active === data.active) {
            return;
        }

        const system = this.system;

        // If `active` property changes, or first update, handle
        // active video with system.
        if (data.active && system.activeVideo !== this.data.src) {
            // Video enabled. Set video to this video.
            system.setActiveVideo(this.el.src);
        } else if (!data.active && system.activeVideo === this.data.src) {
            // Video disabled. Set video to another video.
            system.disableActiveVideo();
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
