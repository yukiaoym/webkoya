import style from './assets/css/style.css';
import './assets/css/reset.css';
import Header from './components/Header';
import SwitchView from './components/SwitchView';
import Footer from './components/Footer';
import Data from "./data.json";
import {
  RecoilRoot,
} from 'recoil';
import { useState } from 'react';

localStorage.clear()

export function GetVar() {
  var sid = Number(localStorage.getItem("sid"));
  var cid = Number(localStorage.getItem("cid"));
  var ccid = Number(localStorage.getItem("ccid"));

  var nav_mode = localStorage.getItem("nav_mode");
  var random_mode = localStorage.getItem("random_mode");
  var vars = {sid: sid,
              cid: cid,
              ccid: ccid,
              nav_mode: nav_mode,
              random_mode: random_mode
  }
  return vars
}

export function GetCheckedList(nav_mode, confirm_reset) {
  var max_section = Data["Rongo"].length - 1;
  if (nav_mode === 'wormhole') {
      var checked_list = JSON.parse(localStorage.getItem("checked_w"));
  } else if (nav_mode === 'test') {
      checked_list = JSON.parse(localStorage.getItem("checked_t"));
  } else {
      checked_list = JSON.parse(localStorage.getItem("checked_a"));
  }

  if (checked_list === null || confirm_reset === true) {
      checked_list = []       
      for (let i = 0; i <= max_section; i++) {
          var section_data = []
          var max_content = Data["Rongo"][i]["section_contents"].length - 1;
          for (let j = 0; j <= max_content; j++) {
              section_data.push('false')
          }
          checked_list.push(section_data)
      }

      if (nav_mode === 'wormhole') {
          localStorage.setItem("checked_w", JSON.stringify(checked_list));
      } else if (nav_mode === 'test') {
          localStorage.setItem("checked_t", JSON.stringify(checked_list));
      } else {
          localStorage.setItem("checked_a", JSON.stringify(checked_list));
      }
  }
  return checked_list
}

function App() {
  const [nav_mode, SetNavMode] = useState("all");
  return (    
    <RecoilRoot>
      <Header SetNavMode={SetNavMode}/>
      <SwitchView nav_mode={nav_mode}/>
      <Footer />
    </RecoilRoot>    
  );
}

export default App;
