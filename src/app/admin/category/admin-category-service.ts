import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Author} from "../author/author";
import {Category} from "./category";


@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {

  public static  URL = environment.backendUrl + "/api/admin/categories";

  constructor(
    private http: HttpClient) {
  }

  save(category: Category): Observable<any> {
    if(category.id) {
      return this.http.put(AdminCategoryService.URL, category);
    } else {
      return this.http.post(AdminCategoryService.URL, category);
    }
  }

  findById(id: string): Observable<any> {
    return this.http.get(`${AdminCategoryService.URL}/${id}`);
  }

  findAll(page: number, search: string): Observable<any> {
    page = page - 1;
    return this.http.get(`${AdminCategoryService.URL}?page=${page}&size=20&search=${search}`);
  }

  delete(id=''): Observable<any> {
    return this.http.delete(`${AdminCategoryService.URL}/${id}`);
  }
}