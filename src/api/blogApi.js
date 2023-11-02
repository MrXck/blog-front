import request from "@/utils/request";
import {GetBlogByPageURL} from "@/utils/Constant";

export const getBlogByPage = data => {
    return request.post(GetBlogByPageURL, data)
}