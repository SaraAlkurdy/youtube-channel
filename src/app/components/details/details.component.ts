import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Video } from 'src/app/shared/models/youtube.model';
import { YoutubeService } from 'src/app/shared/services/youtube.service';
import * as moment from 'moment';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit , OnDestroy{

  private routeSub: Subscription;
  video;
  videoUrl;
  videoId;
  duration;
  rating;

  constructor(public youtubeService: YoutubeService,
    private route: ActivatedRoute,
    private sentizer: DomSanitizer) { }
  ngOnDestroy(): void {
    this.youtubeService.loading = false;
  }

  ngOnInit() {
   
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
 
       this.videoId = params['id']
    
    this.youtubeService.getVideoDetails(params['id']).subscribe(res =>{
 
      this.video = res.items[0]
      this.videoUrl = this.sentizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${params['id']}`);
      let dur =moment.duration(this.video.contentDetails.duration);
      
      this.duration =  `${dur.hours()}h:${dur.minutes()}m:${dur.seconds()}s`
      console.log(this.duration);
      console.log(this.video)
    })
    });
    let rate = JSON.parse(localStorage.getItem('ratings'))
    this.rating = rate['id'] == this.videoId ? rate['rate'] : 0


  }

}
