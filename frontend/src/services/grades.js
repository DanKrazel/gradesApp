import http from "../http-common";

class GradesDataService {
    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }
    
    get(id) {
        return http.get(`?id=${id}`);
    }
    
    find(query, by = "student_id", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
    } 

    createReview(data) {
        return http.post("/review-new", data);
    }
    
    updateReview(data) {
        return http.put("/review-edit", data);
    }
    
    deleteReview(id, userId) {
        return http.delete(`/review-delete?id=${id}`, {data:{user_id: userId}});
    }
    
    getClass(id) {
        return http.get(`/class`);
    }
    
}
    
    export default new GradesDataService();
