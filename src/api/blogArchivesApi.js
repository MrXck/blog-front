import request from "@/utils/request";
import {GetArchivesByTimeURL, GetArchivesURL} from "@/utils/Constant";

export const getArchives = data => request.post(GetArchivesByTimeURL, data)

export const getAllArchives = () => request.get(GetArchivesURL)