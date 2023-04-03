import http from 'k6/http'
import {check} from 'k6'

export let options = {
    scenarios: {
      constant_request_rate: {
        executor: 'constant-arrival-rate',
        rate: 1,
        timeUnit: '1s',
        duration: '10s',
        preAllocatedVUs: 20,
      }
    }
  };

export default function () {
    var url = 'http://localhost:3000/save'
    const data = {
        name: "heroName",
        age: "18",
        gender: "male",
      }

    let res = http.post(url, data)

    console.log(res.status)

    check(res, {
        'status is 204': (r) => r.status === 204
        });
        
}