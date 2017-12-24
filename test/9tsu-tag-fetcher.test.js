/* eslint require-jsdoc: 1 */
import chai from 'chai';
chai.should();
import NineTsuTagFetcher from '../src/9tsu-tag-fetcher';
describe('NineTsuTagFetcher test.', (suite) => {
    it('should have properties ', () => {
        const ghs = new NineTsuTagFetcher();
        ghs.should.be.a('object');
        ghs.should.have.property('baseurl').with.equal('http://video.9tsu.com');
        ghs.should.have.property('request').with.equal(undefined);
    });
    it('should get header properly ', () => {
        const ghs = new NineTsuTagFetcher();
        ghs.should.have.property('getVideoList').with.be.a('function');
        let list = ghs.getVideoList('new');
        list.should.be.an('Array');
        console.log(list);
    });
});
