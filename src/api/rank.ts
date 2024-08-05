import { Ranking } from "@/types/domain";
import { ApiResponse, PageData } from "@/types/common";
import instance from "./axios";
import apiEndpoints from "./apiEndpoints";

const getRanking = async ():
    Promise<ApiResponse<PageData<Ranking>>> => {
    const response = await instance.get(
        apiEndpoints.fetchRanking,
    );

    return response.data;
};

export { getRanking };