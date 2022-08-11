import { useRecoilState } from "recoil";
import { UpdateRubyPartState } from "../atoms/UpdateRubyPart";
import { UpdateTitleState } from "../atoms/UpdateTitleState";
import { UpdateProgressMaxState } from "../atoms/UpdateProgressMaxState";
import { UpdateProgressValueState } from "../atoms/UpdateProgressValueState";
import React from "react";
import { CreateRubyPart, GetTitle, GetProgress, MarkSelectedIndex, HideCheckbox } from "./MainView";
import { GetCheckedList } from "../App";
import check_icon from "../assets/icon/P.png"

function ContentsIndex(){
    const [main_content, UpdateRubyPart] = useRecoilState(UpdateRubyPartState);
    const [title, UpdateTitle] = useRecoilState(UpdateTitleState);
    const [pro_max, UpdateProgressMax] = useRecoilState(UpdateProgressMaxState);
    const [pro_value, UpdateProgressValue] = useRecoilState(UpdateProgressValueState);

    const clickIndex = (e) => {
        var elements = document.getElementsByClassName( "index_list" )[0];
        var target_elem = e.target;

        for (let i = 0; i < elements.children.length; ++i) {
            if (target_elem === elements.children[i]) {
                var index = i
                var sid = index
            }    
        }
        if (sid !== undefined) {
            var cid = 0
            var ccid = 0
            var nav_mode = localStorage.getItem("nav_mode");
            var checked_list = GetCheckedList(nav_mode)
    
            localStorage.setItem("sid", sid);
            localStorage.setItem("cid", cid);
            
            var content = CreateRubyPart(sid, cid, ccid, nav_mode, 0)
            UpdateRubyPart(content);
            var title = GetTitle(sid, cid, ccid)
            UpdateTitle(title);
            
            var [pro_max, pro_value] = GetProgress(checked_list, sid)
            UpdateProgressMax(pro_max)
            UpdateProgressValue(pro_value)
            MarkSelectedIndex(sid)
            HideCheckbox(sid, cid, ccid)

            window.scroll({top: 0, behavior: 'smooth'});
        }
    }

    return <section className="section-index">
        <h2>目次</h2>
        <ol className="index_list" onClick={clickIndex} >        
            <li className="selected"><img src={check_icon} alt="complete_check" />001-016　学而第一　　</li>
            <li><img src={check_icon} alt="complete_check" />017-040　為政第二　　</li>
            <li><img src={check_icon} alt="complete_check" />041-066　八佾第三　　</li>
            <li><img src={check_icon} alt="complete_check" />067-092　里仁第四　　</li>
            <li><img src={check_icon} alt="complete_check" />093-119　公冶長第五　</li>
            <li><img src={check_icon} alt="complete_check" />120-147　雍也第六　　</li>
            <li><img src={check_icon} alt="complete_check" />148-184　述而第七　　</li>
            <li><img src={check_icon} alt="complete_check" />185-205　泰伯第八　　</li>
            <li><img src={check_icon} alt="complete_check" />206-235　子罕第九　　</li>
            <li><img src={check_icon} alt="complete_check" />236-253　郷党第十　　</li>
            <li><img src={check_icon} alt="complete_check" />254-278　先進第十一　</li>
            <li><img src={check_icon} alt="complete_check" />279-302　顔淵第十二　</li>
            <li><img src={check_icon} alt="complete_check" />303-332　子路第十三　</li>
            <li><img src={check_icon} alt="complete_check" />333-379　憲問第十四　</li>
            <li><img src={check_icon} alt="complete_check" />380-420　衛霊公第十五</li>
            <li><img src={check_icon} alt="complete_check" />421-434　季氏第十六　</li>
            <li><img src={check_icon} alt="complete_check" />435-460　陽貨第十七　</li>
            <li><img src={check_icon} alt="complete_check" />461-471　微子第十八　</li>
            <li><img src={check_icon} alt="complete_check" />472-496　子張第十九　</li>
            <li><img src={check_icon} alt="complete_check" />497-499　尭曰第二十　</li>
        </ol>
    </section>
}

export default ContentsIndex;
