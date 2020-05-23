import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CanonicalService } from './shared/services/canonical.service';

@Component({
  selector: 'mh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'My helper';
  decsiption = 'The open-source project built in order to help people. Task manager, notebook, and social network.';

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private canonicalService: CanonicalService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.addTags([
      { name: 'description', content: this.decsiption },
      { name: 'keywords', content: 'myhelper, my helper, myhelper life, life' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' }
    ]);

    this.canonicalService.setCanonicalURL();
  }
}
