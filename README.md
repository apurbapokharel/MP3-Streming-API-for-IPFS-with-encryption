Example for streaming a video/audio file using HLS.
The media file must be converted into HLS format and can be donw using FFMPEG.
Then the HLS format file is uploaded to IPFS and is streamed straight from IPFS without having to call ipfs.get or other similar methods.
hls.js is a well written and open source library and even suports encrypting of the media segments and streams then while decrepting the segments on the go. 
A well written documentaion for hls.
https://tools.ietf.org/html/draft-pantos-http-live-streaming-19#page-37
A gitrepo for video streaming
https://github.com/ipfs/js-ipfs/tree/master/examples/browser-video-streaming
HLS documentaion form the creators
https://developer.apple.com/documentation/http_live_streaming
A site to check the quality of the HLS files created
http://inspectstream.theoplayer.com/
Was unable to convert media file to HLS format within the react project body/boundary had to use FFMPEG cli isself.