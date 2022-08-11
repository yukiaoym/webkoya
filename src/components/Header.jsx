import { useRecoilState } from "recoil";
import { UpdateRubyPartState } from "../atoms/UpdateRubyPart";
import { UpdateProgressMaxState } from "../atoms/UpdateProgressMaxState";
import { UpdateProgressValueState } from "../atoms/UpdateProgressValueState";
import React from "react";
import { CreateRubyPart , GetProgress }  from "./MainView";
import { GetVar, GetCheckedList } from "../App";
import logo from "../assets/icon/logo.png"
import logo_mini from "../assets/icon/logo_mini.png"


function MarkSelectedNav() {
    var nav_mode = localStorage.getItem("nav_mode");
    var element2_parent = document.getElementsByClassName('nav');
    var element2 = element2_parent[0].children;

    for (const i of element2) {
        i.classList.remove("selected")
    }

    if (nav_mode === "wormhole") {
        element2[2].classList.add("selected")
    } else if (nav_mode === "test") {
        element2[3].classList.add("selected")
    } else if (nav_mode === "about") {
        element2[0].classList.add("selected")
    } else {
        element2[1].classList.add("selected")
    }
}

function MarkComplete2(checked_list) {
    var index_list_ele = document.getElementsByClassName('index_list');
    var li_ele = index_list_ele[0].childNodes;                
    for (const i of checked_list) {
        var flag = 0
        for (const j of i) {
            var sid = checked_list.indexOf(i)
            if (j === 'false') {
                flag = 1
            }
            if (flag === 0) {
                li_ele[sid].childNodes[0].classList.add("complete")
            } else {
                li_ele[sid].childNodes[0].classList.remove("complete")
            }
        }
    } 
}
// function Humberger() {
//     var navArea_element = document.getElementById('navArea');
//     if (navArea_element.classList.contains("open")) {
//         navArea_element.classList.remove("open")
//     } else {
//         navArea_element.classList.add("open")
//     }
// }

  

function Header ({SetNavMode}) {
    const [main_content, UpdateRubyPart] = useRecoilState(UpdateRubyPartState);
    const [pro_max, UpdateProgressMax] = useRecoilState(UpdateProgressMaxState);
    const [pro_value, UpdateProgressValue] = useRecoilState(UpdateProgressValueState);
    var index_ele = document.getElementsByClassName('section-index');

    const Update = () => {
        var vars = GetVar()
        var content = CreateRubyPart(vars.sid, vars.cid, vars.ccid, vars.nav_mode)
        UpdateRubyPart(content);

        var checked_list = GetCheckedList(vars.nav_mode)
        var [pro_max, pro_value] = GetProgress(checked_list, vars.sid)
        UpdateProgressMax(pro_max)
        UpdateProgressValue(pro_value)
        SetNavMode(vars.nav_mode)
        MarkComplete2(checked_list)

        var navArea_element = document.getElementById('navArea');
        if (navArea_element.classList.contains("open")) {
            navArea_element.classList.remove("open")
        }
    }    

    const clickAllMode = () => {
        localStorage.setItem("nav_mode", "all");
        Update()
        MarkSelectedNav()
        index_ele[0].classList.remove("hide")
    }

    const clickWormholeMode = () => {
        localStorage.setItem("nav_mode", "wormhole");
        Update()
        MarkSelectedNav()
        index_ele[0].classList.remove("hide")
    }

    const clickTestMode = () => {
        localStorage.setItem("nav_mode", "test");
        Update()
        MarkSelectedNav()
        index_ele[0].classList.remove("hide")
    }
    
    const clickAbout = () => {
        localStorage.setItem("nav_mode", "about");
        Update()
        MarkSelectedNav()
        index_ele[0].classList.add("hide")
    }

    return <header className="header">
        <div id="navArea">
            {/* <div className="toggle_btn" onClick={Humberger}>
                <span></span>
                <span></span>
                <span></span>
            </div> */}
            <nav>
                <img className="img_logo" src={logo} alt="webkoya" />
                <ul className="nav">                
                    <li accessKey="u" onClick={clickAbout}>About</li>
                    <li id="nav_all" className="selected" accessKey="i" onClick={clickAllMode}>全文表示</li>
                    <li id="nav_wormhole" accessKey="o" onClick={clickWormholeMode}>穴埋め</li>
                    <li id="nav_test" accessKey="p" onClick={clickTestMode}>テスト</li>
                </ul>
            </nav>
            {/* <div id="HumArea">
                <ul>
                    <li accessKey="u" onClick={clickAbout}>About</li>
                    <li id="nav_all" accessKey="i" onClick={clickAllMode}>全文表示</li>
                    <li id="nav_wormhole" accessKey="o" onClick={clickWormholeMode}>穴埋め</li>
                    <li id="nav_test" accessKey="p" onClick={clickTestMode}>テスト</li>
                </ul>
            </div>
            <div id="mask"></div> */}
        </div>
    </header>
}

export default Header;