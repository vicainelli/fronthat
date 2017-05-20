import jobs from '../mirage/json/jobs';
export default function() {

  this.urlPrefix = 'https://api.fronthat.com';
  this.namespace = '';

  this.get('/jobs', (db, request) => {
    if (request.queryParams.slug) {
      return {data: [jobs.all.data[0]]};
    }
    return jobs.all;
  });

}
