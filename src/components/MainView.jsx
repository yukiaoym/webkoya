import { useRecoilState } from "recoil";
import { UpdateRubyPartState } from "../atoms/UpdateRubyPart";
import { UpdateTitleState } from "../atoms/UpdateTitleState";
import { UpdateProgressMaxState } from "../atoms/UpdateProgressMaxState";
import { UpdateProgressValueState } from "../atoms/UpdateProgressValueState";
import Data from "../data.json";
import React from "react";
import { GetVar, GetCheckedList } from "../App";

export function CreateRubyPart(sid, cid, ccid, nav_mode) {
    let rongo_data = Data.Rongo[sid];

    if (nav_mode === "test") {
        var data = rongo_data["section_contents"][cid]["contents_t"];
        var items = <p>{data[ccid]}</p>
    } else {
        if (nav_mode === "wormhole") {
            data = rongo_data["section_contents"][cid]["contents_w"];
        } else {
            data = rongo_data["section_contents"][cid]["contents"];
        }
        
        items = data[ccid].map((content, index) =>
            <React.Fragment key={index}>
                <ruby>
                    <rb>{content.content}</rb>
                    <rt>{content.ruby}</rt>
                    {content.sep}
                </ruby>
            </React.Fragment>
        )
    }
    return items
}

export function GetTitle (sid, cid, ccid) {
    let rongo_data = Data.Rongo[sid];
    let section_name = rongo_data["section_name"]
    let contents_id = rongo_data["section_contents"][cid]["contents_id"];
    let max_page = rongo_data["section_contents"][cid]["contents"].length - 1;

    let title = section_name + " " + contents_id
    if (max_page > 0) {
        title = section_name + " " + contents_id + "-" + (ccid + 1)
    }
    return title
}
export function HideCheckbox(sid, cid, ccid) {
    var checkbox_elements = document.getElementsByClassName('section-main__check');
    var checkbox_element = checkbox_elements[0];
    var max_page = Data.Rongo[sid]["section_contents"][cid]["contents"].length - 1;

    if (ccid === max_page) {  
        checkbox_element.classList.remove("checkbox_hide")
        checkbox_element.childNodes[0].setAttribute("accesskey", "/")
    } else {
        checkbox_element.classList.add("checkbox_hide")
        checkbox_element.childNodes[0].removeAttribute("accesskey")
    }
}

export function GetProgress (checked_list, sid) {
    var pro_max = checked_list[sid].length;
        var pro_value = 0;
        for ( let i of checked_list[sid]) {
            if (i === 'true') {
                pro_value += 1
            }
        }
    return [pro_max, pro_value]
}

export function MarkSelectedIndex(sid) {
    var index_list_ele = document.getElementsByClassName('index_list');
    var li_ele = index_list_ele[0].childNodes;
    for (const i of li_ele) {
        i.classList.remove("selected")
    }
    li_ele[sid].classList.add("selected")
}

export function MarkComplete(sid, pro_max, pro_value, complete_flag) {
    var index_list_ele = document.getElementsByClassName('index_list');
    var li_ele = index_list_ele[0].childNodes;
    if (pro_max === pro_value) {
        li_ele[sid].childNodes[0].classList.add("complete")
    } else {
        li_ele[sid].childNodes[0].classList.remove("complete")
    }

    if (complete_flag === true) {
        for (const i of li_ele) {
            i.childNodes[0].classList.remove("complete")
        }
    }
}

