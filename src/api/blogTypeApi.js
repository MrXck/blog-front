import request from "@/utils/request";
import {GetAllBlogTypeURL} from "@/utils/Constant";

export const getAllBlogType = () => request.get(GetAllBlogTypeURL)