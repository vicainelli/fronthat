import jobs from '../mirage/json/jobs';
import ENV from 'fronthat/config/environment';

export default function() {

  this.urlPrefix = ENV.apiURL;
  this.namespace = '';

  this.get('/jobs', (db, request) => {
    if (request.queryParams.slug) {
      return {data: [jobs.all.data[0]]};
    }
    return jobs.all;
  });

  this.post('/jobs', () => {
    return {};
  }, 200);

}
