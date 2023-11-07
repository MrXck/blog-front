import request from "@/utils/request";
import {GetAdminInfoURL} from "@/utils/Constant";

export const getAdminInfo = () => request.get(GetAdminInfoURL)