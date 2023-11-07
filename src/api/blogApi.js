import request from "@/utils/request";
import {GetBlogByPageURL, GetBlogByIdURL, GetBlogCountURL} from "@/utils/Constant";

export const getBlogByPage = data => {
    return request.post(GetBlogByPageURL, data)
}

export const getBlogById = id => {
    return request.get(`${GetBlogByIdURL}/${id}`)
}

export const getBlogCount = () => request.get(GetBlogCountURL)
