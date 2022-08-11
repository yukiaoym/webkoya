import React from "react";
import { useRecoilState } from "recoil";
import { LoadOpRandomState } from  "../atoms/LoadOpRandomState";
import { LoadOpExcludeState } from "../atoms/LoadOpExcludeState";

function About(){
    const [op_random_check, LoadOpRandom] = useRecoilState(LoadOpRandomState);
    const [op_exclude_check, LoadOpExclude] = useRecoilState(LoadOpExcludeState);
    

    const OpRandom = () => {
        var elements = document.getElementById( "op_random" );
        if (elements.checked === true) {
            localStorage.setItem('random_mode', "ON");
            LoadOpRandom(true)
        } else {
            localStorage.setItem('random_mode', "OFF");
            LoadOpRandom(false)
        }
    }
    const OpExcludeChecked = () => {
        var elements = document.getElementById( "op_exclude" );
        if (elements.checked === true) {
            localStorage.setItem('exclude_mode', "ON");
            LoadOpExclude(true)
        } else {
            localStorage.setItem('exclude_mode', "OFF");
            LoadOpExclude(false)
        }
    }

    return <section className="section-about">
        <div className="section-about__warp">
            <h2>Webkoya とは</h2>
            <p>Webkoya は、論語の暗唱用サイトです。<br />
            江戸時代の寺子屋では、「素読」といって論語の意味は教えずに、とりあえず音読して暗唱させるという教育方法がありました。<br />
            難解かつ優れた文章を幼少期の柔らかい頭に叩き込むことで、優秀な人材を育成していたようです。<br />
            本サイトでは、論語全文をルビ付きで掲載しています。意味・解説については記載しておりませんので、素読用にご利用いただければ幸いです。</p>
        </div>
        <div className="section-about__warp section-about__usage">
            <h2>使い方</h2>
            <ul>
                <li>論語が表示されている部分の左側をクリックすると、次の論語が表示されます。右側をクリックすると1つ前の論語が表示されます。<br />
                    ※オプション「ランダムに出題」をONにしている場合も、常に現在表示されている論語の1つ前の論語が表示されます。</li>
                <li>暗記できた場合は左下のチェックボックスにチェックを入れると、進捗バーが進みます。<br />
                    進捗バーは各章毎（全20章）、表示モード（全文表示/穴埋め/テスト）毎に保持されます。<br /></li>
                <li>ページリロードまたはブラウザのキャッシュをクリアすると、進捗もクリアされます。</li>
            </ul>
        </div>
        <div className="section-about__warp">
            <h2>ショートカットキー</h2>
            <table>
                <tbody>
                    <tr>
                        <th>操作</th>
                        <th>Windows</th>
                        <th>Mac</th>
                    </tr>
                    <tr>
                        <td>次へ</td>
                        <td>Alt + &lt;</td>
                        <td>control + option + &lt;</td>
                    </tr>
                    <tr>
                        <td>前へ</td>
                        <td>Alt +  &gt;</td>
                        <td>control + option + &gt;</td>
                    </tr>
                    <tr>
                        <td>チェックを入れる</td>
                        <td>Alt + ?</td>
                        <td>control + option + ?</td>
                    </tr>
                    <tr>
                        <td>About</td>
                        <td>Alt + u</td>
                        <td>control + option + u</td>
                    </tr>
                    <tr>
                        <td>全文表示</td>
                        <td>Alt + i</td>
                        <td>control + option + i</td>
                    </tr>
                    <tr>
                        <td>穴埋め</td>
                        <td>Alt + o</td>
                        <td>control + option + o</td>
                    </tr>
                    <tr>
                        <td>テスト</td>
                        <td>Alt + p</td>
                        <td>control + option + p</td>
                    </tr>
                </tbody>
            </table>   
        </div>
        <div className="section-about__warp section-about__option">
            <h2>オプション</h2>
            <ul className="section-about__option-list">
                <li>
                    ランダムに出題
                    <input type="checkbox" id="op_random" hidden checked={op_random_check} onChange={OpRandom} />
                    <label className="pure-toggle" htmlFor="op_random">
                        <span className="pure-toggle__off">OFF</span>
                        <span className="pure-toggle__on">ON</span>                        
                    </label>                    
                </li>
                <li>
                    チェック済みを出題しない                    
                    <input type="checkbox" id="op_exclude" hidden checked={op_exclude_check} onChange={OpExcludeChecked} />
                    <label className="pure-toggle" htmlFor="op_exclude">
                        <span className="pure-toggle__off">OFF</span>
                        <span className="pure-toggle__on">ON</span>    
                    </label>                    
                </li>
            </ul>
        </div>     
    </section>
}

export default About;
