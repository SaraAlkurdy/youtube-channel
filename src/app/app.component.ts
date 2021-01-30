import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { HomeComponent } from '../app/components/home/home.component'
import { Video } from './shared/models/youtube.model';
import { YoutubeService } from './shared/services/youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'youtube-channel-search';

  videos: Video[] = [];
  searchVideos: Video[] = [];
  collection = [];
  constructor( private youtubeService: YoutubeService ) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
   }
   
  ngOnInit(): void {
    this.videos = [];
    this.youtubeService.getVideosForChanel('UCcabW7890RKJzL968QWEykA').subscribe(list => {
        for (let element of list["items"]) {
          this.videos.push(element)
          // console.log(element["snippet"]["title"])
        }
      });   
  }

    // Handle search input
    handleSearch(inputValue: string) {
      if (inputValue.length <= 0 ) {
        this.youtubeService.videos = [];
        this.youtubeService.getVideosForChanel('UCcabW7890RKJzL968QWEykA').subscribe(list => {
            for (let element of list["items"]) {
              this.youtubeService.videos.push(element)
              // console.log(element["snippet"]["title"])
            }
         
          });
      } else {
        this.youtubeService.videos = [];
        this.youtubeService.loading = true;
        this.youtubeService.getVideosForSearch(inputValue).subscribe((list:any) => {
          for (let element of list["items"]) {
            this.youtubeService.videos.push(element)
          }
          
       
        });
      }
    }
}
