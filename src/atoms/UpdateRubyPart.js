import { atom } from "recoil";
import { CreateRubyPart } from "../components/MainView";

export const UpdateRubyPartState = atom({
    key:'UpdateRubyPartState',
    default: CreateRubyPart(0, 0, 0, "all")
})