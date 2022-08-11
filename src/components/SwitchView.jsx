import React from "react";
import MainView from "./MainView";
import ContentsIndex from "./ContentsIndex";
import About from "./About";


function SwitchView({nav_mode}){
    if (nav_mode === 'about') {
        return (
            <React.Fragment>
                <About />
                <ContentsIndex />
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <MainView />
                <ContentsIndex />
            </React.Fragment>
        )
    }
}

export default SwitchView;