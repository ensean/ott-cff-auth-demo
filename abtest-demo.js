/*
绑定 viewer request, 通过修改 uri 实现 AB 测试。修改后的 uri 仅用于回源，对终端用户透明。
*/


// enable stickiness by setting a cookie from origin or using another edge function
const stickinessCookieName = "appversion";
// set to true to enable console logging
const loggingEnabled = true;

function getRandomInt(min, max) {
        /* Random number is inclusive of min and max*/
        return Math.floor(Math.random() * (max - min + 1)) + min;
 }


// function rewrites the request uri based on configuration in KVS
// example config in KVS in key:value format
// "latest": {"a_weightage": .8, "a_url": "v1", "b_url": "v2"}
// given above key and value in KVS the request uri will be rewritten 
// for example http(s)://domain/latest/something/else will be rewritten as http(s)://domain/v1/something/else or http(s)://domain/v2/something/else depending on weightage
// if no configuration is found, then the request is returned as is
async function handler(event) {
    // NOTE: This example function is for a viewer request event trigger. 
    // Choose viewer request for event trigger when you associate this function with a distribution. 
    const request = event.request;
    const origin_uri = request.uri;
    const prefixs = ['/v1', '/v2'];
    const idx = getRandomInt(0,1)
    // add logic to extract prefix
    request.uri = prefixs[idx] + origin_uri;
    // no change to path - return request 
    return event.request;
}


// function to check if the stickiness cookie is valid
function hasValidSticknessCookie(stickinessCookie, pathSegment) {
    // if the value exists and it matches pathSegment
    return (stickinessCookie && stickinessCookie.value === pathSegment)
}

function log(message) {
    if (loggingEnabled) {
        console.log(message);
    }
}
