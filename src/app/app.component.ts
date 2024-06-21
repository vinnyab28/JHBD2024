import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
		<div class="container-fluid p-0 h-100 d-flex flex-column">
      <nav class="navbar shadow rounded navbar-expand-lg rounded" style="flex: 0 1 auto; background: #E7C6FF">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1 header-title">For when you...</span>
          <button class="btn btn-link text-dark text-decoration-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive">
            <i class="bi-grid"></i> More
          </button>
          </div>
      </nav>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
        <div class="offcanvas-header shadow rounded"  style="background: #E7C6FF">
          <h5 class="offcanvas-title header-title" id="offcanvasResponsiveLabel">For when you...</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body" style="background: #FCE5FC">
          <div class="list-group">
            @for (reference of data; track $index) {
              <button type="button" class="list-group-item list-group-item-action list-title" [ngClass]="{'active text-dark fw-bold': selectedIndex === $index}" [ngStyle]="{background: selectedIndex === $index ? '#F3CEFF' : '#F8F4F8'}" (click)="selectedIndex = $index" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive">
                {{reference.title}}
              </button>
            }
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-5" style="flex: 1 1 auto;">
        <div class="col-md-6 col-xl-4 col-10">
          @if(data.length) {
            <!-- <div class="card shadow w-100">
              <div class="card-body">
                <div class="card-title fw-bold">{{data[selectedIndex].title}}</div>
                @for (reference of data[selectedIndex].references; track $index) {
                  <div class="card-text">{{reference.text}}</div>
                  <small class="card-text fst-italic">{{reference.verse}}</small>
                }
              </div>
            </div> -->
            <div id="carouselExampleCaptions" class="carousel slide carousel-fade h-auto">
              <div class="carousel-indicators">
                @for (reference of data; track $index) {
                  <button type="button" data-bs-target="#carouselExampleCaptions" [attr.data-bs-slide-to]="$index" [ngClass]="{'active': $index === selectedIndex}" ></button>
                }
              </div>
              <div class="carousel-inner rounded border border-dark shadow h-100">
                @for (reference of data; track $index) {
                  <div class="carousel-item h-100 p-5" style="background:#F3CEFF" [ngClass]="{'active': $index === selectedIndex}">
                    <h1 class="card-title text-center mb-4">{{reference.title}}</h1>
                    @for (verses of reference.references; track $index) {
                      <h5 class="card-text">{{verses.text}}</h5>
                      <p class="card-verse fst-italic">{{verses.verse}}</p>
                    }
                  </div>
                }
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" (click)="decrement()">
                <span class="carousel-control-prev-icon text-dark" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next" (click)="increment()">
                <span class="carousel-control-next-icon text-dark" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          }
        </div>
      </div>
    </div>
    `,
  styles: [
    `

.header-title {
  font-family: "Playwrite NZ", cursive;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.card-title {
  font-family: "Oswald", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  font-size: 2rem;
}
.card-text, .card-verse {
  font-family: "Times New Roman", serif;
  font-optical-sizing: auto;
  font-weight: normal;
  font-style: normal;
}
.list-title {
  font-family: "Playwrite NZ", cursive;
  font-optical-sizing: auto;
  font-weight: normal;
  font-style: normal;
  border-color: black;
}`
  ],
})
export class AppComponent implements OnInit {
  title = 'JHBD2024';
  resources$: Subscription = new Subscription();
  data: any = [];
  selectedIndex: number = 0;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.resources$ = this.http.get("assets/references.json").subscribe(data => {
      this.selectedIndex = Math.floor(Math.random() * Object.keys(data).length);
      this.data = data;
    })
  }

  increment() {
    this.selectedIndex = (this.selectedIndex + 1 + Object.keys(this.data).length) % Object.keys(this.data).length;
  }

  decrement() {
    this.selectedIndex = (this.selectedIndex - 1 + Object.keys(this.data).length) % Object.keys(this.data).length;
  }


}
