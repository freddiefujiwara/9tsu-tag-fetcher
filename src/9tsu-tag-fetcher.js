import request from 'sync-request';
import querystring from 'querystring';
import {JSDOM} from 'jsdom';
/**
 ** main class of 9tsuTagFetcher
 */
export default class NineTsuTagFetcher {
    /**
     * @constructor
     * @param {string} url
     */
    constructor() {
        this.baseurl = 'http://video.9tsu.com';
        this.request = undefined;
    }
    /**
     * get video list from tag
     * @param {string} tag
     * @param {number} limit
     * @return {Array} videos
     */
    getVideoList(tag, limit = 1) {
        if ( typeof this.request === 'undefined') {
            this.request = request;
        }
        let res = this.request('GET', this.baseurl + '/videos?'
            + querystring.stringify({tag: tag}));
        let videoLinks = (new JSDOM(res.getBody().toString())).
            window.document.querySelectorAll('.item-lockup-thumbnail > a');
        let videoURLs = [];
        for ( let i = 0; i < videoLinks.length; i ++ ) {
            let res = this.request('GET', this.baseurl + videoLinks[i].href);
            let video = (new JSDOM(res.getBody().toString())).
                window.document.querySelector('video');
            try {
                videoURLs.push(video.src);
            } catch (e) {}
            if ( i > limit) {
                return videoURLs;
            }
        }
        return videoURLs;
    }
}
