import React, { Component } from "react";

// import config from "../config.js";

class Imgur extends Component {
  state = {
    file: ""
  };



  uploadImage() {
    const r = new XMLHttpRequest();
    const d = new FormData();
    // @ts-ignore
    const e = document.getElementsByClassName("input-image")[0].files[0];
    var u;

    d.append("image", e);
    console.log('e', e);
    console.log('d', d);
    r.open("POST", "https://api.imgur.com/3/image/");
    r.setRequestHeader("Authorization", `Client-ID 1001abddfee2596`);
    r.onreadystatechange = function () {
      if (r.status === 200 && r.readyState === 4) {
        console.log('r', r);
        let res = JSON.parse(r.responseText);
        u = `https://i.imgur.com/${res.data.id}.png`;
        console.log('u', u);
      }
    };
    r.send(d);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>상품 이미지등록하기</h2>
        </div>
        <form>
          <input
            type="file"
            className="input-image"
            onChange={this.uploadImage.bind(this)}
          />
        </form>
        <div id="preview">

        </div>
      </div>
    );
  }
}

export default Imgur;