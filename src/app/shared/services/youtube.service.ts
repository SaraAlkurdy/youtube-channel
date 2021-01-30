import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Video } from '../models/youtube.model';

@Injectable({
  providedIn: 'root'
})

export class YoutubeService {

  videos = [];

  private API_URL = 'https://www.googleapis.com/youtube/v3/search';
  private API_TOKEN = 'AIzaSyAhw2viRNZj_rAQww79kayU0g7NdeviD4w';
  private Channel_ID = 'UCcabW7890RKJzL968QWEykA';
  private Apinew = "https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyDASBC02mVOG1sn8ynOs6-8t2azgekBqXc&part=snippet,contentDetails,statistics,status";
  private videoDetalis = "https://www.googleapis.com/youtube/v3/videos";
  constructor( public http: HttpClient ) { }
  loading = false;

  getVideosForChanel(channel): Observable<Object> {
    let url = this.API_URL + '?part=snippet&key=' + this.API_TOKEN + '&channelId=' + channel + '&order=date&type=video,id&maxResults=40'
    console.log(url);
    return this.http.get(url)
      .pipe(
        map((res: any) =>  res ));
  }

  getVideosForSearch(query: string): Observable <any> {
    

    const url = `${this.API_URL}?q=${query}&part=snippet&channelId=${this.Channel_ID}&maxResults=10&type=video&key=${this.API_TOKEN}`
    // `${this.API_URL}?q=${query}&key=${this.API_TOKEN}&part=snippet&type=video&maxResults=10`;
    return this.http.get(url)
      // .pipe(
      //   map((response: any) => {response.items
      //   console.log(response.items)
      //   })
        
      // );
  }

  getVideoDetails(id): Observable <any> {
    let url = this.videoDetalis + '?part=snippet,contentDetails,statistics,status&key=' + this.API_TOKEN + '&id=' + id 
    console.log(url);
    return this.http.get(url)
      .pipe(
        map((res: any) =>  res ));
  }
}
