import cf from 'cloudfront';

// This fails if there is no key value store associated with the function
const kvsHandle = cf.kvs();

// 异常返回
const response401 = {
    statusCode: 401,
    statusDescription: 'Unauthorized to request the resource'
};

// Remember to associate the KVS with your function before referencing KVS in your code.
// https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/kvs-with-functions-associate.html
async function handler(event) {
    const request = event.request;

    // get request headers
    const headers = request.headers;
    const keys = Object.keys(headers)
    
    // check if uid and sid exists
    if (! keys.includes('uid') || !keys.includes('sid')){
        console.log("header missing")
        return response401
    }
    // get uid and sid
    const userId = headers.uid.value;
    const sessionId = headers.sid.value;

    // validate uid and sid against key value store
    try {
        const sidKVStore = await kvsHandle.get(userId);
        if (sessionId != sidKVStore){
            return response401;
        }
    } catch (err) {
        // No change to the pathname if the key is not found
        console.log(`${request.uri} | ${err}`);
    }
    return request;
}