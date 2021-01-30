import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/shared/models/youtube.model';
import { YoutubeService } from 'src/app/shared/services/youtube.service';
import { StarRatingComponent } from 'ng-starrating';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  inputTouched = false;
  loading = false;
  searchVideos: Video[] = [];
  collection = [];
  constructor( public youtubeService: YoutubeService ,
    public sentizer: DomSanitizer) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
   }

  ngOnInit() {
    this.youtubeService.videos = [];
    this.youtubeService.getVideosForChanel('UCcabW7890RKJzL968QWEykA').subscribe(list => {
      // console.log(list);
      
        for (let element of list["items"]) {
          this.youtubeService.videos.push(element)
          // console.log(element["snippet"]["title"])
        }
      });   
  }



  // Ratings
  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}, video) {
     `Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`;
      console.log($event.newValue,video);
      
      let newValue = {'rate':$event.newValue+'', 'id': video.id.videoId}
      localStorage.setItem('ratings', JSON.stringify( newValue ) )
  }

}
