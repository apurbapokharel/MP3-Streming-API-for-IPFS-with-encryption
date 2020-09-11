import React, { Component } from 'react';
import './App.css';
import crypto from 'crypto-js';
import Hls from 'hls.js';

class App extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      aesKey: null,
    };
    
  }
 
  makeid = (length) => {
    var result           = ''
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  
  generateAesKey = () => {
    var x = Math.floor((Math.random() * 10) + 5)
    var result = this.makeid(x)
    return result
  }

  // captureFile = (event) => {
  //   event.preventDefault();
  //   const file = event.target.files[0]; 
  //   const reader = new window.FileReader(); 
  //   reader.readAsArrayBuffer(file);
  //   reader.onloadend = () => {
  //     console.time("encrypt");
  //     const buffer = Buffer(reader.result);
  //     const wordArray = crypto.lib.WordArray.create(buffer);
  //     const str = crypto.enc.Hex.stringify(wordArray);
  //     var aesKey = this.generateAesKey();
  //     this.setState({aesKey: aesKey});
  //     const ct = crypto.AES.encrypt(str, aesKey);
  //     var ctstr = '';
  //     ctstr = ct.toString();
  //     ctstr = new Buffer(ctstr);
  //     console.log(ctstr );
  //     console.timeEnd("encrypt");
  //     this.setState({buffer : ctstr});
  //   }  
  // }

  
  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0]; 
    const reader = new window.FileReader(); 
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const buffer = Buffer(reader.result);
      this.setState({buffer : buffer});
    }  
  }


  render(){
    const buffer = this.state.buffer;
    function playVideoFromIPFS() {
      if (Hls.isSupported()) {
        var video = document.getElementById('audio');
        var hls = new Hls();
        // bind them together
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
          console.log("video and hls.js are now bound together !");
          hls.loadSource("https://bafybeihf5pvm3gckha5zkcmiovc6hwhzvws3ffdfpswr2e2qtd2h57j3li.ipfs.infura-ipfs.io/master.m3u8");
          // hls.loadSource("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
          // hls.loadSource("https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8");
          // hls.loadSource("https://playertest.longtailvideo.com/adaptive/alt-audio-no-video/angel-one.m3u8");
          // hls.loadSource(buffer);
          hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            console.log("manifest loaded, found " + data.levels.length + " quality level");
          });
        });
        hls.on(Hls.Events.ERROR, function (event, data) {
          if (data.fatal) {
            switch(data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
            // try to recover network error
              console.log("fatal network error encountered, try to recover");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log("fatal media error encountered, try to recover");
              hls.recoverMediaError();
              break;
            default:
            // cannot recover
              hls.destroy();
              break;
            }
          }
        });
        video.play();
      }
    }
  
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={(event) => {
              event.preventDefault()
            }}>
              <div className="form-group mr-sm-2 ">
                <input
                  type="file"
                  className="form-control "
                  placeholder="Select product"
                  onChange={this.captureFile}
                   />
              </div>
              <button type="submit" className="btn btn-primary">Upload</button>
            </form>
          <div>
            <button onClick={playVideoFromIPFS} > Play From IPFS</button>
            {/* <video id="video" width="320" height="240" controls></video>           */}
            <audio id="audio" controls></audio>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
