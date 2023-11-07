import request from "@/utils/request";
import {GetAllBlogTypeURL, GetBlogTypeCountURL} from "@/utils/Constant";

export const getAllBlogType = () => request.get(GetAllBlogTypeURL)

export const getBlogTypeCount = () => request.get(GetBlogTypeCountURL)