function MainView(){
    const [main_content, UpdateRubyPart] = useRecoilState(UpdateRubyPartState);
    const [title, UpdateTitle] = useRecoilState(UpdateTitleState);
    const [pro_max, UpdateProgressMax] = useRecoilState(UpdateProgressMaxState);
    const [pro_value, UpdateProgressValue] = useRecoilState(UpdateProgressValueState);

    var vars = GetVar()
    var sid = vars.sid
    var cid = vars.cid
    var ccid = vars.ccid
    var nav_mode = vars.nav_mode
    var checked_list = GetCheckedList(nav_mode, false)

    const Update = () => {
        localStorage.setItem("sid", sid);
        localStorage.setItem("cid", cid);
        localStorage.setItem("ccid", ccid);

        var content = CreateRubyPart(sid, cid, ccid, nav_mode)
        UpdateRubyPart(content);
        var title = GetTitle(sid, cid, ccid)
        UpdateTitle(title);

        var [pro_max, pro_value] = GetProgress(checked_list, sid)
        UpdateProgressMax(pro_max)
        UpdateProgressValue(pro_value)
        MarkSelectedIndex(sid)
        HideCheckbox(sid, cid, ccid)
    }

    const clickNextPage = () => {
        var max_section = Data["Rongo"].length - 1;
        var max_content = Data["Rongo"][sid]["section_contents"].length - 1;
        var max_page = Data["Rongo"][sid]["section_contents"][cid]["contents"].length - 1;

        var random_mode = localStorage.getItem("random_mode");
        var exclude_mode = localStorage.getItem("exclude_mode");

        if (max_page > ccid) {
            ccid +=1;
        } else if (random_mode === "OFF" || random_mode === null) {
            if (max_content > cid) {
                ccid = 0;
                cid +=1;
            } else if (max_section > sid) {
                ccid = 0;
                cid = 0;
                sid +=1;
            } else {
                ccid = 0;
                cid = 0;
                sid = 0;
            }
            if (exclude_mode === "ON" ) {               
                var count = 0;
                while (checked_list[sid][cid] === "true") {
                    max_content = Data["Rongo"][sid]["section_contents"].length - 1;
                    if (max_content > cid) {
                        ccid = 0;
                        cid +=1;
                    } else if (max_section > sid) {
                        ccid = 0;
                        cid = 0;
                        sid +=1;
                    } else {
                        ccid = 0;
                        cid = 0;
                        sid = 0;
                    }
                    count ++;
                    if (count > 499) {
                        break;
                    }
                }
            }
        } else {
            var min = 0;
            sid = Math.floor( Math.random() * (max_section + 1 - min) ) + min ;
            max_content = Data["Rongo"][sid]["section_contents"].length - 1;
            cid = Math.floor( Math.random() * (max_content + 1 - min) ) + min ;
            ccid = 0;

            if (exclude_mode === "ON" ) {
                count = 0
                while (checked_list[sid][cid] === "true") {
                    min = 0;
                    sid = Math.floor( Math.random() * (max_section + 1 - min) ) + min ;
                    max_content = Data["Rongo"][sid]["section_contents"].length - 1;
                    cid = Math.floor( Math.random() * (max_content + 1 - min) ) + min ;
                    ccid = 0;

                    count ++;
                    if (count > 499) {
                        break;
                    }
                }
            }
        }
        Update()
    }

    const clickPrevPage = () => {
        //var random_mode = localStorage.getItem("random_mode");
        var exclude_mode = localStorage.getItem("exclude_mode");

        if (ccid > 0) {
            ccid -= 1;
        } else if (cid > 0) {
            cid -= 1;
            ccid = Data["Rongo"][sid]["section_contents"][cid]["contents"].length - 1;
        } else if (sid > 0) {
            sid -= 1;
            cid = Data["Rongo"][sid]["section_contents"].length - 1
            ccid = Data["Rongo"][sid]["section_contents"][cid]["contents"].length - 1;
        }　else if (sid === 0) {
            sid = 19
            cid = 2
            ccid = 0
        }

        if (exclude_mode === "ON") {
            var count = 0
            while (checked_list[sid][cid] === "true") {
                if (ccid > 0) {
                    ccid -= 1;
                } else if (cid > 0) {
                    cid -= 1;
                    ccid = Data["Rongo"][sid]["section_contents"][cid]["contents"].length - 1;
                } else if (sid > 0) {
                    sid -= 1;
                    cid = Data["Rongo"][sid]["section_contents"].length - 1
                    ccid = Data["Rongo"][sid]["section_contents"][cid]["contents"].length - 1;
                }　else if (sid === 0) {
                    sid = 19
                    cid = 2
                    ccid = 0
                }
                count ++;
                if (count > 556) {
                    break;
                }
            }
        }
        Update()
    }

    const LoadCheckBox = (sid, cid) => {
        var checked_list = GetCheckedList(nav_mode, false)
        if (checked_list[sid][cid] === 'true' ) {
            var checked = true
        } else if (checked_list[sid][cid] === 'false' ) {
            checked = false
        }
        return checked
    }

    const Congratulation = () => {
        var complete_flag = 1
        for (const i of checked_list) {
            if (i.includes("false")) {
                complete_flag = 0
            }
        }
        if (complete_flag === 1) {
            var confirm_reset = window.confirm("おめでとうございます！すべてのチェックがつきました。すべてのチェックをリセットしますか？");
            if (confirm_reset) {
                GetCheckedList(nav_mode, true)
                MarkComplete(sid, pro_max, pro_value, true)
                UpdateProgressValue(0)
            }
        }
    }
    const clickCheckBox = () => {
        var elements = document.getElementsByClassName( "section-main__check" )[0];
        var check_status = elements.children[0].checked
        if (check_status === true ) {
            checked_list[sid][cid] = 'true';
        } else if (check_status === false) {
            checked_list[sid][cid] = 'false';
        }
    
        if (nav_mode === 'wormhole') {
            localStorage.setItem("checked_w", JSON.stringify(checked_list));
        } else if (nav_mode === 'test') {
            localStorage.setItem("checked_t", JSON.stringify(checked_list));
        } else {
            localStorage.setItem("checked_a", JSON.stringify(checked_list));
        }
  
        var [pro_max, pro_value] = GetProgress(checked_list, sid)
        UpdateProgressMax(pro_max)
        UpdateProgressValue(pro_value)
        MarkComplete(sid, pro_max, pro_value)
        Congratulation()
    }

    return <section className="section-main">
        <div className="section-main__menu">
            <h2 className="section-main__title" id="Name">{title}</h2>
        </div>
        <div className="section-main__rongo">      
            <div className="section-main__rongo-right" id="prev_page" accessKey="." onClick={clickPrevPage}></div>
            <div className="section-main__rongo-left" id="next_page" accessKey="," onClick={clickNextPage}></div>
            <div id="Content" className="section-main__content">
                {main_content}
            </div>
        </div>
        <div className="section-main__check">
            <input type="checkbox" name="hoge" id="memory" accessKey="/" onChange={clickCheckBox} checked={LoadCheckBox(sid, cid)}/>
            <label htmlFor="memory"></label>
        </div>
        <div className="section-main__progress">
            <progress id="progress_bar" max={pro_max} value={pro_value}></progress>
            <span id="tooltip">{pro_value}/{pro_max}</span>
        </div>
    </section>
}

export default MainView;